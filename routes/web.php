<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



// Redirect based on role
Route::get('/dashboard', function () {
})->middleware('auth','role.redirect')->name('dashboard');


// Admin Dashboard
Route::get('/admin/dashboard', function () {
    return Inertia::render('AdminDashboard');
})->middleware(['auth', 'role:admin'])->name('admin.dashboard');

// Customer Dashboard
Route::get('/customer/dashboard', function () {
    return Inertia::render('CustomerDashboard');
})->middleware(['auth', 'role:customer'])->name('customer.dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
