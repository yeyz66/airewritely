import React from 'react';
import Image from 'next/image'; // Using Next/Image for potential optimizations

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  imageUrl?: string; // Optional image URL
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title, imageUrl }) => (
  <figure className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md ring-1 ring-gray-900/5">
    <blockquote className="text-gray-900 dark:text-white">
      <p className="text-base leading-7">"{quote}"</p>
    </blockquote>
    <figcaption className="mt-6 flex items-center gap-x-4">
      {imageUrl ? (
        <Image
          className="h-10 w-10 rounded-full bg-gray-50 dark:bg-gray-700"
          src={imageUrl}
          alt={`Photo of ${name}`}
          width={40}
          height={40}
        />
      ) : (
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
          {/* Placeholder initials or generic icon */}
          <span className="text-sm font-medium">{name.split(' ').map(n => n[0]).join('')}</span>
        </div>
      )}
      <div>
        <div className="font-semibold text-gray-900 dark:text-white">{name}</div>
        <div className="text-gray-600 dark:text-gray-400 text-sm">{title}</div>
      </div>
    </figcaption>
  </figure>
);

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "This tool is a game-changer for refining my blog posts. The professional style option makes my writing sound much more polished.",
      name: 'Sarah Chen',
      title: 'Content Creator',
      // Using real professional headshots from Unsplash (free & no copyright)
      imageUrl: '/avatars/real/person1.jpg'
    },
    {
      quote: "As a non-native English speaker, RewriterPro helps me ensure my emails and reports are clear and grammatically correct. The intensity control is fantastic.",
      name: 'Marco Rossi',
      title: 'Marketing Manager',
      imageUrl: '/avatars/real/person2.jpg'
    },
    {
      quote: "I was skeptical at first, but the AI consistently provides great suggestions. It saves me so much time during the editing process.",
      name: 'Emily White',
      title: 'PhD Student',
      imageUrl: '/avatars/real/person3.jpg'
    },
    {
      quote: "The sentence rewriter helps me create more engaging content for my clients. It's become an essential part of my writing workflow.",
      name: 'Jason Park',
      title: 'Copywriter',
      imageUrl: '/avatars/real/person4.jpg'
    },
    {
      quote: "I use this tool daily to improve my academic papers. The formal tone setting is perfect for scholarly writing.",
      name: 'Olivia Johnson',
      title: 'Research Analyst',
      imageUrl: '/avatars/real/person5.jpg'
    },
    {
      quote: "The AI sentence rewriter has improved my business communications significantly. My colleagues have noticed the difference.",
      name: 'Michael Torres',
      title: 'Project Manager',
      imageUrl: '/avatars/real/person6.jpg'
    },
  ];

  return (
    <section id="testimonials" className="relative isolate bg-gray-50 dark:bg-gray-900 py-20 sm:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Trusted by Professionals
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            See how others are enhancing their writing with our AI rewriter.
          </p>
        </div>
        <div className="mx-auto grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 