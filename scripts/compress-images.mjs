#!/usr/bin/env node
/**
 * Image compression script using sharp
 * Compresses and converts images to WebP format
 */

import sharp from 'sharp';
import { readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import { join, extname, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const imagesDir = join(projectRoot, 'public/images');

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
const MAX_WIDTH = 1920;
const QUALITY = {
  webp: 85,
  avif: 80,
  jpeg: 85,
  png: 90
};

let processed = 0;
let skipped = 0;
let errors = 0;

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

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

async function compressImage(inputPath) {
  try {
    const ext = extname(inputPath).toLowerCase();
    if (!IMAGE_EXTENSIONS.includes(ext)) {
      return;
    }

    const stat = statSync(inputPath);
    const originalSize = stat.size;
    
    // Skip if already small enough
    if (originalSize < 200 * 1024) { // < 200KB
      skipped++;
      return;
    }

    const dir = dirname(inputPath);
    const name = basename(inputPath, ext);
    
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    
    log(`Processing: ${name}${ext} (${formatBytes(originalSize)}, ${metadata.width}x${metadata.height})`, 'info');
    
    // Determine if we need to resize
    const needsResize = metadata.width > MAX_WIDTH;
    
    // Create sharp instance with optional resize
    let pipeline = sharp(inputPath);
    
    if (needsResize) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    // Generate WebP version
    const webpPath = join(dir, `${name}.webp`);
    await pipeline
      .clone()
      .webp({ quality: QUALITY.webp })
      .toFile(webpPath);
    
    const webpSize = statSync(webpPath).size;
    const webpSavings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    
    log(`  ✓ WebP: ${formatBytes(webpSize)} (${webpSavings}% smaller)`, 'success');
    
    // Generate AVIF version (best compression but slower)
    try {
      const avifPath = join(dir, `${name}.avif`);
      await pipeline
        .clone()
        .avif({ quality: QUALITY.avif })
        .toFile(avifPath);
      
      const avifSize = statSync(avifPath).size;
      const avifSavings = ((originalSize - avifSize) / originalSize * 100).toFixed(1);
      
      log(`  ✓ AVIF: ${formatBytes(avifSize)} (${avifSavings}% smaller)`, 'success');
    } catch (avifError) {
      log(`  ⚠ AVIF generation skipped (not supported)`, 'warning');
    }
    
    // Optimize original format in-place
    if (ext === '.png') {
      await pipeline
        .clone()
        .png({ quality: QUALITY.png, compressionLevel: 9 })
        .toFile(inputPath + '.tmp');
      
      const optimizedSize = statSync(inputPath + '.tmp').size;
      if (optimizedSize < originalSize) {
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
        log(`  ✓ PNG optimized: ${formatBytes(optimizedSize)} (${savings}% smaller)`, 'success');
        // Rename temp file to original
        await import('fs/promises').then(fs => fs.rename(inputPath + '.tmp', inputPath));
      } else {
        // Remove temp file if not smaller
        await import('fs/promises').then(fs => fs.unlink(inputPath + '.tmp'));
      }
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await pipeline
        .clone()
        .jpeg({ quality: QUALITY.jpeg, mozjpeg: true })
        .toFile(inputPath + '.tmp');
      
      const optimizedSize = statSync(inputPath + '.tmp').size;
      if (optimizedSize < originalSize) {
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
        log(`  ✓ JPEG optimized: ${formatBytes(optimizedSize)} (${savings}% smaller)`, 'success');
        // Rename temp file to original
        await import('fs/promises').then(fs => fs.rename(inputPath + '.tmp', inputPath));
      } else {
        // Remove temp file if not smaller
        await import('fs/promises').then(fs => fs.unlink(inputPath + '.tmp'));
      }
    }
    
    processed++;
    log('', 'info');
    
  } catch (error) {
    errors++;
    log(`  ✗ Error processing ${inputPath}: ${error.message}`, 'error');
  }
}

async function scanAndCompress(dir) {
  if (!existsSync(dir)) {
    log(`Directory ${dir} does not exist`, 'warning');
    return;
  }

  const entries = readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      await scanAndCompress(fullPath);
    } else {
      await compressImage(fullPath);
    }
  }
}

async function main() {
  log('🗜️  Image Compression Started', 'info');
  log('═══════════════════════════════════════', 'info');
  log('', 'info');
  log(`Configuration:`, 'info');
  log(`  • Max width: ${MAX_WIDTH}px`, 'info');
  log(`  • WebP quality: ${QUALITY.webp}`, 'info');
  log(`  • AVIF quality: ${QUALITY.avif}`, 'info');
  log(`  • Target: Images > 200KB`, 'info');
  log('', 'info');
  
  await scanAndCompress(imagesDir);
  
  log('═══════════════════════════════════════', 'info');
  log('📊 Compression Summary:', 'info');
  log(`   Processed: ${processed}`, processed > 0 ? 'success' : 'info');
  log(`   Skipped: ${skipped}`, 'info');
  log(`   Errors: ${errors}`, errors > 0 ? 'error' : 'info');
  log('', 'info');
  
  if (processed > 0) {
    log('✅ Images compressed successfully!', 'success');
    log('', 'info');
    log('💡 Next steps:', 'info');
    log('   1. Use Next.js <Image> component for automatic format selection', 'info');
    log('   2. Add priority prop to above-the-fold images', 'info');
    log('   3. Use loading="lazy" for below-the-fold images', 'info');
    log('   4. Run Lighthouse to measure improvements', 'info');
  } else if (skipped > 0) {
    log('ℹ️  All images are already optimized!', 'info');
  }
  
  process.exit(errors > 0 ? 1 : 0);
}

main().catch(error => {
  log(`Fatal error: ${error.message}`, 'error');
  process.exit(1);
});
