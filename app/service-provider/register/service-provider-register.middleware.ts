import { ROUTES } from "@/lib/constants/routes";
import { UserInfo } from "@/lib/api/types";
import { NextRequest, NextResponse } from "next/server";

export interface AuthMiddleware {
  request: NextRequest;
  response: NextResponse;
  user: UserInfo | null;
}

export async function serviceProviderRegisterMiddleware({
  request,
  response,
  user,
}: AuthMiddleware) {
  // Check if the request is for the service provider registration route

  if (
    request.nextUrl.pathname.startsWith(
      ROUTES.SERVICE_PROVIDER_REGISTRATION_FORM
    )
  ) {
    if (user) {
      // User is authenticated, allow access
      // Additional role-based checks can be added here
    } else {
      // User is not authenticated, redirect to register
      const url = request.nextUrl.clone();
      url.pathname = ROUTES.REGISTER;
      url.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  // For other routes, just proceed with the request
  return response;
}
