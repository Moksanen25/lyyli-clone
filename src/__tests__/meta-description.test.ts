/**
 * Meta Description Tests
 * Validates description length, keywords, and SEO compliance
 */

import {
  validateDescription,
  truncateDescription,
  ensureKeyword,
  findDuplicateDescriptions,
  getOptimalLength,
  validateDescriptionFromTranslation,
  DESCRIPTION_CONSTANTS
} from '../lib/meta-description';

describe('Meta Description Validation', () => {
  const VALID_DESCRIPTION = 'Transform your internal communications with enterprise-grade AI. Streamline workflows for operations leaders and communications managers.';

  describe('validateDescription', () => {
    it('should validate correct description', () => {
      const result = validateDescription(VALID_DESCRIPTION);
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.length).toBeGreaterThanOrEqual(120);
      expect(result.length).toBeLessThanOrEqual(155);
    });

    it('should detect missing description', () => {
      const result = validateDescription('');
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Description is missing or empty');
    });

    it('should detect too short description', () => {
      const shortDesc = 'Too short description.';
      const result = validateDescription(shortDesc);
      
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('too short'))).toBe(true);
      expect(result.length).toBeLessThan(120);
    });

    it('should detect too long description', () => {
      const longDesc = 'This is an extremely long meta description that goes way beyond the maximum recommended character limit of 155 characters for optimal SEO performance in search engine results pages and should be truncated.';
      const result = validateDescription(longDesc);
      
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('too long'))).toBe(true);
      expect(result.length).toBeGreaterThan(155);
    });

    it('should validate keyword presence', () => {
      const desc = 'A description about features and benefits for organizations.';
      const result = validateDescription(desc, 'AI communication');
      
      expect(result.warnings.some(w => w.includes('Primary keyword'))).toBe(true);
    });

    it('should detect keyword when present', () => {
      const desc = 'AI communication platform for professional service organizations. Streamline workflows with enterprise-grade security and governance.';
      const result = validateDescription(desc, 'AI communication');
      
      expect(result.warnings.some(w => w.includes('keyword'))).toBe(false);
    });

    it('should detect double spaces', () => {
      const desc = 'Description with  double  spaces that need to be fixed for optimal SEO performance and better readability in search results.';
      const result = validateDescription(desc);
      
      expect(result.warnings).toContain('Description contains double spaces');
    });

    it('should detect missing punctuation', () => {
      const desc = 'Description without proper ending punctuation that should be fixed for better readability and professional appearance in search';
      const result = validateDescription(desc);
      
      expect(result.warnings.some(w => w.includes('punctuation'))).toBe(true);
    });

    it('should detect placeholder values', () => {
      const desc = 'undefined description for this page';
      const result = validateDescription(desc);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Description contains placeholder values');
    });
  });

  describe('truncateDescription', () => {
    it('should not truncate description within limit', () => {
      const desc = 'Short description that fits.';
      const truncated = truncateDescription(desc);
      
      expect(truncated).toBe(desc);
    });

    it('should truncate at sentence boundary', () => {
      const desc = 'First sentence is good. Second sentence is also good. Third sentence makes it too long and should be removed for optimal length control.';
      const truncated = truncateDescription(desc, 155);
      
      expect(truncated.length).toBeLessThanOrEqual(155);
      expect(truncated.endsWith('.')).toBe(true);
      expect(truncated).toContain('First sentence');
    });

    it('should truncate at word boundary if no sentence boundary', () => {
      const desc = 'A very long description without proper sentence boundaries that just keeps going and going without any punctuation to help with truncation at all until we reach the limit';
      const truncated = truncateDescription(desc, 155);
      
      expect(truncated.length).toBeLessThanOrEqual(155);
      expect(truncated.endsWith('...')).toBe(true);
    });

    it('should respect custom max length', () => {
      const desc = 'This is a custom length test description that needs to be truncated at a specific character count.';
      const truncated = truncateDescription(desc, 50);
      
      expect(truncated.length).toBeLessThanOrEqual(50);
    });
  });

  describe('ensureKeyword', () => {
    it('should detect existing keyword', () => {
      const desc = 'AI communication platform for enterprises.';
      const result = ensureKeyword(desc, 'AI communication');
      
      expect(result.hasKeyword).toBe(true);
      expect(result.suggestion).toBeUndefined();
    });

    it('should suggest keyword placement when missing', () => {
      const desc = 'Platform for enterprises and organizations.';
      const result = ensureKeyword(desc, 'AI communication');
      
      expect(result.hasKeyword).toBe(false);
      expect(result.suggestion).toBeDefined();
      expect(result.suggestion).toContain('AI communication');
    });

    it('should truncate suggestion if too long', () => {
      const longDesc = 'This is a very long description that already exceeds the maximum recommended character limit and needs to be truncated even with keyword added.';
      const result = ensureKeyword(longDesc, 'Enterprise AI');
      
      expect(result.suggestion!.length).toBeLessThanOrEqual(155);
    });
  });

  describe('findDuplicateDescriptions', () => {
    it('should detect duplicate descriptions', () => {
      const descriptions = {
        'page1.description': 'Same description',
        'page2.description': 'Same description',
        'page3.description': 'Different description'
      };
      
      const duplicates = findDuplicateDescriptions(descriptions);
      
      expect(duplicates.length).toBeGreaterThan(0);
      expect(duplicates[0]).toContain('page1');
      expect(duplicates[0]).toContain('page2');
    });

    it('should return empty array when no duplicates', () => {
      const descriptions = {
        'page1.description': 'Unique description one',
        'page2.description': 'Unique description two',
        'page3.description': 'Unique description three'
      };
      
      const duplicates = findDuplicateDescriptions(descriptions);
      
      expect(duplicates).toHaveLength(0);
    });

    it('should normalize whitespace and case when checking', () => {
      const descriptions = {
        'page1.description': 'Same Description ',
        'page2.description': ' same description',
        'page3.description': 'Different description'
      };
      
      const duplicates = findDuplicateDescriptions(descriptions);
      
      expect(duplicates.length).toBeGreaterThan(0);
    });
  });

  describe('getOptimalLength', () => {
    it('should return length constraints for English', () => {
      const optimal = getOptimalLength('en');
      
      expect(optimal.min).toBe(120);
      expect(optimal.max).toBe(155);
      expect(optimal.recommended).toBeDefined();
    });

    it('should return length constraints for Finnish', () => {
      const optimal = getOptimalLength('fi');
      
      expect(optimal.min).toBe(120);
      expect(optimal.max).toBe(155);
      expect(optimal.recommended).toBeDefined();
    });

    it('should have default for unknown locales', () => {
      const optimal = getOptimalLength('de');
      
      expect(optimal.min).toBe(120);
      expect(optimal.max).toBe(155);
    });
  });

  describe('validateDescriptionFromTranslation', () => {
    it('should validate translation value', () => {
      const desc = 'Transform your internal communications with enterprise-grade AI. Streamline workflows for operations leaders and communications managers.';
      const result = validateDescriptionFromTranslation(desc, 'home.page', 'AI communication');
      
      expect(result.valid).toBe(true);
    });

    it('should detect missing translation', () => {
      const result = validateDescriptionFromTranslation(undefined, 'test.page');
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Missing description for test.page');
    });
  });

  describe('SEO Length Requirements', () => {
    const testCases = [
      { length: 119, expected: false }, // Too short
      { length: 120, expected: true },  // Min valid
      { length: 140, expected: true },  // Optimal
      { length: 155, expected: true },  // Max valid
      { length: 156, expected: false }, // Too long
    ];

    test.each(testCases)(
      'should validate description of $length characters',
      ({ length, expected }) => {
        const desc = 'a'.repeat(length);
        const result = validateDescription(desc);
        
        expect(result.valid).toBe(expected);
      }
    );
  });

  describe('Keyword Integration', () => {
    const keywords = {
      'home': 'AI communication',
      'features': 'AI-powered features',
      'pricing': 'pricing',
      'contact': 'contact',
      'blog': 'insights',
      'about': 'mission'
    };

    Object.entries(keywords).forEach(([page, keyword]) => {
      it(`should validate keyword "${keyword}" for ${page} page`, () => {
        const desc = `Test description with ${keyword} included for SEO optimization and better search visibility with proper length constraints.`;
        const result = validateDescription(desc, keyword);
        
        expect(result.warnings.some(w => w.includes('keyword'))).toBe(false);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle description at exact min length', () => {
      const desc = 'a'.repeat(120);
      const result = validateDescription(desc);
      
      expect(result.valid).toBe(true);
      expect(result.length).toBe(120);
    });

    it('should handle description at exact max length', () => {
      const desc = 'a'.repeat(155);
      const result = validateDescription(desc);
      
      expect(result.valid).toBe(true);
      expect(result.length).toBe(155);
    });

    it('should handle non-ASCII characters', () => {
      const desc = 'Käytännön ohjeita tekoälyviestinnästä, koordinaatiosta ja turvallisista operaatioista asiantuntijaorganisaatioille ja viestintäjohtajille.';
      const result = validateDescription(desc);
      
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle special characters', () => {
      const desc = 'Platform for AI-powered communication & coordination. Features include: automation, analytics, and enterprise-grade security solutions.';
      const result = validateDescription(desc);
      
      expect(result.valid).toBe(true);
    });
  });

  describe('Constants', () => {
    it('should export correct min length', () => {
      expect(DESCRIPTION_CONSTANTS.MIN_LENGTH).toBe(120);
    });

    it('should export correct max length', () => {
      expect(DESCRIPTION_CONSTANTS.MAX_LENGTH).toBe(155);
    });

    it('should export recommended constraints', () => {
      expect(DESCRIPTION_CONSTANTS.RECOMMENDED_MIN).toBe(125);
      expect(DESCRIPTION_CONSTANTS.RECOMMENDED_MAX).toBe(150);
    });
  });
});
