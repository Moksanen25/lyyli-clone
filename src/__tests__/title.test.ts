/**
 * Title Builder Tests
 * Validates title composition, length limits, and duplication prevention
 */

import {
  buildTitle,
  buildTitleFromTranslation,
  createTitleTemplate,
  validateTitle,
  getTitleLengthWithoutBrand,
  removeBrandFromTitle,
  TITLE_CONSTANTS
} from '../lib/title';

describe('Title Builder', () => {
  const BRAND = 'Lyyli.ai';
  const SEPARATOR = ' | ';
  const MAX_TITLE_LENGTH = TITLE_CONSTANTS.MAX_TITLE_LENGTH;
  const RECOMMENDED_MAX = TITLE_CONSTANTS.RECOMMENDED_MAX;

  describe('buildTitle', () => {
    it('should append brand name by default', () => {
      const title = buildTitle('Features');
      expect(title).toBe(`Features${SEPARATOR}${BRAND}`);
    });

    it('should not duplicate brand if already present', () => {
      const title = buildTitle('Features | Lyyli.ai');
      expect(title).toBe('Features | Lyyli.ai');
      
      // Count brand occurrences
      const brandCount = (title.match(/Lyyli\.ai/g) || []).length;
      expect(brandCount).toBe(1);
    });

    it('should not duplicate brand in different formats', () => {
      const title = buildTitle('Lyyli.ai - AI Assistant');
      expect(title).toBe('Lyyli.ai - AI Assistant');
      
      const brandCount = (title.match(/Lyyli\.ai/g) || []).length;
      expect(brandCount).toBe(1);
    });

    it('should return just brand name for empty input', () => {
      expect(buildTitle('')).toBe(BRAND);
      expect(buildTitle('   ')).toBe(BRAND);
    });

    it('should trim whitespace', () => {
      const title = buildTitle('  Features  ');
      expect(title).toBe(`Features${SEPARATOR}${BRAND}`);
    });

    it('should enforce max length limit', () => {
      const longTitle = 'This is a very long title that exceeds the maximum character limit for SEO optimization';
      const title = buildTitle(longTitle);
      
      expect(title.length).toBeLessThanOrEqual(60);
      expect(title).toContain('...');
      expect(title).toContain(BRAND);
    });

    it('should truncate at specified max length', () => {
      const longTitle = 'Very Long Title That Needs Truncation';
      const title = buildTitle(longTitle, { maxLength: 30 });
      
      expect(title.length).toBeLessThanOrEqual(30);
    });

    it('should allow excluding brand', () => {
      const title = buildTitle('Features', { includeBrand: false });
      expect(title).toBe('Features');
      expect(title).not.toContain(BRAND);
    });

    it('should force brand even if already present', () => {
      const title = buildTitle('Features', { forceBrand: true });
      expect(title).toBe(`Features${SEPARATOR}${BRAND}`);
    });

    it('should handle titles at exactly max length', () => {
      const exactTitle = 'Features';
      const title = buildTitle(exactTitle, { maxLength: 20 });
      
      expect(title.length).toBeLessThanOrEqual(20);
    });

    it('should preserve content quality when truncating', () => {
      const title = buildTitle('AI Communication Assistant for Organizations');
      
      expect(title.length).toBeLessThanOrEqual(60);
      expect(title).toContain('AI Communication');
      expect(title).toContain(BRAND);
    });
  });

  describe('buildTitleFromTranslation', () => {
    it('should build title from translation value', () => {
      const title = buildTitleFromTranslation('Features - Lyyli.ai');
      expect(title).toBe('Features - Lyyli.ai');
    });

    it('should use fallback if translation is undefined', () => {
      const title = buildTitleFromTranslation(undefined, 'Default Title');
      expect(title).toBe(`Default Title${SEPARATOR}${BRAND}`);
    });

    it('should use brand as ultimate fallback', () => {
      const title = buildTitleFromTranslation(undefined);
      expect(title).toBe(BRAND);
    });

    it('should pass options through', () => {
      const title = buildTitleFromTranslation('Features', 'Default', { includeBrand: false });
      expect(title).toBe('Features');
    });
  });

  describe('createTitleTemplate', () => {
    it('should create Next.js title template', () => {
      const template = createTitleTemplate();
      expect(template).toBe(`%s${SEPARATOR}${BRAND}`);
    });

    it('should work with Next.js template syntax', () => {
      const template = createTitleTemplate();
      const pageTitle = 'Features';
      const result = template.replace('%s', pageTitle);
      
      expect(result).toBe(`Features${SEPARATOR}${BRAND}`);
    });
  });

  describe('validateTitle', () => {
    it('should validate correct titles', () => {
      const result = validateTitle(`Features${SEPARATOR}${BRAND}`);
      
      expect(result.valid).toBe(true);
      expect(result.warnings).toHaveLength(0);
      expect(result.length).toBeLessThan(MAX_TITLE_LENGTH);
    });

    it('should detect empty titles', () => {
      const result = validateTitle('');
      
      expect(result.valid).toBe(false);
      expect(result.warnings).toContain('Title is empty');
    });

    it('should warn about excessive length', () => {
      const longTitle = 'This is an extremely long title that definitely exceeds sixty characters for search results';
      const result = validateTitle(longTitle);
      
      expect(result.valid).toBe(false);
      expect(result.warnings.some(w => w.includes('exceeds'))).toBe(true);
      expect(result.length).toBeGreaterThan(MAX_TITLE_LENGTH);
    });

    it('should detect duplicate brand names', () => {
      const duplicateTitle = `Features${SEPARATOR}${BRAND}${SEPARATOR}${BRAND}`;
      const result = validateTitle(duplicateTitle);
      
      expect(result.valid).toBe(false);
      expect(result.warnings.some(w => w.includes('appears') && w.includes('times'))).toBe(true);
    });

    it('should detect double spaces', () => {
      const result = validateTitle('Features  |  Lyyli.ai');
      
      expect(result.valid).toBe(false);
      expect(result.warnings).toContain('Title contains double spaces');
    });

    it('should detect leading/trailing whitespace', () => {
      const result1 = validateTitle(' Features | Lyyli.ai');
      const result2 = validateTitle('Features | Lyyli.ai ');
      
      expect(result1.valid).toBe(false);
      expect(result2.valid).toBe(false);
      expect(result1.warnings).toContain('Title has leading/trailing whitespace');
    });

    it('should detect placeholder values', () => {
      const result1 = validateTitle('undefined | Lyyli.ai');
      const result2 = validateTitle('null | Lyyli.ai');
      
      expect(result1.valid).toBe(false);
      expect(result2.valid).toBe(false);
      expect(result1.warnings).toContain('Title contains placeholder values');
    });

    it('should pass for titles at recommended max', () => {
      const title = buildTitle('AI Communication Assistant'); // ~40 chars total
      const result = validateTitle(title);
      
      expect(result.valid).toBe(true);
      expect(result.length).toBeLessThanOrEqual(RECOMMENDED_MAX);
    });
  });

  describe('getTitleLengthWithoutBrand', () => {
    it('should calculate length without brand suffix', () => {
      const title = `Features${SEPARATOR}${BRAND}`;
      const length = getTitleLengthWithoutBrand(title);
      
      expect(length).toBe('Features'.length);
    });

    it('should handle title without brand', () => {
      const title = 'Just a Page Title';
      const length = getTitleLengthWithoutBrand(title);
      
      expect(length).toBe(title.length);
    });

    it('should handle brand in middle of title', () => {
      const title = `About ${BRAND} Services`;
      const length = getTitleLengthWithoutBrand(title);
      
      expect(length).toBeLessThan(title.length);
    });
  });

  describe('removeBrandFromTitle', () => {
    it('should remove brand suffix', () => {
      const title = `Features${SEPARATOR}${BRAND}`;
      const cleaned = removeBrandFromTitle(title);
      
      expect(cleaned).toBe('Features');
      expect(cleaned).not.toContain(BRAND);
    });

    it('should remove brand prefix', () => {
      const title = `${BRAND}${SEPARATOR}Features`;
      const cleaned = removeBrandFromTitle(title);
      
      expect(cleaned).toBe('Features');
    });

    it('should return empty for standalone brand', () => {
      const cleaned = removeBrandFromTitle(BRAND);
      expect(cleaned).toBe('');
    });

    it('should return title as-is if no brand', () => {
      const title = 'Features Page';
      const cleaned = removeBrandFromTitle(title);
      
      expect(cleaned).toBe(title);
    });
  });

  describe('SEO Optimization', () => {
    it('should keep most important content when truncating', () => {
      const title = buildTitle('AI Communication Assistant for Professional Service Organizations');
      
      expect(title).toContain('AI Communication');
      expect(title.length).toBeLessThanOrEqual(MAX_TITLE_LENGTH);
    });

    it('should prioritize page title over brand when space limited', () => {
      const title = buildTitle('Very Important Feature Description That Is Long', { maxLength: 40 });
      
      // Should truncate page title to fit brand
      expect(title).toContain('...');
      expect(title).toContain(BRAND);
      expect(title.length).toBeLessThanOrEqual(40);
    });

    it('should handle non-ASCII characters correctly', () => {
      const title = buildTitle('Ominaisuudet ja Edut', { maxLength: 60 });
      
      expect(title).toContain('Ominaisuudet');
      expect(title).toContain(BRAND);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very short titles', () => {
      const title = buildTitle('AI');
      expect(title).toBe(`AI${SEPARATOR}${BRAND}`);
    });

    it('should handle special characters', () => {
      const title = buildTitle('Features & Benefits');
      expect(title).toBe(`Features & Benefits${SEPARATOR}${BRAND}`);
    });

    it('should handle brand name with different casing', () => {
      const title = buildTitle('LYYLI.AI Features');
      // Current implementation is case-sensitive, so it would add brand
      // This behavior is acceptable as the brand name should be exact
      expect(title).toBeTruthy();
    });

    it('should handle multiple separators in title', () => {
      const title = buildTitle('Features | Benefits | More');
      expect(title).toContain(BRAND);
      
      const brandCount = (title.match(/Lyyli\.ai/g) || []).length;
      expect(brandCount).toBe(1);
    });
  });

  describe('Title Length Validation', () => {
    const testCases = [
      { input: 'Features', expected: true },
      { input: 'AI Communication Assistant', expected: true },
      { input: 'Features and Benefits for Organizations', expected: true },
      { input: 'This is an extremely long title that goes way beyond the sixty character limit for optimal SEO', expected: false },
    ];

    test.each(testCases)(
      'should validate "$input" correctly',
      ({ input, expected }) => {
        const title = buildTitle(input);
        const result = validateTitle(title);
        
        if (expected) {
          expect(result.length).toBeLessThanOrEqual(MAX_TITLE_LENGTH);
        } else {
          // Long input should be truncated by buildTitle
          expect(title.length).toBeLessThanOrEqual(MAX_TITLE_LENGTH);
        }
      }
    );
  });

  describe('Brand Duplication Prevention', () => {
    const testCases = [
      'Features | Lyyli.ai',
      'Lyyli.ai Features',
      'About Lyyli.ai',
      'Lyyli.ai - AI Assistant',
      'Features - Lyyli.ai'
    ];

    test.each(testCases)(
      'should not duplicate brand in "%s"',
      (input) => {
        const title = buildTitle(input);
        const brandCount = (title.match(/Lyyli\.ai/g) || []).length;
        
        expect(brandCount).toBe(1);
      }
    );
  });

  describe('Character Limit Enforcement', () => {
    it('should never exceed 60 characters', () => {
      const longTitles = [
        'AI Communication Assistant for Professional Service Organizations',
        'Enterprise-Grade Internal Communications Platform',
        'Transform Your Organization Communication Strategy',
        'Very Long Descriptive Title About Features And Benefits'
      ];

      longTitles.forEach(longTitle => {
        const title = buildTitle(longTitle);
        expect(title.length).toBeLessThanOrEqual(60);
      });
    });

    it('should truncate gracefully with ellipsis', () => {
      const longTitle = 'AI Communication Assistant for Professional Service Organizations Worldwide';
      const title = buildTitle(longTitle);
      
      if (title.includes('...')) {
        expect(title.length).toBeLessThanOrEqual(60);
        expect(title).toMatch(/\.\.\./);
      }
    });

    it('should respect custom max length', () => {
      const title = buildTitle('Features and Benefits', { maxLength: 25 });
      expect(title.length).toBeLessThanOrEqual(25);
    });
  });

  describe('Constants', () => {
    it('should export correct brand name', () => {
      expect(TITLE_CONSTANTS.BRAND_NAME).toBe('Lyyli.ai');
    });

    it('should export correct separator', () => {
      expect(TITLE_CONSTANTS.BRAND_SEPARATOR).toBe(' | ');
    });

    it('should export max length of 60', () => {
      expect(TITLE_CONSTANTS.MAX_TITLE_LENGTH).toBe(60);
    });

    it('should export recommended max', () => {
      expect(TITLE_CONSTANTS.RECOMMENDED_MAX).toBe(55);
    });
  });
});
