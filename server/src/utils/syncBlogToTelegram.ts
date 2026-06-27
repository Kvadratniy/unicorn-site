import { publishNewsToTelegram } from './publishNewsToTelegram'

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
  postToTelegram?: boolean | null
  telegramPostId?: number | null
  MainImage?: BlogImage | null
  Content?: BlogContentBlock[] | null
}

const BLOG_UID = 'api::blog.blog'
type DocumentStatus = 'draft' | 'published'

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
 * Posts a freshly published blog entry to the Telegram channel.
 * Triggered from the document service middleware on the `publish` action.
 */
export const syncBlogToTelegram = async (documentId: string | undefined): Promise<void> => {
  if (!documentId) return

  let entry: BlogEntry | null = null
  try {
    entry = await fetchPublishedBlog(documentId)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    strapi.log.error(`[Telegram] Failed to load published blog ${documentId}: ${message}`)
    return
  }

  if (!entry) {
    strapi.log.warn(`[Telegram] Published blog ${documentId} not found, skip posting`)
    return
  }

  if (entry.postToTelegram === false) {
    strapi.log.info(`[Telegram] Blog ${documentId} has postToTelegram disabled, skip`)
    return
  }

  if (entry.telegramPostId) {
    strapi.log.info(
      `[Telegram] Blog ${documentId} already posted (telegramPostId=${entry.telegramPostId}), skip`,
    )
    return
  }

  try {
    const publishResult = await publishNewsToTelegram({
      title: entry.title,
      description: entry.description,
      slug: entry.slug,
      imageUrl: buildImageUrl(entry),
      bodyText: extractBodyText(entry.Content),
    })

    if (publishResult.skipped) {
      strapi.log.info(`[Telegram] Skip posting blog ${documentId}: ${publishResult.reason}`)
      return
    }

    if (!publishResult.messageId) return

    if (publishResult.imageError) {
      strapi.log.warn(
        `[Telegram] Blog ${documentId} posted without image: ${publishResult.imageError}`,
      )
    }

    const persistStatuses: DocumentStatus[] = ['draft', 'published']
    for (const status of persistStatuses) {
      try {
        // Persist for both statuses so re-publishing the same document does not
        // repost and the id is visible in admin regardless of selected view.
        // Cast keeps the build independent of generated content-type types.
        await strapi.documents(BLOG_UID).update({
          documentId,
          status,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: { telegramPostId: publishResult.messageId } as any,
        })
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        strapi.log.warn(
          `[Telegram] Failed to persist telegramPostId for ${status} status of blog ${documentId}: ${message}`,
        )
      }
    }

    strapi.log.info(`[Telegram] Blog ${documentId} posted with message id ${publishResult.messageId}`)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    strapi.log.error(`[Telegram] Failed to post blog ${documentId}: ${message}`)
  }
}