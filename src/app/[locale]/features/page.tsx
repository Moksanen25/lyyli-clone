import { getTranslations } from "@/lib/i18n";
import { Metadata } from "next";
import FeaturesCardLayout from "@/components/features/FeaturesCardLayout";
import FeaturesAccordionLayout from "@/components/features/FeaturesAccordionLayout";
import HeroVisual from "@/components/HeroVisual";

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative z-10 pt-32">
        <section 
          className="container mx-auto px-4 py-20 relative overflow-hidden"
          aria-label="Hero"
        >
          {/* Animated Hero Visual */}
          <HeroVisual />
          
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
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-normal leading-snug">
            How Lyyli connects your teams
          </h2>
          <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
            Our AI-powered platform creates seamless communication bridges across all your tools and channels.
          </p>
        </div>
        <div className="relative flex justify-center items-center">
          {/* Desktop UI - Background */}
          <div className="relative group">
            <div className="relative z-0">
              <img 
                src="/images/general/Desktop_UI_for_web.png" 
                alt="Lyyli.ai Desktop Interface - AI Communication Hub" 
                className="w-full max-w-md lg:max-w-lg rounded-lg shadow-soft border border-gray-200 transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-medium"
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-lg blur-xl -z-10 group-hover:blur-2xl transition-all duration-300 ease-out" />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-forest text-white px-4 py-2 rounded-full text-sm font-medium shadow-soft">
              Desktop experience
            </div>
          </div>

          {/* Mobile UI - Foreground, overlapping */}
          <div className="absolute right-0 lg:right-8 top-1/2 transform -translate-y-1/2 group">
            <div className="relative z-20">
              <img 
                src="/images/general/Mobile_UI_for_web.jpeg" 
                alt="Lyyli.ai Mobile Interface - AI Communication Hub" 
                className="w-full max-w-[200px] lg:max-w-[180px] rounded-lg shadow-soft border border-gray-200 transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-medium group-hover:-translate-y-1 group-hover:rotate-1"
              />
              {/* Enhanced glow effect for mobile */}
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/15 to-rose/15 rounded-lg blur-lg -z-10 group-hover:blur-xl group-hover:from-turquoise/25 group-hover:to-rose/25 transition-all duration-300 ease-out" />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-turquoise text-white px-4 py-2 rounded-full text-sm font-medium shadow-soft">
              Mobile experience
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gradient-to-br from-rose/5 to-turquoise/5 py-16 lg:py-24">
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

      {/* Features Accordion */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-normal leading-snug">
              {t["features.accordion.title"]}
            </h2>
            <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t["features.accordion.subtitle"]}
            </p>
          </div>
          <FeaturesAccordionLayout locale={currentLocale} translations={t} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-forest to-turquoise py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-white font-playfair font-normal leading-tight">
            Ready to transform your communication?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 font-sans leading-relaxed">
            Join hundreds of professional service organizations that have already revolutionized 
            their communication with Lyyli.ai
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`/${currentLocale}/waitlist`}
              className="inline-flex items-center px-8 py-4 bg-white text-forest font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-sans"
            >
              Start your free trial
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a 
              href={`/${currentLocale}/contact`}
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-forest transition-all duration-300 hover:-translate-y-1 font-sans"
            >
              Schedule a demo
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
