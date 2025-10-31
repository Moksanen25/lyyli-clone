#!/usr/bin/env node

import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Security header requirements
const REQUIRED_HEADERS = {
  'Content-Security-Policy': {
    required: true,
    description: 'Content Security Policy to prevent XSS attacks',
    validate: value => {
      if (!value) return { valid: false, reason: 'Missing CSP header' };

      // Check for unsafe directives in production
      if (
        value.includes("'unsafe-eval'") ||
        value.includes("'unsafe-inline'")
      ) {
        return { valid: false, reason: 'Contains unsafe CSP directives' };
      }

      // Should include script-src with hashes or nonces
      if (!value.includes('script-src')) {
        return { valid: false, reason: 'Missing script-src directive' };
      }

      // Should include object-src 'none'
      if (!value.includes("object-src 'none'")) {
        return { valid: false, reason: "Missing object-src 'none' directive" };
      }

      // Should include frame-ancestors 'none'
      if (!value.includes("frame-ancestors 'none'")) {
        return {
          valid: false,
          reason: "Missing frame-ancestors 'none' directive",
        };
      }

      return { valid: true };
    },
  },
  'Strict-Transport-Security': {
    required: true,
    description: 'HTTP Strict Transport Security',
    validate: value => {
      if (!value) return { valid: false, reason: 'Missing HSTS header' };

      // Should include max-age
      if (!value.includes('max-age=')) {
        return { valid: false, reason: 'Missing max-age in HSTS' };
      }

      // Should include includeSubDomains
      if (!value.includes('includeSubDomains')) {
        return { valid: false, reason: 'Missing includeSubDomains in HSTS' };
      }

      // Should include preload
      if (!value.includes('preload')) {
        return { valid: false, reason: 'Missing preload in HSTS' };
      }

      return { valid: true };
    },
  },
  'X-Content-Type-Options': {
    required: true,
    description: 'Prevents MIME type sniffing',
    validate: value => {
      if (!value)
        return {
          valid: false,
          reason: 'Missing X-Content-Type-Options header',
        };
      if (value !== 'nosniff')
        return {
          valid: false,
          reason: 'X-Content-Type-Options should be nosniff',
        };
      return { valid: true };
    },
  },
  'Referrer-Policy': {
    required: true,
    description: 'Controls referrer information',
    validate: value => {
      if (!value)
        return { valid: false, reason: 'Missing Referrer-Policy header' };

      const validPolicies = [
        'strict-origin-when-cross-origin',
        'strict-origin',
        'no-referrer',
        'same-origin',
      ];

      if (!validPolicies.includes(value)) {
        return { valid: false, reason: `Invalid Referrer-Policy: ${value}` };
      }

      return { valid: true };
    },
  },
  'Permissions-Policy': {
    required: true,
    description: 'Controls browser features and APIs',
    validate: value => {
      if (!value)
        return { valid: false, reason: 'Missing Permissions-Policy header' };

      // Check that dangerous permissions are blocked
      const dangerousPermissions = [
        'camera',
        'microphone',
        'geolocation',
        'payment',
      ];

      for (const permission of dangerousPermissions) {
        if (!value.includes(`${permission}=()`)) {
          return {
            valid: false,
            reason: `Dangerous permission not blocked: ${permission}`,
          };
        }
      }

      return { valid: true };
    },
  },
  'X-Frame-Options': {
    required: true,
    description: 'Prevents clickjacking attacks',
    validate: value => {
      if (!value)
        return { valid: false, reason: 'Missing X-Frame-Options header' };
      if (value !== 'DENY')
        return { valid: false, reason: 'X-Frame-Options should be DENY' };
      return { valid: true };
    },
  },
  'X-XSS-Protection': {
    required: true,
    description: 'Enables XSS filtering',
    validate: value => {
      if (!value)
        return { valid: false, reason: 'Missing X-XSS-Protection header' };
      if (value !== '1; mode=block')
        return {
          valid: false,
          reason: 'X-XSS-Protection should be 1; mode=block',
        };
      return { valid: true };
    },
  },
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

async function validateSecurityHeaders(url) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the page
    await page.goto(`http://localhost:3000${url}`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // Get response headers
    const response = await page.goto(`http://localhost:3000${url}`, {
      waitUntil: 'networkidle',
    });
    const headers = response.headers();

    const results = {
      url,
      headers: {},
      errors: [],
      warnings: [],
    };

    // Validate each required header
    for (const [headerName, config] of Object.entries(REQUIRED_HEADERS)) {
      const headerValue = headers[headerName.toLowerCase()];
      results.headers[headerName] = headerValue;

      if (config.required && !headerValue) {
        results.errors.push(
          `Missing required header: ${headerName} - ${config.description}`
        );
      } else if (headerValue && config.validate) {
        const validation = config.validate(headerValue);
        if (!validation.valid) {
          results.errors.push(`${headerName}: ${validation.reason}`);
        }
      }
    }

    // Additional validations

    // Check for server information leaks
    if (headers['server']) {
      results.warnings.push('Server header exposes server information');
    }
    if (headers['x-powered-by']) {
      results.warnings.push(
        'X-Powered-By header exposes framework information'
      );
    }

    // Check CSP report-uri
    const csp = headers['content-security-policy'];
    if (csp && !csp.includes('report-uri')) {
      results.warnings.push('CSP missing report-uri for violation reporting');
    }

    await browser.close();
    return results;
  } catch (error) {
    await browser.close();
    throw error;
  }
}

async function runSecurityValidation() {
  console.log('🔒 Running Security Headers Validation...\n');

  const results = [];
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const url of TEST_URLS) {
    console.log(`🔍 Testing ${url}...`);

    try {
      const result = await validateSecurityHeaders(url);
      results.push(result);

      if (result.errors.length > 0) {
        console.log(`   ❌ ${result.errors.length} errors found:`);
        result.errors.forEach(error => {
          console.log(`      • ${error}`);
        });
        totalErrors += result.errors.length;
      } else {
        console.log(`   ✅ All required headers present`);
      }

      if (result.warnings.length > 0) {
        console.log(`   ⚠️  ${result.warnings.length} warnings:`);
        result.warnings.forEach(warning => {
          console.log(`      • ${warning}`);
        });
        totalWarnings += result.warnings.length;
      }

      console.log('');
    } catch (error) {
      console.error(`   ❌ Error testing ${url}:`, error.message);
      totalErrors++;
    }
  }

  // Summary
  console.log('📊 Security Headers Summary:');
  console.log('=' * 50);

  for (const [headerName, config] of Object.entries(REQUIRED_HEADERS)) {
    const present = results.every(r => r.headers[headerName]);
    const status = present ? '✅' : '❌';
    console.log(`${status} ${headerName}: ${config.description}`);
  }

  console.log(`\nTotal errors: ${totalErrors}`);
  console.log(`Total warnings: ${totalWarnings}`);

  if (totalErrors > 0) {
    console.log('\n❌ Security validation FAILED');
    console.log('Critical security headers are missing or misconfigured.');
    console.log('\nRecommendations:');
    console.log('- Ensure all required security headers are present');
    console.log('- Remove unsafe CSP directives in production');
    console.log('- Block dangerous browser permissions');
    console.log('- Remove server information headers');
    process.exit(1);
  } else if (totalWarnings > 0) {
    console.log('\n⚠️  Security validation PASSED with warnings');
    console.log('Consider addressing the warnings for better security.');
  } else {
    console.log('\n✅ Security validation PASSED');
    console.log('All security headers are properly configured!');
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runSecurityValidation().catch(console.error);
}

export { runSecurityValidation, REQUIRED_HEADERS };
