import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes
const protectedRoutes = ["/admin/dashboard", "/admin/courses", "/admin/profile"];

// Middleware function
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // If user is not logged in and tries to access a protected route, redirect to login
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // If user is logged in and tries to access login, redirect to dashboard
  if (token && pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: ["/admin/:path*"], // Apply to all /admin routes
};
