import { getTranslations } from '../../../lib/i18n';
import { Metadata } from 'next';
import OriginStory from '../../../components/about/OriginStory';
import MissionVisionValues from '../../../components/about/MissionVisionValues';
import TeamSection from '../../../components/about/TeamSection';
import SubPageVisual from '../../../components/SubPageVisual';
import CalendarPopup from '../../../components/CalendarPopup';
import { generatePageCanonicalUrl, generateHreflangMetadata } from '../../../lib/canonical';
import { buildTitleFromTranslation } from '../../../lib/title';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);
  
  return {
    title: buildTitleFromTranslation(t['about.page.title'], 'About'),
    description: t['about.page.description'],
    openGraph: {
      title: t['about.page.title'],
      description: t['about.page.description'],
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(t['about.page.title'])}&description=${encodeURIComponent(t['about.page.description'])}`,
          width: 1200,
          height: 630,
          alt: t['about.page.title']
        }
      ],
      type: 'website'
    },
    alternates: {
      canonical: generatePageCanonicalUrl('about', locale),
      languages: generateHreflangMetadata('/about', ['en', 'fi']),
    },
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
            <p className="text-lg hero-description text-center max-w-3xl mx-auto mb-12 font-sans leading-relaxed">
              {t['about.hero.subtitle']}
            </p>
            {/* Hero CTA buttons following layout rule */}
            <div className="flex justify-center gap-4 mb-0">
              <a href="https://app.lyyli.ai" className="btn-primary" aria-label="Book a demo of Lyyli.ai">
                {t['about.cta.demo']}
              </a>
              <a href="https://app.lyyli.ai" className="btn-secondary" aria-label="Start free trial of Lyyli.ai">
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
      <section className="py-16 lg:py-24">
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
            <CalendarPopup 
              className="btn-secondary" 
              aria-label="Book a demo of Lyyli.ai"
              translations={{
                title: t["calendar.title"],
                subtitle: t["calendar.subtitle"],
                description: t["calendar.description"],
                loading: t["calendar.loading"],
                errorTitle: t["calendar.error.title"],
                errorDescription: t["calendar.error.description"],
                errorButton: t["calendar.error.button"],
                footerSecure: t["calendar.footer.secure"],
                footerContact: t["calendar.footer.contact"]
              }}
            >
              {t['about.cta.demo']}
            </CalendarPopup>
            <a href="https://app.lyyli.ai" className="btn-primary" aria-label="Start free trial of Lyyli.ai">
              {t['about.cta.trial']}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
