import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/voitures', '/comment-ca-marche', '/contact'];
  return routes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/voitures' ? 0.9 : 0.6,
  }));
}
