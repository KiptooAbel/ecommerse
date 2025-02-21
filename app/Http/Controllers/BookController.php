<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::with('categories')->get();
        return Inertia::render('Books/Index', compact('books'));
    }

    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Books/Create', compact('categories'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'nullable|string',
            'genre' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'isbn' => 'required|unique:books,isbn',
            'cover_image' => 'nullable|image|max:2048',
        ]);

        Book::create($request->all());

        return redirect()->route('books.index')->with('success', 'Book added successfully.');
    }

    public function edit(Book $book)
    {
        $categories = Category::all();
        return Inertia::render('Books/Edit', compact('book', 'categories'));
    }

    public function update(Request $request, Book $book)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'nullable|string',
            'genre' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'isbn' => "required|unique:books,isbn,{$book->id}",
            'cover_image' => 'nullable|image|max:2048',
        ]);

        $book->update($request->all());

        return redirect()->route('books.index')->with('success', 'Book updated successfully.');
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return redirect()->route('books.index')->with('success', 'Book deleted successfully.');
    }
}
