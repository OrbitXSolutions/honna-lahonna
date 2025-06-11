import { ROUTES } from "@/lib/constants/routes";
import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("Middleware triggered for request:", request.nextUrl.pathname);
  let modifiedRequest = await updateSession(request);
  console.log("Session updated, proceeding with request:", modifiedRequest.url);

  return modifiedRequest;
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
