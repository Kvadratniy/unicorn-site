import type { NavigationEntry } from '~/types/navigation.types'
import { newsContentBlockTypes, type NewsArticle, type NewsContentBlock } from '~/types/news.types'

export type { NavigationEntry, NavigationMenuItem } from '~/types/navigation.types'

// ─── Catalog types ────────────────────────────────────────────────────────────

export type HomeCatalogService = {
  id: string
  title: string
  description?: string
  features?: string[]
  price?: string
  slug?: string
  image?: string
}

export type HomeCatalogCategory = {
  id: string
  title: string
  description: string
  services: HomeCatalogService[]
}

// ─── Vocal types ──────────────────────────────────────────────────────────────

export type VocalContent = {
  [key: string]: unknown
}

export type StudioContent = {
  [key: string]: unknown
}

export type PianoContent = {
  [key: string]: unknown
}

export type GuitarContent = {
  [key: string]: unknown
}

export type RentContent = {
  [key: string]: unknown
}

export type DistributionContent = {
  [key: string]: unknown
}

export type HomePageContent = {
  [key: string]: unknown
}

// ─── Strapi raw types ─────────────────────────────────────────────────────────

type StrapiMedia = { url?: string }
type StrapiDynamicBlock = {
  __component?: string
  body?: string
  title?: string
  items?: string[]
  Title?: string
  paragraph?: string
  Items?: Array<{ title?: string; value?: string }>
}
type StrapiArticleRaw = {
  documentId: string
  slug?: string
  title?: string
  description?: string
  MainImage?: { src?: StrapiMedia | null; alt?: string } | null
  Content?: StrapiDynamicBlock[]
  publishedAt?: string
}

// ─── Catalog mappers ──────────────────────────────────────────────────────────

const mapCatalogService = (value: unknown, strapiBaseUrl: string): HomeCatalogService | null => {
  const service = withAttributes(value)
  const title = pickString(service, ['title', 'Title', 'name'])
  if (!title) return null

  return {
    id: pickString(service, ['slug', 'documentId', 'id']) || title,
    title,
    ...(pickString(service, ['description', 'subtitle', 'Subtitle']) ? { description: pickString(service, ['description', 'subtitle', 'Subtitle']) } : {}),
    ...(pickString(service, ['price', 'priceFrom', 'price_from']) ? { price: pickString(service, ['price', 'priceFrom', 'price_from']) } : {}),
    ...(pickString(service, ['slug', 'pageSlug', 'linkSlug']) ? { slug: pickString(service, ['slug', 'pageSlug', 'linkSlug']) } : {}),
    ...(parseFeatures(service.features ?? service.tags ?? service.bullets).length
      ? { features: parseFeatures(service.features ?? service.tags ?? service.bullets) }
      : {}),
    ...(extractImageUrl(service.image ?? service.images ?? service.icon ?? service.preview, strapiBaseUrl)
      ? { image: extractImageUrl(service.image ?? service.images ?? service.icon ?? service.preview, strapiBaseUrl) }
      : {}),
  }
}

const mapCatalogCategory = (value: unknown, strapiBaseUrl: string): HomeCatalogCategory | null => {
  const category = withAttributes(value)
  const title = pickString(category, ['title', 'Title', 'Titile', 'name'])
  if (!title) return null

  return {
    id: pickString(category, ['slug', 'documentId', 'id']) || title,
    title,
    description: pickString(category, ['description', 'subtitle', 'Subtitle']),
    services: relationToArray(category.services ?? category.Services)
      .map(s => mapCatalogService(s, strapiBaseUrl))
      .filter((s): s is HomeCatalogService => s !== null),
  }
}

// ─── News mappers ─────────────────────────────────────────────────────────────

const formatPublishDate = (value?: string): string => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

const stripHtml = (value?: string): string => {
  if (!value) return ''
  return value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

const normalizeArticleImage = (path: string | undefined, strapiBaseUrl: string): string => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/images/')) return path
  if (path.startsWith('/uploads/')) return strapiBaseUrl ? `${strapiBaseUrl}${path}` : path
  return path
}

const mapDynamicBlocks = (blocks: StrapiDynamicBlock[] | undefined): NewsContentBlock[] => {
  if (!blocks?.length) return []
  const result: NewsContentBlock[] = []

  for (const block of blocks) {
    if (!block.__component) continue

    if (block.__component === 'shared.rich-text' || block.__component === 'shared.news-paragraph') {
      const text = stripHtml(block.paragraph || block.body)
      if (text) result.push({ type: newsContentBlockTypes.paragraph, text })
      continue
    }

    if (block.__component === 'shared.news-headline') {
      const text = stripHtml(block.Title || block.title)
      if (text) result.push({ type: newsContentBlockTypes.heading, text })
      continue
    }

    if (block.__component === 'shared.quote') {
      const title = stripHtml(block.title)
      const text = stripHtml(block.body)
      if (title) result.push({ type: newsContentBlockTypes.heading, text: title })
      if (text) result.push({ type: newsContentBlockTypes.paragraph, text })
      continue
    }

    if (block.__component === 'shared.shared-list') {
      const items = Array.isArray(block.Items)
        ? block.Items
          .map((item) => {
            const value = typeof item?.value === 'string' ? item.value.trim() : ''
            const title = typeof item?.title === 'string' ? item.title.trim() : ''
            return value || title
          })
          .filter((item): item is string => item.length > 0)
        : []
      if (items.length) result.push({ type: newsContentBlockTypes.list, items })
      continue
    }

    if (block.__component === 'shared.slider' && Array.isArray(block.items) && block.items.length > 0) {
      result.push({ type: newsContentBlockTypes.list, items: block.items })
    }
  }

  return result
}

const mapArticle = (article: StrapiArticleRaw, strapiBaseUrl: string): NewsArticle => ({
  id: article.slug || article.documentId,
  title: article.title || '',
  subtitle: article.description || '',
  author: {
    name: '',
    avatarUrl: '',
  },
  category: 'Новости',
  publishDate: formatPublishDate(article.publishedAt),
  readingTime: '5 мин',
  heroImage: normalizeArticleImage(article.MainImage?.src?.url, strapiBaseUrl),
  content: mapDynamicBlocks(article.Content),
})

// ─── Home single-content responses (Nitro routes) ────────────────────────────

type HomeSingleApiResponse = {
  data?: unknown
  error?: { status?: number; name?: string; message?: string } | null
}

type HomeListApiResponse = {
  data?: unknown[]
  error?: { status?: number; name?: string; message?: string } | null
}

// ─── API service ──────────────────────────────────────────────────────────────

export const useStrapiApi = () => {
  const config = useRuntimeConfig()
  const strapiBaseUrl = String(config.public?.strapi?.url || config.strapi?.url || '').replace(/\/$/, '')

  const fetchCategories = async (): Promise<HomeCatalogCategory[]> => {
    try {
      const response = await $fetch<HomeListApiResponse>('/api/home/categories')
      if (response?.error) {
        const status = typeof response.error.status === 'number' ? `${response.error.status} ` : ''
        console.warn(`[useStrapiApi.fetchCategories] server-route warning: ${status}${response.error.message || response.error.name || 'unknown'}`.trim())
      }
      return relationToArray(response)
        .map(item => mapCatalogCategory(item, strapiBaseUrl))
        .filter((item): item is HomeCatalogCategory => item !== null)
    }
    catch (e) {
      console.error(`[useStrapiApi.fetchCategories] ${stringifyError(e)}`)
      return []
    }
  }

  const fetchHomeSingle = async <T>(route: string, logScope: string): Promise<T | null> => {
    try {
      const res = await $fetch<HomeSingleApiResponse>(route)
      if (res?.error) {
        const status = typeof res.error.status === 'number' ? `${res.error.status} ` : ''
        console.warn(`[${logScope}] server-route warning: ${status}${res.error.message || res.error.name || 'unknown'}`.trim())
        return null
      }
      const entity = relationToSingle(res)
      return Object.keys(entity).length ? (entity as T) : null
    }
    catch (e) {
      console.error(`[${logScope}] ${stringifyError(e)}`)
      return null
    }
  }

  const fetchVocal = async (): Promise<VocalContent | null> =>
    fetchHomeSingle<VocalContent>('/api/home/vocal', 'useStrapiApi.fetchVocal')

  const fetchStudio = async (): Promise<StudioContent | null> =>
    fetchHomeSingle<StudioContent>('/api/home/studio', 'useStrapiApi.fetchStudio')

  const fetchPiano = async (): Promise<PianoContent | null> =>
    fetchHomeSingle<PianoContent>('/api/home/piano', 'useStrapiApi.fetchPiano')

  const fetchGuitar = async (): Promise<GuitarContent | null> =>
    fetchHomeSingle<GuitarContent>('/api/home/guitar', 'useStrapiApi.fetchGuitar')

  const fetchRent = async (): Promise<RentContent | null> =>
    fetchHomeSingle<RentContent>('/api/home/rent', 'useStrapiApi.fetchRent')

  const fetchDistribution = async (): Promise<DistributionContent | null> =>
    fetchHomeSingle<DistributionContent>('/api/home/distribution', 'useStrapiApi.fetchDistribution')

  const fetchHomePage = async (): Promise<HomePageContent | null> =>
    fetchHomeSingle<HomePageContent>('/api/home/home', 'useStrapiApi.fetchHomePage')

  const fetchNavigation = async (): Promise<NavigationEntry[]> => {
    try {
      return await $fetch<NavigationEntry[]>('/api/home/navigation')
    }
    catch (e) {
      console.error(`[useStrapiApi.fetchNavigation] ${stringifyError(e)}`)
      return []
    }
  }

  const fetchArticles = async (): Promise<NewsArticle[]> => {
    try {
      const response = await $fetch<HomeListApiResponse>('/api/home/articles')
      if (response?.error) {
        const status = typeof response.error.status === 'number' ? `${response.error.status} ` : ''
        console.warn(`[useStrapiApi.fetchArticles] server-route warning: ${status}${response.error.message || response.error.name || 'unknown'}`.trim())
        return []
      }
      const items = relationToArray(response)
      if (!items.length) return []
      return items.map(item => mapArticle(item as StrapiArticleRaw, strapiBaseUrl))
    }
    catch {
      return []
    }
  }

  const fetchArticleBySlug = async (slug: string): Promise<NewsArticle | null> => {
    const normalizedSlug = String(slug || '').trim()
    if (!normalizedSlug) return null

    try {
      const response = await $fetch<HomeListApiResponse>(`/api/home/article/${encodeURIComponent(normalizedSlug)}`)
      if (response?.error) {
        const status = typeof response.error.status === 'number' ? `${response.error.status} ` : ''
        console.warn(`[useStrapiApi.fetchArticleBySlug] server-route warning: ${status}${response.error.message || response.error.name || 'unknown'}`.trim())
        return null
      }
      const first = relationToArray(response)[0]
      if (!first) return null
      return mapArticle(first as StrapiArticleRaw, strapiBaseUrl)
    }
    catch {
      return null
    }
  }

  return {
    fetchCategories,
    fetchNavigation,
    fetchVocal,
    fetchStudio,
    fetchPiano,
    fetchGuitar,
    fetchRent,
    fetchDistribution,
    fetchHomePage,
    fetchArticles,
    fetchArticleBySlug,
  }
}
