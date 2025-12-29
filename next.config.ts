import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Handle server-side packages that shouldn't be bundled
  serverExternalPackages: [
    'pino',
    'pino-pretty',
    'thread-stream',
  ],

  // Turbopack configuration (required for Next.js 16+)
  turbopack: {},
};

export default nextConfig;
