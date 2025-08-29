import { Metadata } from "next";
import { getTranslations } from "../../../lib/i18n";
import Link from "next/link";
import HelpSearch from "../../../components/HelpSearch";

export const metadata: Metadata = {
  title: "Help & Support Center",
  description: "Get help with Lyyli.ai - Find guides, troubleshooting, and support resources for your AI communications assistant.",
};

export default async function HelpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Search */}
      <div className="relative z-10 pt-32">
        <section 
          className="container mx-auto px-4 py-20 relative overflow-hidden"
          aria-label="Hero"
        >
          {/* Animated Hero Visual */}
          
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl font-bold text-forest mb-6 font-playfair font-normal leading-tight">
              {locale === "fi" ? "Apu ja tuki" : "Help & Support Center"}
            </h1>
            <p className="text-xl text-mediumGray mb-8 font-sans leading-relaxed">
              {locale === "fi" 
                ? "Etsi vastauksia, oppaat ja tuki Lyyli.ai:n käyttöön"
                : "Find answers, guides, and support for using Lyyli.ai"
              }
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <HelpSearch 
                locale={locale}
                placeholder={locale === "fi" ? "Etsi apua..." : "Search for help..."}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-br from-rose/5 to-turquoise/5 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Popular Topics */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-forest mb-8 font-playfair font-normal leading-tight">
              {locale === "fi" ? "Suosituimmat aiheet" : "Popular Topics"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href={`/${locale}/help/getting-started`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-forest mb-2 group-hover:text-forest transition-colors font-sans">
                    {locale === "fi" ? "Aloittaminen" : "Getting Started"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Luo ensimmäinen tekoälyavustajasi ja aloita käyttö"
                      : "Create your first AI assistant and get started"
                    }
                  </p>
                </div>
              </Link>

              <Link href={`/${locale}/help/ai-assistants`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-forest mb-2 group-hover:text-forest transition-colors font-sans">
                    {locale === "fi" ? "Tekoälyavustajat" : "AI Assistants"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Hallitse ja kouluta tekoälyavustajiasi"
                      : "Manage and train your AI assistants"
                    }
                  </p>
                </div>
              </Link>

              <Link href={`/${locale}/help/integrations`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-.758l1.102-1.101a4 4 0 00-5.656-5.656l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-forest mb-2 group-hover:text-forest transition-colors font-sans">
                    {locale === "fi" ? "Integraatiot" : "Integrations"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Yhdistä Lyyli.ai muihin työkaluihin"
                      : "Connect Lyyli.ai with other tools"
                    }
                  </p>
                </div>
              </Link>

              <Link href={`/${locale}/help/analytics`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-forest mb-2 group-hover:text-forest transition-colors font-sans">
                    {locale === "fi" ? "Analytiikka" : "Analytics"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Seuraa viestintäsi tehokkuutta ja kehitystä"
                      : "Track your communication efficiency and progress"
                    }
                  </p>
                </div>
              </Link>

              <Link href={`/${locale}/help/security`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-forest mb-2 group-hover:text-forest transition-colors font-sans">
                    {locale === "fi" ? "Tietoturva" : "Security"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Tietoturva ja GDPR-yhteensopivuus"
                      : "Security and GDPR compliance"
                    }
                  </p>
                </div>
              </Link>

              <Link href={`/${locale}/help/troubleshooting`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-forest mb-2 group-hover:text-forest transition-colors font-sans">
                    {locale === "fi" ? "Ongelmanratkaisu" : "Troubleshooting"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Ratkaise yleisiä ongelmia ja virheitä"
                      : "Solve common issues and errors"
                    }
                  </p>
                </div>
              </Link>

              <Link href={`/${locale}/help/billing`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-forest mb-2 group-hover:text-forest transition-colors font-sans">
                    {locale === "fi" ? "Laskutus" : "Billing"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Hallitse tilauksia ja maksutapoja"
                      : "Manage subscriptions and payment methods"
                    }
                  </p>
                </div>
              </Link>

              <Link href={`/${locale}/help/user-management`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-forest mb-2 group-hover:text-forest transition-colors font-sans">
                    {locale === "fi" ? "Käyttäjien hallinta" : "User Management"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Hallitse tiimiä ja oikeuksia"
                      : "Manage team and permissions"
                    }
                  </p>
                </div>
              </Link>

              <Link href={`/${locale}/help/data-management`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-forest mb-2 group-hover:text-forest transition-colors font-sans">
                    {locale === "fi" ? "Tietojen hallinta" : "Data Management"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Vie tietoja ja varmuuskopioi"
                      : "Export data and backup"
                    }
                  </p>
                </div>
              </Link>

              <Link href={`/${locale}/help/api-documentation`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-forest mb-2 group-hover:text-forest transition-colors font-sans">
                    {locale === "fi" ? "API-dokumentaatio" : "API Documentation"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Integroi palvelut sovelluksiin"
                      : "Integrate services into applications"
                    }
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Contact Support */}
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-forest mb-4 font-playfair font-normal leading-tight">
              {locale === "fi" ? "Tarvitsetko lisäapua?" : "Need additional help?"}
            </h2>
            <p className="text-mediumGray mb-6 font-sans leading-relaxed">
              {locale === "fi" 
                ? "Ota yhteyttä tiimiimme saadaksesi henkilökohtaista tukea"
                : "Contact our team for personalized support"
              }
            </p>
            <Link 
              href={`/${locale}/contact`}
              className="inline-flex items-center px-6 py-3 bg-forest text-white font-medium rounded-lg hover:bg-forest/90 transition-colors font-sans"
            >
              {locale === "fi" ? "Ota yhteyttä" : "Contact Us"}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
