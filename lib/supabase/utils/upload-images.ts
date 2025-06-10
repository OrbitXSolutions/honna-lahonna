// only client-side code
"use client";
import { SupabaseStorageBuckets } from "@/lib/constants/supabase";
import { createClient } from "@/lib/supabase/client";

export async function uploadImage(file: File, fileName: string = "") {
  if (!file) {
    throw new Error("No file provided");
  }
  const supabase = createClient();
  fileName ??= file.name;
  const { data, error } = await supabase.storage
    .from(SupabaseStorageBuckets.IMAGES.name)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });
  if (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }
  return data;
}
