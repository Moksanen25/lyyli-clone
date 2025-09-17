import type { MetadataRoute } from 'next';
import { getAllBlogSlugs } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://lyyli.ai').replace(/\/$/, '');

  const staticRoutes: string[] = [
    '/en',
    '/fi',
    '/en/blog',
    '/fi/blog',
    '/en/features',
    '/fi/features',
    '/en/pricing',
    '/fi/pricing',
    '/en/about',
    '/fi/about',
    '/en/contact',
    '/fi/contact'
  ];

  const now = new Date();

  let blogRoutes: string[] = [];
  try {
    const slugs = getAllBlogSlugs();
    blogRoutes = slugs.map((s) => `/${s.locale}/blog/${s.slug}`);
  } catch {
    blogRoutes = [];
  }

  const allRoutes = [...staticRoutes, ...blogRoutes];

  return allRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7
  }));
}


