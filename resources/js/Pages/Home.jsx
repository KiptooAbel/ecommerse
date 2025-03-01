// Home.jsx
import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import HeroSection from '../Components/HeroSection';
import BookSection from '../Components/BookSection';
import CategorySection from '../Components/CategorySection';
import NewsletterSection from '../Components/NewsletterSection';
import { useCart } from '../Hooks/useCart';
import { useWishlist } from '../Hooks/useWishlist';

const Home = () => {
  const { featured_books, new_releases, kenyan_authors } = usePage().props;
  const { addToCart, isLoading } = useCart();
  const { addToWishlist } = useWishlist();

  // Format price in KSh
  const formatPrice = (price) => {
    return `KSh ${price.toLocaleString()}`;
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        <BookSection
          title="Featured Books"
          books={featured_books}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          formatPrice={formatPrice}
          isLoading={isLoading}
          bgColor="bg-white"
        />
        
        <BookSection
          title="New Releases"
          books={new_releases}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          formatPrice={formatPrice}
          isLoading={isLoading}
          bgColor="bg-blue-50"
        />
        
        <BookSection
          title="Kenyan Authors"
          books={kenyan_authors}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          formatPrice={formatPrice}
          isLoading={isLoading}
          bgColor="bg-white"
        />
        
        <CategorySection 
          title="Shop by Category"
          categories={categories}
          bgColor="bg-blue-50"
        />
        
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;