import { getTranslations } from '../../lib/i18n';

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
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24" role="banner">
        <div className="text-center max-w-4xl mx-auto">
          <div className="caption mb-4 text-muted-turquoise font-medium uppercase tracking-wide">
            {t['hero.tagline']}
          </div>
          <h1 className="heading-1 mb-6">
            {t['hero.headline']}
          </h1>
          <p className="body-large mb-8 text-medium-gray max-w-3xl mx-auto">
            {t['hero.description']}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a 
              href="#cta" 
              className="bg-forest-green text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors font-medium inline-flex items-center justify-center gap-2"
              aria-label="Book a demo of Lyyli.ai"
            >
              {t['hero.ctaPrimary']}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a 
              href="#benefits" 
              className="border border-forest-green text-forest-green px-8 py-4 rounded-lg hover:bg-soft-rose transition-colors font-medium inline-flex items-center justify-center"
              aria-label="Learn more about Lyyli.ai"
            >
              {t['hero.ctaSecondary']}
            </a>
          </div>
          <div className="caption text-medium-gray">
            {t['hero.trustBadge']}
          </div>
        </div>
      </section>

      {/* Problems Section - Buying Triggers */}
      <section className="bg-soft-rose py-16 lg:py-24" id="problems" aria-labelledby="problems-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="problems-heading" className="heading-2 mb-4">
              {t['problems.title']}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <article className="bg-white p-6 rounded-lg shadow-soft">
              <h3 className="heading-4 mb-3 text-forest-green">
                {t['problems.missedCommunications.title']}
              </h3>
              <p className="body-text">
                {t['problems.missedCommunications.description']}
              </p>
            </article>
            <article className="bg-white p-6 rounded-lg shadow-soft">
              <h3 className="heading-4 mb-3 text-forest-green">
                {t['problems.channelOverload.title']}
              </h3>
              <p className="body-text">
                {t['problems.channelOverload.description']}
              </p>
            </article>
            <article className="bg-white p-6 rounded-lg shadow-soft">
              <h3 className="heading-4 mb-3 text-forest-green">
                {t['problems.accountability.title']}
              </h3>
              <p className="body-text">
                {t['problems.accountability.description']}
              </p>
            </article>
            <article className="bg-white p-6 rounded-lg shadow-soft">
              <h3 className="heading-4 mb-3 text-forest-green">
                {t['problems.regulatory.title']}
              </h3>
              <p className="body-text">
                {t['problems.regulatory.description']}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 lg:py-24" aria-labelledby="benefits-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="benefits-heading" className="heading-2 mb-4">
              {t['benefits.title']}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="text-center p-6">
              <div className="w-16 h-16 bg-muted-turquoise rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="heading-4 mb-3">
                {t['benefits.speed.title']}
              </h3>
              <p className="body-text">
                {t['benefits.speed.description']}
              </p>
            </article>
            <article className="text-center p-6">
              <div className="w-16 h-16 bg-muted-turquoise rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="heading-4 mb-3">
                {t['benefits.governance.title']}
              </h3>
              <p className="body-text">
                {t['benefits.governance.description']}
              </p>
            </article>
            <article className="text-center p-6">
              <div className="w-16 h-16 bg-muted-turquoise rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="heading-4 mb-3">
                {t['benefits.multilingual.title']}
              </h3>
              <p className="body-text">
                {t['benefits.multilingual.description']}
              </p>
            </article>
            <article className="text-center p-6">
              <div className="w-16 h-16 bg-muted-turquoise rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="heading-4 mb-3">
                {t['benefits.integration.title']}
              </h3>
              <p className="body-text">
                {t['benefits.integration.description']}
              </p>
            </article>
            <article className="text-center p-6">
              <div className="w-16 h-16 bg-muted-turquoise rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="heading-4 mb-3">
                {t['benefits.analytics.title']}
              </h3>
              <p className="body-text">
                {t['benefits.analytics.description']}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-light-gray py-16 lg:py-24" id="how-it-works" aria-labelledby="how-it-works-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="how-it-works-heading" className="heading-2 mb-4">
              {t['howItWorks.title']}
            </h2>
          </div>
          
          {/* 4-Step Process */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <article className="text-center">
              <div className="w-16 h-16 bg-forest-green text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                1
              </div>
              <h3 className="heading-4 mb-3 text-forest-green">
                {t['howItWorks.step1.title']}
              </h3>
              <p className="body-text">
                {t['howItWorks.step1.description']}
              </p>
            </article>
            <article className="text-center">
              <div className="w-16 h-16 bg-forest-green text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                2
              </div>
              <h3 className="heading-4 mb-3 text-forest-green">
                {t['howItWorks.step2.title']}
              </h3>
              <p className="body-text">
                {t['howItWorks.step2.description']}
              </p>
            </article>
            <article className="text-center">
              <div className="w-16 h-16 bg-forest-green text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                3
              </div>
              <h3 className="heading-4 mb-3 text-forest-green">
                {t['howItWorks.step3.title']}
              </h3>
              <p className="body-text">
                {t['howItWorks.step3.description']}
              </p>
            </article>
            <article className="text-center">
              <div className="w-16 h-16 bg-forest-green text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                4
              </div>
              <h3 className="heading-4 mb-3 text-forest-green">
                {t['howItWorks.step4.title']}
              </h3>
              <p className="body-text">
                {t['howItWorks.step4.description']}
              </p>
            </article>
          </div>

          {/* Alternative: Solution Overview */}
          <div className="max-w-4xl mx-auto text-center bg-white p-8 rounded-lg shadow-soft">
            <h3 className="heading-3 mb-4 text-forest-green">
              {t['howItWorks.overview.title']}
            </h3>
            <p className="body-large text-medium-gray">
              {t['howItWorks.overview.description']}
            </p>
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-16 lg:py-24" id="industries" aria-labelledby="industries-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="industries-heading" className="heading-2 mb-4">
              {t['industries.title']}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="bg-white p-6 rounded-lg shadow-soft border-l-4 border-forest-green">
              <h3 className="heading-4 mb-3 text-forest-green">
                {t['industries.consulting.title']}
              </h3>
              <p className="body-text">
                {t['industries.consulting.description']}
              </p>
            </article>
            <article className="bg-white p-6 rounded-lg shadow-soft border-l-4 border-muted-turquoise">
              <h3 className="heading-4 mb-3 text-forest-green">
                {t['industries.technology.title']}
              </h3>
              <p className="body-text">
                {t['industries.technology.description']}
              </p>
            </article>
            <article className="bg-white p-6 rounded-lg shadow-soft border-l-4 border-forest-green">
              <h3 className="heading-4 mb-3 text-forest-green">
                {t['industries.engineering.title']}
              </h3>
              <p className="body-text">
                {t['industries.engineering.description']}
              </p>
            </article>
            <article className="bg-white p-6 rounded-lg shadow-soft border-l-4 border-muted-turquoise">
              <h3 className="heading-4 mb-3 text-forest-green">
                {t['industries.healthcare.title']}
              </h3>
              <p className="body-text">
                {t['industries.healthcare.description']}
              </p>
            </article>
            <article className="bg-white p-6 rounded-lg shadow-soft border-l-4 border-forest-green">
              <h3 className="heading-4 mb-3 text-forest-green">
                {t['industries.municipal.title']}
              </h3>
              <p className="body-text">
                {t['industries.municipal.description']}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Target Roles Section */}
      <section id="roles" className="bg-soft-rose py-16 lg:py-24" aria-labelledby="roles-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="roles-heading" className="heading-2 mb-4">
              {t['roles.title']}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="bg-white p-6 rounded-lg shadow-soft">
              <h3 className="heading-4 mb-3 text-forest-green">
                {t['roles.operations.title']}
              </h3>
              <p className="body-text">
                {t['roles.operations.description']}
              </p>
            </article>
            <article className="bg-white p-6 rounded-lg shadow-soft">
              <h3 className="heading-4 mb-3 text-forest-green">
                {t['roles.communications.title']}
              </h3>
              <p className="body-text">
                {t['roles.communications.description']}
              </p>
            </article>
            <article className="bg-white p-6 rounded-lg shadow-soft">
              <h3 className="heading-4 mb-3 text-forest-green">
                {t['roles.pmo.title']}
              </h3>
              <p className="body-text">
                {t['roles.pmo.description']}
              </p>
            </article>
            <article className="bg-white p-6 rounded-lg shadow-soft">
              <h3 className="heading-4 mb-3 text-forest-green">
                {t['roles.hr.title']}
              </h3>
              <p className="body-text">
                {t['roles.hr.description']}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24" id="testimonials" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="testimonials-heading" className="heading-2 mb-4">
              {t['testimonials.title']}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <article className="bg-light-gray p-6 rounded-lg">
              <blockquote className="body-text mb-4 italic">
                &ldquo;{t['testimonials.quote1.text']}&rdquo;
              </blockquote>
              <cite className="caption text-forest-green font-medium">
                — {t['testimonials.quote1.author']}
              </cite>
            </article>
            <article className="bg-light-gray p-6 rounded-lg">
              <blockquote className="body-text mb-4 italic">
                &ldquo;{t['testimonials.quote2.text']}&rdquo;
              </blockquote>
              <cite className="caption text-forest-green font-medium">
                — {t['testimonials.quote2.author']}
              </cite>
            </article>
            <article className="bg-light-gray p-6 rounded-lg">
              <blockquote className="body-text mb-4 italic">
                &ldquo;{t['testimonials.quote3.text']}&rdquo;
              </blockquote>
              <cite className="caption text-forest-green font-medium">
                — {t['testimonials.quote3.author']}
              </cite>
            </article>
          </div>
          <p className="text-center small-text text-medium-gray">
            {t['testimonials.disclaimer']}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="bg-forest-green text-white py-16 lg:py-24" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 id="cta-heading" className="heading-2 mb-4 text-white">
            {t['cta.title']}
          </h2>
          <p className="body-large mb-8 text-white opacity-90">
            {t['cta.description']}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`/${locale}/contact`} 
              className="bg-white text-forest-green px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors font-medium inline-flex items-center justify-center gap-2"
              aria-label="Book a demo of Lyyli.ai"
            >
              {t['cta.button']}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </a>
            <a 
              href={`/${locale}/contact`} 
              className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-forest-green transition-colors font-medium inline-flex items-center justify-center"
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