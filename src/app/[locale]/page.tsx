import { getTranslations } from '../../lib/i18n';
import { 
  HeroBackground, 
  SectionBackground, 
  GeometricPattern as AnimatedGeometricPattern 
} from '../../components/AnimatedBackground';
import { 
  FloatingElements, 
  AnimatedWave,
  AICommunicationVisual,
  InteractiveCard,
  StatsVisual,
  FeatureHighlightCard,
  DataVisualization,
  TestimonialCard,
  AnimatedBackgroundPattern
} from '../../components/VisualElements';
import { IconSet } from '../../components/IconSet';

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(locale) ? locale : 'en';
  
  const t = getTranslations(currentLocale);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-16 lg:py-32" role="banner">
        {/* Enhanced Background Visuals */}
        <HeroBackground />
        <AnimatedGeometricPattern className="opacity-20" />
        <FloatingElements />
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="caption mb-6 text-muted-turquoise font-medium uppercase tracking-wide">
            {t['hero.tagline']}
          </div>
          <h1 className="heading-1 mb-8">
            {t['hero.headline']}
          </h1>
          <p className="body-large mb-10 text-medium-gray max-w-4xl mx-auto">
            {t['hero.description']}
          </p>
          
          {/* Enhanced AI Communication Visualization */}
          <div className="mb-12">
            <AICommunicationVisual />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <a 
              href="#cta" 
              className="group bg-forest-green text-white px-10 py-5 rounded-xl hover:bg-opacity-90 transition-all duration-300 font-medium inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              aria-label="Book a demo of Lyyli.ai"
            >
              {t['hero.ctaPrimary']}
              <IconSet.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a 
              href="#benefits" 
              className="group border-2 border-forest-green text-forest-green px-10 py-5 rounded-xl hover:bg-soft-rose hover:border-soft-rose transition-all duration-300 font-medium inline-flex items-center justify-center transform hover:-translate-y-1"
              aria-label="Learn more about Lyyli.ai"
            >
              {t['hero.ctaSecondary']}
            </a>
          </div>
          
          {/* Enhanced Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="caption text-medium-gray">SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="caption text-medium-gray">Enterprise Ready</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="caption text-medium-gray">24/7 Support</span>
            </div>
          </div>
          
          <div className="caption text-medium-gray">
            {t['hero.trustBadge']}
          </div>
        </div>
        
        {/* Enhanced Animated Wave */}
        <AnimatedWave />
      </section>

      {/* Problems Section - Buying Triggers */}
      <section className="relative bg-soft-rose py-20 lg:py-28" id="problems" aria-labelledby="problems-heading">
        {/* Enhanced Background Pattern */}
        <SectionBackground />
        <AnimatedBackgroundPattern />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 id="problems-heading" className="heading-2 mb-6">
              {t['problems.title']}
            </h2>
            <p className="body-large text-medium-gray max-w-3xl mx-auto">
              Identify and solve the communication challenges that are holding your organization back
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <InteractiveCard className="group">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors duration-300">
                  <IconSet.AI className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="heading-4 mb-3 text-forest-green">
                  {t['problems.missedCommunications.title']}
                </h3>
                <p className="body-text">
                  {t['problems.missedCommunications.description']}
                </p>
              </div>
            </InteractiveCard>
            
            <InteractiveCard className="group">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors duration-300">
                  <IconSet.Communication className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="heading-4 mb-3 text-forest-green">
                  {t['problems.channelOverload.title']}
                </h3>
                <p className="body-text">
                  {t['problems.channelOverload.description']}
                </p>
              </div>
            </InteractiveCard>
            
            <InteractiveCard className="group">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors duration-300">
                  <IconSet.Team className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="heading-4 mb-3 text-forest-green">
                  {t['problems.accountability.title']}
                </h3>
                <p className="body-text">
                  {t['problems.accountability.description']}
                </p>
              </div>
            </InteractiveCard>
            
            <InteractiveCard className="group">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                  <IconSet.Compliance className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="heading-4 mb-3 text-forest-green">
                  {t['problems.regulatory.title']}
                </h3>
                <p className="body-text">
                  {t['problems.regulatory.description']}
                </p>
              </div>
            </InteractiveCard>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-forest-green via-forest-green to-muted-turquoise overflow-hidden">
        {/* Enhanced Background Elements */}
        <SectionBackground />
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="20" cy="20" r="15" fill="white" />
            <circle cx="80" cy="80" r="20" fill="white" />
            <circle cx="50" cy="10" r="8" fill="white" />
            <circle cx="10" cy="70" r="12" fill="white" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-2 text-white mb-6">
              Trusted by Leading Organizations
            </h2>
            <p className="body-large text-white/80 max-w-3xl mx-auto">
              Join hundreds of companies that have transformed their communication with Lyyli.ai
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatsVisual
              value="98%"
              label="Customer Satisfaction"
              icon="😊"
              trend="up"
              className="text-white"
            />
            <StatsVisual
              value="3.2x"
              label="Faster Response Time"
              icon="⚡"
              trend="up"
              className="text-white"
            />
            <StatsVisual
              value="24/7"
              label="AI Availability"
              icon="🤖"
              trend="neutral"
              className="text-white"
            />
            <StatsVisual
              value="50+"
              label="Languages Supported"
              icon="🌍"
              trend="up"
              className="text-white"
            />
          </div>
          
          {/* Enhanced Trusted Companies */}
          <div className="mt-16 text-center">
            <p className="text-white/60 mb-8">Trusted by companies like:</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="w-24 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-semibold text-sm">Fortune 500</span>
              </div>
              <div className="w-24 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-semibold text-sm">Tech Giants</span>
              </div>
              <div className="w-24 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-semibold text-sm">Healthcare</span>
              </div>
              <div className="w-24 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-semibold text-sm">Finance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section id="benefits" className="relative py-20 lg:py-28" aria-labelledby="benefits-heading">
        {/* Enhanced Background Pattern */}
        <SectionBackground />
        <AnimatedBackgroundPattern />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 id="benefits-heading" className="heading-2 mb-6">
              {t['benefits.title']}
            </h2>
            <p className="body-large text-medium-gray max-w-3xl mx-auto">
              Experience the transformative power of AI-driven communication
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureHighlightCard 
              icon={<IconSet.Integration className="w-10 h-10 text-yellow-600" />}
              title={t['benefits.speed.title']}
              description={t['benefits.speed.description']}
              className="group text-center"
            />
            
            <FeatureHighlightCard 
              icon={<IconSet.Security className="w-10 h-10 text-blue-600" />}
              title={t['benefits.governance.title']}
              description={t['benefits.governance.description']}
              className="group text-center"
            />
            
            <FeatureHighlightCard 
              icon={<IconSet.Analytics className="w-10 h-10 text-green-600" />}
              title={t['benefits.multilingual.title']}
              description={t['benefits.multilingual.description']}
              className="group text-center"
            />
            
            <FeatureHighlightCard 
              icon={<IconSet.Automation className="w-10 h-10 text-purple-600" />}
              title={t['benefits.integration.title']}
              description={t['benefits.integration.description']}
              className="group text-center"
            />
            
            <FeatureHighlightCard 
              icon={<IconSet.ROI className="w-10 h-10 text-indigo-600" />}
              title={t['benefits.analytics.title']}
              description={t['benefits.analytics.description']}
              className="group text-center"
            />
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden" id="features" aria-labelledby="features-heading">
        {/* Enhanced Background Elements */}
        <SectionBackground />
        <AnimatedBackgroundPattern />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 id="features-heading" className="heading-2 mb-6">
              Powerful Features for Modern Communication
            </h2>
            <p className="body-large text-medium-gray max-w-3xl mx-auto">
              Discover the advanced capabilities that make Lyyli.ai the ultimate AI communication platform
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Feature List */}
            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                  <IconSet.Integration className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="heading-4 mb-2">Real-time AI Processing</h3>
                  <p className="body-text text-medium-gray">Instant response generation with context-aware understanding and natural language processing.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
                  <IconSet.Automation className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="heading-4 mb-2">Multi-channel Integration</h3>
                  <p className="body-text text-medium-gray">Seamlessly connect with email, Slack, Teams, and other communication platforms.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-300">
                  <IconSet.Scalability className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="heading-4 mb-2">Advanced Analytics</h3>
                  <p className="body-text text-medium-gray">Comprehensive insights into communication patterns, response times, and team performance.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-yellow-200 group-hover:to-yellow-300 transition-all duration-300">
                  <IconSet.Security className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="heading-4 mb-2">Enterprise Security</h3>
                  <p className="body-text text-medium-gray">SOC 2 compliance, end-to-end encryption, and granular access controls for enterprise needs.</p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Enhanced Visual */}
            <div className="relative">
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-soft-rose to-muted-turquoise p-8 rounded-2xl shadow-2xl">
                  <div className="text-center">
                    <IconSet.AI className="w-16 h-16 text-forest-green mx-auto mb-4" />
                    <h3 className="heading-4 text-forest-green mb-4">AI-Powered Communication</h3>
                    <p className="body-text text-forest-green mb-6">
                      Experience the future of business communication with our advanced AI technology
                    </p>
                    <div className="flex justify-center space-x-4">
                      <div className="w-3 h-3 bg-forest-green rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-forest-green rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-3 h-3 bg-forest-green rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-muted-turquoise rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-soft-rose rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-forest-green rounded-full opacity-40 animate-ping"></div>
            </div>
          </div>
        </div>
      </section>

      {/* New Data Visualization Section */}
      <section className="relative py-20 lg:py-28 bg-light-gray overflow-hidden" id="data-insights" aria-labelledby="data-insights-heading">
        <SectionBackground />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 id="data-insights-heading" className="heading-2 mb-6">
              Data-Driven Insights
            </h2>
            <p className="body-large text-medium-gray max-w-3xl mx-auto">
              Transform your communication data into actionable insights
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="heading-3 mb-6">Communication Analytics Dashboard</h3>
              <p className="body-large text-medium-gray mb-8">
                Get real-time visibility into your team's communication patterns, response times, and engagement metrics.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <IconSet.Analytics className="w-6 h-6 text-muted-turquoise" />
                  <span className="body-text">Response time tracking</span>
                </div>
                <div className="flex items-center gap-4">
                  <IconSet.ROI className="w-6 h-6 text-soft-rose" />
                  <span className="body-text">ROI measurement</span>
                </div>
                <div className="flex items-center gap-4">
                  <IconSet.Enterprise className="w-6 h-6 text-forest-green" />
                  <span className="body-text">Enterprise reporting</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <DataVisualization 
                data={[
                  { label: 'Email', value: 45, color: 'from-forest-green to-muted-turquoise' },
                  { label: 'Slack', value: 30, color: 'from-soft-rose to-muted-turquoise' },
                  { label: 'Teams', value: 15, color: 'from-muted-turquoise to-forest-green' },
                  { label: 'Other', value: 10, color: 'from-soft-rose to-forest-green' }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-16 lg:py-24 bg-white" id="testimonials" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="testimonials-heading" className="heading-2 mb-4">
              {t['testimonials.title']}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <TestimonialCard
              quote={t['testimonials.quote1.text']}
              author={t['testimonials.quote1.author']}
              role="CEO"
              rating={5}
              company="Tech Solutions Inc."
            />
            <TestimonialCard
              quote={t['testimonials.quote2.text']}
              author={t['testimonials.quote2.author']}
              role="CTO"
              rating={5}
              company="Healthcare Systems"
            />
            <TestimonialCard
              quote={t['testimonials.quote3.text']}
              author={t['testimonials.quote3.author']}
              role="VP of Operations"
              rating={5}
              company="Financial Services Co."
            />
          </div>
          <p className="text-center small-text text-medium-gray">
            {t['testimonials.disclaimer']}
          </p>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section id="cta" className="bg-forest-green text-white py-16 lg:py-24 relative overflow-hidden" aria-labelledby="cta-heading">
        <SectionBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-forest-green via-forest-green to-muted-turquoise opacity-90"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 id="cta-heading" className="heading-2 mb-4 text-white">
            {t['cta.title']}
          </h2>
          <p className="body-large mb-8 text-white opacity-90">
            {t['cta.description']}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`/${locale}/contact`} 
              className="bg-white text-forest-green px-8 py-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 font-medium inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              aria-label="Book a demo of Lyyli.ai"
            >
              {t['cta.button']}
              <IconSet.ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href={`/${locale}/contact`} 
              className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-forest-green transition-all duration-300 font-medium inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              aria-label="Contact Lyyli.ai sales team"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}