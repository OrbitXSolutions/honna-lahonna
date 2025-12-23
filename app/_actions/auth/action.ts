"use server";

import { cookies } from "next/headers";

export async function LogOutAction() {
  // Clear the auth token cookie
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}
