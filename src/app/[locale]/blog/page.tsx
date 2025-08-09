import { getTranslations } from '../../../lib/i18n';
import { getAllBlogPosts } from '../../../lib/blog';
import { Metadata } from 'next';
import BlogPostCard from '../../../components/blog/BlogPostCard';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);
  
  const baseUrl = 'https://lyyli.ai';
  const canonicalUrl = `${baseUrl}/${locale}/blog`;
  
  // Primary and secondary keywords for SEO
  const keywords = [
    'AI communication assistant for professional service organizations',
    'internal communication coordination',
    'enterprise-grade security',
    'GDPR compliant',
    'expert team communication',
    'professional service automation',
    'multilingual communication tools',
    'audit trail communication',
    'compliance communication',
    'secure team messaging'
  ].join(', ');
  
  return {
    title: t['blog.page.title'],
    description: t['blog.page.description'],
    keywords,
    openGraph: {
      title: t['blog.page.title'],
      description: t['blog.page.description'],
      url: canonicalUrl,
      siteName: 'Lyyli.ai',
      locale: locale === 'fi' ? 'fi_FI' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t['blog.page.title'],
      description: t['blog.page.description'],
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
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(locale) ? locale : 'en';
  
  const t = getTranslations(currentLocale);
  const posts = getAllBlogPosts(currentLocale);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="heading-1 mb-6">
            {t['blog.hero.title']}
          </h1>
          <p className="body-large mb-12 text-medium-gray max-w-3xl mx-auto">
            {t['blog.hero.subtitle']}
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="max-w-7xl mx-auto px-6 pb-16 lg:pb-24">
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} locale={currentLocale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <div className="text-6xl mb-8" aria-hidden="true">📝</div>
              <h2 className="heading-2 mb-4 text-forest-green">
                {t['blog.empty.title']}
              </h2>
              <p className="body-large text-medium-gray">
                {t['blog.empty.description']}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-forest-green text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="heading-2 mb-4 text-white">
            {t['cta.title']}
          </h2>
          <p className="body-large mb-8 text-white opacity-90">
            {t['cta.description']}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/demo" 
              className="bg-white text-forest-green px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors font-medium inline-flex items-center justify-center gap-2"
              aria-label="Book a demo of Lyyli.ai"
            >
              {t['cta.button']}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </a>
            <a 
              href="/contact" 
              className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-forest-green transition-colors font-medium inline-flex items-center justify-center"
              aria-label="Contact Lyyli.ai sales team"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
