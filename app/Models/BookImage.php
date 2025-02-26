<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookImage extends Model
{
    use HasFactory;

    protected $fillable = ['book_id', 'path', 'is_primary', 'alt_text', 'display_order'];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}