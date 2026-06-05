export type StrapiMedia = {
  url?: string
  formats?: {
    large?: { url?: string }
    medium?: { url?: string }
  }
}

type CmsService = {
  advantages?: Array<{ title?: string; value?: string }> | null
  title?: string
  audience?: string | null
  description?: string
  price?: string
  new?: boolean
}

type CmsTeacher = {
  name?: string
  role?: string
  Title?: string
  Role?: string
  Subtitle?: string
  Achievements?: string
  description?: string | string[] | { values?: string[] } | null
  image?: StrapiMedia | null
  Image?: StrapiMedia | null
}

type CmsFaqItem = {
  Question?: string
  Answer?: string
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0

export const toMediaUrl = (path: unknown, strapiBaseUrl: string): string | undefined => {
  if (!isNonEmptyString(path)) return undefined
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  if (path.startsWith('/')) return strapiBaseUrl ? `${strapiBaseUrl}${path}` : path
  return path
}

export const pickMedia = (media: unknown): StrapiMedia | null => {
  if (Array.isArray(media)) return (media[0] as StrapiMedia) || null
  if (typeof media === 'object' && media !== null) return media as StrapiMedia
  return null
}

export const pickMediaUrl = (media: unknown, strapiBaseUrl: string): string | undefined => {
  if (isNonEmptyString(media)) return toMediaUrl(media, strapiBaseUrl)

  const direct = pickMedia(media)
  const nestedSource = direct && typeof direct === 'object'
    ? (direct as { src?: unknown }).src
    : undefined

  if (isNonEmptyString(nestedSource)) return toMediaUrl(nestedSource, strapiBaseUrl)

  const resolved = pickMedia(nestedSource) || direct
  if (!resolved) return undefined

  return toMediaUrl(
    resolved.formats?.large?.url
    || resolved.formats?.medium?.url
    || resolved.url
    || (isNonEmptyString((resolved as { src?: unknown }).src) ? (resolved as { src: string }).src : undefined),
    strapiBaseUrl,
  )
}

export const toStringList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => isNonEmptyString(item))
  }
  if (typeof value === 'object' && value !== null && Array.isArray((value as { values?: unknown[] }).values)) {
    return (value as { values: unknown[] }).values.filter((item): item is string => isNonEmptyString(item))
  }
  return isNonEmptyString(value) ? [value] : []
}

export const mapMainFeatures = <T extends { title: string; text: string }>(value: unknown): T[] =>
  Array.isArray(value)
    ? value.filter(
      (item): item is T =>
        Boolean(item)
        && isNonEmptyString((item as { title?: unknown }).title)
        && isNonEmptyString((item as { text?: unknown }).text),
    )
    : []

export const mapServiceItem = (service: unknown) => {
  if (!service || typeof service !== 'object') return null

  const typed = service as CmsService
  const title = isNonEmptyString(typed.title) ? typed.title : ''
  if (!title) return null

  const subtitle = isNonEmptyString(typed.audience) ? typed.audience : ''
  const description = isNonEmptyString(typed.description) ? typed.description : ''
  const priceFrom = isNonEmptyString(typed.price) ? typed.price : ''
  const isNew = typeof typed.new === 'boolean' ? typed.new : false
  const bullets = Array.isArray(typed.advantages)
    ? typed.advantages
      .map((item) => {
        if (!item || typeof item !== 'object') return ''
        const value = isNonEmptyString(item.value) ? item.value.trim() : ''
        const title = isNonEmptyString(item.title) ? item.title.trim() : ''
        return value || title
      })
      .filter((item): item is string => isNonEmptyString(item))
    : []

  return { title, subtitle, description, bullets, priceFrom, isNew }
}

export const mapTeacherItem = (teacher: unknown, strapiBaseUrl: string) => {
  if (!teacher || typeof teacher !== 'object') return null

  const typed = teacher as CmsTeacher
  const name = isNonEmptyString(typed.name) ? typed.name : isNonEmptyString(typed.Title) ? typed.Title : ''
  if (!name) return null

  const role = isNonEmptyString(typed.role) ? typed.role : isNonEmptyString(typed.Role) ? typed.Role : ''
  const descriptionData = typed.description ?? typed.Subtitle
  const achievements = isNonEmptyString(typed.Achievements) ? [typed.Achievements] : []
  const description = [...toStringList(descriptionData), ...achievements]

  const image = toMediaUrl(
    typed.image?.formats?.large?.url
    || typed.image?.formats?.medium?.url
    || typed.image?.url
    || typed.Image?.formats?.large?.url
    || typed.Image?.formats?.medium?.url
    || typed.Image?.url,
    strapiBaseUrl,
  ) || ''

  return { name, role, description, image }
}

export const mapFaqItems = (items: unknown): Array<{ question: string; answer: string }> =>
  Array.isArray(items)
    ? items
      .map((item): { question: string; answer: string } | null => {
        if (!item || typeof item !== 'object') return null
        const typed = item as CmsFaqItem
        const question = isNonEmptyString(typed.Question) ? typed.Question : ''
        const answer = isNonEmptyString(typed.Answer) ? typed.Answer : ''
        if (!question || !answer) return null
        return { question, answer }
      })
      .filter((item): item is { question: string; answer: string } => Boolean(item))
    : []
