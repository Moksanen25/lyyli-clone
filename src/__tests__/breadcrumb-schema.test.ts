import {
  generateBreadcrumbSchema,
  generateBlogBreadcrumbs,
  generateHelpBreadcrumbs,
  generateLegalBreadcrumbs,
  generatePageBreadcrumbs
} from '../lib/breadcrumb-schema';

describe('Breadcrumb Schema Generation', () => {
  describe('generateBreadcrumbSchema', () => {
    it('generates correct BreadcrumbList schema', () => {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Post Title', isCurrentPage: true }
      ];

      const schema = generateBreadcrumbSchema(items);

      expect(schema).toEqual({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': '/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Blog',
            'item': '/blog'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Post Title'
            // No 'item' property for current page
          }
        ]
      });
    });

    it('handles empty items array', () => {
      const schema = generateBreadcrumbSchema([]);

      expect(schema).toEqual({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': []
      });
    });

    it('excludes item property for current page', () => {
      const items = [
        { label: 'Current Page', isCurrentPage: true }
      ];

      const schema = generateBreadcrumbSchema(items);

      expect(schema.itemListElement[0]).toEqual({
        '@type': 'ListItem',
        'position': 1,
        'name': 'Current Page'
      });
      expect(schema.itemListElement[0]).not.toHaveProperty('item');
    });
  });

  describe('generateBlogBreadcrumbs', () => {
    it('generates blog breadcrumbs without category', () => {
      const breadcrumbs = generateBlogBreadcrumbs('Sample Post', 'en');

      expect(breadcrumbs).toEqual([
        { label: 'Home', href: '/en' },
        { label: 'Blog', href: '/en/blog' },
        { label: 'Sample Post', isCurrentPage: true }
      ]);
    });

    it('generates blog breadcrumbs with category', () => {
      const breadcrumbs = generateBlogBreadcrumbs('Sample Post', 'en', 'AI');

      expect(breadcrumbs).toEqual([
        { label: 'Home', href: '/en' },
        { label: 'Blog', href: '/en/blog' },
        { label: 'AI', href: '/en/blog?category=AI' },
        { label: 'Sample Post', isCurrentPage: true }
      ]);
    });

    it('generates Finnish blog breadcrumbs', () => {
      const breadcrumbs = generateBlogBreadcrumbs('Esimerkki Postaus', 'fi');

      expect(breadcrumbs).toEqual([
        { label: 'Home', href: '/fi' },
        { label: 'Blog', href: '/fi/blog' },
        { label: 'Esimerkki Postaus', isCurrentPage: true }
      ]);
    });

    it('URL encodes category properly', () => {
      const breadcrumbs = generateBlogBreadcrumbs('Sample Post', 'en', 'AI & Machine Learning');

      expect(breadcrumbs[2].href).toBe('/en/blog?category=AI%20%26%20Machine%20Learning');
    });
  });

  describe('generateHelpBreadcrumbs', () => {
    it('generates help breadcrumbs without section', () => {
      const breadcrumbs = generateHelpBreadcrumbs('Getting Started', 'en');

      expect(breadcrumbs).toEqual([
        { label: 'Home', href: '/en' },
        { label: 'Help', href: '/en/help' },
        { label: 'Getting Started', isCurrentPage: true }
      ]);
    });

    it('generates help breadcrumbs with section', () => {
      const breadcrumbs = generateHelpBreadcrumbs('Account Setup', 'en', 'accounts-auth');

      expect(breadcrumbs).toEqual([
        { label: 'Home', href: '/en' },
        { label: 'Help', href: '/en/help' },
        { label: 'accounts-auth', href: '/en/help/accounts-auth' },
        { label: 'Account Setup', isCurrentPage: true }
      ]);
    });

    it('generates Finnish help breadcrumbs', () => {
      const breadcrumbs = generateHelpBreadcrumbs('Aloitus', 'fi');

      expect(breadcrumbs).toEqual([
        { label: 'Home', href: '/fi' },
        { label: 'Help', href: '/fi/help' },
        { label: 'Aloitus', isCurrentPage: true }
      ]);
    });
  });

  describe('generateLegalBreadcrumbs', () => {
    it('generates legal breadcrumbs without document type', () => {
      const breadcrumbs = generateLegalBreadcrumbs('Privacy Policy', 'en');

      expect(breadcrumbs).toEqual([
        { label: 'Home', href: '/en' },
        { label: 'Help', href: '/en/help' },
        { label: 'Legal', href: '/en/help/legal' },
        { label: 'Privacy Policy', isCurrentPage: true }
      ]);
    });

    it('generates legal breadcrumbs with document type', () => {
      const breadcrumbs = generateLegalBreadcrumbs('Terms of Service', 'en', 'terms');

      expect(breadcrumbs).toEqual([
        { label: 'Home', href: '/en' },
        { label: 'Help', href: '/en/help' },
        { label: 'Legal', href: '/en/help/legal' },
        { label: 'terms', href: '/en/help/legal/terms' },
        { label: 'Terms of Service', isCurrentPage: true }
      ]);
    });

    it('generates Finnish legal breadcrumbs', () => {
      const breadcrumbs = generateLegalBreadcrumbs('Tietosuojakäytäntö', 'fi');

      expect(breadcrumbs).toEqual([
        { label: 'Home', href: '/fi' },
        { label: 'Help', href: '/fi/help' },
        { label: 'Legal', href: '/fi/help/legal' },
        { label: 'Tietosuojakäytäntö', isCurrentPage: true }
      ]);
    });
  });

  describe('generatePageBreadcrumbs', () => {
    it('generates page breadcrumbs without parent pages', () => {
      const breadcrumbs = generatePageBreadcrumbs('About', 'en');

      expect(breadcrumbs).toEqual([
        { label: 'Home', href: '/en' },
        { label: 'About', isCurrentPage: true }
      ]);
    });

    it('generates page breadcrumbs with parent pages', () => {
      const parentPages = [
        { title: 'Features', href: '/en/features' },
        { title: 'Security', href: '/en/features/security' }
      ];
      const breadcrumbs = generatePageBreadcrumbs('Data Protection', 'en', parentPages);

      expect(breadcrumbs).toEqual([
        { label: 'Home', href: '/en' },
        { title: 'Features', href: '/en/features' },
        { title: 'Security', href: '/en/features/security' },
        { label: 'Data Protection', isCurrentPage: true }
      ]);
    });

    it('generates Finnish page breadcrumbs', () => {
      const breadcrumbs = generatePageBreadcrumbs('Tietoa meistä', 'fi');

      expect(breadcrumbs).toEqual([
        { label: 'Home', href: '/fi' },
        { label: 'Tietoa meistä', isCurrentPage: true }
      ]);
    });
  });

  describe('Schema Validation', () => {
    it('generates valid JSON-LD schema structure', () => {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Post Title', isCurrentPage: true }
      ];

      const schema = generateBreadcrumbSchema(items);

      // Validate required properties
      expect(schema).toHaveProperty('@context', 'https://schema.org');
      expect(schema).toHaveProperty('@type', 'BreadcrumbList');
      expect(schema).toHaveProperty('itemListElement');
      expect(Array.isArray(schema.itemListElement)).toBe(true);

      // Validate list item structure
      schema.itemListElement.forEach((item: any, index: number) => {
        expect(item).toHaveProperty('@type', 'ListItem');
        expect(item).toHaveProperty('position', index + 1);
        expect(item).toHaveProperty('name');
        expect(typeof item.name).toBe('string');
      });
    });

    it('positions are sequential starting from 1', () => {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Post Title', isCurrentPage: true }
      ];

      const schema = generateBreadcrumbSchema(items);

      schema.itemListElement.forEach((item: any, index: number) => {
        expect(item.position).toBe(index + 1);
      });
    });

    it('item URLs are absolute or relative paths', () => {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'External', href: 'https://example.com' },
        { label: 'Current Page', isCurrentPage: true }
      ];

      const schema = generateBreadcrumbSchema(items);

      // Items with href should have valid item property
      expect(schema.itemListElement[0].item).toBe('/');
      expect(schema.itemListElement[1].item).toBe('/blog');
      expect(schema.itemListElement[2].item).toBe('https://example.com');
      
      // Current page should not have item property
      expect(schema.itemListElement[3]).not.toHaveProperty('item');
    });
  });
});
