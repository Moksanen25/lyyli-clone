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
        <div className="mx-auto max-w-2xl text-center">
          {title && <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">{title}</h2>}
          {description && <p className="mt-6 text-base leading-7 text-gray-600">{description}</p>}
        </div>
        <div className="mx-auto mt-10 max-w-2xl divide-y divide-gray-900/10">
          <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
            {faqs.map((faq) => {
              const isOpen = openItems.has(faq.id);
              return (
                <div key={faq.id} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
                  <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">
                    <button
                      type="button"
                      className="flex w-full items-start justify-between text-left"
                      onClick={() => toggleItem(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      id={`faq-question-${faq.id}`}
                    >
                      <span>{faq.question}</span>
                      <span className="ml-6 flex h-7 items-center">
                        {isOpen ? (
                          <ChevronUpIcon className="h-6 w-6" aria-hidden="true" />
                        ) : (
                          <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
                        )}
                      </span>
                    </button>
                  </dt>
                  <dd className="mt-4 lg:col-span-7 lg:mt-0">
                    <div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                      className={`text-base leading-7 text-gray-600 ${isOpen ? 'block' : 'hidden'}`}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateFAQSchema() }}
      />
    </div>
  );
}