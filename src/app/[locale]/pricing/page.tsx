import { getTranslations } from '@/lib/i18n';
import { Metadata } from 'next';
import PricingTiers from '@/components/pricing/PricingTiers';
import BenefitsSection from '@/components/pricing/BenefitsSection';
import ROIAssumptions from '@/components/pricing/ROIAssumptions';
import PricingFAQ from '@/components/pricing/PricingFAQ';
import PricingHeader from '@/components/pricing/PricingHeader';
import HeroVisual from '@/components/HeroVisual';
import ROICalculator from '@/components/ROICalculator';
import ROIStats from '@/components/ROIStats';

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
    <div className="min-h-screen bg-forest">
      {/* Hero Section */}
      <div className="relative z-10 pt-32">
        <section 
          className="container mx-auto px-4 py-20 relative overflow-hidden"
          aria-label="Hero"
        >
          {/* Animated Hero Visual */}
          <HeroVisual />
          
          <h1 className="text-3xl md:text-4xl text-white text-center mb-8 font-playfair font-normal leading-tight relative z-10">
            {t["pricing.title"]}
          </h1>
          <p className="text-lg text-white/90 text-center max-w-3xl mx-auto mb-12 font-sans leading-relaxed relative z-10">
            {t['pricing.pricingHeader.subtitle']}
          </p>
        </section>
      </div>

      {/* ROI Statistics Section */}
      <div className="bg-white">
        <ROIStats />
      </div>

      {/* ROI Calculator Section */}
      <div className="bg-white">
        <ROICalculator />
      </div>

      {/* Pricing Tiers */}
      <div className="bg-white">
        <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <PricingTiers translations={t} />
        </section>
      </div>

      {/* Benefits Section */}
      <div className="bg-white">
        <section className="bg-gradient-to-br from-forest/10 to-turquoise/10 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <BenefitsSection locale={currentLocale} translations={t} />
          </div>
        </section>
      </div>

      {/* ROI Assumptions */}
      <div className="bg-white">
        <section className="bg-gradient-to-br from-rose/5 to-grayLight max-w-7xl mx-auto px-6 py-16">
          <ROIAssumptions translations={t} />
        </section>
      </div>

      {/* FAQ Section */}
      <div className="bg-white">
        <section className="bg-rose py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <PricingFAQ locale={currentLocale} translations={t} />
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <section className="bg-forest text-white py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl mb-4 text-white font-playfair font-normal leading-snug">
              {t['cta.title']}
            </h2>
            <p className="text-lg mb-8 text-white opacity-90 font-sans leading-relaxed">
              {t['cta.description']}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`/${currentLocale}/waitlist`}
                className="bg-white text-forest px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors font-medium inline-flex items-center justify-center gap-2"
                aria-label="Join the waitlist for Lyyli.ai"
              >
                {locale === "fi" ? "Liity odotuslistalle" : "Join Waitlist"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </a>
              <a 
                href={`/${currentLocale}/waitlist`}
                className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-forest transition-colors font-medium inline-flex items-center justify-center"
                aria-label="Join the waitlist for Lyyli.ai"
              >
                {locale === "fi" ? "Liity odotuslistalle" : "Join Waitlist"}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
