#!/usr/bin/env node
/**
 * LCP (Largest Contentful Paint) verification script
 * Checks for render-blocking resources and LCP optimization
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const checks = {
  passed: [],
  warnings: [],
  failed: []
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

function checkCriticalCSS() {
  const criticalCssPath = join(projectRoot, 'src/app/critical.css');
  
  if (!existsSync(criticalCssPath)) {
    checks.failed.push('Critical CSS file not found');
    return false;
  }
  
  const content = readFileSync(criticalCssPath, 'utf-8');
  
  // Check for critical content
  const criticalChecks = [
    { pattern: /font-playfair/, name: 'Playfair font family' },
    { pattern: /font-inter/, name: 'Inter font family' },
    { pattern: /--forest/, name: 'Forest color variable' },
    { pattern: /\.text-4xl/, name: 'Hero text sizing' },
    { pattern: /\.text-forest/, name: 'Forest text color' },
    { pattern: /\.btn-primary/, name: 'Primary button styles' },
    { pattern: /font-display:\s*swap/, name: 'font-display: swap' }
  ];
  
  criticalChecks.forEach(check => {
    if (check.pattern.test(content)) {
      checks.passed.push(`Critical CSS includes ${check.name}`);
    } else {
      checks.warnings.push(`Critical CSS missing ${check.name}`);
    }
  });
  
  return true;
}

function checkFontOptimization() {
  const fontsPath = join(projectRoot, 'src/lib/fonts.ts');
  
  if (!existsSync(fontsPath)) {
    checks.failed.push('Fonts configuration not found');
    return false;
  }
  
  const content = readFileSync(fontsPath, 'utf-8');
  
  // Check for font-display: swap
  if (content.includes('display: "swap"') || content.includes("display: 'swap'")) {
    checks.passed.push('Fonts configured with font-display: swap');
  } else {
    checks.failed.push('Fonts missing font-display: swap');
  }
  
  // Check for next/font/google
  if (content.includes('next/font/google')) {
    checks.passed.push('Using next/font/google for optimal font loading');
  } else {
    checks.warnings.push('Not using next/font/google - consider migrating');
  }
  
  // Check for weight specification
  if (content.includes('weight:')) {
    checks.passed.push('Font weights explicitly specified');
  } else {
    checks.warnings.push('Font weights not specified - may load unnecessary variants');
  }
  
  return true;
}

function checkRenderBlockingScripts() {
  const layoutPath = join(projectRoot, 'src/app/[locale]/layout.tsx');
  
  if (!existsSync(layoutPath)) {
    checks.warnings.push('Layout file not found for script check');
    return false;
  }
  
  const content = readFileSync(layoutPath, 'utf-8');
  
  // Check for blocking script tags without defer/async
  // Exclude JSON-LD scripts which are non-blocking
  const scriptTags = content.match(/<script[^>]*>/gi) || [];
  const blockingScripts = scriptTags.filter(tag => {
    // JSON-LD scripts are non-blocking
    if (tag.includes('application/ld+json')) return false;
    // Scripts with defer or async are non-blocking
    if (tag.includes('defer') || tag.includes('async')) return false;
    // Module scripts are deferred by default
    if (tag.includes('type="module"')) return false;
    return true;
  });
  
  if (blockingScripts.length > 0) {
    checks.failed.push(`Found ${blockingScripts.length} render-blocking script(s)`);
    blockingScripts.forEach(match => {
      checks.failed.push(`  → ${match.substring(0, 60)}...`);
    });
  } else {
    checks.passed.push('No render-blocking scripts detected');
  }
  
  // Check for JSON-LD (non-blocking)
  if (content.includes('application/ld+json')) {
    checks.passed.push('Structured data uses non-blocking JSON-LD format');
  }
  
  return true;
}

function checkImageOptimization() {
  const layoutPath = join(projectRoot, 'src/app/layout.tsx');
  
  if (!existsSync(layoutPath)) {
    checks.warnings.push('Root layout file not found for image preload check');
    return false;
  }
  
  const content = readFileSync(layoutPath, 'utf-8');
  
  // Check for image preloads
  if (content.includes('rel="preload"') && content.includes('as="image"')) {
    checks.passed.push('Critical images are preloaded');
  } else {
    checks.warnings.push('Consider preloading above-the-fold images');
  }
  
  // Check for WebP preloads
  if (content.includes('type="image/webp"')) {
    checks.passed.push('Preloading modern image formats (WebP)');
  } else {
    checks.warnings.push('Consider preloading WebP images for better performance');
  }
  
  return true;
}

function checkNextConfig() {
  const configPath = join(projectRoot, 'next.config.ts');
  
  if (!existsSync(configPath)) {
    checks.warnings.push('next.config.ts not found');
    return false;
  }
  
  const content = readFileSync(configPath, 'utf-8');
  
  // Check for image optimization
  if (content.includes('images:')) {
    checks.passed.push('Image optimization configured');
    
    if (content.includes("'image/avif'") || content.includes('"image/avif"')) {
      checks.passed.push('AVIF format enabled for images');
    } else {
      checks.warnings.push('AVIF format not enabled - missing best compression');
    }
    
    if (content.includes("'image/webp'") || content.includes('"image/webp"')) {
      checks.passed.push('WebP format enabled for images');
    } else {
      checks.warnings.push('WebP format not enabled');
    }
  } else {
    checks.warnings.push('Image optimization not explicitly configured');
  }
  
  // Check for compression
  if (content.includes('compress: true')) {
    checks.passed.push('Response compression enabled');
  } else {
    checks.warnings.push('Response compression not explicitly enabled');
  }
  
  return true;
}

function displayResults() {
  log('🔍 LCP Optimization Check', 'info');
  log('═══════════════════════════════════════', 'info');
  log('', 'info');
  
  const total = checks.passed.length + checks.warnings.length + checks.failed.length;
  
  if (checks.passed.length > 0) {
    log(`✅ Passed (${checks.passed.length}/${total}):`, 'success');
    checks.passed.forEach(check => log(`   • ${check}`, 'success'));
    log('', 'info');
  }
  
  if (checks.warnings.length > 0) {
    log(`⚠️  Warnings (${checks.warnings.length}/${total}):`, 'warning');
    checks.warnings.forEach(check => log(`   • ${check}`, 'warning'));
    log('', 'info');
  }
  
  if (checks.failed.length > 0) {
    log(`❌ Failed (${checks.failed.length}/${total}):`, 'error');
    checks.failed.forEach(check => log(`   • ${check}`, 'error'));
    log('', 'info');
  }
  
  log('═══════════════════════════════════════', 'info');
  log('📊 Summary:', 'info');
  log(`   Total checks: ${total}`, 'info');
  log(`   Passed: ${checks.passed.length}`, checks.passed.length > 0 ? 'success' : 'info');
  log(`   Warnings: ${checks.warnings.length}`, checks.warnings.length > 0 ? 'warning' : 'info');
  log(`   Failed: ${checks.failed.length}`, checks.failed.length > 0 ? 'error' : 'success');
  log('', 'info');
  
  if (checks.failed.length === 0) {
    log('✅ All critical LCP optimizations are in place!', 'success');
    log('', 'info');
    log('Next steps:', 'info');
    log('  1. Run: npm run build', 'info');
    log('  2. Run: npm start', 'info');
    log('  3. Run Lighthouse audit', 'info');
    log('  4. Verify LCP ≤ 2.5s', 'info');
  } else {
    log('⚠️  Some optimizations are missing. Please address failed checks.', 'warning');
  }
  
  process.exit(checks.failed.length > 0 ? 1 : 0);
}

function main() {
  log('Checking LCP optimizations...', 'info');
  log('', 'info');
  
  checkCriticalCSS();
  checkFontOptimization();
  checkRenderBlockingScripts();
  checkImageOptimization();
  checkNextConfig();
  
  displayResults();
}

main();
