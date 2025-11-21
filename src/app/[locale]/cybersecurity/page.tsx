import type { Metadata } from 'next';
import { getTranslations } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import SecurityFeatures from '@/components/cybersecurity/SecurityFeatures';
import TechnicalArchitecture from '@/components/cybersecurity/TechnicalArchitecture';
import GDPRCompliance from '@/components/cybersecurity/GDPRCompliance';
import AccessControl from '@/components/cybersecurity/AccessControl';
import ContinuousDevelopment from '@/components/cybersecurity/ContinuousDevelopment';
import SecuritySupport from '@/components/cybersecurity/SecuritySupport';
import CalendarPopup from '@/components/CalendarPopup';
import Accordion from '@/components/ui/Accordion';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return {
    title: t['cybersecurity.page.title'],
    description: t['cybersecurity.page.description'],
    keywords: t['cybersecurity.page.keywords'],
    openGraph: {
      title: t['cybersecurity.page.title'],
      description: t['cybersecurity.page.description'],
      type: 'website',
      images: [
        {
          url: '/images/social/Social_share_cybersecurity_LyyliAI.webp',
          width: 1200,
          height: 630,
          alt: t['cybersecurity.page.title'],
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t['cybersecurity.page.title'],
      description: t['cybersecurity.page.description'],
      images: ['/images/social/Social_share_cybersecurity_LyyliAI.webp'],
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fi' }];
}

export default async function CybersecurityPage({ params }: PageProps) {
  const { locale } = await params;
  const supportedLocales = ['en', 'fi'];
  if (!supportedLocales.includes(locale)) notFound();

  const t = await getTranslations(locale);
  const currentLocale = locale;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative z-10 pt-32">
        <section
          className="container mx-auto px-4 py-20 relative overflow-hidden"
          aria-label="Hero"
        >
          {/* Animated Hero Visual */}

          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl mb-6 text-forest font-playfair font-bold leading-tight">
              {t['cybersecurity.hero.title']}
            </h1>
            <p className="text-lg mb-12 text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t['cybersecurity.hero.subtitle']}
            </p>
            {/* Hero CTA buttons following layout rule */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${locale}/contact`}
                className="inline-flex items-center px-8 py-4 bg-forest text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-sans"
                aria-label="Contact Lyyli.ai about cybersecurity"
              >
                {t['cybersecurity.hero.contactButton']}
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
              </a>
              <a
                href={`/${locale}/features`}
                className="inline-flex items-center px-8 py-4 border-2 border-forest text-forest font-semibold rounded-2xl hover:bg-forest hover:text-white transition-all duration-300 hover:-translate-y-1 font-sans"
                aria-label="View Lyyli.ai features"
              >
                {t['cybersecurity.hero.featuresButton']}
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
            </div>
          </div>
        </section>
      </div>

      {/* Pillars row */}
      <section className="border-t border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                key: 'encryption',
                label: t['cybersecurity.pillars.encryption'] || 'Encryption',
                icon: (
                  <svg
                    className="w-6 h-6 text-forest"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c-1.657 0-3 1.343-3 3v3h6v-3c0-1.657-1.343-3-3-3zm0-7a4 4 0 00-4 4v3h8V8a4 4 0 00-4-4z"
                    />
                  </svg>
                ),
              },
              {
                key: 'residency',
                label: t['cybersecurity.pillars.residency'] || 'Data residency',
                icon: (
                  <svg
                    className="w-6 h-6 text-forest"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3C7.03 3 3 7.03 3 12h0a9 9 0 0015.364 6.364A9 9 0 0012 3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2 12h20M12 2a15.3 15.3 0 010 20"
                    />
                  </svg>
                ),
              },
              {
                key: 'access',
                label: t['cybersecurity.pillars.access'] || 'Access control',
                icon: (
                  <svg
                    className="w-6 h-6 text-forest"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 10-8 0v4M5 11h14v10H5z"
                    />
                  </svg>
                ),
              },
              {
                key: 'compliance',
                label: t['cybersecurity.pillars.compliance'] || 'Compliance',
                icon: (
                  <svg
                    className="w-6 h-6 text-forest"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m2-5H7a2 2 0 00-2 2v12a2 2 0 002 2h5l5-5V4a2 2 0 00-2-2z"
                    />
                  </svg>
                ),
              },
              {
                key: 'incident',
                label:
                  t['cybersecurity.pillars.incident'] || 'Incident response',
                icon: (
                  <svg
                    className="w-6 h-6 text-forest"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M4.93 4.93l14.14 14.14"
                    />
                  </svg>
                ),
              },
            ].map(p => (
              <div
                key={p.key}
                className="bg-grayLight rounded-2xl border border-gray-200 p-4 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-2">
                  {p.icon}
                </div>
                <div className="text-forest font-playfair font-bold">
                  {p.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border border-forest text-forest bg-white shadow-sm">
              {t['cybersecurity.badges.iso'] || 'ISO 27001 ready'}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border border-forest text-forest bg-white shadow-sm">
              {t['cybersecurity.badges.gdpr'] || 'GDPR compliant'}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border border-turquoise text-turquoise bg-white shadow-sm">
              {t['cybersecurity.badges.eu'] || 'EU data residency'}
            </span>
          </div>
        </div>
      </section>

      {/* Security Highlights */}
      <section className="border-t border-gray-100 relative z-20 mt-8">
        <div className="container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="w-16 h-16 bg-forest/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-forest"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold text-forest mb-4">
                {t['cybersecurity.highlights.gdpr.title']}
              </h3>
              <p className="text-mediumGray font-sans leading-relaxed">
                {t['cybersecurity.highlights.gdpr.description']}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="w-16 h-16 bg-turquoise/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-turquoise"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold text-forest mb-4">
                {t['cybersecurity.highlights.encryption.title']}
              </h3>
              <p className="text-mediumGray font-sans leading-relaxed">
                {t['cybersecurity.highlights.encryption.description']}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="w-16 h-16 bg-forest/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-forest"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold text-forest mb-4">
                {t['cybersecurity.highlights.euServers.title']}
              </h3>
              <p className="text-mediumGray font-sans leading-relaxed">
                {t['cybersecurity.highlights.euServers.description']}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Accordions */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Accordion
            items={[
              {
                id: 'encryption',
                title:
                  t['cybersecurity.sections.encryption'] ||
                  'Encryption & data protection',
                content: <SecurityFeatures locale={currentLocale} />,
                defaultOpen: true,
              },
              {
                id: 'architecture',
                title:
                  t['cybersecurity.sections.architecture'] ||
                  'Technical architecture',
                content: <TechnicalArchitecture locale={currentLocale} />,
              },
              {
                id: 'gdpr',
                title:
                  t['cybersecurity.sections.gdpr'] ||
                  'GDPR compliance & data processing',
                content: <GDPRCompliance locale={currentLocale} />,
              },
              {
                id: 'access',
                title:
                  t['cybersecurity.sections.accessControl'] ||
                  'Access control & auditing',
                content: <AccessControl locale={currentLocale} />,
              },
              {
                id: 'continuous',
                title:
                  t['cybersecurity.sections.continuous'] ||
                  'Continuous development & incident response',
                content: <ContinuousDevelopment locale={currentLocale} />,
              },
              {
                id: 'support',
                title:
                  t['cybersecurity.sections.support'] || 'Security support',
                content: <SecuritySupport locale={currentLocale} />,
              },
            ]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-forest to-turquoise py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-white font-playfair font-bold leading-tight">
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
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-forest transition-all duration-300 hover:-translate-y-1 font-sans"
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
    </div>
  );
}
