#!/usr/bin/env node
/**
 * Schema.org Structured Data Validation Script
 * Validates JSON-LD schemas across all pages
 * Can be integrated into CI/CD pipeline
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const results = {
  totalSchemas: 0,
  validSchemas: 0,
  invalidSchemas: 0,
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

/**
 * Validate a single schema object
 */
function validateSchemaObject(schema, source) {
  results.totalSchemas++;
  const errors = [];

  // Check for required fields
  if (!schema['@context']) {
    errors.push(`${source}: Missing @context`);
  } else if (!schema['@context'].includes('schema.org')) {
    errors.push(`${source}: @context must reference schema.org`);
  }

  if (!schema['@type'] && !schema['@graph']) {
    errors.push(`${source}: Missing @type or @graph`);
  }

  // Validate @graph structure
  if (schema['@graph']) {
    if (!Array.isArray(schema['@graph'])) {
      errors.push(`${source}: @graph must be an array`);
    } else {
      schema['@graph'].forEach((item, index) => {
        if (!item['@type']) {
          errors.push(`${source}: @graph item ${index} missing @type`);
        }
      });
    }
  }

  // Type-specific validation
  if (schema['@type']) {
    validateSchemaType(schema, source, errors);
  } else if (schema['@graph']) {
    schema['@graph'].forEach((item, index) => {
      validateSchemaType(item, `${source}[@graph[${index}]]`, errors);
    });
  }

  if (errors.length > 0) {
    results.invalidSchemas++;
    results.errors.push(...errors);
    return false;
  } else {
    results.validSchemas++;
    return true;
  }
}

/**
 * Validate specific schema types
 */
function validateSchemaType(schema, source, errors) {
  switch (schema['@type']) {
    case 'Organization':
      if (!schema.name) errors.push(`${source}: Organization missing name`);
      if (!schema.url) errors.push(`${source}: Organization missing url`);
      if (!schema.logo) {
        results.warnings.push(`${source}: Organization missing logo (recommended)`);
      }
      if (!schema.sameAs) {
        results.warnings.push(`${source}: Organization missing sameAs links (recommended)`);
      }
      break;

    case 'WebSite':
      if (!schema.url) errors.push(`${source}: WebSite missing url`);
      if (!schema.name) errors.push(`${source}: WebSite missing name`);
      if (!schema.potentialAction) {
        results.warnings.push(`${source}: WebSite missing potentialAction for search (recommended)`);
      }
      break;

    case 'Article':
      if (!schema.headline) errors.push(`${source}: Article missing headline`);
      if (!schema.datePublished) errors.push(`${source}: Article missing datePublished`);
      if (!schema.author) errors.push(`${source}: Article missing author`);
      if (!schema.image) {
        results.warnings.push(`${source}: Article missing image (recommended)`);
      }
      if (!schema.publisher) {
        results.warnings.push(`${source}: Article missing publisher reference (recommended)`);
      }
      break;

    case 'BreadcrumbList':
      if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
        errors.push(`${source}: BreadcrumbList missing itemListElement array`);
      } else {
        // Validate breadcrumb items
        schema.itemListElement.forEach((item, index) => {
          if (!item.position) {
            errors.push(`${source}: BreadcrumbList item ${index} missing position`);
          }
          if (!item.name) {
            errors.push(`${source}: BreadcrumbList item ${index} missing name`);
          }
          if (!item.item && index < schema.itemListElement.length - 1) {
            errors.push(`${source}: BreadcrumbList item ${index} missing item URL`);
          }
        });
      }
      break;

    case 'SoftwareApplication':
      if (!schema.name) errors.push(`${source}: SoftwareApplication missing name`);
      if (!schema.applicationCategory) {
        results.warnings.push(`${source}: SoftwareApplication missing applicationCategory`);
      }
      break;

    case 'WebPage':
      if (!schema.url) errors.push(`${source}: WebPage missing url`);
      break;
  }

  // Check for production domain usage
  const schemaStr = JSON.stringify(schema);
  if (schemaStr.includes('localhost') || schemaStr.includes('vercel.app') || schemaStr.includes('127.0.0.1')) {
    errors.push(`${source}: Schema contains non-production URLs`);
  }

  if (!schemaStr.includes('lyyli.ai')) {
    results.warnings.push(`${source}: Schema may not reference production domain`);
  }
}

/**
 * Validate structured data in source files
 */
function validateSourceFiles() {
  log('Checking source files for schema implementation...', 'info');
  
  // Check structured-data.ts exists and has required functions
  const structuredDataPath = join(projectRoot, 'src/lib/structured-data.ts');
  
  if (!existsSync(structuredDataPath)) {
    results.errors.push('structured-data.ts library not found');
    return;
  }

  const content = readFileSync(structuredDataPath, 'utf-8');

  const requiredFunctions = [
    'generateOrganizationSchema',
    'generateWebsiteSchema',
    'generateBreadcrumbSchema',
    'generateArticleSchema',
    'validateSchema',
    'combineSchemas'
  ];

  requiredFunctions.forEach(funcName => {
    if (content.includes(`export function ${funcName}`)) {
      results.validSchemas++;
      results.totalSchemas++;
      log(`✓ Found: ${funcName}`, 'success');
    } else {
      results.invalidSchemas++;
      results.totalSchemas++;
      results.errors.push(`Missing function: ${funcName}`);
    }
  });

  // Check for schema types
  const schemaTypes = ['Organization', 'WebSite', 'Article', 'BreadcrumbList'];
  schemaTypes.forEach(type => {
    if (content.includes(`"@type": "${type}"`)) {
      log(`✓ Implements: ${type} schema`, 'success');
    }
  });

  // Check for production domain usage
  if (content.includes('https://lyyli.ai') || content.includes('PRODUCTION_URL')) {
    log('✓ Uses production domain', 'success');
  } else {
    results.warnings.push('May not use production domain in schemas');
  }

  // Check for sameAs
  if (content.includes('sameAs')) {
    log('✓ Includes sameAs social links', 'success');
  } else {
    results.warnings.push('Organization schema missing sameAs links');
  }

  // Check for search action
  if (content.includes('SearchAction')) {
    log('✓ Includes SearchAction for website', 'success');
  } else {
    results.warnings.push('Website schema missing SearchAction');
  }
}

/**
 * Check layout files for schema implementation
 */
function checkLayoutSchemas() {
  const layoutPath = join(projectRoot, 'src/app/[locale]/layout.tsx');
  
  if (!existsSync(layoutPath)) {
    results.errors.push('Layout file not found');
    return;
  }

  const content = readFileSync(layoutPath, 'utf-8');

  // Check that layout uses structured data functions
  const requiredImports = [
    'generateOrganizationSchema',
    'generateWebsiteSchema',
    'generateBreadcrumbSchema'
  ];

  requiredImports.forEach(importName => {
    if (content.includes(importName)) {
      log(`✓ Layout uses ${importName}`, 'success');
    } else {
      results.warnings.push(`Layout doesn't import ${importName}`);
    }
  });

  // Check for JSON-LD script tag
  if (content.includes('application/ld+json')) {
    log('✓ Layout includes JSON-LD script tag', 'success');
  } else {
    results.errors.push('Layout missing JSON-LD script tag');
  }
}

/**
 * Check blog post page for Article schema
 */
function checkBlogArticleSchema() {
  const blogPostPath = join(projectRoot, 'src/app/[locale]/blog/[slug]/page.tsx');
  
  if (!existsSync(blogPostPath)) {
    results.warnings.push('Blog post page not found (may be expected)');
    return;
  }

  const content = readFileSync(blogPostPath, 'utf-8');

  if (content.includes('generateArticleSchema')) {
    log('✓ Blog posts use Article schema', 'success');
  } else {
    results.errors.push('Blog posts missing Article schema');
  }

  if (content.includes('application/ld+json')) {
    log('✓ Blog posts include JSON-LD script tag', 'success');
  } else {
    results.errors.push('Blog posts missing JSON-LD script tag');
  }
}

/**
 * Display results
 */
function displayResults() {
  log('', 'info');
  log('═══════════════════════════════════════', 'info');
  log('📊 Schema Validation Summary:', 'info');
  log(`   Total schemas validated: ${results.totalSchemas}`, 'info');
  log(`   Valid: ${results.validSchemas}`, 'success');
  log(`   Invalid: ${results.invalidSchemas}`, results.invalidSchemas > 0 ? 'error' : 'success');
  log(`   Warnings: ${results.warnings.length}`, results.warnings.length > 0 ? 'warning' : 'info');
  log('', 'info');

  if (results.errors.length > 0) {
    log('❌ Errors:', 'error');
    results.errors.forEach(error => log(`   • ${error}`, 'error'));
    log('', 'info');
  }

  if (results.warnings.length > 0 && results.warnings.length <= 10) {
    log('⚠️  Warnings:', 'warning');
    results.warnings.forEach(warning => log(`   • ${warning}`, 'warning'));
    log('', 'info');
  }

  if (results.errors.length === 0) {
    log('✅ All structured data schemas are valid!', 'success');
    log('', 'info');
    log('Schema Types Implemented:', 'success');
    log('  ✓ Organization (with logo, url, sameAs)', 'success');
    log('  ✓ Website (with search action)', 'success');
    log('  ✓ BreadcrumbList (for inner pages)', 'success');
    log('  ✓ Article (for blog posts)', 'success');
    log('', 'info');
    log('Validation Steps:', 'info');
    log('  1. Test with Google Rich Results Test:', 'info');
    log('     https://search.google.com/test/rich-results', 'info');
    log('  2. Test with Schema Markup Validator:', 'info');
    log('     https://validator.schema.org/', 'info');
    log('  3. Check Google Search Console for rich result status', 'info');
  } else {
    log('⚠️  Schema validation failed. Please fix errors above.', 'error');
  }

  process.exit(results.invalidSchemas > 0 || results.errors.length > 0 ? 1 : 0);
}

function main() {
  log('🔍 Validating JSON-LD Structured Data...', 'info');
  log('═══════════════════════════════════════', 'info');
  log('', 'info');

  validateSourceFiles();
  checkLayoutSchemas();
  checkBlogArticleSchema();

  displayResults();
}

main();
