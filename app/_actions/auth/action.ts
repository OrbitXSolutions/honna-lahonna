"use server";

import { createSsrClient } from "@/lib/supabase/server";

export async function LogOutAction() {
  const supabase = await createSsrClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error("Failed to log out: " + error.message);
  }
}
