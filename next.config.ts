import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: false,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['next-intl']
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx']
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);