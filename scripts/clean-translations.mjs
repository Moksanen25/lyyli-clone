#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const srcDir = path.join(repoRoot, 'src');
const translationsDir = path.join(srcDir, 'translations');
const filesToScanExtensions = new Set(['.ts', '.tsx']);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (filesToScanExtensions.has(path.extname(entry.name))) {
      scanFile(full);
    }
  }
}

const usedKeys = new Set();

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Match t["key"] and t['key']
  const regex = /t\[["']([^"']+)["']\]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    usedKeys.add(match[1]);
  }
}

function sortObjectByKeys(obj) {
  return Object.keys(obj)
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
}

function loadJson(file) {
  const raw = fs.readFileSync(file, 'utf8');
  // JSON.parse will keep only the last duplicate occurrence automatically
  return JSON.parse(raw);
}

function saveJson(file, obj) {
  const sorted = sortObjectByKeys(obj);
  fs.writeFileSync(file, JSON.stringify(sorted, null, 2) + '\n', 'utf8');
}

function filterKeys(obj, allowed) {
  const out = {};
  for (const key of Object.keys(obj)) {
    if (allowed.has(key)) out[key] = obj[key];
  }
  return out;
}

function main() {
  if (!fs.existsSync(translationsDir)) {
    console.error('Translations directory not found:', translationsDir);
    process.exit(1);
  }

  walk(srcDir);

  const locales = ['en', 'fi'];
  for (const locale of locales) {
    const file = path.join(translationsDir, `${locale}.json`);
    if (!fs.existsSync(file)) {
      console.warn('Missing translations file:', file);
      continue;
    }
    const original = loadJson(file);
    const deduped = { ...original }; // already deduped by parse
    const filtered = filterKeys(deduped, usedKeys);
    const removedCount = Object.keys(deduped).length - Object.keys(filtered).length;
    saveJson(file, filtered);
    console.log(`Cleaned ${locale}.json: kept ${Object.keys(filtered).length}, removed ${removedCount}`);
  }

  console.log(`Total used keys detected: ${usedKeys.size}`);
}

main();


