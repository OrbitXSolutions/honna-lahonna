import type { NextConfig } from "next";
import { SupabasePaths } from "./lib/constants/supabase";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL(`${SupabasePaths.IMAGES}/**`)],
  },
};

export default nextConfig;
