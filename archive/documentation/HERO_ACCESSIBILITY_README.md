# Hero Visualization Accessibility Features

This document describes the accessibility improvements made to the hero visualization components to address mobile accessibility issues.

## Overview

The original `HeroVisual` component had complex animations and visual elements that could interfere with accessibility on mobile devices. We've created three alternative components to provide better accessibility:

1. **MobileHeroVisual** - Simplified mobile-optimized version
2. **AccessibleHeroVisual** - Multi-mode accessible version with user controls
3. **Original HeroVisual** - Maintained for desktop users

## Components

### MobileHeroVisual
- **Purpose**: Mobile-first design with simplified animations
- **Features**:
  - Fewer, thicker visual elements for better visibility
  - Reduced animation complexity
  - Respects `prefers-reduced-motion` user preference
  - Optimized for small screens
- **Usage**: Automatically used on mobile devices (screen width < 768px)

### AccessibleHeroVisual
- **Purpose**: Desktop version with accessibility controls
- **Features**:
  - Three visualization modes: Static, Simplified, Full
  - User-controlled mode switching
  - Automatic detection of user preferences
  - Respects accessibility settings
- **Usage**: Used on large screens (≥1024px) with mode selector

### Original HeroVisual
- **Purpose**: Full-featured desktop version
- **Features**:
  - Complex animations and visual effects
  - Rich data flow visualization
  - Used on medium screens (768px - 1024px)

## Accessibility Features

### Motion Preferences
- Automatically detects `prefers-reduced-motion: reduce`
- Disables animations when motion is reduced
- Provides static alternatives

### Mobile Optimization
- Simplified visual elements on small screens
- Reduced opacity and complexity
- Touch-friendly sizing

### High Contrast Support
- Enhanced contrast in high contrast mode
- Better visibility for visual elements
- Improved text readability

### Focus Management
- Proper focus indicators for interactive elements
- Keyboard navigation support
- Screen reader compatibility

## Implementation

### Automatic Detection
The system automatically:
- Detects screen size and device type
- Checks user accessibility preferences
- Switches to appropriate visualization mode

### Manual Control
Users can manually switch between modes on desktop:
- **Static**: No animations, maximum accessibility
- **Simple**: Minimal animations, good accessibility
- **Full**: Full animations, standard experience

## CSS Classes

### Utility Classes
```css
.hero-visual          /* Base hero visualization styles */
.data-stream          /* Data flow stream elements */
.data-node            /* Data connection nodes */
.hero-visual-toggle   /* Mode switching buttons */
```

### Responsive Classes
```css
.hidden lg:block      /* Large screens only */
.hidden md:block lg:hidden  /* Medium screens only */
.md:hidden            /* Mobile only */
```

### Accessibility Classes
```css
.reduced-motion       /* Reduced motion alternatives */
.hero-visual-toggle:focus  /* Focus styles */
```

## Usage Examples

### Basic Implementation
```tsx
// Automatically uses appropriate component based on screen size
<div className="hidden lg:block">
  <AccessibleHeroVisual />
</div>
<div className="hidden md:block lg:hidden">
  <HeroVisual />
</div>
<div className="md:hidden">
  <MobileHeroVisual />
</div>
```

### Custom Mode Selection
```tsx
// Force specific mode
<AccessibleHeroVisual defaultMode="static" />
```

## Testing

### Accessibility Testing
- Test with screen readers
- Verify keyboard navigation
- Check contrast ratios
- Test with reduced motion

### Mobile Testing
- Test on various screen sizes
- Verify touch interactions
- Check performance on low-end devices

### Browser Testing
- Test across different browsers
- Verify CSS feature support
- Check fallback behavior

## Performance Considerations

### Mobile Optimization
- Reduced DOM complexity
- Simplified animations
- Optimized rendering

### Desktop Features
- Progressive enhancement
- Optional animations
- User-controlled complexity

## Future Improvements

### Planned Features
- Voice control support
- Customizable color schemes
- Additional accessibility modes
- Performance monitoring

### Accessibility Standards
- WCAG 2.1 AA compliance
- Section 508 compliance
- International accessibility standards

## Support

For accessibility issues or questions:
1. Check user preferences and device settings
2. Test with different visualization modes
3. Verify browser compatibility
4. Review accessibility guidelines

## Related Files

- `src/components/HeroVisual.tsx` - Original component
- `src/components/MobileHeroVisual.tsx` - Mobile version
- `src/components/AccessibleHeroVisual.tsx` - Accessible version
- `src/app/globals.css` - Accessibility styles
- `src/app/[locale]/page.tsx` - Implementation
