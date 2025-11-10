import { getTranslations } from '@/lib/i18n';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import DemoVideo from '@/components/DemoVideo';
import ROICalculator from '@/components/ROICalculator';
import PricingCards from '@/components/PricingCards';
import Deferred from '@/components/Deferred';
import HeroFactBox from '@/components/HeroFactBox';
import CalendarPopup from '@/components/CalendarPopup';
import ProductShowcase from '@/components/ProductShowcase';
import {
  generatePageCanonicalUrl,
  generateHreflangMetadata,
} from '@/lib/canonical';
import { buildTitleFromTranslation } from '@/lib/title';
import { generateSoftwareApplicationSchema } from '@/lib/structured-data';

const ProcessSteps = dynamic(() => import('@/components/ProcessSteps'), {
  ssr: true,
  loading: () => <div />,
});
const FeatureGrid = dynamic(() => import('@/components/FeatureGrid'), {
  ssr: true,
  loading: () => <div />,
});

// Note: using static imports for client components inside a Server Component
interface HomeProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return {
    title: buildTitleFromTranslation(
      t['home.page.title'],
      'AI Communication Assistant'
    ),
    description:
      t['home.page.description'] ??
      'AI Communication Assistant for Professional Service Organizations',
    openGraph: {
      title: t['home.page.title'] ?? 'Lyyli.ai - AI Communication Assistant',
      description:
        t['home.page.description'] ??
        'AI Communication Assistant for Professional Service Organizations',
      type: 'website',
      images: [
        {
          url: '/images/social/Social_share_frontpage_LyyliAI.webp',
          width: 1200,
          height: 630,
          alt: 'Lyyli.ai - AI Communication Assistant',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t['home.page.title'] ?? 'Lyyli.ai - AI Communication Assistant',
      description:
        t['home.page.description'] ??
        'AI Communication Assistant for Professional Service Organizations',
      images: ['/images/social/Social_share_frontpage_LyyliAI.webp'],
    },
    alternates: {
      canonical: generatePageCanonicalUrl('', locale),
      languages: generateHreflangMetadata('/', ['en', 'fi']),
    },
  };
}

export default async function Home({ params }: HomeProps) {
  const { locale: resolvedLocale } = await params;
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(resolvedLocale)
    ? resolvedLocale
    : 'en';

  const t = await getTranslations(currentLocale);

  // Generate SoftwareApplication schema for home page
  const softwareSchema = generateSoftwareApplicationSchema(currentLocale);

  return (
    <main className="min-h-screen">
      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />

      {/* Mesh Gradient Background */}

      {/* Hero Section */}
      <div className="relative z-30 pt-32">
        <section
          className="container mx-auto px-4 py-20 relative"
          aria-label="Hero"
        >
          {/* Critical LCP element with optimized font loading */}
          <h1 className="text-4xl md:text-5xl text-forest text-center mb-8 font-playfair font-bold leading-tight relative z-10">
            {t['hero.headline']}
          </h1>
          <p className="text-lg hero-description text-center max-w-3xl mx-auto mb-12 font-sans leading-relaxed relative z-10">
            {t['hero.description']}
          </p>
          <div className="mt-8 mb-10 relative z-10">
            <HeroFactBox translations={t} />
          </div>
          <div className="flex justify-center gap-4 mb-12 relative z-10">
            <a href="https://app.lyyli.ai" className="btn-primary">
              {t['hero.ctaPrimary']}
            </a>
            <CalendarPopup
              className="btn-secondary"
              translations={{
                title: t['calendar.title'],
                subtitle: t['calendar.subtitle'],
                description: t['calendar.description'],
                loading: t['calendar.loading'],
                errorTitle: t['calendar.error.title'],
                errorDescription: t['calendar.error.description'],
                errorButton: t['calendar.error.button'],
                footerSecure: t['calendar.footer.secure'],
                footerContact: t['calendar.footer.contact'],
              }}
            >
              {t['hero.ctaSecondary']}
            </CalendarPopup>
          </div>
        </section>
      </div>

      {/* Product Showcase Section */}
      <ProductShowcase translations={t} />

      {/* ROI Statistics Section - temporarily hidden */}

      {/* Problems Section - Improved contrast and structure */}
      <section className="border-t border-gray-100 relative z-20">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-forest mb-6 font-playfair font-bold leading-tight">
              {t['problems.title']}
            </h2>
            <p className="text-xl text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t['problems.subtitle']}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-rose/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-turquoise"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl text-forest mb-4 text-center font-playfair font-normal">
                {t['problems.missedCommunications.title']}
              </h3>
              <p className="text-mediumGray text-center font-sans leading-relaxed">
                {t['problems.missedCommunications.description']}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-turquoise/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-turquoise"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl text-forest mb-4 text-center font-playfair font-normal">
                {t['problems.channelOverload.title']}
              </h3>
              <p className="text-forest text-center font-sans leading-relaxed">
                {t['problems.channelOverload.description']}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-forest/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-turquoise"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl text-forest mb-4 text-center font-playfair font-normal">
                {t['problems.accountability.title']}
              </h3>
              <p className="text-forest text-center font-sans leading-relaxed">
                {t['problems.accountability.description']}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-rose/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-turquoise"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl text-forest mb-4 text-center font-playfair font-normal">
                {t['problems.regulatory.title']}
              </h3>
              <p className="text-forest text-center font-sans leading-relaxed">
                {t['problems.regulatory.description']}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps Section (mount on visible) */}
      <Deferred when="visible">
        <ProcessSteps translations={t} />
      </Deferred>

      {/* Feature Grid Section (idle) */}
      <Deferred when="idle">
        <FeatureGrid translations={t} />
      </Deferred>

      {/* Demo Video Section */}
      <DemoVideo translations={t} />

      {/* ROI Calculator Section */}
      <ROICalculator locale={currentLocale} translations={t} />

      {/* Testimonials hidden */}

      {/* Pricing Section */}
      <PricingCards locale={currentLocale} translations={t} />

      {/* CTA Section */}
      <section
        id="cta"
        className="py-24 bg-gradient-to-br from-forest to-turquoise"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl text-turquoise mb-6 font-playfair font-bold leading-tight">
            {t['cta.subtitle']}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 font-sans leading-relaxed">
            {t['cta.descriptionLong']}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://app.lyyli.ai"
              className="inline-flex items-center px-8 py-4 bg-white text-forest font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-sans"
            >
              {t['cta.startTrial']}
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            <CalendarPopup
              className="inline-flex items-center px-8 py-4 bg-turquoise text-forest font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-sans"
              translations={{
                title: t['calendar.title'],
                subtitle: t['calendar.subtitle'],
                description: t['calendar.description'],
                loading: t['calendar.loading'],
                errorTitle: t['calendar.error.title'],
                errorDescription: t['calendar.error.description'],
                errorButton: t['calendar.error.button'],
                footerSecure: t['calendar.footer.secure'],
                footerContact: t['calendar.footer.contact'],
              }}
            >
              {t['cta.demo']}
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </CalendarPopup>
          </div>
        </div>
      </section>
    </main>
  );
}
