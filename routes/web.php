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
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Admin\OrderManagementController;




// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');

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

  //  Route for OrderManagement
  Route::get('/ordersManagement', [OrderManagementController::class, 'index'])->name('admin.orders.index'); // View all orders
  Route::get('/ordersManagement/{order}', [OrderManagementController::class, 'show'])->name('admin.orders.show'); // View order details
  Route::patch('/ordersManagement/{order}/status', [OrderManagementController::class, 'updateStatus'])->name('admin.orders.updateStatus'); // Update order status

    // Manage shipping
    Route::patch('/admin/shipping/{shipping}', [ShippingController::class, 'update'])->name('admin.shipping.update');
});

// =================== Customer Routes ===================
Route::middleware(['auth', 'role:customer'])->group(function () {
    Route::get('/customer/dashboard', function () {
        return Inertia::render('CustomerDashboard');
    })->name('customer.dashboard');

    // Orders & Payments
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index'); // View all orders
    Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create'); // Order form
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store'); // Place an order
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show'); // View a single order


    Route::resource('reviews', ReviewController::class)->only(['store', 'update', 'destroy']);
    
    Route::post('/wishlist/{wishlist}/move-to-cart', [WishlistController::class, 'moveToCart'])
    ->name('wishlist.moveToCart');  
    
    // View wishlist
    Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist.index');
    
    // Add to wishlist
    Route::post('/wishlist', [WishlistController::class, 'store'])->name('wishlist.store');
    
    // Remove from wishlist
    Route::delete('/wishlist/{wishlist}', [WishlistController::class, 'destroy'])->name('wishlist.destroy');
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
