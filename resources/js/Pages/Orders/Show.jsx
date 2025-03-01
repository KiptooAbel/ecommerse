import React from "react";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


export default function OrderShow({ order }) {
    return (<AuthenticatedLayout>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>
            <p className="mb-2"><strong>Status:</strong> {order.status}</p>
            <p className="mb-2"><strong>Total Amount:</strong> ${order.total_amount}</p>

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

            <Link
                href={route("orders.index")}
                className="mt-4 inline-block bg-gray-600 text-white px-4 py-2 rounded"
            >
                Back to Orders
            </Link>
        </div></AuthenticatedLayout>
    );
}
