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

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Resolve aliases
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "victory-vendor/d3-shape": "d3-shape",
      "victory-vendor/d3-scale": "d3-scale",
    };

    // Tree shaking optimization (only in production)
    if (!dev) {
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    if (!dev && !isServer) {
      // Enhanced code splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunks
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 20,
            reuseExistingChunk: true,
          },
          // Framework chunks
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            chunks: 'all',
            priority: 30,
            reuseExistingChunk: true,
          },
          // UI library chunks
          ui: {
            name: 'ui',
            test: /[\\/]node_modules[\\/](@headlessui|@heroicons|framer-motion)[\\/]/,
            chunks: 'all',
            priority: 25,
            reuseExistingChunk: true,
          },
          // Chart libraries
          charts: {
            name: 'charts',
            test: /[\\/]node_modules[\\/](recharts|d3|victory)[\\/]/,
            chunks: 'all',
            priority: 25,
            reuseExistingChunk: true,
          },
          // Common chunks
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }

    return config;
  },

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
