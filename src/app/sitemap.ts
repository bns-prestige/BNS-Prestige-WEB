import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/voitures', '/comment-ca-marche', '/conditions-location', '/contact'];
  return routes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/voitures' ? 0.9 : route === '/conditions-location' ? 0.8 : 0.6,
  }));
}
