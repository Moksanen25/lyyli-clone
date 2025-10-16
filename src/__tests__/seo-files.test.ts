/**
 * SEO Files Tests
 * 
 * Tests for robots.txt and sitemap.xml validation
 */

import fs from 'fs';
import path from 'path';

describe('SEO Files Tests', () => {
  const projectRoot = path.join(process.cwd());
  const publicDir = path.join(projectRoot, 'public');
  const robotsPath = path.join(publicDir, 'robots.txt');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');

  describe('robots.txt', () => {
    test('should exist', () => {
      expect(fs.existsSync(robotsPath)).toBe(true);
    });

    test('should have proper content', () => {
      const content = fs.readFileSync(robotsPath, 'utf8');
      
      // Check for required directives
      expect(content).toContain('User-agent: *');
      expect(content).toContain('Sitemap: https://lyyli.ai/sitemap.xml');
      expect(content).toContain('Disallow: /_next/');
      expect(content).toContain('Disallow: /api/');
      expect(content).toContain('Disallow: /admin/');
    });

    test('should not block all crawling', () => {
      const content = fs.readFileSync(robotsPath, 'utf8');
      
      // Should not have "Disallow: /" which blocks everything
      expect(content).not.toContain('Disallow: /\n');
      expect(content).not.toContain('Disallow: /\r');
    });

    test('should have proper structure', () => {
      const content = fs.readFileSync(robotsPath, 'utf8');
      const lines = content.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));
      
      let hasUserAgent = false;
      let hasSitemap = false;
      
      for (const line of lines) {
        if (line.startsWith('User-agent:')) {
          hasUserAgent = true;
        }
        if (line.startsWith('Sitemap:')) {
          hasSitemap = true;
        }
      }
      
      expect(hasUserAgent).toBe(true);
      expect(hasSitemap).toBe(true);
    });

    test('should have reasonable file size', () => {
      const stats = fs.statSync(robotsPath);
      expect(stats.size).toBeGreaterThan(100); // At least 100 bytes
      expect(stats.size).toBeLessThan(10000); // Less than 10KB
    });
  });

  describe('sitemap.xml', () => {
    test('should exist', () => {
      expect(fs.existsSync(sitemapPath)).toBe(true);
    });

    test('should have proper XML structure', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      expect(content).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(content).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
      expect(content).toContain('</urlset>');
    });

    test('should contain expected pages', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      const expectedPages = [
        'https://lyyli.ai/',
        'https://lyyli.ai/en',
        'https://lyyli.ai/fi',
        'https://lyyli.ai/en/features',
        'https://lyyli.ai/en/pricing',
        'https://lyyli.ai/en/about',
        'https://lyyli.ai/en/contact',
        'https://lyyli.ai/en/blog',
        'https://lyyli.ai/fi/features',
        'https://lyyli.ai/fi/pricing',
        'https://lyyli.ai/fi/about',
        'https://lyyli.ai/fi/contact',
        'https://lyyli.ai/fi/blog'
      ];
      
      expectedPages.forEach(page => {
        expect(content).toContain(`<loc>${page}</loc>`);
      });
    });

    test('should have valid URL format', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      // Extract all URLs
      const urlMatches = content.match(/<loc>https:\/\/lyyli\.ai\/[^<]*<\/loc>/g);
      expect(urlMatches).toBeTruthy();
      expect(urlMatches!.length).toBeGreaterThan(20); // Should have many URLs
      
      // Check that all URLs use https://lyyli.ai domain
      urlMatches!.forEach(match => {
        expect(match).toMatch(/^<loc>https:\/\/lyyli\.ai\/[^<]*<\/loc>$/);
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

    test('should have proper URL structure', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      // Count URL blocks
      const urlBlocks = content.split('<url>').slice(1);
      expect(urlBlocks.length).toBeGreaterThan(20);
      
      // Check that each URL block has required elements
      let validBlocks = 0;
      for (const block of urlBlocks) {
        if (block.includes('<loc>') && block.includes('</loc>')) {
          validBlocks++;
        }
      }
      
      expect(validBlocks).toBe(urlBlocks.length);
    });

    test('should have reasonable file size', () => {
      const stats = fs.statSync(sitemapPath);
      expect(stats.size).toBeGreaterThan(1000); // At least 1KB
      expect(stats.size).toBeLessThan(100000); // Less than 100KB
    });

    test('should include blog posts', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      // Should have some blog posts (check for blog/ in URLs)
      expect(content).toContain('/blog/');
      
      // Count blog post URLs
      const blogPostCount = (content.match(/\/blog\/[^<]*/g) || []).length;
      expect(blogPostCount).toBeGreaterThan(10); // Should have multiple blog posts
    });

    test('should include help pages', () => {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      // Should have help pages (check for help/ in URLs)
      expect(content).toContain('/help/');
      
      // Count help page URLs
      const helpPageCount = (content.match(/\/help\/[^<]*/g) || []).length;
      expect(helpPageCount).toBeGreaterThan(5); // Should have multiple help pages
    });
  });

  describe('File consistency', () => {
    test('robots.txt should reference correct sitemap URL', () => {
      const robotsContent = fs.readFileSync(robotsPath, 'utf8');
      expect(robotsContent).toContain('Sitemap: https://lyyli.ai/sitemap.xml');
    });

    test('both files should be in public directory', () => {
      expect(robotsPath).toMatch(/\/public\/robots\.txt$/);
      expect(sitemapPath).toMatch(/\/public\/sitemap\.xml$/);
    });

    test('both files should be readable', () => {
      expect(() => fs.readFileSync(robotsPath, 'utf8')).not.toThrow();
      expect(() => fs.readFileSync(sitemapPath, 'utf8')).not.toThrow();
    });
  });
});
