import { createClient } from "@supabase/supabase-js";

export async function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjaWp2Z3d1enhoZndnc3p5cHl3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTA1MDYxMCwiZXhwIjoyMDY0NjI2NjEwfQ.VPEIgy8-cwvO6DxqFRlS_VlR8MvexhobHkcPBy7wM2c",

    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
