import { buildStrapiClient, type StrapiListResponse, type StrapiSingleResponse } from '../../utils/strapi'

const parseFetchError = (error: unknown, fallbackMessage: string) => {
  const record = typeof error === 'object' && error !== null ? (error as Record<string, any>) : {}
  const status
    = typeof record.statusCode === 'number'
      ? record.statusCode
      : typeof record.status === 'number'
        ? record.status
        : undefined
  const message = typeof record.message === 'string' ? record.message : fallbackMessage
  return { status, message }
}

export const buildPopulateQuery = (
  paths: string[],
  baseQuery: Record<string, unknown> = {},
): Record<string, unknown> =>
  paths.reduce<Record<string, unknown>>((query, path) => {
    const segments = path.split('.').map(segment => segment.trim()).filter(Boolean)
    if (!segments.length) return query

    query[`populate[${segments.join('][populate][')}][populate]`] = '*'
    return query
  }, { ...baseQuery })

export const buildPopulateFieldsQuery = (
  fieldsByPath: Record<string, string[]>,
  baseQuery: Record<string, unknown> = {},
): Record<string, unknown> =>
  Object.entries(fieldsByPath).reduce<Record<string, unknown>>((query, [path, fields]) => {
    const segments = path.split('.').map(segment => segment.trim()).filter(Boolean)
    if (!segments.length) return query

    const populatePath = `populate[${segments.join('][populate][')}]`
    fields.forEach((field, index) => {
      query[`${populatePath}[fields][${index}]`] = field
    })

    return query
  }, { ...baseQuery })

export const articlePopulateQuery = buildPopulateFieldsQuery(
  {
    cover: ['url'],
    'author.avatar': ['url'],
  },
  buildPopulateQuery(['blocks']),
)

export const fetchHomeSingle = async (
  endpoint: string,
  query: Record<string, unknown>,
  fallbackMessage: string,
) => {
  const { get } = buildStrapiClient()

  try {
    return await get<StrapiSingleResponse<unknown>>(endpoint, query)
  }
  catch (error) {
    const { status, message } = parseFetchError(error, fallbackMessage)
    console.error(`[api/home/${endpoint}] ${status ? `${status} ` : ''}${message}`)
    return {
      data: null,
      error: { status, name: 'FetchError', message },
    } satisfies StrapiSingleResponse<unknown>
  }
}

export const fetchHomeList = async (
  endpoint: string,
  query: Record<string, unknown>,
  fallbackMessage: string,
) => {
  const { get } = buildStrapiClient()

  try {
    return await get<StrapiListResponse<unknown>>(endpoint, query)
  }
  catch (error) {
    const { status, message } = parseFetchError(error, fallbackMessage)
    console.error(`[api/home/${endpoint}] ${status ? `${status} ` : ''}${message}`)
    return {
      data: [],
      error: { status, name: 'FetchError', message },
    } satisfies StrapiListResponse<unknown> & {
      error: { status?: number; name: string; message: string }
    }
  }
}
