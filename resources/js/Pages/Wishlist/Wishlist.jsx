import React from "react";
import { Link } from "@inertiajs/react";
import { ShoppingCart, Package, Heart } from "lucide-react";


// Wishlist Page
export const Wishlist = ({ wishlistItems }) => {
    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
            {wishlistItems.length > 0 ? (
                wishlistItems.map(item => (
                    <div key={item.id} className="p-4 bg-white rounded shadow mb-4">
                        <p>{item.book.title}</p>
                    </div>
                ))
            ) : (
                <p>Your wishlist is empty.</p>
            )}
        </div>
    );
};
