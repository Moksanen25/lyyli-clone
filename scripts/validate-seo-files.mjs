#!/usr/bin/env node

/**
 * SEO Files Validation Script
 * 
 * This script validates robots.txt and sitemap.xml files:
 * - Checks robots.txt syntax and structure
 * - Validates sitemap.xml format and content
 * - Fetches and validates live versions from production
 * - Ensures all important pages are included
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

// Production URLs
const PRODUCTION_URL = 'https://lyyli.ai';
const ROBOTS_URL = `${PRODUCTION_URL}/robots.txt`;
const SITEMAP_URL = `${PRODUCTION_URL}/sitemap.xml`;

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, 'green');
}

function logError(message) {
  log(`✗ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠ ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ ${message}`, 'blue');
}

// Expected pages that should be in sitemap
const expectedPages = [
  // Homepage
  '/',
  
  // English pages
  '/en',
  '/en/features',
  '/en/pricing',
  '/en/about',
  '/en/contact',
  '/en/blog',
  '/en/security',
  '/en/waitlist',
  '/en/privacy',
  '/en/cookies',
  
  // Finnish pages
  '/fi',
  '/fi/features',
  '/fi/pricing',
  '/fi/about',
  '/fi/contact',
  '/fi/blog',
  '/fi/security',
  '/fi/waitlist',
  '/fi/privacy',
  '/fi/cookies',
  
  // Help pages (sample)
  '/en/help',
  '/en/help/getting-started',
  '/fi/help',
  '/fi/help/getting-started',
];

// Required robots.txt directives
const requiredRobotsDirectives = [
  'User-agent:',
  'Sitemap:',
  'Disallow: /_next/',
  'Disallow: /api/',
  'Disallow: /admin/',
];

async function validateRobotsTxt() {
  log('\n🤖 Validating robots.txt...', 'bright');
  
  const robotsPath = path.join(publicDir, 'robots.txt');
  
  if (!fs.existsSync(robotsPath)) {
    logError('robots.txt file not found');
    return false;
  }
  
  const content = fs.readFileSync(robotsPath, 'utf8');
  let isValid = true;
  
  // Check required directives
  for (const directive of requiredRobotsDirectives) {
    if (content.includes(directive)) {
      logSuccess(`Contains required directive: ${directive}`);
    } else {
      logError(`Missing required directive: ${directive}`);
      isValid = false;
    }
  }
  
  // Check sitemap URL
  if (content.includes('Sitemap: https://lyyli.ai/sitemap.xml')) {
    logSuccess('Sitemap URL is correct');
  } else {
    logError('Sitemap URL is incorrect or missing');
    isValid = false;
  }
  
  // Check for proper structure
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
  
  if (hasUserAgent) {
    logSuccess('Has User-agent directive');
  } else {
    logError('Missing User-agent directive');
    isValid = false;
  }
  
  if (hasSitemap) {
    logSuccess('Has Sitemap directive');
  } else {
    logError('Missing Sitemap directive');
    isValid = false;
  }
  
  // Check for common issues
  if (content.includes('Disallow: /')) {
    logWarning('Contains Disallow: / - this blocks all crawling');
  }
  
  return isValid;
}

async function validateSitemapXml() {
  log('\n🗺️ Validating sitemap.xml...', 'bright');
  
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  
  if (!fs.existsSync(sitemapPath)) {
    logError('sitemap.xml file not found');
    return false;
  }
  
  const content = fs.readFileSync(sitemapPath, 'utf8');
  let isValid = true;
  
  // Check XML structure
  if (content.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
    logSuccess('Has proper XML declaration');
  } else {
    logError('Missing or incorrect XML declaration');
    isValid = false;
  }
  
  if (content.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    logSuccess('Has proper urlset namespace');
  } else {
    logError('Missing or incorrect urlset namespace');
    isValid = false;
  }
  
  // Count URLs
  const urlMatches = content.match(/<url>/g);
  const urlCount = urlMatches ? urlMatches.length : 0;
  logInfo(`Contains ${urlCount} URLs`);
  
  if (urlCount < 20) {
    logWarning('Sitemap has very few URLs - may be missing content');
  }
  
  // Check for required pages
  let foundPages = 0;
  for (const page of expectedPages) {
    const fullUrl = `https://lyyli.ai${page}`;
    if (content.includes(`<loc>${fullUrl}</loc>`)) {
      foundPages++;
    } else {
      logWarning(`Missing expected page: ${page}`);
    }
  }
  
  logInfo(`Found ${foundPages}/${expectedPages.length} expected pages`);
  
  // Check for proper URL structure
  const locMatches = content.match(/<loc>https:\/\/lyyli\.ai\/[^<]*<\/loc>/g);
  if (locMatches) {
    logSuccess(`Found ${locMatches.length} properly formatted URLs`);
    
    // Check for duplicate URLs
    const urls = locMatches.map(match => match.replace(/<\/?loc>/g, ''));
    const uniqueUrls = [...new Set(urls)];
    
    if (urls.length === uniqueUrls.length) {
      logSuccess('No duplicate URLs found');
    } else {
      logError(`Found ${urls.length - uniqueUrls.length} duplicate URLs`);
      isValid = false;
    }
  }
  
  // Check for hreflang implementation
  if (content.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) {
    logSuccess('XHTML namespace declared for hreflang');
    
    const hreflangLinks = content.match(/<xhtml:link[^>]*hreflang="[^"]*"[^>]*>/g);
    if (hreflangLinks) {
      logSuccess(`Found ${hreflangLinks.length} hreflang links`);
      
      // Check for required hreflang values
      const hasEn = content.includes('hreflang="en"');
      const hasFi = content.includes('hreflang="fi"');
      const hasXDefault = content.includes('hreflang="x-default"');
      
      if (hasEn && hasFi && hasXDefault) {
        logSuccess('All required hreflang values present (en, fi, x-default)');
      } else {
        logError('Missing required hreflang values');
        isValid = false;
      }
    } else {
      logError('No hreflang links found');
      isValid = false;
    }
  } else {
    logError('Missing XHTML namespace for hreflang');
    isValid = false;
  }
  
  // Check for required elements in each URL
  const urlBlocks = content.split('<url>').slice(1); // Skip first empty split
  let validUrlBlocks = 0;
  
  for (const block of urlBlocks) {
    if (block.includes('<loc>') && block.includes('</loc>')) {
      validUrlBlocks++;
    }
  }
  
  logInfo(`Found ${validUrlBlocks} valid URL blocks`);
  
  if (validUrlBlocks !== urlCount) {
    logError('URL count mismatch - some URLs may be malformed');
    isValid = false;
  }
  
  return isValid;
}

async function fetchAndValidateProduction() {
  log('\n🌐 Fetching and validating production files...', 'bright');
  
  try {
    // Fetch robots.txt
    logInfo('Fetching robots.txt from production...');
    const robotsResponse = await fetch(ROBOTS_URL);
    
    if (robotsResponse.ok) {
      const robotsContent = await robotsResponse.text();
      logSuccess('Successfully fetched robots.txt from production');
      
      // Check if content matches local file
      const localRobots = fs.readFileSync(path.join(publicDir, 'robots.txt'), 'utf8');
      if (robotsContent.trim() === localRobots.trim()) {
        logSuccess('Production robots.txt matches local file');
      } else {
        logWarning('Production robots.txt differs from local file');
      }
    } else {
      logError(`Failed to fetch robots.txt: ${robotsResponse.status}`);
      return false;
    }
    
    // Fetch sitemap.xml
    logInfo('Fetching sitemap.xml from production...');
    const sitemapResponse = await fetch(SITEMAP_URL);
    
    if (sitemapResponse.ok) {
      const sitemapContent = await sitemapResponse.text();
      logSuccess('Successfully fetched sitemap.xml from production');
      
      // Basic validation of production sitemap
      if (sitemapContent.includes('<urlset') && sitemapContent.includes('</urlset>')) {
        logSuccess('Production sitemap has valid structure');
        
        const urlCount = (sitemapContent.match(/<url>/g) || []).length;
        logInfo(`Production sitemap contains ${urlCount} URLs`);
      } else {
        logError('Production sitemap has invalid structure');
        return false;
      }
    } else {
      logError(`Failed to fetch sitemap.xml: ${sitemapResponse.status}`);
      return false;
    }
    
    return true;
    
  } catch (error) {
    logWarning(`Network error during production validation: ${error.message}`);
    logInfo('This is expected if running offline or if production is not accessible');
    return true; // Don't fail the entire check for network issues
  }
}

async function validateFileAccessibility() {
  log('\n🔍 Validating file accessibility...', 'bright');
  
  const files = [
    { name: 'robots.txt', path: path.join(publicDir, 'robots.txt') },
    { name: 'sitemap.xml', path: path.join(publicDir, 'sitemap.xml') }
  ];
  
  let allAccessible = true;
  
  for (const file of files) {
    try {
      const stats = fs.statSync(file.path);
      if (stats.size > 0) {
        logSuccess(`${file.name} is accessible and has content (${stats.size} bytes)`);
      } else {
        logError(`${file.name} is empty`);
        allAccessible = false;
      }
    } catch (error) {
      logError(`${file.name} is not accessible: ${error.message}`);
      allAccessible = false;
    }
  }
  
  return allAccessible;
}

async function main() {
  log('🔍 SEO Files Validation Script', 'bright');
  log('===============================', 'bright');
  
  const results = {
    robotsTxt: await validateRobotsTxt(),
    sitemapXml: await validateSitemapXml(),
    production: await fetchAndValidateProduction(),
    accessibility: await validateFileAccessibility()
  };
  
  log('\n📊 Summary', 'bright');
  log('===========', 'bright');
  
  const checks = [
    { name: 'Robots.txt Validation', result: results.robotsTxt },
    { name: 'Sitemap.xml Validation', result: results.sitemapXml },
    { name: 'Production Files', result: results.production },
    { name: 'File Accessibility', result: results.accessibility }
  ];
  
  let allPassed = true;
  
  for (const check of checks) {
    if (check.result) {
      logSuccess(`${check.name}: PASSED`);
    } else {
      logError(`${check.name}: FAILED`);
      allPassed = false;
    }
  }
  
  if (allPassed) {
    log('\n🎉 All SEO file checks passed!', 'green');
    process.exit(0);
  } else {
    log('\n❌ Some SEO file checks failed. Please review the errors above.', 'red');
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  logError(`Script failed: ${error.message}`);
  process.exit(1);
});
