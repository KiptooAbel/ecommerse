// Components/BookSection.jsx
import React from 'react';
import { ChevronRight } from 'lucide-react';
import BookCard from './BookCard';

const BookSection = ({ 
  title, 
  books, 
  addToCart, 
  addToWishlist, 
  formatPrice, 
  isLoading,
  bgColor = "bg-white" 
}) => {
  return (
    <section className={`py-12 px-4 ${bgColor}`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900">{title}</h2>
          <a href="#" className="flex items-center text-blue-700 hover:text-blue-800">
            View All <ChevronRight className="h-5 w-5 ml-1" />
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books && books.map((book) => (
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
  );
};

export default BookSection;