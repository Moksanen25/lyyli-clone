import { getTranslations } from '../../../lib/i18n';
import { Metadata } from 'next';
import OriginStory from '../../../components/about/OriginStory';
import MissionVisionValues from '../../../components/about/MissionVisionValues';
import TeamSection from '../../../components/about/TeamSection';
import SubPageVisual from '../../../components/SubPageVisual';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);
  
  return {
    title: t['about.page.title'],
    description: t['about.page.description'],
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(locale) ? locale : 'en';
  
  const t = await getTranslations(currentLocale);

  return (
    <div className="min-h-screen">
      {/* Hero Visual Background */}
      <SubPageVisual />
      
      {/* Hero Section */}
      <div className="relative z-10 pt-32">
        <section 
          className="container mx-auto px-4 py-20 relative overflow-hidden"
          aria-label="Hero"
        >
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl mb-6 text-forest font-playfair font-bold leading-tight">
              {t['about.hero.title']}
            </h1>
            <p className="text-lg mb-12 text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t['about.hero.subtitle']}
            </p>
            {/* Hero CTA buttons following layout rule */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/demo" 
                className="bg-forest text-white px-8 py-4 rounded-lg hover:bg-forest/90 transition-colors font-medium inline-flex items-center justify-center gap-2 font-sans"
                aria-label="Book a demo of Lyyli.ai"
              >
                {t['about.cta.demo']}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </a>
              <a 
                href="/trial" 
                className="border border-forest text-forest px-8 py-4 rounded-lg hover:bg-forest hover:text-white transition-colors font-medium inline-flex items-center justify-center font-sans"
                aria-label="Start free trial of Lyyli.ai"
              >
                {t['about.cta.trial']}
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Origin Story - Why Lyyli Exists */}
      <section className="bg-gradient-to-br from-forest to-forest/80 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <OriginStory translations={t} />
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="bg-gradient-to-br from-rose/5 to-turquoise/5 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <MissionVisionValues translations={t} />
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <TeamSection translations={t} />
        </div>
      </section>

      {/* CTA Section - Following 10-layout rule: ensisijainen CTA */}
      <section className="bg-gradient-to-br from-forest to-turquoise py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-white font-playfair font-bold leading-tight">
            {t['about.cta.title']}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 font-sans leading-relaxed">
            {t['about.cta.description']}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/demo" 
              className="inline-flex items-center px-8 py-4 bg-white text-forest font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-sans"
              aria-label="Book a demo of Lyyli.ai"
            >
              {t['about.cta.demo']}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </a>
            <a 
              href="/trial" 
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-forest transition-all duration-300 hover:-translate-y-1 font-sans"
              aria-label="Start free trial of Lyyli.ai"
            >
              {t['about.cta.trial']}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
