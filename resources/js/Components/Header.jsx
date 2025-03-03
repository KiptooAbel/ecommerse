import React, { useState, useRef, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, ChevronRight, Menu, X } from 'lucide-react';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const headerRef = useRef(null);
  const user = usePage().props.auth.user;

  // Function to update header height
  const updateHeaderHeight = () => {
    if (headerRef.current) {
      const mainHeaderHeight = headerRef.current.querySelector('.main-header-container').offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${mainHeaderHeight}px`);
    }
  };

  // Calculate header height on mount, window resize, and when menu/search state changes
  useEffect(() => {
    updateHeaderHeight();
    
    // Add resize listener
    window.addEventListener('resize', updateHeaderHeight);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [isSearchOpen]); // Don't include isMenuOpen since it's now absolute

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    // Update header height after state change
    setTimeout(updateHeaderHeight, 10);
  };

  return (
    <>
      <header 
        ref={headerRef} 
        className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white fixed w-full top-0 z-50"
      >
        {/* Main header */}
        <div className="container mx-auto px-4 py-3 main-header-container">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-teal-300">TaleStore</h1>
              <p className="hidden md:block ml-2 text-sm italic text-indigo-200">Hadithi Zinazoishi Daima</p>
            </div>
            
            {/* Search - hide on mobile */}
            <div className="hidden md:flex flex-1 mx-8 relative">
              <input 
                type="text" 
                placeholder="Tafuta vitabu, waandishi, genre..." 
                className="w-full py-2 px-4 rounded-full text-gray-800 text-sm focus:ring-2 focus:ring-teal-400 focus:outline-none border border-indigo-200"
              />
              <Search className="absolute right-3 top-2 h-5 w-5 text-indigo-400" />
            </div>
            
            {/* User actions - desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="/wishlist" className="flex items-center hover:text-teal-300 transition-colors duration-200">
                <Heart className="h-5 w-5 mr-1" />
                <span className="text-sm">Wishlist</span>
              </a>
              <a href="/cart" className="flex items-center hover:text-teal-300 transition-colors duration-200">
                <ShoppingBag className="h-5 w-5 mr-1" />
                <span className="text-sm">Cart</span>
              </a>
              <Dropdown>
                <Dropdown.Trigger>
                  <button className="flex items-center gap-2 rounded-lg hover:bg-indigo-700 px-2 py-1.5 transition-colors duration-200">
                    <div className="h-7 w-7 rounded-full bg-teal-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-700">
                        {user ? user.name.charAt(0) : 'G'}
                      </span>
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="text-xs font-medium text-white">{user ? user.name : 'Guest'}</div>
                      <div className="text-xs text-indigo-200">{user ? 'Member' : 'Sign in'}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-indigo-200" />
                  </button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                  {user ? (
                    <>
                      <Dropdown.Link href={route('profile.edit')}>My Profile</Dropdown.Link>
                      <Dropdown.Link href={route('dashboard')}>My Orders</Dropdown.Link>
                      <Dropdown.Link href={route('dashboard')}>Account Settings</Dropdown.Link>
                      <Dropdown.Link href={route('logout')} method="post" as="button">
                        Log Out
                      </Dropdown.Link>
                    </>
                  ) : (
                    <>
                      <Dropdown.Link href={route('login')}>Log In</Dropdown.Link>
                      <Dropdown.Link href={route('register')}>Create Account</Dropdown.Link>
                    </>
                  )}
                </Dropdown.Content>
              </Dropdown>
            </div>
            
            {/* Mobile actions row */}
            <div className="md:hidden flex items-center space-x-3">
              <button onClick={toggleSearch} className="p-1.5 hover:bg-indigo-700 rounded-lg transition-colors duration-200">
                <Search className="h-5 w-5" />
              </button>
              <a href="/wishlist" className="p-1.5 hover:bg-indigo-700 rounded-lg transition-colors duration-200">
                <Heart className="h-5 w-5" />
              </a>
              <a href="/cart" className="p-1.5 hover:bg-indigo-700 rounded-lg transition-colors duration-200">
                <ShoppingBag className="h-5 w-5" />
              </a>
              <button 
                onClick={toggleMenu} 
                className="p-1.5 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {/* Mobile search - toggled by search icon */}
          {isSearchOpen && (
            <div className="mt-3 md:hidden relative">
              <input 
                type="text" 
                placeholder="Tafuta vitabu..." 
                className="w-full py-2 px-4 rounded-full text-gray-800 text-sm focus:ring-2 focus:ring-teal-400 focus:outline-none border border-indigo-200"
              />
              <button onClick={toggleSearch} className="absolute right-3 top-2">
                <X className="h-5 w-5 text-indigo-400" />
              </button>
            </div>
          )}
          
          {/* Desktop navigation */}
          <nav className="hidden md:block mt-3 border-t border-indigo-700 pt-3">
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:text-teal-300 text-sm font-medium transition-colors duration-200">Home</a></li>
              <li><a href="#" className="hover:text-teal-300 text-sm font-medium transition-colors duration-200">New Releases</a></li>
              <li><a href="#" className="hover:text-teal-300 text-sm font-medium transition-colors duration-200">Kenyan Authors</a></li>
              <li><a href="#" className="hover:text-teal-300 text-sm font-medium transition-colors duration-200">African Literature</a></li>
              <li><a href="#" className="hover:text-teal-300 text-sm font-medium transition-colors duration-200">International Bestsellers</a></li>
              <li><a href="#" className="hover:text-teal-300 text-sm font-medium transition-colors duration-200">School Books</a></li>
              <li><a href="#" className="hover:text-teal-300 text-sm font-medium transition-colors duration-200">Book Club</a></li>
            </ul>
          </nav>
        </div>
        
        {/* Mobile menu - absolute position so it overlays content */}
        {isMenuOpen && (
          <div className="md:hidden bg-indigo-900 p-4 shadow-lg absolute w-full">
            <nav className="flex flex-col space-y-3 mb-4">
              <a href="#" className="text-indigo-100 hover:text-teal-300 transition-colors duration-200">Home</a>
              <a href="#" className="text-indigo-100 hover:text-teal-300 transition-colors duration-200">New Releases</a>
              <a href="#" className="text-indigo-100 hover:text-teal-300 transition-colors duration-200">Kenyan Authors</a>
              <a href="#" className="text-indigo-100 hover:text-teal-300 transition-colors duration-200">African Literature</a>
              <a href="#" className="text-indigo-100 hover:text-teal-300 transition-colors duration-200">International Bestsellers</a>
              <a href="#" className="text-indigo-100 hover:text-teal-300 transition-colors duration-200">School Books</a>
              <a href="#" className="text-indigo-100 hover:text-teal-300 transition-colors duration-200">Book Club</a>
            </nav>
            <div className="flex justify-center border-t border-indigo-700 pt-4">
              <a href="#" className="flex items-center space-x-2 text-indigo-100 hover:text-teal-300 transition-colors duration-200">
                <User className="h-5 w-5" />
                <span className="text-sm">{user ? 'My Account' : 'Sign In'}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Add this to your global stylesheet or layout component */}
      <style jsx global>{`
        :root {
          --header-height: 0px;
        }
        
        body {
          padding-top: var(--header-height);
        }
      `}</style>
    </>
  );
};

export default Header;