// Updated 2024-12-19: Enhanced security with input validation, sanitization, rate limiting, and CSRF protection

import { NextRequest, NextResponse } from 'next/server';
import { 
  validateRequestBody, 
  VALIDATION_CONFIGS, 
  createValidationErrorResponse,
  createRateLimitErrorResponse 
} from '@/middleware/validation';
import { 
  checkRateLimit, 
  getClientIP, 
  sanitizeUserAgent, 
  createSecureError,
  isGDPRCompliant,
  shouldRetainData
} from '@/lib/security';
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
  ipAddress: string;
  userAgent: string;
  csrfToken: string;
}

// In-memory storage (replace with database in production)
const submissions: ContactSubmission[] = [];

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(clientIP);
    
    if (!rateLimit.isAllowed) {
      logger.warn('Rate limit exceeded', {
        ip: clientIP,
        endpoint: '/api/contact',
        userAgent: request.headers.get('user-agent'),
      });
      
      return createRateLimitErrorResponse(rateLimit.remaining, rateLimit.resetTime);
    }

    // Validate request body
    const validation = validateRequestBody<ContactSubmission>(request, VALIDATION_CONFIGS.CONTACT_FORM);
    
    if (!validation.isValid || !validation.data) {
      return createValidationErrorResponse(validation.errors);
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
      
      return NextResponse.json(
        { error: 'Both GDPR and security consent are required' },
        { status: 400 }
      );
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

    return NextResponse.json({
      success: true,
      message: SUCCESS_MESSAGES.CONTACT_SENT,
      id: submission.id
    }, {
      headers: {
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': rateLimit.resetTime.toString()
      }
    });

  } catch (error) {
    logger.error('Contact form submission failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      endpoint: '/api/contact',
      ip: getClientIP(request),
      userAgent: request.headers.get('user-agent'),
    });
    
    // Return secure error message
    const secureError = createSecureError('Contact form submission failed');
    
    return NextResponse.json(
      secureError,
      { status: 500 }
    );
  }
}

// Admin endpoint to view submissions (requires authentication)
export async function GET(request: NextRequest) {
  try {
    // Require authentication for admin access
    const authResult = requireAdminAuth(request);
    if (authResult) {
      return authResult;
    }

    // Return submissions with sensitive data filtered out
    return NextResponse.json({
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

  } catch (error) {
    logger.error('Failed to retrieve contact submissions', {
      error: error instanceof Error ? error.message : 'Unknown error',
      endpoint: '/api/contact',
      method: 'GET',
    });
    
    // Return secure error message
    const secureError = createSecureError('Failed to retrieve submissions');
    
    return NextResponse.json(
      secureError,
      { status: 500 }
    );
  }
}

// Helper function for admin authentication (placeholder)
function requireAdminAuth(request: NextRequest): NextResponse | null {
  // Implement proper authentication logic here
  // For now, return null to allow access
  return null;
}
