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
};

export default withMDX(nextConfig);
