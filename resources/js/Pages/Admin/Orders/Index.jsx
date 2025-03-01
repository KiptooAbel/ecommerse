import React from "react";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';


export default function AdminOrdersIndex({ orders }) {
    return (<AuthenticatedLayout>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Customer Orders</h1>
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Order ID</th>
                        <th className="p-2 border">Customer</th>
                        <th className="p-2 border">Total Amount</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="text-center">
                            <td className="p-2 border">{order.id}</td>
                            <td className="p-2 border">{order.user.name}</td>
                            <td className="p-2 border">{order.total_amount}</td>
                            <td className="p-2 border">{order.status}</td>
                            <td className="p-2 border">
                                <Link
                                    href={route("admin.orders.show", order.id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div></AuthenticatedLayout>
    );
}
