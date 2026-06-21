import { fetchHomeList } from '../api/home/shared'

type SitemapEntry = {
  loc: string
  priority: string
  changefreq: string
  lastmod?: string
}

const staticRoutes: SitemapEntry[] = [
  { loc: '', priority: '1.0', changefreq: 'weekly' },
  { loc: '/studio', priority: '0.9', changefreq: 'weekly' },
  { loc: '/vocal', priority: '0.9', changefreq: 'weekly' },
  { loc: '/piano', priority: '0.9', changefreq: 'weekly' },
  { loc: '/guitar', priority: '0.9', changefreq: 'weekly' },
  { loc: '/rent', priority: '0.8', changefreq: 'weekly' },
  { loc: '/distribution', priority: '0.8', changefreq: 'weekly' },
  { loc: '/contacts', priority: '0.6', changefreq: 'monthly' },
  { loc: '/news', priority: '0.5', changefreq: 'weekly' },
]

const toLastmod = (value?: string): string | undefined => {
  if (!value) return undefined
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toISOString().slice(0, 10)
}

const extractArticleSlug = (item: Record<string, unknown>): string | null => {
  const slug = typeof item.slug === 'string' ? item.slug.trim() : ''
  if (slug) return slug

  const documentId = typeof item.documentId === 'string' ? item.documentId.trim() : ''
  return documentId || null
}

const fetchNewsEntries = async (siteUrl: string): Promise<SitemapEntry[]> => {
  try {
    const response = await fetchHomeList(
      'blogs',
      {
        'fields[0]': 'slug',
        'fields[1]': 'publishedAt',
        'fields[2]': 'updatedAt',
        'sort[0]': 'publishedAt:desc',
        status: 'published',
        'pagination[pageSize]': 100,
      },
      'Failed to load articles for sitemap',
    )

    const items = Array.isArray(response.data) ? response.data : []
    const entries: SitemapEntry[] = []

    for (const raw of items) {
      if (typeof raw !== 'object' || raw === null) continue

      const record = raw as Record<string, unknown>
      const attributes = typeof record.attributes === 'object' && record.attributes !== null
        ? record.attributes as Record<string, unknown>
        : {}
      const item = { ...record, ...attributes }

      const slug = extractArticleSlug(item)
      if (!slug) continue

      const publishedAt = typeof item.publishedAt === 'string' ? item.publishedAt : undefined
      const updatedAt = typeof item.updatedAt === 'string' ? item.updatedAt : undefined

      entries.push({
        loc: `/news/${slug}`,
        priority: '0.4',
        changefreq: 'monthly',
        lastmod: toLastmod(updatedAt || publishedAt),
      })
    }

    return entries
  }
  catch (error) {
    console.error('[sitemap] Failed to fetch news articles:', error)
    return []
  }
}

const renderUrl = (siteUrl: string, entry: SitemapEntry): string => {
  const loc = `${siteUrl}${entry.loc}`
  const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''

  return `  <url>
    <loc>${loc}</loc>${lastmod}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = String(config.public.siteUrl || 'https://unicorn-studio.pro').replace(/\/$/, '')

  const newsEntries = await fetchNewsEntries(siteUrl)
  const urls = [...staticRoutes, ...newsEntries].map(entry => renderUrl(siteUrl, entry)).join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml; charset=UTF-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return sitemap
})
