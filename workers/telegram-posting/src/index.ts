import type { Env } from './env'
import { postToTelegramChannel } from './telegram'

type PostRequestBody = {
  message?: string
  imageUrl?: string
  linkUrl?: string
  parseMode?: 'HTML' | 'MarkdownV2'
}

const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

const isAuthorized = (request: Request, secret: string): boolean => {
  if (!secret) return false
  const header = request.headers.get('Authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : header
  return token === secret
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === 'GET' && url.pathname === '/health') {
      return json({ ok: true })
    }

    if (request.method !== 'POST' || url.pathname !== '/post') {
      return json({ ok: false, error: 'Not found' }, 404)
    }

    if (!isAuthorized(request, env.WORKER_SECRET)) {
      return json({ ok: false, error: 'Unauthorized' }, 401)
    }

    let body: PostRequestBody
    try {
      body = (await request.json()) as PostRequestBody
    } catch {
      return json({ ok: false, error: 'Invalid JSON body' }, 400)
    }

    const message = (body.message || '').trim()
    if (!message) {
      return json({ ok: false, error: 'message is required' }, 400)
    }

    try {
      const result = await postToTelegramChannel({
        botToken: env.TELEGRAM_BOT_TOKEN,
        chatId: env.TELEGRAM_CHANNEL_ID,
        message,
        imageUrl: body.imageUrl,
        linkUrl: body.linkUrl,
        parseMode: body.parseMode,
      })

      return json({ ok: true, ...result })
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error)
      return json({ ok: false, error: reason }, 502)
    }
  },
} satisfies ExportedHandler<Env>
