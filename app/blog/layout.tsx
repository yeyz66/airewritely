import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "AI Sentence Rewriter Blog | Tips and Guides",
  description: "Learn how to write better with our AI sentence rewriter tips, guides, and best practices. Perfect for students, professionals, and content creators.",
  keywords: "sentence rewriter, ai sentence rewriter, free ai sentence rewriter, writing tips, writing guides",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <section className="bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </div>
      </section>
    </>
  );
} 