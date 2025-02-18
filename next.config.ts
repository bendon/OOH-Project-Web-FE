import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    middlewarePrefetch: "strict", // Ensure middleware runs correctly
    turbopack: false, // Disable Turbopack (use Webpack instead)
  },
  output: 'standalone',
  /* config options here */
};

export default nextConfig;
