/**
 * Meta Description Utility
 * Creates SEO-optimized meta descriptions with length and keyword validation
 */

const MIN_DESCRIPTION_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 155;
const RECOMMENDED_MIN = 125;
const RECOMMENDED_MAX = 150;

/**
 * Validate meta description meets SEO best practices
 */
export function validateDescription(
  description: string,
  primaryKeyword?: string,
  locale?: string
): {
  valid: boolean;
  warnings: string[];
  errors: string[];
  length: number;
} {
  const warnings: string[] = [];
  const errors: string[] = [];
  const length = description.length;

  // Check for missing description
  if (!description || description.trim() === '') {
    errors.push('Description is missing or empty');
    return { valid: false, warnings, errors, length: 0 };
  }

  // Check length constraints
  if (length < MIN_DESCRIPTION_LENGTH) {
    errors.push(`Description too short (${length} chars). Minimum: ${MIN_DESCRIPTION_LENGTH} chars`);
  } else if (length < RECOMMENDED_MIN) {
    warnings.push(`Description below recommended minimum (${length} chars). Recommended: ${RECOMMENDED_MIN}+ chars`);
  }

  if (length > MAX_DESCRIPTION_LENGTH) {
    errors.push(`Description too long (${length} chars). Maximum: ${MAX_DESCRIPTION_LENGTH} chars - will be truncated in search results`);
  } else if (length > RECOMMENDED_MAX) {
    warnings.push(`Description exceeds recommended maximum (${length} chars). Recommended: ≤${RECOMMENDED_MAX} chars`);
  }

  // Check for keyword presence
  if (primaryKeyword) {
    const lowerDesc = description.toLowerCase();
    const lowerKeyword = primaryKeyword.toLowerCase();
    
    if (!lowerDesc.includes(lowerKeyword)) {
      warnings.push(`Primary keyword "${primaryKeyword}" not found in description`);
    }
  }

  // Check for common issues
  if (description.includes('  ')) {
    warnings.push('Description contains double spaces');
  }

  if (description.startsWith(' ') || description.endsWith(' ')) {
    warnings.push('Description has leading/trailing whitespace');
  }

  if (description.includes('undefined') || description.includes('null')) {
    errors.push('Description contains placeholder values');
  }

  // Check for missing punctuation
  if (!description.endsWith('.') && !description.endsWith('!') && !description.endsWith('?')) {
    warnings.push('Description should end with punctuation');
  }

  // Check for duplicate sentences
  const sentences = description.split(/[.!?]+/).filter(s => s.trim());
  const uniqueSentences = new Set(sentences);
  if (sentences.length !== uniqueSentences.size) {
    warnings.push('Description may contain duplicate sentences');
  }

  return {
    valid: errors.length === 0,
    warnings,
    errors,
    length
  };
}

/**
 * Truncate description to fit within max length
 * Tries to cut at sentence boundary if possible
 */
export function truncateDescription(
  description: string,
  maxLength: number = MAX_DESCRIPTION_LENGTH
): string {
  if (description.length <= maxLength) {
    return description;
  }

  // Try to cut at last sentence boundary before max length
  const truncated = description.substring(0, maxLength);
  const lastSentenceEnd = Math.max(
    truncated.lastIndexOf('.'),
    truncated.lastIndexOf('!'),
    truncated.lastIndexOf('?')
  );

  if (lastSentenceEnd > MIN_DESCRIPTION_LENGTH) {
    // Found a good sentence boundary
    return truncated.substring(0, lastSentenceEnd + 1).trim();
  }

  // No good sentence boundary, cut at last space
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > MIN_DESCRIPTION_LENGTH) {
    const result = truncated.substring(0, lastSpace).trim();
    // Ensure we have room for ellipsis
    if (result.length + 3 <= maxLength) {
      return result + '...';
    }
    return result.substring(0, maxLength - 3).trim() + '...';
  }

  // Force truncate with ellipsis
  return truncated.substring(0, maxLength - 3).trim() + '...';
}

/**
 * Ensure description includes keyword naturally
 * Returns the description unchanged if keyword already present
 * Otherwise suggests placement
 */
export function ensureKeyword(
  description: string,
  keyword: string
): {
  hasKeyword: boolean;
  suggestion?: string;
} {
  const lowerDesc = description.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();

  if (lowerDesc.includes(lowerKeyword)) {
    return { hasKeyword: true };
  }

  // Suggest adding keyword at the beginning
  const suggestion = `${keyword} - ${description}`;
  
  return {
    hasKeyword: false,
    suggestion: truncateDescription(suggestion)
  };
}

/**
 * Check if descriptions are duplicated across pages
 */
export function findDuplicateDescriptions(
  descriptions: Record<string, string>
): string[] {
  const duplicates: string[] = [];
  const seen = new Map<string, string[]>();

  Object.entries(descriptions).forEach(([key, desc]) => {
    const normalized = desc.trim().toLowerCase();
    
    if (seen.has(normalized)) {
      seen.get(normalized)!.push(key);
    } else {
      seen.set(normalized, [key]);
    }
  });

  seen.forEach((keys, desc) => {
    if (keys.length > 1) {
      duplicates.push(`Duplicate description found in: ${keys.join(', ')}`);
    }
  });

  return duplicates;
}

/**
 * Get optimal description length for a given locale
 * Some languages may need adjustments
 */
export function getOptimalLength(locale: string = 'en'): {
  min: number;
  max: number;
  recommended: number;
} {
  // Finnish can be more verbose, English more concise
  const adjustments: Record<string, { min: number; max: number; recommended: number }> = {
    fi: { min: 120, max: 155, recommended: 145 },
    en: { min: 120, max: 155, recommended: 140 },
  };

  return adjustments[locale] || adjustments.en;
}

/**
 * Validate description from translation
 */
export function validateDescriptionFromTranslation(
  translationValue: string | undefined,
  pageKey: string,
  primaryKeyword?: string,
  locale?: string
): ReturnType<typeof validateDescription> {
  if (!translationValue) {
    return {
      valid: false,
      errors: [`Missing description for ${pageKey}`],
      warnings: [],
      length: 0
    };
  }

  return validateDescription(translationValue, primaryKeyword, locale);
}

/**
 * Constants export for consistency
 */
export const DESCRIPTION_CONSTANTS = {
  MIN_LENGTH: MIN_DESCRIPTION_LENGTH,
  MAX_LENGTH: MAX_DESCRIPTION_LENGTH,
  RECOMMENDED_MIN,
  RECOMMENDED_MAX,
} as const;
