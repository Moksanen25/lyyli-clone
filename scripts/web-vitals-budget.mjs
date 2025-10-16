#!/usr/bin/env node

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Web Vitals budgets
const BUDGETS = {
  CLS: 0.1,        // Cumulative Layout Shift
  FID: 100,        // First Input Delay (ms)
  FCP: 1800,       // First Contentful Paint (ms)
  LCP: 2500,       // Largest Contentful Paint (ms)
  TTFB: 600,       // Time to First Byte (ms)
};

// Test URLs
const TEST_URLS = [
  '/',
  '/en',
  '/fi',
  '/en/features',
  '/fi/features',
  '/en/pricing',
  '/fi/pricing',
  '/en/about',
  '/fi/about',
];

async function measureWebVitals(url) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Enable performance monitoring
  await page.coverage.startJSCoverage();
  await page.coverage.startCSSCoverage();
  
  // Navigate to the page
  const startTime = Date.now();
  await page.goto(`http://localhost:3000${url}`, { 
    waitUntil: 'networkidle',
    timeout: 30000 
  });
  const loadTime = Date.now() - startTime;
  
  // Wait for fonts to load
  await page.evaluate(() => {
    return Promise.all([
      document.fonts.load('400 16px Inter'),
      document.fonts.load('700 16px Playfair Display'),
    ]);
  });
  
  // Measure Web Vitals
  const vitals = await page.evaluate(() => {
    return new Promise((resolve) => {
      const vitals = {};
      let measurementsComplete = 0;
      
      function checkComplete() {
        measurementsComplete++;
        if (measurementsComplete >= 5) {
          resolve(vitals);
        }
      }
      
      // CLS
      new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        vitals.CLS = clsValue;
        checkComplete();
      }).observe({ type: 'layout-shift', buffered: true });
      
      // FCP
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            vitals.FCP = entry.startTime;
            checkComplete();
            break;
          }
        }
      }).observe({ type: 'paint', buffered: true });
      
      // LCP
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        vitals.LCP = lastEntry.startTime;
        checkComplete();
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      
      // FID
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          vitals.FID = entry.processingStart - entry.startTime;
          checkComplete();
          break;
        }
      }).observe({ type: 'first-input', buffered: true });
      
      // TTFB
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      vitals.TTFB = navigationEntry.responseStart - navigationEntry.requestStart;
      checkComplete();
    });
  });
  
  // Get coverage data
  const jsCoverage = await page.coverage.stopJSCoverage();
  const cssCoverage = await page.coverage.stopCSSCoverage();
  
  await browser.close();
  
  return {
    url,
    loadTime,
    vitals,
    jsCoverage: jsCoverage.length,
    cssCoverage: cssCoverage.length,
  };
}

function checkBudget(metric, value, budget) {
  const status = value <= budget ? '✅ PASS' : '❌ FAIL';
  const ratio = (value / budget * 100).toFixed(1);
  return { status, ratio };
}

async function runWebVitalsBudget() {
  console.log('🚀 Running Web Vitals Budget Check...\n');
  
  const results = [];
  let totalFailures = 0;
  
  for (const url of TEST_URLS) {
    console.log(`📊 Testing ${url}...`);
    
    try {
      const result = await measureWebVitals(url);
      results.push(result);
      
      console.log(`   Load time: ${result.loadTime}ms`);
      console.log(`   JS chunks: ${result.jsCoverage}`);
      console.log(`   CSS chunks: ${result.cssCoverage}`);
      
      // Check each Web Vital against budget
      const checks = {};
      for (const [metric, budget] of Object.entries(BUDGETS)) {
        const value = result.vitals[metric];
        if (value !== undefined) {
          const check = checkBudget(metric, value, budget);
          checks[metric] = { value, budget, ...check };
          
          console.log(`   ${metric}: ${value.toFixed(2)}${metric === 'CLS' ? '' : 'ms'} (${check.status}) ${check.ratio}% of budget`);
          
          if (check.status.includes('FAIL')) {
            totalFailures++;
          }
        }
      }
      
      result.checks = checks;
      console.log('');
      
    } catch (error) {
      console.error(`   ❌ Error testing ${url}:`, error.message);
      totalFailures++;
    }
  }
  
  // Summary
  console.log('📈 Summary:');
  console.log('=' * 50);
  
  const avgVitals = {};
  for (const metric of Object.keys(BUDGETS)) {
    const values = results
      .map(r => r.vitals[metric])
      .filter(v => v !== undefined);
    
    if (values.length > 0) {
      avgVitals[metric] = values.reduce((a, b) => a + b, 0) / values.length;
    }
  }
  
  for (const [metric, budget] of Object.entries(BUDGETS)) {
    const avgValue = avgVitals[metric];
    if (avgValue !== undefined) {
      const check = checkBudget(metric, avgValue, budget);
      console.log(`Average ${metric}: ${avgValue.toFixed(2)}${metric === 'CLS' ? '' : 'ms'} (${check.status}) ${check.ratio}% of budget`);
    }
  }
  
  console.log(`\nTotal budget failures: ${totalFailures}`);
  
  if (totalFailures > 0) {
    console.log('\n❌ Web Vitals budget check FAILED');
    console.log('Consider optimizing:');
    console.log('- Images (add dimensions, use WebP/AVIF)');
    console.log('- Fonts (preload, use font-display: swap)');
    console.log('- JavaScript (code splitting, tree shaking)');
    console.log('- CSS (remove unused styles, critical CSS)');
    process.exit(1);
  } else {
    console.log('\n✅ Web Vitals budget check PASSED');
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runWebVitalsBudget().catch(console.error);
}

export { runWebVitalsBudget, BUDGETS };
