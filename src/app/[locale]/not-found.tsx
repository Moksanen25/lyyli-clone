import { getTranslations } from "../../lib/i18n";
import Link from "next/link";

export default async function NotFound() {
  // Default to English for 404 pages since we can't access params here
  const t = await getTranslations("en");

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="text-8xl mb-8" aria-hidden="true">
          🔍
        </div>

        <h1 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-tight">{t["404.heading"]}</h1>

        <p className="text-lg mb-8 text-mediumGray font-sans leading-relaxed">{t["404.message"]}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/en"
            className="bg-forest text-white px-8 py-4 rounded-lg hover:bg-forest/90 transition-colors font-medium inline-flex items-center justify-center gap-2"
          >
            {t["404.home"]}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>

          <Link
            href="/en/contact"
            className="border border-forest text-forest px-8 py-4 rounded-lg hover:bg-forest hover:text-white transition-colors font-medium inline-flex items-center justify-center gap-2"
          >
            {t["404.contact"]}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
