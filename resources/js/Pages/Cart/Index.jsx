// pages/Cart/Index.jsx
import React from 'react';
import { usePage } from '@inertiajs/react';
import { Trash, Plus, Minus } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCart } from '../../Hooks/useCart';import { router } from '@inertiajs/react';




const Cart = () => {
  const { cartItems } = usePage().props;
  const { updateQuantity, removeFromCart, isLoading } = useCart();
  const handleCheckout = () => {
    router.visit('/checkout');
  };
  // Format price in KSh
  const formatPrice = (price) => {
    return `KSh ${price.toLocaleString()}`;
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.book.price * item.quantity);
    }, 0);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-blue-900 mb-8">Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Your cart is empty.</p>
              <a href="/" className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800">
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Book</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cartItems.map((item) => (
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
                            <div className="text-sm text-gray-900">{formatPrice(item.book.price)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <button 
                                onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                                disabled={isLoading || item.quantity <= 1}
                                className={`p-1 rounded-full border border-gray-300 ${(isLoading || item.quantity <= 1) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="mx-2 w-8 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                                disabled={isLoading || item.quantity >= item.book.stock}
                                className={`p-1 rounded-full border border-gray-300 ${(isLoading || item.quantity >= item.book.stock) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-blue-900">{formatPrice(item.book.price * item.quantity)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              disabled={isLoading}
                              className={`text-red-600 hover:text-red-900 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              <Trash className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-bold text-blue-900 mb-4">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-200 pb-4">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatPrice(calculateSubtotal())}</span>
                    </div>
                    
                    <div className="flex justify-between border-b border-gray-200 pb-4">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">Free</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-bold">Total</span>
                      <span className="font-bold text-blue-900">{formatPrice(calculateSubtotal())}</span>
                    </div>
                    
                    <button 
                            onClick={handleCheckout}
                            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 font-medium"
                          >
                            Proceed to Checkout
                    </button>

                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;