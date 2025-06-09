"use client";

import { createClient } from "@/lib/supabase/client";
import Script from "next/script";
import { useLayoutEffect } from "react";

export async function handleSignInWithGoogle(response: any) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: response.credential,
  });
}
export function SignInWithGoogle() {
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
