'use client'; // Add this line for client-side hooks

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react'; // Example icon
import { useSession, signIn, signOut } from 'next-auth/react'; // Import next-auth hooks

const Header: React.FC = () => {
  const { data: session, status } = useSession(); // Get session status
  const loading = status === "loading";

  // Basic structure, enhance with navigation, logo, mobile menu later
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4 md:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          {/* Use the SVG favicon as logo */}
          <Image src="/favicon.svg" alt="AIRewritely Logo" width={24} height={24} />
          <span className="font-bold text-lg">AIRewritely</span>
        </Link>
        <nav className="hidden flex-1 items-center space-x-6 text-sm font-medium md:flex">
          <Link href="#features" className="text-foreground/60 transition-colors hover:text-foreground/80">Features</Link>
          <Link href="#how-it-works" className="text-foreground/60 transition-colors hover:text-foreground/80">How It Works</Link>
          <Link href="#pricing" className="text-foreground/60 transition-colors hover:text-foreground/80">Pricing</Link>
          <Link href="#faq" className="text-foreground/60 transition-colors hover:text-foreground/80">FAQ</Link>
          <Link href="/blog" className="text-foreground/60 transition-colors hover:text-foreground/80">Blog</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </button>
          {/* Add Login/Signup or other actions if needed */}
          {loading ? (
            <div className="h-9 w-20 animate-pulse rounded-md bg-gray-300 dark:bg-gray-700"></div> // Placeholder while loading
          ) : session ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-foreground/80 hidden sm:inline">{session.user?.email || session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn('google')} // Trigger Google Sign-In
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            >
              Sign In
            </button>
          )}

          {/* Existing Try Now Button */}
          {!session && (
             <Link href="#rewriter">
               <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 ml-2 hidden sm:inline-flex">
                  Try Now
               </button>
            </Link>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header; 