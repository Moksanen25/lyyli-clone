import type { ReactElement } from 'react';
import type { TranslationKeys } from '@/lib/i18n';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: number;
  date: string;
  image?: string;
}

interface BlogPostCardProps {
  post: BlogPost;
  locale: string;
  translations: TranslationKeys;
}

export default function BlogPostCard({
  post,
  locale,
  translations: t,
}: BlogPostCardProps): ReactElement {
  // Format date with error handling
  let publishedDate = '';
  try {
    const dateObj = new Date(post.date);
    if (!isNaN(dateObj.getTime())) {
      publishedDate = dateObj.toLocaleDateString(
        locale === 'fi' ? 'fi-FI' : 'en-US',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
      );
    }
  } catch (error) {
    console.error('Error formatting date:', error);
  }

  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-2xl"
    >
      <article className="relative bg-white rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 ease-out overflow-hidden border border-gray-200">
        {/* Spotlight hover overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              'radial-gradient(600px 200px at 50% 0%, rgba(167,214,209,0.12), rgba(255,255,255,0))',
          }}
        />

        {post.image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
              loading="lazy"
            />
          </div>
        )}

        <div className="p-6 relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-turquoise text-white">
              {(t as unknown as Record<string, string>)[
                `blog.categories.${post.category.toLowerCase()}`
              ] || post.category}
            </span>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-playfair font-bold text-forest mb-2 group-hover:text-forest/90 transition-colors duration-300 ease-out leading-normal">
              {post.title}
            </h2>
            <p className="text-base text-mediumGray mb-4 line-clamp-3 font-sans leading-relaxed">
              {post.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-mediumGray font-sans">
              <time dateTime={post.date}>{publishedDate}</time>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>
            <span className="text-forest font-medium text-sm group-hover:underline transition-all duration-300 ease-out font-sans">
              {(t as unknown as Record<string, string>)['common.readMore'] ||
                'Read more'}{' '}
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
