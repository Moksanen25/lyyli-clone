import { Metadata } from "next";
import { getTranslations } from "../../../../lib/i18n";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Palvelun kuvaus - Mikä on Lyyli.ai",
  description: "Tutustu Lyyli.ai:n tekoälypohjaiseen viestintäpalveluun ja sen ominaisuuksiin.",
};

export default async function ServiceDescriptionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href={`/${locale}/help`} className="text-gray-500 hover:text-gray-700">
                  {locale === "fi" ? "Apu ja tuki" : "Help & Support"}
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-4 text-sm font-medium text-gray-500">
                    {locale === "fi" ? "Palvelun kuvaus" : "Service Description"}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Article Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {locale === "fi" ? "Aloittelija" : "Beginner"}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {locale === "fi" ? "5 min" : "5 min"}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {locale === "fi" ? "Palvelun kuvaus" : "Service Description"}
            </h1>
            <p className="text-xl text-gray-600">
              {locale === "fi" 
                ? "Tutustu Lyyli.ai:n tekoälypohjaiseen viestintäpalveluun ja sen keskeisiin ominaisuuksiin"
                : "Learn about Lyyli.ai's AI-powered communication service and its key features"
              }
            </p>
          </div>

          {/* Article Body */}
          <div className="p-8">
            {/* Mikä on Lyyli.ai */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Mikä on Lyyli.ai?" : "What is Lyyli.ai?"}
              </h2>
              <p className="text-gray-700 mb-4">
                {locale === "fi" 
                  ? "Lyyli.ai on tekoälypohjainen viestintäpalvelu, joka auttaa yrityksiä ja tiimejä optimoimaan viestintäänsä ja parantamaan yhteistyötä. Palvelu käyttää kehittynyttä tekoälyteknologiaa luodakseen älykkäitä viestintäavustajia, jotka ymmärtävät yrityksen brändin, sävyn ja tavoitteet."
                  : "Lyyli.ai is an AI-powered communication service that helps companies and teams optimize their communication and improve collaboration. The service uses advanced AI technology to create intelligent communication assistants that understand your company's brand, tone, and goals."
                }
              </p>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  {locale === "fi" ? "Keskeiset ominaisuudet:" : "Key Features:"}
                </h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-start">
                    <svg className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{locale === "fi" ? "Tekoälyavustajat, jotka oppivat yrityksesi viestintätyylin" : "AI assistants that learn your company's communication style"}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{locale === "fi" ? "Automaattinen sisällöntuotanto ja julkaisu" : "Automated content creation and publishing"}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{locale === "fi" ? "Integraatiot suosittuihin työkaluihin" : "Integrations with popular tools"}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{locale === "fi" ? "Analytiikka ja suorituskyvyn seuranta" : "Analytics and performance tracking"}</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Palvelun arkkitehtuuri */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Palvelun arkkitehtuuri" : "Service Architecture"}
              </h2>
              <p className="text-gray-700 mb-4">
                {locale === "fi" 
                  ? "Lyyli.ai on rakennettu pilvipohjaisena SaaS-palveluna, joka käyttää kehittynyttä tekoälyteknologiaa ja modernia web-teknologiaa."
                  : "Lyyli.ai is built as a cloud-based SaaS service using advanced AI technology and modern web technologies."
                }
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {locale === "fi" ? "Tekninen pino" : "Technology Stack"}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• {locale === "fi" ? "Tekoäly: GPT-4, Claude ja muut LLM-mallit" : "AI: GPT-4, Claude and other LLM models"}</li>
                    <li>• {locale === "fi" ? "Backend: Node.js, TypeScript" : "Backend: Node.js, TypeScript"}</li>
                    <li>• {locale === "fi" ? "Frontend: React, Next.js" : "Frontend: React, Next.js"}</li>
                    <li>• {locale === "fi" ? "Tietokanta: PostgreSQL" : "Database: PostgreSQL"}</li>
                    <li>• {locale === "fi" ? "Pilvi: AWS/Azure" : "Cloud: AWS/Azure"}</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {locale === "fi" ? "Turvallisuus" : "Security"}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• {locale === "fi" ? "TLS 1.3-salaus" : "TLS 1.3 encryption"}</li>
                    <li>• {locale === "fi" ? "GDPR-yhteensopivuus" : "GDPR compliance"}</li>
                    <li>• {locale === "fi" ? "SSO-tuki" : "SSO support"}</li>
                    <li>• {locale === "fi" ? "Kaksivaiheinen tunnistautuminen" : "Two-factor authentication"}</li>
                    <li>• {locale === "fi" ? "Audit trail" : "Audit trail"}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Palvelun käyttöalueet */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Palvelun käyttöalueet" : "Service Use Cases"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">
                    {locale === "fi" ? "Markkinointi" : "Marketing"}
                  </h3>
                  <ul className="space-y-1 text-green-800 text-sm">
                    <li>• {locale === "fi" ? "Sosiaalisen median sisältö" : "Social media content"}</li>
                    <li>• {locale === "fi" ? "Blogikirjoitukset" : "Blog posts"}</li>
                    <li>• {locale === "fi" ? "Email-kampanjat" : "Email campaigns"}</li>
                    <li>• {locale === "fi" ? "Mainostekstit" : "Ad copy"}</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    {locale === "fi" ? "Asiakaspalvelu" : "Customer Service"}
                  </h3>
                  <ul className="space-y-1 text-blue-800 text-sm">
                    <li>• {locale === "fi" ? "Chatbot-vastaukset" : "Chatbot responses"}</li>
                    <li>• {locale === "fi" ? "FAQ-sisältö" : "FAQ content"}</li>
                    <li>• {locale === "fi" ? "Tukidokumentaatio" : "Support documentation"}</li>
                    <li>• {locale === "fi" ? "Koulutusmateriaalit" : "Training materials"}</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">
                    {locale === "fi" ? "Tiimiviestintä" : "Team Communication"}
                  </h3>
                  <ul className="space-y-1 text-purple-800 text-sm">
                    <li>• {locale === "fi" ? "Sisäiset tiedotteet" : "Internal announcements"}</li>
                    <li>• {locale === "fi" ? "Projektipäivitykset" : "Project updates"}</li>
                    <li>• {locale === "fi" ? "Kokousmuistiot" : "Meeting notes"}</li>
                    <li>• {locale === "fi" ? "Koulutusmateriaalit" : "Training materials"}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Palvelun hyödyt */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Palvelun hyödyt" : "Service Benefits"}
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Aikansäästö" : "Time Savings"}
                    </h3>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Automatisoi toistuvia viestintätehtäviä ja vapauta aikaa strategiselle työlle"
                        : "Automate repetitive communication tasks and free up time for strategic work"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Yhtenäinen brändiääni" : "Consistent Brand Voice"}
                    </h3>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Varmista, että kaikki viestintä vastaa yrityksesi brändiä ja arvoja"
                        : "Ensure all communication aligns with your company's brand and values"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Parannettu tehokkuus" : "Improved Efficiency"}
                    </h3>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Kasvata viestintätehokkuutta ja paranna tiimiyhteistyötä"
                        : "Increase communication efficiency and improve team collaboration"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Seuraavat vaiheet */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Seuraavat vaiheet" : "Next Steps"}
              </h2>
              <p className="text-gray-700 mb-4">
                {locale === "fi" 
                  ? "Nyt kun ymmärrät Lyyli.ai:n perusteet, voit tutustua seuraaviin artikkeleihin:"
                  : "Now that you understand the basics of Lyyli.ai, you can explore these articles:"
                }
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href={`/${locale}/help/target-audience`} className="group">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-forest hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 group-hover:text-forest">
                      {locale === "fi" ? "Kenelle palvelu on tarkoitettu" : "Who the service is for"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {locale === "fi" 
                        ? "Tutustu kohderyhmiin ja käyttötarkoituksiin"
                        : "Learn about target audiences and use cases"
                      }
                    </p>
                  </div>
                </Link>
                <Link href={`/${locale}/help/getting-started`} className="group">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-forest hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 group-hover:text-forest">
                      {locale === "fi" ? "Aloitus ja käyttöönotto" : "Getting Started"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {locale === "fi" 
                        ? "Aloita käyttäminen vaiheittaisella oppaalla"
                        : "Start using with step-by-step guide"
                      }
                    </p>
                  </div>
                </Link>
              </div>
            </section>
          </div>

          {/* Article Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>
                {locale === "fi" 
                  ? "Viimeksi päivitetty: 8. lokakuuta 2025"
                  : "Last updated: October 8, 2025"
                }
              </span>
              <span>
                {locale === "fi" 
                  ? "Versio: 3.0"
                  : "Version: 3.0"
                }
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
