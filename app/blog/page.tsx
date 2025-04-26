import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI Sentence Rewriter Blog | Writing Tips & Resources",
  description: "Explore expert guides and tips on using AI sentence rewriters effectively. Learn best practices for improving your writing with free AI tools.",
  keywords: "sentence rewriter blog, ai sentence rewriter tips, free ai sentence rewriter guides, sentence rewriter tutorials",
};

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
}

export default function BlogIndex() {
  const blogPosts: BlogPost[] = [
    {
      slug: 'best-free-ai-sentence-rewriter-tools',
      title: '5 Best Free AI Sentence Rewriter Tools in 2023',
      description: 'Discover the top free AI sentence rewriter tools that can transform your writing. Compare features, accuracy, and usability of the best AI rewriting tools available.',
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      readTime: '6 min read',
    },
    {
      slug: 'how-to-use-ai-sentence-rewriter',
      title: 'How to Use an AI Sentence Rewriter Effectively: Complete Guide',
      description: 'Learn how to use AI sentence rewriter tools to transform your writing. This step-by-step guide covers best practices, tips, and advanced techniques.',
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      readTime: '8 min read',
    },
    // Add more blog posts here as they are created
  ];

  return (
    <>
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-6">
            AI Sentence Rewriter Blog
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Explore our collection of guides, tips, and resources to help you make the most of 
            your writing with our free AI sentence rewriter tool.
          </p>

          <div className="space-y-10">
            {blogPosts.map((post) => (
              <article key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-10">
                <Link href={`/blog/${post.slug}`} className="block group">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-3">
                    {post.title}
                  </h2>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <time dateTime={post.date}>
                      {post.date}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.description}
                  </p>
                  
                  <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                    Read article
                    <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
              </article>
            ))}
          </div>
          
          <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Want to Improve Your Writing Right Now?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Try our free AI sentence rewriter tool to instantly transform your text and make it more clear, professional, or creative.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
            >
              Try Free AI Sentence Rewriter
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 