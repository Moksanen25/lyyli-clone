import type { MetadataRoute } from 'next';
import { getAllBlogSlugs } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (
    process.env.NEXT_PUBLIC_APP_URL || 'https://lyyli.ai'
  ).replace(/\/$/, '');

  const staticRoutes: string[] = [
    '/en',
    '/fi',
    '/de',
    '/et',
    '/sv',
    '/en/blog',
    '/fi/blog',
    '/de/blog',
    '/et/blog',
    '/sv/blog',
    '/en/features',
    '/fi/features',
    '/de/features',
    '/et/features',
    '/sv/features',
    '/en/pricing',
    '/fi/pricing',
    '/de/pricing',
    '/et/pricing',
    '/sv/pricing',
    '/en/about',
    '/fi/about',
    '/de/about',
    '/et/about',
    '/sv/about',
    '/en/contact',
    '/fi/contact',
    '/de/contact',
    '/et/contact',
    '/sv/contact',
  ];

  const now = new Date();

  let blogRoutes: string[] = [];
  try {
    const slugs = getAllBlogSlugs();
    blogRoutes = slugs.map(s => `/${s.locale}/blog/${s.slug}`);
  } catch {
    blogRoutes = [];
  }

  const allRoutes = [...staticRoutes, ...blogRoutes];

  return allRoutes.map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
}
