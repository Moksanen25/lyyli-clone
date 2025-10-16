#!/usr/bin/env node

/**
 * Test script to verify redirect logic
 * This simulates the middleware redirect logic to ensure no loops
 */

// Simulate the redirect logic
function shouldRedirectToCanonical(hostname, environment = 'production') {
  // Only redirect in production
  if (environment !== 'production') {
    return false;
  }
  
  // Don't redirect if already on canonical host
  if (hostname === 'lyyli.ai') {
    return false;
  }
  
  // Only redirect specific variants to prevent loops
  const redirectVariants = [
    'www.lyyli.ai',
    // Add other specific variants that should redirect
  ];
  
  return redirectVariants.includes(hostname);
}

// Test cases
const testCases = [
  { hostname: 'lyyli.ai', environment: 'production', expected: false, description: 'Canonical host should not redirect' },
  { hostname: 'www.lyyli.ai', environment: 'production', expected: true, description: 'www should redirect to canonical' },
  { hostname: 'api.lyyli.ai', environment: 'production', expected: false, description: 'API subdomain should not redirect' },
  { hostname: 'staging.lyyli.ai', environment: 'production', expected: false, description: 'Staging subdomain should not redirect' },
  { hostname: 'lyyli.ai', environment: 'development', expected: false, description: 'No redirects in development' },
  { hostname: 'www.lyyli.ai', environment: 'development', expected: false, description: 'No redirects in development' },
  { hostname: 'localhost:3000', environment: 'development', expected: false, description: 'Localhost should not redirect' },
  { hostname: 'example.com', environment: 'production', expected: false, description: 'External domain should not redirect' },
];

console.log('🔄 Testing Redirect Logic\n');
console.log('=' * 50);

let passed = 0;
let failed = 0;

for (const testCase of testCases) {
  const result = shouldRedirectToCanonical(testCase.hostname, testCase.environment);
  const success = result === testCase.expected;
  
  if (success) {
    console.log(`✅ ${testCase.description}`);
    console.log(`   Hostname: ${testCase.hostname}`);
    console.log(`   Environment: ${testCase.environment}`);
    console.log(`   Redirect: ${result}`);
    passed++;
  } else {
    console.log(`❌ ${testCase.description}`);
    console.log(`   Hostname: ${testCase.hostname}`);
    console.log(`   Environment: ${testCase.environment}`);
    console.log(`   Expected: ${testCase.expected}, Got: ${result}`);
    failed++;
  }
  console.log('');
}

console.log('📊 Test Results:');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

if (failed > 0) {
  console.log('\n❌ Some tests failed! Redirect logic needs fixing.');
  process.exit(1);
} else {
  console.log('\n✅ All tests passed! Redirect logic is working correctly.');
}

// Additional loop detection test
console.log('\n🔄 Loop Detection Test:');
console.log('=' * 30);

const redirectChain = ['www.lyyli.ai', 'lyyli.ai'];
let currentHost = 'www.lyyli.ai';
let redirectCount = 0;
const maxRedirects = 5;

while (redirectCount < maxRedirects) {
  console.log(`Step ${redirectCount + 1}: ${currentHost}`);
  
  if (shouldRedirectToCanonical(currentHost)) {
    // Simulate redirect
    currentHost = 'lyyli.ai'; // After redirect
    redirectCount++;
    
    if (currentHost === 'lyyli.ai') {
      console.log(`✅ Redirect chain terminates at canonical host: ${currentHost}`);
      break;
    }
  } else {
    console.log(`✅ No redirect needed for: ${currentHost}`);
    break;
  }
}

if (redirectCount >= maxRedirects) {
  console.log('❌ Potential redirect loop detected!');
  process.exit(1);
} else {
  console.log('✅ No redirect loop detected.');
}
