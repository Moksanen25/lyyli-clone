#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Get all valid routes from the app structure
const validRoutes = new Set();
const appDir = path.join(projectRoot, 'src', 'app', '[locale]');

function scanForValidRoutes(dir, basePath = '') {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const routePath = path.join(basePath, item.name);

    if (item.isDirectory()) {
      if (item.name.startsWith('[') && item.name.endsWith(']')) {
        validRoutes.add(basePath || '/');
        scanForValidRoutes(fullPath, basePath);
      } else {
        validRoutes.add(`${basePath}/${item.name}`);
        scanForValidRoutes(fullPath, `${basePath}/${item.name}`);
      }
    } else if (item.name === 'page.tsx' || item.name === 'page.ts') {
      validRoutes.add(basePath || '/');
    }
  }
}

scanForValidRoutes(appDir);

// Find all help links in files
const brokenLinks = [];

function extractHelpLinks(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const helpLinkPattern =
    /href=\{?`?\$?\{?[^}]*\}?\/([^\/]+)\/help\/([^`'"}\s]+)[`'"}\s]/g;
  const simplePattern = /\/help\/([a-z-]+)/g;

  let match;
  const links = new Set();

  // Find all help links
  while ((match = simplePattern.exec(content)) !== null) {
    const helpPath = match[1];
    links.add(helpPath);
  }

  return Array.from(links).map(helpPath => {
    const fullPath = `/help/${helpPath}`;
    const lineNumber = content
      .substring(0, content.indexOf(helpPath))
      .split('\n').length;

    return {
      path: fullPath,
      file: path.relative(projectRoot, filePath),
      line: lineNumber,
      exists: validRoutes.has(fullPath),
    };
  });
}

function scanDirectory(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.name === 'node_modules' || item.name === '.next') {
      continue;
    }

    if (item.isDirectory()) {
      scanDirectory(fullPath);
    } else if (item.name.endsWith('.tsx') || item.name.endsWith('.ts')) {
      const links = extractHelpLinks(fullPath);

      for (const link of links) {
        if (!link.exists) {
          brokenLinks.push(link);
        }
      }
    }
  }
}

console.log('🔍 Scanning for broken help links...\n');
console.log(`Valid routes found: ${validRoutes.size}\n`);

const helpDir = path.join(projectRoot, 'src', 'app', '[locale]', 'help');
scanDirectory(helpDir);

console.log('='.repeat(80));
console.log('📊 BROKEN HELP LINKS REPORT');
console.log('='.repeat(80));
console.log(`Total broken links: ${brokenLinks.length}\n`);

if (brokenLinks.length > 0) {
  const uniquePaths = [...new Set(brokenLinks.map(l => l.path))];

  console.log('❌ Missing Help Pages:\n');
  for (const path of uniquePaths.sort()) {
    const occurrences = brokenLinks.filter(l => l.path === path);
    console.log(`\n${path}`);
    console.log(`  Referenced in ${occurrences.length} location(s):`);
    for (const occ of occurrences) {
      console.log(`    - ${occ.file}:${occ.line}`);
    }
  }

  console.log(`\n\n${'='.repeat(80)}`);
  console.log('💡 ACTIONS NEEDED:');
  console.log('='.repeat(80));
  console.log('\nFor each missing page, you can either:');
  console.log(
    '1. Create the page in src/app/[locale]/help/[page-name]/page.tsx'
  );
  console.log('2. Update the link to point to an existing page');
  console.log("3. Remove the link if it's no longer needed\n");

  // Generate report file
  const reportPath = path.join(projectRoot, 'broken-help-links-report.json');
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        totalBrokenLinks: brokenLinks.length,
        uniqueMissingPages: uniquePaths,
        details: brokenLinks,
      },
      null,
      2
    )
  );

  console.log(`📝 Detailed report saved to: broken-help-links-report.json\n`);
} else {
  console.log('✅ No broken help links found!\n');
}

console.log('Valid help pages:');
const validHelpPages = Array.from(validRoutes)
  .filter(r => r.startsWith('/help'))
  .sort();
for (const page of validHelpPages) {
  console.log(`  ✓ ${page}`);
}

