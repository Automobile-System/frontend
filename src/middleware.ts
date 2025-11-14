import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes and their required roles
const routeRoleMap: Record<string, string[]> = {
  '/customer': ['CUSTOMER'],
  '/admin': ['ADMIN'],
  '/manager': ['MANAGER'],
  '/employee': ['EMPLOYEE'],
};

// Public routes that don't require authentication
const publicRoutes = ['/', '/login', '/signup', '/about', '/contact', '/packages', '/employee-signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if route is public
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))) {
    return NextResponse.next();
  }

  // Get access token from cookies
  const accessToken = request.cookies.get('accessToken')?.value;

  // If no token, redirect to login
  if (!accessToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verify user role and check access
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `accessToken=${accessToken}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      // Invalid token, redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const redirectResponse = NextResponse.redirect(loginUrl);
      redirectResponse.cookies.delete('accessToken');
      return redirectResponse;
    }

    const user = await response.json();
    
    // Extract user role (handle both 'role' and 'roles' array)
    let userRole = user.role;
    if (!userRole && user.roles && Array.isArray(user.roles) && user.roles.length > 0) {
      userRole = user.roles[0];
    }

    // Check if user has access to the requested route
    for (const [route, allowedRoles] of Object.entries(routeRoleMap)) {
      if (pathname.startsWith(route)) {
        const hasAccess = allowedRoles.some(
          role => userRole?.toUpperCase() === role.toUpperCase()
        );

        if (!hasAccess) {
          // User doesn't have permission, redirect to their dashboard
          const dashboardUrl = getDashboardUrlByRole(userRole);
          return NextResponse.redirect(new URL(dashboardUrl, request.url));
        }
        break;
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // On error, redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
}

function getDashboardUrlByRole(role: string): string {
  switch (role?.toUpperCase()) {
    case 'CUSTOMER':
      return '/customer/dashboard';
    case 'ADMIN':
      return '/admin/dashboard';
    case 'MANAGER':
      return '/manager/dashboard';
    case 'EMPLOYEE':
      return '/employee/dashboard';
    default:
      return '/login';
  }
}

export const config = {
  matcher: [
    '/customer/:path*',
    '/admin/:path*',
    '/manager/:path*',
    '/employee/:path*',
    '/booking/:path*',
    '/projects/:path*',
  ],
}
