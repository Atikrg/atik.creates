import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // FRONTEND ONLY: fully static site in /out (no server, API routes or Server Actions)
  output: "export",
  // Emits /about/index.html, which works on any static host without rewrites
  trailingSlash: true,
  // Static export has no image optimiser. Ship images pre-sized with explicit width/height
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
