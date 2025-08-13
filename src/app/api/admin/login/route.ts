// Updated 2024-12-19: Created admin login API endpoint with secure authentication

import { NextRequest, NextResponse } from 'next/server';
import { handleAdminLogin } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Attempt login
    const result = await handleAdminLogin(username, password);

    if (result.success && result.sessionId) {
      // Set secure session cookie
      const response = NextResponse.json({
        success: true,
        message: 'Login successful'
      });

      response.cookies.set('admin-session', result.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 60, // 30 minutes
        path: '/'
      });

      return response;
    } else {
      return NextResponse.json(
        { error: result.error || 'Invalid credentials' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Admin login error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
