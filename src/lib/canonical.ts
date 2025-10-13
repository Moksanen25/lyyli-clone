/**
 * Canonical URL utilities for SEO
 * Ensures all canonical URLs point to the production lyyli.ai domain
 */

const PRODUCTION_DOMAIN = "https://lyyli.ai";

/**
 * Generate a canonical URL for the given path
 * Always returns a production URL regardless of current environment
 * 
 * @param path - The path (with or without leading slash)
 * @param locale - The locale (en, fi)
 * @returns Full canonical URL pointing to lyyli.ai
 */
export function generateCanonicalUrl(path: string, locale: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // If path already includes locale, use as-is
  // Otherwise, prepend locale
  const localizedPath = normalizedPath.startsWith(`/${locale}/`) 
    ? normalizedPath 
    : `/${locale}${normalizedPath === '/' ? '' : normalizedPath}`;
    
  return `${PRODUCTION_DOMAIN}${localizedPath}`;
}

/**
 * Generate canonical URL for a specific page in a locale
 * 
 * @param pagePath - Page path without locale (e.g., '/about', '/blog/post-slug')
 * @param locale - The locale (en, fi)
 * @returns Full canonical URL
 */
export function generatePageCanonicalUrl(pagePath: string, locale: string): string {
  // Remove leading slash if present, we'll add it back
  const cleanPath = pagePath.startsWith('/') ? pagePath.substring(1) : pagePath;
  
  // For root page, use just the locale
  if (!cleanPath || cleanPath === '') {
    return `${PRODUCTION_DOMAIN}/${locale}`;
  }
  
  return `${PRODUCTION_DOMAIN}/${locale}/${cleanPath}`;
}

/**
 * Generate canonical URL for blog posts
 * 
 * @param slug - Blog post slug
 * @param locale - The locale (en, fi)
 * @returns Full canonical URL for blog post
 */
export function generateBlogCanonicalUrl(slug: string, locale: string): string {
  return `${PRODUCTION_DOMAIN}/${locale}/blog/${slug}`;
}

/**
 * Generate alternate URLs for different locales
 * 
 * @param path - The page path (with or without locale)
 * @param supportedLocales - Array of supported locales
 * @returns Object mapping locale to canonical URL
 */
export function generateAlternateUrls(
  path: string, 
  supportedLocales: string[] = ['en', 'fi']
): Record<string, string> {
  const alternates: Record<string, string> = {};
  
  // Remove locale from path if present
  let cleanPath = path;
  for (const locale of supportedLocales) {
    if (path.startsWith(`/${locale}/`) || path === `/${locale}`) {
      cleanPath = path.replace(`/${locale}`, '') || '/';
      break;
    }
  }
  
  // Generate URL for each locale
  supportedLocales.forEach(locale => {
    if (cleanPath === '/') {
      alternates[locale] = `${PRODUCTION_DOMAIN}/${locale}`;
    } else {
      const normalizedPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
      alternates[locale] = `${PRODUCTION_DOMAIN}/${locale}/${normalizedPath}`;
    }
  });
  
  return alternates;
}

/**
 * Validate that a URL points to the production domain
 * 
 * @param url - URL to validate
 * @returns true if URL points to lyyli.ai, false otherwise
 */
export function isValidCanonicalUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.origin === PRODUCTION_DOMAIN;
  } catch {
    return false;
  }
}

/**
 * Get the production domain constant
 * @returns The production domain URL
 */
export function getProductionDomain(): string {
  return PRODUCTION_DOMAIN;
}
