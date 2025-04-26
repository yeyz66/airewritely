import React from 'react';
import { SlidersHorizontal, Palette, Zap, BrainCircuit, CheckCircle, Lock } from 'lucide-react'; // Import relevant icons

interface FeatureItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center p-6 text-center bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
      <Icon className="h-6 w-6" aria-hidden="true" />
    </div>
    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: Palette,
      title: 'Multiple AI Rewriting Styles',
      description: 'Our free AI sentence rewriter offers formal, casual, professional, creative, and concise styles to perfectly match your needs.',
    },
    {
      icon: SlidersHorizontal,
      title: 'Adjustable Rewriting Intensity',
      description: 'Control exactly how much our AI sentence rewriter changes your text – from subtle improvements to complete transformations.',
    },
    {
      icon: Zap,
      title: 'Instant Sentence Transformations',
      description: 'Get your sentences rewritten in seconds with our lightning-fast free AI sentence rewriter tool.',
    },
    {
      icon: BrainCircuit,
      title: 'Powered by Advanced AI',
      description: "Our sentence rewriter utilizes OpenAI's powerful models for context-aware, intelligent text transformations.",
    },
    {
      icon: CheckCircle,
      title: 'Enhance Clarity & Impact',
      description: 'Our AI sentence rewriter improves readability, refines your message, and makes your writing more effective.',
    },
     {
      icon: Lock,
      title: 'Completely Free to Use',
      description: 'Unlike other tools, our AI sentence rewriter is completely free with no hidden charges or premium restrictions.',
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Why Our Free AI Sentence Rewriter Stands Out
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Our AI sentence rewriter tool offers powerful features to transform your writing instantly and effectively.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureItem key={feature.title} {...feature} />
          ))}
        </div>
        
        {/* Added SEO content block */}
        <div className="mt-16 mx-auto max-w-3xl text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            The Ultimate Free AI Sentence Rewriter
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Whether you&apos;re a student, professional writer, content creator, or business owner, our sentence rewriter tool helps you communicate more effectively. With our AI-powered technology, you can transform ordinary text into polished, professional content in seconds.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Try our free AI sentence rewriter today and experience the difference it makes in your writing quality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features; 