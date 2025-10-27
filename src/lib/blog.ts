import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { generateBlogCanonicalUrl } from './canonical';
import { buildTitle } from './title';

export interface BlogPost {
  slug: string;
  locale: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
  category: string;
  keywords: string[];
  author: string;
  image?: string;
  imageAlt?: string;
  content: string;
}

export interface BlogPostMetadata {
  slug: string;
  locale: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
  category: string;
  keywords: string[];
  author: string;
  image?: string;
  imageAlt?: string;
}

const contentDirectory = path.join(process.cwd(), "content/blog");

// Translation mapping between English and Finnish blog posts
const TRANSLATION_MAP: Record<string, string> = {
  // English -> Finnish
  "communication-roi-leadership": "viestinnan-roi-johdolle",
  "turning-communication-into-profit-center": "viestinnasta-tuottava-funktio",
  "internal-communication-pitfalls": "sisaisen-viestinnan-sudenkuopat",
  "enterprise-security-gdpr-compliance": "yritysturvallisuus-gdpr-vaatimustenmukaisuus",
  "ai-communication-expert-teams": "ai-viestinta-asiantuntijatiimit",
  "ai-spots-communication-opportunities": "tekoaly-tunnistaa-viestinnan-mahdollisuudet",
  "consistent-brand-voice": "yhtenainen-brandi-aanen",
  "lyyli-funding-announcement": "lyyli-funding-announcement", // Same slug in both
  
  // Finnish -> English (reverse mapping)
  "viestinnan-roi-johdolle": "communication-roi-leadership",
  "viestinnasta-tuottava-funktio": "turning-communication-into-profit-center",
  "sisaisen-viestinnan-sudenkuopat": "internal-communication-pitfalls",
  "yritysturvallisuus-gdpr-vaatimustenmukaisuus": "enterprise-security-gdpr-compliance",
  "ai-viestinta-asiantuntijatiimit": "ai-communication-expert-teams",
  "tekoaly-tunnistaa-viestinnan-mahdollisuudet": "ai-spots-communication-opportunities",
  "yhtenainen-brandi-aanen": "consistent-brand-voice",
};

export function getAllBlogPosts(locale: string): BlogPostMetadata[] {
  const localeDir = path.join(contentDirectory, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(localeDir);
  const posts = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      try {
        const slug = name.replace(/\.mdx$/, "");
        const fullPath = path.join(localeDir, name);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        // Validate date
        const dateValue = data.date || "";
        if (dateValue && isNaN(new Date(dateValue).getTime())) {
          console.warn(`Invalid date in ${name}: ${dateValue}`);
        }

        return {
          slug,
          locale,
          title: data.title || "",
          description: data.description || "",
          date: dateValue,
          readTime: data.readTime || 5,
          category: data.category || "Communication",
          keywords: data.keywords || [],
          author: data.author || "Lyyli Team",
          image: data.image,
          imageAlt: data.imageAlt,
        } as BlogPostMetadata;
      } catch (error) {
        console.error(`Error processing blog post ${name}:`, error);
        return null;
      }
    })
    .filter((post): post is BlogPostMetadata => post !== null)
    .sort((a, b) => {
      try {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        
        // Handle invalid dates
        if (isNaN(dateA) && isNaN(dateB)) return 0;
        if (isNaN(dateA)) return 1;
        if (isNaN(dateB)) return -1;
        
        return dateB - dateA;
      } catch (error) {
        console.error("Error sorting blog posts:", error);
        return 0;
      }
    });

  return posts;
}

export function getBlogPost(slug: string, locale: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, locale, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      locale,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      readTime: data.readTime || 5,
      category: data.category || "Communication",
      keywords: data.keywords || [],
      author: data.author || "Lyyli Team",
      image: data.image,
      imageAlt: data.imageAlt,
      content,
    } as BlogPost;
  } catch {
    return null;
  }
}

export function getAllBlogSlugs(): { slug: string; locale: string }[] {
  try {
    const slugs: { slug: string; locale: string }[] = [];
    const locales = ["en", "fi"];

    locales.forEach((locale) => {
      const localeDir = path.join(contentDirectory, locale);

      if (fs.existsSync(localeDir)) {
        try {
          const fileNames = fs.readdirSync(localeDir);
          fileNames
            .filter((name) => name.endsWith(".mdx"))
            .forEach((name) => {
              const slug = name.replace(/\.mdx$/, "");
              slugs.push({ slug, locale });
            });
        } catch (error) {
          console.error(`Error reading directory ${localeDir}:`, error);
        }
      }
    });

    return slugs;
  } catch (error) {
    console.error("Error in getAllBlogSlugs:", error);
    return [];
  }
}

/**
 * Get the translated slug for a blog post
 */
export function getTranslationSlug(slug: string): string | null {
  return TRANSLATION_MAP[slug] || null;
}

/**
 * Get the translated blog post if it exists
 */
export function getTranslatedBlogPost(slug: string, targetLocale: string): BlogPost | null {
  const translationSlug = getTranslationSlug(slug);
  if (!translationSlug) return null;
  
  return getBlogPost(translationSlug, targetLocale);
}

/**
 * Get alternative blog posts in the target locale when a translation doesn't exist
 */
export function getAlternativeBlogPosts(targetLocale: string, excludeSlug?: string): BlogPostMetadata[] {
  const allPosts = getAllBlogPosts(targetLocale);
  return allPosts
    .filter(post => post.slug !== excludeSlug)
    .slice(0, 3); // Return top 3 alternatives
}

/**
 * Check if a blog post has a translation
 */
export function hasTranslation(slug: string): boolean {
  return !!getTranslationSlug(slug);
}

export function generateBlogMetadata(post: BlogPostMetadata, locale: string) {
  const canonicalUrl = generateBlogCanonicalUrl(post.slug, locale);

  // Determine translated slug if available for hreflang alternates
  const otherLocale = locale === 'fi' ? 'en' : 'fi';
  const translatedSlug = getTranslationSlug(post.slug);
  const alternates: Record<string, string> = {};
  alternates[locale] = canonicalUrl;
  if (translatedSlug) {
    alternates[otherLocale] = generateBlogCanonicalUrl(translatedSlug, otherLocale);
  } else {
    // If no translation exists, still provide the same content for other locale
    alternates[otherLocale] = generateBlogCanonicalUrl(post.slug, otherLocale);
  }
  // Add x-default pointing to English version
  const defaultSlug = locale === 'en' ? post.slug : (translatedSlug || post.slug);
  alternates['x-default'] = generateBlogCanonicalUrl(defaultSlug, 'en');

  // Primary and secondary keywords for SEO
  const primaryKeywords = [
    "AI communication assistant",
    "professional service organizations",
    "internal communication coordination",
    "enterprise-grade security",
    "GDPR compliant",
  ];

  const allKeywords = [...primaryKeywords, ...post.keywords].join(", ");

  return {
    title: buildTitle(`${post.title} - Blog`),
    description: post.description,
    keywords: allKeywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      siteName: "Lyyli.ai",
      images: post.image
        ? [
            {
              url: post.image,
              width: 1200,
              height: 630,
              alt: post.imageAlt || post.title,
            },
          ]
        : [
            {
              url: `/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
      locale: locale === "fi" ? "fi_FI" : "en_US",
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image
        ? [post.image]
        : [`/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
  };
}
