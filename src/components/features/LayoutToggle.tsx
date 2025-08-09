'use client';

import Link from 'next/link';
import { getTranslations } from '../../lib/i18n';

interface LayoutToggleProps {
  currentLayout: string;
  locale: string;
}

export default function LayoutToggle({ currentLayout, locale }: LayoutToggleProps) {
  const t = getTranslations(locale);

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <span className="body-text text-medium-gray">
        {t['features.layout.toggle']}:
      </span>
      <div className="flex bg-light-gray rounded-lg p-1">
        <Link
          href={`/${locale}/features?layout=cards`}
          className={`px-4 py-2 rounded-md transition-colors font-medium ${
            currentLayout === 'cards'
              ? 'bg-forest-green text-white'
              : 'text-forest-green hover:bg-soft-rose'
          }`}
          aria-current={currentLayout === 'cards' ? 'page' : undefined}
        >
          {t['features.layout.cards']}
        </Link>
        <Link
          href={`/${locale}/features?layout=accordion`}
          className={`px-4 py-2 rounded-md transition-colors font-medium ${
            currentLayout === 'accordion'
              ? 'bg-forest-green text-white'
              : 'text-forest-green hover:bg-soft-rose'
          }`}
          aria-current={currentLayout === 'accordion' ? 'page' : undefined}
        >
          {t['features.layout.accordion']}
        </Link>
      </div>
    </div>
  );
}
