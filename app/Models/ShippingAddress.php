<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class ShippingAddress extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'address', 'county', 'town', 'zip_code', 'country'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
