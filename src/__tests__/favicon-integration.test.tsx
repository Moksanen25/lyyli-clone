/**
 * @jest-environment jsdom
 */

import fs from 'fs';
import path from 'path';

describe('Favicon File Structure Integration Tests', () => {
  const publicDir = path.join(process.cwd(), 'public');
  const iconsDir = path.join(publicDir, 'icons');

  test('should have all required favicon files in public directory', () => {
    const requiredFiles = [
      'favicon.ico',
      'favicon.svg',
      'site.webmanifest',
      'browserconfig.xml'
    ];

    requiredFiles.forEach(file => {
      const filePath = path.join(publicDir, file);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  test('should have all required icon files in icons directory', () => {
    const requiredIconFiles = [
      'favicon-16x16.png',
      'favicon-32x32.png',
      'apple-touch-icon.png',
      'icon-192x192.png',
      'icon-512x512.png',
      'android-chrome-192x192.png',
      'android-chrome-512x512.png'
    ];

    requiredIconFiles.forEach(file => {
      const filePath = path.join(iconsDir, file);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  test('should have proper site.webmanifest structure', () => {
    const manifestPath = path.join(publicDir, 'site.webmanifest');
    const manifestContent = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    // Check required manifest properties
    expect(manifestContent.name).toBe('Lyyli.ai - AI Communication Assistant');
    expect(manifestContent.short_name).toBe('Lyyli.ai');
    expect(manifestContent.theme_color).toBe('#2F5D50');
    expect(manifestContent.background_color).toBe('#2F5D50');
    expect(manifestContent.display).toBe('standalone');
    expect(manifestContent.start_url).toBe('/');
    expect(manifestContent.scope).toBe('/');

    // Check icons array
    expect(Array.isArray(manifestContent.icons)).toBe(true);
    expect(manifestContent.icons.length).toBeGreaterThan(0);

    // Check that all required icon sizes are present
    const iconSizes = manifestContent.icons.map((icon: any) => icon.sizes);
    const requiredSizes = ['16x16', '32x32', '180x180', '192x192', '512x512'];
    
    requiredSizes.forEach(size => {
      expect(iconSizes).toContain(size);
    });
  });

  test('should have proper browserconfig.xml structure', () => {
    const browserConfigPath = path.join(publicDir, 'browserconfig.xml');
    const browserConfigContent = fs.readFileSync(browserConfigPath, 'utf8');

    // Check for required XML structure
    expect(browserConfigContent).toContain('<?xml version="1.0" encoding="utf-8"?>');
    expect(browserConfigContent).toContain('<browserconfig>');
    expect(browserConfigContent).toContain('<msapplication>');
    expect(browserConfigContent).toContain('<tile>');
    expect(browserConfigContent).toContain('#2F5D50'); // Theme color
  });

  test('should not have conflicting favicon.ico in app directory', () => {
    const appFaviconPath = path.join(process.cwd(), 'src', 'app', 'favicon.ico');
    expect(fs.existsSync(appFaviconPath)).toBe(false);
  });

  test('should have valid favicon file sizes', () => {
    const faviconFiles = [
      { name: 'favicon.ico', path: path.join(publicDir, 'favicon.ico') },
      { name: 'favicon-16x16.png', path: path.join(iconsDir, 'favicon-16x16.png') },
      { name: 'favicon-32x32.png', path: path.join(iconsDir, 'favicon-32x32.png') },
      { name: 'apple-touch-icon.png', path: path.join(iconsDir, 'apple-touch-icon.png') },
      { name: 'icon-192x192.png', path: path.join(iconsDir, 'icon-192x192.png') },
      { name: 'icon-512x512.png', path: path.join(iconsDir, 'icon-512x512.png') }
    ];

    faviconFiles.forEach(({ name, path: filePath }) => {
      const stats = fs.statSync(filePath);
      expect(stats.size).toBeGreaterThan(0);
      expect(stats.size).toBeLessThan(100000); // Should be under 100KB
    });
  });
});
