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
      <section className="relative z-30 pt-20 md:pt-28">
        <div className="container mx-auto px-4 py-12 md:py-20 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl text-forest mb-6 font-playfair font-bold leading-tight">
              {t['hero.headline']}
            </h1>
            <p className="text-lg text-mediumGray mb-8 font-sans leading-relaxed">
              {t['hero.description']}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
              <a
                href="https://app.lyyli.ai"
                className="btn-primary text-center"
              >
                {t['hero.ctaPrimary']}
              </a>
              <CalendarPopup
                className="btn-secondary text-center"
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

            <div className="bg-white/80 border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm">
              <p className="text-forest font-semibold mb-2">
                {t['cta.trialNote']}
              </p>
              <ul className="space-y-2 text-mediumGray text-sm">
                <li>• Connect Slack, Teams & email securely</li>
                <li>• Import existing guidelines in minutes</li>
                <li>• Get a live onboarding session with our team</li>
              </ul>
            </div>

            <HeroFactBox translations={t} />
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <ProductShowcase translations={t} />
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
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm uppercase tracking-[0.3em] text-mediumGray mb-6">
            {t['forBusiness.audience.title']}
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl text-forest font-playfair font-semibold mb-2">
                {t['forBusiness.audience.partners.title']}
              </h3>
              <p className="text-mediumGray text-sm">
                {t['forBusiness.audience.partners.description']}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl text-forest font-playfair font-semibold mb-2">
                {t['forBusiness.audience.ops.title']}
              </h3>
              <p className="text-mediumGray text-sm">
                {t['forBusiness.audience.ops.description']}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl text-forest font-playfair font-semibold mb-2">
                {t['forBusiness.audience.comms.title']}
              </h3>
              <p className="text-mediumGray text-sm">
                {t['forBusiness.audience.comms.description']}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mini ROI highlight */}
      <section className="py-12 bg-gradient-to-br from-forest/5 to-turquoise/5 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl text-forest font-playfair font-bold mb-3">
              {t['pricing.benefits.title']}
            </h2>
            <p className="text-mediumGray">{t['pricing.assumptions.title']}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
              <p className="text-4xl text-forest font-bold mb-2">
                {t['pricing.benefits.cost.value']}
              </p>
              <p className="text-mediumGray text-sm">
                {t['pricing.benefits.cost.description']}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
              <p className="text-4xl text-forest font-bold mb-2">
                {t['pricing.benefits.efficiency.value']}
              </p>
              <p className="text-mediumGray text-sm">
                {t['pricing.benefits.efficiency.description']}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
              <p className="text-4xl text-forest font-bold mb-2">
                {t['pricing.benefits.roi.value']}
              </p>
              <p className="text-mediumGray text-sm">
                {t['pricing.benefits.roi.description']}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-model differentiator */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl text-forest font-playfair font-bold mb-4">
              {t['forBusiness.multiModel.title']}
            </h2>
            <p className="text-mediumGray max-w-3xl mx-auto">
              {t['forBusiness.multiModel.subtitle']}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl text-forest mb-3 font-playfair font-semibold">
                {t['forBusiness.multiModel.quality.title']}
              </h3>
              <p className="text-mediumGray text-sm">
                {t['forBusiness.multiModel.quality.description']}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl text-forest mb-3 font-playfair font-semibold">
                {t['forBusiness.multiModel.reliability.title']}
              </h3>
              <p className="text-mediumGray text-sm">
                {t['forBusiness.multiModel.reliability.description']}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl text-forest mb-3 font-playfair font-semibold">
                {t['forBusiness.multiModel.simplicity.title']}
              </h3>
              <p className="text-mediumGray text-sm">
                {t['forBusiness.multiModel.simplicity.description']}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="border-t border-gray-100">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-forest font-playfair font-bold mb-4">
              {t['problems.title']}
            </h2>
            <p className="text-mediumGray max-w-3xl mx-auto">
              {t['problems.subtitle']}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
              <p className="text-3xl text-forest font-bold mb-2">48h</p>
              <h3 className="text-xl text-forest font-playfair font-semibold mb-3">
                {t['problems.missedCommunications.title']}
              </h3>
              <p className="text-mediumGray text-sm">
                {t['problems.missedCommunications.description']}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
              <p className="text-3xl text-forest font-bold mb-2">8 tools</p>
              <h3 className="text-xl text-forest font-playfair font-semibold mb-3">
                {t['problems.channelOverload.title']}
              </h3>
              <p className="text-mediumGray text-sm">
                {t['problems.channelOverload.description']}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
              <p className="text-3xl text-forest font-bold mb-2">0 trail</p>
              <h3 className="text-xl text-forest font-playfair font-semibold mb-3">
                {t['problems.accountability.title']}
              </h3>
              <p className="text-mediumGray text-sm">
                {t['problems.accountability.description']}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
              <p className="text-3xl text-forest font-bold mb-2">20%</p>
              <h3 className="text-xl text-forest font-playfair font-semibold mb-3">
                {t['problems.regulatory.title']}
              </h3>
              <p className="text-mediumGray text-sm">
                {t['problems.regulatory.description']}
              </p>
            </div>
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

      {/* Demo video */}
      <DemoVideo translations={t} />

      {/* ROI calculator */}
      <ROICalculator locale={currentLocale} translations={t} />

      {/* Pricing */}
      <PricingCards locale={currentLocale} translations={t} />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-forest to-turquoise text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl text-white font-playfair font-bold mb-4">
            {t['cta.title']}
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto mb-10">
            {t['cta.descriptionLong']}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://app.lyyli.ai"
              className="btn-primary bg-white text-forest"
            >
              {t['cta.startTrial']}
            </a>
            <CalendarPopup
              className="btn-secondary border-white text-white hover:bg-white hover:text-forest"
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
            </CalendarPopup>
          </div>
        </div>
      </section>
    </main>
  );
}
