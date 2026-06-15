import { publishNewsToVk } from '../../../../utils/publishNewsToVk'

type StrapiMedia = {
  url?: string | null
}

type BlogImage = {
  src?: StrapiMedia | null
}

type BlogListItem = {
  title?: string | null
  value?: string | null
}

type BlogContentBlock = {
  __component?: string
  Title?: string | null
  paragraph?: string | null
  Items?: BlogListItem[] | null
}

type BlogRecord = {
  id?: number
  documentId?: string
  title?: string | null
  description?: string | null
  slug?: string | null
  publishedAt?: string | null
  vkPostId?: number | null
  MainImage?: BlogImage | null
  Content?: BlogContentBlock[] | null
}

const maybeExtractRecord = (event: unknown): BlogRecord | null => {
  const result = (event as { result?: BlogRecord } | undefined)?.result
  if (!result || typeof result !== 'object') return null
  return result
}

const resolveStrapiBaseUrl = (): string => {
  const fromEnv = (process.env.STRAPI_URL || '').trim()
  if (fromEnv) return fromEnv.replace(/\/$/, '')

  const fromConfig = strapi.config.get('server.url') as string | undefined
  if (fromConfig && fromConfig.trim()) return fromConfig.trim().replace(/\/$/, '')

  const host = (process.env.HOST || '0.0.0.0').trim()
  const port = (process.env.PORT || '1337').trim()
  return `http://${host}:${port}`
}

const buildImageUrl = (record: BlogRecord): string | undefined => {
  const url = record.MainImage?.src?.url?.trim()
  if (!url) return undefined
  if (/^https?:\/\//i.test(url)) return url
  return `${resolveStrapiBaseUrl()}${url.startsWith('/') ? '' : '/'}${url}`
}

const extractBodyText = (blocks: BlogContentBlock[] | null | undefined): string => {
  if (!Array.isArray(blocks)) return ''
  const parts: string[] = []

  for (const block of blocks) {
    if (!block?.__component) continue

    if (block.__component === 'shared.news-headline') {
      const text = (block.Title || '').trim()
      if (text) parts.push(text)
      continue
    }

    if (block.__component === 'shared.news-paragraph') {
      const text = (block.paragraph || '').trim()
      if (text) parts.push(text)
      continue
    }

    if (block.__component === 'shared.shared-list') {
      const items = Array.isArray(block.Items)
        ? block.Items
            .map((item) => {
              const title = (item?.title || '').trim()
              const value = (item?.value || '').trim()
              return [title, value].filter(Boolean).join(' — ')
            })
            .filter((item) => item.length > 0)
        : []
      if (items.length) parts.push(items.map((item) => `• ${item}`).join('\n'))
    }
  }

  return parts.join('\n\n')
}

const fetchPopulatedBlog = async (documentId: string): Promise<BlogRecord | null> => {
  const entity = await strapi.documents('api::blog.blog').findOne({
    documentId,
    status: 'published',
    populate: {
      MainImage: { populate: { src: true } },
      Content: {
        on: {
          'shared.news-headline': { fields: ['Title'] },
          'shared.news-paragraph': { fields: ['paragraph'] },
          'shared.shared-list': { populate: { Items: true } },
        },
      },
    },
  })

  return (entity as BlogRecord | null) ?? null
}

const handlePublishedNews = async (event: unknown): Promise<void> => {
  const record = maybeExtractRecord(event)
  if (!record) return
  if (!record.publishedAt) return
  if (record.vkPostId) return

  let source: BlogRecord = record
  if (record.documentId) {
    try {
      const populated = await fetchPopulatedBlog(record.documentId)
      if (populated) source = { ...populated, id: record.id ?? populated.id }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      strapi.log.warn(`[VK] Failed to load blog ${record.documentId} content: ${message}`)
    }
  }

  try {
    const publishResult = await publishNewsToVk({
      title: source.title,
      description: source.description,
      slug: source.slug,
      imageUrl: buildImageUrl(source),
      bodyText: extractBodyText(source.Content),
    })

    if (publishResult.skipped) {
      strapi.log.info(`[VK] Skip posting blog ${record.documentId || record.id}: ${publishResult.reason}`)
      return
    }

    if (!publishResult.postId) return

    if (publishResult.imageError) {
      strapi.log.warn(
        `[VK] Blog ${record.documentId || record.id} posted without image: ${publishResult.imageError}`,
      )
    }

    if (!record.id) {
      strapi.log.warn(`[VK] Blog ${record.documentId || 'unknown'} has no id, cannot persist vkPostId`)
      return
    }

    await strapi.db.query('api::blog.blog').update({
      where: { id: record.id },
      data: {
        vkPostId: publishResult.postId,
      },
    })

    strapi.log.info(`[VK] Blog ${record.documentId || record.id} posted with id ${publishResult.postId}`)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    strapi.log.error(`[VK] Failed to post blog ${record.documentId || record.id}: ${message}`)
  }
}

export default {
  async afterCreate(event: unknown) {
    await handlePublishedNews(event)
  },
  async afterUpdate(event: unknown) {
    await handlePublishedNews(event)
  },
}
