import { postToTelegramChannel } from './telegramPosting'

type PublishNewsToTelegramInput = {
  title?: string | null
  description?: string | null
  slug?: string | null
  imageUrl?: string | null
  bodyText?: string | null
}

type PublishNewsToTelegramResult = {
  skipped: boolean
  reason?: string
  messageId?: number
  imageError?: string
}

const clean = (value: string | null | undefined): string =>
  typeof value === 'string' ? value.trim() : ''

const buildNewsUrl = (siteUrl: string, slug: string): string =>
  `${siteUrl.replace(/\/$/, '')}/news/${encodeURIComponent(slug)}`

const buildMessage = (title: string, description: string, bodyText: string): string =>
  [title, description, bodyText].filter((part) => part.length > 0).join('\n\n')

export const publishNewsToTelegram = async ({
  title,
  description,
  slug,
  imageUrl,
  bodyText,
}: PublishNewsToTelegramInput): Promise<PublishNewsToTelegramResult> => {
  const enabled = clean(process.env.TELEGRAM_POSTING_ENABLED).toLowerCase()
  if (enabled !== 'true') {
    return { skipped: true, reason: 'TELEGRAM_POSTING_ENABLED is not true' }
  }

  const botToken = clean(process.env.TELEGRAM_BOT_TOKEN)
  const chatId = clean(process.env.TELEGRAM_CHANNEL_ID)
  const siteUrl = clean(process.env.SITE_URL)

  if (!botToken) return { skipped: true, reason: 'TELEGRAM_BOT_TOKEN is empty' }
  if (!chatId) return { skipped: true, reason: 'TELEGRAM_CHANNEL_ID is empty' }
  if (!siteUrl) return { skipped: true, reason: 'SITE_URL is empty' }

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

  if (normalizedImageUrl) {
    try {
      const withImage = await postToTelegramChannel({
        botToken,
        chatId,
        message,
        imageUrl: normalizedImageUrl,
        linkUrl,
      })
      return { skipped: false, messageId: withImage.messageId }
    } catch (error) {
      // A bad/oversized image URL must not block the post itself. Fall back to a
      // text-only message and report the image failure to the caller.
      const imageError = error instanceof Error ? error.message : String(error)
      const textOnly = await postToTelegramChannel({ botToken, chatId, message, linkUrl })
      return { skipped: false, messageId: textOnly.messageId, imageError }
    }
  }

  const result = await postToTelegramChannel({ botToken, chatId, message, linkUrl })

  return { skipped: false, messageId: result.messageId }
}
