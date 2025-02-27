import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">About TaleStore</h3>
            <p className="text-sm text-blue-100 mb-4">
              Kenya's premier bookstore for novels, dedicated to bringing you the best stories from 
              across Kenya, Africa, and the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-100 hover:text-yellow-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-yellow-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-yellow-400">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="text-blue-100 hover:text-yellow-400">About Us</a></li>
              <li><a href="#" className="text-blue-100 hover:text-yellow-400">Shipping Policy</a></li>
              <li><a href="#" className="text-blue-100 hover:text-yellow-400">Return Policy</a></li>
              <li><a href="#" className="text-blue-100 hover:text-yellow-400">FAQs</a></li>
              <li><a href="#" className="text-blue-100 hover:text-yellow-400">Terms & Conditions</a></li>
              <li><a href="#" className="text-blue-100 hover:text-yellow-400">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Categories</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="text-blue-100 hover:text-yellow-400">Fiction</a></li>
              <li><a href="#" className="text-blue-100 hover:text-yellow-400">Non-Fiction</a></li>
              <li><a href="#" className="text-blue-100 hover:text-yellow-400">Kenyan Literature</a></li>
              <li><a href="#" className="text-blue-100 hover:text-yellow-400">African Literature</a></li>
              <li><a href="#" className="text-blue-100 hover:text-yellow-400">Children's Books</a></li>
              <li><a href="#" className="text-blue-100 hover:text-yellow-400">School Textbooks</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Contact Us</h3>
            <ul className="text-sm space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 text-blue-300" />
                <span className="text-blue-100">
                  TaleStore, Moi Avenue
                  <br />Central Business District
                  <br />Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0 text-blue-300" />
                <span className="text-blue-100">+254 700 123 456</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0 text-blue-300" />
                <span className="text-blue-100">info@talestore.co.ke</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-sm text-blue-200">
          <p className="mb-2">We accept M-Pesa, Visa, Mastercard, and American Express</p>
          <p>&copy; {new Date().getFullYear()} TaleStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;