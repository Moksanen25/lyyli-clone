import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure SSR is enabled by default (Next.js default behavior)
  output: undefined, // This ensures SSR mode (default)
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
