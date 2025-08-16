import { Metadata } from "next";
import { getTranslations } from "../../../../lib/i18n";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service Status - Lyyli.ai System Status",
  description: "Check the current operational status of Lyyli.ai services and get updates on any ongoing issues.",
};

export default async function StatusPage({
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
                    {locale === "fi" ? "Palvelun tila" : "Service Status"}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === "fi" ? "Palvelun tila" : "Service Status"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === "fi" 
              ? "Seuraa Lyyli.ai-palveluiden toimintatilaa ja saat tietoa mahdollisista ongelmista"
              : "Monitor the operational status of Lyyli.ai services and get updates on any issues"
            }
          </p>
        </div>

        {/* Overall Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {locale === "fi" ? "Yleinen tila" : "Overall Status"}
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-600 dark:text-white font-medium">
                Operational
              </span>
            </div>
          </div>
          
          <p className="text-gray-600">
            {locale === "fi" 
              ? "Kaikki Lyyli.ai-palvelut toimivat normaalisti. Ei raportoitu ongelmia tai katkoksia."
              : "All Lyyli.ai services are operating normally. No issues or outages reported."
            }
          </p>
          
          <div className="mt-4 text-sm text-gray-500">
            {locale === "fi" 
              ? "Viimeksi päivitetty: 15. tammikuuta 2024, 14:30 UTC"
              : "Last updated: January 15, 2024, 14:30 UTC"
            }
          </div>
        </div>

        {/* Service Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Core Platform */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {locale === "fi" ? "Ydinpalvelin" : "Core Platform"}
              </h3>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              {locale === "fi" 
                ? "AI-avustajien luonti ja hallinta"
                : "AI assistant creation and management"
              }
            </p>
            <div className="text-xs text-gray-500">
              {locale === "fi" ? "99.9% käytettävyys" : "99.9% uptime"}
            </div>
          </div>

          {/* API Services */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {locale === "fi" ? "API-palvelut" : "API Services"}
              </h3>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              {locale === "fi" 
                ? "Integraatiot ja kehittäjärajapinnat"
                : "Integrations and developer APIs"
              }
            </p>
            <div className="text-xs text-gray-500">
              {locale === "fi" ? "99.8% käytettävyys" : "99.8% uptime"}
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {locale === "fi" ? "Analytiikka" : "Analytics"}
              </h3>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              {locale === "fi" 
                ? "Suorituskykymittaukset ja raportit"
                : "Performance metrics and reporting"
              }
            </p>
            <div className="text-xs text-gray-500">
              {locale === "fi" ? "99.7% käytettävyys" : "99.7% uptime"}
            </div>
          </div>

          {/* Integrations */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {locale === "fi" ? "Integraatiot" : "Integrations"}
              </h3>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              {locale === "fi" 
                ? "Kolmannen osapuolen yhteistyöt"
                : "Third-party integrations"
              }
            </p>
            <div className="text-xs text-gray-500">
              {locale === "fi" ? "99.6% käytettävyys" : "99.6% uptime"}
            </div>
          </div>

          {/* Mobile App */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {locale === "fi" ? "Mobiilisovellus" : "Mobile App"}
              </h3>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              {locale === "fi" 
                ? "iOS ja Android -sovellukset"
                : "iOS and Android applications"
              }
            </p>
            <div className="text-xs text-gray-500">
              {locale === "fi" ? "99.5% käytettävyys" : "99.5% uptime"}
            </div>
          </div>

          {/* Support System */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {locale === "fi" ? "Tukijärjestelmä" : "Support System"}
              </h3>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              {locale === "fi" 
                ? "Asiakastuki ja ticketing"
                : "Customer support and ticketing"
              }
            </p>
            <div className="text-xs text-gray-500">
              {locale === "fi" ? "99.9% käytettävyys" : "99.9% uptime"}
            </div>
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {locale === "fi" ? "Viimeisimmät tapahtumat" : "Recent Incidents"}
          </h2>
          
          <div className="space-y-6">
            {/* Incident 1 */}
            <div className="border-l-4 border-green-400 pl-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {locale === "fi" ? "Scheduled Maintenance - API Services" : "Scheduled Maintenance - API Services"}
                </h3>
                <span className="text-sm text-green-600 dark:text-white font-medium">
                  Operational
                </span>
              </div>
              <p className="text-gray-600 mb-2">
                {locale === "fi" 
                  ? "Suunniteltu ylläpito API-palveluille suoritettu onnistuneesti."
                  : "Scheduled maintenance for API services completed successfully."
                }
              </p>
              <div className="text-sm text-gray-500">
                {locale === "fi" 
                  ? "Tapahtui: 14. tammikuuta 2024, 02:00-04:00 UTC"
                  : "Occurred: January 14, 2024, 02:00-04:00 UTC"
                }
              </div>
            </div>

            {/* Incident 2 */}
            <div className="border-l-4 border-green-400 pl-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {locale === "fi" ? "Performance Optimization - Analytics" : "Performance Optimization - Analytics"}
                </h3>
                <span className="text-sm text-green-600 dark:text-white font-medium">
                  Operational
                </span>
              </div>
              <p className="text-gray-600 mb-2">
                {locale === "fi" 
                  ? "Analytiikkapalvelun suorituskykyä optimoitu."
                  : "Analytics service performance optimized."
                }
              </p>
              <div className="text-sm text-gray-500">
                {locale === "fi" 
                  ? "Tapahtui: 12. tammikuuta 2024, 10:00-11:00 UTC"
                  : "Occurred: January 12, 2024, 10:00-11:00 UTC"
                }
              </div>
            </div>

            {/* No Active Incidents */}
            <div className="text-center py-8 text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg">
                {locale === "fi" 
                  ? "Ei aktiivisia ongelmia"
                  : "No active issues"
                }
              </p>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {locale === "fi" ? "Suorituskykymittaukset" : "Performance Metrics"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-white mb-2">99.9%</div>
              <div className="text-sm text-gray-600">
                {locale === "fi" ? "Käytettävyys (30 päivää)" : "Uptime (30 days)"}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">45ms</div>
              <div className="text-sm text-gray-600">
                {locale === "fi" ? "Keskimääräinen vastausaika" : "Average Response Time"}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">99.99%</div>
              <div className="text-sm text-gray-600">
                {locale === "fi" ? "Suorituskyky (7 päivää)" : "Performance (7 days)"}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">0</div>
              <div className="text-sm text-gray-600">
                {locale === "fi" ? "Aktiivisia ongelmia" : "Active Issues"}
              </div>
            </div>
          </div>
        </div>

        {/* Subscribe to Updates */}
        <div className="bg-forest text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            {locale === "fi" ? "Tilaa päivitykset" : "Subscribe to Updates"}
          </h2>
          <p className="text-lg mb-6 opacity-90">
            {locale === "fi" 
              ? "Saat ilmoitukset palvelun tilasta ja tärkeistä päivityksistä"
              : "Get notified about service status and important updates"
            }
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder={locale === "fi" ? "Sähköpostiosoitteesi" : "Your email address"}
                className="flex-1 px-4 py-3 text-gray-900 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="px-6 py-3 bg-white text-forest rounded-lg hover:bg-gray-100 transition-colors font-medium">
                {locale === "fi" ? "Tilaa" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {locale === "fi" ? "Lisätietoja" : "Additional Information"}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/help/contact-support`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {locale === "fi" ? "Ota yhteyttä tukeen" : "Contact Support"}
            </Link>
            
            <Link
              href={`/${locale}/help`}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-forest hover:bg-forest/90"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {locale === "fi" ? "Apuoppaat" : "Help Guides"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
