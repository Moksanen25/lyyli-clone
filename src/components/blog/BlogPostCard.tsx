import type { TranslationKeys } from "@/lib/i18n";
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
  // Format date with error handling
  let publishedDate = '';
  try {
    const dateObj = new Date(post.date);
    if (!isNaN(dateObj.getTime())) {
      publishedDate = dateObj.toLocaleDateString(
        locale === "fi" ? "fi-FI" : "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      );
    }
  } catch (error) {
    console.error("Error formatting date:", error);
  }

  return (
    <article className="bg-white rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 ease-out overflow-hidden group border border-gray-200">
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

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-rose text-forest text-sm font-medium rounded-full border border-forest/20">
            {(t as unknown as Record<string, string>)[
              `blog.categories.${post.category.toLowerCase()}`
            ] || post.category}
          </span>
        </div>

        <div className="mb-4">
          <Link href={`/${locale}/blog/${post.slug}`} className="block group">
            <h2 className="text-xl font-playfair font-bold text-forest mb-2 group-hover:text-turquoise transition-colors duration-300 ease-out leading-normal cursor-pointer">
              {post.title}
            </h2>
          </Link>
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
            className="text-forest hover:text-forest/80 font-medium text-sm group-hover:underline transition-all duration-300 ease-out font-sans"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
