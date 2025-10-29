'use client';

import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';

export function useTranslations(locale: string = 'en') {
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../translations/${locale}.json`);
        setTranslations(translationModule.default || translationModule);
      } catch (error) {
        logger.warn(`Failed to load translations for locale "${locale}", falling back to English`, {
          locale,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        try {
          const fallbackModule = await import('../translations/en.json');
          setTranslations(fallbackModule.default || fallbackModule);
        } catch (fallbackError) {
          logger.error('Failed to load fallback translations', {
            locale,
            fallbackError: fallbackError instanceof Error ? fallbackError.message : 'Unknown error'
          });
          setTranslations({});
        }
      }
    };

    loadTranslations();
  }, [locale]);

  return translations;
}

