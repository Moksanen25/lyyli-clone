import { TranslationKeys } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";

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
}: BlogPostCardProps) {
  // Format date
  const publishedDate = new Date(post.date).toLocaleDateString(
    locale === "fi" ? "fi-FI" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {post.image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-primary-50 text-primary-600 text-sm font-medium rounded-full">
            {(t as unknown as Record<string, string>)[
              `blog.categories.${post.category.toLowerCase()}`
            ] || post.category}
          </span>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-darkGray mb-2 group-hover:text-forest transition-colors font-playfair font-bold leading-normal">
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

          <Link
            href={`/${locale}/blog/${post.slug}`}
            className="text-forest hover:text-forest/80 font-medium text-sm group-hover:underline transition-all font-sans"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
