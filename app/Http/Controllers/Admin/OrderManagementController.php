<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;


class OrderManagementController extends Controller
{
    // Get all orders
    public function index()
    {
        $orders = Order::with('user', 'orderItems.book')->latest()->get();
        return Inertia::render('Admin/Orders/Index', compact('orders'));
    }

    // Show details of a specific order
    public function show(Order $order)
    {
        $order->load('user', 'orderItems.book');

        return Inertia::render('Admin/Orders/Show', compact('order'));
    }

    // Update order status
    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:Pending,Processing,Shipped,Delivered,Cancelled',
        ]);

        $order->update(['status' => $request->status]);

        return redirect()->route('admin.orders.index')->with('success', 'Order status updated successfully.');
    }
}
