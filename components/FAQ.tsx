'use client'; // Need client component for Disclosure state

import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const faqs: FaqItem[] = [
    {
      question: 'What is an AI sentence rewriter?',
      answer:
        'An AI sentence rewriter is a tool that uses artificial intelligence to transform your text while preserving its original meaning. Our free AI sentence rewriter tool analyzes your input and generates alternative phrasings based on the style and degree of change you select.',
    },
    {
      question: 'Is this sentence rewriter tool really free?',
      answer:
        'Yes, our AI sentence rewriter is completely free to use. We offer premium plans with additional features, but our core sentence rewriting functionality is available to everyone at no cost.',
    },
    {
      question: 'How does this AI sentence rewriter work?',
      answer:
        'Our free AI sentence rewriter uses OpenAI\'s powerful gpt-4.1-nano model, specifically optimized for language tasks like rewriting. When you input text, select a style and degree of change, our AI analyzes your content and provides alternative phrasings that match your requirements while maintaining the original meaning.',
    },
    {
      question: 'How does the \'degree of change\' setting work?',
      answer:
        'The \'degree of change\' setting in our sentence rewriter allows you to control how much the AI alters your original text. \'Slight\' focuses on minimal grammar/clarity tweaks, \'Moderate\' offers more noticeable improvements in flow and phrasing, and \'Significant\' allows for substantial restructuring and vocabulary changes while preserving the core meaning.',
    },
    {
      question: 'Is there a limit to the text length I can rewrite?',
      answer:
        "While our free AI sentence rewriter doesn't have a strict character limit enforced by the interface, the underlying AI model has token limits. For best results, we recommend rewriting paragraph by paragraph rather than entire documents at once. The free plan also has daily usage limits.",
    },
    {
      question: 'Why should I use an AI sentence rewriter?',
      answer:
        'An AI sentence rewriter helps you improve clarity, adjust tone, eliminate repetition, and enhance overall readability. It\'s perfect for students improving essays, professionals polishing business communications, content creators enhancing blog posts, or anyone looking to refine their writing quickly and efficiently.',
    },
    {
      question: 'Can I use this for commercial purposes?',
      answer:
        'Yes, the text transformed by our free AI sentence rewriter is yours to use for any purpose, including commercial projects, provided your usage aligns with our terms of service and OpenAI\'s usage policies.',
    },
    {
      question: 'Is my input text kept private?',
      answer:
        'We prioritize user privacy. Your input text is sent securely to the OpenAI API for processing and is not stored on our servers long-term. Please refer to our Privacy Policy and OpenAI\'s policies for full details.',
    },
    {
      question: 'What writing styles does your sentence rewriter offer?',
      answer:
        'Our AI sentence rewriter offers multiple writing styles including Professional, Casual, Formal, Creative, and Concise. Each style transforms your text differently to match your specific communication needs.',
    },
  ];

  return (
    <section id="faq" className="bg-gray-50 dark:bg-gray-900 py-20 sm:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">FAQ</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions About Our Sentence Rewriter
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Have questions about our free AI sentence rewriter tool? Find answers below or contact us for more information.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <dl className="space-y-4">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                {({ open }: { open: boolean }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between p-6 text-left text-gray-900 dark:text-white">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDown
                            className={`h-6 w-6 transform transition-transform duration-200 ${open ? '-rotate-180' : 'rotate-0'}`}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel as="dd" className="px-6 pb-6 pt-0 text-base leading-7 text-gray-600 dark:text-gray-400">
                        <p>{faq.answer}</p>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 