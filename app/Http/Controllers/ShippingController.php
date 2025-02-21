<?php

namespace App\Http\Controllers;

use App\Models\Shipping;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShippingController extends Controller
{
    public function index()
    {
        $shippingDetails = Shipping::where('user_id', auth()->id())->with('order')->get();
        return Inertia::render('Shipping/Index', compact('shippingDetails'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'address' => 'required|string|max:255',
            'county' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
        ]);

        Shipping::create([
            'user_id' => auth()->id(),
            'order_id' => $request->order_id,
            'address' => $request->address,
            'county' => $request->county,
            'postal_code' => $request->postal_code,
            'status' => 'pending',
        ]);

        return redirect()->route('orders.index')->with('success', 'Shipping details added.');
    }

    public function update(Request $request, Shipping $shipping)
    {
        $request->validate(['status' => 'required|string|in:pending,shipped,delivered']);
        $shipping->update(['status' => $request->status]);

        return redirect()->route('shipping.index')->with('success', 'Shipping status updated.');
    }
}
