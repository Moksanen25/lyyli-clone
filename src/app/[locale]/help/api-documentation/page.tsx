import type { Metadata } from "next";
// import Link from "next/link";

export const metadata: Metadata = {
  title: "API Documentation - Integrate with Lyyli.ai",
  description: "Complete API documentation for developers to integrate Lyyli.ai services into their applications and workflows.",
};

export default async function APIDocumentationPage({
  params,
}: {
  params: Promise<{ locale: string }>;\n}): Promise<React.JSX.Element> {
}) {
  const { locale } = await params;

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
                    {locale === "fi" ? "API-dokumentaatio" : "API Documentation"}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#F7EBEB] to-[#A7D6D1]/20 border-b border-[#E5E5E4]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#2F5D50] text-white">
                {locale === 'fi' ? 'Edistynyt' : 'Advanced'}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#A7D6D1] text-[#2F5D50]">
                {locale === 'fi' ? '30 min' : '30 min'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2F5D50] mb-6 font-playfair leading-tight">
              {locale === 'fi'
                ? 'API-dokumentaatio'
                : 'API documentation'}
            </h1>
            <p className="text-xl text-[#333333] font-inter leading-relaxed">
              {locale === 'fi'
                ? 'Integrointi Lyylin API:n avulla. Täydellinen ohjeistus kehittäjille API-kutsujen tekemiseen, autentikaatioon ja rajapintojen hyödyntämiseen omissa sovelluksissasi.'
                : 'Integration using Lyyli API. Complete guide for developers on making API calls, authentication, and leveraging interfaces in your own applications.'}
            </p>
          </div>
        </div>
      </div>


      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Article Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                {locale === "fi" ? "Edistynyt" : "Advanced"}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {locale === "fi" ? "15 min" : "15 min"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === "fi" 
                ? "API-dokumentaatio"
                : "API Documentation"
              }
            </h1>
            <p className="text-xl text-gray-600">
              {locale === "fi" 
                ? "Integroi Lyyli.ai palvelut sovelluksiisi ja työprosesseihin"
                : "Integrate Lyyli.ai services into your applications and workflows."
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {locale === "fi" ? "Hanki API-avain" : "Get API Key"}
                </Link>
                <Link 
                  href={`/${locale}/contact`}
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-md border border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {locale === "fi" ? "SDK:n lataus" : "Download SDK"}
                </Link>
                <Link 
                  href={`/${locale}/contact`}
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-md border border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {locale === "fi" ? "Tuki" : "Support"}
                </Link>
              </div>
            </div>

            {/* API Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === "fi" ? "API:n yleiskatsaus" : "API Overview"}
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {locale === "fi" ? "REST API" : "REST API"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {locale === "fi"
                    ? "Lyyli.ai tarjoaa RESTful API:n, joka tukee JSON-muotoisia pyyntöjä ja vastauksia. Kaikki API-kutsut vaativat autentikaation."
                    : "Lyyli.ai provides a RESTful API that supports JSON-formatted requests and responses. All API calls require authentication."
                  }
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {locale === "fi" ? "HTTPS" : "HTTPS"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {locale === "fi" ? "Suojattu" : "Secure"}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">JSON</p>
                    <p className="text-xs text-gray-500">
                      {locale === "fi" ? "Muoto" : "Format"}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {locale === "fi" ? "OAuth 2.0" : "OAuth 2.0"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {locale === "fi" ? "Autentikaatio" : "Authentication"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Authentication */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === "fi" ? "Autentikaatio" : "Authentication"}
              </h2>
              
              <div className="space-y-6">
                {/* API Keys */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === "fi" ? "API-avaimet" : "API Keys"}
                  </h3>
                  
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {locale === "fi" ? "API-avaimen hankkiminen:" : "Getting an API key:"}
                    </h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                      <li>{locale === "fi" ? "Kirjaudu tiliisi" : "Log into your account"}</li>
                      <li>{locale === "fi" ? "Mene kehittäjäasetuksiin" : "Go to Developer Settings"}</li>
                      <li>{locale === "fi" ? "Klikkaa 'Luo API-avain'" : "Click 'Create API Key'"}</li>
                      <li>{locale === "fi" ? "Anna avaimelle nimi ja kuvaus" : "Give the key a name and description"}</li>
                      <li>{locale === "fi" ? "Kopioi avain turvallisesti" : "Copy the key securely"}</li>
                    </ol>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                    <h4 className="font-medium text-yellow-900 mb-2">
                      {locale === "fi" ? "Tärkeää:" : "Important:"}
                    </h4>
                    <p className="text-sm text-yellow-800">
                      {locale === "fi"
                        ? "API-avain on kuin salasana. Älä jaa sitä ja säilytä se turvallisesti. Jos avain vuotaa, poista se välittömästi."
                        : "An API key is like a password. Don't share it and store it securely. If a key is compromised, revoke it immediately."
                      }
                    </p>
                  </div>
                </div>

                {/* Usage in Headers */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === "fi" ? "Käyttö otsakkeissa" : "Usage in Headers"}
                  </h3>
                  
                  <div className="bg-gray-900 p-4 rounded-md text-green-400 font-mono text-sm">
                    <div className="mb-2">
                      <span className="text-gray-400">Authorization:</span> Bearer YOUR_API_KEY
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-400">Content-Type:</span> application/json
                    </div>
                    <div>
                      <span className="text-gray-400">Accept:</span> application/json
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-3">
                    {locale === "fi"
                      ? "Lisää Authorization-otsikko kaikkiin API-kutsuihin. API-avain tulee Bearer-tokenin muodossa."
                      : "Include the Authorization header in all API calls. The API key should be in Bearer token format."
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* API Endpoints */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === "fi" ? "API-päätepisteet" : "API Endpoints"}
              </h2>
              
              <div className="space-y-6">
                {/* Base URL */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {locale === "fi" ? "Perus-URL:" : "Base URL:"}
                  </h3>
                  <code className="bg-gray-800 text-green-400 px-3 py-1 rounded text-sm">
                    https://api.lyyli.ai/v1
                  </code>
                </div>

                {/* Endpoints List */}
                <div className="grid grid-cols-1 gap-4">
                  {/* Assistants */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {locale === "fi" ? "Avustajat" : "Assistants"}
                      </h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {locale === "fi" ? "Hallinta" : "Management"}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-3">GET</span>
                        <code className="text-gray-700">/assistants</code>
                        <span className="text-gray-500 ml-2">
                          {locale === "fi" ? "Listaa avustajat" : "List assistants"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono mr-3">POST</span>
                        <code className="text-gray-700">/assistants</code>
                        <span className="text-gray-500 ml-2">
                          {locale === "fi" ? "Luo avustaja" : "Create assistant"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-mono mr-3">PUT</span>
                        <code className="text-gray-700">/assistants/{'{id}'}</code>
                        <span className="text-gray-500 ml-2">
                          {locale === "fi" ? "Päivitä avustaja" : "Update assistant"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Conversations */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {locale === "fi" ? "Keskustelut" : "Conversations"}
                      </h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {locale === "fi" ? "Viestintä" : "Communication"}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-3">GET</span>
                        <code className="text-gray-700">/conversations</code>
                        <span className="text-gray-500 ml-2">
                          {locale === "fi" ? "Listaa keskustelut" : "List conversations"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono mr-3">POST</span>
                        <code className="text-gray-700">/conversations/{'{id}'}/messages</code>
                        <span className="text-gray-500 ml-2">
                          {locale === "fi" ? "Lähetä viesti" : "Send message"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {locale === "fi" ? "Analytiikka" : "Analytics"}
                      </h3>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        {locale === "fi" ? "Tiedot" : "Data"}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-3">GET</span>
                        <code className="text-gray-700">/analytics/usage</code>
                        <span className="text-gray-500 ml-2">
                          {locale === "fi" ? "Käyttötiedot" : "Usage data"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-3">GET</span>
                        <code className="text-gray-700">/analytics/performance</code>
                        <span className="text-gray-500 ml-2">
                          {locale === "fi" ? "Suorituskyky" : "Performance"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Examples */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === "fi" ? "Koodiesimerkit" : "Code Examples"}
              </h2>
              
              <div className="space-y-6">
                {/* JavaScript/Node.js */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    JavaScript / Node.js
                  </h3>
                  
                  <div className="bg-gray-900 p-4 rounded-md text-green-400 font-mono text-sm">
                    <div className="mb-2">
                      <span className="text-blue-400">const</span> <span className="text-yellow-400">response</span> = <span className="text-blue-400">await</span> <span className="text-green-400">fetch</span>(<span className="text-orange-400">'https://api.lyyli.ai/v1/assistants'</span>, {'{'}</div>
                    <div className="ml-4 mb-2">
                      <span className="text-blue-400">method:</span> <span className="text-orange-400">'GET'</span>,</div>
                    <div className="ml-4 mb-2">
                      <span className="text-blue-400">headers:</span> {'{'}</div>
                    <div className="ml-8 mb-2">
                      <span className="text-blue-400">'Authorization':</span> <span className="text-orange-400">'Bearer YOUR_API_KEY'</span>,</div>
                    <div className="ml-8 mb-2">
                      <span className="text-blue-400">'Content-Type':</span> <span className="text-orange-400">'application/json'</span></div>
                    <div className="ml-4 mb-2">
                      {'}'}</div>
                    <div className="mb-2">
                      {'}'});</div>
                    <div className="mb-2">
                      <span className="text-blue-400">const</span> <span className="text-yellow-400">data</span> = <span className="text-blue-400">await</span> response.<span className="text-green-400">json</span>();</div>
                  </div>
                </div>

                {/* Python */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Python
                  </h3>
                  
                  <div className="bg-gray-900 p-4 rounded-md text-green-400 font-mono text-sm">
                    <div className="mb-2">
                      <span className="text-blue-400">import</span> <span className="text-yellow-400">requests</span></div>
                    <div className="mb-2" />
                    <div className="mb-2">
                      <span className="text-yellow-400">headers</span> = {'{'}</div>
                    <div className="ml-4 mb-2">
                      <span className="text-orange-400">'Authorization'</span>: <span className="text-orange-400">'Bearer YOUR_API_KEY'</span>,</div>
                    <div className="ml-4 mb-2">
                      <span className="text-orange-400">'Content-Type'</span>: <span className="text-orange-400">'application/json'</span></div>
                    <div className="mb-2">
                      {'}'}</div>
                    <div className="mb-2" />
                    <div className="mb-2">
                      <span className="text-yellow-400">response</span> = requests.<span className="text-green-400">get</span>(</div>
                    <div className="ml-4 mb-2">
                      <span className="text-orange-400">'https://api.lyyli.ai/v1/assistants'</span>,</div>
                    <div className="ml-4 mb-2">
                      <span className="text-blue-400">headers</span>=<span className="text-yellow-400">headers</span></div>
                    <div className="mb-2">
                      )</div>
                    <div className="mb-2">
                      <span className="text-yellow-400">data</span> = response.<span className="text-green-400">json</span>()</div>
                  </div>
                </div>

                {/* cURL */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    cURL
                  </h3>
                  
                  <div className="bg-gray-900 p-4 rounded-md text-green-400 font-mono text-sm">
                    <div className="mb-2">
                      <span className="text-blue-400">curl</span> -X <span className="text-orange-400">GET</span> \</div>
                    <div className="ml-4 mb-2">
                      -H <span className="text-orange-400">"Authorization: Bearer YOUR_API_KEY"</span> \</div>
                    <div className="ml-4 mb-2">
                      -H <span className="text-orange-400">"Content-Type: application/json"</span> \</div>
                    <div className="ml-4 mb-2">
                      <span className="text-orange-400">"https://api.lyyli.ai/v1/assistants"</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rate Limiting */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === "fi" ? "Nopeusrajoitukset" : "Rate Limiting"}
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {locale === "fi" ? "Vapaa suunnitelma" : "Free Plan"}
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• {locale === "fi" ? "100 pyyntöä/tunti" : "100 requests/hour"}</li>
                      <li>• {locale === "fi" ? "Perusominaisuudet" : "Basic features"}</li>
                      <li>• {locale === "fi" ? "Yhteisö-tuki" : "Community support"}</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {locale === "fi" ? "Pro-suunnitelma" : "Pro Plan"}
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• {locale === "fi" ? "1000 pyyntöä/tunti" : "1000 requests/hour"}</li>
                      <li>• {locale === "fi" ? "Kaikki ominaisuudet" : "All features"}</li>
                      <li>• {locale === "fi" ? "Prioriteettituki" : "Priority support"}</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">
                    {locale === "fi" ? "Nopeusrajoituksen hallinta:" : "Rate limit handling:"}
                  </h4>
                  <p className="text-sm text-blue-800">
                    {locale === "fi"
                      ? "Kun saavutat nopeusrajoituksen, API palauttaa 429-statuskoodin. Suosittelemme eksponentiaalista takaisinyritystä."
                      : "When you hit rate limits, the API returns a 429 status code. We recommend implementing exponential backoff."
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Error Handling */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === "fi" ? "Virheiden käsittely" : "Error Handling"}
              </h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "Yleisimmät HTTP-statuskoodit:" : "Common HTTP status codes:"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="w-16 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">200</span>
                        <span className="ml-2 text-gray-700">OK</span>
                      </div>
                      <div className="flex items-center mb-1">
                        <span className="w-16 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">201</span>
                        <span className="ml-2 text-gray-700">Created</span>
                      </div>
                      <div className="flex items-center mb-1">
                        <span className="w-16 bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">204</span>
                        <span className="ml-2 text-gray-700">No Content</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="w-16 bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-mono">400</span>
                        <span className="ml-2 text-gray-700">Bad Request</span>
                      </div>
                      <div className="flex items-center mb-1">
                        <span className="w-16 bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-mono">401</span>
                        <span className="ml-2 text-gray-700">Unauthorized</span>
                      </div>
                      <div className="flex items-center mb-1">
                        <span className="w-16 bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-mono">429</span>
                        <span className="ml-2 text-gray-700">Too Many Requests</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "Virheviestin rakenne:" : "Error message structure:"}
                  </h3>
                  <div className="bg-gray-900 p-4 rounded-md text-green-400 font-mono text-sm">
                    <div>{'{'}</div>
                    <div className="ml-4">
                      <span className="text-blue-400">"error":</span> {'{'}</div>
                    <div className="ml-8">
                      <span className="text-blue-400">"code":</span> <span className="text-orange-400">"rate_limit_exceeded"</span>,</div>
                    <div className="ml-8">
                      <span className="text-blue-400">"message":</span> <span className="text-orange-400">"Rate limit exceeded"</span>,</div>
                    <div className="ml-8">
                      <span className="text-blue-400">"retry_after":</span> <span className="text-orange-400">3600</span></div>
                    <div className="ml-4">{'}'}</div>
                    <div>{'}'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* SDKs and Libraries */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === "fi" ? "SDK:t ja kirjastot" : "SDKs and Libraries"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === "fi" ? "Viralliset SDK:t" : "Official SDKs"}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">JavaScript/Node.js</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">Python</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">PHP</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === "fi" ? "Yhteisön kirjastot" : "Community Libraries"}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">Ruby</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">Go</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">Java</span>
                    </li>
                  </ul>
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
                  ? "Jos sinulla on kysymyksiä API:n käytöstä tai tarvitset teknisen tukea, ota yhteyttä kehittäjätiimiimme."
                  : "If you have questions about using the API or need technical support, contact our developer team."
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
                  href={`/${locale}/help/integrations`}
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-.758l1.102-1.101a4 4 0 00-5.656-5.656l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                  </svg>
                  {locale === "fi" ? "Integraatiot" : "Integrations"}
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
