import type { NextConfig } from "next";
import createMDX from '@next/mdx';
let withBundleAnalyzer: (cfg: NextConfig) => NextConfig = (cfg) => cfg;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const analyzer = require('@next/bundle-analyzer');
  withBundleAnalyzer = analyzer({ enabled: process.env.ANALYZE === 'true' });
} catch {
  // Analyzer not installed; proceed without it unless ANALYZE=true and package is present
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

// Security headers are managed in `src/middleware/security.ts`

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Remove i18n configuration to fix export path mismatches
  trailingSlash: false,
  poweredByHeader: false,

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "victory-vendor/d3-shape": "d3-shape",
      "victory-vendor/d3-scale": "d3-scale",
    };
    return config;
  },

  // Optimize bundles (disabled custom splitChunks to avoid Webpack runtime conflicts)
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   if (!dev && !isServer) {
  //     config.optimization.splitChunks.chunks = 'all';
  //     config.optimization.splitChunks.cacheGroups = {
  //       ...config.optimization.splitChunks.cacheGroups,
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all',
  //         priority: 10,
  //       },
  //       framermotion: {
  //         test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
  //         name: 'framer-motion',
  //         chunks: 'all',
  //         priority: 20,
  //       },
  //       recharts: {
  //         test: /[\\/]node_modules[\\/]recharts[\\/]/,
  //         name: 'recharts',
  //         chunks: 'all',
  //         priority: 20,
  //       },
  //     };
  //   }
  //   return config;
  // },

  // Optimize build output
  output: 'standalone',

  // Compression
  compress: true,

  // Do not fail the production build on ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withBundleAnalyzer(withMDX(nextConfig));
