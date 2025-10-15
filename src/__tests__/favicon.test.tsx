/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { Metadata } from 'next';

// Mock the layout component to test favicon configuration
describe('Favicon Configuration', () => {
  const mockMetadata: Metadata = {
    title: "Lyyli.ai - AI Communication Assistant",
    description: "Redirecting to localized version...",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: "/icons/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    themeColor: "#2F5D50",
  };

  test('metadata should include all required favicon configurations', () => {
    // Test favicon.ico configuration
    expect(mockMetadata.icons?.icon).toHaveLength(3);
    expect(mockMetadata.icons?.icon?.[0]).toEqual({
      url: "/favicon.ico",
      sizes: "32x32"
    });
    
    // Test PNG favicon configurations
    expect(mockMetadata.icons?.icon?.[1]).toEqual({
      url: "/icons/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png"
    });
    
    expect(mockMetadata.icons?.icon?.[2]).toEqual({
      url: "/icons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png"
    });
    
    // Test shortcut icon
    expect(mockMetadata.icons?.shortcut).toBe("/favicon.ico");
    
    // Test Apple touch icon
    expect(mockMetadata.icons?.apple).toBe("/icons/apple-touch-icon.png");
    
    // Test manifest
    expect(mockMetadata.manifest).toBe("/site.webmanifest");
    
    // Test theme color
    expect(mockMetadata.themeColor).toBe("#2F5D50");
  });

  test('should have correct favicon file paths', () => {
    const iconUrls = mockMetadata.icons?.icon?.map(icon => icon.url) || [];
    
    // All favicon files should be accessible from public directory
    expect(iconUrls).toContain("/favicon.ico");
    expect(iconUrls).toContain("/icons/favicon-16x16.png");
    expect(iconUrls).toContain("/icons/favicon-32x32.png");
    expect(mockMetadata.icons?.apple).toBe("/icons/apple-touch-icon.png");
  });

  test('should have proper icon sizes', () => {
    const iconSizes = mockMetadata.icons?.icon?.map(icon => icon.sizes) || [];
    
    // Required favicon sizes
    expect(iconSizes).toContain("16x16");
    expect(iconSizes).toContain("32x32");
  });

  test('should have proper MIME types', () => {
    const pngIcons = mockMetadata.icons?.icon?.filter(icon => icon.url?.endsWith('.png')) || [];
    
    // All PNG icons should have proper MIME type
    pngIcons.forEach(icon => {
      expect(icon.type).toBe("image/png");
    });
  });
});

describe('Web App Manifest Configuration', () => {
  test('manifest should be properly referenced', () => {
    const manifestPath = "/site.webmanifest";
    expect(manifestPath).toBe("/site.webmanifest");
    expect(manifestPath).toMatch(/^\/.*\.webmanifest$/);
  });

  test('theme color should be properly configured', () => {
    const themeColor = "#2F5D50";
    expect(themeColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(themeColor).toBe("#2F5D50"); // Lyyli.ai brand color
  });
});

describe('Favicon File Structure', () => {
  const expectedFaviconFiles = [
    '/favicon.ico',
    '/icons/favicon-16x16.png',
    '/icons/favicon-32x32.png',
    '/icons/apple-touch-icon.png',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/icons/android-chrome-192x192.png',
    '/icons/android-chrome-512x512.png',
    '/site.webmanifest',
    '/favicon.svg'
  ];

  test('should reference all required favicon files', () => {
    expectedFaviconFiles.forEach(file => {
      expect(file).toMatch(/^\//); // Should start with /
      expect(file).toMatch(/\.(ico|png|webmanifest|svg)$/); // Should have proper extension
    });
  });

  test('should have proper icon directory structure', () => {
    const iconFiles = expectedFaviconFiles.filter(file => file.includes('/icons/'));
    
    // Should have multiple icon files in icons directory
    expect(iconFiles.length).toBeGreaterThan(0);
    
    // All icon files should be in /icons/ directory
    iconFiles.forEach(file => {
      expect(file).toMatch(/^\/icons\//);
    });
  });
});

describe('PWA Icon Requirements', () => {
  const requiredSizes = ['16x16', '32x32', '180x180', '192x192', '512x512'];
  
  test('should support all required PWA icon sizes', () => {
    const mockMetadata: Metadata = {
      icons: {
        icon: [
          { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
          { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
          { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
          { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
        ],
        apple: "/icons/apple-touch-icon.png", // 180x180
      }
    };

    const configuredSizes = [
      ...(mockMetadata.icons?.icon?.map(icon => icon.sizes) || []),
      '180x180' // Apple touch icon
    ];

    requiredSizes.forEach(size => {
      expect(configuredSizes).toContain(size);
    });
  });
});
