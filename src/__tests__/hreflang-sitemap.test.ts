/**
 * Hreflang Sitemap Tests
 * 
 * Tests for hreflang implementation in sitemap.xml
 */

import fs from 'fs';
import path from 'path';

describe('Hreflang Sitemap Tests', () => {
  const projectRoot = path.join(process.cwd());
  const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');

  describe('XML Structure', () => {
    test('should have proper XML declaration and namespaces', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      expect(content).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(content).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
      expect(content).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    });

    test('should have proper urlset structure', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      expect(content).toContain('<urlset');
      expect(content).toContain('</urlset>');
    });
  });

  describe('Hreflang Implementation', () => {
    test('should contain hreflang links', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      const hreflangLinks = content.match(/<xhtml:link[^>]*hreflang="[^"]*"[^>]*>/g);
      expect(hreflangLinks).toBeTruthy();
      expect(hreflangLinks!.length).toBeGreaterThan(100); // Should have many hreflang links
    });

    test('should have all required hreflang values', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      expect(content).toContain('hreflang="en"');
      expect(content).toContain('hreflang="fi"');
      expect(content).toContain('hreflang="x-default"');
    });

    test('should have proper hreflang link format', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      const hreflangLinks = content.match(/<xhtml:link[^>]*hreflang="[^"]*"[^>]*>/g);
      expect(hreflangLinks).toBeTruthy();
      
      hreflangLinks!.forEach(link => {
        expect(link).toMatch(/rel="alternate"/);
        expect(link).toMatch(/hreflang="(en|fi|x-default)"/);
        expect(link).toMatch(/href="https:\/\/lyyli\.ai\/[^"]*"/);
      });
    });
  });

  describe('Bidirectional Linking', () => {
    test('should have bidirectional hreflang links for language pages', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      // Check English pages have Finnish alternates
      const enPages = content.match(/<loc>https:\/\/lyyli\.ai\/en\/[^<]*<\/loc>/g);
      expect(enPages).toBeTruthy();
      
      // Check that English pages have corresponding Finnish hreflang links
      enPages!.forEach(urlMatch => {
        const url = urlMatch.replace(/<\/?loc>/g, '');
        const fiAlternate = url.replace('/en/', '/fi/');
        
        expect(content).toContain(`href="${fiAlternate}"`);
        expect(content).toContain('hreflang="fi"');
      });
    });

    test('should have bidirectional hreflang links for Finnish pages', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      // Check Finnish pages have English alternates
      const fiPages = content.match(/<loc>https:\/\/lyyli\.ai\/fi\/[^<]*<\/loc>/g);
      expect(fiPages).toBeTruthy();
      
      // Check that Finnish pages have corresponding English hreflang links
      fiPages!.forEach(urlMatch => {
        const url = urlMatch.replace(/<\/?loc>/g, '');
        const enAlternate = url.replace('/fi/', '/en/');
        
        expect(content).toContain(`href="${enAlternate}"`);
        expect(content).toContain('hreflang="en"');
      });
    });

    test('should have x-default links pointing to English versions', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      const xDefaultLinks = content.match(/hreflang="x-default"[^>]*href="([^"]*)"/g);
      expect(xDefaultLinks).toBeTruthy();
      
      xDefaultLinks!.forEach(link => {
        const hrefMatch = link.match(/href="([^"]*)"/);
        expect(hrefMatch).toBeTruthy();
        
        const href = hrefMatch![1];
        expect(href).toMatch(/^https:\/\/lyyli\.ai\/(en\/|en$)/);
      });
    });
  });

  describe('Self-Referencing', () => {
    test('should have self-referencing hreflang links', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      const urlBlocks = content.split('<url>').slice(1);
      let selfReferenceCount = 0;
      
      for (const block of urlBlocks) {
        const locMatch = block.match(/<loc>([^<]*)<\/loc>/);
        if (!locMatch) continue;
        
        const url = locMatch[1];
        const hreflangLinks = block.match(/<xhtml:link[^>]*>/g) || [];
        
        // Check if this URL references itself
        const selfReference = hreflangLinks.some(link => 
          link.includes(`href="${url}"`) && link.includes('hreflang="en"')
        );
        
        if (selfReference) {
          selfReferenceCount++;
        }
      }
      
      expect(selfReferenceCount).toBeGreaterThan(0);
    });
  });

  describe('URL Structure', () => {
    test('should have proper URL format for all hreflang links', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      const hrefMatches = content.match(/href="https:\/\/lyyli\.ai\/[^"]*"/g);
      expect(hrefMatches).toBeTruthy();
      
      hrefMatches!.forEach(href => {
        expect(href).toMatch(/^href="https:\/\/lyyli\.ai\//);
        expect(href).not.toContain('//\/'); // Don't allow multiple consecutive slashes
        expect(href).not.toContain(' ');
      });
    });

    test('should not have duplicate URLs', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      const urlMatches = content.match(/<loc>https:\/\/lyyli\.ai\/[^<]*<\/loc>/g);
      expect(urlMatches).toBeTruthy();
      
      const urls = urlMatches!.map(match => match.replace(/<\/?loc>/g, ''));
      const uniqueUrls = [...new Set(urls)];
      
      expect(urls.length).toBe(uniqueUrls.length);
    });
  });

  describe('Blog Posts Hreflang', () => {
    test('should have hreflang for blog posts', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      // Check that blog posts exist and have hreflang
      expect(content).toContain('/blog/');
      
      // Count blog post URLs
      const blogPostCount = (content.match(/\/blog\/[^<]*/g) || []).length;
      expect(blogPostCount).toBeGreaterThan(10);
    });
  });

  describe('Help Pages Hreflang', () => {
    test('should have hreflang for help pages', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      // Check that help pages exist and have hreflang
      expect(content).toContain('/help/');
      
      // Count help page URLs
      const helpPageCount = (content.match(/\/help\/[^<]*/g) || []).length;
      expect(helpPageCount).toBeGreaterThan(5);
    });
  });

  describe('Google Compliance', () => {
    test('should comply with Google sitemap requirements', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      // Check XML structure
      expect(content).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
      expect(content).toContain('<urlset');
      expect(content).toContain('</urlset>');
      
      // Check namespace declarations
      expect(content).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
      expect(content).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
      
      // Check for required elements
      const urlBlocks = content.split('<url>').slice(1);
      urlBlocks.forEach(block => {
        expect(block).toContain('<loc>');
        expect(block).toContain('</loc>');
        expect(block).toContain('<lastmod>');
        expect(block).toContain('<changefreq>');
        expect(block).toContain('<priority>');
      });
    });

    test('should have reasonable file size', () => {
      const stats = fs.statSync(sitemapPath);
      expect(stats.size).toBeGreaterThan(10000); // At least 10KB
      expect(stats.size).toBeLessThan(500000); // Less than 500KB
    });
  });
});
