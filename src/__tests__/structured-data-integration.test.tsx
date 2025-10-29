/**
 * @jest-environment jsdom
 */

// Mock modules
jest.mock('next/headers', () => ({
  headers: jest.fn(() => ({
    get: jest.fn((name: string) => {
      if (name === 'host') return 'lyyli.ai';
      if (name === 'x-forwarded-proto') return 'https';
      if (name === 'x-pathname') return '/en/features';
      return null;
    }),
  })),
  cookies: jest.fn(() => ({
    get: jest.fn(() => ({ value: 'test-nonce' })),
  })),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
  useSearchParams: () => ({ get: jest.fn() }),
  usePathname: () => '/en/features',
}));

jest.mock('../lib/i18n', () => ({
  getTranslations: jest.fn(() => Promise.resolve((key: string) => key)),
}));

jest.mock('../lib/fonts', () => ({
  fontVars: 'font-vars-class',
}));

jest.mock('../lib/blog', () => ({
  getAllBlogPosts: jest.fn(() => []),
}));

describe('Structured Data Integration Tests', () => {
  describe('Schema Generation in Pages', () => {
    it('should generate Organization schema', async () => {
      const { generateOrganizationSchema } = await import(
        '../lib/structured-data'
      );
      const schema = generateOrganizationSchema('en');

      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBe('Lyyli.ai');
      expect(schema.url).toBe('https://lyyli.ai');
      expect(schema.sameAs).toBeDefined();
      expect(schema.logo).toBeDefined();
    });

    it('should generate Website schema with search action', async () => {
      const { generateWebsiteSchema } = await import('../lib/structured-data');
      const schema = generateWebsiteSchema('en');
      const potentialAction = schema.potentialAction as Record<string, unknown>;
      const target = potentialAction.target as Record<string, unknown>;

      expect(schema['@type']).toBe('WebSite');
      expect(potentialAction).toBeDefined();
      expect(potentialAction['@type']).toBe('SearchAction');
      expect(target.urlTemplate).toContain('{search_term_string}');
    });

    it('should generate BreadcrumbList for multi-level paths', async () => {
      const { generateBreadcrumbSchema } = await import(
        '../lib/structured-data'
      );
      const schema = generateBreadcrumbSchema('/en/help/getting-started', 'en');

      expect(schema).not.toBeNull();
      expect(schema!['@type']).toBe('BreadcrumbList');
      expect(schema!.itemListElement).toBeDefined();
      expect(schema!.itemListElement.length).toBeGreaterThan(1);
    });

    it('should generate Article schema for blog posts', async () => {
      const { generateArticleSchema } = await import('../lib/structured-data');
      const schema = generateArticleSchema({
        headline: 'Test Article',
        description: 'Test description',
        datePublished: '2025-01-15',
        author: 'Mikko Oksanen',
        slug: 'test-article',
        locale: 'en',
        keywords: ['AI', 'communication'],
      });
      const author = schema.author as Record<string, unknown>;

      expect(schema['@type']).toBe('Article');
      expect(schema.headline).toBe('Test Article');
      expect(author).toBeDefined();
      expect(author['@type']).toBe('Person');
      expect(schema.publisher).toBeDefined();
    });
  });

  describe('Schema Combination', () => {
    it('should combine multiple schemas correctly', async () => {
      const {
        generateOrganizationSchema,
        generateWebsiteSchema,
        combineSchemas,
      } = await import('../lib/structured-data');

      const org = generateOrganizationSchema('en');
      const website = generateWebsiteSchema('en');
      const combined = combineSchemas(org, website) as Record<string, unknown>;

      expect(combined).not.toBeNull();
      expect(combined['@context']).toBe('https://schema.org');
      expect(combined['@graph']).toBeDefined();
      expect((combined['@graph'] as unknown[]).length).toBe(2);
    });

    it('should handle null breadcrumb gracefully', async () => {
      const {
        generateOrganizationSchema,
        generateBreadcrumbSchema,
        combineSchemas,
      } = await import('../lib/structured-data');

      const org = generateOrganizationSchema('en');
      const breadcrumb = generateBreadcrumbSchema('/en', 'en'); // Returns null
      const combined = combineSchemas(org, breadcrumb) as Record<
        string,
        unknown
      >;

      // Should only include non-null schemas
      expect(combined).not.toBeNull();
      expect(combined['@type']).toBe('Organization');
      expect(combined['@graph']).toBeUndefined();
    });
  });

  describe('Schema URL Validation', () => {
    it('should use production domain in all schemas', async () => {
      const {
        generateOrganizationSchema,
        generateWebsiteSchema,
        generateBreadcrumbSchema,
        generateArticleSchema,
      } = await import('../lib/structured-data');

      const schemas = [
        generateOrganizationSchema('en'),
        generateWebsiteSchema('en'),
        generateBreadcrumbSchema('/en/features', 'en'),
        generateArticleSchema({
          headline: 'Test',
          description: 'Test',
          datePublished: '2025-01-01',
          author: 'Test',
          slug: 'test',
          locale: 'en',
        }),
      ];

      schemas.forEach(schema => {
        if (schema) {
          const schemaStr = JSON.stringify(schema);
          expect(schemaStr).toMatch(/https:\/\/lyyli\.ai/);
          expect(schemaStr).not.toMatch(/localhost/);
          expect(schemaStr).not.toMatch(/vercel\.app/);
          expect(schemaStr).not.toMatch(/staging/i);
        }
      });
    });
  });

  describe('Schema Type Uniqueness', () => {
    it('should ensure one schema type per page', async () => {
      const {
        generateOrganizationSchema,
        generateWebsiteSchema,
        combineSchemas,
      } = await import('../lib/structured-data');

      const combined = combineSchemas(
        generateOrganizationSchema('en'),
        generateWebsiteSchema('en')
      ) as Record<string, unknown>;

      expect(combined).not.toBeNull();

      if (combined?.['@graph']) {
        const graph = combined['@graph'] as Array<Record<string, unknown>>;
        const types = graph.map(s => s['@type']);
        const uniqueTypes = new Set(types);

        // Each type should appear only once
        expect(types.length).toBe(uniqueTypes.size);
      }
    });

    it('should not duplicate Organization schema', async () => {
      const {
        generateOrganizationSchema,
        generateWebsiteSchema,
        combineSchemas,
      } = await import('../lib/structured-data');

      const combined = combineSchemas(
        generateOrganizationSchema('en'),
        generateWebsiteSchema('en')
      );

      const schemaStr = JSON.stringify(combined);
      const orgMatches = (schemaStr.match(/"@type":\s*"Organization"/g) || [])
        .length;

      expect(orgMatches).toBe(1);
    });
  });

  describe('Required Fields Validation', () => {
    it('should include all required Organization fields', async () => {
      const { generateOrganizationSchema } = await import(
        '../lib/structured-data'
      );
      const schema = generateOrganizationSchema('en');

      const requiredFields = ['@context', '@type', '@id', 'name', 'url'];
      requiredFields.forEach(field => {
        expect(schema).toHaveProperty(field);
      });
    });

    it('should include all required Website fields', async () => {
      const { generateWebsiteSchema } = await import('../lib/structured-data');
      const schema = generateWebsiteSchema('en');

      const requiredFields = ['@context', '@type', '@id', 'name', 'url'];
      requiredFields.forEach(field => {
        expect(schema).toHaveProperty(field);
      });
    });

    it('should include all required Article fields', async () => {
      const { generateArticleSchema } = await import('../lib/structured-data');
      const schema = generateArticleSchema({
        headline: 'Test',
        description: 'Test',
        datePublished: '2025-01-01',
        author: 'Test Author',
        slug: 'test',
        locale: 'en',
      });

      const requiredFields = [
        '@context',
        '@type',
        'headline',
        'datePublished',
        'author',
        'publisher',
      ];
      requiredFields.forEach(field => {
        expect(schema).toHaveProperty(field);
      });
    });

    it('should include all required BreadcrumbList fields', async () => {
      const { generateBreadcrumbSchema } = await import(
        '../lib/structured-data'
      );
      const schema = generateBreadcrumbSchema('/en/features', 'en');

      expect(schema).not.toBeNull();
      expect(schema).toHaveProperty('@context');
      expect(schema).toHaveProperty('@type');
      expect(schema).toHaveProperty('itemListElement');
      expect(Array.isArray(schema!.itemListElement)).toBe(true);
    });
  });

  describe('Localization', () => {
    it('should localize Organization description', async () => {
      const { generateOrganizationSchema } = await import(
        '../lib/structured-data'
      );

      const enSchema = generateOrganizationSchema('en');
      const fiSchema = generateOrganizationSchema('fi');

      expect(enSchema.description).not.toBe(fiSchema.description);
      expect(enSchema.description).toMatch(
        /Professional Service Organizations/i
      );
      expect(fiSchema.description).toMatch(/ammattilaisorganisaatioille/i);
    });

    it('should localize breadcrumb names', async () => {
      const { generateBreadcrumbSchema } = await import(
        '../lib/structured-data'
      );

      const enSchema = generateBreadcrumbSchema('/en/features', 'en');
      const fiSchema = generateBreadcrumbSchema('/fi/features', 'fi');

      expect(enSchema!.itemListElement[0].name).toBe('Home');
      expect(fiSchema!.itemListElement[0].name).toBe('Etusivu');
    });
  });
});
