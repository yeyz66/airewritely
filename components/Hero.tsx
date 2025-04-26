import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-800 py-24 sm:py-32 lg:py-40">
      {/* Optional: Add subtle background patterns or elements here */}
      {/* <div className="absolute inset-0 opacity-5 dark:opacity-10 [background-image:radial-gradient(circle_at_50%_0,#a7a7a7,transparent_70%)]"></div> */}

      <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl leading-tight mb-6">
          Free AI <span className="text-blue-600 dark:text-blue-400">Sentence Rewriter</span> Tool
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          Transform your writing instantly with our advanced AI sentence rewriter. Choose from professional, casual, formal, or creative styles - all for free. Perfect for students, content creators, and professionals.
        </p>
        <div className="flex items-center justify-center gap-x-6">
          <Link
            href="#rewriter"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200 group"
          >
            Try Our Free AI Sentence Rewriter
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="#features" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white group">
            Learn more <span aria-hidden="true" className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        
        {/* Added SEO-rich text section */}
        <div className="mt-16 max-w-3xl mx-auto text-left">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Why Choose Our AI Sentence Rewriter?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            Our <strong>free AI sentence rewriter</strong> uses advanced technology to help you transform any text while preserving your original meaning. Whether you need to make your writing more professional, casual, formal or creative, our tool delivers quality results instantly.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Unlike other sentence rewriters, our <strong>free AI-powered tool</strong> allows you to control the degree of change and select specific writing styles. Try our <strong>sentence rewriter tool</strong> today and experience the difference.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero; 