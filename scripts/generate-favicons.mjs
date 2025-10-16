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

console.log('🎨 Generating favicon and app icon set...');
console.log(`📁 Source SVG: ${svgPath}`);
console.log(`📁 Output directory: ${outputDir}`);

// Check if source SVG exists
if (!existsSync(svgPath)) {
  console.error(`❌ Source SVG not found: ${svgPath}`);
  process.exit(1);
}

// Read the SVG content
const svgContent = readFileSync(svgPath, 'utf8');

// Generate PNG files for each size
for (const { size, name, format } of iconSizes) {
  try {
    // For now, we'll create placeholder files with the correct structure
    // In a real implementation, you'd use sharp or similar to convert SVG to PNG
    const placeholderContent = `<!-- Generated ${name} placeholder -->
<!-- Replace with actual ${format} conversion from ${svgPath} -->
<!-- Size: ${size}x${size}px -->
`;
    
    const outputPath = join(outputDir, name);
    writeFileSync(outputPath, placeholderContent);
    console.log(`✅ Generated ${name} (${size}x${size}px)`);
  } catch (error) {
    console.error(`❌ Failed to generate ${name}:`, error.message);
  }
}

// Generate favicon.ico (16x16 and 32x32 combined)
const faviconIcoPath = join(projectRoot, 'public/favicon.ico');
try {
  const faviconContent = `<!-- Generated favicon.ico placeholder -->
<!-- Replace with actual ICO file containing 16x16 and 32x32 icons -->
`;
  writeFileSync(faviconIcoPath, faviconContent);
  console.log('✅ Generated favicon.ico');
} catch (error) {
  console.error('❌ Failed to generate favicon.ico:', error.message);
}

// Generate site.webmanifest
const manifestContent = {
  "name": "Lyyli.ai - AI Communication Assistant",
  "short_name": "Lyyli.ai",
  "description": "Transform your professional service organization's communication from intuition-based to data-driven",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#2F5D50",
  "theme_color": "#2F5D50",
  "orientation": "portrait-primary",
  "scope": "/",
  "lang": "en",
  "categories": ["productivity", "business", "communication"],
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icons/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "screenshots": [
    {
      "src": "/images/general/Desktop_UI_for_web.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide",
      "label": "Lyyli.ai Desktop Interface"
    },
    {
      "src": "/images/general/Mobile_UI_for_web.jpeg",
      "sizes": "390x844",
      "type": "image/jpeg",
      "form_factor": "narrow",
      "label": "Lyyli.ai Mobile Interface"
    }
  ],
  "shortcuts": [
    {
      "name": "Features",
      "short_name": "Features",
      "description": "View Lyyli.ai features",
      "url": "/en/features",
      "icons": [
        {
          "src": "/icons/icon-192x192.png",
          "sizes": "192x192"
        }
      ]
    },
    {
      "name": "Pricing",
      "short_name": "Pricing",
      "description": "View pricing plans",
      "url": "/en/pricing",
      "icons": [
        {
          "src": "/icons/icon-192x192.png",
          "sizes": "192x192"
        }
      ]
    },
    {
      "name": "Contact",
      "short_name": "Contact",
      "description": "Get in touch",
      "url": "/en/contact",
      "icons": [
        {
          "src": "/icons/icon-192x192.png",
          "sizes": "192x192"
        }
      ]
    }
  ],
  "related_applications": [],
  "prefer_related_applications": false,
  "edge_side_panel": {
    "preferred_width": 400
  },
  "launch_handler": {
    "client_mode": "navigate-existing"
  },
  "protocol_handlers": [
    {
      "protocol": "web+lyyli",
      "url": "/?protocol=%s"
    }
  ]
};

try {
  const manifestPath = join(projectRoot, 'public/site.webmanifest');
  writeFileSync(manifestPath, JSON.stringify(manifestContent, null, 2));
  console.log('✅ Generated site.webmanifest');
} catch (error) {
  console.error('❌ Failed to generate site.webmanifest:', error.message);
}

console.log('\n🎉 Favicon generation complete!');
console.log('\n📝 Next steps:');
console.log('1. Replace placeholder files with actual PNG/ICO conversions from the SVG');
console.log('2. Use tools like sharp, ImageMagick, or online converters');
console.log('3. Update layout.tsx with proper favicon links');
console.log('4. Test favicon loading in browser network panel');
