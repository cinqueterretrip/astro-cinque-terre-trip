import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  return new Response(
    'User-agent: *\nAllow: /\nDisallow: /studio/\n\nSitemap: https://www.cinqueterretrip.com/sitemap-index.xml',
    { headers: { 'Content-Type': 'text/plain' } },
  );
};
