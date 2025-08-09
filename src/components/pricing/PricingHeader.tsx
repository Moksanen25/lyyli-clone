import { getTranslations } from '../../lib/i18n';

interface PricingHeaderProps {
  locale: string;
}

export default function PricingHeader({ locale }: PricingHeaderProps) {
  const t = getTranslations(locale);

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-white via-soft-rose to-light-gray">
      {/* Header badge/hero accent */}
      <div className="absolute top-8 right-8 opacity-10">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-forest-green to-muted-turquoise blur-xl"></div>
      </div>
      
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/50 border border-forest-green/20 mb-6">
            <span className="text-sm font-medium text-forest-green">
              {t['pricing']['tagline']}
            </span>
          </div>
          
          {/* Main heading - single H1 for SEO */}
          <h1 className="heading-1 mb-6 text-forest-green">
            {locale === 'en' ? 'Pricing' : 'Hinnoittelu'}
          </h1>
          
          {/* Subtitle */}
          <p className="body-large mb-12 text-medium-gray max-w-3xl mx-auto">
            {t['pricing']['pricingHeader']['subtitle']}
          </p>
        </div>
      </section>
    </header>
  );
}
