type InstagramApiPrimitive = string | number | boolean

type InstagramApiParams = Record<string, InstagramApiPrimitive | undefined>

type InstagramApiError = {
  error: {
    message: string
    type: string
    code: number
    error_subcode?: number
    fbtrace_id?: string
  }
}

type InstagramCreateMediaResponse = {
  id: string
}

type InstagramPublishMediaResponse = {
  id: string
}

export type PostToInstagramInput = {
  /**
   * Instagram Business/Creator account id.
   */
  instagramAccountId: string
  /**
   * Long-lived user/page token with instagram_content_publish permission.
   */
  accessToken: string
  /**
   * Public image URL used to create media container.
   */
  imageUrl: string
  /**
   * Main post caption.
   */
  caption: string
  /**
   * Optional link appended to caption.
   */
  linkUrl?: string
  /**
   * Graph API version.
   */
  apiVersion?: string
}

export type PostToInstagramResult = {
  creationId: string
  mediaId: string
}

const DEFAULT_GRAPH_API_VERSION = 'v22.0'
const GRAPH_API_BASE_URL = 'https://graph.facebook.com'
const MAX_INSTAGRAM_CAPTION_LENGTH = 2200

const clampCaption = (caption: string): string => {
  const normalized = caption.trim()
  if (normalized.length <= MAX_INSTAGRAM_CAPTION_LENGTH) return normalized
  return `${normalized.slice(0, MAX_INSTAGRAM_CAPTION_LENGTH - 1)}…`
}

const buildCaption = (caption: string, linkUrl?: string): string => {
  const trimmedCaption = caption.trim()
  const trimmedLink = linkUrl?.trim()
  if (!trimmedLink) return trimmedCaption
  return `${trimmedCaption}\n\n${trimmedLink}`
}

const toSearchParams = (params: InstagramApiParams): URLSearchParams => {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue
    search.set(key, String(value))
  }
  return search
}

const callInstagramApi = async <T>(
  endpoint: string,
  params: InstagramApiParams,
): Promise<T> => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: toSearchParams(params),
  })

  const payload = (await response.json()) as T | InstagramApiError

  if (!response.ok || ('error' in payload && payload.error)) {
    const errorPayload = payload as InstagramApiError
    const details = errorPayload.error
      ? `${errorPayload.error.code} ${errorPayload.error.message}`
      : `HTTP ${response.status}`
    throw new Error(`[Instagram API] Request failed: ${details}`)
  }

  return payload as T
}

export const postToInstagram = async ({
  instagramAccountId,
  accessToken,
  imageUrl,
  caption,
  linkUrl,
  apiVersion = DEFAULT_GRAPH_API_VERSION,
}: PostToInstagramInput): Promise<PostToInstagramResult> => {
  if (!instagramAccountId.trim()) throw new Error('Instagram account id is required')
  if (!accessToken.trim()) throw new Error('Instagram access token is required')
  if (!imageUrl.trim()) throw new Error('Instagram imageUrl is required')
  if (!caption.trim()) throw new Error('Instagram caption must not be empty')

  const finalCaption = clampCaption(buildCaption(caption, linkUrl))
  const baseEndpoint = `${GRAPH_API_BASE_URL}/${apiVersion}/${instagramAccountId}`

  const created = await callInstagramApi<InstagramCreateMediaResponse>(`${baseEndpoint}/media`, {
    image_url: imageUrl.trim(),
    caption: finalCaption,
    access_token: accessToken.trim(),
  })

  const published = await callInstagramApi<InstagramPublishMediaResponse>(`${baseEndpoint}/media_publish`, {
    creation_id: created.id,
    access_token: accessToken.trim(),
  })

  return {
    creationId: created.id,
    mediaId: published.id,
  }
}
