import { getTranslations } from "@/lib/i18n";
import { getAllBlogPosts } from "@/lib/blog";
import { Metadata } from "next";
import BlogPostCard from "@/components/blog/BlogPostCard";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

  const baseUrl = "https://lyyli.ai";
  const canonicalUrl = `${baseUrl}/${locale}/blog`;

  // Primary and secondary keywords for SEO
  const keywords = [
    "AI communication assistant for professional service organizations",
    "internal communication coordination",
    "enterprise-grade security",
    "GDPR compliant",
    "professional service automation",
    "multilingual communication tools",
    "audit trail communication",
    "compliance communication",
    "secure team messaging",
  ].join(", ");

  return {
    title: t["blog.page.title"],
    description: t["blog.page.description"],
    keywords,
    openGraph: {
      title: t["blog.page.title"],
      description: t["blog.page.description"],
      url: canonicalUrl,
      siteName: "Lyyli.ai",
      locale: locale === "fi" ? "fi_FI" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t["blog.page.title"],
      description: t["blog.page.description"],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/blog`,
        fi: `${baseUrl}/fi/blog`,
      },
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const supportedLocales = ["en", "fi"];
  const currentLocale = supportedLocales.includes(locale) ? locale : "en";

  const t = await getTranslations(currentLocale);
  const posts = getAllBlogPosts(currentLocale);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative z-10 pt-32">
        <section 
          className="container mx-auto px-4 py-20 relative overflow-hidden"
          aria-label="Hero"
        >
          {/* Animated Hero Visual */}
          
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1 className="text-3xl md:text-4xl mb-6 font-playfair font-normal leading-tight text-forest">
              {t["blog.title"]}
            </h1>
            <p className="text-lg mb-12 text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t["blog.hero.subtitle"]}
            </p>
          </div>
        </section>
      </div>

      {/* Blog Posts */}
      <section className="max-w-7xl mx-auto px-6 pb-16 lg:pb-24">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {posts.map((post) => (
              <BlogPostCard
                key={post.slug}
                post={post}
                locale={currentLocale}
                translations={t}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <div className="text-6xl mb-8" aria-hidden="true">
                <svg className="w-24 h-24 mx-auto text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-forest mb-4 font-playfair font-normal leading-tight">
                {t["blog.noPosts.title"]}
              </h2>
              <p className="text-mediumGray font-sans leading-relaxed">
                {t["blog.noPosts.description"]}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
