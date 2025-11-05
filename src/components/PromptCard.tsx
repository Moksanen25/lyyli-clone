'use client';

import { useState } from 'react';

interface PromptCardProps {
  title: string;
  prompt: string;
  locale: string;
}

export default function PromptCard({
  title,
  prompt,
  locale,
}: PromptCardProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="group bg-white rounded-xl border border-[#E5E5E4] hover:border-[#2F5D50] transition-all duration-200 overflow-hidden hover:shadow-md">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-bold text-[#2F5D50] font-playfair leading-tight pr-4">
            {title}
          </h3>
          <button
            onClick={handleCopy}
            className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#F7EBEB] text-[#2F5D50] hover:bg-[#A7D6D1] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F5D50] focus:ring-offset-2"
            aria-label={(() => {
              if (copied) {
                return locale === 'fi' ? 'Kopioitu!' : 'Copied!';
              }
              return locale === 'fi' ? 'Kopioi prompt' : 'Copy prompt';
            })()}
          >
            {copied ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Prompt Text */}
        <div className="bg-[#F5F5F4] rounded-lg p-4 border border-[#E5E5E4]">
          <pre className="text-sm text-[#333333] font-inter leading-relaxed whitespace-pre-wrap overflow-x-auto">
            {prompt}
          </pre>
        </div>

        {/* Copy Status */}
        {copied && (
          <div className="mt-3 text-sm text-[#2F5D50] font-medium font-inter flex items-center">
            <svg
              className="w-4 h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {locale === 'fi'
              ? 'Kopioitu leikepöydälle!'
              : 'Copied to clipboard!'}
          </div>
        )}
      </div>

      {/* Hover Indicator */}
      <div className="h-1 bg-gradient-to-r from-[#2F5D50] to-[#A7D6D1] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
}
