<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Discount extends Model
{

    use HasFactory;

    protected $fillable = ['code', 'discount_percentage', 'expires_at'];
}
