/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { 
  generateCanonicalUrl, 
  generatePageCanonicalUrl, 
  generateBlogCanonicalUrl,
  generateAlternateUrls,
  isValidCanonicalUrl,
  getProductionDomain
} from '../lib/canonical';

describe('Canonical URL Utilities', () => {
  const PRODUCTION_DOMAIN = 'https://lyyli.ai';

  describe('generateCanonicalUrl', () => {
    it('should generate correct canonical URL for root path', () => {
      expect(generateCanonicalUrl('/', 'en')).toBe(`${PRODUCTION_DOMAIN}/en`);
      expect(generateCanonicalUrl('/', 'fi')).toBe(`${PRODUCTION_DOMAIN}/fi`);
    });

    it('should generate correct canonical URL for subpaths', () => {
      expect(generateCanonicalUrl('/about', 'en')).toBe(`${PRODUCTION_DOMAIN}/en/about`);
      expect(generateCanonicalUrl('about', 'fi')).toBe(`${PRODUCTION_DOMAIN}/fi/about`);
    });

    it('should handle paths that already include locale', () => {
      expect(generateCanonicalUrl('/en/about', 'en')).toBe(`${PRODUCTION_DOMAIN}/en/about`);
      expect(generateCanonicalUrl('/fi/blog', 'fi')).toBe(`${PRODUCTION_DOMAIN}/fi/blog`);
    });
  });

  describe('generatePageCanonicalUrl', () => {
    it('should generate correct URLs for different pages', () => {
      expect(generatePageCanonicalUrl('about', 'en')).toBe(`${PRODUCTION_DOMAIN}/en/about`);
      expect(generatePageCanonicalUrl('features', 'fi')).toBe(`${PRODUCTION_DOMAIN}/fi/features`);
      expect(generatePageCanonicalUrl('pricing', 'en')).toBe(`${PRODUCTION_DOMAIN}/en/pricing`);
    });

    it('should handle root page correctly', () => {
      expect(generatePageCanonicalUrl('', 'en')).toBe(`${PRODUCTION_DOMAIN}/en`);
      expect(generatePageCanonicalUrl('', 'fi')).toBe(`${PRODUCTION_DOMAIN}/fi`);
    });

    it('should handle nested paths', () => {
      expect(generatePageCanonicalUrl('help/getting-started', 'en')).toBe(`${PRODUCTION_DOMAIN}/en/help/getting-started`);
    });
  });

  describe('generateBlogCanonicalUrl', () => {
    it('should generate correct blog post URLs', () => {
      expect(generateBlogCanonicalUrl('test-post', 'en')).toBe(`${PRODUCTION_DOMAIN}/en/blog/test-post`);
      expect(generateBlogCanonicalUrl('test-post-fi', 'fi')).toBe(`${PRODUCTION_DOMAIN}/fi/blog/test-post-fi`);
    });
  });

  describe('generateAlternateUrls', () => {
    it('should generate alternate URLs for all locales', () => {
      const alternates = generateAlternateUrls('/about', ['en', 'fi']);
      expect(alternates).toEqual({
        en: `${PRODUCTION_DOMAIN}/en/about`,
        fi: `${PRODUCTION_DOMAIN}/fi/about`
      });
    });

    it('should handle root path', () => {
      const alternates = generateAlternateUrls('/', ['en', 'fi']);
      expect(alternates).toEqual({
        en: `${PRODUCTION_DOMAIN}/en`,
        fi: `${PRODUCTION_DOMAIN}/fi`
      });
    });

    it('should handle paths with existing locale', () => {
      const alternates = generateAlternateUrls('/en/blog', ['en', 'fi']);
      expect(alternates).toEqual({
        en: `${PRODUCTION_DOMAIN}/en/blog`,
        fi: `${PRODUCTION_DOMAIN}/fi/blog`
      });
    });
  });

  describe('isValidCanonicalUrl', () => {
    it('should validate production URLs', () => {
      expect(isValidCanonicalUrl(`${PRODUCTION_DOMAIN}/en`)).toBe(true);
      expect(isValidCanonicalUrl(`${PRODUCTION_DOMAIN}/fi/about`)).toBe(true);
      expect(isValidCanonicalUrl(`${PRODUCTION_DOMAIN}/en/blog/post`)).toBe(true);
    });

    it('should reject non-production URLs', () => {
      expect(isValidCanonicalUrl('https://preview-123.vercel.app/en')).toBe(false);
      expect(isValidCanonicalUrl('https://localhost:3000/en')).toBe(false);
      expect(isValidCanonicalUrl('https://staging.lyyli.ai/en')).toBe(false);
      expect(isValidCanonicalUrl('http://lyyli.ai/en')).toBe(false); // Wrong protocol
    });

    it('should handle invalid URLs', () => {
      expect(isValidCanonicalUrl('not-a-url')).toBe(false);
      expect(isValidCanonicalUrl('')).toBe(false);
    });
  });

  describe('getProductionDomain', () => {
    it('should return the correct production domain', () => {
      expect(getProductionDomain()).toBe(PRODUCTION_DOMAIN);
    });
  });

  describe('Production Domain Consistency', () => {
    it('should always use lyyli.ai domain', () => {
      const urls = [
        generateCanonicalUrl('/about', 'en'),
        generatePageCanonicalUrl('features', 'fi'),
        generateBlogCanonicalUrl('test-post', 'en'),
        ...Object.values(generateAlternateUrls('/contact', ['en', 'fi']))
      ];

      urls.forEach(url => {
        expect(url).toMatch(/^https:\/\/lyyli\.ai\//);
        expect(isValidCanonicalUrl(url)).toBe(true);
      });
    });

    it('should never generate preview or development URLs', () => {
      const urls = [
        generateCanonicalUrl('/about', 'en'),
        generatePageCanonicalUrl('features', 'fi'),
        generateBlogCanonicalUrl('test-post', 'en'),
      ];

      urls.forEach(url => {
        expect(url).not.toMatch(/vercel\.app/);
        expect(url).not.toMatch(/localhost/);
        expect(url).not.toMatch(/staging/);
        expect(url).not.toMatch(/preview/);
      });
    });
  });
});
