import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Checkout = () => {
  const { cartItems = [], user, shippingAddress } = usePage().props;

  const [formData, setFormData] = useState({
    address: shippingAddress?.address || '',
    county: shippingAddress?.county || '',
    town: shippingAddress?.town || '',
    zip_code: shippingAddress?.zip_code || '',
    country: shippingAddress?.country || '',
  });

  // Format price safely
  const formatPrice = (price) => {
    if (typeof price !== 'number' || isNaN(price)) return 'KSh 0';
    return `KSh ${price.toLocaleString()}`;
  };

  // Calculate total price safely
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.book?.price ?? 0; // Ensure price is valid
      const quantity = item.quantity ?? 1; // Ensure quantity is at least 1
      return total + price * quantity;
    }, 0);
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle address update
  const handleAddressUpdate = (e) => {
    e.preventDefault();
    router.post('/checkout/shipping', formData);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-3xl bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-blue-900 mb-6">Checkout</h1>

          <form onSubmit={handleAddressUpdate} className="space-y-4">
            <h2 className="text-xl font-semibold">Shipping Details</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">County</label>
                <input
                  type="text"
                  name="county"
                  value={formData.county}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Town</label>
                <input
                  type="text"
                  name="town"
                  value={formData.town}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                <input
                  type="text"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 font-medium"
            >
              Save & Proceed to Payment
            </button>
          </form>

          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            {cartItems.length > 0 ? (
              <>
                <ul className="divide-y">
                  {cartItems.map((item, index) => (
                    <li key={index} className="flex justify-between py-2">
                      <span>
                        {item.book?.title || 'Unknown Item'} (x{item.quantity || 1})
                      </span>
                      <span>{formatPrice((item.book?.price ?? 0) * (item.quantity ?? 1))}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between text-lg font-semibold border-t pt-4">
                  <span>Total:</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
