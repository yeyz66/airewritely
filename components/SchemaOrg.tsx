import React from 'react';
import Head from 'next/head';

interface SchemaOrgProps {
  url?: string;
  title?: string;
  description?: string;
  images?: string[];
  datePublished?: string;
  dateModified?: string;
}

const SchemaOrg: React.FC<SchemaOrgProps> = ({
  url = 'https://airewritely.com',
  title = 'Sentence Rewriter | Free AI Sentence Rewriter Tool',
  description = 'Transform your writing instantly with our free AI sentence rewriter. Professional, casual, formal or creative styles - rewrite any sentence for better clarity and impact.',
  images = ['/og-image.jpg'],
  datePublished = new Date().toISOString(),
  dateModified = new Date().toISOString(),
}) => {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name: title,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      'target': `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Sentence Rewriter',
    applicationCategory: 'UtilitiesApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    operatingSystem: 'Web-based',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '124'
    }
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Use Our Free AI Sentence Rewriter',
    image: images,
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: 'Sentence Rewriter Team'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an AI sentence rewriter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An AI sentence rewriter is a tool that uses artificial intelligence to transform your text while preserving its original meaning. Our free AI sentence rewriter tool analyzes your input and generates alternative phrasings based on the style and degree of change you select.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this sentence rewriter tool really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our AI sentence rewriter is completely free to use. We offer premium plans with additional features, but our core sentence rewriting functionality is available to everyone at no cost.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does the degree of change setting work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The degree of change setting in our sentence rewriter allows you to control how much the AI alters your original text. Slight focuses on minimal grammar/clarity tweaks, Moderate offers more noticeable improvements in flow and phrasing, and Significant allows for substantial restructuring and vocabulary changes while preserving the core meaning.'
        }
      }
    ]
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </Head>
  );
};

export default SchemaOrg; 