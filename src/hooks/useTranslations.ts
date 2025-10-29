'use client';

import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';

/**
 * Custom hook to load and manage translations for the specified locale
 * 
 * This hook dynamically imports translation JSON files and provides automatic
 * fallback to English if the requested locale fails to load. It includes error
 * handling and logging for debugging translation issues.
 * 
 * @param locale - The locale code (e.g., 'en', 'fi'). Defaults to 'en'
 * @returns Object containing translation key-value pairs
 * 
 * @example
 * ```tsx
 * function MyComponent({ locale }: { locale: string }) {
 *   const t = useTranslations(locale);
 *   return <h1>{t['home.title']}</h1>;
 * }
 * ```
 */
export function useTranslations(locale: string = 'en'): Record<string, string> {
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadTranslations = async (): Promise<void> => {
      try {
        const translationModule = await import(`../translations/${locale}.json`);
        
        if (isMounted) {
          setTranslations(translationModule.default || translationModule);
          setIsLoading(false);
        }
      } catch (error) {
        logger.warn(`Failed to load translations for locale "${locale}", falling back to English`, {
          locale,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        
        try {
          const fallbackModule = await import('../translations/en.json');
          
          if (isMounted) {
            setTranslations(fallbackModule.default || fallbackModule);
            setIsLoading(false);
          }
        } catch (fallbackError) {
          logger.error('Failed to load fallback translations', {
            locale,
            fallbackError: fallbackError instanceof Error ? fallbackError.message : 'Unknown error'
          });
          
          if (isMounted) {
            setTranslations({});
            setIsLoading(false);
          }
        }
      }
    };

    loadTranslations();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [locale]);

  return translations;
}

