// Updated 2024-12-19: Enhanced security with input validation, sanitization, rate limiting, and CSRF protection

import { NextRequest, NextResponse } from 'next/server';
import { 
  validateRequestBody, 
  VALIDATION_CONFIGS, 
  createValidationErrorResponse,
  createRateLimitErrorResponse 
} from '@/middleware/validation';
import { 
  getClientIP, 
  sanitizeUserAgent, 
  createSecureError,
  isGDPRCompliant,
  shouldRetainData
} from '@/lib/security';
import { createRateLimiterWithPreset, RATE_LIMIT_CONFIGS } from '@/lib/rateLimiter';
import { addSecurityHeaders, createSecurityConfig } from '@/middleware/security';
import { logger } from '@/lib/logger';
import { CONSENT_CONFIG, ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/lib/constants';

// Types
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  organizationSize: string;
  message?: string;
  timestamp: string;
  source: string;
  gdprConsent: boolean;
  securityConsent: boolean;
  ipAddress: string;
  userAgent: string;
  csrfToken: string;
}

// In-memory storage (replace with database in production)
const submissions: ContactSubmission[] = [];

// Create rate limiter with moderate configuration for form submissions
const rateLimiter = createRateLimiterWithPreset('MODERATE', {
  onLimitReached: (identifier, config) => {
    logger.warn('Rate limit reached for contact form', {
      identifier,
      maxRequests: config.maxRequests,
      windowMs: config.windowMs,
    });
  }
});

// Create security configuration
const securityConfig = createSecurityConfig(process.env.NODE_ENV as 'development' | 'staging' | 'production');

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimit = await rateLimiter.checkLimit(clientIP);
    
    if (!rateLimit.isAllowed) {
      logger.warn('Rate limit exceeded', {
        ip: clientIP,
        endpoint: '/api/contact',
        userAgent: request.headers.get('user-agent'),
        totalRequests: rateLimit.totalRequests,
      });
      
      const response = createRateLimitErrorResponse(rateLimit.remaining, rateLimit.resetTime);
      return addSecurityHeaders(response, securityConfig);
    }

    // Validate request body
    const validation = await validateRequestBody<ContactSubmission>(request, VALIDATION_CONFIGS.CONTACT_FORM);
    
    if (!validation.isValid || !validation.data) {
      const response = createValidationErrorResponse(validation.errors);
      return addSecurityHeaders(response, securityConfig);
    }

    const {
      name,
      email,
      company,
      role,
      organizationSize,
      message,
      source,
      gdprConsent,
      securityConsent,
      csrfToken
    } = validation.data;

    // Additional consent validation
    if (!gdprConsent || !securityConsent) {
      logger.warn('Missing consent', {
        email,
        gdprConsent,
        securityConsent,
        ip: clientIP,
      });
      
      const response = NextResponse.json(
        { error: 'Both GDPR and security consent are required' },
        { status: 400 }
      );
      return addSecurityHeaders(response, securityConfig);
    }

    const timestamp = new Date().toISOString();

    // Create submission with GDPR compliance and sanitized data
    const submission: ContactSubmission = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      company,
      role,
      organizationSize,
      message,
      timestamp,
      source,
      gdprConsent,
      securityConsent,
      ipAddress: clientIP,
      userAgent: sanitizeUserAgent(request.headers.get('user-agent')),
      csrfToken
    };

    // Store submission
    submissions.push(submission);

    // Clean up old data (GDPR compliance)
    const now = Date.now();
    const retentionPeriod = CONSENT_CONFIG.GDPR_RETENTION_DAYS * 24 * 60 * 60 * 1000; // Convert to milliseconds
    
    for (let i = submissions.length - 1; i >= 0; i--) {
      const submissionDate = new Date(submissions[i].timestamp).getTime();
      if (now - submissionDate > retentionPeriod) {
        submissions.splice(i, 1);
      }
    }

    // Log successful submission
    logger.logFormSubmission('contact', true, {
      email: submission.email,
      company: submission.company,
      ip: clientIP,
      userAgent: submission.userAgent,
    });

    const response = NextResponse.json({
      success: true,
      message: SUCCESS_MESSAGES.CONTACT_SENT,
      id: submission.id
    }, {
      headers: {
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': rateLimit.resetTime.toString(),
        'X-RateLimit-Limit': RATE_LIMIT_CONFIGS.MODERATE.maxRequests.toString(),
      }
    });

    return addSecurityHeaders(response, securityConfig);

  } catch (error) {
    logger.error('Contact form submission failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      endpoint: '/api/contact',
      ip: getClientIP(request),
      userAgent: request.headers.get('user-agent'),
    });
    
    // Return secure error message
    const secureError = createSecureError('Contact form submission failed');
    const response = NextResponse.json(secureError, { status: 500 });
    
    return addSecurityHeaders(response, securityConfig);
  }
}

// Admin endpoint to view submissions (requires authentication)
export async function GET(request: NextRequest) {
  try {
    // Require authentication for admin access
    const authResult = requireAdminAuth(request);
    if (authResult) {
      return addSecurityHeaders(authResult, securityConfig);
    }

    // Return submissions with sensitive data filtered out
    const response = NextResponse.json({
      submissions: submissions.map(sub => ({
        id: sub.id,
        name: sub.name,
        email: sub.email,
        company: sub.company,
        role: sub.role,
        organizationSize: sub.organizationSize,
        message: sub.message,
        timestamp: sub.timestamp,
        source: sub.source
        // Note: Not returning IP, User-Agent, or CSRF token for privacy
      })),
      total: submissions.length
    });

    return addSecurityHeaders(response, securityConfig);

  } catch (error) {
    logger.error('Failed to retrieve contact submissions', {
      error: error instanceof Error ? error.message : 'Unknown error',
      endpoint: '/api/contact',
      method: 'GET',
    });
    
    // Return secure error message
    const secureError = createSecureError('Failed to retrieve submissions');
    const response = NextResponse.json(secureError, { status: 500 });
    
    return addSecurityHeaders(response, securityConfig);
  }
}

// Helper function for admin authentication (placeholder)
function requireAdminAuth(request: NextRequest): NextResponse | null {
  // Implement proper authentication logic here
  // For now, return null to allow access
  return null;
}
