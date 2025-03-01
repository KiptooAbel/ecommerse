<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Book;

use Illuminate\Database\Eloquent\Factories\HasFactory;


class Wishlist extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'book_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }// In App\Models\Wishlist.php
public function book()
{
    return $this->belongsTo(Book::class);
}
}
