import { NextApiRequest, NextApiResponse } from 'next';

const SITE_URL = 'https://airewritely.com';

// Define all the URLs we want in our sitemap
const pages = [
  '',
  '/privacy-policy',
  '/terms-of-service',
  '/blog/best-free-ai-sentence-rewriter-tools',
  '/blog/how-to-use-ai-sentence-rewriter',
];

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => {
      return `
    <url>
      <loc>${SITE_URL}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page === '' ? '1.0' : page.includes('/blog/') ? '0.9' : '0.8'}</priority>
    </url>
  `;
    })
    .join('')}
</urlset>
  `;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Generate the XML sitemap with the posts data
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
} 