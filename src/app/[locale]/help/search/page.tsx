import type { Metadata } from "next";
import { getTranslations } from "@/lib/i18n";
import { searchHelpArticles } from "@/lib/helpSearchData";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { generatePageBreadcrumbs, generateBreadcrumbSchema } from "@/lib/breadcrumb-schema";

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { locale: _locale } = await params;
  const { q } = await searchParams;
  const query = Array.isArray(q) ? q[0] : q || '';
  
  const title = query 
    ? `${query} - Search Results | Help`
    : 'Search Results | Help';
  
  const description = query
    ? `Search results for "${query}" in Lyyli.ai help center`
    : 'Search the Lyyli.ai help center for guides and support';

  return {
    title,
    description,
    robots: {
      index: false, // Don't index search result pages
      follow: false,
    },
  };
}

export default async function SearchPage({
  params,
  searchParams,
}: SearchPageProps) {
  const { locale } = await params;
  const { q } = await searchParams;
  const query = Array.isArray(q) ? q[0] : q || '';
  
  const _t = await getTranslations(locale);
  
  // Search for articles
  const results = query ? searchHelpArticles(query, locale) : [];
  
  // Generate breadcrumbs
  const breadcrumbItems = generatePageBreadcrumbs(
    locale === "fi" ? "Hakutulokset" : "Search Results",
    locale,
    [
      { title: locale === "fi" ? "Apu" : "Help", href: `/${locale}/help` },
      { title: locale === "fi" ? "Hakutulokset" : "Search Results", href: `/${locale}/help/search` }
    ]
  );
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    if (locale === 'fi') {
      switch (difficulty) {
        case 'beginner': return 'Aloittelija';
        case 'intermediate': return 'Keskitaso';
        case 'advanced': return 'Edistynyt';
        default: return difficulty;
      }
    }
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      {/* Breadcrumbs */}
      <div className="hidden container mx-auto px-4 pt-32 pb-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      
      {/* Search Results Header */}
      <div className="relative z-10">
        <section 
          className="container mx-auto px-4 py-12 relative overflow-hidden"
          aria-label="Search Results"
        >
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-3xl font-bold text-forest mb-4 font-playfair font-bold leading-tight">
              {locale === "fi" ? "Hakutulokset" : "Search Results"}
            </h1>
            
            {query && (
              <p className="text-lg text-mediumGray mb-8 font-sans leading-relaxed">
                {locale === "fi" 
                  ? `Hakutulokset sanalle "${query}" (${results.length} tulosta)`
                  : `Search results for "${query}" (${results.length} results)`
                }
              </p>
            )}
            
            {/* Search Form */}
            <form 
              method="GET" 
              action={`/${locale}/help/search`}
              className="mb-8"
            >
              <div className="flex gap-2 max-w-2xl">
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder={locale === "fi" ? "Etsi apua..." : "Search for help..."}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-forest text-white rounded-lg hover:bg-forest/90 transition-colors font-medium"
                >
                  {locale === "fi" ? "Hae" : "Search"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* Search Results */}
      <div className="bg-gradient-to-br from-rose/5 to-turquoise/5 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6">
          {query ? (
            results.length > 0 ? (
              <div className="space-y-6">
                {results.map((article) => (
                  <Link
                    key={article.id}
                    href={`/${locale}${article.url}`}
                    className="block bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-forest group-hover:text-forest/80 transition-colors font-playfair font-bold leading-tight">
                            {locale === "fi" ? article.titleFi : article.title}
                          </h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                            {getDifficultyText(article.difficulty)}
                          </span>
                          <span className="text-sm text-gray-500">
                            {locale === "fi" ? article.timeToCompleteFi : article.timeToComplete}
                          </span>
                        </div>
                        
                        <p className="text-mediumGray mb-3 font-sans leading-relaxed">
                          {locale === "fi" ? article.summaryFi : article.summary}
                        </p>
                        
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-forest">
                            {locale === "fi" ? article.categoryFi : article.category}
                          </span>
                          <div className="flex gap-2">
                            {(locale === "fi" ? article.tagsFi : article.tags).slice(0, 4).map((tag, tagIndex) => (
                              <span key={tagIndex} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <svg className="w-6 h-6 text-mediumGray group-hover:text-forest transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="max-w-2xl mx-auto px-6">
                  <svg className="mx-auto h-16 w-16 text-mediumGray mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h2 className="text-2xl font-semibold text-forest mb-4 font-playfair font-bold leading-tight">
                    {locale === "fi" ? "Ei hakutuloksia" : "No search results"}
                  </h2>
                  <p className="text-mediumGray mb-6 font-sans leading-relaxed">
                    {locale === "fi" 
                      ? `Emme löytäneet tuloksia sanalle "${query}". Kokeile eri hakusanoja tai selaa suosituimpia aiheita.`
                      : `We couldn't find any results for "${query}". Try different keywords or browse our popular topics.`
                    }
                  </p>
                  <Link 
                    href={`/${locale}/help`}
                    className="inline-flex items-center px-6 py-3 bg-forest text-white rounded-lg hover:bg-forest/90 transition-colors font-medium"
                  >
                    {locale === "fi" ? "Selaa aiheita" : "Browse Topics"}
                  </Link>
                </div>
              </div>
            )
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="max-w-2xl mx-auto px-6">
                <svg className="mx-auto h-16 w-16 text-mediumGray mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h2 className="text-2xl font-semibold text-forest mb-4 font-playfair font-bold leading-tight">
                  {locale === "fi" ? "Etsi apua" : "Search for help"}
                </h2>
                <p className="text-mediumGray mb-6 font-sans leading-relaxed">
                  {locale === "fi" 
                    ? "Käytä hakukenttää löytääksesi vastauksia ja oppaita."
                    : "Use the search box above to find answers and guides."
                  }
                </p>
                <Link 
                  href={`/${locale}/help`}
                  className="inline-flex items-center px-6 py-3 bg-forest text-white rounded-lg hover:bg-forest/90 transition-colors font-medium"
                >
                  {locale === "fi" ? "Palaa apuun" : "Back to Help"}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
