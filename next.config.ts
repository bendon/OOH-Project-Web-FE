import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    middlewarePrefetch: "strict", // Ensure middleware runs correctly
  },
  output: 'standalone',
  turbo : false
  /* config options here */
};

export default nextConfig;
