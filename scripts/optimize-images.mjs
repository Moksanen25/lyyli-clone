#!/usr/bin/env node
/**
 * Image optimization script
 * Finds oversized images and provides compression recommendations
 */

import { readdirSync, statSync, existsSync } from 'fs';
import { join, extname, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const imagesDir = join(projectRoot, 'public/images');

// Thresholds
const SIZE_WARNING_THRESHOLD = 500 * 1024; // 500KB
const SIZE_ERROR_THRESHOLD = 1 * 1024 * 1024; // 1MB
const DIMENSION_WARNING = 1920; // pixels

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.avif'];

const results = {
  totalImages: 0,
  largeImages: [],
  veryLargeImages: [],
  totalSize: 0,
  recommendations: []
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

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function scanDirectory(dir, baseDir = imagesDir) {
  if (!existsSync(dir)) {
    log(`Directory ${dir} does not exist`, 'warning');
    return;
  }

  const entries = readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath, baseDir);
    } else {
      const ext = extname(entry).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        results.totalImages++;
        results.totalSize += stat.size;
        
        const relativePath = relative(projectRoot, fullPath);
        
        // Check for large files
        if (stat.size > SIZE_ERROR_THRESHOLD) {
          results.veryLargeImages.push({
            path: relativePath,
            size: stat.size,
            formatted: formatBytes(stat.size)
          });
        } else if (stat.size > SIZE_WARNING_THRESHOLD) {
          results.largeImages.push({
            path: relativePath,
            size: stat.size,
            formatted: formatBytes(stat.size)
          });
        }
      }
    }
  }
}

function generateRecommendations() {
  // Very large images (>1MB) need urgent attention
  if (results.veryLargeImages.length > 0) {
    results.recommendations.push({
      priority: 'HIGH',
      message: `${results.veryLargeImages.length} images exceed 1MB and need immediate compression`,
      images: results.veryLargeImages
    });
  }
  
  // Large images (>500KB) should be optimized
  if (results.largeImages.length > 0) {
    results.recommendations.push({
      priority: 'MEDIUM',
      message: `${results.largeImages.length} images exceed 500KB and should be optimized`,
      images: results.largeImages
    });
  }
  
  // General recommendations
  results.recommendations.push({
    priority: 'INFO',
    message: 'Consider using Next.js Image component for automatic optimization',
    details: [
      '• Automatic WebP/AVIF conversion',
      '• Responsive image generation (srcset)',
      '• Lazy loading for below-the-fold images',
      '• Automatic size optimization'
    ]
  });
  
  results.recommendations.push({
    priority: 'INFO',
    message: 'Manual compression tools',
    details: [
      '• PNG: tinypng.com or pngquant',
      '• JPEG: jpegoptim or imagemagick',
      '• Batch: sharp (npm package)',
      '• Target: <200KB for hero images, <100KB for other images'
    ]
  });
}

function displayResults() {
  log('🖼️  Image Optimization Report', 'info');
  log('═══════════════════════════════════════', 'info');
  log('', 'info');
  
  log(`📊 Overview:`, 'info');
  log(`   Total images scanned: ${results.totalImages}`, 'info');
  log(`   Total size: ${formatBytes(results.totalSize)}`, 'info');
  log(`   Average size: ${formatBytes(Math.round(results.totalSize / results.totalImages))}`, 'info');
  log('', 'info');
  
  if (results.veryLargeImages.length > 0) {
    log(`🚨 URGENT: Very Large Images (>${formatBytes(SIZE_ERROR_THRESHOLD)}):`, 'error');
    results.veryLargeImages
      .sort((a, b) => b.size - a.size)
      .forEach(img => {
        log(`   ${img.formatted.padEnd(10)} ${img.path}`, 'error');
      });
    log('', 'info');
  }
  
  if (results.largeImages.length > 0) {
    log(`⚠️  Large Images (>${formatBytes(SIZE_WARNING_THRESHOLD)}):`, 'warning');
    results.largeImages
      .sort((a, b) => b.size - a.size)
      .slice(0, 10) // Show top 10
      .forEach(img => {
        log(`   ${img.formatted.padEnd(10)} ${img.path}`, 'warning');
      });
    if (results.largeImages.length > 10) {
      log(`   ... and ${results.largeImages.length - 10} more`, 'warning');
    }
    log('', 'info');
  }
  
  log('💡 Recommendations:', 'info');
  results.recommendations.forEach((rec, index) => {
    const color = rec.priority === 'HIGH' ? 'error' : rec.priority === 'MEDIUM' ? 'warning' : 'info';
    log(`   ${index + 1}. [${rec.priority}] ${rec.message}`, color);
    if (rec.details) {
      rec.details.forEach(detail => log(`      ${detail}`, color));
    }
    if (rec.images && rec.images.length <= 5) {
      rec.images.forEach(img => log(`      • ${img.path} (${img.formatted})`, color));
    }
    log('', 'info');
  });
  
  // Compression commands
  if (results.veryLargeImages.length > 0 || results.largeImages.length > 0) {
    log('🔧 Quick Compression Commands:', 'info');
    log('', 'info');
    log('   Install sharp for batch compression:', 'info');
    log('   $ npm install -D sharp', 'info');
    log('', 'info');
    log('   Then run this Node script:', 'info');
    log(`   
   const sharp = require('sharp');
   const glob = require('glob');
   
   glob('public/images/**/*.{png,jpg,jpeg}', async (err, files) => {
     for (const file of files) {
       await sharp(file)
         .resize(1920, null, { 
           withoutEnlargement: true,
           fit: 'inside'
         })
         .webp({ quality: 85 })
         .toFile(file.replace(/\\.(png|jpg|jpeg)$/, '.webp'));
       
       console.log(\`Converted: \${file}\`);
     }
   });
   `, 'info');
  }
  
  log('═══════════════════════════════════════', 'info');
  
  // Exit code
  const hasIssues = results.veryLargeImages.length > 0 || results.largeImages.length > 0;
  if (hasIssues) {
    log('⚠️  Issues found. Please optimize images before deployment.', 'warning');
  } else {
    log('✅ All images are within recommended size limits!', 'success');
  }
  
  process.exit(hasIssues ? 1 : 0);
}

function main() {
  log('🔍 Scanning images...', 'info');
  log('', 'info');
  
  scanDirectory(imagesDir);
  generateRecommendations();
  displayResults();
}

main();
