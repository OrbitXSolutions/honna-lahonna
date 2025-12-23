import { ROUTES } from "@/lib/constants/routes";
import { NextRequest, NextResponse } from "next/server";
import { UserInfo } from "@/lib/api/types";

export interface AuthMiddleware {
  request: NextRequest;
  response: NextResponse;
  user: UserInfo | null;
}

export async function otpMiddleware({
  request,
  response,
  user,
}: AuthMiddleware) {
  // Check if the request is for the OTP route

  if (request.nextUrl.pathname.startsWith(ROUTES.OTP)) {
    // OTP page requires a phone number parameter
    if (!request.nextUrl.searchParams.has("phone")) {
      const url = request.nextUrl.clone();
      url.pathname = ROUTES.LOGIN;
      return NextResponse.redirect(url);
    }
  }

  // For other routes, just proceed with the request
  return response;
}
