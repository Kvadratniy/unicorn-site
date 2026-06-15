import { publishNewsToVk } from './publishNewsToVk'

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

type BlogEntry = {
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

const BLOG_UID = 'api::blog.blog'

const resolveStrapiBaseUrl = (): string => {
  const fromEnv = (process.env.STRAPI_URL || '').trim()
  if (fromEnv) return fromEnv.replace(/\/$/, '')

  const fromConfig = strapi.config.get('server.url') as string | undefined
  if (fromConfig && fromConfig.trim()) return fromConfig.trim().replace(/\/$/, '')

  const host = (process.env.HOST || '0.0.0.0').trim()
  const port = (process.env.PORT || '1337').trim()
  return `http://${host}:${port}`
}

const buildImageUrl = (entry: BlogEntry): string | undefined => {
  const url = entry.MainImage?.src?.url?.trim()
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

const fetchPublishedBlog = async (documentId: string): Promise<BlogEntry | null> => {
  const entity = await strapi.documents(BLOG_UID).findOne({
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

  return (entity as BlogEntry | null) ?? null
}

/**
 * Posts a freshly published blog entry to the VK community wall.
 * Triggered from the document service middleware on the `publish` action.
 */
export const syncBlogToVk = async (documentId: string | undefined): Promise<void> => {
  if (!documentId) return

  let entry: BlogEntry | null = null
  try {
    entry = await fetchPublishedBlog(documentId)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    strapi.log.error(`[VK] Failed to load published blog ${documentId}: ${message}`)
    return
  }

  if (!entry) {
    strapi.log.warn(`[VK] Published blog ${documentId} not found, skip posting`)
    return
  }

  if (entry.vkPostId) {
    strapi.log.info(`[VK] Blog ${documentId} already posted (vkPostId=${entry.vkPostId}), skip`)
    return
  }

  try {
    const publishResult = await publishNewsToVk({
      title: entry.title,
      description: entry.description,
      slug: entry.slug,
      imageUrl: buildImageUrl(entry),
      bodyText: extractBodyText(entry.Content),
    })

    if (publishResult.skipped) {
      strapi.log.info(`[VK] Skip posting blog ${documentId}: ${publishResult.reason}`)
      return
    }

    if (!publishResult.postId) return

    if (publishResult.imageError) {
      strapi.log.warn(`[VK] Blog ${documentId} posted without image: ${publishResult.imageError}`)
    }

    // Persist on the draft so re-publishing the same document does not repost.
    await strapi.documents(BLOG_UID).update({
      documentId,
      data: { vkPostId: publishResult.postId },
    })

    strapi.log.info(`[VK] Blog ${documentId} posted with id ${publishResult.postId}`)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    strapi.log.error(`[VK] Failed to post blog ${documentId}: ${message}`)
  }
}
