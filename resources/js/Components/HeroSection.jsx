// HeroSection.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Discover Kenya's <span className="text-yellow-400">Finest Collection</span> of Stories
            </h1>
            <p className="text-lg text-blue-100 mb-6">
              From award-winning Kenyan authors to international bestsellers, find your next literary adventure at TaleStore.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#" 
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold py-3 px-6 rounded-full inline-flex items-center justify-center"
              >
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="border border-white hover:border-yellow-400 hover:text-yellow-400 py-3 px-6 rounded-full inline-flex items-center justify-center"
              >
                Featured Authors
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="bg-blue-800 bg-opacity-50 px-4 py-2 rounded-lg">
                <p className="text-sm font-semibold">Fast Delivery</p>
                <p className="text-xs text-blue-200">Across Kenya</p>
              </div>
              <div className="bg-blue-800 bg-opacity-50 px-4 py-2 rounded-lg">
                <p className="text-sm font-semibold">M-Pesa Accepted</p>
                <p className="text-xs text-blue-200">Secure Payments</p>
              </div>
              <div className="bg-blue-800 bg-opacity-50 px-4 py-2 rounded-lg">
                <p className="text-sm font-semibold">10% Student Discount</p>
                <p className="text-xs text-blue-200">With Valid ID</p>
              </div>
            </div>
          </div>
          
          {/* Image Section */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              {/* Main Book */}
              <div className="w-64 h-80 bg-white rounded-lg shadow-lg transform rotate-6 overflow-hidden">
                <div className="h-full bg-yellow-400 p-4 flex items-center justify-center">
                  <p className="text-blue-900 font-bold text-xl text-center">
                    Featured Novel of the Month
                  </p>
                </div>
              </div>
              
              {/* Background Books */}
              <div className="absolute -top-4 -left-8 w-48 h-64 bg-blue-200 rounded-lg shadow-lg transform -rotate-6 -z-10">
                <div className="h-full bg-blue-600 p-4">
                </div>
              </div>
              <div className="absolute -bottom-4 -right-8 w-48 h-64 bg-yellow-200 rounded-lg shadow-lg transform -rotate-12 -z-10">
                <div className="h-full bg-yellow-600 p-4">
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white rounded-full shadow-lg p-3 animate-pulse">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  30% OFF
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="text-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
          <path 
            fill="white" 
            fillOpacity="1" 
            d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,42.7C840,32,960,32,1080,42.7C1200,53,1320,75,1380,85.3L1440,96L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;