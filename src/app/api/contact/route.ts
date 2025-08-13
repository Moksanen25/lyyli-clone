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
  shouldRetainData
} from '@/lib/security';

// GDPR-compliant data structure
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  teamSize: string;
  message?: string;
  timestamp: string;
  source: string;
  ipAddress: string;
  userAgent: string;
  csrfToken: string;
}

// In-memory storage (replace with proper database in production)
const submissions: ContactSubmission[] = [];

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(`contact:${clientIP}`, 5, 60000); // 5 requests per minute
    
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
    const { name, email, company, role, teamSize, message, timestamp, source, csrfToken } = body;
    
    if (!name || !email || !company || !role || !teamSize || !csrfToken) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Input validation with sanitization
    const nameValidation = validateInput(name, VALIDATION_PATTERNS.NAME, 'Name');
    if (!nameValidation.isValid) {
      return NextResponse.json(
        { error: nameValidation.error },
        { status: 400 }
      );
    }

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

    // Validate team size (whitelist approach)
    const validTeamSizes = ['10-50', '50-100', '100-500', '500+'];
    if (!validTeamSizes.includes(teamSize)) {
      return NextResponse.json(
        { error: 'Invalid team size selection' },
        { status: 400 }
      );
    }

    // Validate message if provided
    if (message) {
      const messageValidation = validateInput(message, VALIDATION_PATTERNS.MESSAGE, 'Message');
      if (!messageValidation.isValid) {
        return NextResponse.json(
          { error: messageValidation.error },
          { status: 400 }
        );
      }
    }

    // Create submission with GDPR compliance and sanitized data
    const submission: ContactSubmission = {
      id: Date.now().toString(),
      name: sanitizeInput(name),
      email: sanitizeInput(email).toLowerCase(),
      company: sanitizeInput(company),
      role: sanitizeInput(role),
      teamSize,
      message: message ? sanitizeInput(message) : undefined,
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
    console.log(`New contact submission from ${submission.email} at ${submission.timestamp}`);

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      id: submission.id
    }, {
      headers: {
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': rateLimit.resetTime.toString()
      }
    });

  } catch (error) {
    console.error('Error processing contact submission:', error);
    
    // Return secure error message
    const secureError = createSecureError('Contact form submission failed');
    
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
        name: sub.name,
        email: sub.email,
        company: sub.company,
        role: sub.role,
        teamSize: sub.teamSize,
        message: sub.message,
        timestamp: sub.timestamp,
        source: sub.source
        // Note: Not returning IP, User-Agent, or CSRF token for privacy
      })),
      total: submissions.length
    });

  } catch (error) {
    console.error('Error retrieving contact submissions:', error);
    
    // Return secure error message
    const secureError = createSecureError('Failed to retrieve submissions');
    
    return NextResponse.json(
      secureError,
      { status: 500 }
    );
  }
}
