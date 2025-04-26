import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react'; // Example social icons

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Side: Copyright & Logo (optional) */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {currentYear} RewriterPro. All rights reserved.
            </p>
            {/* Optional: Add Logo here */}
            {/* <Link href="/" className="mt-2 inline-block">
              <span className="font-bold text-lg text-gray-800 dark:text-gray-200">RewriterPro</span>
            </Link> */}
          </div>

          {/* Middle: Quick Links (optional) */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 md:mb-0">
            <Link href="#features" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</Link>
            <Link href="#faq" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">FAQ</Link>
            <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</Link>
          </nav>

          {/* Right Side: Social Links */}
          <div className="flex justify-center space-x-5">
            <Link href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <span className="sr-only">GitHub</span>
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 