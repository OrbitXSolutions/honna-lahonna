import type { NextConfig } from "next";
import { SupabasePaths } from "./lib/constants/supabase";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['127.0.0.1'],

  images: {
    remotePatterns: [new URL(`${SupabasePaths.IMAGES}/**`)],
  },
};

export default nextConfig;
