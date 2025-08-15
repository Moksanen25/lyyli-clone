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
      {/* Hero Section - Unchanged as requested */}
      <div className="relative z-10">
        <section className="container mx-auto px-4 py-20 relative">
          {/* Animated Hero Visual */}
          <HeroVisual />
          
          <h1 className="text-3xl md:text-4xl text-forest dark:text-white text-center mb-8 font-playfair font-normal leading-tight relative z-10">
            {t["hero.headline"]}
          </h1>
          <p className="text-lg text-foreground dark:text-white text-center max-w-3xl mx-auto mb-12 font-sans leading-relaxed relative z-10">
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
          <div className="text-center text-muted-foreground text-sm font-sans relative z-10 mb-8">
            {t["hero.trustBadge"]}
          </div>
        </section>
      </div>

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
              <p className="text-mediumGray dark:text-white text-center font-sans leading-relaxed">
                {t["problems.channelOverload.description"]}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-600 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-forest/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest dark:text-white mb-4 text-center font-sans">
                {t["problems.accountability.title"]}
              </h3>
              <p className="text-mediumGray dark:text-white text-center font-sans leading-relaxed">
                {t["problems.accountability.description"]}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-600 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-amber/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest dark:text-white mb-4 text-center font-sans">
                {t["problems.regulatory.title"]}
              </h3>
              <p className="text-mediumGray dark:text-white text-center font-sans leading-relaxed">
                {t["problems.regulatory.description"]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section - Unified design with better contrast */}
      <section className="bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-forest dark:text-white mb-6 font-playfair font-normal leading-tight">
              Why professional service organizations choose Lyyli
            </h2>
            <p className="text-xl text-mediumGray dark:text-white max-w-3xl mx-auto font-sans leading-relaxed">
              Transform your internal communications with AI-powered efficiency, enterprise security, and seamless multilingual support.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Left: Communication Efficiency */}
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-600 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-rose to-turquoise rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-forest dark:text-white font-sans">Communication Efficiency</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-mediumGray dark:text-white font-sans">75% faster message delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-mediumGray dark:text-white font-sans">60% reduction in search time</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-mediumGray dark:text-white font-sans">Automated priority routing</span>
                </div>
              </div>
            </div>
            
            {/* Center: Mobile UI Showcase */}
            <div className="flex justify-center">
              <div className="relative group">
                <div className="relative">
                  <img 
                    src="/images/general/Mobile_UI_for_web.jpeg" 
                    alt="Lyyli.ai Mobile Interface - AI Communication Assistant" 
                    className="w-full max-w-[280px] rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-turquoise/20 to-rose/20 rounded-2xl blur-xl -z-10 group-hover:blur-2xl group-hover:from-turquoise/30 group-hover:to-rose/30 transition-all duration-300" />
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-turquoise to-rose text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                  Mobile experience
                </div>
              </div>
            </div>
            
            {/* Right: Enterprise Security */}
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-600 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-forest to-green rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-forest dark:text-white font-sans">Enterprise Security</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-mediumGray dark:text-white font-sans">GDPR compliant</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-mediumGray dark:text-white font-sans">AES-256 encryption</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-mediumGray dark:text-white font-sans">Complete audit trails</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Consistent card design */}
      <section className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-forest mb-6 font-playfair font-normal leading-tight">
              {t["features.title"]}
            </h2>
            <p className="text-xl text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              Core features that make Lyyli the ideal communication solution for professional service organizations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-amber to-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest mb-4 text-center font-sans">
                {t["features.speed.title"]}
              </h3>
              <p className="text-mediumGray text-center font-sans leading-relaxed">
                {t["features.speed.description"]}
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-forest to-green rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest mb-4 text-center font-sans">
                {t["features.clarity.title"]}
              </h3>
              <p className="text-mediumGray text-center font-sans leading-relaxed">
                {t["features.clarity.description"]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop UI Showcase - Cleaner background */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-forest mb-6 font-playfair font-normal leading-tight">
              {t["desktop.title"]}
            </h2>
            <p className="text-xl text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t["desktop.subtitle"]}
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
            {/* Desktop UI - Hidden on mobile, shown on desktop */}
            <div className="relative group hidden lg:block">
              <div className="relative">
                <img 
                  src="/images/general/Desktop_UI_for_web.png" 
                  alt="Lyyli.ai Desktop Interface - AI Communication Assistant" 
                  className="w-full max-w-4xl rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-2xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-300" />
              </div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-forest text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                {t["desktop.experience"]}
              </div>
            </div>
            
            {/* Mobile UI - Shown on mobile, hidden on desktop */}
            <div className="relative group lg:hidden">
              <div className="relative">
                <img 
                  src="/images/general/Mobile_UI_for_web.jpeg" 
                  alt="Lyyli.ai Mobile Interface - AI Communication Assistant" 
                  className="w-full max-w-[300px] rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-turquoise/15 to-rose/15 rounded-2xl blur-lg -z-10 group-hover:blur-xl transition-all duration-300" />
              </div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-turquoise text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                Mobile experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Consistent styling */}
      <section className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-forest mb-6 font-playfair font-normal leading-tight">
              {t["benefits.title"]}
            </h2>
            <p className="text-xl text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              Measurable benefits that drive real business value
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-turquoise to-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest mb-4 text-center font-sans">
                {t["benefits.speed.title"]}
              </h3>
              <p className="text-mediumGray text-center font-sans leading-relaxed">
                {t["benefits.speed.description"]}
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-forest to-green rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest mb-4 text-center font-sans">
                {t["benefits.governance.title"]}
              </h3>
              <p className="text-mediumGray text-center font-sans leading-relaxed">
                {t["benefits.governance.description"]}
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-rose to-pink rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest mb-4 text-center font-sans">
                {t["benefits.multilingual.title"]}
              </h3>
              <p className="text-mediumGray text-center font-sans leading-relaxed">
                {t["benefits.multilingual.description"]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Clean background */}
      <section id="how-it-works" className="bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-forest mb-6 font-playfair font-normal leading-tight">
              {t["howItWorks.title"]}
            </h2>
            <p className="text-xl text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              Simple steps to transform your team's communication
            </p>
          </div>
          
          <AnimatedTimeline
            steps={[
              {
                title: t["howItWorks.step1.title"],
                description: t["howItWorks.step1.description"],
              },
              {
                title: t["howItWorks.step2.title"],
                description: t["howItWorks.step2.description"],
              },
              {
                title: t["howItWorks.step3.title"],
                description: t["howItWorks.step3.description"],
              },
              {
                title: t["howItWorks.step4.title"],
                description: t["howItWorks.step4.description"],
              },
            ]}
          />
        </div>
      </section>

      {/* Testimonials Section - Consistent styling */}
      <section className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-forest mb-6 font-playfair font-normal leading-tight">
              {t["testimonials.title"]}
            </h2>
            <p className="text-xl text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              Real results from professional service organizations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6">
                <svg className="w-12 h-12 text-forest/20 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p className="text-mediumGray text-center font-sans leading-relaxed mb-6 italic">
                "{t["testimonials.quote1.text"]}"
              </p>
              <div className="text-center">
                <p className="font-bold text-forest font-sans">{t["testimonials.quote1.author"]}</p>
                <p className="text-sm text-mediumGray font-sans">Operations Manager, TechFlow</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6">
                <svg className="w-12 h-12 text-forest/20 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p className="text-mediumGray text-center font-sans leading-relaxed mb-6 italic">
                "{t["testimonials.quote2.text"]}"
              </p>
              <div className="text-center">
                <p className="font-bold text-forest font-sans">{t["testimonials.quote2.author"]}</p>
                <p className="text-sm text-mediumGray font-sans">PMO Director, Consulting Firm</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6">
                <svg className="w-12 h-12 text-forest/20 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p className="text-mediumGray text-center font-sans leading-relaxed mb-6 italic">
                "{t["testimonials.quote3.text"]}"
              </p>
              <div className="text-center">
                <p className="font-bold text-forest font-sans">{t["testimonials.quote3.author"]}</p>
                <p className="text-sm text-mediumGray font-sans">HR Director, Healthcare Organization</p>
              </div>
            </div>
          </div>
          
          <p className="text-center text-sm text-mediumGray mt-12 font-sans">
            {t["testimonials.disclaimer"]}
          </p>
        </div>
      </section>

      {/* CTA Section - Strong contrast */}
      <section id="cta" className="bg-forest text-white border-t border-forest/20">
        <div className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-6 font-playfair font-normal leading-tight">
            {t["cta.title"]}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 font-sans leading-relaxed">
            {t["cta.description"]}
          </p>
          <a 
            href={`/${currentLocale}/waitlist`} 
            className="bg-white text-forest px-10 py-4 rounded-xl hover:bg-white/90 transition-all duration-300 font-bold text-lg inline-flex items-center justify-center gap-3 font-sans hover:shadow-xl hover:-translate-y-1"
          >
            {t["cta.button"]}
          </a>
        </div>
      </section>
    </main>
  );
}
