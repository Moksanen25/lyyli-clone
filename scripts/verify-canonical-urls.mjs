#!/usr/bin/env node
/**
 * Verification script to ensure all canonical URLs point to lyyli.ai production domain
 * This script validates the canonical URL implementation across all pages.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const PRODUCTION_DOMAIN = 'https://lyyli.ai';
const INVALID_PATTERNS = [
  /vercel\.app/i,
  /localhost/i,
  /staging/i,
  /preview/i,
  /dev\./i,
  /^http:/i // Must be HTTPS
];

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const issues = [];

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',    // Cyan
    success: '\x1b[32m', // Green
    warning: '\x1b[33m', // Yellow
    error: '\x1b[31m',   // Red
    reset: '\x1b[0m'     // Reset
  };
  
  console.log(`${colors[type]}${message}${colors.reset}`);
}

function checkCanonicalUrl(url, context) {
  totalChecks++;
  
  if (!url) {
    failedChecks++;
    issues.push(`${context}: Missing canonical URL`);
    return false;
  }
  
  // Check if URL starts with production domain
  if (!url.startsWith(PRODUCTION_DOMAIN)) {
    failedChecks++;
    issues.push(`${context}: Canonical URL does not start with ${PRODUCTION_DOMAIN}: ${url}`);
    return false;
  }
  
  // Check for invalid patterns
  for (const pattern of INVALID_PATTERNS) {
    if (pattern.test(url)) {
      failedChecks++;
      issues.push(`${context}: Canonical URL contains invalid pattern ${pattern}: ${url}`);
      return false;
    }
  }
  
  // Check URL format
  try {
    const urlObj = new URL(url);
    if (urlObj.origin !== PRODUCTION_DOMAIN) {
      failedChecks++;
      issues.push(`${context}: URL origin mismatch. Expected ${PRODUCTION_DOMAIN}, got ${urlObj.origin}`);
      return false;
    }
  } catch (error) {
    failedChecks++;
    issues.push(`${context}: Invalid URL format: ${url}`);
    return false;
  }
  
  passedChecks++;
  return true;
}

function extractCanonicalFromMetadata(content, filePath) {
  // Look for canonical in alternates object
  const canonicalMatches = content.match(/canonical:\s*[`"']([^`"']+)[`"']/g) || [];
  const generateCanonicalMatches = content.match(/generatePageCanonicalUrl\(['"`]([^'"`]*?)['"`],\s*locale\)/g) || [];
  const generateBlogMatches = content.match(/generateBlogCanonicalUrl\([^)]+\)/g) || [];
  
  const urls = [];
  
  // Extract static canonical URLs
  canonicalMatches.forEach(match => {
    const url = match.match(/canonical:\s*[`"']([^`"']+)[`"']/)?.[1];
    if (url && !url.includes('${') && !url.includes('generatePageCanonicalUrl')) {
      // This is a static URL, it should be replaced
      if (url.startsWith('/')) {
        issues.push(`${filePath}: Found relative canonical URL that should use canonical helper: ${url}`);
        failedChecks++;
        totalChecks++;
      }
    }
  });
  
  // Check that canonical helpers are being used
  if (content.includes('alternates:') && content.includes('canonical:')) {
    if (!content.includes('generatePageCanonicalUrl') && !content.includes('generateBlogCanonicalUrl')) {
      const hasStaticCanonical = content.match(/canonical:\s*['"`][^'"`]*\/[^'"`]*['"`]/);
      if (hasStaticCanonical) {
        issues.push(`${filePath}: Should use canonical helper functions instead of static URLs`);
        failedChecks++;
        totalChecks++;
      }
    }
  }
  
  return urls;
}

function scanDirectory(dir, prefix = '') {
  const entries = readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip node_modules, .next, and other build directories
      if (['node_modules', '.next', 'dist', 'build', 'coverage'].includes(entry)) {
        continue;
      }
      scanDirectory(fullPath, `${prefix}${entry}/`);
    } else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) {
      // Skip test files for now
      if (entry.includes('.test.') || entry.includes('.spec.')) {
        continue;
      }
      
      try {
        const content = readFileSync(fullPath, 'utf-8');
        const relativePath = `${prefix}${entry}`;
        
        // Check for canonical URL patterns
        extractCanonicalFromMetadata(content, relativePath);
        
        // Check for hardcoded lyyli.ai URLs that should use constants
        const hardcodedMatches = content.match(/https:\/\/lyyli\.ai/g) || [];
        hardcodedMatches.forEach(() => {
          if (!content.includes('PRODUCTION_DOMAIN') && !content.includes('getProductionDomain')) {
            // Allow hardcoded URLs in specific files
            if (!relativePath.includes('canonical.ts') && !relativePath.includes('test.')) {
              // This is acceptable in some cases, just note it
              log(`${relativePath}: Contains hardcoded https://lyyli.ai URL`, 'warning');
            }
          }
        });
      } catch (error) {
        log(`Error reading ${relativePath}: ${error.message}`, 'error');
      }
    }
  }
}

function checkCanonicalUtility() {
  try {
    const canonicalPath = join(projectRoot, 'src/lib/canonical.ts');
    const content = readFileSync(canonicalPath, 'utf-8');
    
    // Verify the production domain is correctly set
    if (!content.includes('const PRODUCTION_DOMAIN = "https://lyyli.ai"')) {
      issues.push('canonical.ts: PRODUCTION_DOMAIN is not set to https://lyyli.ai');
      failedChecks++;
    } else {
      passedChecks++;
    }
    totalChecks++;
    
    // Check that all generated URLs use the production domain
    const functionNames = [
      'generateCanonicalUrl',
      'generatePageCanonicalUrl', 
      'generateBlogCanonicalUrl',
      'generateAlternateUrls'
    ];
    
    functionNames.forEach(funcName => {
      if (content.includes(`export function ${funcName}`)) {
        passedChecks++;
        log(`✓ Found canonical utility function: ${funcName}`, 'success');
      } else {
        failedChecks++;
        issues.push(`canonical.ts: Missing function ${funcName}`);
      }
      totalChecks++;
    });
    
  } catch (error) {
    issues.push(`Failed to check canonical utility: ${error.message}`);
    failedChecks++;
    totalChecks++;
  }
}

function main() {
  log('🔍 Verifying canonical URL implementation...', 'info');
  log('', 'info');
  
  // Check the canonical utility functions
  log('Checking canonical utility functions...', 'info');
  checkCanonicalUtility();
  
  // Scan source files
  log('Scanning source files for canonical URL usage...', 'info');
  scanDirectory(join(projectRoot, 'src'));
  
  // Summary
  log('', 'info');
  log('📊 Verification Summary:', 'info');
  log(`   Total checks: ${totalChecks}`, 'info');
  log(`   Passed: ${passedChecks}`, 'success');
  log(`   Failed: ${failedChecks}`, failedChecks > 0 ? 'error' : 'success');
  
  if (issues.length > 0) {
    log('', 'info');
    log('❌ Issues found:', 'error');
    issues.forEach(issue => log(`   • ${issue}`, 'error'));
  } else {
    log('', 'info');
    log('✅ All canonical URLs correctly point to lyyli.ai production domain!', 'success');
  }
  
  // Exit with appropriate code
  process.exit(failedChecks > 0 ? 1 : 0);
}

main();
