/**
 * Canonical host utilities
 * Ensures all URLs use the canonical host (lyyli.ai without www)
 */

import type { NextRequest } from 'next/server';

export const CANONICAL_HOST = 'lyyli.ai';
export const CANONICAL_URL = `https://${CANONICAL_HOST}`;

/**
 * Get the canonical host for the current environment
 * In production, always returns the canonical host
 * In development, returns localhost for local development
 */
export function getCanonicalHost(): string {
  if (process.env.NODE_ENV === 'production') {
    return CANONICAL_HOST;
  }
  
  // In development, use localhost
  return 'localhost:3000';
}

/**
 * Get the canonical base URL for the current environment
 */
export function getCanonicalBaseUrl(): string {
  if (process.env.NODE_ENV === 'production') {
    return CANONICAL_URL;
  }
  
  // In development, use localhost
  return 'http://localhost:3000';
}

/**
 * Check if a hostname is the canonical host
 */
export function isCanonicalHost(hostname: string): boolean {
  return hostname === CANONICAL_HOST;
}

/**
 * Check if a hostname should redirect to canonical
 */
export function shouldRedirectToCanonical(hostname: string): boolean {
  // Only redirect in production
  if (process.env.NODE_ENV !== 'production') {
    return false;
  }
  
  // Don't redirect if already on canonical host
  if (hostname === CANONICAL_HOST) {
    return false;
  }
  
  // Only redirect specific variants to prevent loops
  const redirectVariants = [
    'www.lyyli.ai',
    // Add other specific variants that should redirect
  ];
  
  return redirectVariants.includes(hostname);
}

/**
 * Get redirect URL for non-canonical hosts
 */
export function getCanonicalRedirectUrl(request: NextRequest): URL {
  const url = request.nextUrl.clone();
  url.hostname = CANONICAL_HOST;
  url.protocol = 'https:';
  return url;
}

/**
 * Validate that a URL uses the canonical host
 */
export function validateCanonicalHost(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const hasCanonicalHost = urlObj.hostname === CANONICAL_HOST;
    const hasNoPort = urlObj.port === ''; // Only empty port is canonical
    return hasCanonicalHost && hasNoPort;
  } catch {
    return false;
  }
}

/**
 * Convert any URL to use the canonical host
 */
export function toCanonicalUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    urlObj.hostname = CANONICAL_HOST;
    urlObj.protocol = 'https:';
    urlObj.port = ''; // Remove port for canonical URL
    return urlObj.toString();
  } catch {
    return url;
  }
}
