import Link from 'next/link';
import { BlogPostMetadata } from '@/lib/blog';

interface RelatedPostsProps {
  posts: BlogPostMetadata[];
  currentPostSlug: string;
  locale: string;
  maxPosts?: number;
  className?: string;
}

export default function RelatedPosts({ 
  posts, 
  currentPostSlug, 
  locale, 
  maxPosts = 3,
  className = '' 
}: RelatedPostsProps) {
  // Translations moved to inline text to avoid client-side hook in server component
  const title = locale === 'fi' ? 'Lue myös' : 'Related Articles';
  const subtitle = locale === 'fi' ? 'Tutustu myös näihin artikkeleihin' : 'Explore more insights from our blog';
  const readMore = locale === 'fi' ? 'Lue artikkeli' : 'Read article';
  const readTime = locale === 'fi' ? 'min luku' : 'min read';
  
  // Filter out current post and get related posts
  const relatedPosts = posts
    .filter(post => post.slug !== currentPostSlug)
    .slice(0, maxPosts);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className={`bg-gray-50 py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-playfair font-bold text-forest mb-4">
            {title}
          </h2>
          <p className="text-mediumGray max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <Link 
                href={`/${locale}/blog/${post.slug}`}
                className="block group"
              >
                {post.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-mediumGray mb-3">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(
                        locale === 'fi' ? 'fi-FI' : 'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </time>
                    <span>•</span>
                    <span>{post.readTime} {locale === 'fi' ? 'min' : 'min read'}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-forest mb-3 group-hover:text-turquoise transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-mediumGray text-sm line-clamp-3 mb-4">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-forest/10 text-forest">
                      {post.category}
                    </span>
                    <span className="text-sm text-turquoise group-hover:text-forest transition-colors duration-200">
                      {locale === 'fi' ? 'Lue lisää' : 'Read more'} →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
        
        {/* Link to blog archive */}
        <div className="text-center mt-8">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center px-6 py-3 bg-forest text-white rounded-lg hover:bg-forest/90 transition-colors duration-200 font-medium"
          >
            {locale === 'fi' ? 'Katso kaikki kirjoitukset' : 'View all posts'}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
