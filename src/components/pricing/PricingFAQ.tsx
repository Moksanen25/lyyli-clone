'use client';

import { useState } from 'react';
import { getTranslations } from '../../lib/i18n';

interface PricingFAQProps {
  locale: string;
}

export default function PricingFAQ({ locale }: PricingFAQProps) {
  const t = getTranslations(locale);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
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
    <div>
      <div className="text-center mb-12">
        <h2 className="heading-2 mb-4 text-forest-green">
          {t['pricing.faq.title']}
        </h2>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-soft">
            <button
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-light-gray transition-colors"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <h3 className="heading-4 text-forest-green">
                {faq.question}
              </h3>
              <svg
                className={`w-5 h-5 text-forest-green transition-transform ${
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
            
            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-6">
                <p className="body-text text-medium-gray">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
