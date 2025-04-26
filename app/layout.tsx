import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sentence Rewriter | Free AI Sentence Rewriter Tool",
  description: "Transform your writing instantly with our free AI sentence rewriter. Professional, casual, formal or creative styles - rewrite any sentence for better clarity and impact.",
  keywords: "sentence rewriter, ai sentence rewriter, sentence rewriter free, ai sentence rewriter free, free ai sentence rewriter, sentence rewriter ai, free ai sentence rewriter tool",
  authors: [{ name: "Sentence Rewriter Team" }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: { url: '/apple-touch-icon.png' },
    shortcut: { url: '/favicon.svg' }
  },
  manifest: '/manifest.json',
  themeColor: '#4F46E5',
  openGraph: {
    type: 'website',
    url: 'https://airewritely.com/',
    title: 'Sentence Rewriter | Free AI Sentence Rewriter Tool',
    description: 'Transform your writing instantly with our free AI sentence rewriter tool. Improve clarity and impact with AI-powered sentence transformations.',
    images: [{ url: 'https://airewritely.com/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sentence Rewriter | Free AI Sentence Rewriter Tool',
    description: 'Transform your writing instantly with our free AI sentence rewriter tool',
    images: ['https://airewritely.com/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://airewritely.com/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
