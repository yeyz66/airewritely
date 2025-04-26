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
          Transform Your Writing Instantly
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
          Leverage advanced AI to rewrite sentences with precision. Choose your desired style and intensity for unparalleled clarity and impact.
        </p>
        <div className="flex items-center justify-center gap-x-6">
          <Link
            href="#rewriter"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200 group"
          >
            Start Rewriting Now
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="#features" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white group">
            Learn more <span aria-hidden="true" className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Optional: Add a subtle visual element like a product screenshot or abstract graphic below */}
        {/* <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <img src="/placeholder-app-screenshot.png" alt="App screenshot" width="2432" height="1442" className="rounded-md shadow-2xl ring-1 ring-gray-900/10" />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Hero; 