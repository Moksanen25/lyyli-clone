import { TranslationKeys } from "@/lib/i18n";

interface PricingHeaderProps {
  translations: TranslationKeys;
}

export default function PricingHeader({ translations }: PricingHeaderProps) {
  const t = translations;

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-white/95 via-rose/95 to-grayLight/95 backdrop-blur-sm">
      {/* Header badge/hero accent */}
      <div className="absolute top-8 right-8 opacity-10 z-0">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-forest to-turquoise blur-xl"></div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-forest/20 mb-6 backdrop-blur-sm">
            <span className="text-sm font-medium text-forest">
              {t["pricing.tagline"]}
            </span>
          </div>

          {/* Main heading - single H1 for SEO */}
          <h1 className="text-4xl md:text-5xl mb-6 text-forest font-playfair font-bold leading-tight">
            {t["pricing.pricingHeader.title"]}
          </h1>

          {/* Subtitle */}
          <p className="text-lg mb-12 text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
            {t["pricing.pricingHeader.subtitle"]}
          </p>
        </div>
      </section>
    </header>
  );
}
