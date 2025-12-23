import { ROUTES } from "@/lib/constants/routes";
import { NextResponse, type NextRequest } from "next/server";

// Routes that require authentication
const PROTECTED_ROUTES = [
  ROUTES.SERVICE_PROVIDER_REGISTRATION_FORM,
  ROUTES.SERVICE_PROVIDER_PROFILE,
  ROUTES.DASHBOARD,
  ROUTES.PROFILE,
  ROUTES.SETTINGS,
];

// Routes that should redirect to home if already authenticated
const AUTH_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
];

export async function middleware(request: NextRequest) {
  console.log("Middleware triggered for request:", request.nextUrl.pathname);

  const pathname = request.nextUrl.pathname;

  // Get the auth token from cookies (we'll set this from the client)
  const token = request.cookies.get("auth_token")?.value;
  const isAuthenticated = !!token;

  // Check if current path is protected
  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  // Check if current path is an auth route (login/register)
  const isAuthRoute = AUTH_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  // OTP route handling
  if (pathname.startsWith(ROUTES.OTP)) {
    // OTP page requires a phone number parameter
    if (!request.nextUrl.searchParams.has("phone")) {
      const url = request.nextUrl.clone();
      url.pathname = ROUTES.LOGIN;
      return NextResponse.redirect(url);
    }
  }

  // Set-phone route handling
  if (pathname.startsWith(ROUTES.SET_PHONE)) {
    // Set-phone requires authentication
    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = ROUTES.LOGIN;
      return NextResponse.redirect(url);
    }
  }

  // Redirect to login if trying to access protected route without auth
  if (isProtectedRoute && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.LOGIN;
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */

    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
