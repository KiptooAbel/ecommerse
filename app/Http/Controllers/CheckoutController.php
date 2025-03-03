<?php

namespace App\Http\Controllers;

use App\Models\ShippingAddress;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cart;
use App\Models\Book;

class CheckoutController extends Controller
{
    public function show()
    {
        $cartItems = Cart::where('user_id', auth()->id())
            ->with('book') // Load book details
            ->get();

        $total = $cartItems->sum(function ($cartItem) {
            return $cartItem->book->price * $cartItem->quantity; // Calculate total price
        });

        return Inertia::render('Checkout', [
            'cartItems' => $cartItems,
            'total' => $total
        ]);
    }

    public function storeShipping(Request $request)
    {
        $request->validate([
            'address' => 'required|string|max:255',
            'county' => 'required|string|max:100',
            'town' => 'required|string|max:100',
            'zip_code' => 'required|string|max:20',
            'country' => 'required|string|max:100',
        ]);

        $user = auth()->user();

        // Update or create the shipping address
        ShippingAddress::updateOrCreate(
            ['user_id' => $user->id],
            $request->only('address', 'county', 'town', 'zip_code', 'country')
        );

        return back()->with('success', 'Shipping details updated.');
    }
}

