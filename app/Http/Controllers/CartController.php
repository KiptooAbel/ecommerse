<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = Cart::where('user_id', auth()->id())->with('book')->get();
        return Inertia::render('Cart/Index', compact('cartItems'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1'
        ]);

        Cart::updateOrCreate(
            ['user_id' => auth()->id(), 'book_id' => $request->book_id],
            ['quantity' => $request->quantity]
        );

        return redirect()->back()->with('success', 'Book added to cart.');
    }

    public function destroy(Cart $cart)
    {
        $cart->delete();

        return redirect()->back()->with('success', 'Item removed from cart.');
    }
}
