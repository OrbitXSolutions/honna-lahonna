import { createSsrClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createSsrClient();
  const { error } = await supabase.auth.signOut();

  // if (error) {
  //   console.error("Error signing out:", error);
  //   // Optionally, redirect to an error page or show an error message
  //   // For now, we'll still attempt to redirect to home
  // }

  // Redirect to the home page after sign-out
  // Ensure the redirect URL is absolute for external redirects or use a relative path for internal ones.
  // NextResponse.redirect(new URL('/', request.url)) is the standard way.
  const redirectUrl = new URL("/", request.url);
  revalidatePath("/", "layout");
  return NextResponse.redirect(redirectUrl);
}
