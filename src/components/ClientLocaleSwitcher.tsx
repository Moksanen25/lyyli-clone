'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ClientLocaleSwitcherProps {
  currentLocale: string;
}

export default function ClientLocaleSwitcher({ currentLocale }: ClientLocaleSwitcherProps) {
  const pathname = usePathname();
  
  // Extract the path without locale
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';

  return (
    <div className="flex items-center gap-2 text-sm" role="group" aria-label="Language selection">
      <Link
        href={`/en${pathWithoutLocale}`}
        className={`px-3 py-1 rounded transition-colors ${
          currentLocale === 'en'
            ? 'bg-forest-green text-white'
            : 'text-forest-green hover:bg-soft-rose'
        }`}
        aria-label="Switch to English"
        aria-current={currentLocale === 'en' ? 'page' : undefined}
      >
        EN
      </Link>
      <span className="text-medium-gray" aria-hidden="true">|</span>
      <Link
        href={`/fi${pathWithoutLocale}`}
        className={`px-3 py-1 rounded transition-colors ${
          currentLocale === 'fi'
            ? 'bg-forest-green text-white'
            : 'text-forest-green hover:bg-soft-rose'
        }`}
        aria-label="Vaihda suomeksi"
        aria-current={currentLocale === 'fi' ? 'page' : undefined}
      >
        FI
      </Link>
    </div>
  );
}
