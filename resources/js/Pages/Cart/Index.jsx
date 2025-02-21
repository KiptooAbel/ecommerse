import React from "react";
import { usePage } from "@inertiajs/react";
import { ShoppingCart } from "lucide-react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


const Index = () => {
    const { cartItems } = usePage().props;

    return (        <AuthenticatedLayout>
        
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-6 flex items-center">
                    <ShoppingCart className="mr-2" /> Your Cart
                </h1>
                {cartItems.length > 0 ? (
                    <div>
                        {cartItems.map(item => (
                            <div key={item.id} className="p-4 border-b last:border-b-0 flex justify-between">
                                <div>
                                    <p className="text-lg font-semibold">{item.book.title}</p>
                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    <p className="text-gray-800 font-bold">Price: ${item.book.price}</p>
                                </div>
                                <div className="flex items-center">
                                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600">Remove</button>
                                </div>
                            </div>
                        ))}
                        <div className="text-right mt-4">
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-green-600">Proceed to Checkout</button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">Your cart is empty.</p>
                )}
            </div>
        </div>
</AuthenticatedLayout>
    );
};

export default Index;
