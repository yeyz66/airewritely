import React from 'react';
import { SlidersHorizontal, Palette, Zap, BrainCircuit, CheckCircle } from 'lucide-react'; // Import relevant icons

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
      title: 'Multiple Writing Styles',
      description: 'Choose from formal, casual, professional, creative, or concise styles to match your needs.',
    },
    {
      icon: SlidersHorizontal,
      title: 'Adjustable Intensity',
      description: 'Control the degree of change – from subtle tweaks to significant restructuring.',
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get rewritten sentences in seconds, powered by cutting-edge AI technology.',
    },
    {
      icon: BrainCircuit,
      title: 'Advanced AI Engine',
      description: "Utilizes OpenAI's gpt-4.1-nano for nuanced and context-aware rewriting.",
    },
    {
      icon: CheckCircle,
      title: 'Improve Clarity & Impact',
      description: 'Enhance readability, refine your message, and make your writing more effective.',
    },
     {
      icon: CheckCircle, // Re-using icon, can be changed
      title: 'Easy Integration',
      description: 'Simple interface makes it effortless to rewrite text whenever you need it.',
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything You Need to Write Better
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Our AI rewriter provides powerful tools to elevate your text effortlessly.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureItem key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 