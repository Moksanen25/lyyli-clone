import { getTranslations } from '../../../lib/i18n';
import { Metadata } from 'next';
import FeaturesCardLayout from '../../../components/features/FeaturesCardLayout';
import FeaturesAccordionLayout from '../../../components/features/FeaturesAccordionLayout';
import LayoutToggle from '../../../components/features/LayoutToggle';

interface FeaturesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ layout?: string }>;
}

export async function generateMetadata({ params }: FeaturesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);
  
  return {
    title: t['features.page.title'],
    description: t['features.page.description'],
  };
}

export default async function FeaturesPage({ params, searchParams }: FeaturesPageProps) {
  const { locale } = await params;
  const { layout = 'cards' } = await searchParams;
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(locale) ? locale : 'en';
  
  const t = await getTranslations(currentLocale);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="heading-1 mb-6">
            {t['features.hero.title']}
          </h1>
          <p className="body-large mb-8 text-medium-gray max-w-3xl mx-auto">
            {t['features.hero.subtitle']}
          </p>
          
          {/* Layout Toggle */}
          <LayoutToggle currentLayout={layout} locale={currentLocale} translations={t} />
        </div>
      </section>

      {/* Features Content */}
      <section className="max-w-7xl mx-auto px-6 pb-16 lg:pb-24">
        {layout === 'accordion' ? (
          <FeaturesAccordionLayout locale={currentLocale} translations={t} />
        ) : (
          <FeaturesCardLayout locale={currentLocale} translations={t} />
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-forest-green text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="heading-2 mb-4 text-white">
            {t['cta.title']}
          </h2>
          <p className="body-large mb-8 text-white opacity-90">
            {t['cta.description']}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/demo" 
              className="bg-white text-forest-green px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors font-medium inline-flex items-center justify-center gap-2"
              aria-label="Book a demo of Lyyli.ai"
            >
              {t['cta.button']}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </a>
            <a 
              href="/contact" 
              className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-forest-green transition-colors font-medium inline-flex items-center justify-center"
              aria-label="Contact Lyyli.ai sales team"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
