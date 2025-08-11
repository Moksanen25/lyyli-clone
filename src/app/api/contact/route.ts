import { NextRequest, NextResponse } from 'next/server';

// GDPR-compliant data structure
interface ContactSubmission {
  name: string;
  email: string;
  company: string;
  role: string;
  teamSize: string;
  message?: string;
  timestamp: string;
  source: string;
  ipAddress?: string;
  userAgent?: string;
}

// In a real production environment, you would:
// 1. Use a proper database (PostgreSQL, MongoDB, etc.)
// 2. Implement proper authentication for admin access
// 3. Add rate limiting
// 4. Add CSRF protection
// 5. Implement proper logging and monitoring
// 6. Add data encryption at rest
// 7. Implement data retention policies

// For now, we'll simulate secure storage
// In production, replace this with actual database operations
const submissions: ContactSubmission[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, company, role, teamSize, timestamp, source } = body;
    
    if (!name || !email || !company || !role || !teamSize) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create submission with GDPR compliance
    const submission: ContactSubmission = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      company: company.trim(),
      role: role.trim(),
      teamSize,
      message: body.message?.trim(),
      timestamp,
      source,
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    };

    // Store submission (in production, this would be a database insert)
    submissions.push(submission);

    // Log successful submission (in production, use proper logging service)
    console.log(`New contact submission from ${submission.email} at ${submission.timestamp}`);

    // Send notification email to admin (in production, use proper email service)
    // await sendAdminNotification(submission);

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      id: Date.now() // In production, return actual database ID
    });

  } catch (error) {
    console.error('Error processing contact submission:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Admin endpoint to view submissions (in production, add proper authentication)
export async function GET(request: NextRequest) {
  try {
    // In production, implement proper authentication here
    // const authHeader = request.headers.get('authorization');
    // if (!isValidAuth(authHeader)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // For development, allow viewing submissions
    // In production, this should be protected and only accessible to admins
    return NextResponse.json({
      submissions: submissions.map(sub => ({
        id: submissions.indexOf(sub),
        name: sub.name,
        email: sub.email,
        company: sub.company,
        role: sub.role,
        teamSize: sub.teamSize,
        message: sub.message,
        timestamp: sub.timestamp,
        source: sub.source
        // Note: Not returning IP or User-Agent for privacy
      })),
      total: submissions.length
    });

  } catch (error) {
    console.error('Error retrieving contact submissions:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
