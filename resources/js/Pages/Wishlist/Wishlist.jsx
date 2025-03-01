// pages/Wishlist/Wishlist.jsx
import React from 'react';
import { usePage } from '@inertiajs/react';
import { ShoppingBag, Trash } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCart } from '../../Hooks/useCart';
import { useWishlist } from '../../Hooks/useWishlist';

const Wishlist = () => {
  const { wishlist } = usePage().props;
  const { addToCart } = useCart();
  const { removeFromWishlist, moveToCart, isLoading } = useWishlist();

  // Format price in KSh
  const formatPrice = (price) => {
    return `KSh ${price.toLocaleString()}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-blue-900 mb-8">My Wishlist</h1>
          
          {wishlist.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Your wishlist is empty.</p>
              <a href="/" className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800">
                Browse Books
              </a>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Book</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Availability</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {wishlist.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-16 w-12 flex-shrink-0 mr-4">
                            <img 
                              className="h-16 w-12 object-cover" 
                              src={item.book.primary_image ? item.book.primary_image.path : '/images/default-book-cover.jpg'} 
                              alt={item.book.title} 
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.book.title}</div>
                            <div className="text-sm text-gray-500">{item.book.author}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-blue-900">{formatPrice(item.book.price)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.book.stock > 0 ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            In Stock
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => moveToCart(item.id)}
                            disabled={isLoading || item.book.stock < 1}
                            className={`text-blue-600 hover:text-blue-900 ${(isLoading || item.book.stock < 1) ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <ShoppingBag className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            disabled={isLoading}
                            className={`text-red-600 hover:text-red-900 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;