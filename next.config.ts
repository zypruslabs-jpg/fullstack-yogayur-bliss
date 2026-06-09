import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  // Removed optimizeCss experimental flag — was causing CSS purge issues
};

export default nextConfig;
