import { getTranslations } from '@/lib/i18n';
import { Metadata } from 'next';
import PricingTiers from '@/components/pricing/PricingTiers';
import BenefitsSection from '@/components/pricing/BenefitsSection';
import ROIAssumptions from '@/components/pricing/ROIAssumptions';
import PricingFAQ from '@/components/pricing/PricingFAQ';
import PricingHeader from '@/components/pricing/PricingHeader';
import SubPageVisual from '@/components/SubPageVisual';
import { FloatingElements, EnhancedGeometricPattern } from '@/components/VisualElements';

interface PricingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PricingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);
  
  return {
    title: t['pricing.page.title'],
    description: t['pricing.page.description'],
    openGraph: {
      title: t['pricing.page.title'],
      description: t['pricing.page.description'],
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/pricing`,
    },
  };
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(locale) ? locale : 'en';
  
  const t = await getTranslations(currentLocale);

  return (
    <div className="bg-white relative overflow-hidden">
      {/* Background Visual Elements */}
      <FloatingElements />
      
      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-16 lg:py-24">
        {/* Animated Sub-Page Visual */}
        <SubPageVisual />
        
        {/* Hero Background Pattern */}
        <EnhancedGeometricPattern className="opacity-20" />
        
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl mb-6 font-playfair font-bold leading-tight text-forest">
            {t['pricing.pricingHeader.title']}
          </h1>
          <p className="text-lg mb-8 text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
            {t['pricing.pricingHeader.subtitle']}
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <PricingTiers translations={t} />
      </section>

      {/* Benefits Section */}
      <section className="bg-grayLight py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <BenefitsSection locale={currentLocale} translations={t} />
        </div>
      </section>

      {/* ROI Assumptions */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <ROIAssumptions translations={t} />
      </section>

      {/* FAQ Section */}
      <section className="bg-rose py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <PricingFAQ locale={currentLocale} translations={t} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-forest text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl mb-4 text-white font-playfair font-bold leading-snug">
            {t['cta.title']}
          </h2>
          <p className="text-lg mb-8 text-white opacity-90 font-sans leading-relaxed">
            {t['cta.description']}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/demo" 
              className="bg-white text-forest px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors font-medium inline-flex items-center justify-center gap-2"
              aria-label="Book a demo of Lyyli.ai"
            >
              {t['cta.button']}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </a>
            <a 
              href="/contact" 
              className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-forest transition-colors font-medium inline-flex items-center justify-center"
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
