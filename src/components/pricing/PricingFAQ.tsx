"use client";

import { useState } from "react";
import { TranslationKeys } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";

interface PricingFAQProps {
  locale: string;
  translations: TranslationKeys;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function PricingFAQ({
  locale,
  translations: t,
}: PricingFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: t["pricing.faq.trial.question"],
      answer: t["pricing.faq.trial.answer"],
    },
    {
      question: t["pricing.faq.billing.question"],
      answer: t["pricing.faq.billing.answer"],
    },
    {
      question: t["pricing.faq.enterprise.question"],
      answer: t["pricing.faq.enterprise.answer"],
    },
    {
      question: t["pricing.faq.support.question"],
      answer: t["pricing.faq.support.answer"],
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-tight">
          {t["pricing.faq.title"]}
        </h2>
        <p className="text-lg text-mediumGray font-sans leading-relaxed">
          {t["pricing.faq.subtitle"]}
        </p>
      </motion.div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <motion.article
            key={index}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gradient-to-r hover:from-turquoise/5 hover:to-rose/5 transition-all duration-300 group"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <h3 className="font-medium text-forest pr-4 font-sans group-hover:text-forest/80 transition-colors">
                {item.question}
              </h3>
              <motion.svg
                className="w-5 h-5 text-forest flex-shrink-0 transition-colors group-hover:text-turquoise"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  id={`faq-answer-${index}`}
                  className="overflow-hidden"
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-5">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-base text-mediumGray font-sans leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div 
        className="text-center pt-8 border-t border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl mb-4 text-forest font-playfair font-bold leading-tight">
          {t["pricing.faqTitle"]}
        </h3>
        <p className="text-base text-mediumGray font-sans leading-relaxed mb-6">
          {t["pricing.faqText"]}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="/faq"
            className="inline-flex items-center justify-center px-6 py-3 border border-forest text-forest rounded-lg hover:bg-forest hover:text-white transition-all duration-300 font-medium hover:shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t["pricing.faqButton"]}
          </motion.a>
          <motion.a
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center px-6 py-3 bg-forest text-white rounded-lg hover:bg-turquoise transition-all duration-300 font-medium hover:shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t["pricing.contactButton"]}
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
