<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function index()
    {
        $wishlist = Wishlist::where('user_id', auth()->id())->with('book')->get();
        return Inertia::render('Wishlist/Index', compact('wishlist'));
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
        $this->authorize('delete', $wishlist);
        $wishlist->delete();

        return redirect()->back()->with('success', 'Book removed from wishlist.');
    }
}
