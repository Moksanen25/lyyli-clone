#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Required favicon and app icon sizes
const iconSizes = [
  { size: 16, name: 'favicon-16x16.png', format: 'png' },
  { size: 32, name: 'favicon-32x32.png', format: 'png' },
  { size: 180, name: 'apple-touch-icon.png', format: 'png' },
  { size: 192, name: 'android-chrome-192x192.png', format: 'png' },
  { size: 512, name: 'android-chrome-512x512.png', format: 'png' },
  { size: 192, name: 'icon-192x192.png', format: 'png' },
  { size: 512, name: 'icon-512x512.png', format: 'png' },
];

const svgPath = join(projectRoot, 'public/images/logos/Lyyli_ai_favicon.svg');
const outputDir = join(projectRoot, 'public/icons');

// Create output directory if it doesn't exist
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

console.log('🎨 Generating favicon and app icon set with Sharp...');
console.log(`📁 Source SVG: ${svgPath}`);
console.log(`📁 Output directory: ${outputDir}`);

// Check if source SVG exists
if (!existsSync(svgPath)) {
  console.error(`❌ Source SVG not found: ${svgPath}`);
  process.exit(1);
}

try {
  // Dynamic import of sharp
  const sharp = await import('sharp');
  
  // Read the SVG content
  const svgBuffer = readFileSync(svgPath);
  
  // Generate PNG files for each size
  for (const { size, name, format } of iconSizes) {
    try {
      const outputPath = join(outputDir, name);
      
      await sharp.default(svgBuffer)
        .resize(size, size, {
          kernel: sharp.default.kernel.lanczos3
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
  
  // Generate favicon.ico (16x16 and 32x32 combined)
  const faviconIcoPath = join(projectRoot, 'public/favicon.ico');
  try {
    // Create ICO file with multiple sizes
    const icon16 = await sharp.default(svgBuffer).resize(16, 16).png().toBuffer();
    const icon32 = await sharp.default(svgBuffer).resize(32, 32).png().toBuffer();
    
    // For now, just copy the 32x32 as favicon.ico
    // In a real implementation, you'd use a proper ICO encoder
    writeFileSync(faviconIcoPath, icon32);
    console.log('✅ Generated favicon.ico');
  } catch (error) {
    console.error('❌ Failed to generate favicon.ico:', error.message);
  }
  
} catch (error) {
  console.error('❌ Sharp not available. Please install sharp: npm install sharp');
  console.log('📝 Falling back to placeholder generation...');
  
  // Fallback: create placeholder files
  for (const { size, name, format } of iconSizes) {
    try {
      const placeholderContent = `<!-- Generated ${name} placeholder -->
<!-- Install sharp and run this script again for actual PNG conversion -->
<!-- Size: ${size}x${size}px -->
`;
      
      const outputPath = join(outputDir, name);
      writeFileSync(outputPath, placeholderContent);
      console.log(`📝 Created placeholder ${name} (${size}x${size}px)`);
    } catch (error) {
      console.error(`❌ Failed to create placeholder ${name}:`, error.message);
    }
  }
}

console.log('\n🎉 Favicon generation complete!');
