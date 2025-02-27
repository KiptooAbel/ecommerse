// Home.jsx
import React, { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { ChevronRight, Star, ShoppingBag, Heart } from 'lucide-react';

// Import our components
import  Header from '../Components/Header';
import Footer  from '../Components/Footer';

import HeroSection from '../Components/HeroSection';

const Home = () => {
  const { featured_books, new_releases, kenyan_authors } = usePage().props;
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle adding to cart
  const addToCart = (bookId) => {
    setIsLoading(true);
    Inertia.post(route('cart.add'), { bookId }, {
      onSuccess: () => {
        setIsLoading(false);
        // You could add a toast notification here
      },
      onError: () => {
        setIsLoading(false);
      }
    });
  };

  // Function to handle wishlist
  const addToWishlist = (bookId) => {
    Inertia.post(route('wishlist.add'), { bookId });
  };

  // Format price in KSh
  const formatPrice = (price) => {
    return `KSh ${price.toLocaleString()}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Featured Books Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-900">Featured Books</h2>
              <a href="#" className="flex items-center text-blue-700 hover:text-blue-800">
                View All <ChevronRight className="h-5 w-5 ml-1" />
              </a>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {featured_books && featured_books.map((book) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  addToCart={addToCart} 
                  addToWishlist={addToWishlist}
                  formatPrice={formatPrice}
                  isLoading={isLoading}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* New Releases Section */}
        <section className="py-12 px-4 bg-blue-50">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-900">New Releases</h2>
              <a href="#" className="flex items-center text-blue-700 hover:text-blue-800">
                View All <ChevronRight className="h-5 w-5 ml-1" />
              </a>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {new_releases && new_releases.map((book) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  addToCart={addToCart} 
                  addToWishlist={addToWishlist}
                  formatPrice={formatPrice}
                  isLoading={isLoading}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Kenyan Authors Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-900">Kenyan Authors</h2>
              <a href="#" className="flex items-center text-blue-700 hover:text-blue-800">
                View All <ChevronRight className="h-5 w-5 ml-1" />
              </a>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {kenyan_authors && kenyan_authors.map((book) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  addToCart={addToCart} 
                  addToWishlist={addToWishlist}
                  formatPrice={formatPrice}
                  isLoading={isLoading}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-12 px-4 bg-blue-50">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8">Shop by Category</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <a 
                  key={category.id} 
                  href={`/category/${category.id}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="h-32 bg-blue-200 flex items-center justify-center">
                    <span className="text-3xl">{category.emoji}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-center group-hover:text-blue-700">{category.name}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-12 px-4 bg-blue-800 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-6 text-blue-100">Get updates on new releases, exclusive offers, and literary events in Kenya.</p>
            
            <form className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow p-3 rounded-lg"
                required
              />
              <button 
                type="submit" 
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-medium p-3 rounded-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Book Card Component
const BookCard = ({ book, addToCart, addToWishlist, formatPrice, isLoading }) => {
  const imagePath = book.primary_image ? book.primary_image.path : '/images/default-book-cover.jpg';
  
  // Calculate average rating from reviews
  const averageRating = book.reviews && book.reviews.length 
    ? book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length 
    : 0;
    
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Book Cover */}
      <a href={`/book/${book.id}`} className="block relative">
        <div className="aspect-w-2 aspect-h-3 bg-gray-100">
          <img 
            src={imagePath} 
            alt={book.primary_image ? book.primary_image.alt_text : book.title} 
            className="object-cover w-full h-full"
          />
        </div>
        
        {/* Out of Stock Badge */}
        {book.stock < 1 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </a>
      
      {/* Book Details */}
      <div className="p-4">
        <a href={`/book/${book.id}`} className="block">
          <h3 className="font-medium text-gray-900 hover:text-blue-700 truncate">{book.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        </a>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className={`h-4 w-4 ${star <= Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            ({book.reviews ? book.reviews.length : 0})
          </span>
        </div>
        
        {/* Price */}
        <div className="flex justify-between items-center">
          <span className="font-bold text-blue-900">{formatPrice(book.price)}</span>
          
          {/* Action Buttons */}
          <div className="flex gap-1">
            <button 
              onClick={() => addToWishlist(book.id)} 
              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>
            
            <button 
              onClick={() => addToCart(book.id)} 
              className={`p-2 text-blue-700 hover:text-blue-800 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading || book.stock < 1}
              aria-label="Add to cart"
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample categories data (this would typically come from the backend)
const categories = [
  { id: 1, name: 'Fiction', emoji: '📚' },
  { id: 2, name: 'Non-Fiction', emoji: '🧠' },
  { id: 3, name: 'Kenyan Literature', emoji: '🇰🇪' },
  { id: 4, name: 'Children\'s Books', emoji: '👶' },
  { id: 5, name: 'Mystery', emoji: '🔍' },
  { id: 6, name: 'Romance', emoji: '❤️' },
  { id: 7, name: 'Science Fiction', emoji: '🚀' },
  { id: 8, name: 'Self-Help', emoji: '✨' }
];

export default Home;