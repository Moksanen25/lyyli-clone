import { Metadata } from "next";
import { getTranslations } from "../../../lib/i18n";
import Link from "next/link";

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {locale === "fi" ? "Apu ja tuki" : "Help & Support Center"}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {locale === "fi" 
                ? "Etsi vastauksia, oppaat ja tuki Lyyli.ai:n käyttöön"
                : "Find answers, guides, and support for using Lyyli.ai"
              }
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder={locale === "fi" ? "Etsi apua..." : "Search for help..."}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-forest text-white px-6 py-2 rounded-md hover:bg-forest/90 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Popular Topics */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-forest transition-colors">
                  {locale === "fi" ? "Aloittaminen" : "Getting Started"}
                </h3>
                <p className="text-gray-600">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-forest transition-colors">
                  {locale === "fi" ? "Tekoälyavustajat" : "AI Assistants"}
                </h3>
                <p className="text-gray-600">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-forest transition-colors">
                  {locale === "fi" ? "Integraatiot" : "Integrations"}
                </h3>
                <p className="text-gray-600">
                  {locale === "fi" 
                    ? "Yhdistä muihin työkaluihin ja alustoihin"
                    : "Connect to other tools and platforms"
                  }
                </p>
              </div>
            </Link>

            <Link href={`/${locale}/help/troubleshooting`} className="group">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-forest transition-colors">
                  {locale === "fi" ? "Vianmääritys" : "Troubleshooting"}
                </h3>
                <p className="text-gray-600">
                  {locale === "fi" 
                    ? "Ratkaise ongelmia ja löydä vastauksia"
                    : "Solve problems and find solutions"
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-forest transition-colors">
                  {locale === "fi" ? "Analytiikka" : "Analytics"}
                </h3>
                <p className="text-gray-600">
                  {locale === "fi" 
                    ? "Seuraa suorituskykyä ja optimoi tuloksia"
                    : "Track performance and optimize results"
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-forest transition-colors">
                  {locale === "fi" ? "Tietoturva" : "Security"}
                </h3>
                <p className="text-gray-600">
                  {locale === "fi" 
                    ? "Tietoturva, käyttöoikeudet ja yhteensopivuus"
                    : "Security, permissions, and compliance"
                  }
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            {locale === "fi" ? "Pikatoiminnot" : "Quick Actions"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href={`/${locale}/help/contact-support`} className="group">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200 text-center">
                <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-forest/20 transition-colors">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-forest transition-colors">
                  {locale === "fi" ? "Ota yhteyttä" : "Contact Support"}
                </h3>
              </div>
            </Link>

            <Link href={`/${locale}/help/status`} className="group">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200 text-center">
                <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-forest/20 transition-colors">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-forest transition-colors">
                  {locale === "fi" ? "Palvelun tila" : "Service Status"}
                </h3>
              </div>
            </Link>

            <Link href={`/${locale}/help/release-notes`} className="group">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200 text-center">
                <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-forest/20 transition-colors">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-forest transition-colors">
                  {locale === "fi" ? "Julkaisutiedot" : "Release Notes"}
                </h3>
              </div>
            </Link>

            <Link href={`/${locale}/help/community`} className="group">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200 text-center">
                <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-forest/20 transition-colors">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-forest transition-colors">
                  {locale === "fi" ? "Yhteisö" : "Community"}
                </h3>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Updates */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            {locale === "fi" ? "Viimeisimmät päivitykset" : "Recent Updates"}
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {locale === "fi" ? "Lyyli.ai v2.1.0 julkaistu" : "Lyyli.ai v2.1.0 Released"}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Uusia ominaisuuksia ja parannuksia tekoälyavustajiin"
                      : "New features and improvements for AI assistants"
                    }
                  </p>
                </div>
                <span className="text-sm text-gray-500">January 15, 2024</span>
              </div>
            </div>
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {locale === "fi" ? "Uusi WordPress-integraatio" : "New WordPress Integration"}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Helppo asennus ja konfigurointi WordPress-sivustolle"
                      : "Easy installation and configuration for WordPress sites"
                    }
                  </p>
                </div>
                <span className="text-sm text-gray-500">January 10, 2024</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {locale === "fi" ? "Parannettu analytiikkakäyttöliittymä" : "Enhanced Analytics Interface"}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Uusi dashboard ja raportointityökalut"
                      : "New dashboard and reporting tools"
                    }
                  </p>
                </div>
                <span className="text-sm text-gray-500">January 5, 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Still Need Help */}
        <div className="bg-forest text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            {locale === "fi" ? "Tarvitsetko vielä apua?" : "Still Need Help?"}
          </h2>
          <p className="text-lg mb-6 opacity-90">
            {locale === "fi" 
              ? "Olemme täällä auttaaksemme sinua saavuttamaan tavoitteesi"
              : "We're here to help you achieve your goals"
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/help/contact-support`}
              className="bg-white text-forest px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              {locale === "fi" ? "Ota yhteyttä tukeen" : "Contact Support"}
            </Link>
            <Link
              href={`/${locale}/help/community`}
              className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-forest transition-colors font-medium"
            >
              {locale === "fi" ? "Liity yhteisöön" : "Join Community"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
