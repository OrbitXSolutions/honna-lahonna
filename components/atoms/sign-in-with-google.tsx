"use client";

import { ROUTES } from "@/lib/constants/routes";
import { googleLogin } from "@/lib/api/auth";
import { storeAuthData } from "@/lib/api/client";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useLayoutEffect } from "react";

export async function handleSignInWithGoogle(response: any) {
  try {
    const result = await googleLogin({
      idToken: response.credential,
    });

    if (!result.success) {
      console.error("Google login failed:", result.message);
      return;
    }

    // Store auth data
    if (result.token && result.user && result.expiresAt) {
      storeAuthData(result.token, result.user, result.expiresAt);
    }

    // Check if user has phone number
    if (!result.user?.phoneNumber) {
      // Redirect to set phone page if phone is not set
      window.location.href = ROUTES.SET_PHONE;
    } else if (!result.user?.phoneNumberConfirmed) {
      // Redirect to OTP page if phone is not confirmed
      window.location.href = `${ROUTES.OTP}?phone=${result.user.phoneNumber}`;
    } else {
      // Redirect to service provider registration or home
      window.location.href = ROUTES.SERVICE_PROVIDER_REGISTRATION_FORM;
    }
  } catch (error) {
    console.error("Google sign-in error:", error);
  }
}
export default function SignInWithGoogle() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    if (typeof window != "undefined")
      (window as any).handleSignInWithGoogle = handleSignInWithGoogle;

    return () => {
      if (typeof window != "undefined") {
        (window as any).handleSignInWithGoogle = null;
      }
    };
  }, [handleSignInWithGoogle]);

  useEffect(() => {
    if (typeof window != "undefined") {
      // rerender the google sign-in button
      const googleSignInButton = document.querySelector(".g_id_signin");
      if (googleSignInButton) {
        googleSignInButton.innerHTML = "";
        (window as any).google?.accounts?.id?.renderButton(googleSignInButton, {
          theme: "outline",
          size: "large",
          shape: "rectangular",
          text: "continue_with",
          locale: "ar",
          logo_alignment: "left",
        });
      }
    }
  }, [pathname]);
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
