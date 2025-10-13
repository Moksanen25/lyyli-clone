import { getTranslations } from "@/lib/i18n";
import { Metadata } from "next";
import FeaturesCardLayout from "@/components/features/FeaturesCardLayout";
import IntegrationsFlow from "@/components/features/IntegrationsFlow";
import { generatePageCanonicalUrl, generateHreflangMetadata } from "@/lib/canonical";
import { buildTitleFromTranslation } from "@/lib/title";

interface FeaturesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: FeaturesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return {
    title: buildTitleFromTranslation(t["features.page.title"], "Features"),
    description: t["features.page.description"],
    openGraph: {
      title: t["features.page.title"],
      description: t["features.page.description"],
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(t["features.page.title"])}&description=${encodeURIComponent(t["features.page.description"])}`,
          width: 1200,
          height: 630,
          alt: t["features.page.title"],
        },
      ],
      type: 'website',
    },
    alternates: {
      canonical: generatePageCanonicalUrl('features', locale),
      languages: generateHreflangMetadata('/features', ['en', 'fi']),
    },
  };
}

export default async function FeaturesPage({ params }: FeaturesPageProps) {
  const { locale } = await params;
  const supportedLocales = ["en", "fi"];
  const currentLocale = supportedLocales.includes(locale) ? locale : "en";

  const t = await getTranslations(currentLocale);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative z-10 pt-32">
        <section 
          className="container mx-auto px-4 py-20 relative overflow-hidden"
          aria-label="Hero"
        >
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl mb-6 font-playfair font-bold leading-tight text-forest">
              {t["features.hero.title"]}
            </h1>
            <p className="text-lg mb-8 text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t["features.hero.subtitle"]}
            </p>
          </div>
        </section>
      </div>

      {/* Removed UI visualization section (desktop and mobile images) */}

      {/* Removed "How Lyyli works" and results sections */}

      {/* Features Grid */}
      <section className="bg-gradient-to-br from-forest/5 to-turquoise/5 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <FeaturesCardLayout locale={currentLocale} translations={t} />
        </div>
      </section>

      {/* Upcoming features */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
              {t["features.upcoming.title"]}
            </h2>
            <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t["features.upcoming.subtitle"]}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { key: "campaignMode", gradient: "from-rose to-forest", icon: "M4 6h16M4 12h12M4 18h8" },
              { key: "advancedAIAnalytics", gradient: "from-forest to-rose", icon: "M4 19h16M6 16v-6m4 6v-4m4 4V7m4 9v-8" },
              { key: "mediaLibrary", gradient: "from-turquoise to-rose", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
              { key: "kpiReports", gradient: "from-forest to-turquoise", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
              { key: "brandedTemplates", gradient: "from-turquoise to-rose", icon: "M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z" },
            ].map((item, idx) => (
              <article key={idx} className="group">
                <div className="bg-gradient-to-br from-grayLight to-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl mb-3 text-forest font-playfair font-bold leading-normal">
                    {t[`features.grid.${item.key}.title`]}
                  </h3>
                  <p className="text-mediumGray text-base font-sans leading-relaxed">
                    {t[`features.grid.${item.key}.description`]}
                  </p>
                  <div className="absolute top-4 right-4">
                    <div className="px-2 py-1 text-xs rounded-full font-semibold bg-forest/90 text-white shadow-md">{t["common.comingSoon"]}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="bg-gradient-to-br from-forest/5 to-turquoise/5 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
              {t["features.integrationsFlow.title"]}
            </h2>
            <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t["features.integrationsFlow.description"]}
            </p>
          </div>
          <IntegrationsFlow translations={t} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-forest to-turquoise py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-white font-playfair font-bold leading-tight">
            {t["cta.subtitle"]}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 font-sans leading-relaxed">
            {t["cta.descriptionLong"]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`/${currentLocale}/waitlist`}
              className="inline-flex items-center px-8 py-4 bg-white text-forest font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-sans"
            >
              {t["cta.startTrial"]}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a 
              href={`/${currentLocale}/contact`}
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-forest transition-all duration-300 hover:-translate-y-1 font-sans"
            >
              {t["cta.demo"]}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
