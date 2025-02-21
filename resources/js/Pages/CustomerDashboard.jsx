import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from "react";
import { Link } from "@inertiajs/react";
import { ShoppingCart, Package, Heart, User } from "lucide-react";

const CustomerDashboard = () => {
    return (        <AuthenticatedLayout>
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
                <p className="text-gray-600 mb-6">Manage your orders, cart, wishlist, and profile from here.</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link 
                        href="/cart"
                        className="p-4 bg-blue-500 text-white rounded-lg flex flex-col items-center justify-center hover:bg-blue-600">
                        <ShoppingCart size={32} />
                        <span className="mt-2">Cart</span>
                    </Link>

                    <Link 
                        href="/orders"
                        className="p-4 bg-green-500 text-white rounded-lg flex flex-col items-center justify-center hover:bg-green-600">
                        <Package size={32} />
                        <span className="mt-2">Orders</span>
                    </Link>

                    <Link 
                        href="/wishlist"
                        className="p-4 bg-pink-500 text-white rounded-lg flex flex-col items-center justify-center hover:bg-pink-600">
                        <Heart size={32} />
                        <span className="mt-2">Wishlist</span>
                    </Link>

                    <Link 
                        href="/profile"
                        className="p-4 bg-gray-700 text-white rounded-lg flex flex-col items-center justify-center hover:bg-gray-800">
                        <User size={32} />
                        <span className="mt-2">Profile</span>
                    </Link>
                </div>
            </div>
            </div>         </AuthenticatedLayout>
    );
};

export default CustomerDashboard;
