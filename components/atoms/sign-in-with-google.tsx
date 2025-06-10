"use client";

import { ROUTES } from "@/lib/constants/routes";
import { createClient } from "@/lib/supabase/client";
import Script from "next/script";
import { useLayoutEffect } from "react";

export async function handleSignInWithGoogle(response: any) {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: response.credential,
  });
  debugger;
  if (!user?.phone) {
    // Redirect to set phone page if phone is not set
    window.location.href = ROUTES.SET_PHONE;
  } else {
    if (!user?.phone_confirmed_at) {
      // Redirect to OTP page if phone is not confirmed
      window.location.href = ROUTES.OTP;
    }
  }
}
export default function SignInWithGoogle() {
  useLayoutEffect(() => {
    if (typeof window != "undefined")
      (window as any).handleSignInWithGoogle = handleSignInWithGoogle;

    return () => {
      if (typeof window != "undefined") {
        (window as any).handleSignInWithGoogle = null;
      }
    };
  }, [handleSignInWithGoogle]);
  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" async />
      <div
        id="g_id_onload"
        data-client_id="824528712354-mb7697gtasr0veuqjkrjnibmlmu07n68.apps.googleusercontent.com"
        data-context="use"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-auto_prompt="false"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="continue_with"
        data-size="large"
        data-locale="ar"
        data-logo_alignment="left"
      ></div>
    </>
  );
}
