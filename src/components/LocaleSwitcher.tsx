import Link from "next/link";

interface LocaleSwitcherProps {
  currentLocale: string;
}

export default function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  return (
    <div
      className="flex items-center gap-2 text-sm"
      role="group"
      aria-label="Language selection"
    >
      <Link
        href="/en"
        className={`px-3 py-1 rounded transition-colors ${
          currentLocale === "en"
            ? "bg-forest text-white"
            : "text-forest hover:bg-rose"
        }`}
        aria-label="Switch to English"
        aria-current={currentLocale === "en" ? "page" : undefined}
      >
        EN
      </Link>
      <span className="text-mediumGray" aria-hidden="true">
        |
      </span>
      <Link
        href="/fi"
        className={`px-3 py-1 rounded transition-colors ${
          currentLocale === "fi"
            ? "bg-forest text-white"
            : "text-forest hover:bg-rose"
        }`}
        aria-label="Vaihda suomeksi"
        aria-current={currentLocale === "fi" ? "page" : undefined}
      >
        FI
      </Link>
    </div>
  );
}
