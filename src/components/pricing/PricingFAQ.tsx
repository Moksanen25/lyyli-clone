'use client';

import { useState } from 'react';
import { TranslationKeys } from '../../lib/i18n';

interface PricingFAQProps {
  locale: string;
  translations: TranslationKeys;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function PricingFAQ({ locale, translations: t }: PricingFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: t['pricing.faq.trial.question'],
      answer: t['pricing.faq.trial.answer']
    },
    {
      question: t['pricing.faq.billing.question'],
      answer: t['pricing.faq.billing.answer']
    },
    {
      question: t['pricing.faq.enterprise.question'],
      answer: t['pricing.faq.enterprise.answer']
    },
    {
      question: t['pricing.faq.support.question'],
      answer: t['pricing.faq.support.answer']
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="heading-2 mb-4 text-forest-green">
          {t['pricing.faq.title']}
        </h2>
        <p className="body-large text-medium-gray">
          {t['pricing.faq.subtitle']}
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <article 
            key={index}
            className="bg-white rounded-lg border border-light-gray overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-soft-rose/30 transition-colors"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <h3 className="font-medium text-dark-gray pr-4">
                {item.question}
              </h3>
              <svg 
                className={`w-5 h-5 text-forest-green flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {openIndex === index && (
              <div 
                id={`faq-answer-${index}`}
                className="px-6 pb-4"
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <p className="body-text text-medium-gray">
                  {item.answer}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center pt-8 border-t border-light-gray">
        <h3 className="heading-4 mb-4 text-forest-green">
          {t['pricing.faqTitle']}
        </h3>
        <p className="body-text text-medium-gray mb-6">
          {t['pricing.faqText']}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/faq"
            className="inline-flex items-center justify-center px-6 py-3 border border-forest-green text-forest-green rounded-lg hover:bg-forest-green hover:text-white transition-colors font-medium"
          >
            {t['pricing.faqButton']}
          </a>
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center px-6 py-3 bg-forest-green text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
          >
            {t['pricing.contactButton']}
          </a>
        </div>
      </div>
    </div>
  );
}