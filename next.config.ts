import type { NextConfig } from "next";
import { SupabasePaths } from "./lib/constants/supabase";

// Helper to build an allowed origin for GitHub Codespaces/Devcontainers
const codespaceForwardingDomain =
  process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || "app.github.dev";
const codespaceName = process.env.CODESPACE_NAME;
const codespaceHost3000 =
  codespaceName ? `${codespaceName}-3000.${codespaceForwardingDomain}` : undefined;
const codespaceHost3001 =
  codespaceName ? `${codespaceName}-3001.${codespaceForwardingDomain}` : undefined;

// Try to include the dev URL host:port if provided
let envAllowed: string[] = [];
try {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    const u = new URL(process.env.NEXT_PUBLIC_APP_URL);
    envAllowed.push(`${u.hostname}${u.port ? `:${u.port}` : ""}`);
  }
} catch { }

const nextConfig: NextConfig = {
  /* config options here */
  // Allow Server Actions when running behind a reverse proxy (e.g., Codespaces)
  // This fixes: "x-forwarded-host ... does not match origin ... from a forwarded Server Actions request"
  experimental: {
    serverActions: {
      // List of trusted origins (host[:port]) that can forward Server Actions requests in dev
      allowedOrigins: [
        "localhost:3000",
        "localhost:3001",
        "127.0.0.1:3000",
        "127.0.0.1:3001",
        // Allow generic Codespaces domain and a specific computed host if available
        "app.github.dev",
        ...(codespaceHost3000 ? [codespaceHost3000] : []),
        ...(codespaceHost3001 ? [codespaceHost3001] : []),
        ...envAllowed,
      ],
    },
  },

  images: {
    remotePatterns: [
      new URL(`${SupabasePaths.IMAGES}/**`),
      new URL(`https://lh3.googleusercontent.com/**`),
      new URL(`https://avatars.githubusercontent.com/**`),
    ],
  },
};

export default nextConfig;
