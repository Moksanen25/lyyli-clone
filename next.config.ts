import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self';",
      // HubSpot + Next
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://js-eu1.hsforms.net https://static.hsappstatic.net https://www.googletagmanager.com;",
      "style-src 'self' 'unsafe-inline';",
      "img-src 'self' data: https:;",
      // Lomakkeet + meetings iframet
      "frame-src https://*.hubspot.com https://*.hsforms.com https://*.hsforms.net;",
      // XHR/fetch kohteet
      "connect-src 'self' https://api-eu1.hubspot.com https://forms-eu1.hsforms.com https://forms.hsforms.com https://www.google-analytics.com https://www.googletagmanager.com;",
      "font-src 'self' data: https:;"
    ].join(' ')
  },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
];

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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default withMDX(nextConfig);
