<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        // Get featured books (you could determine this by a featured flag or other logic)
        $featuredBooks = Book::with(['reviews', 'categories', 'primaryImage'])
            ->take(10)
            ->get();
            
        // Get new releases (ordered by published_year, descending)
        $newReleases = Book::with(['reviews', 'categories', 'primaryImage'])
            ->orderBy('published_year', 'desc')
            ->take(10)
            ->get();
            
        // Get books by Kenyan authors (you might need to add a 'country' field to your author model)
        // For now, we'll simulate this with a genre check
        $kenyanAuthors = Book::with(['reviews', 'categories', 'primaryImage'])
            ->where('genre', 'like', '%Kenyan%')
            ->orWhereHas('categories', function ($query) {
                $query->where('name', 'like', '%Kenyan%');
            })
            ->take(10)
            ->get();
            
        // Get all categories
        $categories = Category::all();
        
        // Map the book data to include primaryImage directly
        $mapBookData = function ($book) {
            $primaryImage = $book->primaryImage();
            $book->primary_image = $primaryImage;
            return $book;
        };
        
        $featuredBooks = $featuredBooks->map($mapBookData);
        $newReleases = $newReleases->map($mapBookData);
        $kenyanAuthors = $kenyanAuthors->map($mapBookData);
        
        return Inertia::render('Home', [
            'featured_books' => $featuredBooks,
            'new_releases' => $newReleases,
            'kenyan_authors' => $kenyanAuthors,
            'categories' => $categories,
        ]);
    }
}