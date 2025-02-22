<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\PaymentController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Redirect users based on role
Route::get('/dashboard', function () {
})->middleware(['auth', 'role.redirect'])->name('dashboard');

// =================== Admin Routes ===================
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');

    // Manage books & categories
    Route::resource('books', BookController::class);
    Route::resource('categories', CategoryController::class);

    // Manage users & orders
    Route::get('/admin/users', [AdminController::class, 'users'])->name('admin.users');
    Route::delete('/admin/users/{user}', [AdminController::class, 'deleteUser'])->name('admin.users.delete');
  //  Route::resource('orders', OrderController::class)->only(['index']);

    // Manage shipping
    Route::patch('/admin/shipping/{shipping}', [ShippingController::class, 'update'])->name('admin.shipping.update');
});

// =================== Customer Routes ===================
Route::middleware(['auth', 'role:customer'])->group(function () {
    Route::get('/customer/dashboard', function () {
        return Inertia::render('CustomerDashboard');
    })->name('customer.dashboard');

    // Orders & Payments
    Route::resource('orders', OrderController::class)->only(['store', 'show']);
    Route::post('/payments', [PaymentController::class, 'store'])->name('payments.store');

    // Wishlist & Reviews
    Route::resource('wishlist', WishlistController::class)->only(['index', 'store', 'destroy']);
    Route::resource('reviews', ReviewController::class)->only(['store', 'update', 'destroy']);

    // Cart Routes
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::delete('/cart/{cart}', [CartController::class, 'destroy'])->name('cart.destroy');

    // Shipping Routes
    Route::resource('shipping', ShippingController::class)->only(['index', 'store']);
});

// =================== Profile Routes ===================
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/adminprofile', [AdminProfileController::class, 'edit'])->name('adminprofile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // User Logout
    Route::post('/logout', [UserController::class, 'logout'])->name('logout');
});

require __DIR__.'/auth.php';
