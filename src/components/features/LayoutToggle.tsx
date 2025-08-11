"use client";

import Link from "next/link";
import { TranslationKeys } from "../../lib/i18n";

interface LayoutToggleProps {
  currentLayout: string;
  locale: string;
  translations: TranslationKeys;
}

export default function LayoutToggle({
  currentLayout,
  locale,
  translations: t,
}: LayoutToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <span className="text-base text-mediumGray font-sans leading-relaxed">
        {t["features.layout.toggle"]}:
      </span>
      <div className="flex bg-grayLight rounded-lg p-1">
        <Link
          href={`/${locale}/features?layout=cards`}
          className={`px-4 py-2 rounded-md transition-colors font-medium ${
            currentLayout === "cards"
              ? "bg-forest text-white"
              : "text-forest hover:bg-rose"
          }`}
          aria-current={currentLayout === "cards" ? "page" : undefined}
        >
          {t["features.layout.cards"]}
        </Link>
        <Link
          href={`/${locale}/features?layout=accordion`}
          className={`px-4 py-2 rounded-md transition-colors font-medium ${
            currentLayout === "accordion"
              ? "bg-forest text-white"
              : "text-forest hover:bg-rose"
          }`}
          aria-current={currentLayout === "accordion" ? "page" : undefined}
        >
          {t["features.layout.accordion"]}
        </Link>
      </div>
    </div>
  );
}
