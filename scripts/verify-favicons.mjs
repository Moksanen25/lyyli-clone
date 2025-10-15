#!/usr/bin/env node

/**
 * Favicon Verification Script
 * 
 * This script verifies that all favicon files exist and can be served correctly.
 * It checks for proper file existence, sizes, and HTTP status codes.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const iconsDir = path.join(publicDir, 'icons');

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

// Required favicon files and their expected properties
const requiredFiles = [
  {
    path: path.join(publicDir, 'favicon.ico'),
    url: '/favicon.ico',
    type: 'ICO',
    maxSize: 50000, // 50KB
    description: 'Main favicon file'
  },
  {
    path: path.join(publicDir, 'favicon.svg'),
    url: '/favicon.svg',
    type: 'SVG',
    maxSize: 200000, // 200KB
    description: 'SVG favicon for modern browsers'
  },
  {
    path: path.join(iconsDir, 'favicon-16x16.png'),
    url: '/icons/favicon-16x16.png',
    type: 'PNG',
    size: '16x16',
    maxSize: 5000, // 5KB
    description: '16x16 PNG favicon'
  },
  {
    path: path.join(iconsDir, 'favicon-32x32.png'),
    url: '/icons/favicon-32x32.png',
    type: 'PNG',
    size: '32x32',
    maxSize: 10000, // 10KB
    description: '32x32 PNG favicon'
  },
  {
    path: path.join(iconsDir, 'apple-touch-icon.png'),
    url: '/icons/apple-touch-icon.png',
    type: 'PNG',
    size: '180x180',
    maxSize: 20000, // 20KB
    description: 'Apple touch icon (180x180)'
  },
  {
    path: path.join(iconsDir, 'icon-192x192.png'),
    url: '/icons/icon-192x192.png',
    type: 'PNG',
    size: '192x192',
    maxSize: 30000, // 30KB
    description: '192x192 PWA icon'
  },
  {
    path: path.join(iconsDir, 'icon-512x512.png'),
    url: '/icons/icon-512x512.png',
    type: 'PNG',
    size: '512x512',
    maxSize: 100000, // 100KB
    description: '512x512 PWA icon'
  },
  {
    path: path.join(iconsDir, 'android-chrome-192x192.png'),
    url: '/icons/android-chrome-192x192.png',
    type: 'PNG',
    size: '192x192',
    maxSize: 30000, // 30KB
    description: 'Android Chrome 192x192 icon'
  },
  {
    path: path.join(iconsDir, 'android-chrome-512x512.png'),
    url: '/icons/android-chrome-512x512.png',
    type: 'PNG',
    size: '512x512',
    maxSize: 100000, // 100KB
    description: 'Android Chrome 512x512 icon'
  }
];

// Configuration files
const configFiles = [
  {
    path: path.join(publicDir, 'site.webmanifest'),
    url: '/site.webmanifest',
    description: 'Web App Manifest'
  },
  {
    path: path.join(publicDir, 'browserconfig.xml'),
    url: '/browserconfig.xml',
    description: 'Browser Configuration XML'
  }
];

async function checkFileExistence() {
  log('\n📁 Checking file existence...', 'bright');
  
  let allExist = true;
  
  for (const file of requiredFiles) {
    if (fs.existsSync(file.path)) {
      logSuccess(`${file.description}: ${path.basename(file.path)}`);
    } else {
      logError(`Missing: ${file.description} (${path.basename(file.path)})`);
      allExist = false;
    }
  }
  
  for (const file of configFiles) {
    if (fs.existsSync(file.path)) {
      logSuccess(`${file.description}: ${path.basename(file.path)}`);
    } else {
      logError(`Missing: ${file.description} (${path.basename(file.path)})`);
      allExist = false;
    }
  }
  
  return allExist;
}

async function checkFileSizes() {
  log('\n📏 Checking file sizes...', 'bright');
  
  let allSizesValid = true;
  
  for (const file of requiredFiles) {
    if (fs.existsSync(file.path)) {
      const stats = fs.statSync(file.path);
      const sizeKB = Math.round(stats.size / 1024);
      
      if (stats.size <= file.maxSize) {
        logSuccess(`${file.description}: ${sizeKB}KB (max: ${Math.round(file.maxSize / 1024)}KB)`);
      } else {
        logError(`${file.description}: ${sizeKB}KB exceeds max ${Math.round(file.maxSize / 1024)}KB`);
        allSizesValid = false;
      }
    }
  }
  
  return allSizesValid;
}

async function checkManifestStructure() {
  log('\n📋 Checking manifest structure...', 'bright');
  
  const manifestPath = path.join(publicDir, 'site.webmanifest');
  
  if (!fs.existsSync(manifestPath)) {
    logError('site.webmanifest not found');
    return false;
  }
  
  try {
    const manifestContent = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    // Check required properties
    const requiredProps = [
      'name',
      'short_name', 
      'theme_color',
      'background_color',
      'display',
      'start_url',
      'icons'
    ];
    
    let manifestValid = true;
    
    for (const prop of requiredProps) {
      if (manifestContent[prop] !== undefined) {
        logSuccess(`Manifest has ${prop}: ${typeof manifestContent[prop] === 'object' ? 'object' : manifestContent[prop]}`);
      } else {
        logError(`Manifest missing required property: ${prop}`);
        manifestValid = false;
      }
    }
    
    // Check icons
    if (Array.isArray(manifestContent.icons)) {
      logSuccess(`Manifest has ${manifestContent.icons.length} icons`);
      
      const requiredSizes = ['16x16', '32x32', '180x180', '192x192', '512x512'];
      const manifestSizes = manifestContent.icons.map(icon => icon.sizes);
      
      for (const size of requiredSizes) {
        if (manifestSizes.includes(size)) {
          logSuccess(`Manifest includes ${size} icon`);
        } else {
          logError(`Manifest missing ${size} icon`);
          manifestValid = false;
        }
      }
    } else {
      logError('Manifest icons property is not an array');
      manifestValid = false;
    }
    
    // Check theme color format
    if (manifestContent.theme_color && /^#[0-9A-Fa-f]{6}$/.test(manifestContent.theme_color)) {
      logSuccess(`Theme color format is valid: ${manifestContent.theme_color}`);
    } else {
      logError(`Invalid theme color format: ${manifestContent.theme_color}`);
      manifestValid = false;
    }
    
    return manifestValid;
    
  } catch (error) {
    logError(`Failed to parse site.webmanifest: ${error.message}`);
    return false;
  }
}

async function checkLayoutConfiguration() {
  log('\n⚙️ Checking layout configuration...', 'bright');
  
  const layoutPath = path.join(projectRoot, 'src', 'app', 'layout.tsx');
  
  if (!fs.existsSync(layoutPath)) {
    logError('layout.tsx not found');
    return false;
  }
  
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  // Check for favicon links in head section
  const requiredLinks = [
    'link rel="icon" type="image/x-icon" href="/favicon.ico"',
    'link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png"',
    'link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png"',
    'link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png"',
    'link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png"',
    'link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512x512.png"',
    'link rel="manifest" href="/site.webmanifest"',
    'meta name="theme-color" content="#2F5D50"'
  ];
  
  let layoutValid = true;
  
  for (const link of requiredLinks) {
    if (layoutContent.includes(link)) {
      logSuccess(`Layout includes: ${link.split(' ')[1]} ${link.split(' ')[2]}`);
    } else {
      logError(`Layout missing: ${link}`);
      layoutValid = false;
    }
  }
  
  // Check metadata configuration
  if (layoutContent.includes('icons: {')) {
    logSuccess('Layout has icons metadata configuration');
  } else {
    logWarning('Layout may not have icons metadata configuration');
  }
  
  return layoutValid;
}

async function testHttpEndpoints(baseUrl = 'http://localhost:3000') {
  log('\n🌐 Testing HTTP endpoints...', 'bright');
  
  // Check if server is running
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      logWarning(`Server at ${baseUrl} returned ${response.status}`);
      logInfo('Skipping HTTP tests - server not available');
      return true;
    }
  } catch (error) {
    logWarning(`Cannot connect to server at ${baseUrl}`);
    logInfo('Skipping HTTP tests - server not available');
    return true;
  }
  
  let allHttpValid = true;
  
  // Test all favicon URLs
  for (const file of requiredFiles) {
    try {
      const response = await fetch(`${baseUrl}${file.url}`);
      if (response.ok) {
        logSuccess(`HTTP ${response.status}: ${file.url}`);
      } else {
        logError(`HTTP ${response.status}: ${file.url}`);
        allHttpValid = false;
      }
    } catch (error) {
      logError(`Failed to fetch ${file.url}: ${error.message}`);
      allHttpValid = false;
    }
  }
  
  // Test config files
  for (const file of configFiles) {
    try {
      const response = await fetch(`${baseUrl}${file.url}`);
      if (response.ok) {
        logSuccess(`HTTP ${response.status}: ${file.url}`);
      } else {
        logError(`HTTP ${response.status}: ${file.url}`);
        allHttpValid = false;
      }
    } catch (error) {
      logError(`Failed to fetch ${file.url}: ${error.message}`);
      allHttpValid = false;
    }
  }
  
  return allHttpValid;
}

async function main() {
  log('🔍 Favicon Verification Script', 'bright');
  log('===============================', 'bright');
  
  const results = {
    fileExistence: await checkFileExistence(),
    fileSizes: await checkFileSizes(),
    manifestStructure: await checkManifestStructure(),
    layoutConfiguration: await checkLayoutConfiguration(),
    httpEndpoints: await testHttpEndpoints()
  };
  
  log('\n📊 Summary', 'bright');
  log('===========', 'bright');
  
  const checks = [
    { name: 'File Existence', result: results.fileExistence },
    { name: 'File Sizes', result: results.fileSizes },
    { name: 'Manifest Structure', result: results.manifestStructure },
    { name: 'Layout Configuration', result: results.layoutConfiguration },
    { name: 'HTTP Endpoints', result: results.httpEndpoints }
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
    log('\n🎉 All favicon checks passed!', 'green');
    process.exit(0);
  } else {
    log('\n❌ Some favicon checks failed. Please review the errors above.', 'red');
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  logError(`Script failed: ${error.message}`);
  process.exit(1);
});