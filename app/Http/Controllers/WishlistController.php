<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cart;

class WishlistController extends Controller
{
    public function index()
    {
        $wishlist = Wishlist::where('user_id', auth()->id())->with('book')->get();
        return Inertia::render('Wishlist/Wishlist', compact('wishlist'));
    }

    public function store(Request $request)
    {
        $request->validate(['book_id' => 'required|exists:books,id']);

        Wishlist::firstOrCreate([
            'user_id' => auth()->id(),
            'book_id' => $request->book_id,
        ]);

        return redirect()->back()->with('success', 'Book added to wishlist.');
    }

    public function destroy(Wishlist $wishlist)
    {
        $wishlist->delete();

        return redirect()->back()->with('success', 'Book removed from wishlist.');
    }
public function moveToCart(Wishlist $wishlist)
{
    
    // Create or update cart item
    $cart = Cart::updateOrCreate(
        [
            'user_id' => auth()->id(),
            'book_id' => $wishlist->book_id,
        ],
        [
            'quantity' => \DB::raw('quantity + 1'),
        ]
    );
    
    // Remove from wishlist
    $wishlist->delete();
    
    return redirect()->back()->with('success', 'Book moved to cart.');
}
}
