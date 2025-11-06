#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

/**
 * Script to find and verify all internal links in the project
 */

// Known valid routes based on Next.js app structure
const validRoutes = new Set();
const brokenLinks = [];
const allLinks = [];

// Gather all valid routes from the app directory
function gatherValidRoutes() {
  const appDir = path.join(projectRoot, 'src', 'app', '[locale]');

  function scanDirectory(dir, basePath = '') {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      const routePath = path.join(basePath, item.name);

      if (item.isDirectory()) {
        // Dynamic segments like [slug] or [locale]
        if (item.name.startsWith('[') && item.name.endsWith(']')) {
          const paramName = item.name.slice(1, -1);
          validRoutes.add(basePath || '/');
          scanDirectory(fullPath, basePath);
        } else {
          validRoutes.add(`${basePath}/${item.name}`);
          scanDirectory(fullPath, `${basePath}/${item.name}`);
        }
      } else if (item.name === 'page.tsx' || item.name === 'page.ts') {
        validRoutes.add(basePath || '/');
      }
    }
  }

  if (fs.existsSync(appDir)) {
    scanDirectory(appDir);
  }

  // Add special routes
  validRoutes.add('/');
  validRoutes.add('');

  // Add hash/anchor routes (they're valid)
  // External URLs should not be checked
}

// Find all href attributes in files
function findHrefs(dir, filePattern = /\.(tsx?|jsx?)$/) {
  const files = [];

  function scan(currentDir) {
    const items = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(currentDir, item.name);

      // Skip node_modules, .next, etc.
      if (
        item.name === 'node_modules' ||
        item.name === '.next' ||
        item.name === 'dist'
      ) {
        continue;
      }

      if (item.isDirectory()) {
        scan(fullPath);
      } else if (filePattern.test(item.name)) {
        files.push(fullPath);
      }
    }
  }

  scan(dir);
  return files;
}

// Extract href attributes from file content
function extractHrefs(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const hrefPattern = /href=["']([^"']+)["']/g;
  const links = [];
  let match;

  while ((match = hrefPattern.exec(content)) !== null) {
    const href = match[1];

    // Skip template strings and regex patterns
    if (href.includes('${') || href.includes('\\') || href.includes('[^')) {
      continue;
    }

    // Skip CSP directives (starting with //)
    if (href.startsWith('//') && !href.startsWith('///')) {
      continue;
    }

    links.push({
      href,
      file: path.relative(projectRoot, filePath),
      line: content.substring(0, match.index).split('\n').length,
    });
  }

  return links;
}

// Check if a href is valid
function isValidHref(href) {
  // Skip external URLs
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return { valid: true, reason: 'external' };
  }

  // Skip special protocols
  if (
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('javascript:')
  ) {
    return { valid: true, reason: 'protocol' };
  }

  // Skip anchors only
  if (href.startsWith('#')) {
    return { valid: true, reason: 'anchor' };
  }

  // Skip data URIs
  if (href.startsWith('data:') || href.startsWith('blob:')) {
    return { valid: true, reason: 'data-uri' };
  }

  // Remove locale prefix and check route
  let cleanHref = href;

  // Remove hash/query string
  cleanHref = cleanHref.split('#')[0].split('?')[0];

  // Remove trailing slash
  cleanHref = cleanHref.replace(/\/$/, '');

  // Remove locale prefix (/en or /fi)
  cleanHref = cleanHref.replace(/^\/(en|fi)/, '');

  // Empty path after removing locale means root
  if (!cleanHref) {
    cleanHref = '/';
  }

  // Check if this route exists
  if (
    validRoutes.has(cleanHref) ||
    validRoutes.has(cleanHref.replace(/^\//, ''))
  ) {
    return { valid: true, reason: 'valid-route' };
  }

  // Check with trailing slash
  if (validRoutes.has(`${cleanHref}/`)) {
    return { valid: true, reason: 'valid-route' };
  }

  // Check if it's a static file
  const publicPath = path.join(projectRoot, 'public', cleanHref);
  if (fs.existsSync(publicPath)) {
    return { valid: true, reason: 'static-file' };
  }

  return { valid: false, reason: 'not-found' };
}

// Main execution
function main() {
  console.log('🔍 Scanning project for all links...\n');

  // Gather valid routes
  gatherValidRoutes();
  console.log(`📁 Found ${validRoutes.size} valid routes\n`);

  // Find all files with hrefs
  const srcDir = path.join(projectRoot, 'src');
  const files = findHrefs(srcDir);
  console.log(`📄 Scanning ${files.length} files...\n`);

  // Extract and validate all hrefs
  for (const file of files) {
    const hrefs = extractHrefs(file);

    for (const linkInfo of hrefs) {
      allLinks.push(linkInfo);
      const validation = isValidHref(linkInfo.href);

      if (!validation.valid) {
        brokenLinks.push({
          ...linkInfo,
          reason: validation.reason,
        });
      }
    }
  }

  // Print results
  console.log('='.repeat(80));
  console.log('📊 LINK VERIFICATION REPORT');
  console.log('='.repeat(80));
  console.log(`Total links found: ${allLinks.length}`);
  console.log(`Broken/Invalid links: ${brokenLinks.length}`);
  console.log('');

  if (brokenLinks.length > 0) {
    console.log('❌ BROKEN LINKS:\n');

    // Group by file
    const byFile = {};
    for (const link of brokenLinks) {
      if (!byFile[link.file]) {
        byFile[link.file] = [];
      }
      byFile[link.file].push(link);
    }

    for (const [file, links] of Object.entries(byFile)) {
      console.log(`\n📄 ${file}`);
      for (const link of links) {
        console.log(`   Line ${link.line}: ${link.href}`);
        console.log(`   Reason: ${link.reason}`);
      }
    }

    console.log('\n');
    console.log('='.repeat(80));
    console.log('💡 RECOMMENDATIONS:');
    console.log('='.repeat(80));
    console.log('1. Update broken links to point to existing pages');
    console.log('2. Create missing pages if they should exist');
    console.log(
      '3. Change broken links to redirect to 404 if content is permanently unavailable'
    );
    console.log('');
  } else {
    console.log('✅ No broken links found!');
  }

  // Write report to file
  const reportPath = path.join(projectRoot, 'link-verification-report.json');
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        totalLinks: allLinks.length,
        brokenLinks: brokenLinks.length,
        validRoutes: Array.from(validRoutes),
        brokenLinkDetails: brokenLinks,
      },
      null,
      2
    )
  );

  console.log(`📝 Detailed report saved to: link-verification-report.json\n`);

  // Exit with error code if broken links found
  if (brokenLinks.length > 0) {
    process.exit(1);
  }
}

main();
