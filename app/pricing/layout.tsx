import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans | AIRewritely - AI Sentence Rewriter Tool",
  description: "Explore our AI sentence rewriting pricing plans. Choose from Free, Pro, and Enterprise options to enhance your writing efficiency.",
  keywords: "pricing plans, ai sentence rewriter pricing, sentence rewriter subscription, ai rewriter plans",
};

export default function PricingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
} 