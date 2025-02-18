import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    middlewarePrefetch: "strict", // Ensure middleware runs correctly
  },
  /* config options here */
};

export default nextConfig;
