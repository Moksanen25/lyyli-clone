import { getTranslations } from "@/lib/i18n";
import { Metadata } from "next";
import FeaturesCardLayout from "@/components/features/FeaturesCardLayout";
import IntegrationsFlow from "@/components/features/IntegrationsFlow";
import FAQSection from "@/components/faq/FAQSection";
import FeatureSectionNav from "@/components/features/FeatureSectionNav";
import { generatePageCanonicalUrl, generateHreflangMetadata } from "@/lib/canonical";
import { buildTitleFromTranslation } from "@/lib/title";

interface FeaturesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: FeaturesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

  const sectionDescriptions = {
    en: {
      'ai-automation': 'AI-powered communication automation with seamless integration, voice learning, and proactive messaging for professional service companies.',
      'governance-compliance': 'Complete governance and compliance features including audit trails, version control, and role-based access controls.',
      'security-gdpr': 'Enterprise-grade security with AES-256 encryption, ISO 27001 readiness, and full GDPR compliance for data protection.',
      'multilingual': 'Multilingual support with real-time translation, cultural adaptation, and multiple locale support for global organizations.',
      'integrations': 'Seamless integrations with Outlook, Gmail, Slack, Microsoft Teams, and other business communication tools.',
      'upcoming': 'Upcoming features including campaign mode, advanced AI analytics, media library, and automated KPI reporting.'
    },
    fi: {
      'ai-automation': 'AI-avusteinen viestintäautomaatio saumattomalla integraatiolla, äänen oppimisella ja proaktiivisella viestinnällä asiantuntijaorganisaatioille.',
      'governance-compliance': 'Kattavat hallinta- ja compliance-ominaisuudet mukaan lukien auditointi, versiointi ja käyttöoikeuksien hallinta.',
      'security-gdpr': 'Yritystason tietoturva AES-256 salauksella, ISO 27001 valmius ja täysi GDPR-yhteensopivuus tietosuojaa varten.',
      'multilingual': 'Monikielinen tuki reaaliaikaisella kääntämisellä, kulttuurisella mukautumisella ja useilla kielillä globaaleille organisaatioille.',
      'integrations': 'Saumattomat integraatiot Outlook, Gmail, Slack, Microsoft Teams ja muihin liiketoimintaviestintätyökaluihin.',
      'upcoming': 'Tulevat ominaisuudet mukaan lukien kampanjatila, kehittyneet AI-analytiikat, mediatietokanta ja automaattiset KPI-raportit.'
    }
  };

  const localeKey = locale as 'en' | 'fi';
  const descriptions = sectionDescriptions[localeKey] || sectionDescriptions.en;

  return {
    title: buildTitleFromTranslation(t["features.page.title"], "Features"),
    description: t["features.page.description"],
    keywords: [
      localeKey === 'fi' ? 'AI viestintä, automaatio, tietoturva, GDPR, integraatiot' : 'AI communication, automation, security, GDPR, integrations',
      localeKey === 'fi' ? 'asiantuntijaorganisaatiot, viestintätyökalut' : 'professional services, communication tools',
      localeKey === 'fi' ? 'Outlook integraatio, Slack, Teams' : 'Outlook integration, Slack, Teams'
    ].join(', '),
    openGraph: {
      title: t["features.page.title"],
      description: t["features.page.description"],
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(t["features.page.title"])}&description=${encodeURIComponent(t["features.page.description"])}`,
          width: 1200,
          height: 630,
          alt: t["features.page.title"],
        },
      ],
      type: 'website',
    },
    alternates: {
      canonical: generatePageCanonicalUrl('features', locale),
      languages: generateHreflangMetadata('/features', ['en', 'fi']),
    },
  };
}

export default async function FeaturesPage({ params }: FeaturesPageProps) {
  const { locale } = await params;
  const supportedLocales = ["en", "fi"];
  const currentLocale = supportedLocales.includes(locale) ? locale : "en";

  const t = await getTranslations(currentLocale);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative z-10 pt-32">
        <section 
          className="container mx-auto px-4 py-20 relative overflow-hidden"
          aria-label="Hero"
        >
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl mb-6 font-playfair font-bold leading-tight text-forest">
              {t["features.hero.title"]}
            </h1>
            <p className="text-lg mb-8 text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t["features.hero.subtitle"]}
            </p>
          </div>
        </section>
      </div>

      {/* Feature Section Navigation */}
      <FeatureSectionNav locale={currentLocale} translations={t} />

      {/* Removed UI visualization section (desktop and mobile images) */}

      {/* Removed "How Lyyli works" and results sections */}

      {/* Features Grid */}
      <section className="bg-gradient-to-br from-forest/5 to-turquoise/5 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <FeaturesCardLayout locale={currentLocale} translations={t} />
        </div>
      </section>

      {/* Upcoming features */}
      <section id="upcoming" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
              {t["features.upcoming.title"]}
            </h2>
            <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t["features.upcoming.subtitle"]}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { key: "campaignMode", gradient: "from-rose to-forest", icon: "M4 6h16M4 12h12M4 18h8" },
              { key: "advancedAIAnalytics", gradient: "from-forest to-rose", icon: "M4 19h16M6 16v-6m4 6v-4m4 4V7m4 9v-8" },
              { key: "mediaLibrary", gradient: "from-turquoise to-rose", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
              { key: "kpiReports", gradient: "from-forest to-turquoise", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
              { key: "brandedTemplates", gradient: "from-turquoise to-rose", icon: "M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z" },
            ].map((item, idx) => (
              <article key={idx} className="group">
                <div className="bg-gradient-to-br from-grayLight to-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl mb-3 text-forest font-playfair font-bold leading-normal">
                    {t[`features.grid.${item.key}.title`]}
                  </h3>
                  <p className="text-mediumGray text-base font-sans leading-relaxed">
                    {t[`features.grid.${item.key}.description`]}
                  </p>
                  <div className="absolute top-4 right-4">
                    <div className="px-2 py-1 text-xs rounded-full font-semibold bg-forest/90 text-white shadow-md">{t["common.comingSoon"]}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {/* Related Sections */}
          <div className="mt-12 text-center">
            <p className="text-sm text-mediumGray mb-4">
              {currentLocale === 'fi' ? 'Katso myös:' : 'See also:'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#ai-automation" 
                className="text-sm text-forest hover:text-forest/80 transition-colors underline"
              >
                {currentLocale === 'fi' ? 'AI-automaatio' : 'AI Automation'}
              </a>
              <a 
                href="#integrations" 
                className="text-sm text-forest hover:text-forest/80 transition-colors underline"
              >
                {currentLocale === 'fi' ? 'Integraatiot' : 'Integrations'}
              </a>
              <a 
                href="#security-gdpr" 
                className="text-sm text-forest hover:text-forest/80 transition-colors underline"
              >
                {currentLocale === 'fi' ? 'Tietoturva & GDPR' : 'Security & GDPR'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="bg-gradient-to-br from-forest/5 to-turquoise/5 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
              {t["features.integrationsFlow.title"]}
            </h2>
            <p className="text-lg text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t["features.integrationsFlow.description"]}
            </p>
          </div>
          <IntegrationsFlow translations={t} />
          
          {/* Related Sections */}
          <div className="mt-12 text-center">
            <p className="text-sm text-mediumGray mb-4">
              {currentLocale === 'fi' ? 'Katso myös:' : 'See also:'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#ai-automation" 
                className="text-sm text-forest hover:text-forest/80 transition-colors underline"
              >
                {currentLocale === 'fi' ? 'AI-automaatio' : 'AI Automation'}
              </a>
              <a 
                href="#multilingual" 
                className="text-sm text-forest hover:text-forest/80 transition-colors underline"
              >
                {currentLocale === 'fi' ? 'Monikielisyys' : 'Multilingual'}
              </a>
              <a 
                href="#upcoming" 
                className="text-sm text-forest hover:text-forest/80 transition-colors underline"
              >
                {currentLocale === 'fi' ? 'Tulevat ominaisuudet' : 'Upcoming Features'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        faqs={[
          {
            id: "what-is-lyyli",
            question: currentLocale === "fi" ? "Mikä Lyyli.ai on?" : "What is Lyyli.ai?",
            answer: currentLocale === "fi" 
              ? "Lyyli.ai on tekoälyavusteinen viestintäassistentti, joka auttaa sinua ja tiimiäsi kirjoittamaan paremmin ja nopeammin. Lyyli oppii organisaatiosi brändiäänen ja yhdistää sen henkilökohtaiseen kirjoitustyylisi, joten viestisi kuulostavat aina sinulta – vain paremmalta versiolta."
              : "Lyyli.ai is an AI-assisted communication assistant that helps you and your team write better and faster. Lyyli learns your organization's brand voice and combines it with your personal writing style, so your messages always sound like you – just a better version."
          },
          {
            id: "who-is-it-for",
            question: currentLocale === "fi" ? "Kenelle Lyyli.ai on tarkoitettu?" : "Who is Lyyli.ai for?",
            answer: currentLocale === "fi"
              ? "Lyyli sopii erityisesti asiantuntija- ja projektiorganisaatioille, joissa viestintä on tärkeä osa päivittäistä työtä. Palvelu on suunniteltu viestintäammattilaisille, projektijohtajille, myyntitiimeille ja kaikille, jotka haluavat viestiä selkeämmin ja tehokkaammin."
              : "Lyyli is especially suited for professional service and project organizations where communication is an important part of daily work. The service is designed for communication professionals, project managers, sales teams, and anyone who wants to communicate more clearly and effectively."
          },
          {
            id: "difference-from-chatgpt",
            question: currentLocale === "fi" ? "Miten Lyyli.ai eroaa ChatGPT:stä tai muista tekoälytyökaluista?" : "How does Lyyli.ai differ from ChatGPT or other AI tools?",
            answer: currentLocale === "fi"
              ? "ChatGPT tuottaa geneeristä tekstiä, joka kuulostaa usein koneelta ja vaatii paljon muokkausta. Lyyli.ai sen sijaan oppii juuri sinun organisaatiosi tavan viestiä ja yhdistää sen henkilökohtaiseen ääneesi. Tulos on aitoa, suuhun sopivaa tekstiä, joka ei vaadi tuntien hiomista. Lisäksi Lyyli integroituu suoraan työkaluihisi kuten Outlookiin, Gmailiin, Teamsiin ja Slackiin."
              : "ChatGPT produces generic text that often sounds robotic and requires a lot of editing. Lyyli.ai, on the other hand, learns your organization's specific way of communicating and combines it with your personal voice. The result is authentic, natural-sounding text that doesn't require hours of refinement. Additionally, Lyyli integrates directly with your tools like Outlook, Gmail, Teams, and Slack."
          },
          {
            id: "how-learns-brand",
            question: currentLocale === "fi" ? "Miten Lyyli.ai oppii meidän brändiäänen?" : "How does Lyyli.ai learn our brand voice?",
            answer: currentLocale === "fi"
              ? "Lyyli analysoi organisaatiosi olemassa olevaa viestintää – verkkosivuja, uutiskirjeitä, LinkedIn-päivityksiä ja muuta materiaalia. Tämän pohjalta se rakentaa ymmärryksen siitä, miten organisaatiosi viestii. Lisäksi voit antaa Lyylin käyttöön brändiohjeistuksia ja muita dokumentteja, jotka täsmentävät sävyä ja tyyliä entisestään."
              : "Lyyli analyzes your organization's existing communication – websites, newsletters, LinkedIn updates, and other materials. Based on this, it builds an understanding of how your organization communicates. You can also provide Lyyli with brand guidelines and other documents that further refine the tone and style."
          },
          {
            id: "can-write-completely",
            question: currentLocale === "fi" ? "Voiko Lyyli.ai kirjoittaa viestit kokonaan puolestani?" : "Can Lyyli.ai write messages completely for me?",
            answer: currentLocale === "fi"
              ? "Lyyli ei ole tarkoitettu korvaamaan ihmistä, vaan tukemaan häntä. Ajattelemme, että tekoäly on loistava tuottamaan aihioita ja ideoita, mutta viimeisen sanan pitää aina olla ihmisellä. Näin varmistat, että viestisi on aito ja kuulostaa juuri sinulta."
              : "Lyyli is not meant to replace humans, but to support them. We believe AI is excellent at generating drafts and ideas, but the final word should always be human. This ensures your message is authentic and sounds exactly like you."
          },
          {
            id: "which-channels",
            question: currentLocale === "fi" ? "Mihin kanaviin Lyyli.ai sopii?" : "Which channels does Lyyli.ai work with?",
            answer: currentLocale === "fi"
              ? "Lyyli tukee sekä sisäistä että ulkoista viestintää. Voit käyttää sitä sähköposteihin, LinkedIn-päivityksiin, Slack- ja Teams-viesteihin, uutiskirjeisiin, verkkosivuteksteihin ja moneen muuhun. Lyyli mukautuu automaattisesti kanavan vaatimuksiin ja yleisöön."
              : "Lyyli supports both internal and external communication. You can use it for emails, LinkedIn updates, Slack and Teams messages, newsletters, website content, and many others. Lyyli automatically adapts to channel requirements and audiences."
          },
          {
            id: "how-integrates",
            question: currentLocale === "fi" ? "Miten Lyyli.ai integroituu työkaluihimme?" : "How does Lyyli.ai integrate with our tools?",
            answer: currentLocale === "fi"
              ? "Lyyli integroituu suoraan käyttämiisi työkaluihin, kuten Outlookiin, Gmailiin, Microsoft Teamsiin ja Slackiin. Näin saat Lyylin avun käyttöösi juuri siellä, missä sitä tarvitset – ilman että sinun tarvitsee hyppiä eri sovellusten välillä."
              : "Lyyli integrates directly with your tools like Outlook, Gmail, Microsoft Teams, and Slack. This way you get Lyyli's help right where you need it – without having to jump between different applications."
          },
          {
            id: "data-security",
            question: currentLocale === "fi" ? "Onko tietomme turvassa?" : "Is our data secure?",
            answer: currentLocale === "fi"
              ? "Kyllä. Tietoturvasi on meille ensiarvoisen tärkeää. Lyyli.ai noudattaa EU:n tietosuoja-asetusta (GDPR) ja kaikki data käsitellään turvallisesti. Emme jaa tietojasi kolmansille osapuolille, emmekä käytä niitä kielimallien kouluttamiseen."
              : "Yes. Your data security is our top priority. Lyyli.ai complies with EU data protection regulations (GDPR) and all data is processed securely. We don't share your data with third parties, nor do we use it to train language models."
          }
        ]}
        title={currentLocale === "fi" ? "Usein kysytyt kysymykset" : "Frequently Asked Questions"}
        description={currentLocale === "fi" 
          ? "Vastauksia yleisimpiin kysymyksiin Lyylin ominaisuuksista ja käytöstä."
          : "Answers to the most common questions about Lyyli's features and usage."
        }
      />

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-forest to-turquoise py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-white font-playfair font-bold leading-tight">
            {t["cta.subtitle"]}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 font-sans leading-relaxed">
            {t["cta.descriptionLong"]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://app.lyyli.ai"
              className="inline-flex items-center px-8 py-4 bg-white text-forest font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-sans"
            >
              {t["cta.startTrial"]}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a 
              href="https://app.lyyli.ai"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-forest transition-all duration-300 hover:-translate-y-1 font-sans"
            >
              {t["cta.demo"]}
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
