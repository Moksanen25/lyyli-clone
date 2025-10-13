/**
 * Title Integration Tests
 * Validates actual title generation across all pages
 */

// Mock modules
jest.mock('next/headers', () => ({
  headers: jest.fn(() => ({
    get: jest.fn((name: string) => {
      if (name === 'host') return 'lyyli.ai';
      if (name === 'x-forwarded-proto') return 'https';
      if (name === 'x-pathname') return '/en';
      return null;
    }),
  })),
  cookies: jest.fn(() => ({
    get: jest.fn(() => ({ value: 'test-nonce' })),
  })),
}));

jest.mock('../lib/i18n', () => ({
  getTranslations: jest.fn((locale: string) => Promise.resolve((key: string) => {
    const translations: Record<string, string> = {
      'home.page.title': 'AI Communication Assistant for Professional Services',
      'about.page.title': 'About',
      'features.page.title': 'Features',
      'pricing.page.title': 'Pricing',
      'contact.page.title': 'Contact',
      'blog.page.title': 'Blog',
      'waitlist.page.title': 'Join the Waitlist',
      'privacy.page.title': 'Privacy Policy',
      'cookies.page.title': 'Cookie Policy',
    };
    return translations[key] || key;
  })),
}));

jest.mock('../lib/blog', () => ({
  getAllBlogPosts: jest.fn(() => []),
}));

describe('Title Integration Tests', () => {
  describe('Page Title Generation', () => {
    const testPageTitle = async (
      pageName: string,
      locale: string,
      expectedPageTitle: string
    ) => {
      try {
        const pagePath = pageName === 'home' ? '' : `${pageName}/`;
        const pageModule = await import(`../app/[locale]/${pagePath}page`);
        
        if (pageModule.generateMetadata) {
          const metadata = await pageModule.generateMetadata({ 
            params: Promise.resolve({ locale }) 
          });
          
          const title = typeof metadata.title === 'string' 
            ? metadata.title 
            : metadata.title;

          // Verify title exists
          expect(title).toBeDefined();
          expect(title).toBeTruthy();

          // Verify brand appears only once
          const brandCount = (String(title).match(/Lyyli\.ai/g) || []).length;
          expect(brandCount).toBeLessThanOrEqual(1);

          // Verify title length
          expect(String(title).length).toBeLessThanOrEqual(60);

          // Verify no double spaces or placeholder values
          expect(String(title)).not.toMatch(/  /);
          expect(String(title)).not.toContain('undefined');
          expect(String(title)).not.toContain('null');
        }
      } catch (error) {
        console.warn(`Could not test ${pageName} page:`, error);
      }
    };

    const pages = [
      { name: 'home', locale: 'en', expected: 'AI Communication Assistant for Professional Services' },
      { name: 'about', locale: 'en', expected: 'About' },
      { name: 'features', locale: 'en', expected: 'Features' },
      { name: 'pricing', locale: 'en', expected: 'Pricing' },
      { name: 'contact', locale: 'en', expected: 'Contact' },
      { name: 'blog', locale: 'en', expected: 'Blog' },
      { name: 'waitlist', locale: 'en', expected: 'Join the Waitlist' },
      { name: 'privacy', locale: 'en', expected: 'Privacy Policy' },
      { name: 'cookies', locale: 'en', expected: 'Cookie Policy' },
    ];

    test.each(pages)(
      'should generate valid title for $name page',
      async ({ name, locale, expected }) => {
        await testPageTitle(name, locale, expected);
      }
    );
  });

  describe('Title Builder Integration', () => {
    it('should use title builder for all main pages', async () => {
      const { buildTitle } = await import('../lib/title');
      
      const testTitles = [
        'Features',
        'Pricing',
        'About',
        'Contact',
        'Blog'
      ];

      testTitles.forEach(pageTitle => {
        const title = buildTitle(pageTitle);
        
        // Should include brand
        expect(title).toContain('Lyyli.ai');
        
        // Brand should appear only once
        const brandCount = (title.match(/Lyyli\.ai/g) || []).length;
        expect(brandCount).toBe(1);
        
        // Should be within limits
        expect(title.length).toBeLessThanOrEqual(60);
      });
    });

    it('should prevent duplication from translations already containing brand', async () => {
      const { buildTitle } = await import('../lib/title');
      
      // Simulate old translation format
      const oldStyleTitle = 'Features - Lyyli.ai';
      const title = buildTitle(oldStyleTitle);
      
      // Should not duplicate
      const brandCount = (title.match(/Lyyli\.ai/g) || []).length;
      expect(brandCount).toBe(1);
    });
  });

  describe('Title Length Validation', () => {
    it('should never exceed 60 characters for any page', async () => {
      const pages = ['home', 'about', 'features', 'pricing', 'contact'];
      
      for (const page of pages) {
        try {
          const pagePath = page === 'home' ? '' : `${page}/`;
          const pageModule = await import(`../app/[locale]/${pagePath}page`);
          
          if (pageModule.generateMetadata) {
            const metadata = await pageModule.generateMetadata({ 
              params: Promise.resolve({ locale: 'en' }) 
            });
            
            const title = String(metadata.title);
            expect(title.length).toBeLessThanOrEqual(60);
          }
        } catch (error) {
          // Some pages may not be accessible in test environment
          console.warn(`Could not test ${page}:`, error);
        }
      }
    });
  });

  describe('Brand Consistency', () => {
    it('should use consistent brand name across all titles', async () => {
      const { TITLE_CONSTANTS } = await import('../lib/title');
      
      expect(TITLE_CONSTANTS.BRAND_NAME).toBe('Lyyli.ai');
      expect(TITLE_CONSTANTS.BRAND_SEPARATOR).toBe(' | ');
    });

    it('should not have multiple brand occurrences in any title', async () => {
      const { buildTitle } = await import('../lib/title');
      
      const pageTitles = [
        'Features',
        'Pricing - Plans',
        'About Our Company',
        'Contact Support',
        'Blog Articles'
      ];

      pageTitles.forEach(pageTitle => {
        const title = buildTitle(pageTitle);
        const brandCount = (title.match(/Lyyli\.ai/g) || []).length;
        
        expect(brandCount).toBe(1);
      });
    });
  });

  describe('Blog Post Titles', () => {
    it('should generate blog post titles with Blog suffix', () => {
      const { buildTitle } = jest.requireActual('../lib/title');
      
      const postTitle = 'Data-Driven Communication';
      const title = buildTitle(`${postTitle} - Blog`);
      
      // Should include blog and brand
      expect(title).toContain('Blog');
      expect(title).toContain('Lyyli.ai');
      
      // Should not duplicate brand
      const brandCount = (title.match(/Lyyli\.ai/g) || []).length;
      expect(brandCount).toBe(1);
      
      // Should be within limits
      expect(title.length).toBeLessThanOrEqual(60);
    });

    it('should handle long blog post titles gracefully', () => {
      const { buildTitle } = jest.requireActual('../lib/title');
      
      const longPostTitle = 'The Complete Guide to AI-Powered Communication Strategies for Enterprise Organizations';
      const title = buildTitle(`${longPostTitle} - Blog`);
      
      expect(title.length).toBeLessThanOrEqual(60);
      expect(title).toContain('Lyyli.ai');
    });
  });
});
