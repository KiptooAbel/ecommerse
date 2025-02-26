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
            'additional_images' => 'nullable|array',
            'additional_images.*' => 'image|max:2048',
            'categories' => 'required|array',
            'categories.*' => 'exists:categories,id',
        ]);
    
        // Create the book first
        $book = Book::create([
            'title' => $validated['title'],
            'author' => $validated['author'],
            'description' => $validated['description'],
            'genre' => $validated['genre'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'isbn' => $validated['isbn'],
        ]);
    
        // Handle cover image - make it the primary image
        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('books', 'public');
            
            // Create as BookImage with is_primary flag
            $book->images()->create([
                'path' => $path,
                'is_primary' => true,
                'alt_text' => $validated['title'],
                'display_order' => 0
            ]);
        }
        
        // Handle additional images
        if ($request->hasFile('additional_images')) {
            $order = 1; // Start from 1 as cover image is 0
            foreach ($request->file('additional_images') as $image) {
                $path = $image->store('books', 'public');
                
                $book->images()->create([
                    'path' => $path,
                    'is_primary' => false,
                    'alt_text' => $validated['title'] . ' - Image ' . $order,
                    'display_order' => $order
                ]);
                
                $order++;
            }
        }
    
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
            'additional_images' => 'nullable|array',
            'additional_images.*' => 'image|max:2048',
            'remove_images' => 'nullable|array',
            'remove_images.*' => 'integer|exists:book_images,id',
            'categories' => 'required|array',
            'categories.*' => 'exists:categories,id',
        ]);
    
        // Update basic book details
        $book->update([
            'title' => $validated['title'],
            'author' => $validated['author'],
            'description' => $validated['description'],
            'genre' => $validated['genre'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'isbn' => $validated['isbn'],
        ]);
    
        // Handle cover image update
        if ($request->hasFile('cover_image')) {
            // Find current primary image
            $primaryImage = $book->images()->where('is_primary', true)->first();
            
            if ($primaryImage) {
                // Delete old file
                Storage::disk('public')->delete($primaryImage->path);
                
                // Update record
                $path = $request->file('cover_image')->store('books', 'public');
                $primaryImage->update([
                    'path' => $path,
                    'alt_text' => $validated['title']
                ]);
            } else {
                // Create new primary image
                $path = $request->file('cover_image')->store('books', 'public');
                $book->images()->create([
                    'path' => $path,
                    'is_primary' => true,
                    'alt_text' => $validated['title'],
                    'display_order' => 0
                ]);
            }
        }
        
        // Handle additional images
        if ($request->hasFile('additional_images')) {
            $lastOrder = $book->images()->max('display_order') ?: 0;
            $order = $lastOrder + 1;
            
            foreach ($request->file('additional_images') as $image) {
                $path = $image->store('books', 'public');
                
                $book->images()->create([
                    'path' => $path,
                    'is_primary' => false,
                    'alt_text' => $validated['title'] . ' - Image ' . $order,
                    'display_order' => $order
                ]);
                
                $order++;
            }
        }
        
        // Remove images if requested
        if ($request->has('remove_images') && is_array($request->remove_images)) {
            $imagesToRemove = $book->images()->whereIn('id', $request->remove_images)->get();
            
            foreach ($imagesToRemove as $image) {
                if (!$image->is_primary) { // Don't allow primary image removal here
                    Storage::disk('public')->delete($image->path);
                    $image->delete();
                }
            }
        }
    
        $book->categories()->sync($request->categories);
        
        return redirect()->route('books.index')->with('success', 'Book updated successfully.');
    }
    
    public function destroy(Book $book)
    {
        // Delete all associated images from storage
        foreach ($book->images as $image) {
            Storage::disk('public')->delete($image->path);
        }
        
        $book->delete();
        return redirect()->route('books.index')->with('success', 'Book deleted successfully.');
    }
}