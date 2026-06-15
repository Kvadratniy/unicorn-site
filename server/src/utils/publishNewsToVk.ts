import { postToVkCommunity } from './vkPosting'

type PublishNewsToVkInput = {
  title?: string | null
  description?: string | null
  slug?: string | null
  imageUrl?: string | null
  bodyText?: string | null
}

type PublishNewsToVkResult = {
  skipped: boolean
  reason?: string
  postId?: number
  imageError?: string
}

const clean = (value: string | null | undefined): string => (typeof value === 'string' ? value.trim() : '')

const buildNewsUrl = (siteUrl: string, slug: string): string =>
  `${siteUrl.replace(/\/$/, '')}/news/${encodeURIComponent(slug)}`

const buildMessage = (title: string, description: string, bodyText: string): string =>
  [title, description, bodyText].filter((part) => part.length > 0).join('\n\n')

export const publishNewsToVk = async ({
  title,
  description,
  slug,
  imageUrl,
  bodyText,
}: PublishNewsToVkInput): Promise<PublishNewsToVkResult> => {
  const enabled = clean(process.env.VK_POSTING_ENABLED).toLowerCase()
  if (enabled !== 'true') {
    return { skipped: true, reason: 'VK_POSTING_ENABLED is not true' }
  }

  const accessToken = clean(process.env.VK_ACCESS_TOKEN)
  const groupIdRaw = clean(process.env.VK_GROUP_ID)
  const siteUrl = clean(process.env.SITE_URL)

  if (!accessToken) return { skipped: true, reason: 'VK_ACCESS_TOKEN is empty' }
  if (!groupIdRaw) return { skipped: true, reason: 'VK_GROUP_ID is empty' }
  if (!siteUrl) return { skipped: true, reason: 'SITE_URL is empty' }

  const groupId = Number(groupIdRaw)
  if (!Number.isFinite(groupId) || groupId <= 0) {
    return { skipped: true, reason: 'VK_GROUP_ID must be a positive number' }
  }

  const normalizedTitle = clean(title)
  const normalizedSlug = clean(slug)
  if (!normalizedTitle || !normalizedSlug) {
    return { skipped: true, reason: 'News title or slug is empty' }
  }

  const normalizedDescription = clean(description)
  const normalizedBody = clean(bodyText)
  const normalizedImageUrl = clean(imageUrl)
  const linkUrl = buildNewsUrl(siteUrl, normalizedSlug)
  const message = buildMessage(normalizedTitle, normalizedDescription, normalizedBody)
  // Append the link to the text instead of passing it as a VK link attachment.
  // A bare link attachment fails with error 100 (link_photo_sizing_rule) when the
  // page has no properly sized og:image, which would block the entire post.
  const messageWithLink = `${message}\n\n${linkUrl}`

  const result = await postToVkCommunity({
    accessToken,
    groupId,
    message: messageWithLink,
    imageUrl: normalizedImageUrl || undefined,
  })

  return {
    skipped: false,
    postId: result.postId,
    imageError: result.imageError,
  }
}
