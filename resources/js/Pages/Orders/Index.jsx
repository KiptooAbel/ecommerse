import React from "react";
import { usePage } from "@inertiajs/react";
import { ShoppingCart } from "lucide-react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// Orders Page
export const Index = ({ orders }) => {
    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
            {orders.length > 0 ? (
                orders.map(order => (
                    <div key={order.id} className="p-4 bg-white rounded shadow mb-4">
                        <p>Order #{order.id} - {order.status}</p>
                    </div>
                ))
            ) : (
                <p>You have no orders.</p>
            )}
        </div>
    );
};
