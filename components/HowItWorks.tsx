import React from 'react';
import { ClipboardPaste, Settings2, Sparkles, FileText } from 'lucide-react';

interface StepProps {
  stepNumber: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ stepNumber, icon: Icon, title, description }) => (
  <div className="flex">
    <div className="flex-shrink-0 mr-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
        <span className="font-bold text-sm">{stepNumber}</span>
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 flex items-center">
        <Icon className="h-5 w-5 mr-2 inline-block text-blue-500 dark:text-blue-400" aria-hidden="true" />
        {title}
      </h3>
      <p className="text-base text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </div>
);

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: ClipboardPaste,
      title: 'Paste Your Text',
      description: 'Enter or paste the sentence or paragraph you want to rewrite into the input field.',
    },
    {
      icon: Settings2,
      title: 'Select Options',
      description: 'Choose your desired writing style (e.g., professional, casual) and the intensity of the changes.',
    },
    {
      icon: Sparkles,
      title: 'Click Rewrite',
      description: 'Hit the button and let our advanced AI engine work its magic instantly.',
    },
    {
      icon: FileText,
      title: 'Get Enhanced Text',
      description: 'Receive the improved text, ready to use, reflecting your chosen style and intensity.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">How It Works</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Rewrite in 4 Simple Steps
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Get started easily and see results in seconds.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-10 md:space-y-12">
            {steps.map((step, index) => (
              <Step key={step.title} stepNumber={index + 1} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 