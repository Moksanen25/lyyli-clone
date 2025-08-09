import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure SSR is enabled by default (Next.js default behavior)
  output: undefined, // This ensures SSR mode (default)
  
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,
  
  // Performance optimizations
  experimental: {
    // App Router is enabled by default in Next.js 15
    optimizePackageImports: ['lucide-react', '@next/font'],
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
