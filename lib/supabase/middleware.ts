import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { ROUTES } from "../constants/routes";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (request.nextUrl.pathname.startsWith(ROUTES.OTP)) {
    if (!user) {
      if (request.nextUrl.searchParams.has("phone")) {
        // if the user is not logged in, but the phone is provided in the URL,
        // we can allow access to the OTP page
        const phone = request.nextUrl.searchParams.get("phone");
        if (!phone) {
          // if no phone is provided, redirect to login
          const url = request.nextUrl.clone();
          url.pathname = ROUTES.LOGIN;
          return NextResponse.redirect(url);
        } else {
          const { data: user, error } = await supabase.from("users").select("*").eq("phone", phone).single();
          if (error || !user) {
            // if no user is found with the provided phone, redirect to login
            const url = request.nextUrl.clone();
            url.pathname = ROUTES.LOGIN;
            return NextResponse.redirect(url);
          }
        }
      }
      else {
        // if no user and no phone is provided, redirect to login
        const url = request.nextUrl.clone();
        url.pathname = ROUTES.LOGIN;
        return NextResponse.redirect(url);
      }
    } else {
      if (!user.new_phone) {
        // if the user is logged in but has no new phone set, redirect to set phone page
        const url = request.nextUrl.clone();
        url.pathname = ROUTES.SET_PHONE;
        return NextResponse.redirect(url);
      }
      const url = request.nextUrl.clone();
      url.searchParams.set('isChanged', 'true'); // add a new param
      supabaseResponse = NextResponse.rewrite(url);
    }

  }

  if (!user?.phone) {
    // no phone, potentially respond by redirecting the user to the set phone page
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.SET_PHONE;
    return NextResponse.redirect(url);
  }

  if (!user?.phone_confirmed_at) {
    // phone not confirmed, potentially respond by redirecting the user to the OTP page
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.OTP;
    return NextResponse.redirect(url);
  }
  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
