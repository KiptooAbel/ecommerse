import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function AdminOrderShow({ order }) {
    const { data, setData, patch, processing } = useForm({
        status: order.status,
    });

    const handleStatusUpdate = (e) => {
        e.preventDefault();
        patch(route("admin.orders.updateStatus", order.id));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Order #{order.id} Details</h1>
            <p className="mb-2"><strong>Customer:</strong> {order.user.name}</p>
            <p className="mb-2"><strong>Total Amount:</strong> ${order.total_amount}</p>
            <p className="mb-2"><strong>Current Status:</strong> {order.status}</p>

            <h2 className="text-xl font-semibold mt-4">Update Status</h2>
            <form onSubmit={handleStatusUpdate} className="mt-2">
                <select
                    value={data.status}
                    onChange={(e) => setData("status", e.target.value)}
                    className="border p-2 rounded w-1/3"
                >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                <button
                    type="submit"
                    disabled={processing}
                    className="ml-4 bg-green-500 text-white px-4 py-2 rounded"
                >
                    {processing ? "Updating..." : "Update Status"}
                </button>
            </form>

            <h2 className="text-xl font-semibold mt-4">Order Items</h2>
            <table className="w-full border-collapse border border-gray-200 mt-2">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Book</th>
                        <th className="p-2 border">Quantity</th>
                        <th className="p-2 border">Price</th>
                        <th className="p-2 border">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {order.order_items.map((item) => (
                        <tr key={item.id} className="text-center">
                            <td className="p-2 border">{item.book?.title}</td>
                            <td className="p-2 border">{item.quantity}</td>
                            <td className="p-2 border">${item.price}</td>
                            <td className="p-2 border">${item.subtotal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
