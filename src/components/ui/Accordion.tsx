'use client';

import React from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className = '' }: AccordionProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map(item => (
        <details
          key={item.id}
          className="group bg-white rounded-2xl border border-gray-200 shadow-sm open:shadow-md"
        >
          <summary
            className="cursor-pointer list-none px-5 py-4 flex items-center justify-between rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
            aria-controls={`accordion-${item.id}`}
          >
            <span className="text-forest font-playfair font-bold text-lg">
              {item.title}
            </span>
            <svg
              className="w-5 h-5 text-forest transition-transform duration-200 group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <div
            id={`accordion-${item.id}`}
            className="px-5 pb-5 pt-1 text-darkGray font-sans leading-relaxed"
          >
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
}
