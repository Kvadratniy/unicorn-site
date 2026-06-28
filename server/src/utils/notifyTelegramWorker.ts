type NotifyTelegramWorkerInput = {
  title?: string | null
  description?: string | null
  slug?: string | null
  imageUrl?: string | null
  bodyText?: string | null
}

type NotifyTelegramWorkerResult = {
  skipped: boolean
  reason?: string
  messageId?: number
  imageError?: string
}

type WorkerResponse = {
  ok: boolean
  error?: string
  messageId?: number
  method?: 'sendPhoto' | 'sendMessage'
  imageError?: string
}

const clean = (value: string | null | undefined): string =>
  typeof value === 'string' ? value.trim() : ''

// Tolerate values configured without a scheme/path so a typo in env does not
// break posting (fetch requires an absolute URL, the worker serves `/post`).
const normalizeWorkerUrl = (value: string): string => {
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`
  const url = new URL(withScheme)
  if (url.pathname === '' || url.pathname === '/') url.pathname = '/post'
  return url.toString()
}

const buildNewsUrl = (siteUrl: string, slug: string): string =>
  `${siteUrl.replace(/\/$/, '')}/news/${encodeURIComponent(slug)}`

const buildMessage = (title: string, description: string, bodyText: string): string =>
  [title, description, bodyText].filter((part) => part.length > 0).join('\n\n')

/**
 * Builds the news payload and forwards it to the Cloudflare Worker that owns the
 * Telegram bot token. The worker handles the actual Bot API call (and the
 * image -> text fallback), keeping the secret off this server.
 */
export const notifyTelegramWorker = async ({
  title,
  description,
  slug,
  imageUrl,
  bodyText,
}: NotifyTelegramWorkerInput): Promise<NotifyTelegramWorkerResult> => {
  const enabled = clean(process.env.TELEGRAM_POSTING_ENABLED).toLowerCase()
  if (enabled !== 'true') {
    return { skipped: true, reason: 'TELEGRAM_POSTING_ENABLED is not true' }
  }

  const workerUrl = clean(process.env.TELEGRAM_WORKER_URL)
  const workerSecret = clean(process.env.TELEGRAM_WORKER_SECRET)
  const siteUrl = clean(process.env.SITE_URL)

  if (!workerUrl) return { skipped: true, reason: 'TELEGRAM_WORKER_URL is empty' }
  if (!workerSecret) return { skipped: true, reason: 'TELEGRAM_WORKER_SECRET is empty' }
  if (!siteUrl) return { skipped: true, reason: 'SITE_URL is empty' }

  const normalizedTitle = clean(title)
  const normalizedSlug = clean(slug)
  if (!normalizedTitle || !normalizedSlug) {
    return { skipped: true, reason: 'News title or slug is empty' }
  }

  const message = buildMessage(normalizedTitle, clean(description), clean(bodyText))
  const linkUrl = buildNewsUrl(siteUrl, normalizedSlug)
  const normalizedImageUrl = clean(imageUrl)

  const response = await fetch(normalizeWorkerUrl(workerUrl), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${workerSecret}`,
    },
    body: JSON.stringify({
      message,
      linkUrl,
      imageUrl: normalizedImageUrl || undefined,
    }),
  })

  const payload = (await response.json().catch(() => null)) as WorkerResponse | null

  if (!response.ok || !payload?.ok) {
    const reason = payload?.error || `Worker responded with HTTP ${response.status}`
    throw new Error(reason)
  }

  return {
    skipped: false,
    messageId: payload.messageId,
    imageError: payload.imageError,
  }
}
