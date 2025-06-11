// only client side code
"use client";

import { SupabaseStorageBuckets } from "@/lib/constants/supabase";
import { createClient } from "@/lib/supabase/client";

export async function uploadVideo(file: File, fileName: string = "") {
  if (!file) {
    throw new Error("No file provided");
  }
  const supabase = createClient();
  fileName ??= file.name;
  const { data, error } = await supabase.storage
    .from(SupabaseStorageBuckets.VIDEOS.name)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });
  if (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }
  // onle the file name without the path
  const filePath = data.path;
  const fileNameOnly = filePath.split("/").pop() || "";
  return fileNameOnly;
}
