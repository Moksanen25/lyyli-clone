import { getTranslations } from '@/lib/i18n';
import { Metadata } from 'next';
import PricingCards from '@/components/PricingCards';
import BenefitsSection from '@/components/pricing/BenefitsSection';
import dynamic from 'next/dynamic';
const PricingFAQ = dynamic(() => import('@/components/pricing/PricingFAQ'), { ssr: true, loading: () => <div /> });
import ROICalculator from '@/components/ROICalculator';
import { generatePageCanonicalUrl, generateHreflangMetadata } from '@/lib/canonical';
import { buildTitleFromTranslation } from '@/lib/title';

interface PricingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PricingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);
  
  return {
    title: buildTitleFromTranslation(t['pricing.page.title'], 'Pricing'),
    description: t['pricing.page.description'],
    openGraph: {
      title: t['pricing.page.title'],
      description: t['pricing.page.description'],
      type: 'website',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(t['pricing.page.title'])}&description=${encodeURIComponent(t['pricing.page.description'])}`,
          width: 1200,
          height: 630,
          alt: t['pricing.page.title']
        }
      ]
    },
    alternates: {
      canonical: generatePageCanonicalUrl('pricing', locale),
      languages: generateHreflangMetadata('/pricing', ['en', 'fi']),
    },
  };
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(locale) ? locale : 'en';
  
  const t = await getTranslations(currentLocale);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative z-10 pt-32">
        <section 
          className="container mx-auto px-4 py-20 relative overflow-hidden"
          aria-label="Hero"
        >
          {/* Animated Hero Visual Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-turquoise/10 to-rose/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-br from-rose/15 to-forest/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl text-forest mb-8 font-playfair font-bold leading-tight">
              {t["pricing.title"]}
            </h1>
            <p className="text-lg text-mediumGray max-w-3xl mx-auto mb-12 font-sans leading-relaxed">
              {t['pricing.pricingHeader.subtitle']}
            </p>
          </div>
        </section>
      </div>

      {/* Pricing Cards - Using front page pricing section */}
      <section className="py-16 lg:py-24">
        <PricingCards fullWidth={true} locale={currentLocale} translations={t} />
      </section>

      {/* ROI Calculator Section */}
      <div className="bg-gradient-to-br from-rose/5 to-turquoise/5 py-16 lg:py-24">
        <ROICalculator locale={currentLocale} translations={t} />
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-forest/5 to-turquoise/5 py-16 lg:py-24">
        <section className="max-w-7xl mx-auto px-6">
          <BenefitsSection locale={currentLocale} translations={t} />
        </section>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16 lg:py-24">
        <section className="max-w-4xl mx-auto px-6">
          <PricingFAQ locale={currentLocale} translations={t} />
        </section>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-forest to-turquoise py-16 lg:py-24">
        <section className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-white font-playfair font-bold leading-tight">
            {t['cta.title']}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 font-sans leading-relaxed">
            {t['cta.description']}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`/${currentLocale}/waitlist`}
              className="inline-flex items-center px-8 py-4 bg-white text-forest font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-sans"
              aria-label="Join the waitlist for Lyyli.ai"
            >
              {locale === "fi" ? "Liity odotuslistalle" : "Join Waitlist"}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a 
              href={`/${currentLocale}/contact`}
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-forest transition-all duration-300 hover:-translate-y-1 font-sans"
              aria-label="Contact us for more information"
            >
              {locale === "fi" ? "Ota yhteyttä" : "Contact us"}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
