import type { NavigationEntry, NavigationMenuItem } from '../../app/types/navigation.types'

type AnyRecord = Record<string, any>

const asRecord = (value: unknown): AnyRecord | null =>
  typeof value === 'object' && value !== null ? (value as AnyRecord) : null

const withAttributes = (value: unknown): AnyRecord => {
  const entity = asRecord(value)
  if (!entity) return {}
  const attributes = asRecord(entity.attributes) || {}
  return { ...attributes, ...entity }
}

const relationToArray = (value: unknown): AnyRecord[] => {
  if (Array.isArray(value)) return value.map(withAttributes)
  const record = asRecord(value)
  if (record && Array.isArray(record.data)) return record.data.map(withAttributes)
  return []
}

const relationToSingle = (value: unknown): AnyRecord => {
  const record = asRecord(value)
  if (record && record.data) return withAttributes(record.data)
  return withAttributes(value)
}

const pickString = (obj: AnyRecord, keys: string[]): string => {
  for (const key of keys) {
    const value = obj[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
    if (typeof value === 'number') return String(value)
  }
  return ''
}

const normalizeNavPath = (value: string): string => {
  const trimmed = value.trim()
  if (!trimmed || trimmed === '#') return '#'
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) return trimmed
  return `/${trimmed}`
}

const mapNavigationMenuItem = (value: unknown): NavigationMenuItem | null => {
  const item = withAttributes(value)
  const title = pickString(item, ['title', 'Title', 'name'])
  if (!title) return null

  return {
    title,
    description: pickString(item, ['description', 'Description', 'subtitle', 'Subtitle']),
    icon: pickString(item, ['icon', 'Icon']) || '✦',
    src: normalizeNavPath(pickString(item, ['src', 'link', 'url', 'path', 'slug']) || '#'),
  }
}

const mapNavigationEntry = (value: unknown): NavigationEntry | null => {
  const entry = withAttributes(value)
  const label = pickString(entry, ['title', 'Title', 'label', 'name'])
  if (!label) return null

  const subtitle = pickString(entry, ['subtitle', 'Subtitle', 'description', 'Description'])
  const nestedItems = relationToArray(entry.Navigation ?? entry.navigation)
    .map(mapNavigationMenuItem)
    .filter((item): item is NavigationMenuItem => item !== null)
  const baseEntry = subtitle ? { label, subtitle } : { label }

  if (nestedItems.length) {
    return { ...baseEntry, items: nestedItems }
  }

  const directLink = pickString(entry, ['src', 'link', 'url', 'path', 'slug'])
  if (directLink) {
    return { ...baseEntry, to: normalizeNavPath(directLink) }
  }

  return baseEntry
}

export const mapNavigationResponse = (response: unknown): NavigationEntry[] => {
  const entity = relationToSingle(response)
  return relationToArray(entity.Navigation ?? entity.navigation)
    .map(mapNavigationEntry)
    .filter((item): item is NavigationEntry => item !== null)
}
