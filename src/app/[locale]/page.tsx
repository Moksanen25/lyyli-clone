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
    <main className="min-h-screen bg-white">
      <div className="relative z-10">
        <section className="container mx-auto px-4 py-20 relative">
          {/* Animated Hero Visual */}
          <HeroVisual />
          
          <h1 className="text-3xl md:text-4xl text-forest text-center mb-8 font-playfair font-normal leading-tight relative z-10">
            {t["hero.headline"]}
          </h1>
          <p className="text-lg text-foreground text-center max-w-3xl mx-auto mb-12 font-sans leading-relaxed relative z-10">
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
          
          {/* Mobile UI Showcase - Removed, now in Stats Section */}
        </section>
      </div>

      {/* Problems Section */}
      <section className="bg-gradient-to-br from-rose/5 to-turquoise/5 container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl text-forest text-center mb-16 font-playfair font-normal leading-snug">
          {t["problems.title"]}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <InteractiveCard>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-rose rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-normal mb-2">{t["problems.missedCommunications.title"]}</h3>
              <p className="text-muted-foreground">{t["problems.missedCommunications.description"]}</p>
            </div>
          </InteractiveCard>
          <InteractiveCard>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-turquoise-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-turquoise-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-normal mb-2">{t["problems.channelOverload.title"]}</h3>
              <p className="text-muted-foreground">{t["problems.channelOverload.description"]}</p>
            </div>
          </InteractiveCard>
          <InteractiveCard>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-normal mb-2">{t["problems.accountability.title"]}</h3>
              <p className="text-muted-foreground">{t["problems.accountability.description"]}</p>
            </div>
          </InteractiveCard>
          <InteractiveCard>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-normal mb-2">{t["problems.regulatory.title"]}</h3>
              <p className="text-muted-foreground">{t["problems.regulatory.description"]}</p>
            </div>
          </InteractiveCard>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-forest/5 to-turquoise/10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-forest font-playfair font-normal leading-snug mb-4">
            {t["stats.title"]}
          </h2>
          <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
            {t["stats.subtitle"]}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left: Enhanced Stats Visual */}
          <div className="flex justify-center">
            <div className="text-center group transition-all duration-1000">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose to-turquoise rounded-full shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-forest mb-3 transition-all duration-300 group-hover:text-turquoise">
                75%
              </div>
              <div className="text-lg text-muted-foreground mb-3 font-medium">{t["stats.fasterResponse"]}</div>
              <div className="text-sm font-medium text-green-600 transition-all duration-300">
                ↗ {t["stats.growing"]}
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
                  className="w-full max-w-[280px] rounded-2xl shadow-soft border border-gray-200 transition-all duration-300 group-hover:scale-105 group-hover:shadow-medium"
                />
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-turquoise/20 to-rose/20 rounded-2xl blur-xl -z-10 group-hover:blur-2xl group-hover:from-turquoise/30 group-hover:to-rose/30 transition-all duration-300" />
              </div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-turquoise to-rose text-white px-6 py-3 rounded-full text-sm font-bold shadow-soft">
                Mobile experience
              </div>
            </div>
          </div>
          
          {/* Right: Additional Performance Metric */}
          <div className="flex justify-center">
            <div className="text-center group transition-all duration-1000">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-forest to-green rounded-full shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-forest mb-3 transition-all duration-300 group-hover:text-green-600">
                99.9%
              </div>
              <div className="text-lg text-muted-foreground mb-3 font-medium">{t["stats.uptimeReliability"]}</div>
              <div className="text-sm font-medium text-green-600 transition-all duration-300">
                ↗ {t["stats.stable"]}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl text-forest text-center mb-16 font-playfair font-normal leading-snug">
          {t["features.title"]}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <FeatureHighlightCard
            title={t["features.speed.title"]}
            description={t["features.speed.description"]}
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
            gradient="from-amber to-orange"
          />
          <FeatureHighlightCard
            title={t["features.clarity.title"]}
            description={t["features.clarity.description"]}
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
            gradient="from-forest to-green"
          />
        </div>
      </section>

      {/* Desktop UI Showcase */}
      <section className="bg-gradient-to-br from-forest/5 to-turquoise/5 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-forest font-playfair font-normal leading-snug mb-4">
            {t["desktop.title"]}
          </h2>
          <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
            {t["desktop.subtitle"]}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
          {/* Desktop UI - Hidden on mobile, shown on desktop */}
          <div className="relative group hidden lg:block">
            <div className="relative">
              <img 
                src="/images/general/Desktop_UI_for_web.png" 
                alt="Lyyli.ai Desktop Interface - AI Communication Assistant" 
                className="w-full max-w-4xl rounded-lg shadow-soft border border-gray-200 transition-all duration-300 group-hover:scale-105 group-hover:shadow-medium"
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-lg blur-xl -z-10 group-hover:blur-2xl transition-all duration-300" />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-forest text-white px-4 py-2 rounded-full text-sm font-medium shadow-soft">
              {t["desktop.experience"]}
            </div>
          </div>
          
          {/* Mobile UI - Shown on mobile, hidden on desktop */}
          <div className="relative group lg:hidden">
            <div className="relative">
              <img 
                src="/images/general/Mobile_UI_for_web.jpeg" 
                alt="Lyyli.ai Mobile Interface - AI Communication Assistant" 
                className="w-full max-w-[300px] rounded-lg shadow-soft border border-gray-200 transition-all duration-300 group-hover:scale-105 group-hover:shadow-medium"
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/15 to-rose/15 rounded-lg blur-lg -z-10 group-hover:blur-xl transition-all duration-300" />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-turquoise text-white px-4 py-2 rounded-full text-sm font-medium shadow-soft">
              Mobile experience
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-grayLight to-rose/10">
        <h2 className="text-3xl md:text-4xl text-forest text-center mb-16 font-playfair font-normal leading-snug">
          {t["benefits.title"]}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <FeatureHighlightCard
            title={t["benefits.speed.title"]}
            description={t["benefits.speed.description"]}
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            gradient="from-turquoise to-blue"
          />
          <FeatureHighlightCard
            title={t["benefits.governance.title"]}
            description={t["benefits.governance.description"]}
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
            gradient="from-forest to-green"
          />
          <FeatureHighlightCard
            title={t["benefits.multilingual.title"]}
            description={t["benefits.multilingual.description"]}
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            gradient="from-rose to-pink"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl text-forest text-center mb-16 font-playfair font-normal leading-snug">
          {t["howItWorks.title"]}
        </h2>
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
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-rose/5 to-grayLight">
        <h2 className="text-3xl md:text-4xl text-forest text-center mb-16 font-playfair font-normal leading-snug">
          {t["testimonials.title"]}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <TestimonialCard
            quote={t["testimonials.quote1.text"]}
            author={t["testimonials.quote1.author"]}
            role="Operations Manager"
            company="TechFlow"
          />
          <TestimonialCard
            quote={t["testimonials.quote2.text"]}
            author={t["testimonials.quote2.author"]}
            role="PMO Director"
            company="Consulting Firm"
          />
          <TestimonialCard
            quote={t["testimonials.quote3.text"]}
            author={t["testimonials.quote3.author"]}
            role="HR Director"
            company="Healthcare Organization"
          />
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8 font-sans">
          {t["testimonials.disclaimer"]}
        </p>
      </section>

      <section id="cta" className="bg-gradient-to-br from-[#2F5D50] to-[#2F5D50]/90 text-white container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl text-white mb-4 font-playfair font-normal leading-snug">
          {t["cta.title"]}
        </h2>
        <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8 font-sans leading-relaxed">
          {t["cta.description"]}
        </p>
        <a href={`/${currentLocale}/waitlist`} className="bg-white text-forest px-8 py-4 rounded-lg hover:bg-white/90 transition-colors font-medium inline-flex items-center justify-center gap-2 font-sans">
          {t["cta.button"]}
        </a>
      </section>
    </main>
  );
}
