import { BlogPostMetadata } from '../../lib/blog';
import { getTranslations } from '../../lib/i18n';
import Link from 'next/link';

interface BlogPostCardProps {
  post: BlogPostMetadata;
  locale: string;
}

export default function BlogPostCard({ post, locale }: BlogPostCardProps) {
  const t = getTranslations(locale);
  
  // Format date
  const publishedDate = new Date(post.date).toLocaleDateString(
    locale === 'fi' ? 'fi-FI' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  return (
    <article className="bg-white rounded-lg shadow-soft hover:shadow-medium transition-shadow overflow-hidden">
      {post.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.image}
            alt={post.imageAlt || post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="mb-4">
          <span className="inline-block bg-forest-green text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
            {t[`blog.categories.${post.category.toLowerCase()}` as keyof typeof t] || post.category}
          </span>
          <h2 className="heading-3 mb-2 text-forest-green">
            <Link 
              href={`/${locale}/blog/${post.slug}`}
              className="hover:text-muted-turquoise transition-colors"
            >
              {post.title}
            </Link>
          </h2>
          <p className="body-text text-medium-gray mb-4 line-clamp-3">
            {post.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-medium-gray">
            <time dateTime={post.date}>
              {publishedDate}
            </time>
            <span>•</span>
            <span>{post.readTime} {t['blog.post.readTime']}</span>
          </div>
          
          <Link 
            href={`/${locale}/blog/${post.slug}`}
            className="text-forest-green hover:text-muted-turquoise transition-colors font-medium text-sm"
            aria-label={`Read more about ${post.title}`}
          >
            {t['blog.post.readMore']} →
          </Link>
        </div>
      </div>
    </article>
  );
}
