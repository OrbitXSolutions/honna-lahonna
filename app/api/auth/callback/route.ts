import { NextResponse } from "next/server";

/**
 * OAuth callback handler
 * This route is no longer used with the new .NET backend
 * Google OAuth now sends the ID token directly to the frontend,
 * which then sends it to the backend's /api/Auth/google-login endpoint
 */
export async function GET(request: Request) {
  const { origin } = new URL(request.url);

  // Redirect to home page - OAuth is now handled client-side
  return NextResponse.redirect(`${origin}/`);
}
