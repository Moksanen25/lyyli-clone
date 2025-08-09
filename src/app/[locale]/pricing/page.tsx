import { getTranslations } from '../../../lib/i18n';
import { Metadata } from 'next';
import PricingTiers from '../../../components/pricing/PricingTiers';
import BenefitsSection from '../../../components/pricing/BenefitsSection';
import ROIAssumptions from '../../../components/pricing/ROIAssumptions';
import PricingFAQ from '../../../components/pricing/PricingFAQ';

interface PricingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PricingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);
  
  return {
    title: t['pricing.page.title'],
    description: t['pricing.page.description'],
  };
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(locale) ? locale : 'en';
  
  const t = getTranslations(currentLocale);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="heading-1 mb-6">
            {t['pricing.hero.title']}
          </h1>
          <p className="body-large mb-12 text-medium-gray max-w-3xl mx-auto">
            {t['pricing.hero.subtitle']}
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <PricingTiers locale={currentLocale} />
      </section>

      {/* Benefits Section */}
      <section className="bg-light-gray py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <BenefitsSection locale={currentLocale} />
        </div>
      </section>

      {/* ROI Assumptions */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <ROIAssumptions locale={currentLocale} />
      </section>

      {/* FAQ Section */}
      <section className="bg-soft-rose py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <PricingFAQ locale={currentLocale} />
        </div>
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
