import { type NextRequest } from "next/server";
import { redirect } from "next/navigation";

/**
 * Email/OTP confirmation handler
 * This route is no longer used with the new .NET backend
 * OTP verification is now handled through the /api/Auth/phone/verify endpoint
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const next = searchParams.get("next") ?? "/";

  // Redirect to the specified URL or home
  redirect(next);
}
