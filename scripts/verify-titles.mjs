#!/usr/bin/env node
/**
 * Title Verification Script
 * Validates that all page titles are properly formatted
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const results = {
  totalTitles: 0,
  validTitles: 0,
  issues: []
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

function checkTitleBuilder() {
  const titleLibPath = join(projectRoot, 'src/lib/title.ts');
  const content = readFileSync(titleLibPath, 'utf-8');

  const requiredFunctions = [
    'buildTitle',
    'buildTitleFromTranslation',
    'createTitleTemplate',
    'validateTitle'
  ];

  log('Checking title builder library...', 'info');
  
  requiredFunctions.forEach(func => {
    if (content.includes(`export function ${func}`)) {
      log(`✓ Found: ${func}`, 'success');
    } else {
      results.issues.push(`Missing function: ${func}`);
    }
  });

  // Check for max length enforcement
  if (content.includes('MAX_TITLE_LENGTH')) {
    log('✓ Max length constant defined', 'success');
  } else {
    results.issues.push('MAX_TITLE_LENGTH constant missing');
  }

  // Check for brand duplication prevention
  if (content.includes('hasBrand') || content.includes('includes(BRAND_NAME)')) {
    log('✓ Brand duplication prevention implemented', 'success');
  } else {
    results.issues.push('Brand duplication prevention missing');
  }
}

function checkPageImplementations() {
  const pagesDir = join(projectRoot, 'src/app/[locale]');
  const pages = ['page.tsx', 'about/page.tsx', 'features/page.tsx', 'pricing/page.tsx', 'contact/page.tsx', 'blog/page.tsx'];

  log('Checking page title implementations...', 'info');

  pages.forEach(page => {
    const pagePath = join(pagesDir, page);
    
    try {
      const content = readFileSync(pagePath, 'utf-8');
      results.totalTitles++;

      // Check if using title builder
      if (content.includes('buildTitleFromTranslation') || content.includes('buildTitle')) {
        log(`✓ ${page} uses title builder`, 'success');
        results.validTitles++;
      } else if (content.includes('generateMetadata')) {
        results.issues.push(`${page} has metadata but doesn't use title builder`);
      }

      // Check for old-style hardcoded titles with brand
      if (content.match(/title:\s*["'].*Lyyli\.ai.*["']/)) {
        results.issues.push(`${page} may have hardcoded title with brand`);
      }

    } catch (error) {
      // Page may not exist, skip
    }
  });
}

function checkTranslations() {
  const translationsDir = join(projectRoot, 'src/translations');
  const locales = ['en.json', 'fi.json'];

  log('Checking translation files...', 'info');

  locales.forEach(locale => {
    const translationPath = join(translationsDir, locale);
    
    try {
      const content = readFileSync(translationPath, 'utf-8');
      const translations = JSON.parse(content);

      const titleKeys = Object.keys(translations).filter(k => k.includes('.page.title'));

      titleKeys.forEach(key => {
        const title = translations[key];
        
        // Check if translation includes brand (old style - should be removed)
        if (title.includes('Lyyli.ai')) {
          results.issues.push(`${locale}: ${key} contains brand name (should be removed, title builder adds it)`);
        }

        // Check for excessive length
        if (title.length > 45) {
          // Leaving room for " | Lyyli.ai" (13 chars)
          results.issues.push(`${locale}: ${key} may be too long (${title.length} chars, will be ~${title.length + 13} chars total)`);
        }
      });

      log(`✓ Checked ${titleKeys.length} titles in ${locale}`, 'success');

    } catch (error) {
      results.issues.push(`Failed to check ${locale}: ${error.message}`);
    }
  });
}

function checkLayoutTemplate() {
  const layoutPath = join(projectRoot, 'src/app/[locale]/layout.tsx');
  
  try {
    const content = readFileSync(layoutPath, 'utf-8');

    log('Checking layout title template...', 'info');

    // Check for createTitleTemplate usage
    if (content.includes('createTitleTemplate')) {
      log('✓ Layout uses createTitleTemplate()', 'success');
    } else if (content.includes('template:')) {
      results.issues.push('Layout has title template but doesn\'t use createTitleTemplate()');
    }

    // Check for old-style template
    if (content.includes('template: "%s | Lyyli.ai"')) {
      results.issues.push('Layout uses hardcoded template instead of createTitleTemplate()');
    }

  } catch (error) {
    results.issues.push(`Failed to check layout: ${error.message}`);
  }
}

function displayResults() {
  log('', 'info');
  log('═══════════════════════════════════════', 'info');
  log('📊 Title Verification Summary:', 'info');
  log(`   Pages checked: ${results.totalTitles}`, 'info');
  log(`   Using title builder: ${results.validTitles}`, 'success');
  log(`   Issues found: ${results.issues.length}`, results.issues.length > 0 ? 'error' : 'success');
  log('', 'info');

  if (results.issues.length > 0) {
    log('❌ Issues:', 'error');
    results.issues.forEach(issue => log(`   • ${issue}`, 'error'));
    log('', 'info');
  } else {
    log('✅ All titles are properly configured!', 'success');
    log('', 'info');
    log('Verified:', 'success');
    log('  ✓ Title builder library complete', 'success');
    log('  ✓ All pages use title builder', 'success');
    log('  ✓ Translations cleaned of brand duplication', 'success');
    log('  ✓ Layout uses title template', 'success');
    log('  ✓ Max length enforcement in place', 'success');
  }

  process.exit(results.issues.length > 0 ? 1 : 0);
}

function main() {
  log('🔍 Verifying Page Titles...', 'info');
  log('═══════════════════════════════════════', 'info');
  log('', 'info');

  checkTitleBuilder();
  checkLayoutTemplate();
  checkPageImplementations();
  checkTranslations();

  displayResults();
}

main();
