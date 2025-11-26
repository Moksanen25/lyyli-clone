'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

interface ClientLocaleSwitcherProps {
  currentLocale: string;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', flag: '🇪🇪' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
];

export default function ClientLocaleSwitcher({
  currentLocale,
}: ClientLocaleSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Supported locales for safe parsing
  const supportedLocales = new Set(['en', 'fi', 'de', 'et', 'sv']);

  // Extract path segments safely and remove locale prefix when present
  const segments = (() => {
    try {
      const parts = (pathname || '/').split('/').filter(Boolean);
      if (parts.length > 0 && supportedLocales.has(parts[0])) {
        return parts.slice(1);
      }
      return parts;
    } catch {
      return [];
    }
  })();

  // Preserve the current query string
  const queryString = searchParams?.toString();
  const qs = queryString ? `?${queryString}` : '';

  const currentLanguage =
    languages.find(lang => lang.code === currentLocale) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
    return undefined;
  }, [isOpen]);

  // Detect if current path is a single blog post (e.g. /blog/:slug)
  const isBlogPostPath = segments.length >= 2 && segments[0] === 'blog' && !!segments[1];

  const buildHrefForLanguage = (langCode: string) => {
    // If on a blog post, route to the blog index in the target locale to avoid missing translations
    if (isBlogPostPath) {
      return `/${langCode}/blog${qs}`;
    }
    // Rebuild path with ensured slashes
    const rebuilt = segments.length ? `/${segments.join('/')}` : '/';
    return `/${langCode}${rebuilt}${qs}`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Unified dropdown (desktop + mobile) to match menu style */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-base text-forest hover:text-forest/80 transition-colors duration-200 font-sans py-2"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
        type="button"
      >
        {/* Brand-neutral globe icon */}
        <svg
          className="w-4 h-4 text-forest"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
        </svg>
        <span className="font-medium">
          {currentLanguage.code.toUpperCase()}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
          {languages.map(lang => (
            <Link
              key={lang.code}
              href={buildHrefForLanguage(lang.code)}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                currentLocale === lang.code ? 'bg-forest/5' : ''
              }`}
              onClick={() => setIsOpen(false)}
              aria-current={currentLocale === lang.code ? 'page' : undefined}
            >
              {/* Code badge instead of flags */}
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-200 text-sm font-semibold text-forest bg-white">
                {lang.code.toUpperCase()}
              </span>
              <div className="flex-1">
                <div
                  className={`text-sm font-medium ${
                    currentLocale === lang.code
                      ? 'text-forest'
                      : 'text-darkGray'
                  }`}
                >
                  {lang.nativeName}
                </div>
                <div className="text-xs text-mediumGray">{lang.name}</div>
              </div>
              {currentLocale === lang.code && (
                <svg
                  className="w-5 h-5 text-forest"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
