import { ROUTES } from "@/lib/constants/routes";
import { SupabaseMiddleware } from "@/lib/supabase/middleware";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function otpMiddleware({
  request,
  supabaseResponse,
  supabase,
  user,
}: SupabaseMiddleware) {
  // Check if the request is for the OTP route

  if (request.nextUrl.pathname.startsWith(ROUTES.OTP)) {
    if (user) {
      if (!user.new_phone) {
        const url = request.nextUrl.clone();
        url.pathname = ROUTES.SET_PHONE;
        return NextResponse.redirect(url);
      } else {
        if (!request.nextUrl.searchParams.has("isChanging")) {
          const url = request.nextUrl.clone();
          url.searchParams.set("isChanging", "true");
          if (!request.nextUrl.searchParams.has("phone")) {
            url.searchParams.set("phone", user.new_phone);
          }
          return NextResponse.redirect(url);
        }
        if (!request.nextUrl.searchParams.has("phone")) {
          const url = request.nextUrl.clone();
          url.searchParams.set("phone", user.new_phone);
          return NextResponse.redirect(url);
        }
      }
    } else {
      if (!request.nextUrl.searchParams.has("phone")) {
        const url = request.nextUrl.clone();
        url.pathname = ROUTES.LOGIN;
        return NextResponse.redirect(url);
      } else {
        const { data, error } = await supabase
          .from("users")
          .select("phone")
          .eq("phone", request.nextUrl.searchParams.get("phone"))
          .single();
        if (error || !data) {
          const url = request.nextUrl.clone();
          url.pathname = ROUTES.LOGIN;
          return NextResponse.redirect(url);
        }
      }
    }
  }

  // For other routes, just proceed with the request
  return supabaseResponse;
}
