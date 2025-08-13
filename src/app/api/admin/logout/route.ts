// Updated 2024-12-19: Created admin logout API endpoint to securely invalidate sessions

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { invalidateAdminSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin-session')?.value;
    
    if (sessionCookie) {
      // Invalidate the session
      invalidateAdminSession(sessionCookie);
    }

    // Create response and clear the session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Logout successful'
    });

    response.cookies.set('admin-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Admin logout error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
