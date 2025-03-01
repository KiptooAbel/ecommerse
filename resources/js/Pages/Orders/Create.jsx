import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function OrderCreate({ books }) {
    const { data, setData, post, processing } = useForm({
        user_id: "", // Will be automatically set in the backend
        order_items: [],
        total_amount: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("orders.store"));
    };

    return (<AuthenticatedLayout>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Place an Order</h1>
            <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
                {/* Display selected books (if implemented) */}
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    {processing ? "Placing Order..." : "Confirm Order"}
                </button>
            </form>
        </div></AuthenticatedLayout>
    );
}
