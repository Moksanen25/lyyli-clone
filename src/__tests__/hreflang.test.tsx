/**
 * @jest-environment jsdom
 */
import { 
  generateHreflangLinks, 
  generateHreflangMetadata,
  validateHreflangLinks,
  getProductionDomain
} from '../lib/canonical';

describe('Hreflang Link Generation', () => {
  const PRODUCTION_DOMAIN = 'https://lyyli.ai';

  describe('generateHreflangLinks', () => {
    it('should generate hreflang links for root path', () => {
      const links = generateHreflangLinks('/');
      
      expect(links).toEqual({
        en: `${PRODUCTION_DOMAIN}/en`,
        fi: `${PRODUCTION_DOMAIN}/fi`,
        'x-default': `${PRODUCTION_DOMAIN}/en`
      });
    });

    it('should generate hreflang links for subpages', () => {
      const links = generateHreflangLinks('/about');
      
      expect(links).toEqual({
        en: `${PRODUCTION_DOMAIN}/en/about`,
        fi: `${PRODUCTION_DOMAIN}/fi/about`,
        'x-default': `${PRODUCTION_DOMAIN}/en/about`
      });
    });

    it('should handle paths with locale prefix', () => {
      const links = generateHreflangLinks('/en/about');
      
      expect(links).toEqual({
        en: `${PRODUCTION_DOMAIN}/en/about`,
        fi: `${PRODUCTION_DOMAIN}/fi/about`,
        'x-default': `${PRODUCTION_DOMAIN}/en/about`
      });
    });

    it('should handle nested paths', () => {
      const links = generateHreflangLinks('/blog/my-post');
      
      expect(links).toEqual({
        en: `${PRODUCTION_DOMAIN}/en/blog/my-post`,
        fi: `${PRODUCTION_DOMAIN}/fi/blog/my-post`,
        'x-default': `${PRODUCTION_DOMAIN}/en/blog/my-post`
      });
    });

    it('should handle paths without leading slash', () => {
      const links = generateHreflangLinks('contact');
      
      expect(links).toEqual({
        en: `${PRODUCTION_DOMAIN}/en/contact`,
        fi: `${PRODUCTION_DOMAIN}/fi/contact`,
        'x-default': `${PRODUCTION_DOMAIN}/en/contact`
      });
    });

    it('should use custom default locale', () => {
      const links = generateHreflangLinks('/about', ['en', 'fi'], 'fi');
      
      expect(links['x-default']).toBe(`${PRODUCTION_DOMAIN}/fi/about`);
    });

    it('should support custom locales', () => {
      const links = generateHreflangLinks('/about', ['en', 'fi', 'sv']);
      
      expect(links).toHaveProperty('en');
      expect(links).toHaveProperty('fi');
      expect(links).toHaveProperty('sv');
      expect(links).toHaveProperty('x-default');
    });
  });

  describe('generateHreflangMetadata', () => {
    it('should generate metadata with x-default', () => {
      const metadata = generateHreflangMetadata('/features');
      
      expect(metadata).toHaveProperty('en');
      expect(metadata).toHaveProperty('fi');
      expect(metadata).toHaveProperty('x-default');
      expect(metadata['x-default']).toBe(`${PRODUCTION_DOMAIN}/en/features`);
    });

    it('should handle root path', () => {
      const metadata = generateHreflangMetadata('/');
      
      expect(metadata.en).toBe(`${PRODUCTION_DOMAIN}/en`);
      expect(metadata.fi).toBe(`${PRODUCTION_DOMAIN}/fi`);
      expect(metadata['x-default']).toBe(`${PRODUCTION_DOMAIN}/en`);
    });

    it('should remove locale prefix from path', () => {
      const metadata = generateHreflangMetadata('/fi/pricing');
      
      expect(metadata.en).toBe(`${PRODUCTION_DOMAIN}/en/pricing`);
      expect(metadata.fi).toBe(`${PRODUCTION_DOMAIN}/fi/pricing`);
      expect(metadata['x-default']).toBe(`${PRODUCTION_DOMAIN}/en/pricing`);
    });
  });

  describe('validateHreflangLinks', () => {
    it('should validate correct hreflang links', () => {
      const links = {
        en: `${PRODUCTION_DOMAIN}/en/about`,
        fi: `${PRODUCTION_DOMAIN}/fi/about`,
        'x-default': `${PRODUCTION_DOMAIN}/en/about`
      };
      
      const result = validateHreflangLinks(links);
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect mismatched locale in URL', () => {
      const links = {
        en: `${PRODUCTION_DOMAIN}/fi/about`, // Wrong locale
        fi: `${PRODUCTION_DOMAIN}/fi/about`,
        'x-default': `${PRODUCTION_DOMAIN}/en/about`
      };
      
      const result = validateHreflangLinks(links);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('en: URL does not include correct locale in path: https://lyyli.ai/fi/about');
    });

    it('should detect invalid domain', () => {
      const links = {
        en: 'https://example.com/en/about',
        fi: `${PRODUCTION_DOMAIN}/fi/about`,
        'x-default': `${PRODUCTION_DOMAIN}/en/about`
      };
      
      const result = validateHreflangLinks(links);
      
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate x-default separately', () => {
      const links = {
        en: `${PRODUCTION_DOMAIN}/en/about`,
        fi: `${PRODUCTION_DOMAIN}/fi/about`,
        'x-default': 'https://preview.vercel.app/en/about'
      };
      
      const result = validateHreflangLinks(links);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('x-default URL is invalid: https://preview.vercel.app/en/about');
    });

    it('should handle missing locale in path', () => {
      const links = {
        en: `${PRODUCTION_DOMAIN}/about`, // Missing locale
        fi: `${PRODUCTION_DOMAIN}/fi/about`,
        'x-default': `${PRODUCTION_DOMAIN}/en/about`
      };
      
      const result = validateHreflangLinks(links);
      
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('does not include correct locale'))).toBe(true);
    });
  });

  describe('Locale-Specific URL Validation', () => {
    it('should ensure FI links point to /fi/* paths', () => {
      const paths = ['/about', '/features', '/pricing', '/blog/post', '/contact'];
      
      paths.forEach(path => {
        const links = generateHreflangLinks(path);
        expect(links.fi).toMatch(/^https:\/\/lyyli\.ai\/fi\//);
      });
    });

    it('should ensure EN links point to /en/* paths', () => {
      const paths = ['/about', '/features', '/pricing', '/blog/post', '/contact'];
      
      paths.forEach(path => {
        const links = generateHreflangLinks(path);
        expect(links.en).toMatch(/^https:\/\/lyyli\.ai\/en\//);
      });
    });

    it('should ensure one-to-one correspondence between locales', () => {
      const path = '/features';
      const links = generateHreflangLinks(path);
      
      // Extract path after locale
      const enPath = links.en.replace(`${PRODUCTION_DOMAIN}/en`, '');
      const fiPath = links.fi.replace(`${PRODUCTION_DOMAIN}/fi`, '');
      
      // Paths after locale should be identical
      expect(enPath).toBe(fiPath);
      expect(enPath).toBe('/features');
    });

    it('should maintain path structure across all locales', () => {
      const testPaths = [
        '/about',
        '/features',
        '/pricing',
        '/blog/my-article',
        '/help/getting-started',
        '/contact'
      ];
      
      testPaths.forEach(path => {
        const links = generateHreflangLinks(path);
        
        // Extract the path after locale for each language
        const enPath = links.en.replace(`${PRODUCTION_DOMAIN}/en`, '');
        const fiPath = links.fi.replace(`${PRODUCTION_DOMAIN}/fi`, '');
        const defaultPath = links['x-default'].replace(`${PRODUCTION_DOMAIN}/en`, '');
        
        // All should have the same path structure
        expect(enPath).toBe(fiPath);
        expect(enPath).toBe(defaultPath);
      });
    });
  });

  describe('Production Domain Consistency', () => {
    it('should always use production domain for hreflang links', () => {
      const paths = ['/about', '/features', '/pricing', '/blog/post'];
      
      paths.forEach(path => {
        const links = generateHreflangLinks(path);
        
        Object.values(links).forEach(url => {
          expect(url).toMatch(/^https:\/\/lyyli\.ai\//);
          expect(url).not.toMatch(/vercel\.app/);
          expect(url).not.toMatch(/localhost/);
          expect(url).not.toMatch(/staging/);
        });
      });
    });

    it('should always use HTTPS', () => {
      const links = generateHreflangLinks('/about');
      
      Object.values(links).forEach(url => {
        expect(url).toMatch(/^https:\/\//);
        expect(url).not.toMatch(/^http:\/\//);
      });
    });
  });

  describe('X-Default Behavior', () => {
    it('should point x-default to English by default', () => {
      const paths = ['/about', '/features', '/pricing', '/contact'];
      
      paths.forEach(path => {
        const links = generateHreflangLinks(path);
        const enUrl = links.en;
        const xDefaultUrl = links['x-default'];
        
        expect(xDefaultUrl).toBe(enUrl);
      });
    });

    it('should respect custom default locale', () => {
      const links = generateHreflangLinks('/about', ['en', 'fi'], 'fi');
      
      expect(links['x-default']).toBe(links.fi);
    });

    it('should include x-default in all metadata', () => {
      const paths = ['/about', '/features', '/pricing', '/blog/post'];
      
      paths.forEach(path => {
        const metadata = generateHreflangMetadata(path);
        expect(metadata).toHaveProperty('x-default');
        expect(metadata['x-default']).toMatch(/^https:\/\/lyyli\.ai\/en\//);
      });
    });
  });
});
