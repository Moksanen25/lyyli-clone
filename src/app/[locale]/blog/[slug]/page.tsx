import {
  getBlogPost,
  getAllBlogSlugs,
  getAllBlogPosts,
  generateBlogMetadata,
  hasTranslation,
  getTranslatedBlogPost,
  getAlternativeBlogPosts,
} from "../../../../lib/blog";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { logger } from "../../../../lib/logger";
import { generateArticleSchema } from "../../../../lib/structured-data";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import CalendarPopup from "../../../../components/CalendarPopup";
import RelatedPosts from "../../../../components/blog/RelatedPosts";
import { generateBlogBreadcrumbs, generateBreadcrumbSchema } from "../../../../lib/breadcrumb-schema";

export const revalidate = 3600; // ISR: revalidate blog posts hourly

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
  } catch (error) {
    logger.warn("Blog system not fully loaded, using fallback", { error });
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
  } catch (error) {
    logger.warn("Blog metadata generation failed, using fallback", { error });
  }

  return {
    title: `Blog Post - ${slug}`,
    description: "Blog post content will be available soon.",
  };
}

// Function to convert markdown to HTML
function markdownToHtml(markdown: string): string {
  let html = markdown;
  
  // Convert headers - Following brand rules: H2 and H3 use Playfair, H4+ use Inter
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-playfair font-bold text-forest mb-6 mt-0">$1</h1>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-playfair font-bold text-forest mb-4 mt-12">$1</h2>');
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-playfair font-bold text-forest mb-3 mt-8">$1</h3>');
  html = html.replace(/^#### (.*$)/gim, '<h4 class="text-xl font-inter font-bold text-forest mb-2 mt-6">$1</h4>');
  html = html.replace(/^##### (.*$)/gim, '<h5 class="text-lg font-inter font-bold text-forest mb-2 mt-4">$1</h5>');
  html = html.replace(/^###### (.*$)/gim, '<h6 class="text-base font-inter font-bold text-forest mb-2 mt-4">$1</h6>');
  
  // Convert bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-forest">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  
  // Process chapter breaks - Convert double line breaks to proper spacing
  html = html.replace(/\n\n\n+/g, '\n\n<div class="chapter-break my-12"></div>\n\n');
  
  // Process blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
  
  // Process inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Process code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  
  // Process tables (basic support)
  html = html.replace(/\|(.+)\|/g, function(match) {
    const cells = match.split('|').slice(1, -1);
    const row = cells.map(cell => `<td>${cell.trim()}</td>`).join('');
    return `<tr>${row}</tr>`;
  });
  
  // Process "Ask Mikko more" section - Complete restructure
  html = html.replace(
    /## Ask Mikko more([\s\S]*?)<\/div>\s*<\/div>/g,
    function() {
      // Extract the content and restructure it completely
      return `<div class="ask-mikko-section">
        <h3>Have questions about building data-driven communication?</h3>
        
        <div class="profile-section">
          <div class="profile-info">
            <h4>Mikko Oksanen</h4>
            <p class="title">CEO and co-founder of Lyyli.ai</p>
            <p class="description">I'm passionate about helping organizations transform their communication from intuition-based to data-driven, improving effectiveness and demonstrating measurable business value.</p>
          </div>
        </div>
        
        <div class="discussion-topics">
          <h4>Feel free to reach out if you'd like to discuss:</h4>
          <ul>
            <li>How to build your data foundation for communication</li>
            <li>Measuring communication performance and impact</li>
            <li>Creating audience insights and segmentation</li>
            <li>Implementing data-driven practices in your organization</li>
          </ul>
        </div>
        
        <div class="contact-section">
          <div class="cta-buttons">
            <a href="mailto:mikko@lyyli.ai" class="cta-button">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Contact me directly
            </a>
            <a href="https://lyyli.ai/demo" target="_blank" rel="noopener noreferrer" class="cta-button">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Book a personalized demo
            </a>
          </div>
        </div>
      </div>`;
    }
  );
  
  // Process inline CTA buttons and links
  html = html.replace(
    /<a href="https:\/\/lyyli\.ai\/demo"[^>]*class="[^"]*bg-forest[^"]*"[^>]*>([^<]*)<\/a>/g,
    '<a href="https://lyyli.ai/demo" class="cta-button-primary" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  
  html = html.replace(
    /<a href="mailto:mikko@lyyli\.ai"[^>]*>([^<]*)<\/a>/g,
    '<a href="mailto:mikko@lyyli.ai" class="cta-link-email">$1</a>'
  );
  
  // Process any remaining inline bg-forest divs
  html = html.replace(
    /<div class="bg-forest[^"]*">/g,
    '<div class="enhanced-cta-section">'
  );
  
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
  
  // Strip any inline SVGs from content to prevent malformed SVG from breaking render
  // Blog content should not include raw SVG elements
  html = html.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  
  return html;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const supportedLocales = ["en", "fi"];
  const currentLocale = supportedLocales.includes(locale) ? locale : "en";

  let post = null;
  let translatedPost = null;
  let alternativePosts: any[] = [];
  
  try {
    // First try to get the post in the current locale
    post = getBlogPost(slug, currentLocale);
    
    // If post exists, check if it has a translation
    if (post && hasTranslation(slug)) {
      const targetLocale = currentLocale === "en" ? "fi" : "en";
      translatedPost = getTranslatedBlogPost(slug, targetLocale);
    }
    
    // If no post in current locale, try to get the translated version
    if (!post && hasTranslation(slug)) {
      const targetLocale = currentLocale === "en" ? "fi" : "en";
      post = getTranslatedBlogPost(slug, targetLocale);
      if (post) {
        // This means we're showing content in a different language
        translatedPost = null; // No need to show translation option
      }
    }
    
    // If still no post, get alternative posts in the current locale
    if (!post) {
      alternativePosts = getAlternativeBlogPosts(currentLocale, slug);
    }
  } catch (error) {
    logger.warn("Blog content loading failed", { error });
  }

  if (!post) {
    return (
      <article className="bg-white">
        <header className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-playfair font-bold mb-6 text-forest">
            {currentLocale === "fi" ? "Blogikirjoitus ei löytynyt" : "Blog Post Not Found"}
          </h1>
          <p className="text-lg mb-8 text-mediumGray">
            {currentLocale === "fi" 
              ? "Valitettavasti tätä blogikirjoitusta ei ole saatavilla."
              : "Unfortunately, this blog post is not available."
            }
          </p>
          
          {alternativePosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-playfair font-bold mb-6 text-forest">
                {currentLocale === "fi" ? "Suosittelemme näitä artikkeleita:" : "We recommend these articles:"}
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {alternativePosts.map((altPost) => (
                  <Link
                    key={altPost.slug}
                    href={`/${currentLocale}/blog/${altPost.slug}`}
                    className="block p-6 border border-gray-200 rounded-lg hover:border-forest transition-colors"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-forest line-clamp-2">
                      {altPost.title}
                    </h3>
                    <p className="text-sm text-mediumGray line-clamp-3">
                      {altPost.description}
                    </p>
                    <div className="mt-3 text-xs text-mediumGray">
                      {altPost.readTime} min read
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-12">
            <Link
              href={`/${currentLocale}/blog`}
              className="inline-flex items-center text-forest hover:text-turquoise transition-colors"
            >
              <span>← </span>
              <span>
                {currentLocale === "fi" ? "Takaisin blogiin" : "Back to Blog"}
              </span>
            </Link>
          </div>
        </header>
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

  // Generate breadcrumbs for the blog post
  const breadcrumbItems = generateBlogBreadcrumbs(post.title, currentLocale, post.category);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  // Generate Article schema for blog post
  const articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    author: post.author,
    slug: post.slug,
    locale: currentLocale,
    keywords: post.keywords
  });

  return (
    <article>
      {/* Breadcrumb JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      {/* Article JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      {/* Header */}
      <header className="relative bg-gradient-to-br from-white/95 via-rose/95 to-grayLight/95 backdrop-blur-sm overflow-hidden">
        {/* Background elements - Matching other page gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-rose/95 to-grayLight/95 backdrop-blur-sm" />
        <div className="absolute top-8 right-8 opacity-10 z-0">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-forest to-turquoise blur-xl"></div>
        </div>
        <div className="absolute bottom-8 left-8 opacity-10 z-0">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-turquoise to-rose blur-xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24 relative z-10">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Language switching notice */}
        {translatedPost && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-blue-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">
                {currentLocale === "fi" 
                  ? "Tämä blogikirjoitus on saatavilla myös englanniksi."
                  : "This blog post is also available in Finnish."
                }
              </span>
            </div>
            <div className="mt-2 text-blue-700">
              <Link
                href={`/${currentLocale === "en" ? "fi" : "en"}/blog/${translatedPost.slug}`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 underline"
              >
                <span>
                  {currentLocale === "fi" 
                    ? "Lue englanniksi"
                    : "Lue suomeksi"
                  }
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        <div className="mb-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-forest/20 mb-6 backdrop-blur-sm">
            <span className="text-sm font-medium text-forest">
              {post.category}
            </span>
          </div>
          
                      <h1 className="text-5xl lg:text-6xl font-playfair font-bold text-forest mb-4">{post.title}</h1>
          <p className="text-lg text-mediumGray mb-6 leading-relaxed">{post.description}</p>
          
          {/* Enhanced metadata with icons */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-mediumGray bg-white/60 p-4 rounded-lg border border-forest/10">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-forest" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-forest" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <time dateTime={post.date}>
                {currentLocale === "fi" ? "Julkaistu" : "Published on"} {publishedDate}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-forest" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>
                {post.readTime} {currentLocale === "fi" ? "min luku" : "min read"}
              </span>
            </div>
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
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              />
            </div>
            {post.imageAlt && (
              <p className="text-sm text-mediumGray mt-2 text-center">
                {post.imageAlt}
              </p>
            )}
          </div>
        )}
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-16 lg:pb-24">
        <div className="prose prose-lg max-w-none prose-headings:text-forest prose-a:text-forest prose-a:no-underline hover:prose-a:text-turquoise prose-strong:text-forest prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700">
          {/* Process markdown content manually for now */}
          <div 
            className="markdown-content blog p-8 rounded-2xl"
            dangerouslySetInnerHTML={{ 
              __html: markdownToHtml(post.content) 
            }} 
          />
        </div>
      </div>

      {/* Related Posts */}
      <RelatedPosts
        posts={getAllBlogPosts(currentLocale)}
        currentPostSlug={post.slug}
        locale={currentLocale}
        maxPosts={3}
        className="mt-0"
      />

      {/* Related CTA */}
      <section className="bg-gradient-to-br from-grayLight via-white to-rose/20 py-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-8 right-8 opacity-10">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-forest to-turquoise blur-xl"></div>
        </div>
        <div className="absolute bottom-8 left-8 opacity-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-turquoise to-rose blur-xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-playfair font-bold mb-4 text-forest">
            {currentLocale === "fi" ? "Valmiina aloittamaan?" : "Ready to get started?"}
          </h2>
          <p className="text-lg mb-8 text-mediumGray max-w-2xl mx-auto">
            {currentLocale === "fi" 
              ? "Muunna sisäiset viestintäsi Lyyli.ain avulla"
              : "Transform your internal communications with Lyyli.ai"
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CalendarPopup
              className="bg-forest text-white px-8 py-4 rounded-lg hover:bg-forest/90 transition-all duration-300 font-medium inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              aria-label={currentLocale === "fi" ? "Varaa Lyyli.ain demo" : "Book a demo of Lyyli.ai"}
              translations={{
                title: currentLocale === "fi" ? "Varaa demo" : "Book a Demo",
                subtitle: currentLocale === "fi" ? "Ajoita henkilökohtainen demo tiimimme kanssa" : "Schedule a personalized demo with our team",
                description: currentLocale === "fi" ? "Valitse sopiva aika henkilökohtaiselle demollesi. Tiimimme näyttää, kuinka Lyyli voi muuttaa organisaatiosi viestintää." : "Choose a convenient time for your personalized demo. Our team will show you how Lyyli can transform your organization's communication.",
                loading: currentLocale === "fi" ? "Ladataan kalenteria..." : "Loading calendar...",
                errorTitle: currentLocale === "fi" ? "Ajoita demosi" : "Schedule Your Demo",
                errorDescription: currentLocale === "fi" ? "Klikkaa alla olevaa painiketta avataksesi kalenterimme uudessa välilehdessä" : "Click the button below to open our calendar in a new tab",
                errorButton: currentLocale === "fi" ? "Avaa kalenteri" : "Open Calendar",
                footerSecure: currentLocale === "fi" ? "Turvallinen varaus • GDPR-yhteensopiva" : "Secure booking • GDPR compliant",
                footerContact: currentLocale === "fi" ? "Kysymyksiä? Ota yhteyttä" : "Questions? Contact us"
              }}
            >
              {currentLocale === "fi" ? "Varaa Demo" : "Book a Demo"}
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </CalendarPopup>
            <Link
              href="/contact"
              className="border-2 border-forest text-forest px-8 py-4 rounded-lg hover:bg-forest hover:text-white transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {currentLocale === "fi" ? "Ota yhteyttä myyntiin" : "Contact Sales"}
            </Link>
          </div>
          
          {/* Additional contact options */}
          <div className="mt-8 text-center">
            <p className="text-mediumGray mb-4">
              {currentLocale === "fi" 
                ? "Tai ota yhteyttä suoraan:" 
                : "Or contact us directly:"
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:mikko@lyyli.ai"
                className="inline-flex items-center gap-2 text-forest hover:text-turquoise transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                mikko@lyyli.ai
              </a>
              <span className="hidden sm:inline text-mediumGray">•</span>
              <a
                href="https://lyyli.ai/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-forest hover:text-turquoise transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {currentLocale === "fi" ? "Varaa demo" : "Schedule demo"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
