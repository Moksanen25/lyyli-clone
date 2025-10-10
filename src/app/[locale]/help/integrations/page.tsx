import { Metadata } from "next";
import { getTranslations } from "../../../../lib/i18n";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Integrations - Connect Lyyli.ai to Your Existing Tools",
  description: "Learn how to integrate Lyyli.ai with your website, CRM, help desk, and other business tools for seamless AI communications.",
};

export default async function IntegrationsPage({
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
                    {locale === "fi" ? "Integraatiot" : "Integrations"}
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
                {locale === "fi" ? "20 min" : "20 min"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === "fi" 
                ? "Yhdistä Lyyli.ai olemassa oleviin työkaluihisi"
                : "Connect Lyyli.ai to your existing tools"
              }
            </h1>
            <p className="text-xl text-gray-600">
              {locale === "fi" 
                ? "Opi integroimaan tekoälyavustajasi verkkosivustollesi, CRM-järjestelmään ja muihin liiketoimintatyökaluihin"
                : "Learn how to integrate your AI assistants with your website, CRM system, and other business tools."
              }
            </p>
          </div>

          {/* Article Body */}
          <div className="p-8">
            {/* What you'll learn */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Mitä opit" : "What you'll learn"}
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === "fi" 
                      ? "Verkkosivuston integrointi"
                      : "Website integration"
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === "fi" 
                      ? "CRM ja help desk -integraatiot"
                      : "CRM and help desk integrations"
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === "fi" 
                      ? "API:n käyttö ja mukautukset"
                      : "API usage and customizations"
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === "fi" 
                      ? "Tietojen synkronointi"
                      : "Data synchronization"
                    }
                  </span>
                </li>
              </ul>
            </div>

            {/* Website integration */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Verkkosivuston integrointi" : "Website integration"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Lisää tekoälyavustajasi verkkosivustollesi muutamalla klikkauksella:"
                  : "Add your AI assistant to your website with just a few clicks:"
                }
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Chat-widgetin lisääminen" : "Adding chat widget"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Kopioi JavaScript-koodi verkkosivustosi head-osioon"
                        : "Copy the JavaScript code to your website's head section"
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
                      {locale === "fi" ? "Ulkoasun mukauttaminen" : "Customizing appearance"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Muokkaa värejä, sijaintia ja tyyliä brändisi mukaan"
                        : "Modify colors, position, and style to match your brand"
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
                      {locale === "fi" ? "Käynnistysasetukset" : "Trigger settings"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Määritä milloin chat-widget avautuu (esim. 30s viive)"
                        : "Set when the chat widget opens (e.g., 30s delay)"
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Placeholder for website integration */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0-9H3" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  {locale === "fi" 
                    ? "Screenshot: Verkkosivuston integrointiasetukset"
                    : "Screenshot: Website integration settings"
                  }
                </p>
              </div>
            </div>

            {/* Popular integrations */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Suosituimmat integraatiot" : "Popular integrations"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Lyyli.ai integroituu helposti yleisimpiin liiketoimintatyökaluihin:"
                  : "Lyyli.ai integrates easily with the most common business tools:"
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "WordPress" : "WordPress"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === "fi" 
                      ? "Plugin-asennus ja automaattinen konfigurointi"
                      : "Plugin installation and automatic configuration"
                    }
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "Shopify" : "Shopify"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === "fi" 
                      ? "E-kaupan asiakastuki ja myyntiavustaja"
                      : "E-commerce customer support and sales assistant"
                    }
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "Salesforce" : "Salesforce"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === "fi" 
                      ? "CRM-tietojen synkronointi ja automaattinen päivitys"
                      : "CRM data synchronization and automatic updates"
                    }
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "Zendesk" : "Zendesk"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === "fi" 
                      ? "Tiketit ja asiakastuki integroituina"
                      : "Integrated tickets and customer support"
                    }
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "Slack" : "Slack"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === "fi" 
                      ? "Tiimin viestintä ja ilmoitukset"
                      : "Team communication and notifications"
                    }
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "Microsoft Teams" : "Microsoft Teams"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === "fi" 
                      ? "Yrityksen viestintä ja yhteistyö"
                      : "Enterprise communication and collaboration"
                    }
                  </p>
                </div>
              </div>

              {/* Placeholder for integrations dashboard */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-.758l1.102-1.101a4 4 0 00-5.656-5.656l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  {locale === "fi" 
                    ? "Screenshot: Integraatiokeskus ja yhteyshallinta"
                    : "Screenshot: Integration hub and connection management"
                  }
                </p>
              </div>
            </div>

            {/* API and customizations */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "API ja mukautukset" : "API and customizations"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Käytä Lyyli.ai API:a luodaksesi omia integraatioita ja mukautuksia:"
                  : "Use the Lyyli.ai API to create your own integrations and customizations:"
                }
              </p>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {locale === "fi" ? "API-avaimen hankkiminen" : "Getting API key"}
                </h3>
                <p className="text-gray-600 mb-3">
                  {locale === "fi" 
                    ? "API-avain löytyy Lyyli.ai dashboardista:"
                    : "API key can be found in your Lyyli.ai dashboard:"
                  }
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>{locale === "fi" ? "Mene Asetukset > API" : "Go to Settings > API"}</li>
                  <li>{locale === "fi" ? "Luo uusi API-avain" : "Create a new API key"}</li>
                  <li>{locale === "fi" ? "Määritä käyttöoikeudet ja rajoitukset" : "Set permissions and limitations"}</li>
                  <li>{locale === "fi" ? "Kopioi avain turvalliseen paikkaan" : "Copy the key to a secure location"}</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {locale === "fi" ? "Perus API-kutsu" : "Basic API call"}
                </h3>
                <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre>{`curl -X POST https://api.lyyli.ai/v1/chat \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "assistant_id": "your_assistant_id",
    "message": "Hello, how can you help me?",
    "user_id": "user_123"
  }'`}</pre>
                </div>
              </div>

              {/* Placeholder for API documentation */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  {locale === "fi" 
                    ? "Screenshot: API-dokumentaatio ja testikäyttöliittymä"
                    : "Screenshot: API documentation and testing interface"
                  }
                </p>
              </div>
            </div>

            {/* Data synchronization */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Tietojen synkronointi" : "Data synchronization"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Varmista, että tietosi pysyvät ajan tasalla kaikissa integraatioissa:"
                  : "Ensure your data stays up-to-date across all integrations:"
                }
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    A
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Automaattinen synkronointi" : "Automatic synchronization"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Tietojen päivitys reaaliajassa tai säännöllisin väliajoin"
                        : "Data updates in real-time or at regular intervals"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    B
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Manuaalinen synkronointi" : "Manual synchronization"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Tietojen päivitys tarvittaessa manuaalisesti"
                        : "Manual data updates when needed"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    C
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Synkronointiloki" : "Synchronization log"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Seuranta synkronointitapahtumista ja virheistä"
                        : "Tracking synchronization events and errors"
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Placeholder for sync settings */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  {locale === "fi" 
                    ? "Screenshot: Synkronointiasetukset ja loki"
                    : "Screenshot: Synchronization settings and log"
                  }
                </p>
              </div>
            </div>

            {/* Security and privacy */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Tietoturva ja yksityisyys" : "Security and privacy"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Kaikki integraatiot noudattavat tiukkoja tietoturva- ja yksityisyyttästandardejia:"
                  : "All integrations follow strict security and privacy standards:"
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">
                    {locale === "fi" ? "Salaus" : "Encryption"}
                  </h4>
                  <p className="text-sm text-green-700">
                    {locale === "fi" 
                      ? "Kaikki tiedot salataan TLS 1.3 -protokollalla"
                      : "All data encrypted with TLS 1.3 protocol"
                    }
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    {locale === "fi" ? "GDPR-yhteensopivuus" : "GDPR compliance"}
                  </h4>
                  <p className="text-sm text-blue-700">
                    {locale === "fi" 
                      ? "Täysi EU:n tietosuoja-asetuksen noudattaminen"
                      : "Full compliance with EU data protection regulation"
                    }
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">
                    {locale === "fi" ? "Käyttöoikeudet" : "Access control"}
                  </h4>
                  <p className="text-sm text-purple-700">
                    {locale === "fi" 
                      ? "Tarkat käyttöoikeudet ja roolipohjainen pääsy"
                      : "Granular permissions and role-based access"
                    }
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">
                    {locale === "fi" ? "Audit-loki" : "Audit log"}
                  </h4>
                  <p className="text-sm text-orange-700">
                    {locale === "fi" 
                      ? "Kaikki toimintojen kirjaaminen ja seuranta"
                      : "Complete logging and tracking of all activities"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Troubleshooting */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Yleisiä ongelmia ja ratkaisut" : "Common issues and solutions"}
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" 
                      ? "Ongelma: Integraatio ei toimi"
                      : "Issue: Integration not working"
                    }
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Ratkaisu: Tarkista API-avain, verkkosivuston URL ja SSL-sertifikaatti"
                      : "Solution: Check API key, website URL, and SSL certificate"
                    }
                  </p>
                </div>
                
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" 
                      ? "Ongelma: Tietojen synkronointi epäonnistuu"
                      : "Issue: Data synchronization fails"
                    }
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Ratkaisu: Tarkista verkkoyhteys, API-rajoitukset ja autentikaatio"
                      : "Solution: Check internet connection, API limits, and authentication"
                    }
                  </p>
                </div>
                
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" 
                      ? "Ongelma: Chat-widget ei näy"
                      : "Issue: Chat widget not visible"
                    }
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Ratkaisu: Tarkista JavaScript-koodi, CSS-konfliktit ja DOM-valmistuminen"
                      : "Solution: Check JavaScript code, CSS conflicts, and DOM readiness"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* What's next */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Mitä seuraavaksi?" : "What's next?"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href={`/${locale}/help/analytics`} className="group">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-forest hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 group-hover:text-forest">
                      {locale === "fi" ? "Analytiikka ja raportointi" : "Analytics and reporting"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {locale === "fi" 
                        ? "Seuraa integraatioidesi suorituskykyä"
                        : "Track your integrations' performance"
                      }
                    </p>
                  </div>
                </Link>
                <Link href={`/${locale}/help/security`} className="group">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-forest hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 group-hover:text-forest">
                      {locale === "fi" ? "Tietoturva ja yhteensopivuus" : "Security and compliance"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {locale === "fi" 
                        ? "Lisätietoja tietoturvasta ja GDPR:stä"
                        : "Learn more about security and GDPR"
                      }
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Need help */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Tarvitsetko apua?" : "Need help?"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Jos kohtaat ongelmia integraatioiden kanssa:"
                  : "If you encounter issues with integrations:"
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}/help/contact-support`}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-forest hover:bg-forest/90"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {locale === "fi" ? "Ota yhteyttä tukeen" : "Contact support"}
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
