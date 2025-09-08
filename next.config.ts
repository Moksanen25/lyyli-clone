import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  images: {
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

export default withMDX(nextConfig);
