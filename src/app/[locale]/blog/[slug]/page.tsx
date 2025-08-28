import {
  getBlogPost,
  getAllBlogSlugs,
  generateBlogMetadata,
} from "../../../../lib/blog";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = getAllBlogSlugs();
    return slugs.map((item) => ({
      locale: item.locale,
      slug: item.slug,
    }));
  } catch {
    console.warn("Blog system not fully loaded, using fallback");
    return [
      { locale: 'en', slug: 'sample' },
      { locale: 'fi', slug: 'sample' }
    ];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const supportedLocales = ["en", "fi"];
  const currentLocale = supportedLocales.includes(locale) ? locale : "en";

  try {
    const post = getBlogPost(slug, currentLocale);

    if (post) {
      return generateBlogMetadata(post, locale);
    }
  } catch {
    console.warn("Blog metadata generation failed, using fallback");
  }

  return {
    title: `Blog Post - ${slug}`,
    description: "Blog post content will be available soon.",
  };
}

// Function to convert markdown to HTML
function markdownToHtml(markdown: string): string {
  let html = markdown;
  
  // Convert headers
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-playfair font-bold text-forest mb-6">$1</h1>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-playfair font-bold text-forest mb-4 mt-8">$1</h2>');
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-playfair font-bold text-forest mb-3 mt-6">$1</h3>');
  html = html.replace(/^#### (.*$)/gim, '<h4 class="text-xl font-playfair font-bold text-forest mb-2 mt-4">$1</h4>');
  
  // Convert bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-forest">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  
  // Process lists more carefully
  // First, split content into lines
  const lines = html.split('\n');
  const processedLines = [];
  let inUnorderedList = false;
  let inOrderedList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.trim().startsWith('- ')) {
      // Unordered list item
      if (!inUnorderedList) {
        if (inOrderedList) {
          // Close previous ordered list
          processedLines.push('</ol>');
          inOrderedList = false;
        }
        inUnorderedList = true;
        processedLines.push('<ul class="list-disc list-inside mb-4 space-y-2">');
      }
      const content = line.replace(/^- (.*)/, '$1');
      processedLines.push(`<li class="mb-2">${content}</li>`);
    } else if (/^\d+\. .*/.test(line.trim())) {
      // Ordered list item
      if (!inOrderedList) {
        if (inUnorderedList) {
          // Close previous unordered list
          processedLines.push('</ul>');
          inUnorderedList = false;
        }
        inOrderedList = true;
        processedLines.push('<ol class="list-decimal list-inside mb-4 space-y-2">');
      }
      const content = line.replace(/^\d+\. (.*)/, '$1');
      processedLines.push(`<li class="mb-2">${content}</li>`);
    } else {
      // Not a list item
      if (inUnorderedList) {
        processedLines.push('</ul>');
        inUnorderedList = false;
      } else if (inOrderedList) {
        processedLines.push('</ol>');
        inOrderedList = false;
      }
      processedLines.push(line);
    }
  }
  
  // Close any open lists
  if (inUnorderedList) {
    processedLines.push('</ul>');
  } else if (inOrderedList) {
    processedLines.push('</ol>');
  }
  
  html = processedLines.join('\n');
  
  // Convert line breaks
  html = html.replace(/\n\n/g, '<br><br>');
  
  return html;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const supportedLocales = ["en", "fi"];
  const currentLocale = supportedLocales.includes(locale) ? locale : "en";

  let post = null;
  
  try {
    post = getBlogPost(slug, currentLocale);
  } catch {
    console.warn("Blog content loading failed, showing fallback");
  }

  if (!post) {
    return (
      <article className="bg-white">
        <header className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
          <div className="mb-8">
            <Link
              href={`/${currentLocale}/blog`}
              className="inline-flex items-center text-forest-green hover:text-muted-turquoise transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-forest mb-4">
              Blog Post: {slug}
            </h1>
            <p className="text-lg text-mediumGray mb-6">
              This blog post content will be available soon. We're working on restoring the full functionality.
            </p>
          </div>
        </header>
        <div className="max-w-4xl mx-auto px-6 pb-16">
          <div className="prose prose-lg max-w-none">
            <p>Content coming soon. This is a temporary placeholder while we restore the blog functionality.</p>
          </div>
        </div>
      </article>
    );
  }

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
            ← Back to Blog
          </Link>
        </div>

        <div className="mb-8">
          <span className="inline-block bg-forest text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-forest mb-4">{post.title}</h1>
          <p className="text-lg text-mediumGray mb-6">{post.description}</p>
          <div className="flex items-center gap-4 text-sm text-mediumGray">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>
              Published on {publishedDate}
            </time>
            <span>•</span>
            <span>
              {post.readTime} min read
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
      <div className="max-w-4xl mx-auto px-6 pb-16 lg:py-24">
        <div className="prose prose-lg max-w-none prose-headings:text-forest prose-a:text-forest prose-a:no-underline hover:prose-a:text-turquoise">
          <div dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} />
        </div>
      </div>

      {/* Related CTA */}
      <section className="bg-grayLight py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-playfair font-bold mb-4 text-forest">Ready to get started?</h2>
          <p className="text-lg mb-8 text-mediumGray">
            Transform your internal communications with Lyyli.ai
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="bg-forest text-white px-8 py-4 rounded-lg hover:bg-forest/90 transition-colors font-medium inline-flex items-center justify-center gap-2"
              aria-label="Book a demo of Lyyli.ai"
            >
              Book a Demo
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
            </Link>
            <Link
              href="/contact"
              className="border border-forest text-forest px-8 py-4 rounded-lg hover:bg-forest hover:text-white transition-colors font-medium inline-flex items-center justify-center"
              aria-label="Contact Lyyli.ai sales team"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
