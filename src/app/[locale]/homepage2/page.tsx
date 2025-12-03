import { getTranslations } from '@/lib/i18n';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import DemoVideo from '@/components/DemoVideo';
import ROICalculator from '@/components/ROICalculator';
import PricingCards from '@/components/PricingCards';
import Deferred from '@/components/Deferred';
import HeroFactBox from '@/components/HeroFactBox';
import CalendarPopup from '@/components/CalendarPopup';
import {
  generatePageCanonicalUrl,
  generateHreflangMetadata,
} from '@/lib/canonical';
import { buildTitleFromTranslation } from '@/lib/title';
import { generateSoftwareApplicationSchema } from '@/lib/structured-data';
import type { ReactElement } from 'react';
import Image from 'next/image';

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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-16 w-[520px] h-[520px] bg-turquoise/15 blur-[120px]" />
          <div className="absolute -bottom-20 -left-20 w-[460px] h-[460px] bg-rose/10 blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-24 relative z-10">
          <div className="w-full max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-forest mb-4 sm:mb-6 mt-4 sm:mt-8 md:mt-12 font-playfair font-bold leading-tight">
              {t['hero.headline']}
            </h1>
            <p className="text-base sm:text-lg text-mediumGray mb-6 sm:mb-8 font-sans leading-relaxed max-w-xl">
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

      {/* Interface Screenshot */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="w-full max-w-4xl mx-auto">
            {/* Desktop visual */}
            <div className="hidden lg:block">
              <div className="relative ml-auto max-w-xl mx-auto">
                <div className="rounded-[32px] bg-white border border-gray-100 shadow-[0_35px_90px_-45px_rgba(22,41,34,0.6)] p-4">
                  <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
                    <div className="bg-[#202c2a] text-white px-4 py-2 flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-rose/80" />
                        <span className="w-3 h-3 rounded-full bg-turquoise/70" />
                        <span className="w-3 h-3 rounded-full bg-turquoise/40" />
                      </div>
                      <div className="flex-1 text-center text-xs opacity-80">
                        app.lyyli.ai
                      </div>
                    </div>
                    <Image
                      src="/images/general/Lyyli_dashboard_desktop.webp"
                      alt="Lyyli desktop interface preview"
                      width={1920}
                      height={1080}
                      className="w-full h-auto"
                      sizes="(max-width: 1280px) 90vw, 520px"
                      quality={90}
                    />
                  </div>
                </div>

                <div className="absolute -right-16 -bottom-14 w-48">
                  <div className="rounded-[26px] bg-white border border-gray-100 shadow-xl p-3">
                    <div className="rounded-[22px] overflow-hidden border border-gray-100 shadow-inner">
                      <Image
                        src="/images/general/Lyyli_dashboard_mobile.webp"
                        alt="Lyyli mobile interface preview"
                        width={390}
                        height={844}
                        className="w-full h-auto"
                        sizes="192px"
                        quality={90}
                      />
                    </div>
                    <p className="text-xs text-mediumGray mt-3">
                      {t['showcase.cta.text'] ||
                        'Experience seamless communication across all your devices'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile visual */}
            <div className="lg:hidden">
              <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white shadow-xl p-3 sm:p-4">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 shadow">
                  <Image
                    src="/images/general/Lyyli_dashboard_mobile.webp"
                    alt="Lyyli mobile interface preview"
                    width={390}
                    height={844}
                    className="w-full h-auto"
                    sizes="100vw"
                    quality={85}
                  />
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto pb-2 -mx-4 px-4">
                {[
                  t['showcase.feature1'] || 'AI-powered',
                  t['forBusiness.multiModel.reliability.title'] ||
                    'Reliable by design',
                  t['forBusiness.multiModel.simplicity.title'] ||
                    'One secure interface',
                ].map(chip => (
                  <span
                    key={chip}
                    className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-semibold text-forest whitespace-nowrap"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-model differentiator */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-forest font-playfair font-bold mb-3 sm:mb-4 px-4">
              {t['forBusiness.multiModel.title']}
            </h2>
            <p className="text-sm sm:text-base text-mediumGray max-w-3xl mx-auto px-4">
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
          <div className="text-center mb-8 sm:mb-12 max-w-4xl mx-auto">
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

      {/* CTA */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-forest to-turquoise text-center">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-playfair font-bold mb-3 sm:mb-4 px-4">
            {t['cta.title'] || t['hero.ctaPrimary']}
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-3xl mx-auto mb-6 sm:mb-10 px-4">
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
