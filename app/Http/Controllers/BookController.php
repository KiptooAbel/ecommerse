<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::with('categories')->paginate(10);
        return Inertia::render('Books/Index', compact('books'));
    }

    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Books/Create', compact('categories'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'nullable|string',
            'genre' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'isbn' => 'required|unique:books,isbn',
            'cover_image' => 'nullable|image|max:2048',
            'categories' => 'required|array',  // Must be an array of category IDs
            'categories.*' => 'exists:categories,id',
        ]);

        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('books', 'public');
            $validated['cover_image'] = $path;
        }
    
        $book = Book::create($validated);
        $book->categories()->attach($request->categories);
    
    
        return redirect()->route('books.index')->with('success', 'Book added successfully.');
    }
    

    public function edit(Book $book)
    {
        $book->load('categories');

        $categories = Category::all();
        return Inertia::render('Books/Edit', compact('book', 'categories'));
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'nullable|string',
            'genre' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'isbn' => "required|unique:books,isbn,{$book->id}",
            'cover_image' => 'nullable|image|max:2048',
            'categories' => 'required|array',
            'categories.*' => 'exists:categories,id',
        ]);

    if ($request->hasFile('cover_image')) {
        // Remove old image if exists
        if ($book->cover_image) {
            Storage::disk('public')->delete($book->cover_image);
        }
        $path = $request->file('cover_image')->store('books', 'public');
        $validated['cover_image'] = $path;
    }

    $book->update($validated);
    $book->categories()->sync($request->categories);
    
        return redirect()->route('books.index')->with('success', 'Book updated successfully.');
    }
    

    public function destroy(Book $book)
    {
        $book->delete();
        return redirect()->route('books.index')->with('success', 'Book deleted successfully.');
    }
}
