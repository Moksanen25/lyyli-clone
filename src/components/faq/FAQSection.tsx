'use client';

import { useState } from 'react';

// Simple chevron icons
const ChevronDownIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronUpIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  description?: string;
  className?: string;
}

export default function FAQSection({ faqs, title, description, className = "" }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const generateFAQSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
    return JSON.stringify(schema);
  };

  return (
    <div className={`bg-white ${className}`}>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          {title && (
            <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg text-mediumGray max-w-2xl mx-auto font-sans leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            {faqs.map((faq) => {
              const isOpen = openItems.has(faq.id);
              return (
                <div key={faq.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <button
                    type="button"
                    className="flex w-full items-start justify-between text-left p-6 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded-t-2xl"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-question-${faq.id}`}
                  >
                    <span className="text-xl font-playfair font-bold text-forest leading-normal pr-6">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-forest/10 transition-colors duration-200">
                      {isOpen ? (
                        <ChevronUpIcon className="h-5 w-5 text-forest" aria-hidden="true" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 text-forest" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${faq.id}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="border-t border-gray-100 pt-6">
                        <p className="text-base text-darkGray font-sans leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateFAQSchema() }}
      />
    </div>
  );
}