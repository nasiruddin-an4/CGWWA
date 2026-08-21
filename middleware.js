import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Helper to verify the token without using the node-specific `crypto` module,
// as Next.js middleware runs on Edge runtime.
async function verifyAuth(token) {
  try {
    const secret = process.env.JWT_SECRET;
    const key = new TextEncoder().encode(secret);
    const verified = await jwtVerify(token, key);
    return verified.payload;
  } catch (err) {
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Protect all /admin routes except the login page, and all /api/admin routes
  const isAdminPage = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');
  const isAdminApi = pathname.startsWith('/api/admin') && pathname !== '/api/admin/seed'; // Allow seed for initial setup, or maybe not. Let's protect seed as well.

  if (isAdminPage || pathname.startsWith('/api/admin')) {
    const token = request.cookies.get('admin_token')?.value;

    // If no token exists
    if (!token) {
      if (pathname.startsWith('/api/admin')) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Verify token
    const verifiedToken = await verifyAuth(token);
    
    // If token is invalid
    if (!verifiedToken) {
      if (pathname.startsWith('/api/admin')) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      // Clear the invalid cookie
      response.cookies.delete('admin_token');
      return response;
    }
  }

  // If user is already logged in and tries to access login page, redirect to dashboard
  if (pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_token')?.value;
    if (token) {
      const verifiedToken = await verifyAuth(token);
      if (verifiedToken) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
