// Components/NewsletterSection.jsx
import React from 'react';

const NewsletterSection = () => {
  return (
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
  );
};

export default NewsletterSection;