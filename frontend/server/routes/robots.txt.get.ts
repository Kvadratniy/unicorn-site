const robots = `User-agent: *
Disallow: /api/
Disallow: /teacher
Disallow: /events
Disallow: /distribution

Sitemap: https://unicorn-studio.pro/sitemap.xml
`

export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'text/plain; charset=UTF-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return robots
})
