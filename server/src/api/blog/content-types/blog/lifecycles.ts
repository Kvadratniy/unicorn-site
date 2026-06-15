import { publishNewsToVk } from '../../../../utils/publishNewsToVk'

type BlogRecord = {
  id?: number
  documentId?: string
  title?: string | null
  description?: string | null
  slug?: string | null
  publishedAt?: string | null
  vkPostId?: number | null
}

const maybeExtractRecord = (event: unknown): BlogRecord | null => {
  const result = (event as { result?: BlogRecord } | undefined)?.result
  if (!result || typeof result !== 'object') return null
  return result
}

const handlePublishedNews = async (event: unknown): Promise<void> => {
  const record = maybeExtractRecord(event)
  if (!record) return
  if (!record.publishedAt) return
  if (record.vkPostId) return

  try {
    const publishResult = await publishNewsToVk({
      title: record.title,
      description: record.description,
      slug: record.slug,
    })

    if (publishResult.skipped) {
      strapi.log.info(`[VK] Skip posting blog ${record.documentId || record.id}: ${publishResult.reason}`)
      return
    }

    if (!publishResult.postId) return

    if (record.id) {
      await strapi.db.query('api::blog.blog').update({
        where: { id: record.id },
        data: {
          vkPostId: publishResult.postId,
        },
      })
    } else if (record.documentId) {
      await strapi.documents('api::blog.blog').update({
        documentId: record.documentId,
        data: {
          vkPostId: publishResult.postId,
        },
      })
    }

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
