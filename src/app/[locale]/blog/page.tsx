import { getTranslations } from '@/lib/i18n';
import { getAllBlogPosts } from '@/lib/blog';
import {
  getPaginatedPosts,
  POSTS_PER_PAGE,
  generatePaginationStructuredData,
} from '@/lib/pagination';
import type { Metadata } from 'next';
import BlogPostCard from '@/components/blog/BlogPostCard';
import Pagination from '@/components/blog/Pagination';
import {
  generatePageCanonicalUrl,
  generateHreflangMetadata,
} from '@/lib/canonical';
import { buildTitleFromTranslation } from '@/lib/title';

export const revalidate = 3600; // ISR: revalidate blog listing hourly

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

  const canonicalUrl = generatePageCanonicalUrl('blog', locale);

  // Primary and secondary keywords for SEO
  const keywords = [
    'AI communication assistant for professional service organizations',
    'internal communication coordination',
    'enterprise-grade security',
    'GDPR compliant',
    'professional service automation',
    'multilingual communication tools',
    'audit trail communication',
    'compliance communication',
    'secure team messaging',
  ].join(', ');

  return {
    title: buildTitleFromTranslation(t['blog.page.title'], 'Blog'),
    description: t['blog.page.description'],
    keywords,
    openGraph: {
      title: t['blog.page.title'],
      description: t['blog.page.description'],
      url: canonicalUrl,
      siteName: 'Lyyli.ai',
      locale: locale === 'fi' ? 'fi_FI' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/social/Social_share_blog_LyyliAI.webp',
          width: 1200,
          height: 630,
          alt: t['blog.page.title'],
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t['blog.page.title'],
      description: t['blog.page.description'],
      images: ['/images/social/Social_share_blog_LyyliAI.webp'],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangMetadata('/blog', ['en', 'fi']),
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(locale) ? locale : 'en';

  const t = await getTranslations(currentLocale);

  // Safely get blog posts with error handling
  let allPosts: ReturnType<typeof getAllBlogPosts> = [];
  try {
    allPosts = getAllBlogPosts(currentLocale);
  } catch (error) {
    console.error('Error loading blog posts:', error);
    allPosts = [];
  }

  // Get paginated posts for page 1
  const { posts, pagination } = getPaginatedPosts(allPosts, 1, POSTS_PER_PAGE);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative z-10 pt-32">
        <section
          className="container mx-auto px-4 py-20 relative overflow-hidden"
          aria-label="Hero"
        >
          {/* Animated Hero Visual */}

          <div className="text-center max-w-4xl mx-auto relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-forest/20 mb-6 backdrop-blur-sm">
              <span className="text-sm font-medium text-forest">
                {t['blog.tagline'] || 'Latest insights'}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl mb-6 font-playfair font-normal leading-[1.2] text-forest">
              {t['blog.title']}
            </h1>
            <p className="text-lg mb-12 text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t['blog.hero.subtitle']}
            </p>
          </div>
        </section>
      </div>

      {/* Blog Posts */}
      <section className="max-w-7xl mx-auto px-6 pb-16 lg:pb-24">
        {/* Structured Data for Pagination */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generatePaginationStructuredData(
                `/${currentLocale}/blog`,
                pagination,
                posts,
                currentLocale
              )
            ),
          }}
        />

        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {posts.map(post => (
                <BlogPostCard
                  key={post.slug}
                  post={post}
                  locale={currentLocale}
                  translations={t}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16">
              <Pagination
                pagination={pagination}
                basePath={`/${currentLocale}/blog`}
                locale={currentLocale}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <div className="text-6xl mb-8" aria-hidden="true">
                <svg
                  className="w-24 h-24 mx-auto text-forest"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-forest mb-4 font-playfair font-bold leading-tight">
                {t['blog.noPosts.title']}
              </h2>
              <p className="text-mediumGray font-sans leading-relaxed">
                {t['blog.noPosts.description']}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
