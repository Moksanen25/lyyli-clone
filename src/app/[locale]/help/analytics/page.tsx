import { Metadata } from "next";
import { getTranslations } from "../../../../lib/i18n";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Analytics - Track Performance and Optimize Your AI Communications",
  description: "Learn how to use Lyyli.ai analytics to track performance, understand user behavior, and optimize your AI communications strategy.",
};

export default async function AnalyticsPage({
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
                    {locale === "fi" ? "Analytiikka" : "Analytics"}
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
                {locale === "fi" ? "25 min" : "25 min"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === "fi" 
                ? "Analytiikka ja raportointi"
                : "Analytics and reporting"
              }
            </h1>
            <p className="text-xl text-gray-600">
              {locale === "fi" 
                ? "Opi käyttämään Lyyli.ai analytiikkaa suorituskyvyn seurantaan, käyttäjien käyttäytymisen ymmärtämiseen ja viestintästrategian optimointiin"
                : "Learn how to use Lyyli.ai analytics to track performance, understand user behavior, and optimize your communications strategy."
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
                      ? "Avainmittareiden seuranta ja ymmärtäminen"
                      : "Tracking and understanding key metrics"
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === "fi" 
                      ? "Käyttäjien käyttäytymisen analysointi"
                      : "Analyzing user behavior patterns"
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === "fi" 
                      ? "Raporttien luominen ja jakaminen"
                      : "Creating and sharing reports"
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === "fi" 
                      ? "Strategian optimointi datan perusteella"
                      : "Data-driven strategy optimization"
                    }
                  </span>
                </li>
              </ul>
            </div>

            {/* Key metrics overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Avainmittareiden yleiskatsaus" : "Key metrics overview"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Seuraa näitä kriittisiä mittareita avustajiesi suorituskyvyn arvioimiseksi:"
                  : "Track these critical metrics to evaluate your assistants' performance:"
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    {locale === "fi" ? "Käyttäjätytyväisyys" : "User Satisfaction"}
                  </h4>
                  <p className="text-sm text-blue-700">
                    {locale === "fi" 
                      ? "Keskiarvo: 4.2/5.0 (parannus +0.3)"
                      : "Average: 4.2/5.0 (improvement +0.3)"
                    }
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">
                    {locale === "fi" ? "Vastausaika" : "Response Time"}
                  </h4>
                  <p className="text-sm text-green-700">
                    {locale === "fi" 
                      ? "Keskiarvo: 2.3s (parannus -0.8s)"
                      : "Average: 2.3s (improvement -0.8s)"
                    }
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">
                    {locale === "fi" ? "Ratkaisun tarkkuus" : "Resolution Accuracy"}
                  </h4>
                  <p className="text-sm text-purple-700">
                    {locale === "fi" 
                      ? "87% (parannus +5%)"
                      : "87% (improvement +5%)"
                    }
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">
                    {locale === "fi" ? "Käyttöaste" : "Usage Rate"}
                  </h4>
                  <p className="text-sm text-orange-700">
                    {locale === "fi" 
                      ? "1,247 keskustelua/viikko"
                      : "1,247 conversations/week"
                    }
                  </p>
                </div>
              </div>

              {/* Placeholder for metrics dashboard */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  {locale === "fi" 
                    ? "Screenshot: Avainmittareiden dashboard"
                    : "Screenshot: Key metrics dashboard"
                  }
                </p>
              </div>
            </div>

            {/* User behavior analysis */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Käyttäjien käyttäytymisen analysointi" : "User behavior analysis"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Ymmärrä miten käyttäjät käyttävät avustajiasi ja mitä he etsivät:"
                  : "Understand how users interact with your assistants and what they're looking for:"
                }
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Suosituimmat kysymykset" : "Most popular questions"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Tunnista yleisimmät kysymykset ja paranna niiden vastauksia"
                        : "Identify the most common questions and improve their answers"
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
                      {locale === "fi" ? "Keskustelujen kulku" : "Conversation flow"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Analysoi keskustelujen rakennetta ja tunnista parannuskohteet"
                        : "Analyze conversation structure and identify improvement areas"
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
                      {locale === "fi" ? "Käyttäjien segmentointi" : "User segmentation"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Ryhmittele käyttäjiä ja kohdista viestintää paremmin"
                        : "Group users and target communications more effectively"
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Placeholder for behavior analysis */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  {locale === "fi" 
                    ? "Screenshot: Käyttäjien käyttäytymisen analyysi"
                    : "Screenshot: User behavior analysis"
                  }
                </p>
              </div>
            </div>

            {/* Performance tracking */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Suorituskyvyn seuranta" : "Performance tracking"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Seuraa avustajiesi suorituskykyä ajan myötä ja tunnista trendejä:"
                  : "Track your assistants' performance over time and identify trends:"
                }
              </p>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {locale === "fi" ? "Aikasarja-analyysi" : "Time series analysis"}
                </h3>
                <p className="text-gray-600 mb-3">
                  {locale === "fi" 
                    ? "Seuraa mittareita päivittäin, viikoittain ja kuukausittain:"
                    : "Track metrics daily, weekly, and monthly:"
                  }
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>{locale === "fi" ? "Käyttäjätytyväisyyden kehitys" : "User satisfaction trends"}</li>
                  <li>{locale === "fi" ? "Vastausajan muutokset" : "Response time changes"}</li>
                  <li>{locale === "fi" ? "Käyttöasteen vaihtelut" : "Usage rate variations"}</li>
                  <li>{locale === "fi" ? "Kausivaihtelut ja trendit" : "Seasonal variations and trends"}</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {locale === "fi" ? "Vertailu ja benchmarking" : "Comparison and benchmarking"}
                </h3>
                <p className="text-gray-600 mb-3">
                  {locale === "fi" 
                    ? "Vertaa suorituskykyä eri avustajien ja ajanjaksojen välillä:"
                    : "Compare performance across different assistants and time periods:"
                  }
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>{locale === "fi" ? "Avustajien välinen vertailu" : "Inter-assistant comparison"}</li>
                  <li>{locale === "fi" ? "Aiempaan suorituskykyyn verrattuna" : "Comparison to previous performance"}</li>
                  <li>{locale === "fi" ? "Kohderyhmäkohtaiset mittarit" : "Target audience-specific metrics"}</li>
                  <li>{locale === "fi" ? "Kilpailijoiden vertailu (jos saatavilla)" : "Competitor comparison (if available)"}</li>
                </ul>
              </div>

              {/* Placeholder for performance charts */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  {locale === "fi" 
                    ? "Screenshot: Suorituskyvyn kaaviot ja aikasarjat"
                    : "Screenshot: Performance charts and time series"
                  }
                </p>
              </div>
            </div>

            {/* Report creation */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Raporttien luominen ja jakaminen" : "Creating and sharing reports"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Luo ammattimaisia raportteja ja jaa ne tiimisi kanssa:"
                  : "Create professional reports and share them with your team:"
                }
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold">
                    A
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Automaattiset raportit" : "Automated reports"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Aseta säännölliset raportit (päivittäin, viikoittain, kuukausittain)"
                        : "Set up regular reports (daily, weekly, monthly)"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold">
                    B
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Mukautetut raportit" : "Custom reports"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Luo raportteja tiettyihin mittareihin ja ajanjaksoihin"
                        : "Create reports for specific metrics and time periods"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold">
                    C
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Raporttien vienti" : "Report export"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Vie raportit PDF, Excel tai CSV-muodossa"
                        : "Export reports in PDF, Excel, or CSV format"
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Placeholder for report creation */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  {locale === "fi" 
                    ? "Screenshot: Raporttien luonti ja konfigurointi"
                    : "Screenshot: Report creation and configuration"
                  }
                </p>
              </div>
            </div>

            {/* Data-driven optimization */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Strategian optimointi datan perusteella" : "Data-driven strategy optimization"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Käytä analytiikkatietojasi parantaaksesi viestintästrategiaasi:"
                  : "Use your analytics data to improve your communications strategy:"
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "A/B-testaus" : "A/B testing"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === "fi" 
                      ? "Testaa eri vastausstrategioita ja valitse parhaat"
                      : "Test different response strategies and choose the best ones"
                    }
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "Kohdennettu koulutus" : "Targeted training"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === "fi" 
                      ? "Keskity koulutukseen heikoimmin toimiville alueille"
                      : "Focus training on areas with weakest performance"
                    }
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "Käyttäjäkokemuksen parantaminen" : "User experience improvement"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === "fi" 
                      ? "Optimoi käyttöliittymää käyttäjien palautteen perusteella"
                      : "Optimize interface based on user feedback"
                    }
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "Resurssien allokointi" : "Resource allocation"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === "fi" 
                      ? "Kohdista resursseja tehokkaimmin toimiviin avustajiin"
                      : "Allocate resources to most effective assistants"
                    }
                  </p>
                </div>
              </div>

              {/* Placeholder for optimization tools */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  {locale === "fi" 
                    ? "Screenshot: Optimointityökalut ja A/B-testaus"
                    : "Screenshot: Optimization tools and A/B testing"
                  }
                </p>
              </div>
            </div>

            {/* Best practices */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Parhaat käytännöt" : "Best practices"}
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-forest pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" ? "Säännöllinen seuranta" : "Regular monitoring"}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Tarkista analytiikkatiedot vähintään viikoittain"
                      : "Check analytics data at least weekly"
                    }
                  </p>
                </div>
                
                <div className="border-l-4 border-forest pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" ? "Tavoitteiden asettaminen" : "Goal setting"}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Aseta konkreettiset tavoitteet ja seuraa edistymistä"
                      : "Set concrete goals and track progress"
                    }
                  </p>
                </div>
                
                <div className="border-l-4 border-forest pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" ? "Tiimin yhteistyö" : "Team collaboration"}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Jaa raportteja tiimisi kanssa ja keskustele tuloksista"
                      : "Share reports with your team and discuss results"
                    }
                  </p>
                </div>
                
                <div className="border-l-4 border-forest pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" ? "Jatkuva parantaminen" : "Continuous improvement"}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Käytä dataa ohjaamaan jatkuvia parannuksia"
                      : "Use data to guide continuous improvements"
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
                <Link href={`/${locale}/help/ai-assistants`} className="group">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-forest hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 group-hover:text-forest">
                      {locale === "fi" ? "Avustajien hallinta" : "Assistant management"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {locale === "fi" 
                        ? "Käytä analytiikkaa avustajiesi parantamiseen"
                        : "Use analytics to improve your assistants"
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
                        ? "Varmista analytiikkatietojen tietoturva"
                        : "Ensure analytics data security"
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
                  ? "Jos kohtaat ongelmia analytiikan kanssa:"
                  : "If you encounter issues with analytics:"
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
