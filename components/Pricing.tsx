import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

interface PricingTierProps {
  name: string;
  price: string;
  frequency: string;
  description: string;
  features: string[];
  cta: string;
  mostPopular?: boolean;
  href: string;
}

const PricingTier: React.FC<PricingTierProps> = ({
  name,
  price,
  frequency,
  description,
  features,
  cta,
  mostPopular = false,
  href,
}) => (
  <div
    className={`relative flex flex-col rounded-2xl border ${mostPopular ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500 dark:ring-blue-400' : 'border-gray-200 dark:border-gray-700'} p-8 shadow-sm bg-white dark:bg-gray-800`}
  >
    {mostPopular && (
      <div className="absolute top-0 right-0 mr-4 -mt-3">
        <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-1 text-xs font-semibold leading-5 text-blue-700 dark:text-blue-300">
          Most Popular
        </span>
      </div>
    )}
    <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">{name}</h3>
    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
    <div className="mt-6">
      <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{price}</span>
      <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400">{frequency}</span>
    </div>
    <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-400 flex-grow">
      {features.map((feature) => (
        <li key={feature} className="flex gap-x-3">
          <Check className="h-6 w-5 flex-none text-blue-600 dark:text-blue-400" aria-hidden="true" />
          {feature}
        </li>
      ))}
    </ul>
    <Link
      href={href}
      className={`mt-8 block rounded-md px-3.5 py-2 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${mostPopular
          ? 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400'
          : 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-300 ring-1 ring-inset ring-blue-200 dark:ring-blue-800 hover:ring-blue-300 dark:hover:ring-blue-600'
        }`}
    >
      {cta}
    </Link>
  </div>
);

const Pricing: React.FC = () => {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      frequency: '/month',
      description: 'Get started with essential rewriting features.',
      features: [
        '5 Rewrites per day',
        '2 Writing styles (Casual, Professional)',
        'Standard AI model',
        'Basic support',
      ],
      cta: 'Start for Free',
      href: '#rewriter',
    },
    {
      name: 'Pro',
      price: '$10',
      frequency: '/month',
      description: 'Unlock more power for frequent users and professionals.',
      features: [
        '100 Rewrites per day',
        'All 5 Writing styles',
        'Adjustable intensity control',
        'Advanced AI model (gpt-4.1-nano)',
        'Priority support',
      ],
      cta: 'Get Started',
      mostPopular: true,
      href: '#', // Placeholder link for signup/upgrade
    },
    {
      name: 'Team',
      price: '$25',
      frequency: '/month/user',
      description: 'Collaborative features for teams and businesses.',
      features: [
        'Unlimited Rewrites',
        'All Pro features',
        'Team collaboration tools (coming soon)',
        'Usage analytics',
        'Dedicated account manager',
      ],
      cta: 'Contact Sales',
      href: '#', // Placeholder link for contact
    },
  ];

  return (
    <section id="pricing" className="relative isolate bg-white dark:bg-black py-20 sm:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">Pricing</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Simple Plans for Everyone
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Choose the plan that fits your needs, from occasional use to professional demands.
          </p>
        </div>
        <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <PricingTier key={tier.name} {...tier} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing; 