import { getTranslations } from "../../lib/i18n";
import { IconSet } from "../../components/IconSet";
import {
  InteractiveCard,
  StatsVisual,
  FeatureHighlightCard,
  TestimonialCard,
  AnimatedTimeline,
} from "../../components/VisualElements";
import HeroVisual from "../../components/HeroVisual";
import ROIStats from "../../components/ROIStats";
import ProcessSteps from "../../components/ProcessSteps";
import FeatureGrid from "../../components/FeatureGrid";
import DemoVideo from "../../components/DemoVideo";
import ROICalculator from "../../components/ROICalculator";
import TestimonialCarousel from "../../components/TestimonialCarousel";
import PricingCards from "../../components/PricingCards";

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale: resolvedLocale } = await params;
  const supportedLocales = ["en", "fi"];
  const currentLocale = supportedLocales.includes(resolvedLocale)
    ? resolvedLocale
    : "en";

  const t = await getTranslations(currentLocale);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section - Fixed text colors for both themes */}
      <div className="relative z-10 pt-32">
        <section className="container mx-auto px-4 py-20 relative">
          {/* Animated Hero Visual */}
          <HeroVisual />
          
          <h1 className="text-3xl md:text-4xl text-forest dark:text-white text-center mb-8 font-playfair font-normal leading-tight relative z-10">
            {t["hero.headline"]}
          </h1>
          <p className="text-lg hero-description text-center max-w-3xl mx-auto mb-12 font-sans leading-relaxed relative z-10">
            {t["hero.description"]}
          </p>
          <div className="flex justify-center gap-4 mb-12 relative z-10">
            <a href="#cta" className="btn-primary">
              {t["hero.ctaPrimary"]}
            </a>
            <a href="#how-it-works" className="btn-secondary">
              {t["hero.ctaSecondary"]}
            </a>
          </div>
          <div className="text-center text-mediumGray dark:text-white text-sm font-sans relative z-10 mb-8">
            {t["hero.trustBadge"]}
          </div>
        </section>
      </div>

      {/* ROI Statistics Section */}
      <ROIStats />

      {/* Problems Section - Improved contrast and structure */}
      <section className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-forest dark:text-white mb-6 font-playfair font-normal leading-tight">
              {t["problems.title"]}
            </h2>
            <p className="text-xl text-mediumGray dark:text-white max-w-3xl mx-auto font-sans leading-relaxed">
              Common communication challenges that hold professional service organizations back
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-600 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-rose rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest dark:text-white mb-4 text-center font-sans">
                {t["problems.missedCommunications.title"]}
              </h3>
              <p className="text-mediumGray dark:text-white text-center font-sans leading-relaxed">
                {t["problems.missedCommunications.description"]}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-600 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-turquoise rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest dark:text-white mb-4 text-center font-sans">
                {t["problems.channelOverload.title"]}
              </h3>
              <p className="text-forest dark:text-white text-center font-sans leading-relaxed">
                {t["problems.channelOverload.description"]}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-600 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-forest/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest dark:text-white mb-4 text-center font-sans">
                {t["problems.accountability.title"]}
              </h3>
              <p className="text-forest dark:text-white text-center font-sans leading-relaxed">
                {t["problems.accountability.description"]}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-600 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-rose/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest dark:text-white mb-4 text-center font-sans">
                {t["problems.regulatory.title"]}
              </h3>
              <p className="text-forest dark:text-white text-center font-sans leading-relaxed">
                {t["problems.regulatory.description"]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <ProcessSteps />

      {/* Feature Grid Section */}
      <FeatureGrid />

      {/* Demo Video Section */}
      <DemoVideo />

      {/* ROI Calculator Section */}
      <ROICalculator />

      {/* Testimonials and Customer Logos */}
      <TestimonialCarousel />

      {/* Pricing Section */}
      <PricingCards />

      {/* CTA Section */}
      <section id="cta" className="py-24 bg-gradient-to-br from-forest to-turquoise">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-6 font-playfair font-normal leading-tight">
            Ready to transform your communication?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 font-sans leading-relaxed">
            Join hundreds of professional service organizations that have already revolutionized 
            their communication with Lyyli.ai
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/waitlist" 
              className="inline-flex items-center px-8 py-4 bg-white text-forest font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-sans"
            >
              Start your free trial
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a 
              href="/contact" 
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
    </main>
  );
}
