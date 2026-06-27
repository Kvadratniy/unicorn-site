type TelegramApiPrimitive = string | number | boolean

type TelegramApiParams = Record<string, TelegramApiPrimitive | undefined>

type TelegramApiResult<T> =
  | { ok: true; result: T }
  | { ok: false; error_code: number; description: string }

type TelegramMessageResponse = {
  message_id: number
}

export type PostToTelegramChannelInput = {
  botToken: string
  chatId: string
  message: string
  imageUrl?: string
  linkUrl?: string
  parseMode?: 'HTML' | 'MarkdownV2'
  disableWebPagePreview?: boolean
}

export type PostToTelegramChannelResult = {
  messageId: number
  method: 'sendPhoto' | 'sendMessage'
  /** Set when sendPhoto failed and the post fell back to a text-only message. */
  imageError?: string
}

const TELEGRAM_API_BASE = 'https://api.telegram.org'
const MAX_TELEGRAM_MESSAGE_LENGTH = 4096
const MAX_TELEGRAM_CAPTION_LENGTH = 1024

const clampText = (value: string, maxLength: number): string => {
  const normalized = value.trim()
  if (normalized.length <= maxLength) return normalized
  return `${normalized.slice(0, maxLength - 1)}…`
}

const buildPostText = (message: string, linkUrl?: string): string => {
  const trimmedMessage = message.trim()
  const trimmedLink = linkUrl?.trim()
  if (!trimmedLink) return trimmedMessage
  return `${trimmedMessage}\n\n${trimmedLink}`
}

const toSearchParams = (params: TelegramApiParams): URLSearchParams => {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue
    search.set(key, String(value))
  }
  return search
}

const callTelegramApi = async <T>(
  botToken: string,
  method: string,
  params: TelegramApiParams,
): Promise<T> => {
  const endpoint = `${TELEGRAM_API_BASE}/bot${botToken}/${method}`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: toSearchParams(params),
  })

  const payload = (await response.json()) as TelegramApiResult<T>
  if (payload.ok === false) {
    throw new Error(`[Telegram API] ${method} failed: ${payload.error_code} ${payload.description}`)
  }

  return payload.result
}

const sendMessage = async (
  botToken: string,
  chatId: string,
  text: string,
  parseMode?: PostToTelegramChannelInput['parseMode'],
  disableWebPagePreview = true,
): Promise<number> => {
  const result = await callTelegramApi<TelegramMessageResponse>(botToken, 'sendMessage', {
    chat_id: chatId,
    text: clampText(text, MAX_TELEGRAM_MESSAGE_LENGTH),
    parse_mode: parseMode,
    disable_web_page_preview: disableWebPagePreview,
  })
  return result.message_id
}

export const postToTelegramChannel = async ({
  botToken,
  chatId,
  message,
  imageUrl,
  linkUrl,
  parseMode,
  disableWebPagePreview = true,
}: PostToTelegramChannelInput): Promise<PostToTelegramChannelResult> => {
  if (!botToken.trim()) throw new Error('Telegram bot token is required')
  if (!chatId.trim()) throw new Error('Telegram chatId is required')
  if (!message.trim()) throw new Error('Telegram message must not be empty')

  const trimmedChatId = chatId.trim()
  const text = buildPostText(message, linkUrl)
  const trimmedImageUrl = imageUrl?.trim()

  if (trimmedImageUrl) {
    try {
      const result = await callTelegramApi<TelegramMessageResponse>(botToken, 'sendPhoto', {
        chat_id: trimmedChatId,
        photo: trimmedImageUrl,
        caption: clampText(text, MAX_TELEGRAM_CAPTION_LENGTH),
        parse_mode: parseMode,
      })
      return { messageId: result.message_id, method: 'sendPhoto' }
    } catch (error) {
      // A bad/oversized image URL must not block the post. Fall back to text-only
      // and report the image failure to the caller.
      const imageError = error instanceof Error ? error.message : String(error)
      const messageId = await sendMessage(botToken, trimmedChatId, text, parseMode, disableWebPagePreview)
      return { messageId, method: 'sendMessage', imageError }
    }
  }

  const messageId = await sendMessage(botToken, trimmedChatId, text, parseMode, disableWebPagePreview)
  return { messageId, method: 'sendMessage' }
}
