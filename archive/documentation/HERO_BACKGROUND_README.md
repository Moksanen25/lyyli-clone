# Hero Background System

This document describes the premium hero background system implemented for the Lyyli.ai landing page.

## Overview

The hero background system provides a subtle, layered background that enhances the hero section without drawing attention away from the content. It includes:

- **Base radial gradient** - Soft center-to-edges gradient
- **Dotted grid texture** - Very faint CSS-generated pattern
- **Floating bokeh blobs** - Subtle animated circles with blur effects
- **Two variants** - Light (default) and Green themes

## Implementation

### Files Modified

1. **`src/components/HeroVisual.tsx`** - Main background component
2. **`src/app/globals.css`** - CSS styles and animations
3. **`src/app/[locale]/page.tsx`** - Hero section with data attribute
4. **`src/components/HeroToggle.tsx`** - Demo toggle component (optional)

### CSS Classes

The system uses the following CSS classes:

- `.hero-bg-radial` - Base radial gradient
- `.hero-bg-dots` - Dotted grid texture
- `.hero-blob` - Bokeh blob base styles
- `.hero-blob-a` through `.hero-blob-h` - Individual blob positioning

### Data Attributes

The hero section uses `data-hero` attribute to control variants:

- `data-hero="light"` - Default light theme (white/very light green)
- `data-hero="green"` - Green theme (deep green with inverted text)

## Usage

### Basic Implementation

```tsx
<section 
  className="container mx-auto px-4 py-20 relative"
  data-hero="light"
  aria-label="Hero"
>
  <HeroVisual />
  {/* Hero content */}
</section>
```

### Switching Variants

To change the hero background variant, update the `data-hero` attribute:

```tsx
// Light variant (default)
<section data-hero="light">

// Green variant
<section data-hero="green">
```

### Demo Toggle

The `HeroToggle` component provides an interactive way to test both variants:

```tsx
import HeroToggle from "../../components/HeroToggle";

// Add above the hero section
<HeroToggle />
```

## Design Specifications

### Light Variant (Default)
- **Base gradient**: `#F7FBF9` → `#FFFFFF`
- **Dotted grid**: `rgba(34, 75, 57, 0.06)` with 24px spacing
- **Bokeh blobs**: `#7FB29F` with 0.14 opacity
- **Text colors**: Dark green (`#2F5D50`) for contrast

### Green Variant
- **Base gradient**: `#0F2E25` → `#14382C`
- **Dotted grid**: `rgba(255, 255, 255, 0.06)` with 24px spacing
- **Bokeh blobs**: `rgba(163, 200, 183, 0.18)` with overlay blend mode
- **Text colors**: White with inverted button styles

### Animation Details
- **Bokeh drift**: 55-second loop with subtle movement
- **Performance**: GPU-accelerated transforms with `will-change: transform`
- **Accessibility**: Respects `prefers-reduced-motion: reduce`
- **Blob count**: 8 strategically placed blobs with varying sizes

## Performance Features

- **GPU-friendly**: Uses `transform3d` and `will-change` properties
- **Minimal bytes**: CSS-generated patterns, no large images
- **Efficient animations**: Staggered animation delays prevent performance spikes
- **Reduced motion support**: Animations disabled for accessibility

## Accessibility

- **Contrast**: Minimum 4.5:1 contrast ratio maintained
- **Motion**: Respects user's motion preferences
- **Semantic**: Proper ARIA labels and semantic structure
- **Focus**: Background elements have `pointer-events: none`

## Browser Support

- **Modern browsers**: Full support for CSS Grid, transforms, and filters
- **Fallbacks**: Graceful degradation for older browsers
- **Mobile**: Responsive design with viewport-relative sizing

## Customization

### Adding New Variants

1. Add new CSS rules in `globals.css`:
```css
[data-hero="new-variant"] .hero-bg-radial {
  background: radial-gradient(/* your gradient */);
}
```

2. Update the hero section:
```tsx
<section data-hero="new-variant">
```

### Modifying Colors

Update the CSS custom properties in the `:root` section of `globals.css`:

```css
:root {
  --hero-primary: #your-color;
  --hero-secondary: #your-color;
}
```

### Adjusting Animation

Modify the `@keyframes hero-drift` animation in `globals.css`:

```css
@keyframes hero-drift {
  0% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(/* your values */); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}
```

## Troubleshooting

### Background Not Visible
- Check that `HeroVisual` component is imported and rendered
- Verify `data-hero` attribute is set on the hero section
- Ensure CSS is properly loaded

### Performance Issues
- Check for multiple instances of `HeroVisual`
- Verify `prefers-reduced-motion` is working
- Monitor browser performance tools

### Text Contrast Issues
- Ensure proper `data-hero` value is set
- Check CSS overrides for text colors
- Verify button styles are properly inverted

## Future Enhancements

- **Theme switching**: Integration with global theme system
- **Custom patterns**: User-configurable background patterns
- **Animation presets**: Multiple animation styles
- **Performance monitoring**: Built-in performance metrics
