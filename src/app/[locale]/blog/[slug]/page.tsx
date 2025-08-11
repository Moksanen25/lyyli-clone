import {
  getBlogPost,
  getAllBlogSlugs,
  generateBlogMetadata,
} from "../../../../lib/blog";
import { getTranslations } from "../../../../lib/i18n";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import remarkGfm from "remark-gfm";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((item) => ({
    locale: item.locale,
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const supportedLocales = ["en", "fi"];
  const currentLocale = supportedLocales.includes(locale) ? locale : "en";

  const post = getBlogPost(slug, currentLocale);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return generateBlogMetadata(post, locale);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const supportedLocales = ["en", "fi"];
  const currentLocale = supportedLocales.includes(locale) ? locale : "en";

  const post = getBlogPost(slug, currentLocale);

  if (!post) {
    notFound();
  }

  const t = await getTranslations(currentLocale);

  // Format date
  const publishedDate = new Date(post.date).toLocaleDateString(
    currentLocale === "fi" ? "fi-FI" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <article className="bg-white">
      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
        <div className="mb-8">
          <Link
            href={`/${currentLocale}/blog`}
            className="inline-flex items-center text-forest-green hover:text-muted-turquoise transition-colors"
          >
            {t["blog.post.backToBlog"]}
          </Link>
        </div>

        <div className="mb-8">
          <span className="inline-block bg-forest-green text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
            {(t[
              `blog.categories.${post.category.toLowerCase()}` as keyof typeof t
            ] as string) || post.category}
          </span>
          <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-forest mb-4">{post.title}</h1>
          <p className="text-lg text-mediumGray mb-6">{post.description}</p>
          <div className="flex items-center gap-4 text-sm text-mediumGray">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>
              {t["blog.post.publishedOn"]} {publishedDate}
            </time>
            <span>•</span>
            <span>
              {post.readTime} {t["blog.post.readTime"]}
            </span>
          </div>
        </div>

        {post.image && (
          <div className="mb-8">
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.imageAlt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {post.imageAlt && (
              <p className="text-sm text-mediumGray mt-2 text-center">
                {post.imageAlt}
              </p>
            )}
          </div>
        )}
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-16 lg:pb-24">
        <div className="prose prose-lg max-w-none prose-headings:text-forest prose-a:text-forest prose-a:no-underline hover:prose-a:text-turquoise">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [],
              },
            }}
          />
        </div>
      </div>

      {/* Related CTA */}
      <section className="bg-grayLight py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-playfair font-bold mb-4 text-forest">{t["cta.title"]}</h2>
          <p className="text-lg mb-8 text-mediumGray">
            {t["cta.description"]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/demo"
              className="bg-forest-green text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors font-medium inline-flex items-center justify-center gap-2"
              aria-label="Book a demo of Lyyli.ai"
            >
              {t["cta.button"]}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </a>
            <a
              href="/contact"
              className="border border-forest-green text-forest-green px-8 py-4 rounded-lg hover:bg-forest-green hover:text-white transition-colors font-medium inline-flex items-center justify-center"
              aria-label="Contact Lyyli.ai sales team"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
