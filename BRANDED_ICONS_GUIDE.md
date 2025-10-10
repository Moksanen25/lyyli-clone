# Branded Integration Icons Guide

## Overview

All branded integration icons for external services (Slack, Teams, Instagram, Facebook, etc.) are now centralized in the `IconSet` component for easy reuse across the application.

## Available Branded Icons

The following branded icons are available in `src/components/IconSet.tsx`:

### Communication & Collaboration
- **`IconSet.Slack`** - Slack (official brand colors)
- **`IconSet.MicrosoftTeams`** - Microsoft Teams
- **`IconSet.Gmail`** - Google Gmail
- **`IconSet.Outlook`** - Microsoft Outlook

### Social Media
- **`IconSet.LinkedIn`** - LinkedIn
- **`IconSet.Facebook`** - Facebook
- **`IconSet.Instagram`** - Instagram (with gradient)
- **`IconSet.Threads`** - Threads
- **`IconSet.XTwitter`** - X (formerly Twitter)

### Enterprise
- **`IconSet.SharePoint`** - Microsoft SharePoint

## Usage Examples

### Basic Usage

```tsx
import { IconSet } from "@/components/IconSet";

// Default size (24px)
<IconSet.Slack />

// Custom size
<IconSet.MicrosoftTeams size={32} />

// With custom className
<IconSet.Gmail className="opacity-80" size={40} />
```

### In a Component

```tsx
import { IconSet } from "@/components/IconSet";

export default function IntegrationCard() {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
        <IconSet.Slack size={32} />
      </div>
      <div>
        <h3>Slack Integration</h3>
        <p>Connect your Slack workspace</p>
      </div>
    </div>
  );
}
```

### Dynamic Icon Selection

```tsx
import { IconSet } from "@/components/IconSet";

const integrations = [
  { name: 'Slack', icon: IconSet.Slack },
  { name: 'Teams', icon: IconSet.MicrosoftTeams },
  { name: 'Gmail', icon: IconSet.Gmail },
];

export default function IntegrationList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {integrations.map((integration) => {
        const Icon = integration.icon;
        return (
          <div key={integration.name}>
            <Icon size={48} />
            <p>{integration.name}</p>
          </div>
        );
      })}
    </div>
  );
}
```

## Icon Properties

All branded icons accept the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `24` | Width and height in pixels |
| `className` | `string` | `""` | Additional CSS classes |

## Design Guidelines

### Brand Colors
- All icons use official brand colors
- Colors are hardcoded in the SVG paths
- No need to apply custom colors via className

### Sizing Recommendations
- **Small**: 16-20px (for inline text)
- **Medium**: 24-32px (for cards, buttons)
- **Large**: 48-64px (for hero sections)

### Background Usage
Branded icons look great with subtle backgrounds:

```tsx
// Light background
<div className="bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-xl p-3">
  <IconSet.Slack size={32} />
</div>

// White background with shadow
<div className="bg-white rounded-xl p-4 shadow-md">
  <IconSet.Gmail size={40} />
</div>
```

## Benefits of Centralized Icons

1. **Consistency** - Same icons used throughout the app
2. **Maintainability** - Update once, affects all instances
3. **Type Safety** - TypeScript support for all icon props
4. **Performance** - No icon library overhead, only what you use
5. **Brand Compliance** - Official brand colors preserved
6. **SSR Safe** - Works correctly with Next.js server-side rendering (no hydration issues)

## Adding New Icons

To add a new branded icon:

1. Find the official SVG from the brand's resources
2. Add it to `src/components/IconSet.tsx` following the existing pattern:

```tsx
NewBrand: ({
  className = "",
  size = 24,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    {/* SVG paths here */}
  </svg>
),
```

3. Use it anywhere with `<IconSet.NewBrand />`

## Migration Notes

The `IntegrationsFlow.tsx` component has been updated to use these centralized icons instead of inline SVGs. This reduces code duplication and makes the codebase more maintainable.

Before:
```tsx
<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
  {/* 10+ lines of SVG paths */}
</svg>
```

After:
```tsx
<IconSet.Slack size={32} />
```

## Technical Notes

### Instagram Icon with Gradient
The Instagram icon uses a radial gradient for its iconic multi-color appearance. To prevent conflicts when multiple Instagram icons are rendered on the same page, it uses React's `useId()` hook to generate unique gradient IDs. This also ensures proper server-side rendering without hydration mismatches.

### Server-Side Rendering (SSR)
All icons are marked with `"use client"` and are safe to use in Next.js applications with SSR enabled. The Instagram icon specifically uses `useId()` instead of random ID generation to ensure stable IDs across server and client renders.

## Related Files

- `src/components/IconSet.tsx` - Main icon definitions
- `src/components/features/IntegrationsFlow.tsx` - Example usage
- Any other component can import and use these icons

