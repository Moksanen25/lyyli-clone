#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Required favicon and app icon sizes
const iconSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 512, name: 'icon-512x512.png' },
];

// Use the existing PNG logo as base
const logoPath = join(projectRoot, 'public/images/logos/Lyyli.ai_no_BG.png');
const outputDir = join(projectRoot, 'public/icons');

// Create output directory if it doesn't exist
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

console.log('🎨 Generating favicon and app icon set...');
console.log(`📁 Source logo: ${logoPath}`);
console.log(`📁 Output directory: ${outputDir}`);

// Check if source logo exists
if (!existsSync(logoPath)) {
  console.error(`❌ Source logo not found: ${logoPath}`);
  process.exit(1);
}

try {
  // Dynamic import of sharp
  const sharp = await import('sharp');
  
  // Read the logo
  const logoBuffer = readFileSync(logoPath);
  
  // Generate PNG files for each size
  for (const { size, name } of iconSizes) {
    try {
      const outputPath = join(outputDir, name);
      
      await sharp.default(logoBuffer)
        .resize(size, size, {
          kernel: sharp.default.kernel.lanczos3,
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 } // Transparent background
        })
        .png({
          quality: 100,
          compressionLevel: 9
        })
        .toFile(outputPath);
        
      console.log(`✅ Generated ${name} (${size}x${size}px)`);
    } catch (error) {
      console.error(`❌ Failed to generate ${name}:`, error.message);
    }
  }
  
  // Generate favicon.ico (using 32x32)
  const faviconIcoPath = join(projectRoot, 'public/favicon.ico');
  try {
    const icon32 = await sharp.default(logoBuffer)
      .resize(32, 32, {
        kernel: sharp.default.kernel.lanczos3,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toBuffer();
    
    // For ICO, we'll use PNG format (modern browsers support this)
    writeFileSync(faviconIcoPath, icon32);
    console.log('✅ Generated favicon.ico');
  } catch (error) {
    console.error('❌ Failed to generate favicon.ico:', error.message);
  }
  
} catch (error) {
  console.error('❌ Sharp not available:', error.message);
  process.exit(1);
}

console.log('\n🎉 Favicon generation complete!');
