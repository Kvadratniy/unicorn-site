type TelegramApiPrimitive = string | number | boolean

type TelegramApiParams = Record<string, TelegramApiPrimitive | undefined>

type TelegramApiSuccess<T> = {
  ok: true
  result: T
}

type TelegramApiFailure = {
  ok: false
  error_code: number
  description: string
}

type TelegramApiResult<T> = TelegramApiSuccess<T> | TelegramApiFailure

type TelegramMessageResponse = {
  message_id: number
}

export type PostToTelegramChannelInput = {
  /**
   * Bot token from @BotFather.
   */
  botToken: string
  /**
   * Channel id (e.g. @channel_name or -100xxxxxxxxxx).
   */
  chatId: string
  /**
   * Main message text.
   */
  message: string
  /**
   * Optional image URL for sendPhoto flow.
   */
  imageUrl?: string
  /**
   * Optional URL appended to post text/caption.
   */
  linkUrl?: string
  /**
   * Optional parse mode. Defaults to HTML.
   */
  parseMode?: 'HTML' | 'MarkdownV2'
  /**
   * Disable link previews for text-only posts.
   */
  disableWebPagePreview?: boolean
}

export type PostToTelegramChannelResult = {
  messageId: number
  method: 'sendPhoto' | 'sendMessage'
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
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: toSearchParams(params),
  })

  if (!response.ok) {
    throw new Error(`[Telegram API] ${method} failed with HTTP ${response.status}`)
  }

  const payload = (await response.json()) as TelegramApiResult<T>
  if (payload.ok === false) {
    throw new Error(`[Telegram API] ${method} failed: ${payload.error_code} ${payload.description}`)
  }

  return payload.result
}

export const postToTelegramChannel = async ({
  botToken,
  chatId,
  message,
  imageUrl,
  linkUrl,
  parseMode = 'HTML',
  disableWebPagePreview = true,
}: PostToTelegramChannelInput): Promise<PostToTelegramChannelResult> => {
  if (!botToken.trim()) throw new Error('Telegram bot token is required')
  if (!chatId.trim()) throw new Error('Telegram chatId is required')
  if (!message.trim()) throw new Error('Telegram message must not be empty')

  const text = buildPostText(message, linkUrl)

  if (imageUrl?.trim()) {
    const caption = clampText(text, MAX_TELEGRAM_CAPTION_LENGTH)
    const result = await callTelegramApi<TelegramMessageResponse>(botToken, 'sendPhoto', {
      chat_id: chatId.trim(),
      photo: imageUrl.trim(),
      caption,
      parse_mode: parseMode,
    })

    return {
      messageId: result.message_id,
      method: 'sendPhoto',
    }
  }

  const finalText = clampText(text, MAX_TELEGRAM_MESSAGE_LENGTH)
  const result = await callTelegramApi<TelegramMessageResponse>(botToken, 'sendMessage', {
    chat_id: chatId.trim(),
    text: finalText,
    parse_mode: parseMode,
    disable_web_page_preview: disableWebPagePreview,
  })

  return {
    messageId: result.message_id,
    method: 'sendMessage',
  }
}
