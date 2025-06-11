import { ROUTES } from "@/lib/constants/routes";
import { SupabaseMiddleware } from "@/lib/supabase/middleware";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function serviceProviderRegisterMiddleware({
  request,
  supabaseResponse,
  supabase,
  user,
}: SupabaseMiddleware) {
  // Check if the request is for the OTP route

  if (
    request.nextUrl.pathname.startsWith(
      ROUTES.SERVICE_PROVIDER_REGISTRATION_FORM
    )
  ) {
    if (user) {
      if (user.user_metadata["is_service_provider"]) {
        const url = request.nextUrl.clone();
        url.pathname = ROUTES.HOME;
        return NextResponse.redirect(url);
      } else {
      }
    } else {
      const url = request.nextUrl.clone();
      url.pathname = ROUTES.REGISTER;
      url.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(url);
      //   if (!request.nextUrl.searchParams.has("phone")) {
      //     const url = request.nextUrl.clone();
      //     url.pathname = ROUTES.LOGIN;
      //     return NextResponse.redirect(url);
      //   } else {
      //     const { data, error } = await supabase
      //       .from("users")
      //       .select("phone")
      //       .eq("phone", request.nextUrl.searchParams.get("phone"))
      //       .single();
      //     if (error || !data) {
      //       const url = request.nextUrl.clone();
      //       url.pathname = ROUTES.LOGIN;
      //       return NextResponse.redirect(url);
      //     }
      //   }
    }
  }

  // For other routes, just proceed with the request
  return supabaseResponse;
}
