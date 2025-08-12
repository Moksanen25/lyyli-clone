import { Metadata } from 'next';
import { getTranslations } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import SecurityFeatures from '@/components/cybersecurity/SecurityFeatures';
import TechnicalArchitecture from '@/components/cybersecurity/TechnicalArchitecture';
import GDPRCompliance from '@/components/cybersecurity/GDPRCompliance';
import AccessControl from '@/components/cybersecurity/AccessControl';
import ContinuousDevelopment from '@/components/cybersecurity/ContinuousDevelopment';
import SecuritySupport from '@/components/cybersecurity/SecuritySupport';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);
  
  return {
    title: t['cybersecurity.meta.title'],
    description: t['cybersecurity.meta.description'],
    keywords: t['cybersecurity.meta.keywords'],
    openGraph: {
      title: t['cybersecurity.meta.title'],
      description: t['cybersecurity.meta.description'],
      type: 'website',
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fi" }];
}

export default async function CybersecurityPage({ params }: PageProps) {
  const { locale } = await params;
  const supportedLocales = ["en", "fi"];
  if (!supportedLocales.includes(locale)) notFound();
  
  const t = await getTranslations(locale);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest to-forest/90 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold leading-tight mb-6">
                {t['cybersecurity.hero.title']}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-sans leading-relaxed mb-8">
                {t['cybersecurity.hero.subtitle']}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-turquoise text-white font-bold rounded-lg hover:bg-turquoise/90 transition-colors duration-200"
                >
                  {t['cybersecurity.hero.contactButton']}
                </a>
                <a
                  href={`/${locale}/features`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors duration-200 border border-white/20"
                >
                  {t['cybersecurity.hero.featuresButton']}
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/general/cybersecurity_hero.png"
                alt={t['cybersecurity.hero.imageAlt']}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Security Highlights */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-forest/5 rounded-lg border border-forest/20">
              <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold text-forest mb-2">
                {t['cybersecurity.highlights.gdpr.title']}
              </h3>
              <p className="text-mediumGray font-sans">
                {t['cybersecurity.highlights.gdpr.description']}
              </p>
            </div>
            
            <div className="text-center p-6 bg-forest/5 rounded-lg border border-forest/20">
              <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold text-forest mb-2">
                {t['cybersecurity.highlights.euServers.title']}
              </h3>
              <p className="text-mediumGray font-sans">
                {t['cybersecurity.highlights.euServers.description']}
              </p>
            </div>
            
            <div className="text-center p-6 bg-forest/5 rounded-lg border border-forest/20">
              <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold text-forest mb-2">
                {t['cybersecurity.highlights.encryption.title']}
              </h3>
              <p className="text-mediumGray font-sans">
                {t['cybersecurity.highlights.encryption.description']}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <SecurityFeatures locale={locale} />

      {/* Technical Architecture */}
      <TechnicalArchitecture locale={locale} />

      {/* GDPR Compliance */}
      <GDPRCompliance locale={locale} />

      {/* Access Control */}
      <AccessControl locale={locale} />

      {/* Continuous Development */}
      <ContinuousDevelopment locale={locale} />

      {/* Support Section */}
      <SecuritySupport locale={locale} />
    </main>
  );
}
