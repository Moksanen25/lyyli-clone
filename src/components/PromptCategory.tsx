'use client';

import { useState } from 'react';
import PromptCard from './PromptCard';

interface Prompt {
  title: string;
  prompt: string;
}

interface PromptCategoryProps {
  title: string;
  description: string;
  prompts: Prompt[];
  locale: string;
}

export default function PromptCategory({
  title,
  description,
  prompts,
  locale,
}: PromptCategoryProps): React.JSX.Element {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="mb-12">
      {/* Category Header */}
      <div className="mb-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full group flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-[#2F5D50] focus:ring-offset-2 rounded-lg p-4 hover:bg-white transition-colors duration-200"
          aria-expanded={isExpanded}
        >
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-[#2F5D50] mb-3 font-playfair leading-tight">
              {title}
            </h2>
            <p className="text-lg text-[#666666] font-inter leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex-shrink-0 ml-6">
            <div className="w-10 h-10 bg-[#F7EBEB] rounded-lg flex items-center justify-center group-hover:bg-[#A7D6D1] transition-colors duration-200">
              <svg
                className={`w-6 h-6 text-[#2F5D50] transform transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </button>
      </div>

      {/* Prompts Grid */}
      {isExpanded && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
          {prompts.map(prompt => (
            <PromptCard
              key={`${prompt.title}-${prompt.prompt.substring(0, 20)}`}
              title={prompt.title}
              prompt={prompt.prompt}
              locale={locale}
            />
          ))}
        </div>
      )}

      {/* Separator */}
      <div className="mt-12 border-t border-[#E5E5E4]" />
    </section>
  );
}
