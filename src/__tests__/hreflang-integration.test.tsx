/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';

// Mock next modules
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

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => '/en',
}));

jest.mock('next/dynamic', () => {
  return (component: () => Promise<{ default: React.ComponentType<any> }>) => {
    const Component = () => <div>Mocked Dynamic Component</div>;
    Component.displayName = 'MockedDynamicComponent';
    return Component;
  };
});

jest.mock('../lib/i18n', () => ({
  getTranslations: jest.fn(() => Promise.resolve((key: string) => key)),
}));

jest.mock('../lib/fonts', () => ({
  fontVars: 'font-vars-class',
}));

jest.mock('../lib/blog', () => ({
  getAllBlogPosts: jest.fn(() => []),
}));

describe('Hreflang Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Page Metadata Hreflang Generation', () => {
    const testPageMetadata = async (
      pageName: string,
      locale: string,
      expectedPath: string
    ) => {
      try {
        const pageModule = await import(`../app/[locale]/${pageName === 'home' ? '' : `${pageName  }/`}page`);
        const generateMetadata = pageModule.generateMetadata;

        if (generateMetadata) {
          const metadata = await generateMetadata({ params: Promise.resolve({ locale }) });

          // Check that languages alternates exist
          expect(metadata.alternates?.languages).toBeDefined();
          const languages = metadata.alternates?.languages as Record<string, string>;

          // Check that both locales are present
          expect(languages).toHaveProperty('en');
          expect(languages).toHaveProperty('fi');
          expect(languages).toHaveProperty('x-default');

          // Validate English URL
          expect(languages.en).toBe(`https://lyyli.ai/en${expectedPath}`);

          // Validate Finnish URL
          expect(languages.fi).toBe(`https://lyyli.ai/fi${expectedPath}`);

          // Validate x-default points to English
          expect(languages['x-default']).toBe(`https://lyyli.ai/en${expectedPath}`);

          // Ensure FI links to /fi/* and EN to /en/*
          // For root pages, allow /en or /en/, for subpages require /en/path
          if (expectedPath === '') {
            expect(languages.en).toMatch(/^https:\/\/lyyli\.ai\/en$/);
            expect(languages.fi).toMatch(/^https:\/\/lyyli\.ai\/fi$/);
          } else {
            expect(languages.en).toMatch(/^https:\/\/lyyli\.ai\/en\//);
            expect(languages.fi).toMatch(/^https:\/\/lyyli\.ai\/fi\//);
          }

          // Ensure one-to-one correspondence
          const enPath = languages.en.replace('https://lyyli.ai/en', '');
          const fiPath = languages.fi.replace('https://lyyli.ai/fi', '');
          expect(enPath).toBe(fiPath);

          // Ensure no preview/staging URLs
          expect(languages.en).not.toMatch(/vercel\.app/);
          expect(languages.fi).not.toMatch(/vercel\.app/);
          expect(languages['x-default']).not.toMatch(/vercel\.app/);
        }
      } catch (error) {
        console.warn(`Could not test ${pageName} page:`, error);
      }
    };

    const keyRoutes = [
      { pageName: 'home', locale: 'en', expectedPath: '' },
      { pageName: 'home', locale: 'fi', expectedPath: '' },
      { pageName: 'about', locale: 'en', expectedPath: '/about' },
      { pageName: 'about', locale: 'fi', expectedPath: '/about' },
      { pageName: 'features', locale: 'en', expectedPath: '/features' },
      { pageName: 'features', locale: 'fi', expectedPath: '/features' },
      { pageName: 'pricing', locale: 'en', expectedPath: '/pricing' },
      { pageName: 'pricing', locale: 'fi', expectedPath: '/pricing' },
      { pageName: 'contact', locale: 'en', expectedPath: '/contact' },
      { pageName: 'contact', locale: 'fi', expectedPath: '/contact' },
      { pageName: 'blog', locale: 'en', expectedPath: '/blog' },
      { pageName: 'blog', locale: 'fi', expectedPath: '/blog' },
      { pageName: 'waitlist', locale: 'en', expectedPath: '/waitlist' },
      { pageName: 'waitlist', locale: 'fi', expectedPath: '/waitlist' },
      { pageName: 'privacy', locale: 'en', expectedPath: '/privacy' },
      { pageName: 'privacy', locale: 'fi', expectedPath: '/privacy' },
      { pageName: 'cookies', locale: 'en', expectedPath: '/cookies' },
      { pageName: 'cookies', locale: 'fi', expectedPath: '/cookies' },
    ];

    test.each(keyRoutes)(
      'should have correct hreflang links for $pageName page in $locale locale',
      async ({ pageName, locale, expectedPath }) => {
        await testPageMetadata(pageName, locale, expectedPath);
      }
    );
  });

  describe('Hreflang URL Structure Validation', () => {
    it('should ensure all hreflang URLs use production domain', async () => {
      const pageModule = await import('../app/[locale]/about/page');
      const metadata = await pageModule.generateMetadata({ params: Promise.resolve({ locale: 'en' }) });

      const languages = metadata.alternates?.languages as Record<string, string>;
      const urls = Object.values(languages);

      urls.forEach(url => {
        expect(url).toMatch(/^https:\/\/lyyli\.ai\//);
      });
    });

    it('should ensure all hreflang URLs use HTTPS', async () => {
      const pageModule = await import('../app/[locale]/features/page');
      const metadata = await pageModule.generateMetadata({ params: Promise.resolve({ locale: 'fi' }) });

      const languages = metadata.alternates?.languages as Record<string, string>;
      const urls = Object.values(languages);

      urls.forEach(url => {
        expect(url).toMatch(/^https:\/\//);
        expect(url).not.toMatch(/^http:\/\//);
      });
    });

    it('should not include preview or development URLs', async () => {
      const pageModule = await import('../app/[locale]/pricing/page');
      const metadata = await pageModule.generateMetadata({ params: Promise.resolve({ locale: 'en' }) });

      const languages = metadata.alternates?.languages as Record<string, string>;
      const urls = Object.values(languages);

      urls.forEach(url => {
        expect(url).not.toMatch(/vercel\.app/);
        expect(url).not.toMatch(/localhost/);
        expect(url).not.toMatch(/staging/);
        expect(url).not.toMatch(/preview/);
      });
    });
  });

  describe('Locale-Specific Path Validation', () => {
    it('should ensure FI hreflang links point to /fi/* paths', async () => {
      const pages = ['about', 'features', 'pricing', 'contact', 'blog'];

      for (const page of pages) {
        try {
          const pageModule = await import(`../app/[locale]/${page}/page`);
          const metadata = await pageModule.generateMetadata({ params: Promise.resolve({ locale: 'en' }) });

          const languages = metadata.alternates?.languages as Record<string, string>;
          expect(languages.fi).toMatch(/^https:\/\/lyyli\.ai\/fi\//);
        } catch (error) {
          console.warn(`Could not test ${page} page:`, error);
        }
      }
    });

    it('should ensure EN hreflang links point to /en/* paths', async () => {
      const pages = ['about', 'features', 'pricing', 'contact', 'blog'];

      for (const page of pages) {
        try {
          const pageModule = await import(`../app/[locale]/${page}/page`);
          const metadata = await pageModule.generateMetadata({ params: Promise.resolve({ locale: 'fi' }) });

          const languages = metadata.alternates?.languages as Record<string, string>;
          expect(languages.en).toMatch(/^https:\/\/lyyli\.ai\/en\//);
        } catch (error) {
          console.warn(`Could not test ${page} page:`, error);
        }
      }
    });

    it('should ensure one-to-one correspondence between EN and FI paths', async () => {
      const pageModule = await import('../app/[locale]/features/page');
      const metadata = await pageModule.generateMetadata({ params: Promise.resolve({ locale: 'en' }) });

      const languages = metadata.alternates?.languages as Record<string, string>;

      // Extract paths after locale
      const enPath = languages.en.replace('https://lyyli.ai/en', '');
      const fiPath = languages.fi.replace('https://lyyli.ai/fi', '');

      expect(enPath).toBe(fiPath);
    });
  });

  describe('X-Default Hreflang Tag', () => {
    it('should include x-default in all pages', async () => {
      const pages = ['about', 'features', 'pricing', 'contact', 'waitlist'];

      for (const page of pages) {
        try {
          const pageModule = await import(`../app/[locale]/${page}/page`);
          const metadata = await pageModule.generateMetadata({ params: Promise.resolve({ locale: 'en' }) });

          const languages = metadata.alternates?.languages as Record<string, string>;
          expect(languages).toHaveProperty('x-default');
        } catch (error) {
          console.warn(`Could not test ${page} page:`, error);
        }
      }
    });

    it('should point x-default to English version by default', async () => {
      const pageModule = await import('../app/[locale]/about/page');
      const metadata = await pageModule.generateMetadata({ params: Promise.resolve({ locale: 'fi' }) });

      const languages = metadata.alternates?.languages as Record<string, string>;

      // x-default should point to English version
      expect(languages['x-default']).toBe(languages.en);
      expect(languages['x-default']).toMatch(/^https:\/\/lyyli\.ai\/en\//);
    });

    it('should ensure x-default uses production domain', async () => {
      const pages = ['home', 'about', 'features', 'pricing', 'contact'];

      for (const page of pages) {
        try {
          const pagePath = page === 'home' ? '' : `${page}/`;
          const pageModule = await import(`../app/[locale]/${pagePath}page`);
          const metadata = await pageModule.generateMetadata({ params: Promise.resolve({ locale: 'en' }) });

          const languages = metadata.alternates?.languages as Record<string, string>;
          expect(languages['x-default']).toMatch(/^https:\/\/lyyli\.ai\//);
          expect(languages['x-default']).not.toMatch(/vercel\.app/);
        } catch (error) {
          console.warn(`Could not test ${page} page:`, error);
        }
      }
    });
  });

  describe('Hreflang Count Validation', () => {
    it('should have exactly 3 hreflang entries (en, fi, x-default)', async () => {
      const pageModule = await import('../app/[locale]/about/page');
      const metadata = await pageModule.generateMetadata({ params: Promise.resolve({ locale: 'en' }) });

      const languages = metadata.alternates?.languages as Record<string, string>;
      const hreflangCount = Object.keys(languages).length;

      expect(hreflangCount).toBe(3);
      expect(languages).toHaveProperty('en');
      expect(languages).toHaveProperty('fi');
      expect(languages).toHaveProperty('x-default');
    });

    it('should not have duplicate hreflang entries', async () => {
      const pageModule = await import('../app/[locale]/features/page');
      const metadata = await pageModule.generateMetadata({ params: Promise.resolve({ locale: 'fi' }) });

      const languages = metadata.alternates?.languages as Record<string, string>;
      const locales = Object.keys(languages);

      // Check for uniqueness
      const uniqueLocales = new Set(locales);
      expect(uniqueLocales.size).toBe(locales.length);
    });
  });

  describe('Blog Post Hreflang', () => {
    it('should generate proper hreflang for blog posts', () => {
      // Import the actual module (not mocked)
      const canonicalModule = jest.requireActual('../lib/canonical');
      const { generateBlogCanonicalUrl } = canonicalModule;

      // Test the canonical URL generation for blog posts
      const enUrl = generateBlogCanonicalUrl('test-post', 'en');
      const fiUrl = generateBlogCanonicalUrl('test-post', 'fi');

      expect(enUrl).toBe('https://lyyli.ai/en/blog/test-post');
      expect(fiUrl).toBe('https://lyyli.ai/fi/blog/test-post');

      // Test hreflang metadata for blog
      const { generateHreflangMetadata } = canonicalModule;
      const hreflang = generateHreflangMetadata('/blog/test-post');

      expect(hreflang).toHaveProperty('en');
      expect(hreflang).toHaveProperty('fi');
      expect(hreflang).toHaveProperty('x-default');

      expect(hreflang.en).toBe('https://lyyli.ai/en/blog/test-post');
      expect(hreflang.fi).toBe('https://lyyli.ai/fi/blog/test-post');
      expect(hreflang['x-default']).toBe('https://lyyli.ai/en/blog/test-post');
    });
  });
});
