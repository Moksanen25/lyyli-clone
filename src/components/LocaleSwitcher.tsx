import Link from 'next/link';

interface LocaleSwitcherProps {
  currentLocale: string;
}

export default function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  return (
    <div className="flex items-center gap-2 text-sm" role="group" aria-label="Language selection">
      <Link
        href="/"
        locale="en"
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
        href="/"
        locale="fi"
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
