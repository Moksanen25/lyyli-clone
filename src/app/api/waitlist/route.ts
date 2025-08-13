// Updated 2024-12-19: Enhanced security with input validation, sanitization, rate limiting, and CSRF protection

import { NextRequest, NextResponse } from 'next/server';
import { 
  validateInput, 
  sanitizeInput, 
  VALIDATION_PATTERNS, 
  checkRateLimit, 
  getClientIP, 
  sanitizeUserAgent,
  createSecureError,
  isGDPRCompliant,
  shouldRetainData
} from '@/lib/security';
import { requireAdminAuth } from '@/lib/auth';

// GDPR-compliant data structure
interface WaitlistSubmission {
  id: string;
  email: string;
  company: string;
  role: string;
  phone?: string;
  countryCode?: string;
  organizationSize: string;
  gdprConsent: boolean;
  securityConsent: boolean;
  timestamp: string;
  source: string;
  ipAddress: string;
  userAgent: string;
  csrfToken: string;
}

// In-memory storage (replace with proper database in production)
const submissions: WaitlistSubmission[] = [];

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(`waitlist:${clientIP}`, 3, 60000); // 3 requests per minute
    
    if (!rateLimit.isAllowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetTime.toString(),
            'Retry-After': '60'
          }
        }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    const { email, company, role, organizationSize, gdprConsent, securityConsent, timestamp, source, csrfToken } = body;
    
    if (!email || !company || !role || !organizationSize || !gdprConsent || !securityConsent || !csrfToken) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Input validation with sanitization
    const emailValidation = validateInput(email, VALIDATION_PATTERNS.EMAIL, 'Email');
    if (!emailValidation.isValid) {
      return NextResponse.json(
        { error: emailValidation.error },
        { status: 400 }
      );
    }

    const companyValidation = validateInput(company, VALIDATION_PATTERNS.COMPANY, 'Company');
    if (!companyValidation.isValid) {
      return NextResponse.json(
        { error: companyValidation.error },
        { status: 400 }
      );
    }

    const roleValidation = validateInput(role, VALIDATION_PATTERNS.ROLE, 'Role');
    if (!roleValidation.isValid) {
      return NextResponse.json(
        { error: roleValidation.error },
        { status: 400 }
      );
    }

    // Validate organization size (whitelist approach)
    const validOrgSizes = ['1-10', '10-50', '50-100', '100-500', '500+'];
    if (!validOrgSizes.includes(organizationSize)) {
      return NextResponse.json(
        { error: 'Invalid organization size selection' },
        { status: 400 }
      );
    }

    // Validate phone if provided
    if (body.phone) {
      const phoneValidation = validateInput(body.phone, VALIDATION_PATTERNS.PHONE, 'Phone');
      if (!phoneValidation.isValid) {
        return NextResponse.json(
          { error: phoneValidation.error },
          { status: 400 }
        );
      }
    }

    // Validate country code if provided
    if (body.countryCode) {
      const validCountryCodes = ['+358', '+46', '+47', '+45', '+31', '+49', '+33', '+44', '+1', '+86', '+81', '+91', '+61', '+64'];
      if (!validCountryCodes.includes(body.countryCode)) {
        return NextResponse.json(
          { error: 'Invalid country code' },
          { status: 400 }
        );
      }
    }

    // Validate GDPR consent
    if (!gdprConsent || !securityConsent) {
      return NextResponse.json(
        { error: 'GDPR and security consent are required' },
        { status: 400 }
      );
    }

    // Create submission with GDPR compliance and sanitized data
    const submission: WaitlistSubmission = {
      id: Date.now().toString(),
      email: sanitizeInput(email).toLowerCase(),
      company: sanitizeInput(company),
      role: sanitizeInput(role),
      phone: body.phone ? sanitizeInput(body.phone) : undefined,
      countryCode: body.countryCode,
      organizationSize,
      gdprConsent,
      securityConsent,
      timestamp,
      source: sanitizeInput(source),
      ipAddress: clientIP,
      userAgent: sanitizeUserAgent(request.headers.get('user-agent')),
      csrfToken: sanitizeInput(csrfToken)
    };

    // Store submission
    submissions.push(submission);

    // Clean up old data (GDPR compliance)
    const now = Date.now();
    const retentionPeriod = 2555 * 24 * 60 * 60 * 1000; // 7 years in milliseconds
    
    for (let i = submissions.length - 1; i >= 0; i--) {
      const submissionDate = new Date(submissions[i].timestamp).getTime();
      if (now - submissionDate > retentionPeriod) {
        submissions.splice(i, 1);
      }
    }

    // Log successful submission (in production, use proper logging service)
    console.log(`New waitlist submission from ${submission.email} at ${submission.timestamp}`);

    return NextResponse.json({
      success: true,
      message: 'Successfully joined waitlist',
      id: submission.id
    }, {
      headers: {
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': rateLimit.resetTime.toString()
      }
    });

  } catch (error) {
    console.error('Error processing waitlist submission:', error);
    
    // Return secure error message
    const secureError = createSecureError('Waitlist submission failed');
    
    return NextResponse.json(
      secureError,
      { status: 500 }
    );
  }
}

// Updated 2024-12-19: Added authentication requirement for admin access

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
        email: sub.email,
        company: sub.company,
        role: sub.role,
        phone: sub.phone,
        countryCode: sub.countryCode,
        organizationSize: sub.organizationSize,
        gdprConsent: sub.gdprConsent,
        securityConsent: sub.securityConsent,
        timestamp: sub.timestamp,
        source: sub.source
        // Note: Not returning IP, User-Agent, or CSRF token for privacy
      })),
      total: submissions.length
    });

  } catch (error) {
    console.error('Error retrieving waitlist submissions:', error);
    
    // Return secure error message
    const secureError = createSecureError('Failed to retrieve waitlist submissions');
    
    return NextResponse.json(
      secureError,
      { status: 500 }
    );
  }
}
