import type { Metadata } from 'next';
import FAQSection from '@/components/faq/FAQSection';
import {
  generatePageCanonicalUrl,
  generateHreflangMetadata,
} from '@/lib/canonical';
import { buildTitleFromTranslation } from '@/lib/title';
import { generateFAQPageSchema } from '@/lib/structured-data';
import { getFAQContent } from '@/lib/faq';

interface FAQPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: FAQPageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'fi' ? 'Usein kysytyt kysymykset' : 'Frequently Asked Questions';
  const description =
    locale === 'fi'
      ? 'Vastauksia yleisimpiin kysymyksiin Lyyli.ai:sta, turvallisuudesta, GDPR-yhteensopivuudesta ja integraatioista.'
      : 'Get answers to the most common questions about Lyyli.ai, security, GDPR compliance, and integrations.';

  return {
    title: buildTitleFromTranslation(title, 'FAQ'),
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [
        {
          url: '/images/social/Social_share_FAQ_LyyliAI.webp',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/social/Social_share_FAQ_LyyliAI.webp'],
    },
    alternates: {
      canonical: generatePageCanonicalUrl('faq', locale),
      languages: generateHreflangMetadata('/faq', ['en', 'fi']),
    },
  };
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(locale) ? locale : 'en';

  // Load FAQ content based on locale
  const faqContent = getFAQContent(currentLocale);

  // Generate FAQ schema for SEO
  const faqSchema = generateFAQPageSchema(
    faqContent.faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer,
    })),
    currentLocale
  );

  return (
    <div className="min-h-screen">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Hero Section */}
      <div className="relative z-10 pt-32">
        <section
          className="container mx-auto px-4 py-20 relative overflow-hidden"
          aria-label="Hero"
        >
          {/* Animated Hero Visual Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-turquoise/10 to-rose/10 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            <div
              className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-br from-rose/15 to-forest/10 rounded-full blur-xl animate-pulse"
              style={{ animationDelay: '2s' }}
            />
          </div>

          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl mb-6 font-playfair font-bold leading-tight text-forest">
              {faqContent.title}
            </h1>
            <p className="text-lg mb-8 text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {faqContent.description}
            </p>
          </div>
        </section>
      </div>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-rose/5 to-turquoise/5">
        <div className="container mx-auto px-4">
          <FAQSection
            faqs={faqContent.faqs}
            title=""
            description=""
            className=""
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-forest to-turquoise py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-white font-playfair font-bold leading-tight">
            {currentLocale === 'fi'
              ? 'Etkö löytänyt vastausta kysymykseesi?'
              : "Can't find what you're looking for?"}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 font-sans leading-relaxed">
            {currentLocale === 'fi'
              ? 'Ota yhteyttä tukitiimiimme, autamme mielellään!'
              : "Contact our support team - we're happy to help!"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${currentLocale}/contact`}
              className="inline-flex items-center px-8 py-4 bg-white text-forest font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-sans"
            >
              {currentLocale === 'fi' ? 'Ota yhteyttä' : 'Contact Us'}
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </a>
            <a
              href={`/${currentLocale}/help`}
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-forest transition-all duration-300 hover:-translate-y-1 font-sans"
            >
              {currentLocale === 'fi' ? 'Ohjekeskus' : 'Help Center'}
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
