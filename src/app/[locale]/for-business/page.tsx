import { getTranslations } from '@/lib/i18n';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import PricingCards from '@/components/PricingCards';
import ROICalculator from '@/components/ROICalculator';
import CalendarPopup from '@/components/CalendarPopup';
import { generatePageCanonicalUrl, generateHreflangMetadata } from '@/lib/canonical';
import { buildTitleFromTranslation } from '@/lib/title';

const ProcessSteps = dynamic(() => import('@/components/ProcessSteps'), { ssr: true, loading: () => <div /> });
const FeatureGrid = dynamic(() => import('@/components/FeatureGrid'), { ssr: true, loading: () => <div /> });

interface ForBusinessPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ForBusinessPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return {
    title: buildTitleFromTranslation(t['forBusiness.page.title'], 'AI Communication Assistant for Business'),
    description: t['forBusiness.page.description'] ?? 'Transform your professional service organization with AI-powered communication tools. Streamline workflows, improve efficiency, and reduce costs.',
    openGraph: {
      title: t['forBusiness.page.title'],
      description: t['forBusiness.page.description'],
      type: 'website',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(t['forBusiness.page.title'])}&description=${encodeURIComponent(t['forBusiness.page.description'])}`,
          width: 1200,
          height: 630,
          alt: t['forBusiness.page.title']
        }
      ]
    },
    alternates: {
      canonical: generatePageCanonicalUrl('for-business', locale),
      languages: generateHreflangMetadata('/for-business', ['en', 'fi']),
    },
  };
}

export default async function ForBusinessPage({ params }: ForBusinessPageProps) {
  const { locale } = await params;
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(locale) ? locale : 'en';
  
  const t = await getTranslations(currentLocale);

  return (
    <main className="min-h-screen">
      {/* Hero Section - Optimized for Google Ads */}
      <div className="relative z-30 pt-32">
        <section 
          className="container mx-auto px-4 py-20 relative"
          aria-label="Hero"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-turquoise/10 to-rose/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl text-forest mb-8 font-playfair font-bold leading-tight">
              {t['forBusiness.hero.title']}
            </h1>
            <p className="text-lg text-mediumGray max-w-3xl mx-auto mb-8 font-sans leading-relaxed">
              {t['forBusiness.hero.subtitle']}
            </p>
            
            {/* Key Benefits - Quick Visual */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="w-12 h-12 bg-turquoise/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg text-forest mb-2 font-playfair font-bold">
                  {t['forBusiness.benefits.speed.title']}
                </h3>
                <p className="text-sm text-mediumGray font-sans">
                  {t['forBusiness.benefits.speed.description']}
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="w-12 h-12 bg-forest/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg text-forest mb-2 font-playfair font-bold">
                  {t['forBusiness.benefits.efficiency.title']}
                </h3>
                <p className="text-sm text-mediumGray font-sans">
                  {t['forBusiness.benefits.efficiency.description']}
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="w-12 h-12 bg-rose/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg text-forest mb-2 font-playfair font-bold">
                  {t['forBusiness.benefits.cost.title']}
                </h3>
                <p className="text-sm text-mediumGray font-sans">
                  {t['forBusiness.benefits.cost.description']}
                </p>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href="https://app.lyyli.ai"
                className="inline-flex items-center px-8 py-4 bg-forest text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-sans"
              >
                {t['forBusiness.cta.startTrial']}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <CalendarPopup 
                className="inline-flex items-center px-8 py-4 border-2 border-forest text-forest font-semibold rounded-2xl hover:bg-forest hover:text-white transition-all duration-300 hover:-translate-y-1 font-sans"
                translations={{
                  title: t["calendar.title"],
                  subtitle: t["calendar.subtitle"],
                  description: t["calendar.description"],
                  loading: t["calendar.loading"],
                  errorTitle: t["calendar.error.title"],
                  errorDescription: t["calendar.error.description"],
                  errorButton: t["calendar.error.button"],
                  footerSecure: t["calendar.footer.secure"],
                  footerContact: t["calendar.footer.contact"]
                }}
              >
                {t['forBusiness.cta.demo']}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </CalendarPopup>
            </div>

            <div className="text-center text-mediumGray text-sm font-sans">
              {t['forBusiness.hero.trustBadge']}
            </div>
          </div>
        </section>
      </div>

      {/* Problem/Solution Section */}
      <section className="py-16 bg-gradient-to-br from-rose/5 to-turquoise/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-forest mb-6 font-playfair font-bold leading-tight">
              {t['forBusiness.problems.title']}
            </h2>
            <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t['forBusiness.problems.subtitle']}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl text-forest mb-4 text-center font-playfair font-bold">
                {t['forBusiness.problems.overload.title']}
              </h3>
              <p className="text-mediumGray text-center font-sans leading-relaxed">
                {t['forBusiness.problems.overload.description']}
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl text-forest mb-4 text-center font-playfair font-bold">
                {t['forBusiness.problems.inconsistency.title']}
              </h3>
              <p className="text-mediumGray text-center font-sans leading-relaxed">
                {t['forBusiness.problems.inconsistency.description']}
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl text-forest mb-4 text-center font-playfair font-bold">
                {t['forBusiness.problems.time.title']}
              </h3>
              <p className="text-mediumGray text-center font-sans leading-relaxed">
                {t['forBusiness.problems.time.description']}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simplified Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-forest mb-6 font-playfair font-bold leading-tight">
              {t['forBusiness.process.title']}
            </h2>
            <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t['forBusiness.process.subtitle']}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-forest text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl text-forest mb-4 font-playfair font-bold">
                {t['forBusiness.process.step1.title']}
              </h3>
              <p className="text-mediumGray font-sans leading-relaxed">
                {t['forBusiness.process.step1.description']}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-turquoise text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl text-forest mb-4 font-playfair font-bold">
                {t['forBusiness.process.step2.title']}
              </h3>
              <p className="text-mediumGray font-sans leading-relaxed">
                {t['forBusiness.process.step2.description']}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-rose text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl text-forest mb-4 font-playfair font-bold">
                {t['forBusiness.process.step3.title']}
              </h3>
              <p className="text-mediumGray font-sans leading-relaxed">
                {t['forBusiness.process.step3.description']}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-forest text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl text-forest mb-4 font-playfair font-bold">
                {t['forBusiness.process.step4.title']}
              </h3>
              <p className="text-mediumGray font-sans leading-relaxed">
                {t['forBusiness.process.step4.description']}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-16 bg-gradient-to-br from-forest/5 to-turquoise/5">
        <ROICalculator locale={currentLocale} translations={t} />
      </section>

      {/* Pricing Section - Compact */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-forest mb-6 font-playfair font-bold leading-tight">
              {t['forBusiness.pricing.title']}
            </h2>
            <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t['forBusiness.pricing.subtitle']}
            </p>
          </div>
          
          <PricingCards locale={currentLocale} translations={t} />
        </div>
      </section>

      {/* Social Proof / Trust Indicators */}
      <section className="py-16 bg-gradient-to-br from-rose/5 to-turquoise/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-forest mb-6 font-playfair font-bold leading-tight">
              {t['forBusiness.trust.title']}
            </h2>
            <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t['forBusiness.trust.subtitle']}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl text-forest mb-4 font-playfair font-bold">
                {t['forBusiness.trust.security.title']}
              </h3>
              <p className="text-mediumGray font-sans leading-relaxed">
                {t['forBusiness.trust.security.description']}
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl text-forest mb-4 font-playfair font-bold">
                {t['forBusiness.trust.support.title']}
              </h3>
              <p className="text-mediumGray font-sans leading-relaxed">
                {t['forBusiness.trust.support.description']}
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl text-forest mb-4 font-playfair font-bold">
                {t['forBusiness.trust.results.title']}
              </h3>
              <p className="text-mediumGray font-sans leading-relaxed">
                {t['forBusiness.trust.results.description']}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-forest to-turquoise">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-6 font-playfair font-bold leading-tight">
            {t['forBusiness.finalCta.title']}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 font-sans leading-relaxed">
            {t['forBusiness.finalCta.subtitle']}
          </p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">80%</div>
              <div className="text-white/80 font-sans">Faster communication</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">2,400€</div>
              <div className="text-white/80 font-sans">Monthly savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">340%</div>
              <div className="text-white/80 font-sans">ROI in 12 months</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://app.lyyli.ai"
              className="inline-flex items-center px-8 py-4 bg-white text-forest font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-sans"
            >
              {t['forBusiness.finalCta.startTrial']}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a 
              href="https://app.lyyli.ai"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-forest transition-all duration-300 hover:-translate-y-1 font-sans"
            >
              {t['forBusiness.finalCta.contact']}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
