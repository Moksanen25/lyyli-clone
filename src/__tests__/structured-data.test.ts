/**
 * JSON-LD Structured Data Tests
 * Validates schema.org compliance for all structured data
 */

import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateSoftwareApplicationSchema,
  generateWebPageSchema,
  combineSchemas,
  validateSchema,
  ArticleSchemaProps
} from '../lib/structured-data';

describe('Structured Data Generation', () => {
  describe('Organization Schema', () => {
    it('should generate valid Organization schema', () => {
      const schema = generateOrganizationSchema('en');
      
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBe('Lyyli.ai');
      expect(schema.url).toBe('https://lyyli.ai');
      expect(schema['@id']).toBe('https://lyyli.ai/#organization');
    });

    it('should include logo with proper structure', () => {
      const schema = generateOrganizationSchema('en');
      
      expect(schema.logo).toBeDefined();
      expect(schema.logo['@type']).toBe('ImageObject');
      expect(schema.logo.url).toMatch(/https:\/\/lyyli\.ai/);
      expect(schema.logo.width).toBeDefined();
      expect(schema.logo.height).toBeDefined();
    });

    it('should include sameAs links', () => {
      const schema = generateOrganizationSchema('en');
      
      expect(schema.sameAs).toBeDefined();
      expect(Array.isArray(schema.sameAs)).toBe(true);
      expect(schema.sameAs.length).toBeGreaterThan(0);
      expect(schema.sameAs).toContain('https://www.linkedin.com/company/lyyli-ai');
    });

    it('should include founders information', () => {
      const schema = generateOrganizationSchema('en');
      
      expect(schema.founders).toBeDefined();
      expect(Array.isArray(schema.founders)).toBe(true);
      expect(schema.founders.length).toBeGreaterThan(0);
      expect(schema.founders[0]['@type']).toBe('Person');
    });

    it('should include contact point', () => {
      const schema = generateOrganizationSchema('en');
      
      expect(schema.contactPoint).toBeDefined();
      expect(schema.contactPoint['@type']).toBe('ContactPoint');
      expect(schema.contactPoint.email).toBe('mikko@lyyli.ai');
    });

    it('should localize description', () => {
      const enSchema = generateOrganizationSchema('en');
      const fiSchema = generateOrganizationSchema('fi');
      
      expect(enSchema.description).not.toBe(fiSchema.description);
      expect(fiSchema.description).toMatch(/ammattilaisorganisaatioille/i);
    });
  });

  describe('Website Schema', () => {
    it('should generate valid Website schema', () => {
      const schema = generateWebsiteSchema('en');
      
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('WebSite');
      expect(schema.name).toBe('Lyyli.ai');
      expect(schema.url).toMatch(/https:\/\/lyyli\.ai/);
      expect(schema['@id']).toBe('https://lyyli.ai/#website');
    });

    it('should include search action', () => {
      const schema = generateWebsiteSchema('en');
      
      expect(schema.potentialAction).toBeDefined();
      expect(schema.potentialAction['@type']).toBe('SearchAction');
      expect(schema.potentialAction.target).toBeDefined();
      expect(schema.potentialAction.target.urlTemplate).toMatch(/\{search_term_string\}/);
    });

    it('should reference Organization as publisher', () => {
      const schema = generateWebsiteSchema('en');
      
      expect(schema.publisher).toBeDefined();
      expect(schema.publisher['@id']).toBe('https://lyyli.ai/#organization');
    });

    it('should include language', () => {
      const enSchema = generateWebsiteSchema('en');
      const fiSchema = generateWebsiteSchema('fi');
      
      expect(enSchema.inLanguage).toEqual(['en']);
      expect(fiSchema.inLanguage).toEqual(['fi']);
    });
  });

  describe('BreadcrumbList Schema', () => {
    it('should generate breadcrumbs for multi-level paths', () => {
      const schema = generateBreadcrumbSchema('/en/help/getting-started', 'en');
      
      expect(schema).not.toBeNull();
      expect(schema!['@type']).toBe('BreadcrumbList');
      expect(schema!.itemListElement).toBeDefined();
      expect(Array.isArray(schema!.itemListElement)).toBe(true);
    });

    it('should return null for shallow paths', () => {
      const schema = generateBreadcrumbSchema('/en', 'en');
      
      expect(schema).toBeNull();
    });

    it('should include Home as first breadcrumb', () => {
      const schema = generateBreadcrumbSchema('/en/features', 'en');
      
      expect(schema).not.toBeNull();
      const items = schema!.itemListElement;
      expect(items[0].position).toBe(1);
      expect(items[0].name).toBe('Home');
      expect(items[0].item).toBe('https://lyyli.ai/en');
    });

    it('should have sequential positions', () => {
      const schema = generateBreadcrumbSchema('/en/help/getting-started', 'en');
      
      const items = schema!.itemListElement;
      items.forEach((item: any, index: number) => {
        expect(item.position).toBe(index + 1);
      });
    });

    it('should localize breadcrumb names', () => {
      const enSchema = generateBreadcrumbSchema('/en/features', 'en');
      const fiSchema = generateBreadcrumbSchema('/fi/features', 'fi');
      
      expect(enSchema!.itemListElement[0].name).toBe('Home');
      expect(fiSchema!.itemListElement[0].name).toBe('Etusivu');
    });

    it('should handle nested paths correctly', () => {
      const schema = generateBreadcrumbSchema('/en/help/getting-started', 'en');
      
      const items = schema!.itemListElement;
      expect(items.length).toBeGreaterThanOrEqual(2); // Home + at least one level
      expect(items[items.length - 1].item).toBe('https://lyyli.ai/en/help/getting-started');
    });
  });

  describe('Article Schema', () => {
    const mockArticleProps: ArticleSchemaProps = {
      headline: 'Test Blog Post',
      description: 'A test blog post description',
      image: '/images/blog/test.png',
      datePublished: '2025-01-15',
      author: 'Mikko Oksanen',
      slug: 'test-post',
      locale: 'en',
      keywords: ['AI', 'communication', 'test']
    };

    it('should generate valid Article schema', () => {
      const schema = generateArticleSchema(mockArticleProps);
      
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Article');
      expect(schema.headline).toBe(mockArticleProps.headline);
      expect(schema.datePublished).toBe(mockArticleProps.datePublished);
    });

    it('should include author information', () => {
      const schema = generateArticleSchema(mockArticleProps);
      
      expect(schema.author).toBeDefined();
      expect(schema.author['@type']).toBe('Person');
      expect(schema.author.name).toBe('Mikko Oksanen');
      expect(schema.author.url).toBeDefined();
    });

    it('should reference Organization as publisher', () => {
      const schema = generateArticleSchema(mockArticleProps);
      
      expect(schema.publisher).toBeDefined();
      expect(schema.publisher['@id']).toBe('https://lyyli.ai/#organization');
    });

    it('should include image with proper structure', () => {
      const schema = generateArticleSchema(mockArticleProps);
      
      expect(schema.image).toBeDefined();
      expect(schema.image['@type']).toBe('ImageObject');
      expect(schema.image.url).toBeDefined();
      expect(schema.image.width).toBe(1200);
      expect(schema.image.height).toBe(630);
    });

    it('should handle external image URLs', () => {
      const propsWithExternalImage = {
        ...mockArticleProps,
        image: 'https://example.com/image.png'
      };
      const schema = generateArticleSchema(propsWithExternalImage);
      
      expect(schema.image.url).toBe('https://example.com/image.png');
    });

    it('should fallback to OG image if no image provided', () => {
      const propsWithoutImage = {
        ...mockArticleProps,
        image: undefined
      };
      const schema = generateArticleSchema(propsWithoutImage);
      
      expect(schema.image.url).toMatch(/\/api\/og\?title=/);
    });

    it('should include keywords', () => {
      const schema = generateArticleSchema(mockArticleProps);
      
      expect(schema.keywords).toBeDefined();
      expect(schema.keywords).toContain('AI');
    });

    it('should mark as accessible for free', () => {
      const schema = generateArticleSchema(mockArticleProps);
      
      expect(schema.isAccessibleForFree).toBe(true);
    });
  });

  describe('Schema Validation', () => {
    it('should validate correct Organization schema', () => {
      const schema = generateOrganizationSchema('en');
      const result = validateSchema(schema);
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate correct Article schema', () => {
      const schema = generateArticleSchema({
        headline: 'Test',
        description: 'Test desc',
        datePublished: '2025-01-01',
        author: 'Test Author',
        slug: 'test',
        locale: 'en'
      });
      const result = validateSchema(schema);
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing @context', () => {
      const invalidSchema = {
        "@type": "Organization",
        name: "Test"
      };
      const result = validateSchema(invalidSchema);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Missing @context');
    });

    it('should detect missing required Article fields', () => {
      const invalidArticle = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Test"
        // Missing datePublished and author
      };
      const result = validateSchema(invalidArticle);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Article missing datePublished');
      expect(result.errors).toContain('Article missing author');
    });

    it('should detect missing Organization name', () => {
      const invalidOrg = {
        "@context": "https://schema.org",
        "@type": "Organization",
        url: "https://example.com"
      };
      const result = validateSchema(invalidOrg);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Organization missing name');
    });
  });

  describe('Schema Combination', () => {
    it('should combine multiple schemas with @graph', () => {
      const org = generateOrganizationSchema('en');
      const website = generateWebsiteSchema('en');
      
      const combined = combineSchemas(org, website);
      
      expect(combined['@context']).toBe('https://schema.org');
      expect(combined['@graph']).toBeDefined();
      expect(Array.isArray(combined['@graph'])).toBe(true);
      expect(combined['@graph'].length).toBe(2);
    });

    it('should handle null schemas gracefully', () => {
      const org = generateOrganizationSchema('en');
      const breadcrumb = generateBreadcrumbSchema('/en', 'en'); // Returns null
      
      const combined = combineSchemas(org, breadcrumb);
      
      // Should only include the non-null schema
      expect(combined['@type']).toBe('Organization');
    });

    it('should return single schema when only one provided', () => {
      const org = generateOrganizationSchema('en');
      const combined = combineSchemas(org);
      
      expect(combined['@type']).toBe('Organization');
      expect(combined['@graph']).toBeUndefined();
    });

    it('should filter out null/undefined schemas', () => {
      const org = generateOrganizationSchema('en');
      const combined = combineSchemas(org, null, undefined);
      
      expect(combined['@type']).toBe('Organization');
    });
  });

  describe('Schema URL Consistency', () => {
    it('should use production domain in all schemas', () => {
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
          locale: 'en'
        })
      ];

      schemas.forEach(schema => {
        if (schema) {
          const schemaStr = JSON.stringify(schema);
          expect(schemaStr).toMatch(/https:\/\/lyyli\.ai/);
          expect(schemaStr).not.toMatch(/localhost/);
          expect(schemaStr).not.toMatch(/vercel\.app/);
        }
      });
    });

    it('should use consistent @id patterns', () => {
      const org = generateOrganizationSchema('en');
      const website = generateWebsiteSchema('en');
      
      expect(org['@id']).toBe('https://lyyli.ai/#organization');
      expect(website['@id']).toBe('https://lyyli.ai/#website');
      expect(website.publisher['@id']).toBe('https://lyyli.ai/#organization');
    });
  });

  describe('Breadcrumb Path Handling', () => {
    it('should handle root locale paths', () => {
      const schema = generateBreadcrumbSchema('/en', 'en');
      expect(schema).toBeNull();
    });

    it('should handle single-level paths', () => {
      const schema = generateBreadcrumbSchema('/en/about', 'en');
      
      expect(schema).not.toBeNull();
      expect(schema!.itemListElement.length).toBe(2); // Home + About
    });

    it('should handle multi-level paths', () => {
      const schema = generateBreadcrumbSchema('/en/help/getting-started', 'en');
      
      expect(schema).not.toBeNull();
      expect(schema!.itemListElement.length).toBe(3); // Home + Help + Getting Started
    });

    it('should handle paths with locale variations', () => {
      const enSchema = generateBreadcrumbSchema('/en/features', 'en');
      const fiSchema = generateBreadcrumbSchema('/fi/features', 'fi');
      
      expect(enSchema!.itemListElement[1].name).toBe('Features');
      expect(fiSchema!.itemListElement[1].name).toBe('Ominaisuudet');
    });
  });

  describe('Article Schema Variants', () => {
    it('should handle article with dateModified', () => {
      const schema = generateArticleSchema({
        headline: 'Updated Article',
        description: 'Test',
        datePublished: '2025-01-01',
        dateModified: '2025-01-15',
        author: 'Test',
        slug: 'test',
        locale: 'en'
      });

      expect(schema.dateModified).toBe('2025-01-15');
    });

    it('should default dateModified to datePublished if not provided', () => {
      const schema = generateArticleSchema({
        headline: 'New Article',
        description: 'Test',
        datePublished: '2025-01-01',
        author: 'Test',
        slug: 'test',
        locale: 'en'
      });

      expect(schema.dateModified).toBe('2025-01-01');
    });

    it('should include mainEntityOfPage', () => {
      const schema = generateArticleSchema({
        headline: 'Test',
        description: 'Test',
        datePublished: '2025-01-01',
        author: 'Test',
        slug: 'test-article',
        locale: 'en'
      });

      expect(schema.mainEntityOfPage).toBeDefined();
      expect(schema.mainEntityOfPage['@type']).toBe('WebPage');
      expect(schema.mainEntityOfPage['@id']).toBe('https://lyyli.ai/en/blog/test-article');
    });
  });

  describe('Schema Type Enforcement', () => {
    it('should ensure one JSON-LD block per type on home page', () => {
      // When combining Organization + Website, should use @graph
      const org = generateOrganizationSchema('en');
      const website = generateWebsiteSchema('en');
      const combined = combineSchemas(org, website);
      
      expect(combined['@graph']).toBeDefined();
      expect(combined['@graph'].length).toBe(2);
      
      // Each type should appear only once
      const types = combined['@graph'].map((s: any) => s['@type']);
      const uniqueTypes = new Set(types);
      expect(types.length).toBe(uniqueTypes.size);
    });

    it('should ensure Article schema is separate from Organization', () => {
      const article = generateArticleSchema({
        headline: 'Test',
        description: 'Test',
        datePublished: '2025-01-01',
        author: 'Test',
        slug: 'test',
        locale: 'en'
      });

      // Article should have its own schema block, not combined with org
      expect(article['@type']).toBe('Article');
      expect(article['@context']).toBe('https://schema.org');
      
      // It references Organization but doesn't include it
      expect(article.publisher['@id']).toBe('https://lyyli.ai/#organization');
    });
  });
});
