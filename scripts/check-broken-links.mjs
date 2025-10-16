#!/usr/bin/env node

import { createHash } from 'crypto';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Broken Link Checker for CI/CD
 * 
 * This script checks for broken internal and external links in the built site.
 * It's designed to fail CI if broken links are detected.
 */
class BrokenLinkChecker {
  constructor(baseUrl = 'http://localhost:3000', options = {}) {
    this.baseUrl = baseUrl;
    this.options = {
      maxConcurrent: 10,
      timeout: 10000,
      retries: 2,
      userAgent: 'Lyyli-BrokenLinkChecker/1.0',
      excludePatterns: [
        /^mailto:/,
        /^tel:/,
        /^javascript:/,
        /^#/, // Anchor links
        /^data:/,
        /^blob:/,
      ],
      allowedStatusCodes: [200, 201, 202, 204, 301, 302, 303, 307, 308],
      internalOnly: false,
      ...options,
    };
    
    this.results = {
      total: 0,
      broken: 0,
      internal: 0,
      external: 0,
      skipped: 0,
      errors: [],
      brokenLinks: [],
    };
    
    this.visitedUrls = new Set();
    this.pendingRequests = new Set();
  }

  /**
   * Main entry point
   */
  async checkAllLinks() {
    console.log('🔍 Starting broken link check...\n');
    console.log(`Base URL: ${this.baseUrl}`);
    console.log(`Max concurrent: ${this.options.maxConcurrent}`);
    console.log(`Timeout: ${this.options.timeout}ms`);
    console.log(`Retries: ${this.options.retries}`);
    console.log(`Internal only: ${this.options.internalOnly}\n`);
    
    try {
      // Get all pages from the built site
      const pages = await this.discoverPages();
      console.log(`📄 Found ${pages.length} pages to check\n`);
      
      // Check each page for links
      for (const page of pages) {
        await this.checkPageLinks(page);
      }
      
      // Wait for all pending requests to complete
      await this.waitForPendingRequests();
      
      this.printSummary();
      
      // Exit with error code if broken links found
      if (this.results.broken > 0) {
        process.exit(1);
      }
      
    } catch (error) {
      console.error('❌ Error during link checking:', error.message);
      process.exit(1);
    }
  }

  /**
   * Discover all pages in the built site
   */
  async discoverPages() {
    const pages = [];
    
    // Check if .next directory exists
    const nextDir = path.join(__dirname, '..', '.next');
    if (!fs.existsSync(nextDir)) {
      console.error('❌ .next directory not found. Please run "npm run build" first.');
      process.exit(1);
    }
    
    // Static pages from sitemap
    const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
      const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g);
      
      if (urlMatches) {
        for (const match of urlMatches) {
          const url = match.replace(/<\/?loc>/g, '');
          if (url.startsWith('https://lyyli.ai')) {
            // Convert to local URL for testing
            const localUrl = url.replace('https://lyyli.ai', this.baseUrl);
            pages.push({
              url: localUrl,
              source: 'sitemap',
            });
          }
        }
      }
    }
    
    // Add common pages if sitemap doesn't exist
    if (pages.length === 0) {
      const commonPages = [
        '/en',
        '/fi',
        '/en/blog',
        '/fi/blog',
        '/en/features',
        '/fi/features',
        '/en/pricing',
        '/fi/pricing',
        '/en/about',
        '/fi/about',
        '/en/contact',
        '/fi/contact',
      ];
      
      for (const page of commonPages) {
        pages.push({
          url: `${this.baseUrl}${page}`,
          source: 'common',
        });
      }
    }
    
    return pages;
  }

  /**
   * Check links on a specific page
   */
  async checkPageLinks(page) {
    try {
      console.log(`🔍 Checking page: ${page.url}`);
      
      const response = await this.fetchPage(page.url);
      if (!response) return;
      
      const links = this.extractLinks(response.content, page.url);
      console.log(`  Found ${links.length} links`);
      
      for (const link of links) {
        await this.checkLink(link, page.url);
      }
      
    } catch (error) {
      console.error(`❌ Error checking page ${page.url}:`, error.message);
      this.results.errors.push({
        page: page.url,
        error: error.message,
      });
    }
  }

  /**
   * Extract links from HTML content
   */
  extractLinks(html, baseUrl) {
    const links = [];
    
    // Extract href attributes
    const hrefMatches = html.match(/href=["']([^"']+)["']/g);
    if (hrefMatches) {
      for (const match of hrefMatches) {
        const href = match.replace(/href=["']|["']/g, '');
        const absoluteUrl = this.resolveUrl(href, baseUrl);
        
        if (this.shouldCheckLink(absoluteUrl)) {
          links.push({
            url: absoluteUrl,
            type: 'href',
            original: href,
          });
        }
      }
    }
    
    // Extract src attributes (images, scripts, etc.)
    const srcMatches = html.match(/src=["']([^"']+)["']/g);
    if (srcMatches) {
      for (const match of srcMatches) {
        const src = match.replace(/src=["']|["']/g, '');
        const absoluteUrl = this.resolveUrl(src, baseUrl);
        
        if (this.shouldCheckLink(absoluteUrl)) {
          links.push({
            url: absoluteUrl,
            type: 'src',
            original: src,
          });
        }
      }
    }
    
    return links;
  }

  /**
   * Check if a link should be checked
   */
  shouldCheckLink(url) {
    // Skip excluded patterns
    for (const pattern of this.options.excludePatterns) {
      if (pattern.test(url)) {
        return false;
      }
    }
    
    // Skip if internal only and URL is external
    if (this.options.internalOnly && !this.isInternalUrl(url)) {
      return false;
    }
    
    // Skip if already visited
    if (this.visitedUrls.has(url)) {
      return false;
    }
    
    return true;
  }

  /**
   * Check if URL is internal
   */
  isInternalUrl(url) {
    try {
      const urlObj = new URL(url);
      const baseUrlObj = new URL(this.baseUrl);
      return urlObj.hostname === baseUrlObj.hostname;
    } catch {
      return false;
    }
  }

  /**
   * Resolve relative URL to absolute
   */
  resolveUrl(href, baseUrl) {
    try {
      return new URL(href, baseUrl).href;
    } catch {
      return href;
    }
  }

  /**
   * Check a single link
   */
  async checkLink(link, sourcePage) {
    this.results.total++;
    this.visitedUrls.add(link.url);
    
    // Track request
    this.pendingRequests.add(link.url);
    
    try {
      const response = await this.fetchLink(link.url);
      
      if (!response) {
        this.markAsBroken(link, sourcePage, 'No response');
        return;
      }
      
      if (!this.options.allowedStatusCodes.includes(response.status)) {
        this.markAsBroken(link, sourcePage, `HTTP ${response.status}`);
        return;
      }
      
      // Mark as successful
      if (this.isInternalUrl(link.url)) {
        this.results.internal++;
      } else {
        this.results.external++;
      }
      
    } catch (error) {
      this.markAsBroken(link, sourcePage, error.message);
    } finally {
      this.pendingRequests.delete(link.url);
    }
  }

  /**
   * Mark a link as broken
   */
  markAsBroken(link, sourcePage, reason) {
    this.results.broken++;
    
    const brokenLink = {
      url: link.url,
      sourcePage,
      reason,
      type: link.type,
      original: link.original,
    };
    
    this.results.brokenLinks.push(brokenLink);
    
    console.log(`  ❌ Broken: ${link.url} (${reason})`);
    console.log(`    Source: ${sourcePage}`);
    console.log(`    Original: ${link.original}`);
  }

  /**
   * Fetch a page with retries
   */
  async fetchPage(url) {
    for (let attempt = 1; attempt <= this.options.retries + 1; attempt++) {
      try {
        const response = await this.makeRequest(url);
        if (response) return response;
      } catch (error) {
        if (attempt === this.options.retries + 1) {
          throw error;
        }
        console.log(`  ⚠️  Retry ${attempt}/${this.options.retries} for ${url}`);
        await this.delay(1000 * attempt);
      }
    }
    return null;
  }

  /**
   * Fetch a link with retries
   */
  async fetchLink(url) {
    for (let attempt = 1; attempt <= this.options.retries + 1; attempt++) {
      try {
        const response = await this.makeRequest(url, { method: 'HEAD' });
        if (response) return response;
      } catch (error) {
        if (attempt === this.options.retries + 1) {
          throw error;
        }
        await this.delay(1000 * attempt);
      }
    }
    return null;
  }

  /**
   * Make HTTP request
   */
  makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https') ? https : http;
      const urlObj = new URL(url);
      
      const requestOptions = {
        hostname: urlObj.hostname,
        port: urlObj.port || (url.startsWith('https') ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: options.method || 'GET',
        headers: {
          'User-Agent': this.options.userAgent,
        },
        timeout: this.options.timeout,
      };
      
      const req = client.request(requestOptions, (res) => {
        let data = '';
        
        res.on('data', chunk => {
          data += chunk;
        });
        
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            content: data,
          });
        });
      });
      
      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
      
      req.end();
    });
  }

  /**
   * Wait for all pending requests to complete
   */
  async waitForPendingRequests() {
    while (this.pendingRequests.size > 0) {
      await this.delay(100);
    }
  }

  /**
   * Delay utility
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Print summary of results
   */
  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 Broken Link Check Summary');
    console.log('='.repeat(60));
    
    console.log(`Total links checked: ${this.results.total}`);
    console.log(`Broken links: ${this.results.broken}`);
    console.log(`Internal links: ${this.results.internal}`);
    console.log(`External links: ${this.results.external}`);
    console.log(`Errors: ${this.results.errors.length}`);
    
    if (this.results.brokenLinks.length > 0) {
      console.log('\n❌ Broken Links:');
      for (const link of this.results.brokenLinks) {
        console.log(`  • ${link.url}`);
        console.log(`    Status: ${link.reason}`);
        console.log(`    Source: ${link.sourcePage}`);
        console.log(`    Original: ${link.original}`);
        console.log('');
      }
    }
    
    if (this.results.errors.length > 0) {
      console.log('\n⚠️  Errors:');
      for (const error of this.results.errors) {
        console.log(`  • ${error.page}: ${error.error}`);
      }
    }
    
    if (this.results.broken === 0) {
      console.log('\n✅ No broken links found!');
    } else {
      console.log(`\n❌ Found ${this.results.broken} broken links. CI will fail.`);
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const baseUrl = process.argv[2] || 'http://localhost:3000';
  const internalOnly = process.argv.includes('--internal-only');
  
  const checker = new BrokenLinkChecker(baseUrl, {
    internalOnly,
    maxConcurrent: 5,
    timeout: 10000,
  });
  
  checker.checkAllLinks().catch(console.error);
}

export default BrokenLinkChecker;
