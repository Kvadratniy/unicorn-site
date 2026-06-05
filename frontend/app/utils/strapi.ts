export type AnyRecord = Record<string, any>

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

export const asRecord = (value: unknown): AnyRecord | null =>
  typeof value === 'object' && value !== null ? (value as AnyRecord) : null

export const withAttributes = (value: unknown): AnyRecord => {
  const entity = asRecord(value)
  if (!entity) return {}
  const attributes = asRecord(entity.attributes) || {}
  return { ...attributes, ...entity }
}

export const relationToArray = (value: unknown): AnyRecord[] => {
  if (Array.isArray(value)) return value.map(withAttributes)
  const record = asRecord(value)
  if (record && Array.isArray(record.data)) return record.data.map(withAttributes)
  return []
}

export const relationToSingle = (value: unknown): AnyRecord => {
  const record = asRecord(value)
  if (record && record.data) return withAttributes(record.data)
  return withAttributes(value)
}

export const pickString = (obj: AnyRecord, keys: string[]): string => {
  for (const key of keys) {
    const value = obj[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
    if (typeof value === 'number') return String(value)
  }
  return ''
}

export const parseFeatures = (value: unknown): string[] => {
  if (Array.isArray(value))
    return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
  const record = asRecord(value)
  if (record) {
    const nested = record.features ?? record.items ?? record.list
    if (Array.isArray(nested))
      return nested.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
  }
  if (typeof value === 'string') return value.split(',').map(item => item.trim()).filter(Boolean)
  return []
}

export const normalizeMediaUrl = (path: unknown, strapiBaseUrl: string): string | undefined => {
  if (typeof path !== 'string' || !path.trim()) return undefined
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/images/')) return path
  if (path.startsWith('/uploads/')) return strapiBaseUrl ? `${strapiBaseUrl}${path}` : path
  return path
}

export const extractImageUrl = (value: unknown, strapiBaseUrl: string): string | undefined => {
  const media = relationToArray(value)[0] || withAttributes(value)
  const rawUrl = media.formats?.small?.url || media.formats?.thumbnail?.url || media.url
  return normalizeMediaUrl(rawUrl, strapiBaseUrl)
}

export const stringifyError = (error: unknown): string => {
  if (error instanceof Error && error.message) return error.message

  const record = asRecord(error)
  if (!record) return String(error ?? 'unknown error')

  const status
    = typeof record.statusCode === 'number'
      ? record.statusCode
      : typeof record.status === 'number'
        ? record.status
        : undefined

  const statusMessage
    = typeof record.statusMessage === 'string'
      ? record.statusMessage
      : typeof record.statusText === 'string'
        ? record.statusText
        : ''

  const data = asRecord(record.data)
  const dataError = asRecord(data?.error)
  const apiMessage
    = typeof dataError?.message === 'string'
      ? dataError.message
      : typeof data?.message === 'string'
        ? data.message
        : ''

  const parts = [status ? String(status) : '', statusMessage, apiMessage].filter(Boolean)
  if (parts.length) return parts.join(' ')

  try {
    return JSON.stringify(error)
  }
  catch {
    return String(error ?? 'unknown error')
  }
}
