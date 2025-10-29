import { Metadata } from "next";
import { getTranslations } from "@/lib/i18n";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Data Management - Export, Backup & GDPR Compliance",
  description: "Learn how to export your data, create backups, and understand GDPR compliance for your Lyyli.ai workspace.",
};

export default async function DataManagementPage({
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
                    {locale === "fi" ? "Tietojen hallinta" : "Data Management"}
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
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {locale === "fi" ? "Keskitaso" : "Intermediate"}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {locale === "fi" ? "8 min" : "8 min"}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {locale === "fi" 
                ? "Tietojen hallinta ja varmuuskopiointi"
                : "Data Management & Backup"
              }
            </h1>
            <p className="text-xl text-gray-600">
              {locale === "fi" 
                ? "Opi viemään tietojasi, luomaan varmuuskopioita ja ymmärtämään GDPR-yhteensopivuus"
                : "Learn how to export your data, create backups, and understand GDPR compliance for your workspace."
              }
            </p>
          </div>

          {/* Article Body */}
          <div className="p-8">
            {/* Quick Actions */}
            <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h2 className="text-lg font-semibold text-blue-900 mb-3">
                {locale === "fi" ? "Nopeat toiminnot" : "Quick Actions"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Link 
                  href={`/${locale}/contact`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {locale === "fi" ? "Vie tietoja" : "Export Data"}
                </Link>
                <Link 
                  href={`/${locale}/contact`}
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-md border border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  {locale === "fi" ? "Lataa varmuuskopio" : "Download Backup"}
                </Link>
                <Link 
                  href={`/${locale}/help/security`}
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-md border border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {locale === "fi" ? "Tietoturva" : "Security"}
                </Link>
              </div>
            </div>

            {/* Data Export */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === "fi" ? "Tietojen vienti" : "Data Export"}
              </h2>
              
              <div className="space-y-6">
                {/* Export Types */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === "fi" ? "Viennin tyypit" : "Export Types"}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium text-gray-900 mb-2">
                        {locale === "fi" ? "Koko työtilan vienti" : "Full Workspace Export"}
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">
                        {locale === "fi"
                          ? "Vie kaikki tietosi, mukaan lukien avustajat, keskustelut ja asetukset"
                          : "Export all your data including assistants, conversations, and settings"
                        }
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {locale === "fi" ? "24-48 tuntia" : "24-48 hours"}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium text-gray-900 mb-2">
                        {locale === "fi" ? "Osittainen vienti" : "Partial Export"}
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">
                        {locale === "fi"
                          ? "Vie valitut avustajat tai keskustelut"
                          : "Export selected assistants or conversations"
                        }
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {locale === "fi" ? "1-2 tuntia" : "1-2 hours"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Export Process */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === "fi" ? "Viennin prosessi" : "Export Process"}
                  </h3>
                  
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {locale === "fi" ? "Ohjeet:" : "Instructions:"}
                    </h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                      <li>{locale === "fi" ? "Mene tiliasetuksiin" : "Go to Account Settings"}</li>
                      <li>{locale === "fi" ? "Valitse 'Tietojen vienti'" : "Select 'Data Export'"}</li>
                      <li>{locale === "fi" ? "Valitse vientityyppi" : "Choose export type"}</li>
                      <li>{locale === "fi" ? "Vahvista pyyntö" : "Confirm request"}</li>
                      <li>{locale === "fi" ? "Odota sähköpostiviestiä" : "Wait for email notification"}</li>
                    </ol>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">
                      {locale === "fi" ? "Huomioitavaa:" : "Important:"}
                    </h4>
                    <p className="text-sm text-blue-800">
                      {locale === "fi"
                        ? "Suuret vientipyynnöt käsitellään automaattisesti. Saat ilmoituksen, kun vienti on valmis."
                        : "Large export requests are processed automatically. You'll be notified when the export is ready."
                      }
                    </p>
                  </div>
                </div>

                {/* Export Formats */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === "fi" ? "Viennin muodot" : "Export Formats"}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-900">JSON</p>
                      <p className="text-xs text-gray-500">
                        {locale === "fi" ? "Rakenteellinen data" : "Structured data"}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-900">CSV</p>
                      <p className="text-xs text-gray-500">
                        {locale === "fi" ? "Taulukkodata" : "Tabular data"}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-900">PDF</p>
                      <p className="text-xs text-gray-500">
                        {locale === "fi" ? "Raportit" : "Reports"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Backup */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === "fi" ? "Varmuuskopiointi" : "Data Backup"}
              </h2>
              
              <div className="space-y-6">
                {/* Automatic Backups */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === "fi" ? "Automaattinen varmuuskopiointi" : "Automatic Backups"}
                  </h3>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-green-900">
                          {locale === "fi" ? "Säännölliset varmuuskopiot" : "Regular Backups"}
                        </h4>
                        <p className="text-sm text-green-800 mt-1">
                          {locale === "fi"
                            ? "Kaikki tietosi varmuuskopioidaan automaattisesti päivittäin ja säilytetään 90 päivää."
                            : "All your data is automatically backed up daily and retained for 90 days."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-blue-600 font-semibold text-sm">24h</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        {locale === "fi" ? "Päivittäin" : "Daily"}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-green-600 font-semibold text-sm">7d</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        {locale === "fi" ? "Viikoittain" : "Weekly"}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-purple-600 font-semibold text-sm">90d</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        {locale === "fi" ? "Säilytys" : "Retention"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Manual Backups */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === "fi" ? "Manuaalinen varmuuskopiointi" : "Manual Backups"}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {locale === "fi"
                      ? "Voit luoda manuaalisia varmuuskopioita milloin tahansa tärkeiden muutosten jälkeen."
                      : "You can create manual backups anytime after important changes."
                    }
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {locale === "fi" ? "Kun luoda varmuuskopio:" : "When to create backups:"}
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• {locale === "fi" ? "Suurten muutosten jälkeen" : "After major changes"}</li>
                      <li>• {locale === "fi" ? "Ennen päivityksiä" : "Before updates"}</li>
                      <li>• {locale === "fi" ? "Tärkeiden projektien jälkeen" : "After important projects"}</li>
                      <li>• {locale === "fi" ? "Säännöllisesti (esim. kuukausittain)" : "Regularly (e.g., monthly)"}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* GDPR Compliance */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === "fi" ? "GDPR-yhteensopivuus" : "GDPR Compliance"}
              </h2>
              
              <div className="space-y-6">
                {/* Data Rights */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === "fi" ? "Tietojen oikeudet" : "Data Rights"}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">
                        {locale === "fi" ? "Oikeus tietoihin" : "Right to Access"}
                      </h4>
                      <p className="text-sm text-blue-800">
                        {locale === "fi"
                          ? "Voit pyytää kaikki tietosi milloin tahansa"
                          : "You can request all your data at any time"
                        }
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-md border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2">
                        {locale === "fi" ? "Oikeus poistaa" : "Right to Erasure"}
                      </h4>
                      <p className="text-sm text-green-800">
                        {locale === "fi"
                          ? "Voit pyytää tietojesi poistamisen"
                          : "You can request deletion of your data"
                        }
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-md border border-purple-200">
                      <h4 className="font-medium text-purple-900 mb-2">
                        {locale === "fi" ? "Oikeus siirtää" : "Right to Portability"}
                      </h4>
                      <p className="text-sm text-purple-800">
                        {locale === "fi"
                          ? "Voit viedä tietosi muihin palveluihin"
                          : "You can export your data to other services"
                        }
                      </p>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                      <h4 className="font-medium text-yellow-900 mb-2">
                        {locale === "fi" ? "Oikeus korjata" : "Right to Rectification"}
                      </h4>
                      <p className="text-sm text-yellow-800">
                        {locale === "fi"
                          ? "Voit korjata virheellisiä tietoja"
                          : "You can correct inaccurate data"
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Data Processing */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === "fi" ? "Tietojen käsittely" : "Data Processing"}
                  </h3>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {locale === "fi" ? "Mitä tietoja käsittelemme:" : "What data we process:"}
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• {locale === "fi" ? "Käyttäjätiedot (nimi, sähköposti)" : "User data (name, email)"}</li>
                      <li>• {locale === "fi" ? "Keskustelut ja viestit" : "Conversations and messages"}</li>
                      <li>• {locale === "fi" ? "Avustajien konfiguraatiot" : "Assistant configurations"}</li>
                      <li>• {locale === "fi" ? "Käyttöanalytiikka" : "Usage analytics"}</li>
                      <li>• {locale === "fi" ? "Tekniset lokit" : "Technical logs"}</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-4">
                    <h4 className="font-medium text-blue-900 mb-2">
                      {locale === "fi" ? "Tietojen käyttötarkoitus:" : "Data usage purposes:"}
                    </h4>
                    <ul className="space-y-1 text-sm text-blue-800">
                      <li>• {locale === "fi" ? "Palvelun tarjoaminen" : "Service provision"}</li>
                      <li>• {locale === "fi" ? "Avustajien koulutus" : "Assistant training"}</li>
                      <li>• {locale === "fi" ? "Palvelun parantaminen" : "Service improvement"}</li>
                      <li>• {locale === "fi" ? "Tietoturva ja yhteensopivuus" : "Security and compliance"}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === "fi" ? "Tietojen säilytys" : "Data Retention"}
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {locale === "fi" ? "Aktiiviset tilaukset" : "Active Subscriptions"}
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• {locale === "fi" ? "Tietoja säilytetään koko tilausajan" : "Data retained for subscription duration"}</li>
                      <li>• {locale === "fi" ? "Automaattinen varmuuskopiointi" : "Automatic backup"}</li>
                      <li>• {locale === "fi" ? "Täysi pääsy kaikkiin toimintoihin" : "Full access to all features"}</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {locale === "fi" ? "Peruutetut tilaukset" : "Cancelled Subscriptions"}
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• {locale === "fi" ? "Tietoja säilytetään 30 päivää" : "Data retained for 30 days"}</li>
                      <li>• {locale === "fi" ? "Rajoitettu pääsy" : "Limited access"}</li>
                      <li>• {locale === "fi" ? "Varmuuskopiointi saatavilla" : "Backup available"}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Need More Help */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border border-blue-200">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                {locale === "fi" ? "Tarvitsetko lisäapua?" : "Need more help?"}
              </h2>
              <p className="text-blue-800 mb-6">
                {locale === "fi"
                  ? "Jos sinulla on kysymyksiä tietojen hallinnasta tai GDPR-yhteensopivuudesta, ota yhteyttä asiakastukeemme."
                  : "If you have questions about data management or GDPR compliance, contact our customer support."
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href={`/${locale}/contact`}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {locale === "fi" ? "Ota yhteyttä tukeen" : "Contact Support"}
                </Link>
                <Link 
                  href={`/${locale}/help/security`}
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {locale === "fi" ? "Tietoturva" : "Security"}
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
