import { getTranslations } from '../../../lib/i18n';
import { Metadata } from 'next';
import PricingHeader from '../../../components/pricing/PricingHeader';
import PricingTiers from '../../../components/pricing/PricingTiers';
import ComparisonTable from '../../../components/pricing/ComparisonTable';
import ROICalculator from '../../../components/pricing/ROICalculator';
import ComplianceBadges from '../../../components/pricing/ComplianceBadges';
import PricingFAQ from '../../../components/pricing/PricingFAQ';

interface PricingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PricingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(locale) ? locale : 'en';
  
  const title = currentLocale === 'en' ? 'Pricing - Lyyli.ai' : 'Hinnoittelu - Lyyli.ai';
  const description = currentLocale === 'en' 
    ? 'Clear pricing for Lyyli.ai\'s AI communication platform. Try our ROI calculator and see how much you can save with AI-assisted communication.'
    : 'Lyyli.ai:n selkeä hinnoittelu yrityksesi tarpeisiin. Kokeile ROI-laskuriamme ja näe kuinka paljon voit säästää tekoälyavusteisella viestinnällä.';
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Lyyli.ai',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: currentLocale === 'en' ? '/pricing' : '/fi/pricing',
      languages: {
        'en': '/pricing',
        'fi': '/fi/pricing',
      },
    },
  };
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(locale) ? locale : 'en';
  const t = await getTranslations(currentLocale);

  // JSON-LD structured data for pricing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Lyyli.ai",
    "description": "AI Communication Assistant for Professional Service Organizations",
    "brand": {
      "@type": "Brand",
      "name": "Lyyli.ai"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Free",
        "price": "0",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": `https://lyyli.ai${currentLocale === 'en' ? '/pricing' : '/fi/pricing'}`
      },
      {
        "@type": "Offer", 
        "name": "Starter",
        "price": "29",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": `https://lyyli.ai${currentLocale === 'en' ? '/pricing' : '/fi/pricing'}`
      },
      {
        "@type": "Offer",
        "name": "Growth", 
        "price": "199",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": `https://lyyli.ai${currentLocale === 'en' ? '/pricing' : '/fi/pricing'}`
      },
      {
        "@type": "Offer",
        "name": "Professional",
        "price": "599", 
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": `https://lyyli.ai${currentLocale === 'en' ? '/pricing' : '/fi/pricing'}`
      }
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t['pricing.faq.trial.question'],
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t['pricing.faq.trial.answer']
        }
      },
      {
        "@type": "Question", 
        "name": t['pricing.faq.billing.question'],
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t['pricing.faq.billing.answer']
        }
      },
      {
        "@type": "Question",
        "name": t['pricing.faq.enterprise.question'], 
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t['pricing.faq.enterprise.answer']
        }
      },
      {
        "@type": "Question",
        "name": t['pricing.faq.support.question'],
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t['pricing.faq.support.answer']
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <main className="bg-white">
        {/* Header Section */}
        <PricingHeader translations={t} />

        {/* Pricing Tiers */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <PricingTiers translations={t} />
        </section>

        {/* Feature Comparison */}
        <section className="bg-light-gray py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <ComparisonTable translations={t} />
          </div>
        </section>

        {/* ROI Calculator */}
        <section id="roi-calculator" className="max-w-7xl mx-auto px-6 py-16 lg:py-24" style={{ scrollMargin: '2rem' }}>
          <ROICalculator translations={t} />
        </section>

        {/* Compliance Badges */}
        <section className="bg-soft-rose py-12">
          <div className="max-w-7xl mx-auto px-6">
            <ComplianceBadges locale={currentLocale} />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
          <PricingFAQ locale={currentLocale} translations={t} />
        </section>

        {/* CTA Section */}
        <section className="bg-forest-green text-white py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="heading-2 mb-4 text-white">
              Ready to Get Started?
            </h2>
            <p className="body-large mb-8 text-white opacity-90">
              {currentLocale === 'en' 
                ? 'Choose your plan and start transforming your team\'s communication today.'
                : 'Valitse pakettisi ja aloita tiimisi viestinnän muuttaminen tänään.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`/${currentLocale}/contact`} 
                className="bg-white text-forest-green px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors font-medium inline-flex items-center justify-center gap-2"
                aria-label="Book a demo of Lyyli.ai"
              >
                {currentLocale === 'en' ? 'Book a Demo' : 'Varaa demo'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </a>
              <a 
                href={`/${currentLocale}/contact`} 
                className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-forest-green transition-colors font-medium inline-flex items-center justify-center"
                aria-label="Contact Lyyli.ai sales team"
              >
                {currentLocale === 'en' ? 'Contact Sales' : 'Ota yhteyttä myyntiin'}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}