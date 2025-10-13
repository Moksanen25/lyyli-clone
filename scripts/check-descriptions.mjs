#!/usr/bin/env node
/**
 * Meta Description Validation Script
 * Checks that all pages have proper meta descriptions
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const MIN_LENGTH = 120;
const MAX_LENGTH = 155;
const RECOMMENDED_MIN = 125;
const RECOMMENDED_MAX = 150;

const results = {
  totalDescriptions: 0,
  validDescriptions: 0,
  errors: [],
  warnings: []
};

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    warning: '\x1b[33m',
    error: '\x1b[31m',
    reset: '\x1b[0m'
  };
  
  console.log(`${colors[type]}${message}${colors.reset}`);
}

function checkDescription(key, description, locale) {
  results.totalDescriptions++;

  if (!description) {
    results.errors.push(`${locale}: ${key} - Missing description`);
    return;
  }

  const length = description.length;
  let hasIssue = false;

  // Check length
  if (length < MIN_LENGTH) {
    results.errors.push(`${locale}: ${key} - Too short (${length} chars, min: ${MIN_LENGTH})`);
    hasIssue = true;
  } else if (length < RECOMMENDED_MIN) {
    results.warnings.push(`${locale}: ${key} - Below recommended (${length} chars, recommended: ${RECOMMENDED_MIN}+)`);
  }

  if (length > MAX_LENGTH) {
    results.errors.push(`${locale}: ${key} - Too long (${length} chars, max: ${MAX_LENGTH})`);
    hasIssue = true;
  } else if (length > RECOMMENDED_MAX) {
    results.warnings.push(`${locale}: ${key} - Above recommended (${length} chars, recommended: ≤${RECOMMENDED_MAX})`);
  }

  // Check for common issues
  if (description.includes('  ')) {
    results.warnings.push(`${locale}: ${key} - Contains double spaces`);
  }

  if (!description.endsWith('.') && !description.endsWith('!') && !description.endsWith('?')) {
    results.warnings.push(`${locale}: ${key} - Should end with punctuation`);
  }

  if (!hasIssue) {
    results.validDescriptions++;
  }
}

function checkTranslations() {
  const locales = ['en', 'fi'];

  locales.forEach(locale => {
    const translationPath = join(projectRoot, `src/translations/${locale}.json`);
    
    if (!existsSync(translationPath)) {
      results.errors.push(`Translation file not found: ${locale}.json`);
      return;
    }

    try {
      const content = readFileSync(translationPath, 'utf-8');
      const translations = JSON.parse(content);

      // Find all page descriptions
      const descriptionKeys = Object.keys(translations).filter(k => k.includes('.page.description'));

      log(`Checking ${descriptionKeys.length} descriptions in ${locale}.json...`, 'info');

      descriptionKeys.forEach(key => {
        checkDescription(key, translations[key], locale);
      });

    } catch (error) {
      results.errors.push(`Failed to read ${locale}.json: ${error.message}`);
    }
  });
}

function checkForDuplicates() {
  const locales = ['en', 'fi'];

  locales.forEach(locale => {
    const translationPath = join(projectRoot, `src/translations/${locale}.json`);
    
    try {
      const content = readFileSync(translationPath, 'utf-8');
      const translations = JSON.parse(content);

      const descriptions = {};
      Object.keys(translations).forEach(key => {
        if (key.includes('.page.description')) {
          descriptions[key] = translations[key];
        }
      });

      // Check for duplicates
      const seen = new Map();
      Object.entries(descriptions).forEach(([key, desc]) => {
        const normalized = String(desc).trim().toLowerCase();
        
        if (seen.has(normalized)) {
          seen.get(normalized).push(key);
        } else {
          seen.set(normalized, [key]);
        }
      });

      seen.forEach((keys, desc) => {
        if (keys.length > 1) {
          results.errors.push(`${locale}: Duplicate description in ${keys.join(', ')}`);
        }
      });

    } catch (error) {
      results.errors.push(`Failed to check duplicates in ${locale}.json: ${error.message}`);
    }
  });
}

function checkPageImplementations() {
  const pages = [
    'page.tsx',
    'about/page.tsx',
    'features/page.tsx',
    'pricing/page.tsx',
    'contact/page.tsx',
    'blog/page.tsx',
    'waitlist/page.tsx',
    'privacy/page.tsx',
    'cookies/page.tsx',
    'cybersecurity/page.tsx'
  ];

  log('Checking page metadata implementations...', 'info');

  pages.forEach(page => {
    const pagePath = join(projectRoot, 'src/app/[locale]', page);
    
    if (!existsSync(pagePath)) {
      return; // Page may not exist
    }

    try {
      const content = readFileSync(pagePath, 'utf-8');

      // Check if page has description
      if (content.includes('generateMetadata')) {
        if (content.includes('description:') || content.includes('description =')) {
          log(`  ✓ ${page} has description`, 'success');
        } else {
          results.warnings.push(`${page} may be missing description in metadata`);
        }
      }

    } catch (error) {
      // Skip if can't read
    }
  });
}

function displayResults() {
  log('', 'info');
  log('═══════════════════════════════════════', 'info');
  log('📊 Description Validation Summary:', 'info');
  log(`   Total descriptions: ${results.totalDescriptions}`, 'info');
  log(`   Valid: ${results.validDescriptions}`, results.validDescriptions > 0 ? 'success' : 'info');
  log(`   Errors: ${results.errors.length}`, results.errors.length > 0 ? 'error' : 'success');
  log(`   Warnings: ${results.warnings.length}`, results.warnings.length > 0 ? 'warning' : 'info');
  log('', 'info');

  if (results.errors.length > 0) {
    log('❌ Errors:', 'error');
    results.errors.forEach(error => log(`   • ${error}`, 'error'));
    log('', 'info');
  }

  if (results.warnings.length > 0 && results.warnings.length <= 15) {
    log('⚠️  Warnings:', 'warning');
    results.warnings.forEach(warning => log(`   • ${warning}`, 'warning'));
    log('', 'info');
  } else if (results.warnings.length > 15) {
    log(`⚠️  ${results.warnings.length} warnings (showing first 10):`, 'warning');
    results.warnings.slice(0, 10).forEach(warning => log(`   • ${warning}`, 'warning'));
    log(`   ... and ${results.warnings.length - 10} more warnings`, 'warning');
    log('', 'info');
  }

  if (results.errors.length === 0 && results.warnings.length === 0) {
    log('✅ All meta descriptions are properly configured!', 'success');
    log('', 'info');
    log('Verified:', 'success');
    log('  ✓ All descriptions present', 'success');
    log('  ✓ Length: 120-155 characters', 'success');
    log('  ✓ No duplicates found', 'success');
    log('  ✓ Proper formatting', 'success');
  } else if (results.errors.length === 0) {
    log('✅ All critical checks passed (warnings may need attention)', 'success');
  } else {
    log('⚠️  Description validation failed. Please fix errors above.', 'error');
  }

  log('', 'info');
  log('SEO Best Practices:', 'info');
  log('  • Length: 120-155 characters', 'info');
  log('  • Include primary keyword', 'info');
  log('  • Unique per page', 'info');
  log('  • Compelling and descriptive', 'info');
  log('  • End with punctuation', 'info');

  process.exit(results.errors.length > 0 ? 1 : 0);
}

function main() {
  log('🔍 Validating Meta Descriptions...', 'info');
  log('═══════════════════════════════════════', 'info');
  log('', 'info');

  checkTranslations();
  checkForDuplicates();
  checkPageImplementations();

  displayResults();
}

main();
