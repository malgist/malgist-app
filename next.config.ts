import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Handle server-side packages that shouldn't be bundled
  serverExternalPackages: [
    'pino',
    'pino-pretty',
    'thread-stream',
  ],

  // Allow external images from RainbowKit and other sources
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Turbopack configuration (required for Next.js 16+)
  turbopack: {},

  // Webpack configuration fallback (for webpack mode)
  webpack: (config, { isServer }) => {
    // Add polyfills for browser APIs when building for server
    if (isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'indexedDB': false,
        'crypto': false,
      };
    }

    // Exclude test files and development-only dependencies
    config.externals = config.externals || [];
    if (!isServer) {
      config.externals.push({
        'tape': 'commonjs tape',
        'tap': 'commonjs tap',
        'desm': 'commonjs desm',
        'fastbench': 'commonjs fastbench',
        'pino-elasticsearch': 'commonjs pino-elasticsearch',
      });
    }

    // Ignore test directories in node_modules
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /node_modules.*\/(test|tests|__tests__)\/.*\.(js|ts|tsx|jsx|mjs)$/,
      use: 'null-loader',
    });

    return config;
  },
};

export default nextConfig;
