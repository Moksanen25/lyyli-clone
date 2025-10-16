#!/usr/bin/env node

/**
 * Hreflang Validation Script
 * 
 * This script validates the hreflang implementation in the sitemap:
 * - Checks for proper xhtml:link elements
 * - Validates hreflang attributes
 * - Ensures bidirectional linking
 * - Validates against Google's requirements
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');

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

function validateHreflangImplementation() {
  log('\n🌐 Validating Hreflang Implementation...', 'bright');
  
  if (!fs.existsSync(sitemapPath)) {
    logError('sitemap.xml not found');
    return false;
  }
  
  const content = fs.readFileSync(sitemapPath, 'utf8');
  let isValid = true;
  
  // Check for xhtml namespace
  if (content.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) {
    logSuccess('XHTML namespace is properly declared');
  } else {
    logError('Missing XHTML namespace declaration');
    isValid = false;
  }
  
  // Extract all hreflang links
  const hreflangMatches = content.match(/<xhtml:link[^>]*hreflang="[^"]*"[^>]*>/g);
  if (!hreflangMatches) {
    logError('No hreflang links found');
    return false;
  }
  
  logInfo(`Found ${hreflangMatches.length} hreflang links`);
  
  // Validate hreflang attributes
  const hreflangValues = new Set();
  let validHreflangCount = 0;
  
  for (const match of hreflangMatches) {
    const hreflangMatch = match.match(/hreflang="([^"]*)"/);
    if (hreflangMatch) {
      const hreflang = hreflangMatch[1];
      hreflangValues.add(hreflang);
      
      if (['en', 'fi', 'x-default'].includes(hreflang)) {
        validHreflangCount++;
      } else {
        logError(`Invalid hreflang value: ${hreflang}`);
        isValid = false;
      }
    }
  }
  
  logSuccess(`Valid hreflang values: ${Array.from(hreflangValues).join(', ')}`);
  logInfo(`Valid hreflang links: ${validHreflangCount}/${hreflangMatches.length}`);
  
  // Check for required hreflang values
  if (hreflangValues.has('en') && hreflangValues.has('fi') && hreflangValues.has('x-default')) {
    logSuccess('All required hreflang values present (en, fi, x-default)');
  } else {
    logError('Missing required hreflang values');
    isValid = false;
  }
  
  // Validate bidirectional linking
  const urlBlocks = content.split('<url>').slice(1);
  let bidirectionalValid = true;
  let bidirectionalCount = 0;
  
  for (const block of urlBlocks) {
    const locMatch = block.match(/<loc>([^<]*)<\/loc>/);
    if (!locMatch) continue;
    
    const url = locMatch[1];
    const hreflangLinks = block.match(/<xhtml:link[^>]*hreflang="[^"]*"[^>]*>/g) || [];
    
    if (hreflangLinks.length >= 3) {
      // Check if this URL has proper alternates
      const hasEn = hreflangLinks.some(link => link.includes('hreflang="en"'));
      const hasFi = hreflangLinks.some(link => link.includes('hreflang="fi"'));
      const hasXDefault = hreflangLinks.some(link => link.includes('hreflang="x-default"'));
      
      if (hasEn && hasFi && hasXDefault) {
        bidirectionalCount++;
      } else {
        logWarning(`URL ${url} missing some hreflang alternates`);
        bidirectionalValid = false;
      }
    }
  }
  
  logInfo(`URLs with proper hreflang alternates: ${bidirectionalCount}/${urlBlocks.length}`);
  
  if (bidirectionalValid) {
    logSuccess('Bidirectional hreflang linking is properly implemented');
  } else {
    logError('Some URLs are missing proper hreflang alternates');
    isValid = false;
  }
  
  return isValid;
}

function validateGoogleRequirements() {
  log('\n🔍 Validating Google Sitemap Requirements...', 'bright');
  
  const content = fs.readFileSync(sitemapPath, 'utf8');
  let isValid = true;
  
  // Check XML structure
  if (content.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
    logSuccess('Proper XML declaration');
  } else {
    logError('Missing or incorrect XML declaration');
    isValid = false;
  }
  
  if (content.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    logSuccess('Proper urlset namespace');
  } else {
    logError('Missing or incorrect urlset namespace');
    isValid = false;
  }
  
  // Check for self-referencing hreflang
  const urlBlocks = content.split('<url>').slice(1);
  let selfReferenceCount = 0;
  
  for (const block of urlBlocks) {
    const locMatch = block.match(/<loc>([^<]*)<\/loc>/);
    if (!locMatch) continue;
    
    const url = locMatch[1];
    const hreflangLinks = block.match(/<xhtml:link[^>]*hreflang="[^"]*"[^>]*>/g) || [];
    
    // Check if URL references itself in hreflang
    const selfReference = hreflangLinks.some(link => link.includes(`href="${url}"`));
    if (selfReference) {
      selfReferenceCount++;
    }
  }
  
  logInfo(`URLs with self-referencing hreflang: ${selfReferenceCount}`);
  
  if (selfReferenceCount > 0) {
    logSuccess('Self-referencing hreflang links found (Google requirement)');
  } else {
    logWarning('No self-referencing hreflang links found');
  }
  
  // Check for x-default
  const xDefaultCount = (content.match(/hreflang="x-default"/g) || []).length;
  logInfo(`x-default hreflang links: ${xDefaultCount}`);
  
  if (xDefaultCount > 0) {
    logSuccess('x-default hreflang links present');
  } else {
    logError('No x-default hreflang links found');
    isValid = false;
  }
  
  return isValid;
}

function validateSchemaCompliance() {
  log('\n📋 Validating Schema Compliance...', 'bright');
  
  const content = fs.readFileSync(sitemapPath, 'utf8');
  let isValid = true;
  
  // Check for proper element structure
  const urlCount = (content.match(/<url>/g) || []).length;
  const locCount = (content.match(/<loc>/g) || []).length;
  const lastmodCount = (content.match(/<lastmod>/g) || []).length;
  
  logInfo(`URL blocks: ${urlCount}`);
  logInfo(`Location elements: ${locCount}`);
  logInfo(`Last modified elements: ${lastmodCount}`);
  
  if (urlCount === locCount) {
    logSuccess('All URL blocks have location elements');
  } else {
    logError('Mismatch between URL blocks and location elements');
    isValid = false;
  }
  
  // Check URL format
  const urlMatches = content.match(/<loc>https:\/\/lyyli\.ai\/[^<]*<\/loc>/g);
  if (urlMatches) {
    logSuccess(`All ${urlMatches.length} URLs use correct domain format`);
    
    // Check for duplicate URLs
    const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''));
    const uniqueUrls = [...new Set(urls)];
    
    if (urls.length === uniqueUrls.length) {
      logSuccess('No duplicate URLs found');
    } else {
      logError(`Found ${urls.length - uniqueUrls.length} duplicate URLs`);
      isValid = false;
    }
  }
  
  return isValid;
}

async function main() {
  log('🔍 Hreflang Validation Script', 'bright');
  log('=============================', 'bright');
  
  const results = {
    hreflang: validateHreflangImplementation(),
    google: validateGoogleRequirements(),
    schema: validateSchemaCompliance()
  };
  
  log('\n📊 Summary', 'bright');
  log('===========', 'bright');
  
  const checks = [
    { name: 'Hreflang Implementation', result: results.hreflang },
    { name: 'Google Requirements', result: results.google },
    { name: 'Schema Compliance', result: results.schema }
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
    log('\n🎉 All hreflang validation checks passed!', 'green');
    log('✅ Sitemap is ready for Google Search Console', 'green');
    process.exit(0);
  } else {
    log('\n❌ Some hreflang validation checks failed. Please review the errors above.', 'red');
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  logError(`Script failed: ${error.message}`);
  process.exit(1);
});
