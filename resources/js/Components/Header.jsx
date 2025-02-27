// Header.jsx
import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-800 text-white">
      {/* Top announcement bar */}
      <div className="bg-yellow-600 text-center py-1 text-sm text-white">
        <p>Free delivery in Nairobi for orders above KSh 3,000</p>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-yellow-400">TaleStore</h1>
            <p className="hidden md:block ml-2 text-sm italic text-blue-100">Hadithi Zinazoishi Daima</p>
          </div>
          
          {/* Search - hide on mobile */}
          <div className="hidden md:flex flex-1 mx-8 relative">
            <input 
              type="text" 
              placeholder="Tafuta vitabu, waandishi, genre..." 
              className="w-full py-2 px-4 rounded-full text-gray-800 text-sm"
            />
            <Search className="absolute right-3 top-2 h-5 w-5 text-gray-500" />
          </div>
          
          {/* User actions - desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="flex items-center hover:text-yellow-300">
              <Heart className="h-5 w-5 mr-1" />
              <span className="text-sm">Wishlist</span>
            </a>
            <a href="#" className="flex items-center hover:text-yellow-300">
              <ShoppingBag className="h-5 w-5 mr-1" />
              <span className="text-sm">Cart</span>
            </a>
            <a href="#" className="flex items-center hover:text-yellow-300">
              <User className="h-5 w-5 mr-1" />
              <span className="text-sm">Account</span>
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Search - mobile only */}
        <div className="mt-3 md:hidden relative">
          <input 
            type="text" 
            placeholder="Tafuta vitabu..." 
            className="w-full py-2 px-4 rounded-full text-gray-800 text-sm"
          />
          <Search className="absolute right-3 top-2 h-5 w-5 text-gray-500" />
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:block mt-3 border-t border-blue-700 pt-3">
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-yellow-300 text-sm font-medium">Home</a></li>
            <li><a href="#" className="hover:text-yellow-300 text-sm font-medium">New Releases</a></li>
            <li><a href="#" className="hover:text-yellow-300 text-sm font-medium">Kenyan Authors</a></li>
            <li><a href="#" className="hover:text-yellow-300 text-sm font-medium">African Literature</a></li>
            <li><a href="#" className="hover:text-yellow-300 text-sm font-medium">International Bestsellers</a></li>
            <li><a href="#" className="hover:text-yellow-300 text-sm font-medium">School Books</a></li>
            <li><a href="#" className="hover:text-yellow-300 text-sm font-medium">Book Club</a></li>
          </ul>
        </nav>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-900 p-4">
          <nav className="flex flex-col space-y-3 mb-4">
            <a href="#" className="text-blue-100 hover:text-yellow-300">Home</a>
            <a href="#" className="text-blue-100 hover:text-yellow-300">New Releases</a>
            <a href="#" className="text-blue-100 hover:text-yellow-300">Kenyan Authors</a>
            <a href="#" className="text-blue-100 hover:text-yellow-300">African Literature</a>
            <a href="#" className="text-blue-100 hover:text-yellow-300">International Bestsellers</a>
            <a href="#" className="text-blue-100 hover:text-yellow-300">School Books</a>
            <a href="#" className="text-blue-100 hover:text-yellow-300">Book Club</a>
          </nav>
          <div className="flex justify-around border-t border-blue-700 pt-4">
            <a href="#" className="flex flex-col items-center text-blue-100 hover:text-yellow-300">
              <Heart className="h-5 w-5" />
              <span className="text-xs mt-1">Wishlist</span>
            </a>
            <a href="#" className="flex flex-col items-center text-blue-100 hover:text-yellow-300">
              <ShoppingBag className="h-5 w-5" />
              <span className="text-xs mt-1">Cart</span>
            </a>
            <a href="#" className="flex flex-col items-center text-blue-100 hover:text-yellow-300">
              <User className="h-5 w-5" />
              <span className="text-xs mt-1">Account</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;