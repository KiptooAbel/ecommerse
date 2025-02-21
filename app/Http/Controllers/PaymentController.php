<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with('order', 'user')->get();
        return Inertia::render('Payments/Index', compact('payments'));
    }

    public function create(Order $order)
    {
        return Inertia::render('Payments/Create', compact('order'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|string',
            'transaction_id' => 'required|string|unique:payments',
        ]);

        Payment::create([
            'user_id' => Auth::id(),
            'order_id' => $request->order_id,
            'amount' => $request->amount,
            'payment_method' => $request->payment_method,
            'transaction_id' => $request->transaction_id,
            'status' => 'pending',
        ]);

        return redirect()->route('orders.index')->with('success', 'Payment submitted. Awaiting verification.');
    }

    public function update(Request $request, Payment $payment)
    {
        $request->validate(['status' => 'required|string|in:pending,completed,failed']);
        $payment->update(['status' => $request->status]);

        return redirect()->route('payments.index')->with('success', 'Payment status updated.');
    }
}
