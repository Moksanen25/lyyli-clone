import { Metadata } from "next";
import { getTranslations } from "../../../../lib/i18n";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Troubleshooting - Solve Common Issues with Lyyli.ai",
  description: "Find solutions to common problems and issues when using Lyyli.ai. Step-by-step troubleshooting guides for various scenarios.",
};

export default async function TroubleshootingPage({
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
                    {locale === "fi" ? "Vianmääritys" : "Troubleshooting"}
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
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                {locale === "fi" ? "Kaikki tasot" : "All levels"}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {locale === "fi" ? "30 min" : "30 min"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === "fi" 
                ? "Vianmääritys ja ongelmien ratkaisu"
                : "Troubleshooting and problem solving"
              }
            </h1>
            <p className="text-xl text-gray-600">
              {locale === "fi" 
                ? "Ratkaise yleisimpiä ongelmia ja löydä vastauksia Lyyli.ai:n käyttöön liittyviin ongelmiin"
                : "Solve common issues and find answers to problems related to using Lyyli.ai."
              }
            </p>
          </div>

          {/* Article Body */}
          <div className="p-8">
            {/* Quick diagnosis */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Nopea diagnoosi" : "Quick diagnosis"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Ennen kuin aloitat yksityiskohtaisen vianmäärityksen, tarkista nämä yleiset ongelmat:"
                  : "Before starting detailed troubleshooting, check these common issues:"
                }
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-blue-900 mb-3">
                  {locale === "fi" ? "Perustarkistukset" : "Basic checks"}
                </h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-start">
                    <svg className="flex-shrink-0 h-4 w-4 text-blue-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {locale === "fi" ? "Onko verkkoyhteys toiminnassa?" : "Is your internet connection working?"}
                  </li>
                  <li className="flex items-start">
                    <svg className="flex-shrink-0 h-4 w-4 text-blue-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {locale === "fi" ? "Onko selain päivitetty?" : "Is your browser updated?"}
                  </li>
                  <li className="flex items-start">
                    <svg className="flex-shrink-0 h-4 w-4 text-blue-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {locale === "fi" ? "Onko kirjautumistietosi oikein?" : "Are your login credentials correct?"}
                  </li>
                  <li className="flex items-start">
                    <svg className="flex-shrink-0 h-4 w-4 text-blue-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {locale === "fi" ? "Onko palvelun tila normaali?" : "Is the service status normal?"}
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <Link
                  href={`/${locale}/help/status`}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-forest hover:bg-forest/90"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {locale === "fi" ? "Tarkista palvelun tila" : "Check service status"}
                </Link>
              </div>
            </div>

            {/* Common issues */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Yleisimmät ongelmat" : "Common issues"}
              </h2>
              
              {/* Issue 1: Login problems */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {locale === "fi" ? "1. Kirjautumisongelmat" : "1. Login problems"}
                </h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-3">
                  <h4 className="font-semibold text-red-900 mb-2">
                    {locale === "fi" ? "Ongelma" : "Issue"}
                  </h4>
                  <p className="text-red-800">
                    {locale === "fi" 
                      ? "Et pääse kirjautumaan sisään tai kirjautumisikkuna ei näy"
                      : "Cannot log in or login window doesn't appear"
                    }
                  </p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
                  <h4 className="font-semibold text-green-900 mb-2">
                    {locale === "fi" ? "Ratkaisu" : "Solution"}
                  </h4>
                  <ol className="list-decimal list-inside text-green-800 space-y-1">
                    <li>{locale === "fi" ? "Tyhjennä selaimen välimuisti ja evästeet" : "Clear browser cache and cookies"}</li>
                    <li>{locale === "fi" ? "Kokeile incognito/private-tilaa" : "Try incognito/private mode"}</li>
                    <li>{locale === "fi" ? "Tarkista URL-osoite (https://app.lyyli.ai)" : "Check URL (https://app.lyyli.ai)"}</li>
                    <li>{locale === "fi" ? "Käytä salasanan palautusta tarvittaessa" : "Use password reset if needed"}</li>
                  </ol>
                </div>
              </div>

              {/* Issue 2: Assistant not responding */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {locale === "fi" ? "2. Avustaja ei vastaa" : "2. Assistant not responding"}
                </h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-3">
                  <h4 className="font-semibold text-red-900 mb-2">
                    {locale === "fi" ? "Ongelma" : "Issue"}
                  </h4>
                  <p className="text-red-800">
                    {locale === "fi" 
                      ? "Tekoälyavustaja ei vastaa tai vastaukset ovat epätarkkoja"
                      : "AI assistant doesn't respond or responses are inaccurate"
                    }
                  </p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
                  <h4 className="font-semibold text-green-900 mb-2">
                    {locale === "fi" ? "Ratkaisu" : "Solution"}
                  </h4>
                  <ol className="list-decimal list-inside text-green-800 space-y-1">
                    <li>{locale === "fi" ? "Tarkista avustajan tietopohja ja koulutus" : "Check assistant's knowledge base and training"}</li>
                    <li>{locale === "fi" ? "Varmista että avustaja on aktiivinen" : "Ensure assistant is active"}</li>
                    <li>{locale === "fi" ? "Tarkista brändiasetukset ja persoonallisuus" : "Check brand settings and personality"}</li>
                    <li>{locale === "fi" ? "Kouluta avustaja uudelleen tarvittaessa" : "Retrain assistant if needed"}</li>
                  </ol>
                </div>
              </div>

              {/* Issue 3: Integration problems */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {locale === "fi" ? "3. Integraatioongelmat" : "3. Integration problems"}
                </h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-3">
                  <h4 className="font-semibold text-red-900 mb-2">
                    {locale === "fi" ? "Ongelma" : "Issue"}
                  </h4>
                  <p className="text-red-800">
                    {locale === "fi" 
                      ? "Chat-widget ei näy verkkosivustolla tai integraatiot eivät toimi"
                      : "Chat widget doesn't appear on website or integrations don't work"
                    }
                  </p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
                  <h4 className="font-semibold text-green-900 mb-2">
                    {locale === "fi" ? "Ratkaisu" : "Solution"}
                  </h4>
                  <ol className="list-decimal list-inside text-green-800 space-y-1">
                    <li>{locale === "fi" ? "Tarkista JavaScript-koodin asennus" : "Check JavaScript code installation"}</li>
                    <li>{locale === "fi" ? "Varmista API-avaimen oikeellisuus" : "Verify API key correctness"}</li>
                    <li>{locale === "fi" ? "Tarkista verkkosivuston SSL-sertifikaatti" : "Check website SSL certificate"}</li>
                    <li>{locale === "fi" ? "Testaa integraatiota eri selaimilla" : "Test integration with different browsers"}</li>
                  </ol>
                </div>
              </div>

              {/* Issue 4: Performance issues */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {locale === "fi" ? "4. Suorituskykyongelmat" : "4. Performance issues"}
                </h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-3">
                  <h4 className="font-semibold text-red-900 mb-2">
                    {locale === "fi" ? "Ongelma" : "Issue"}
                  </h4>
                  <p className="text-red-800">
                    {locale === "fi" 
                      ? "Avustaja vastaa hitaasti tai järjestelmä on hidastunut"
                      : "Assistant responds slowly or system is sluggish"
                    }
                  </p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
                  <h4 className="font-semibold text-green-900 mb-2">
                    {locale === "fi" ? "Ratkaisu" : "Solution"}
                  </h4>
                  <ol className="list-decimal list-inside text-green-800 space-y-1">
                    <li>{locale === "fi" ? "Tarkista verkkoyhteyden nopeus" : "Check internet connection speed"}</li>
                    <li>{locale === "fi" ? "Päivitä selain uusimpaan versioon" : "Update browser to latest version"}</li>
                    <li>{locale === "fi" ? "Sulje tarpeettomat välilehdet ja sovellukset" : "Close unnecessary tabs and applications"}</li>
                    <li>{locale === "fi" ? "Tarkista palvelun tila ja kuormitus" : "Check service status and load"}</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Advanced troubleshooting */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Edistyneet vianmääritysmenetelmät" : "Advanced troubleshooting methods"}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Selaimen kehittäjätyökalut" : "Browser developer tools"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Käytä F12-näppäintä avataksesi kehittäjätyökalut ja tarkista virheet"
                        : "Use F12 key to open developer tools and check for errors"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Verkkoyhteyden testaus" : "Network connection testing"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Testaa verkkoyhteyttä ja DNS-asetuksia"
                        : "Test network connection and DNS settings"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Loki-tiedostojen tarkistus" : "Log file checking"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Tarkista järjestelmän ja sovelluksen loki-tiedostot"
                        : "Check system and application log files"
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Placeholder for advanced troubleshooting */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  {locale === "fi" 
                    ? "Screenshot: Edistyneet vianmääritystyökalut"
                    : "Screenshot: Advanced troubleshooting tools"
                  }
                </p>
              </div>
            </div>

            {/* Browser-specific issues */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Selainkohtaiset ongelmat" : "Browser-specific issues"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "Chrome/Edge" : "Chrome/Edge"}
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {locale === "fi" ? "Päivitä selain" : "Update browser"}</li>
                    <li>• {locale === "fi" ? "Poista laajennukset" : "Remove extensions"}</li>
                    <li>• {locale === "fi" ? "Tyhjennä välimuisti" : "Clear cache"}</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "Firefox" : "Firefox"}
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {locale === "fi" ? "Päivitä selain" : "Update browser"}</li>
                    <li>• {locale === "fi" ? "Poista lisäosat" : "Remove add-ons"}</li>
                    <li>• {locale === "fi" ? "Käytä safe modea" : "Use safe mode"}</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "Safari" : "Safari"}
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {locale === "fi" ? "Päivitä macOS" : "Update macOS"}</li>
                    <li>• {locale === "fi" ? "Tyhjennä välimuisti" : "Clear cache"}</li>
                    <li>• {locale === "fi" ? "Poista evästeet" : "Remove cookies"}</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "Mobile" : "Mobile"}
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {locale === "fi" ? "Päivitä sovellus" : "Update app"}</li>
                    <li>• {locale === "fi" ? "Käynnistä uudelleen" : "Restart device"}</li>
                    <li>• {locale === "fi" ? "Tarkista verkkoyhteys" : "Check connection"}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Prevention tips */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Ongelmaten ehkäisy" : "Preventing issues"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Seuraa näitä vinkkejä vältääksesi yleisiä ongelmia:"
                  : "Follow these tips to avoid common issues:"
                }
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-forest pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" ? "Säännöllinen ylläpito" : "Regular maintenance"}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Päivitä selaimet ja järjestelmät säännöllisesti"
                      : "Update browsers and systems regularly"
                    }
                  </p>
                </div>
                
                <div className="border-l-4 border-forest pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" ? "Varmuuskopiot" : "Backups"}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Tee varmuuskopioita tärkeistä asetuksista ja konfiguraatioista"
                      : "Back up important settings and configurations"
                    }
                  </p>
                </div>
                
                <div className="border-l-4 border-forest pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" ? "Dokumentointi" : "Documentation"}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Dokumentoi muutokset ja konfiguraatiot"
                      : "Document changes and configurations"
                    }
                  </p>
                </div>
                
                <div className="border-l-4 border-forest pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" ? "Testaus" : "Testing"}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Testaa muutokset testiympäristössä ennen tuotantoon viemistä"
                      : "Test changes in test environment before deploying to production"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* When to contact support */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Milloin ottaa yhteyttä tukeen?" : "When to contact support?"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Ota yhteyttä tukeen seuraavissa tilanteissa:"
                  : "Contact support in the following situations:"
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">
                    {locale === "fi" ? "Kriittiset ongelmat" : "Critical issues"}
                  </h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• {locale === "fi" ? "Palvelu ei ole käytettävissä" : "Service unavailable"}</li>
                    <li>• {locale === "fi" ? "Tietojen menetys" : "Data loss"}</li>
                    <li>• {locale === "fi" ? "Tietoturvaongelmat" : "Security issues"}</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">
                    {locale === "fi" ? "Kestävät ongelmat" : "Persistent issues"}
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• {locale === "fi" ? "Ongelma jatkuu yli 24h" : "Issue persists over 24h"}</li>
                    <li>• {locale === "fi" ? "Vianmääritys ei auta" : "Troubleshooting doesn't help"}</li>
                    <li>• {locale === "fi" ? "Useita käyttäjiä vaikutettu" : "Multiple users affected"}</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href={`/${locale}/help/contact-support`}
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-forest hover:bg-forest/90"
                >
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {locale === "fi" ? "Ota yhteyttä tukeen" : "Contact support"}
                </Link>
              </div>
            </div>

            {/* What's next */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Mitä seuraavaksi?" : "What's next?"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href={`/${locale}/help/ai-assistants`} className="group">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-forest hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 group-hover:text-forest">
                      {locale === "fi" ? "Avustajien hallinta" : "Assistant management"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {locale === "fi" 
                        ? "Opi hallitsemaan avustajiasi paremmin"
                        : "Learn to manage your assistants better"
                      }
                    </p>
                  </div>
                </Link>
                <Link href={`/${locale}/help/integrations`} className="group">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-forest hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 group-hover:text-forest">
                      {locale === "fi" ? "Integraatiot" : "Integrations"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {locale === "fi" 
                        ? "Tutustu integraatiomahdollisuuksiin"
                        : "Explore integration possibilities"
                      }
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Article Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>
                {locale === "fi" 
                  ? "Viimeksi päivitetty: 15. tammikuuta 2024"
                  : "Last updated: January 15, 2024"
                }
              </span>
              <span>
                {locale === "fi" 
                  ? "Versio: 2.1.0"
                  : "Version: 2.1.0"
                }
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
