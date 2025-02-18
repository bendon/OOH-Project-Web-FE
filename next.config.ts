import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    middlewarePrefetch: "strict", // Ensure middleware runs correctly
  },
  output: 'standalone',
  /* config options here */
};

export default nextConfig;
