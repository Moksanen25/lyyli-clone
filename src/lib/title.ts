/**
 * Title Builder Utility
 * Creates SEO-optimized page titles with brand consistency
 * Prevents duplication and enforces character limits
 */

const BRAND_NAME = 'Lyyli.ai';
const BRAND_SEPARATOR = ' | ';
const MAX_TITLE_LENGTH = 60; // Google typically displays ~60 chars
const RECOMMENDED_MAX = 55; // Leave buffer for truncation

/**
 * Build an optimized page title
 * - Prevents brand name duplication
 * - Enforces character limits
 * - Adds brand suffix only when needed
 * 
 * @param pageTitle - The page-specific title
 * @param options - Optional configuration
 * @returns Optimized title string
 */
export function buildTitle(
  pageTitle: string,
  options?: {
    maxLength?: number;
    includeBrand?: boolean;
    forceBrand?: boolean;
  }
): string {
  const {
    maxLength = MAX_TITLE_LENGTH,
    includeBrand = true,
    forceBrand = false
  } = options || {};

  if (!pageTitle || pageTitle.trim() === '') {
    return BRAND_NAME;
  }

  // Trim and clean the title
  let title = pageTitle.trim();

  // Check if brand name already exists in the title
  const hasBrand = title.includes(BRAND_NAME);

  // If brand already exists, use title as-is (but enforce length)
  if (hasBrand) {
    if (title.length > maxLength) {
      // Find the position of the brand name
      const brandIndex = title.indexOf(BRAND_NAME);
      const beforeBrand = title.substring(0, brandIndex).trim();
      
      // Keep as much of the content before brand as possible
      const availableLength = maxLength - BRAND_NAME.length - 3; // -3 for separator
      if (beforeBrand.length > availableLength) {
        const truncated = beforeBrand.substring(0, availableLength).trim();
        return `${truncated}... ${BRAND_NAME}`;
      }
    }
    return title;
  }

  // If we don't want to include brand, return title only
  if (!includeBrand && !forceBrand) {
    return title.length > maxLength 
      ? title.substring(0, maxLength - 3).trim() + '...'
      : title;
  }

  // Calculate available space for page title
  const brandSuffix = `${BRAND_SEPARATOR}${BRAND_NAME}`;
  const availableLength = maxLength - brandSuffix.length;

  // Truncate page title if needed
  if (title.length > availableLength) {
    title = title.substring(0, availableLength - 3).trim() + '...';
  }

  // Append brand name
  return `${title}${brandSuffix}`;
}

/**
 * Build title from translation key
 * Helper for consistent title generation from i18n
 */
export function buildTitleFromTranslation(
  translationValue: string | undefined,
  fallback: string = BRAND_NAME,
  options?: Parameters<typeof buildTitle>[1]
): string {
  const pageTitle = translationValue || fallback;
  return buildTitle(pageTitle, options);
}

/**
 * Create a title template for Next.js metadata
 * Used in layout for automatic title composition
 */
export function createTitleTemplate(): string {
  return `%s${BRAND_SEPARATOR}${BRAND_NAME}`;
}

/**
 * Validate title meets SEO best practices
 * Returns validation result with warnings
 */
export function validateTitle(title: string): {
  valid: boolean;
  warnings: string[];
  length: number;
} {
  const warnings: string[] = [];
  const length = title.length;

  // Check length
  if (length === 0) {
    warnings.push('Title is empty');
  } else if (length > MAX_TITLE_LENGTH) {
    warnings.push(`Title exceeds ${MAX_TITLE_LENGTH} chars (${length} chars) - may be truncated in search results`);
  } else if (length > RECOMMENDED_MAX) {
    warnings.push(`Title exceeds recommended ${RECOMMENDED_MAX} chars (${length} chars)`);
  }

  // Check for duplicate brand
  const brandMatches = (title.match(new RegExp(BRAND_NAME, 'g')) || []).length;
  if (brandMatches > 1) {
    warnings.push(`Brand name appears ${brandMatches} times - should appear only once`);
  }

  // Check for common issues
  if (title.includes('  ')) {
    warnings.push('Title contains double spaces');
  }

  if (title.startsWith(' ') || title.endsWith(' ')) {
    warnings.push('Title has leading/trailing whitespace');
  }

  if (title.includes('undefined') || title.includes('null')) {
    warnings.push('Title contains placeholder values');
  }

  return {
    valid: warnings.length === 0,
    length,
    warnings
  };
}

/**
 * Get title length without brand suffix
 * Useful for calculating available space
 */
export function getTitleLengthWithoutBrand(title: string): number {
  const brandSuffix = `${BRAND_SEPARATOR}${BRAND_NAME}`;
  
  if (title.endsWith(brandSuffix)) {
    return title.length - brandSuffix.length;
  }
  
  if (title.includes(BRAND_NAME)) {
    return title.replace(BRAND_NAME, '').trim().length;
  }
  
  return title.length;
}

/**
 * Remove brand name and separator from title
 * Useful for getting clean page title
 */
export function removeBrandFromTitle(title: string): string {
  // Remove brand with separator
  const brandSuffix = `${BRAND_SEPARATOR}${BRAND_NAME}`;
  if (title.endsWith(brandSuffix)) {
    return title.substring(0, title.length - brandSuffix.length).trim();
  }

  // Remove brand at start
  const brandPrefix = `${BRAND_NAME}${BRAND_SEPARATOR}`;
  if (title.startsWith(brandPrefix)) {
    return title.substring(brandPrefix.length).trim();
  }

  // Remove standalone brand
  if (title === BRAND_NAME) {
    return '';
  }

  return title;
}

/**
 * Constants export for consistency
 */
export const TITLE_CONSTANTS = {
  BRAND_NAME,
  BRAND_SEPARATOR,
  MAX_TITLE_LENGTH,
  RECOMMENDED_MAX,
} as const;
