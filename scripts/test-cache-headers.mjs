#!/usr/bin/env node

import { createHash } from 'crypto';
import https from 'https';
import http from 'http';

/**
 * Test cache headers for static assets
 */
class CacheTester {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
    this.results = [];
  }

  /**
   * Make HTTP request and return headers
   */
  async fetchHeaders(url) {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https') ? https : http;
      
      const req = client.get(url, (res) => {
        const headers = {};
        
        // Copy headers
        Object.keys(res.headers).forEach(key => {
          headers[key] = res.headers[key];
        });
        
        // Add status code
        headers[':status'] = res.statusCode;
        
        // Drain response body
        res.on('data', () => {});
        res.on('end', () => {
          resolve({
            url,
            status: res.statusCode,
            headers,
            size: parseInt(headers['content-length'] || '0', 10)
          });
        });
      });
      
      req.on('error', reject);
      req.setTimeout(5000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  /**
   * Test cache headers for a specific URL
   */
  async testCacheHeaders(url, expectedMaxAge = null) {
    try {
      console.log(`Testing: ${url}`);
      const result = await this.fetchHeaders(url);
      
      const cacheControl = result.headers['cache-control'] || '';
      const etag = result.headers['etag'] || '';
      const contentType = result.headers['content-type'] || '';
      const contentEncoding = result.headers['content-encoding'] || '';
      const vary = result.headers['vary'] || '';
      
      const analysis = {
        url,
        status: result.status,
        cacheControl,
        etag: !!etag,
        contentType,
        contentEncoding,
        vary,
        size: result.size,
        maxAge: this.extractMaxAge(cacheControl),
        hasImmutable: cacheControl.includes('immutable'),
        hasPublic: cacheControl.includes('public'),
        isCompressed: !!contentEncoding,
        hasVaryAcceptEncoding: vary.includes('Accept-Encoding')
      };
      
      this.results.push(analysis);
      
      // Print results
      console.log(`  Status: ${result.status}`);
      console.log(`  Cache-Control: ${cacheControl}`);
      console.log(`  ETag: ${etag ? '✓' : '✗'}`);
      console.log(`  Content-Type: ${contentType}`);
      console.log(`  Content-Encoding: ${contentEncoding || 'none'}`);
      console.log(`  Size: ${this.formatBytes(result.size)}`);
      console.log(`  Max-Age: ${analysis.maxAge}s (${this.formatDuration(analysis.maxAge)})`);
      console.log('');
      
      return analysis;
    } catch (error) {
      console.error(`Error testing ${url}:`, error.message);
      return null;
    }
  }

  /**
   * Extract max-age from Cache-Control header
   */
  extractMaxAge(cacheControl) {
    const match = cacheControl.match(/max-age=(\d+)/);
    return match ? parseInt(match[1], 10) : null;
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
   * Format duration in seconds to human readable format
   */
  formatDuration(seconds) {
    if (!seconds) return 'none';
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m`;
    return `${seconds}s`;
  }

  /**
   * Test all static assets
   */
  async testAllAssets() {
    const testUrls = [
      // Static assets
      `${this.baseUrl}/favicon.ico`,
      `${this.baseUrl}/robots.txt`,
      `${this.baseUrl}/sitemap.xml`,
      `${this.baseUrl}/manifest.json`,
      `${this.baseUrl}/sw.js`,
      
      // Images
      `${this.baseUrl}/images/logos/Lyyli_ai_favicon.svg`,
      `${this.baseUrl}/images/logos/Lyyli_ai_no_BG.png`,
      
      // Test page
      `${this.baseUrl}/en/cache-test`,
      `${this.baseUrl}/fi/cache-test`,
    ];

    console.log('🧪 Testing Cache Headers for Static Assets\n');
    console.log('='.repeat(60));
    
    for (const url of testUrls) {
      await this.testCacheHeaders(url);
    }
    
    console.log('='.repeat(60));
    this.printSummary();
  }

  /**
   * Print test summary
   */
  printSummary() {
    console.log('\n📊 Test Summary');
    console.log('='.repeat(60));
    
    const totalTests = this.results.length;
    const successfulTests = this.results.filter(r => r.status === 200).length;
    const cachedAssets = this.results.filter(r => r.maxAge && r.maxAge > 3600).length;
    const longCachedAssets = this.results.filter(r => r.maxAge && r.maxAge >= 31536000).length;
    const compressedAssets = this.results.filter(r => r.isCompressed).length;
    const etaggedAssets = this.results.filter(r => r.etag).length;
    
    console.log(`Total tests: ${totalTests}`);
    console.log(`Successful requests: ${successfulTests}/${totalTests} (${Math.round(successfulTests/totalTests*100)}%)`);
    console.log(`Cached assets (>1h): ${cachedAssets}/${totalTests} (${Math.round(cachedAssets/totalTests*100)}%)`);
    console.log(`Long cached assets (1y): ${longCachedAssets}/${totalTests} (${Math.round(longCachedAssets/totalTests*100)}%)`);
    console.log(`Compressed assets: ${compressedAssets}/${totalTests} (${Math.round(compressedAssets/totalTests*100)}%)`);
    console.log(`ETagged assets: ${etaggedAssets}/${totalTests} (${Math.round(etaggedAssets/totalTests*100)}%)`);
    
    console.log('\n🎯 Performance Recommendations:');
    
    if (longCachedAssets < totalTests * 0.8) {
      console.log('⚠️  Consider adding longer cache times for static assets');
    }
    
    if (compressedAssets < totalTests * 0.9) {
      console.log('⚠️  Enable compression for more assets');
    }
    
    if (etaggedAssets < totalTests * 0.8) {
      console.log('⚠️  Add ETags to more assets for better caching');
    }
    
    if (longCachedAssets >= totalTests * 0.8 && compressedAssets >= totalTests * 0.9) {
      console.log('✅ Excellent caching configuration!');
    }
  }
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const baseUrl = process.argv[2] || 'http://localhost:3000';
  const tester = new CacheTester(baseUrl);
  
  console.log(`Testing cache headers for: ${baseUrl}\n`);
  
  tester.testAllAssets().catch(console.error);
}

export default CacheTester;
