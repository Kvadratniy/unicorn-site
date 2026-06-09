const siteUrl = 'https://unicorn-studio.pro'

const indexableRoutes = [
  '/',
  '/studio/',
  '/vocal/',
  '/piano/',
  '/guitar/',
  '/contacts/',
  '/news/',
] as const

const priorities: Record<(typeof indexableRoutes)[number], string> = {
  '/': '1.0',
  '/studio/': '0.9',
  '/vocal/': '0.9',
  '/piano/': '0.9',
  '/guitar/': '0.9',
  '/contacts/': '0.6',
  '/news/': '0.5',
}

const urls = indexableRoutes
  .map(route => `  <url>
    <loc>${siteUrl}${route === '/' ? '' : route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priorities[route]}</priority>
  </url>`)
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'application/xml; charset=UTF-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return sitemap
})
