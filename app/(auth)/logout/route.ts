import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  // Clear the auth token cookie
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");

  // Redirect to the home page after sign-out
  const redirectUrl = new URL("/", request.url);
  revalidatePath("/", "layout");
  return NextResponse.redirect(redirectUrl);
}
