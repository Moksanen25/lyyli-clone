import { getTranslations } from "@/lib/i18n";
import { Metadata } from "next";
import Image from "next/image";
import FeaturesCardLayout from "@/components/features/FeaturesCardLayout";
import IntegrationsFlow from "@/components/features/IntegrationsFlow";

interface FeaturesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: FeaturesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return {
    title: t["features.page.title"],
    description: t["features.page.description"],
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
            <h1 className="text-3xl md:text-4xl mb-6 font-playfair font-normal leading-tight text-forest">
              {t["features.hero.title"]}
            </h1>
            <p className="text-lg mb-8 text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t["features.hero.subtitle"]}
            </p>
          </div>
        </section>
      </div>

      {/* AI Communication Visualization */}
      <section className="bg-gradient-to-br from-rose/5 to-turquoise/5 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-normal leading-snug">
              {t["features.ui.title"] || "How Lyyli connects your teams"}
            </h2>
            <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t["features.ui.subtitle"] || "Our AI-powered platform creates seamless communication bridges across all your tools and channels."}
            </p>
          </div>
        <div className="relative flex justify-center items-center">
          {/* Desktop UI - Background */}
          <div className="relative group">
            <div className="relative z-0">
              <Image 
                src="/images/general/Desktop_UI_for_web.png" 
                alt="Lyyli.ai Desktop Interface - AI Communication Hub" 
                width={600}
                height={400}
                className="w-full max-w-md lg:max-w-lg rounded-lg shadow-soft border border-gray-200 transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-medium"
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-lg blur-xl -z-10 group-hover:blur-2xl transition-all duration-300 ease-out" />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-forest text-white px-4 py-2 rounded-full text-sm font-medium shadow-soft">
              {t["features.ui.desktop"]}
            </div>
          </div>

          {/* Mobile UI - Foreground, overlapping */}
          <div className="absolute right-0 lg:right-8 top-1/2 transform -translate-y-1/2 group">
            <div className="relative z-20">
              <Image 
                src="/images/general/Mobile_UI_for_web.jpeg" 
                alt="Lyyli.ai Mobile Interface - AI Communication Hub" 
                width={200}
                height={300}
                className="w-full max-w-[200px] lg:max-w-[180px] rounded-lg shadow-soft border border-gray-200 transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-medium group-hover:-translate-y-1 group-hover:rotate-1"
              />
              {/* Enhanced glow effect for mobile */}
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/15 to-rose/15 rounded-lg blur-lg -z-10 group-hover:blur-xl group-hover:from-turquoise/25 group-hover:to-rose/25 transition-all duration-300 ease-out" />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-turquoise text-white px-4 py-2 rounded-full text-sm font-medium shadow-soft">
              {t["features.ui.mobile"]}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* How Lyyli Works */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-normal leading-snug">
              How Lyyli works
            </h2>
            <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              Simple, powerful steps to transform your professional service organization's communication workflow.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-forest to-turquoise rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <div className="relative">
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <h3 className="text-xl font-playfair font-normal text-forest mb-3">
                  Connect your tools
                </h3>
                <p className="text-mediumGray font-sans leading-relaxed">
                  Seamlessly integrate with Slack, Teams, and email systems. No disruption to your existing workflow.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-turquoise to-rose rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="relative">
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <h3 className="text-xl font-playfair font-normal text-forest mb-3">
                  AI learns your style
                </h3>
                <p className="text-mediumGray font-sans leading-relaxed">
                  Our AI adapts to your organization's communication patterns, tone, and professional requirements.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-rose to-forest rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="relative">
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <h3 className="text-xl font-playfair font-normal text-forest mb-3">
                  Automate & optimize
                </h3>
                <p className="text-mediumGray font-sans leading-relaxed">
                  Generate professional communications instantly with full audit trails and compliance tracking.
                </p>
              </div>
            </div>
          </div>

          {/* Results section */}
          <div className="mt-16 bg-gradient-to-br from-rose/5 to-turquoise/5 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-playfair font-normal text-forest mb-4">
                Results you can measure
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-forest mb-2">75%</div>
                <p className="text-mediumGray font-sans">Faster response times</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-forest mb-2">60%</div>
                <p className="text-mediumGray font-sans">Less time searching for information</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-forest mb-2">100%</div>
                <p className="text-mediumGray font-sans">Compliance audit readiness</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gradient-to-br from-forest/5 to-turquoise/5 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-normal leading-snug">
              {t["features.grid.title"]}
            </h2>
            <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t["features.grid.subtitle"]}
            </p>
          </div>
          <FeaturesCardLayout locale={currentLocale} translations={t} />
        </div>
      </section>

      {/* Integrations */}
      <section className="bg-gradient-to-br from-forest/5 to-turquoise/5 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-normal leading-snug">
              Integrations & data flow
            </h2>
            <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              Connect seamlessly with your existing tools and platforms. Lyyli intelligently manages data flow to optimize your communication workflow.
            </p>
          </div>
          <IntegrationsFlow />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-forest to-turquoise py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-white font-playfair font-normal leading-tight">
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
