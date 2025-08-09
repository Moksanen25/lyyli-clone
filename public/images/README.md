# Image Assets Directory Structure

This directory contains all image assets for the Lyyli website, organized by purpose and location.

## Directory Structure

```
public/images/
├── logos/          # Company logos and brand assets
├── icons/          # UI icons and small graphics
├── hero/           # Hero section images and backgrounds
├── features/       # Feature-related illustrations and screenshots
├── team/           # Team member photos and headshots
├── testimonials/   # Customer photos and company logos
├── blog/           # Blog post images and thumbnails
├── about/          # About page images and company photos
└── general/        # General-purpose images for use across all sites
```

## Image Guidelines

### File Formats
- **Logos**: SVG (preferred) or PNG with transparent background
- **Photos**: JPG or WebP for best compression
- **Icons**: SVG (preferred) or PNG
- **Illustrations**: SVG or PNG

### Naming Convention
Use descriptive, kebab-case filenames:
- `lyyli-logo-primary.svg`
- `hero-background-gradient.jpg`
- `feature-dashboard-screenshot.png`
- `team-mikko-oksanen.jpg`

### Recommended Sizes
- **Logos**: Vector (SVG) or 200x200px minimum
- **Hero images**: 1920x1080px or larger
- **Feature screenshots**: 800x600px minimum
- **Team photos**: 400x400px square
- **Blog thumbnails**: 600x400px (3:2 aspect ratio)
- **Icons**: 24x24px, 32x32px, 48x48px

### Optimization
- Compress images before adding to the project
- Use WebP format when possible for better performance
- Provide multiple sizes for responsive images when needed

## Usage in Components

Import and use images in your React components:

```tsx
import Image from 'next/image';
import logoSvg from '/public/images/logos/lyyli-logo-primary.svg';

// For static imports
<Image 
  src={logoSvg} 
  alt="Lyyli.ai logo" 
  width={200} 
  height={50}
/>

// For dynamic imports
<Image 
  src="/images/hero/hero-background.jpg" 
  alt="Hero background" 
  fill
  className="object-cover"
/>
```

## Current Assets

- `public/lyyli-logo.svg` - Main Lyyli logo (consider moving to `/logos/`)
- `public/blog/.gitkeep` - Blog images placeholder (can be removed when adding actual images)
