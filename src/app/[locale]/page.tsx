import { getTranslations } from '../../lib/i18n';
import {
  HeroBackground,
  SectionBackground,
  BackgroundGeometricPattern
} from '../../components/AnimatedBackground';
import {
  FloatingElements,
  AnimatedWave
} from '../../components/VisualElements';
import {
  AICommunicationVisual,
  InteractiveCard,
  StatsVisual,
  FeatureHighlightCard,
  DataVisualization,
  TestimonialCard,
  VisualAnimatedBackgroundPattern
} from '../../components/VisualElements';
import { IconSet } from '../../components/IconSet';

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(locale) ? locale : 'en';
  const t = await getTranslations(currentLocale);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <HeroBackground />
      <SectionBackground />
      <BackgroundGeometricPattern className="opacity-20" />
      <FloatingElements />
      <AnimatedWave />
      <AICommunicationVisual />
      <DataVisualization 
        data={[
          { label: 'AI Communication', value: 85, color: 'muted-turquoise' },
          { label: 'Team Efficiency', value: 92, color: 'forest-green' },
          { label: 'Customer Satisfaction', value: 78, color: 'soft-rose' }
        ]}
      />
      <InteractiveCard>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive Feature</h3>
          <p className="text-gray-600">This card demonstrates interactive hover effects and smooth animations.</p>
        </div>
      </InteractiveCard>
      <div className="relative z-10">
        <section className="container mx-auto px-4 py-20">
          <h1 className="heading-1 text-white text-center mb-8">
            {t['hero.headline']}
          </h1>
          <p className="body-large text-light-gray text-center max-w-3xl mx-auto mb-12">
            {t['hero.description']}
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <a href="#cta" className="btn-primary">
              {t['hero.ctaPrimary']}
            </a>
            <a href="#how-it-works" className="btn-secondary">
              {t['hero.ctaSecondary']}
            </a>
          </div>
          <div className="text-center text-medium-gray body-small">
            {t['hero.trustBadge']}
          </div>
        </section>
      </div>
      <SectionBackground />
      <section id="problems" className="container mx-auto px-4 py-20">
        <h2 className="heading-2 text-white text-center mb-12">
          {t['problems.title']}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <InteractiveCard>
            <div className="text-center">
              <IconSet.Email className="w-8 h-8 text-forest-green mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t['problems.missedCommunications.title']}</h3>
              <p className="text-light-gray">{t['problems.missedCommunications.description']}</p>
            </div>
          </InteractiveCard>
          <InteractiveCard>
            <div className="text-center">
              <IconSet.Communication className="w-8 h-8 text-forest-green mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t['problems.channelOverload.title']}</h3>
              <p className="text-light-gray">{t['problems.channelOverload.description']}</p>
            </div>
          </InteractiveCard>
          <InteractiveCard>
            <div className="text-center">
              <IconSet.Check className="w-8 h-8 text-forest-green mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t['problems.accountability.title']}</h3>
              <p className="text-light-gray">{t['problems.accountability.description']}</p>
            </div>
          </InteractiveCard>
          <InteractiveCard>
            <div className="text-center">
              <IconSet.Compliance className="w-8 h-8 text-forest-green mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t['problems.regulatory.title']}</h3>
              <p className="text-light-gray">{t['problems.regulatory.description']}</p>
            </div>
          </InteractiveCard>
        </div>
      </section>
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="heading-2 text-white text-center mb-12">
          {t['features.title']}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <FeatureHighlightCard
            icon={<IconSet.Automation className="w-8 h-8 text-forest-green" />}
            title={t['features.speed.title']}
            description={t['features.speed.description']}
          />
          <FeatureHighlightCard
            icon={<IconSet.AI className="w-8 h-8 text-forest-green" />}
            title={t['features.clarity.title']}
            description={t['features.clarity.description']}
          />
        </div>
      </section>
      <AnimatedWave />
      <section id="benefits" className="container mx-auto px-4 py-20">
        <h2 className="heading-2 text-white text-center mb-12">
          {t['benefits.title']}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureHighlightCard
            icon={<IconSet.Communication className="w-8 h-8 text-forest-green" />}
            title={t['benefits.speed.title']}
            description={t['benefits.speed.description']}
          />
          <FeatureHighlightCard
            icon={<IconSet.Security className="w-8 h-8 text-forest-green" />}
            title={t['benefits.governance.title']}
            description={t['benefits.governance.description']}
          />
          <FeatureHighlightCard
            icon={<IconSet.Integration className="w-8 h-8 text-forest-green" />}
            title={t['benefits.multilingual.title']}
            description={t['benefits.multilingual.description']}
          />
          <FeatureHighlightCard
            icon={<IconSet.Integration className="w-8 h-8 text-forest-green" />}
            title={t['benefits.integration.title']}
            description={t['benefits.integration.description']}
          />
          <FeatureHighlightCard
            icon={<IconSet.Analytics className="w-8 h-8 text-forest-green" />}
            title={t['benefits.analytics.title']}
            description={t['benefits.analytics.description']}
          />
        </div>
      </section>
      <AICommunicationVisual />
      <section id="roles" className="container mx-auto px-4 py-20">
        <h2 className="heading-2 text-white text-center mb-12">
          {t['roles.title']}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <InteractiveCard>
            <div className="text-center">
              <IconSet.Automation className="w-8 h-8 text-forest-green mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t['roles.operations.title']}</h3>
              <p className="text-light-gray">{t['roles.operations.description']}</p>
            </div>
          </InteractiveCard>
          <InteractiveCard>
            <div className="text-center">
              <IconSet.Communication className="w-8 h-8 text-forest-green mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t['roles.communications.title']}</h3>
              <p className="text-light-gray">{t['roles.communications.description']}</p>
            </div>
          </InteractiveCard>
          <InteractiveCard>
            <div className="text-center">
              <IconSet.Enterprise className="w-8 h-8 text-forest-green mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t['roles.pmo.title']}</h3>
              <p className="text-light-gray">{t['roles.pmo.description']}</p>
            </div>
          </InteractiveCard>
          <InteractiveCard>
            <div className="text-center">
              <IconSet.Team className="w-8 h-8 text-forest-green mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t['roles.hr.title']}</h3>
              <p className="text-light-gray">{t['roles.hr.description']}</p>
            </div>
          </InteractiveCard>
        </div>
      </section>
      <StatsVisual 
        value="95%"
        label="Customer Satisfaction"
        icon={<IconSet.Check className="w-6 h-6 text-forest-green" />}
        trend="up"
      />
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <h2 className="heading-2 text-white text-center mb-12">
          {t['howItWorks.title']}
        </h2>
        <AnimatedTimeline
          steps={[
            {
              title: t['howItWorks.step1.title'],
              description: t['howItWorks.step1.description'],
              icon: <IconSet.Integration className="w-6 h-6 text-forest-green" />,
            },
            {
              title: t['howItWorks.step2.title'],
              description: t['howItWorks.step2.description'],
              icon: <IconSet.AI className="w-6 h-6 text-forest-green" />,
            },
            {
              title: t['howItWorks.step3.title'],
              description: t['howItWorks.step3.description'],
              icon: <IconSet.Automation className="w-6 h-6 text-forest-green" />,
            },
            {
              title: t['howItWorks.step4.title'],
              description: t['howItWorks.step4.description'],
              icon: <IconSet.Analytics className="w-6 h-6 text-forest-green" />,
            },
          ]}
        />
        <div className="mt-16 text-center">
          <h3 className="heading-3 text-white mb-4">
            {t['howItWorks.overview.title']}
          </h3>
          <p className="body-text text-light-gray max-w-2xl mx-auto">
            {t['howItWorks.overview.description']}
          </p>
        </div>
      </section>
      <section id="industries" className="container mx-auto px-4 py-20">
        <h2 className="heading-2 text-white text-center mb-12">
          {t['industries.title']}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <InteractiveCard>
            <div className="text-center">
              <IconSet.Enterprise className="w-8 h-8 text-forest-green mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t['industries.consulting.title']}</h3>
              <p className="text-light-gray">{t['industries.consulting.description']}</p>
            </div>
          </InteractiveCard>
          <InteractiveCard>
            <div className="text-center">
              <IconSet.AI className="w-8 h-8 text-forest-green mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t['industries.technology.title']}</h3>
              <p className="text-light-gray">{t['industries.technology.description']}</p>
            </div>
          </InteractiveCard>
          <InteractiveCard>
            <div className="text-center">
              <IconSet.Scalability className="w-8 h-8 text-forest-green mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t['industries.engineering.title']}</h3>
              <p className="text-light-gray">{t['industries.engineering.description']}</p>
            </div>
          </InteractiveCard>
          <InteractiveCard>
            <div className="text-center">
              <IconSet.Security className="w-8 h-8 text-forest-green mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t['industries.healthcare.title']}</h3>
              <p className="text-light-gray">{t['industries.healthcare.description']}</p>
            </div>
          </InteractiveCard>
          <InteractiveCard>
            <div className="text-center">
              <IconSet.Enterprise className="w-8 h-8 text-forest-green mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{t['industries.municipal.title']}</h3>
              <p className="text-light-gray">{t['industries.municipal.description']}</p>
            </div>
          </InteractiveCard>
        </div>
      </section>
      <TestimonialCard 
        quote="This platform has revolutionized how we handle internal communications. The AI suggestions are incredibly accurate and save us hours every week."
        author="Sarah Johnson"
        role="Head of Operations"
        company="TechCorp Solutions"
        rating={5}
      />
      <VisualAnimatedBackgroundPattern />
      <section id="cta" className="container mx-auto px-4 py-20 text-center">
        <h2 className="heading-2 text-white mb-4">
          {t['cta.title']}
        </h2>
        <p className="body-large text-light-gray max-w-3xl mx-auto mb-8">
          {t['cta.description']}
        </p>
        <a href="/en/contact" className="btn-primary">
          {t['cta.button']}
        </a>
      </section>
    </main>
  );
}