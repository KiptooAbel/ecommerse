<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Review;
use Illuminate\Database\Eloquent\Factories\HasFactory;



class Book extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'author', 'description', 'genre', 'price', 'stock', 'isbn', 'cover_image', 'published_year'];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'book_categories');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    // Add this to App\Models\Book
    public function images()
    {
        return $this->hasMany(BookImage::class)->orderBy('display_order');
    }

    public function primaryImage()
    {
        return $this->hasOne(BookImage::class)->where('is_primary', true);
    }
}
