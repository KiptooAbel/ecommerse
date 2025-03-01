// components/BookCard.jsx
import React from 'react';
import { Star, ShoppingBag, Heart } from 'lucide-react';

const BookCard = ({ book, addToCart, addToWishlist, formatPrice, isLoading }) => {
  const imagePath = book.primary_image ? book.primary_image.path : '/images/default-book-cover.jpg';
  
  // Calculate average rating from reviews
  const averageRating = book.reviews && book.reviews.length 
    ? book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length 
    : 0;
  
  // Handle adding to cart  
  const handleAddToCart = () => {
    if (book.stock > 0 && !isLoading) {
      addToCart(book.id, 1);
    }
  };
  
  // Handle adding to wishlist
  const handleAddToWishlist = () => {
    if (!isLoading) {
      addToWishlist(book.id);
    }
  };
    
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
              onClick={handleAddToWishlist} 
              className={`p-2 text-gray-500 hover:text-red-500 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
              aria-label="Add to wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>
            
            <button 
              onClick={handleAddToCart} 
              className={`p-2 text-blue-700 hover:text-blue-800 transition-colors ${(isLoading || book.stock < 1) ? 'opacity-50 cursor-not-allowed' : ''}`}
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

export default BookCard;