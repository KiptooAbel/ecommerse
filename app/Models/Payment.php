<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Payment extends Model
{
    use HasFactory;

    protected $fillable = ['order_id', 'user_id', 'amount', 'status', 'payment_method', 'transaction_id'];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
