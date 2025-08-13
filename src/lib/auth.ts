// Updated 2024-12-19: Created authentication middleware for admin route protection

import { NextRequest, NextResponse } from 'next/server';

// Simple admin authentication (in production, use proper JWT or session-based auth)
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'changeme',
};

export interface AuthenticatedRequest extends NextRequest {
  isAuthenticated?: boolean;
  adminUser?: string;
}

// Basic authentication middleware
export function requireAuth(request: NextRequest): NextResponse | null {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { 
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Access"'
        }
      }
    );
  }
  
  try {
    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString();
    const [username, password] = credentials.split(':');
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      return null; // Authentication successful
    }
  } catch {
    // Invalid authorization header
  }
  
  return NextResponse.json(
    { error: 'Invalid credentials' },
    { status: 401 }
  );
}

// Session-based authentication (more secure for production)
export interface AdminSession {
  id: string;
  username: string;
  expiresAt: number;
  lastActivity: number;
}

const activeSessions = new Map<string, AdminSession>();

export function createAdminSession(username: string): string {
  const sessionId = Math.random().toString(36).substring(2, 15) + 
                   Math.random().toString(36).substring(2, 15);
  
  const session: AdminSession = {
    id: sessionId,
    username,
    expiresAt: Date.now() + (30 * 60 * 1000), // 30 minutes
    lastActivity: Date.now()
  };
  
  activeSessions.set(sessionId, session);
  
  // Clean up expired sessions
  cleanupExpiredSessions();
  
  return sessionId;
}

export function validateAdminSession(sessionId: string): boolean {
  const session = activeSessions.get(sessionId);
  
  if (!session) return false;
  
  if (Date.now() > session.expiresAt) {
    activeSessions.delete(sessionId);
    return false;
  }
  
  // Update last activity
  session.lastActivity = Date.now();
  activeSessions.set(sessionId, session);
  
  return true;
}

export function invalidateAdminSession(sessionId: string): void {
  activeSessions.delete(sessionId);
}

function cleanupExpiredSessions(): void {
  const now = Date.now();
  
  for (const [sessionId, session] of activeSessions.entries()) {
    if (now > session.expiresAt) {
      activeSessions.delete(sessionId);
    }
  }
}

// Enhanced authentication middleware with session support
export function requireAdminAuth(request: NextRequest): NextResponse | null {
  // Check for session cookie first
  const sessionCookie = request.cookies.get('admin-session')?.value;
  
  if (sessionCookie && validateAdminSession(sessionCookie)) {
    return null; // Session is valid
  }
  
  // Fall back to basic auth
  return requireAuth(request);
}

// Login handler for admin authentication
export async function handleAdminLogin(username: string, password: string): Promise<{ success: boolean; sessionId?: string; error?: string }> {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const sessionId = createAdminSession(username);
    return { success: true, sessionId };
  }
  
  return { success: false, error: 'Invalid credentials' };
}

// Logout handler
export function handleAdminLogout(sessionId: string): void {
  invalidateAdminSession(sessionId);
}

// Get current admin user from session
export function getCurrentAdminUser(sessionId: string): string | null {
  const session = activeSessions.get(sessionId);
  return session ? session.username : null;
}
