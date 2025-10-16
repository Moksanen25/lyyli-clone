#!/usr/bin/env node

import { createHash } from 'crypto';
import https from 'https';
import http from 'http';

/**
 * Test blog pagination functionality
 */
class PaginationTester {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
    this.results = [];
  }

  /**
   * Make HTTP request and return response data
   */
  async fetchPage(url) {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https') ? https : http;
      
      const req = client.get(url, (res) => {
        let data = '';
        
        res.on('data', chunk => {
          data += chunk;
        });
        
        res.on('end', () => {
          resolve({
            url,
            status: res.statusCode,
            headers: res.headers,
            content: data,
            size: data.length
          });
        });
      });
      
      req.on('error', reject);
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  /**
   * Test pagination page
   */
  async testPaginationPage(locale, pageNumber = 1) {
    const path = pageNumber === 1 
      ? `/${locale}/blog` 
      : `/${locale}/blog/page/${pageNumber}`;
    const url = `${this.baseUrl}${path}`;
    
    console.log(`Testing: ${url}`);
    
    try {
      const response = await this.fetchPage(url);
      
      const analysis = {
        url,
        status: response.status,
        size: response.size,
        hasPagination: response.content.includes('pagination'),
        hasNextLink: response.content.includes('next'),
        hasPrevLink: response.content.includes('previous'),
        hasPageNumbers: response.content.includes('page'),
        hasStructuredData: response.content.includes('application/ld+json'),
        hasBreadcrumbs: response.content.includes('breadcrumb'),
        hasRelatedPosts: response.content.includes('Related Posts') || response.content.includes('Aiheeseen liittyvät'),
        postCount: (response.content.match(/blog-post-card|BlogPostCard/g) || []).length,
        cacheHeaders: {
          cacheControl: response.headers['cache-control'] || '',
          etag: response.headers['etag'] || '',
        }
      };
      
      this.results.push(analysis);
      
      console.log(`  Status: ${response.status}`);
      console.log(`  Size: ${this.formatBytes(response.size)}`);
      console.log(`  Posts: ${analysis.postCount}`);
      console.log(`  Pagination: ${analysis.hasPagination ? '✓' : '✗'}`);
      console.log(`  Next Link: ${analysis.hasNextLink ? '✓' : '✗'}`);
      console.log(`  Prev Link: ${analysis.hasPrevLink ? '✗' : '✓'}`);
      console.log(`  Structured Data: ${analysis.hasStructuredData ? '✓' : '✗'}`);
      console.log(`  Breadcrumbs: ${analysis.hasBreadcrumbs ? '✓' : '✗'}`);
      console.log(`  Cache Control: ${analysis.cacheHeaders.cacheControl || 'none'}`);
      console.log('');
      
      return analysis;
    } catch (error) {
      console.error(`Error testing ${url}:`, error.message);
      return null;
    }
  }

  /**
   * Test blog post page for related posts
   */
  async testBlogPost(locale, slug) {
    const url = `${this.baseUrl}/${locale}/blog/${slug}`;
    
    console.log(`Testing blog post: ${url}`);
    
    try {
      const response = await this.fetchPage(url);
      
      const analysis = {
        url,
        status: response.status,
        size: response.size,
        hasRelatedPosts: response.content.includes('Related Posts') || response.content.includes('Aiheeseen liittyvät'),
        hasBreadcrumbs: response.content.includes('breadcrumb'),
        hasStructuredData: response.content.includes('application/ld+json'),
        hasNextPrevLinks: response.content.includes('next') && response.content.includes('previous'),
      };
      
      console.log(`  Status: ${response.status}`);
      console.log(`  Size: ${this.formatBytes(response.size)}`);
      console.log(`  Related Posts: ${analysis.hasRelatedPosts ? '✓' : '✗'}`);
      console.log(`  Breadcrumbs: ${analysis.hasBreadcrumbs ? '✓' : '✗'}`);
      console.log(`  Structured Data: ${analysis.hasStructuredData ? '✓' : '✗'}`);
      console.log('');
      
      return analysis;
    } catch (error) {
      console.error(`Error testing ${url}:`, error.message);
      return null;
    }
  }

  /**
   * Test all pagination functionality
   */
  async testAllPagination() {
    console.log('🧪 Testing Blog Pagination System\n');
    console.log('='.repeat(60));
    
    // Test English blog pages
    console.log('📝 Testing English Blog Pages:');
    await this.testPaginationPage('en', 1); // Main blog page
    await this.testPaginationPage('en', 2); // Page 2
    await this.testPaginationPage('en', 3); // Page 3
    
    // Test Finnish blog pages
    console.log('📝 Testing Finnish Blog Pages:');
    await this.testPaginationPage('fi', 1); // Main blog page
    await this.testPaginationPage('fi', 2); // Page 2
    
    // Test blog posts
    console.log('📄 Testing Blog Posts:');
    await this.testBlogPost('en', 'ai-communication-expert-teams');
    await this.testBlogPost('fi', 'ai-viestinta-asiantuntijatiimit');
    
    console.log('='.repeat(60));
    this.printSummary();
  }

  /**
   * Format bytes to human readable format
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Print test summary
   */
  printSummary() {
    console.log('\n📊 Pagination Test Summary');
    console.log('='.repeat(60));
    
    const totalTests = this.results.length;
    const successfulTests = this.results.filter(r => r.status === 200).length;
    const paginatedPages = this.results.filter(r => r.hasPagination).length;
    const structuredDataPages = this.results.filter(r => r.hasStructuredData).length;
    const breadcrumbPages = this.results.filter(r => r.hasBreadcrumbs).length;
    
    console.log(`Total tests: ${totalTests}`);
    console.log(`Successful requests: ${successfulTests}/${totalTests} (${Math.round(successfulTests/totalTests*100)}%)`);
    console.log(`Pages with pagination: ${paginatedPages}/${totalTests} (${Math.round(paginatedPages/totalTests*100)}%)`);
    console.log(`Pages with structured data: ${structuredDataPages}/${totalTests} (${Math.round(structuredDataPages/totalTests*100)}%)`);
    console.log(`Pages with breadcrumbs: ${breadcrumbPages}/${totalTests} (${Math.round(breadcrumbPages/totalTests*100)}%)`);
    
    console.log('\n🎯 SEO Recommendations:');
    
    if (paginatedPages < totalTests * 0.8) {
      console.log('⚠️  Ensure all paginated pages have pagination controls');
    }
    
    if (structuredDataPages < totalTests * 0.9) {
      console.log('⚠️  Add structured data to more pages for better SEO');
    }
    
    if (breadcrumbPages < totalTests * 0.8) {
      console.log('⚠️  Add breadcrumbs to more pages for better navigation');
    }
    
    if (paginatedPages >= totalTests * 0.8 && structuredDataPages >= totalTests * 0.9) {
      console.log('✅ Excellent pagination and SEO implementation!');
    }
    
    console.log('\n🔗 URL Structure:');
    console.log('• Main blog: /en/blog, /fi/blog');
    console.log('• Paginated: /en/blog/page/2, /fi/blog/page/2');
    console.log('• Posts: /en/blog/slug, /fi/blog/slug');
    
    console.log('\n📈 Expected Benefits:');
    console.log('• Improved crawl depth for search engines');
    console.log('• Better user navigation experience');
    console.log('• Enhanced internal linking structure');
    console.log('• Proper pagination signals for SEO');
  }
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const baseUrl = process.argv[2] || 'http://localhost:3000';
  const tester = new PaginationTester(baseUrl);
  
  console.log(`Testing blog pagination for: ${baseUrl}\n`);
  
  tester.testAllPagination().catch(console.error);
}

export default PaginationTester;
