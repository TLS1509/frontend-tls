/**
 * Générateur de sitemap.xml - The Learning Society
 * Utility pour créer un sitemap XML dynamique
 */

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemap(urls: SitemapUrl[]): string {
  const baseUrl = 'https://thelearningsociety.fr';
  
  const urlEntries = urls.map(url => `
  <url>
    <loc>${baseUrl}${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// Configuration du sitemap pour TLS
export const tlsSitemapUrls: SitemapUrl[] = [
  {
    loc: '/',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    loc: '/academie',
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    loc: '/agence',
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    loc: '/conseil',
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    loc: '/tech',
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    loc: '/mag',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    loc: '/templates',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0],
  },
];

// Function to export sitemap (for build time)
export function exportSitemap() {
  return generateSitemap(tlsSitemapUrls);
}
