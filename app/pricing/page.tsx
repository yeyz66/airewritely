'use client';

import React from 'react';
import Header from '../../components/Header';
import Pricing from '../../components/Pricing';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Pricing Plans</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. All plans include our core AI sentence rewriting technology.
            </p>
          </div>
          
          <Pricing />
          
          <div className="text-center mt-12">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="py-8 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} AIRewritely. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 