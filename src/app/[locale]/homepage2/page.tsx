import { getTranslations } from '@/lib/i18n';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import DemoVideo from '@/components/DemoVideo';
import ROICalculator from '@/components/ROICalculator';
import PricingCards from '@/components/PricingCards';
import Deferred from '@/components/Deferred';
import HeroFactBox from '@/components/HeroFactBox';
import CalendarPopup from '@/components/CalendarPopup';
import TestimonialSection from '@/components/TestimonialSection';
import {
  generatePageCanonicalUrl,
  generateHreflangMetadata,
} from '@/lib/canonical';
import { buildTitleFromTranslation } from '@/lib/title';
import { generateSoftwareApplicationSchema } from '@/lib/structured-data';
import type { ReactElement } from 'react';

const ProcessSteps = dynamic(() => import('@/components/ProcessSteps'), {
  ssr: true,
  loading: () => <div />,
});
const FeatureGrid = dynamic(() => import('@/components/FeatureGrid'), {
  ssr: true,
  loading: () => <div />,
});

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
    alternates: {
      canonical: generatePageCanonicalUrl('homepage2', locale),
      languages: generateHreflangMetadata('/homepage2', ['en', 'fi']),
    },
  };
}

export default async function HomepageV2({
  params,
}: HomeProps): Promise<ReactElement> {
  const { locale: resolvedLocale } = await params;
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(resolvedLocale)
    ? resolvedLocale
    : 'en';

  const t = await getTranslations(currentLocale);
  const softwareSchema = generateSoftwareApplicationSchema(currentLocale);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden mb-0">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-16 w-[520px] h-[520px] bg-turquoise/15 blur-[120px]" />
          <div className="absolute -bottom-20 -left-20 w-[460px] h-[460px] bg-rose/10 blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-24 relative z-10">
          <div className="w-full max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-forest mb-4 sm:mb-6 mt-4 sm:mt-8 md:mt-12 font-playfair font-bold leading-tight">
              {t['hero.headline']}
            </h1>
            <p className="text-base sm:text-lg text-mediumGray mb-6 sm:mb-8 font-sans leading-relaxed max-w-2xl">
              {t['hero.description']}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
              <a
                href="https://app.lyyli.ai"
                className="btn-primary text-center min-h-[48px] flex items-center justify-center text-base sm:text-lg px-6 py-3"
              >
                {t['hero.ctaPrimary']}
              </a>
              <CalendarPopup
                className="btn-secondary text-center min-h-[48px] flex items-center justify-center text-base sm:text-lg px-6 py-3"
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

            <p className="text-xs sm:text-sm text-mediumGray mb-4 sm:mb-6">
              {t['hero.trialNote']}
            </p>

            {/* Trial Checklist */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-sm sm:text-base font-semibold text-forest mb-3 sm:mb-4 font-sans">
                {t['hero.trialChecklist.title'] ||
                  'What happens when you start a trial?'}
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  t['hero.trialChecklist.item1'] ||
                    'Get instant access to all Launch plan features',
                  t['hero.trialChecklist.item2'] || 'Start immediately',
                  t['hero.trialChecklist.item3'] ||
                    'Full access for 30 days, cancel anytime',
                  t['hero.trialChecklist.item4'] ||
                    'Onboarding support to get you started',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <svg
                      className="w-5 h-5 text-turquoise flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-xs sm:text-sm text-mediumGray font-sans leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <HeroFactBox translations={t} />
          </div>
        </div>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />

      {/* Social Proof - Testimonials and Customer Logos */}
      <TestimonialSection translations={t} />

      {/* Persona strip */}
      <section className="py-8 sm:py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-center text-xs sm:text-sm uppercase tracking-[0.3em] text-mediumGray mb-4 sm:mb-6">
            {t['forBusiness.audience.title']}
          </p>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl text-forest font-playfair font-semibold mb-2">
                {t['forBusiness.audience.partners.title']}
              </h3>
              <p className="text-mediumGray text-xs sm:text-sm leading-relaxed">
                {t['forBusiness.audience.partners.description']}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl text-forest font-playfair font-semibold mb-2">
                {t['forBusiness.audience.ops.title']}
              </h3>
              <p className="text-mediumGray text-xs sm:text-sm leading-relaxed">
                {t['forBusiness.audience.ops.description']}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl text-forest font-playfair font-semibold mb-2">
                {t['forBusiness.audience.comms.title']}
              </h3>
              <p className="text-mediumGray text-xs sm:text-sm leading-relaxed">
                {t['forBusiness.audience.comms.description']}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Measurable business impact - combined section */}
      <section className="py-10 sm:py-16 bg-gradient-to-br from-forest/5 to-turquoise/5 border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl text-forest font-playfair font-bold mb-3">
              {t['pricing.benefits.title']}
            </h2>
          </div>

          {/* Numbers */}
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3 mb-10 sm:mb-16">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100 text-center">
              <p className="text-3xl sm:text-4xl text-forest font-bold mb-2">
                33%
              </p>
              <h3 className="text-base sm:text-lg text-forest font-playfair font-semibold mb-2">
                {t['hero.facts.timeSaved']}
              </h3>
              <p className="text-mediumGray text-xs sm:text-sm leading-relaxed">
                {t['hero.facts.timeSavedDesc']}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100 text-center">
              <p className="text-3xl sm:text-4xl text-forest font-bold mb-2">
                1.5×
              </p>
              <h3 className="text-base sm:text-lg text-forest font-playfair font-semibold mb-2">
                {t['hero.facts.productivityBoost']}
              </h3>
              <p className="text-mediumGray text-xs sm:text-sm leading-relaxed">
                {t['hero.facts.productivityBoostDesc']}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100 text-center">
              <p className="text-3xl sm:text-4xl text-forest font-bold mb-2">
                4,131€
              </p>
              <h3 className="text-base sm:text-lg text-forest font-playfair font-semibold mb-2">
                {t['hero.facts.netSavings']}
              </h3>
              <p className="text-mediumGray text-xs sm:text-sm leading-relaxed">
                {t['hero.facts.netSavingsDesc']}
              </p>
            </div>
          </div>

          {/* ROI Calculator */}
          <ROICalculator locale={currentLocale} translations={t} />
        </div>
      </section>

      {/* Demo video - moved below Measurable Business Impact section */}
      <DemoVideo translations={t} />

      {/* Multi-model differentiator */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-forest font-playfair font-bold mb-3 sm:mb-4 px-4">
              {t['forBusiness.multiModel.title']}
            </h2>
            <p className="text-sm sm:text-base text-mediumGray max-w-4xl mx-auto px-4">
              {t['forBusiness.multiModel.subtitle']}
            </p>
          </div>
          <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <h3 className="text-lg sm:text-xl text-forest mb-2 sm:mb-3 font-playfair font-semibold">
                {t['forBusiness.multiModel.quality.title']}
              </h3>
              <p className="text-mediumGray text-xs sm:text-sm leading-relaxed">
                {t['forBusiness.multiModel.quality.description']}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <h3 className="text-lg sm:text-xl text-forest mb-2 sm:mb-3 font-playfair font-semibold">
                {t['forBusiness.multiModel.reliability.title']}
              </h3>
              <p className="text-mediumGray text-xs sm:text-sm leading-relaxed">
                {t['forBusiness.multiModel.reliability.description']}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <h3 className="text-lg sm:text-xl text-forest mb-2 sm:mb-3 font-playfair font-semibold">
                {t['forBusiness.multiModel.simplicity.title']}
              </h3>
              <p className="text-mediumGray text-xs sm:text-sm leading-relaxed">
                {t['forBusiness.multiModel.simplicity.description']}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center mb-8 sm:mb-12 max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-forest font-playfair font-bold mb-4 sm:mb-6 px-4">
              {t['problems.chaos.title']}
            </h2>
            <p className="text-base sm:text-lg text-mediumGray leading-relaxed px-4">
              {t['problems.chaos.description']}
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <Deferred when="visible">
        <ProcessSteps translations={t} />
      </Deferred>

      {/* Feature grid */}
      <Deferred when="visible">
        <FeatureGrid translations={t} />
      </Deferred>

      {/* Pricing */}
      <PricingCards locale={currentLocale} translations={t} />

      {/* Trust Badges */}
      <section className="py-10 sm:py-16 bg-gradient-to-br from-forest/5 to-turquoise/5 border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-xs sm:text-sm uppercase tracking-[0.3em] text-mediumGray mb-6 sm:mb-8">
              {t['about.values.security.title'] || 'Enterprise security'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-sm border border-gray-100">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-forest"
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
                <p className="text-xs sm:text-sm font-semibold text-forest font-sans">
                  {t['trustBadges.gdpr'] || 'GDPR Compliant'}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-sm border border-gray-100">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-forest"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-forest font-sans">
                  {t['trustBadges.iso'] || 'ISO 27001 Ready'}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-sm border border-gray-100">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-forest"
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
                <p className="text-xs sm:text-sm font-semibold text-forest font-sans">
                  {t['trustBadges.finnish'] || 'Finnish Company'}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-sm border border-gray-100">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-forest"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-forest font-sans">
                  {t['trustBadges.dataProtected'] || 'Data Protected'}
                </p>
              </div>
              <div className="text-center col-span-2 sm:col-span-1">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-sm border border-gray-100">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-forest"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-forest font-sans">
                  {t['trustBadges.uptime'] || '99.9% Uptime'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-forest to-turquoise text-center">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-playfair font-bold mb-3 sm:mb-4 px-4">
            {t['cta.title'] || t['hero.ctaPrimary']}
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-4xl mx-auto mb-6 sm:mb-10 px-4">
            {t['cta.trialNote']}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
            <a
              href="https://app.lyyli.ai"
              className="btn-primary bg-forest text-white min-h-[48px] flex items-center justify-center text-base sm:text-lg px-6 py-3"
            >
              {t['hero.ctaPrimary']}
            </a>
            <CalendarPopup
              className="btn-secondary border-white text-white hover:bg-white hover:text-forest min-h-[48px] flex items-center justify-center text-base sm:text-lg px-6 py-3"
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
        </div>
      </section>
    </main>
  );
}
