import { getTranslations } from "@/lib/i18n";
import { Metadata } from "next";
import FeaturesCardLayout from "@/components/features/FeaturesCardLayout";
import FeaturesAccordionLayout from "@/components/features/FeaturesAccordionLayout";
import LayoutToggle from "@/components/features/LayoutToggle";
import {
  InteractiveCard,
  FeatureHighlightCard,
  AnimatedTimeline,
  EnhancedGeometricPattern,
  FloatingElements,
} from "@/components/VisualElements";
import SubPageVisual from "@/components/SubPageVisual";

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
    <div className="bg-white relative overflow-hidden">
      {/* Background Visual Elements */}
      <FloatingElements />
      
      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-16 lg:py-24">
        {/* Animated Sub-Page Visual */}
        <SubPageVisual />
        
        {/* Hero Background Pattern */}
        <EnhancedGeometricPattern className="opacity-20" />
        
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl mb-6 font-playfair font-bold leading-tight text-forest">
            {t["features.hero.title"]}
          </h1>
          <p className="text-lg mb-8 text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
            {t["features.hero.subtitle"]}
          </p>


        </div>
      </section>

      {/* AI Communication Visualization */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
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
                className="w-full max-w-md lg:max-w-lg rounded-lg shadow-soft border border-gray-200 transition-all duration-300 group-hover:scale-105 group-hover:shadow-medium"
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-lg blur-xl -z-10 group-hover:blur-2xl transition-all duration-300" />
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
                className="w-full max-w-[200px] lg:max-w-[180px] rounded-lg shadow-soft border border-gray-200 transition-all duration-300 group-hover:scale-110 group-hover:shadow-medium group-hover:-translate-y-1 group-hover:rotate-1"
              />
              {/* Enhanced glow effect for mobile */}
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/15 to-rose/15 rounded-lg blur-lg -z-10 group-hover:blur-xl group-hover:from-turquoise/25 group-hover:to-rose/25 transition-all duration-300" />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-turquoise text-white px-3 py-1 rounded-full text-xs font-medium shadow-soft">
              Mobile
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Overview */}
      <section className="container mx-auto px-4 py-16 bg-grayLight/30">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
            Core benefits for professional service organizations
          </h2>
          <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
            Discover how Lyyli transforms communication workflows with intelligent automation and enterprise-grade security.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-soft">
            <h3 className="text-xl mb-3 text-forest font-playfair font-bold">AI-powered efficiency</h3>
            <p className="text-mediumGray">Reduce manual communication tasks by 75% with intelligent automation and smart routing.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-soft">
            <h3 className="text-xl mb-3 text-forest font-playfair font-bold">Enterprise security</h3>
            <p className="text-mediumGray">Bank-grade encryption, ISO certifications, and comprehensive compliance built-in.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-soft">
            <h3 className="text-xl mb-3 text-forest font-playfair font-bold">Seamless integration</h3>
            <p className="text-mediumGray">Works with your existing Slack, Teams, and email workflows without disruption.</p>
          </div>
        </div>
      </section>

      {/* Features Content */}
      <section className="container mx-auto px-4 py-16">
        <FeaturesCardLayout locale={currentLocale} translations={t} />
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 bg-grayLight/30">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
            How Lyyli works
          </h2>
          <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
            Get started in minutes with our simple 4-step process.
          </p>
        </div>
        
        <div className="space-y-8">
          <div className="flex items-start">
            <div className="w-16 h-16 bg-forest text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">1</div>
            <div>
              <h3 className="text-xl text-forest mb-2 font-playfair font-bold">Connect your tools</h3>
              <p className="text-mediumGray">Integrate with Slack, Teams, and email in minutes. No complex setup required.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-16 h-16 bg-forest text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">2</div>
            <div>
              <h3 className="text-xl text-forest mb-2 font-playfair font-bold">AI learns your patterns</h3>
              <p className="text-mediumGray">Our AI analyzes communication patterns and team dynamics to understand your workflow.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-16 h-16 bg-forest text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">3</div>
            <div>
              <h3 className="text-xl text-forest mb-2 font-playfair font-bold">Smart suggestions & routing</h3>
              <p className="text-mediumGray">Get intelligent recommendations for message timing, channels, and recipients.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-16 h-16 bg-forest text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">4</div>
            <div>
              <h3 className="text-xl text-forest mb-2 font-playfair font-bold">Measure & optimize</h3>
              <p className="text-mediumGray">Track communication effectiveness with detailed analytics and improvement suggestions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Compliance Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
            Trust & compliance
          </h2>
          <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
            Built for organizations that demand the highest standards of security and compliance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-soft text-center">
            <h3 className="text-xl font-semibold text-forest mb-2 font-playfair">ISO 27001 certified</h3>
            <p className="text-foreground text-base font-sans">International standard for information security management systems.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-soft text-center">
            <h3 className="text-xl font-semibold text-forest mb-2 font-playfair">GDPR compliant</h3>
            <p className="text-foreground text-base font-sans">Full compliance with European data protection regulations.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-soft text-center">
            <h3 className="text-xl font-semibold text-forest mb-2 font-playfair">SOC 2 type II</h3>
            <p className="text-foreground text-base font-sans">Service Organization Control 2 compliance for enterprise customers.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-soft text-center">
            <h3 className="text-xl font-semibold text-forest mb-2 font-playfair">Regular audits</h3>
            <p className="text-foreground text-base font-sans">Continuous security monitoring and third-party security assessments.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-forest text-white py-16 lg:py-24 relative overflow-hidden">
        {/* CTA Background Pattern */}
        <EnhancedGeometricPattern className="opacity-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl mb-4 text-white font-playfair font-bold leading-snug">
            {t["cta.title"]}
          </h2>
          <p className="text-lg mb-8 text-white opacity-90 font-sans leading-relaxed">
            {t["cta.description"]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/demo"
              className="bg-white text-forest px-8 py-4 rounded-lg hover:bg-white/90 transition-colors font-medium inline-flex items-center justify-center gap-2 font-sans"
              aria-label="Book a demo of Lyyli.ai"
            >
              {t["cta.button"]}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
              href="/contact"
              className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-forest transition-colors font-medium inline-flex items-center justify-center font-sans"
              aria-label="Contact Lyyli.ai sales team"
            >
              Contact sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
