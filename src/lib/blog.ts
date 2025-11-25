import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { generateBlogCanonicalUrl } from './canonical';
import { buildTitle } from './title';
import { logger } from './logger';

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
  translationSlug?: string;
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
  translationSlug?: string;
}

const contentDirectory = path.join(process.cwd(), 'content/blog');

export function getAllBlogPosts(locale: string): BlogPostMetadata[] {
  const localeDir = path.join(contentDirectory, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(localeDir);
  const posts = fileNames
    .filter(name => name.endsWith('.mdx'))
    .map(name => {
      try {
        const slug = name.replace(/\.mdx$/, '');
        const fullPath = path.join(localeDir, name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        // Validate date
        const dateValue = data.date || '';
        if (dateValue && isNaN(new Date(dateValue).getTime())) {
          logger.warn(`Invalid date in blog post`, {
            fileName: name,
            dateValue,
          });
        }

        const rawImage = typeof data.image === 'string' ? data.image : '';
        const safeImage = rawImage?.startsWith('/')
          ? encodeURI(rawImage)
          : undefined;
        const rawDate = typeof data.date === 'string' ? data.date : '';
        const safeDate =
          !rawDate || isNaN(new Date(rawDate).getTime()) ? '' : rawDate;

        return {
          slug,
          locale,
          title: data.title || '',
          description: data.description || '',
          date: safeDate,
          readTime: typeof data.readTime === 'number' ? data.readTime : 5,
          category: data.category || 'Communication',
          keywords: Array.isArray(data.keywords) ? data.keywords : [],
          author: data.author || 'Lyyli Team',
          image: safeImage,
          imageAlt: data.imageAlt,
          translationSlug: data.translationSlug,
        } as BlogPostMetadata;
      } catch (error) {
        logger.error(`Error processing blog post`, {
          fileName: name,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
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
        logger.error('Error sorting blog posts', {
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        return 0;
      }
    });

  return posts;
}

export function getBlogPost(slug: string, locale: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, locale, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Sanitize image and critical fields
    const rawImage = typeof data.image === 'string' ? data.image : '';
    const safeImage = rawImage?.startsWith('/')
      ? encodeURI(rawImage)
      : undefined;
    const rawDate = typeof data.date === 'string' ? data.date : '';
    const safeDate =
      !rawDate || isNaN(new Date(rawDate).getTime()) ? '' : rawDate;

    return {
      slug,
      locale,
      title: data.title || '',
      description: data.description || '',
      date: safeDate,
      readTime: typeof data.readTime === 'number' ? data.readTime : 5,
      category: data.category || 'Communication',
      keywords: Array.isArray(data.keywords) ? data.keywords : [],
      author: data.author || 'Lyyli Team',
      image: safeImage,
      imageAlt: data.imageAlt,
      translationSlug: data.translationSlug,
      content,
    } as BlogPost;
  } catch {
    return null;
  }
}

export function getAllBlogSlugs(): { slug: string; locale: string }[] {
  try {
    const slugs: { slug: string; locale: string }[] = [];
    const locales = ['en', 'fi', 'de', 'et', 'sv'];

    locales.forEach(locale => {
      const localeDir = path.join(contentDirectory, locale);

      if (fs.existsSync(localeDir)) {
        try {
          const fileNames = fs.readdirSync(localeDir);
          fileNames
            .filter(name => name.endsWith('.mdx'))
            .forEach(name => {
              const slug = name.replace(/\.mdx$/, '');
              slugs.push({ slug, locale });
            });
        } catch (error) {
          logger.error(`Error reading directory`, {
            directory: localeDir,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }
    });

    return slugs;
  } catch (error) {
    logger.error('Error in getAllBlogSlugs', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return [];
  }
}

/**
 * Get the translated slug for a blog post by reading from the post's front matter
 */
export function getTranslationSlug(
  slug: string,
  locale: string
): string | null {
  const post = getBlogPost(slug, locale);
  return post?.translationSlug || null;
}

/**
 * Get the translated blog post if it exists
 */
export function getTranslatedBlogPost(
  slug: string,
  currentLocale: string,
  targetLocale: string
): BlogPost | null {
  try {
    // 1) If current post explicitly defines a translationSlug → use it
    const currentPost = getBlogPost(slug, currentLocale);
    if (currentPost?.translationSlug) {
      const translated = getBlogPost(currentPost.translationSlug, targetLocale);
      if (translated) return translated;
    }

    // 2) If a target-locale post points back to this slug via its translationSlug
    const targetPosts = getAllBlogPosts(targetLocale);
    const reverseMapped = targetPosts.find(
      p => p.translationSlug && p.translationSlug === slug
    );
    if (reverseMapped) {
      const translated = getBlogPost(reverseMapped.slug, targetLocale);
      if (translated) return translated;
    }

    // 3) Fallback: if the same slug exists in the other locale, use it
    const sameSlug = getBlogPost(slug, targetLocale);
    if (sameSlug) return sameSlug;

    return null;
  } catch (error) {
    logger.warn('getTranslatedBlogPost failed', {
      slug,
      currentLocale,
      targetLocale,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return null;
  }
}

/**
 * Get alternative blog posts in the target locale when a translation doesn't exist
 */
export function getAlternativeBlogPosts(
  targetLocale: string,
  excludeSlug?: string
): BlogPostMetadata[] {
  const allPosts = getAllBlogPosts(targetLocale);
  return allPosts.filter(post => post.slug !== excludeSlug).slice(0, 3); // Return top 3 alternatives
}

/**
 * Check if a blog post has a translation
 */
export function hasTranslation(slug: string, locale: string): boolean {
  try {
    const targetLocale = locale === 'en' ? 'fi' : 'en';

    // Direct mapping from current post
    const direct = getTranslationSlug(slug, locale);
    if (direct) {
      const exists = !!getBlogPost(direct, targetLocale);
      if (exists) return true;
    }

    // Reverse mapping from target posts
    const targetPosts = getAllBlogPosts(targetLocale);
    if (targetPosts.some(p => p.translationSlug === slug)) {
      return true;
    }

    // Same-slug fallback
    if (getBlogPost(slug, targetLocale)) {
      return true;
    }

    return false;
  } catch (error) {
    logger.warn('hasTranslation check failed', {
      slug,
      locale,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return false;
  }
}

export function generateBlogMetadata(post: BlogPostMetadata, locale: string) {
  const canonicalUrl = generateBlogCanonicalUrl(post.slug, locale);

  // Generate hreflang alternates for supported locales (currently en and fi)
  const supportedLocales = ['en', 'fi'];
  const alternates: Record<string, string> = {};

  // Add current locale
  alternates[locale] = canonicalUrl;

  // Add all other locales (they will point to same slug or translation if available)
  supportedLocales.forEach(loc => {
    if (loc !== locale) {
      // For now, use the same slug for all locales
      // TODO: Implement multi-locale translation slug mapping when translations are available
      alternates[loc] = generateBlogCanonicalUrl(
        post.translationSlug || post.slug,
        loc
      );
    }
  });

  // Add x-default pointing to English version
  alternates['x-default'] = generateBlogCanonicalUrl(
    post.translationSlug && locale !== 'en' ? post.translationSlug : post.slug,
    'en'
  );

  // Primary and secondary keywords for SEO
  const primaryKeywords = [
    'AI communication assistant',
    'professional service organizations',
    'internal communication coordination',
    'enterprise-grade security',
    'GDPR compliant',
  ];

  const allKeywords = [...primaryKeywords, ...post.keywords].join(', ');

  return {
    title: buildTitle(`${post.title} - Blog`),
    description: post.description,
    keywords: allKeywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      siteName: 'Lyyli.ai',
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
      locale:
        locale === 'fi'
          ? 'fi_FI'
          : locale === 'de'
            ? 'de_DE'
            : locale === 'et'
              ? 'et_EE'
              : locale === 'sv'
                ? 'sv_SE'
                : 'en_US',
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image
        ? [post.image]
        : [
            `/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}`,
          ],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
  };
}
