export type StrapiListResponse<T> = {
  data?: T[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type StrapiSingleResponse<T> = {
  data?: T | null
  error?: {
    status?: number
    name?: string
    message?: string
    details?: unknown
  } | null
}

export const buildStrapiClient = () => {
  const config = useRuntimeConfig()
  const baseUrl = String(config.strapi?.url || config.public?.strapi?.url || 'http://localhost:1337').replace(/\/$/, '')
  const token = config.strapi?.token

  const headers: Record<string, string> = {}
  if (typeof token === 'string' && token.trim()) {
    headers.Authorization = `Bearer ${token}`
  }

  const get = <T>(path: string, query?: Record<string, unknown>): Promise<T> =>
    $fetch<T>(`${baseUrl}/api/${path.replace(/^\//, '')}`, { headers, query })

  return { get }
}
