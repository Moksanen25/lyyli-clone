// Updated 2024-12-19: Created security utilities for input validation, sanitization, and CSRF protection

import { NextRequest } from 'next/server';

// Input validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  NAME: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
  COMPANY: /^[a-zA-Z0-9À-ÿ\s&.,'-]{2,100}$/,
  ROLE: /^[a-zA-ZÀ-ÿ\s&.,'-]{2,100}$/,
  PHONE: /^[\+]?[0-9\s\-\(\)]{7,20}$/,
  MESSAGE: /^[a-zA-Z0-9À-ÿ\s.,!?@#$%^&*()_+\-=\[\]{};':"\\|<>\/\n\r]{0,1000}$/,
} as const;

// Input sanitization function
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length
}

// Input validation function
export function validateInput(
  value: string, 
  pattern: RegExp, 
  fieldName: string
): { isValid: boolean; error?: string } {
  if (!value || typeof value !== 'string') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  const sanitizedValue = sanitizeInput(value);
  
  if (sanitizedValue.length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters long` };
  }
  
  if (!pattern.test(sanitizedValue)) {
    return { isValid: false, error: `${fieldName} format is invalid` };
  }
  
  return { isValid: true };
}

// CSRF token generation and validation
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken && token.length > 0;
}

// Rate limiting helper
export interface RateLimitInfo {
  isAllowed: boolean;
  remaining: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string, 
  maxRequests: number = 10, 
  windowMs: number = 60000
): RateLimitInfo {
  const now = Date.now();
  const key = identifier;
  const record = rateLimitStore.get(key);
  
  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs
    });
    
    return {
      isAllowed: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs
    };
  }
  
  if (record.count >= maxRequests) {
    return {
      isAllowed: false,
      remaining: 0,
      resetTime: record.resetTime
    };
  }
  
  // Increment count
  record.count++;
  rateLimitStore.set(key, record);
  
  return {
    isAllowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime
  };
}

// Secure error message generation
export function createSecureError(
  message: string, 
  includeDetails: boolean = false
): { error: string; details?: string } {
  const secureMessage = 'An error occurred. Please try again later.';
  
  if (includeDetails) {
    return { error: secureMessage, details: message };
  }
  
  return { error: secureMessage };
}

// IP address extraction (for rate limiting)
export function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
         request.headers.get('x-real-ip') ||
         request.headers.get('cf-connecting-ip') ||
         'unknown';
}

// User agent sanitization
export function sanitizeUserAgent(userAgent: string | null): string {
  if (!userAgent) return 'unknown';
  
  return userAgent
    .substring(0, 200) // Limit length
    .replace(/[<>]/g, '') // Remove potential HTML
    .replace(/javascript:/gi, ''); // Remove javascript protocol
}

// GDPR compliance helpers
export function isGDPRCompliant(consent: boolean, timestamp: string): boolean {
  if (!consent) return false;
  
  const consentDate = new Date(timestamp);
  const now = new Date();
  const daysSinceConsent = (now.getTime() - consentDate.getTime()) / (1000 * 60 * 60 * 24);
  
  // Consent should be recent (within last 2 years)
  return daysSinceConsent <= 730;
}

// Data retention check
export function shouldRetainData(timestamp: string, retentionDays: number = 2555): boolean {
  const dataDate = new Date(timestamp);
  const now = new Date();
  const daysSinceData = (now.getTime() - dataDate.getTime()) / (1000 * 60 * 60 * 24);
  
  return daysSinceData <= retentionDays;
}
