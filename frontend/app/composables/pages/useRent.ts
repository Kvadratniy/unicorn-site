export type { RentContent } from '~/composables/useStrapiApi'

import { computed } from 'vue'
import type { RentContent } from '~/composables/useStrapiApi'
import { pickMediaUrl, toMediaUrl } from '~/composables/pages/contentMappers'

type SharedImageCms = {
  src?: unknown
  alt?: string
} | null

type SharedItemCms = {
  title?: string
  value?: string
  icon?: string
}

type RentHeroCms = {
  Title?: {
    line_1?: string
    line_2?: string
    description?: string
  } | null
  image?: SharedImageCms
  Card?: SharedItemCms[] | null
  Chip?: string
}

type RentMainCms = {
  title?: string
  description?: string
  paragraph?: string
  Cards?: SharedItemCms[] | null
  images?: Array<{
    url?: string
    formats?: {
      large?: { url?: string }
      medium?: { url?: string }
    }
  }> | null
}

type RentVariantCms = {
  title?: string
  subtitle?: string
  tag?: string
  description?: string
  Image?: SharedImageCms
  lines?: SharedItemCms[] | null
  price?: string
}

type RentCms = {
  HeroBlock?: RentHeroCms | null
  MainBlock?: RentMainCms | null
  VariantsBlock?: {
    Variant?: RentVariantCms[] | null
  } | null
}

export type RentHighlightViewModel = {
  title: string
  text: string
}

export type RentHeroViewModel = {
  titleAccent: string
  titleLine2: string
  description: string
  caption: string
  imageSrc: string
  imageAlt: string
}

export type RentIntroViewModel = {
  title: string
  lead: string
  imageSrc: string
  imageAlt: string
  highlights: RentHighlightViewModel[]
}

export type RentOptionViewModel = {
  title: string
  subtitle: string
  tag: string
  price: string
  imageSrc: string
  imageAlt: string
  description: string
  features: string[]
}

const mapHighlights = (value: unknown): RentHighlightViewModel[] =>
  Array.isArray(value)
    ? value
      .map((item) => {
        const title = typeof item === 'object' && item && typeof (item as { title?: unknown }).title === 'string'
          ? (item as { title: string }).title
          : ''
        const text = typeof item === 'object' && item && typeof (item as { text?: unknown }).text === 'string'
          ? (item as { text: string }).text
          : typeof item === 'object' && item && typeof (item as { value?: unknown }).value === 'string'
            ? (item as { value: string }).value
          : ''
        if (!title.trim() || !text.trim()) return null
        return { title, text }
      })
      .filter((item): item is RentHighlightViewModel => Boolean(item))
    : []

export const useRent = async (key = 'rent-content') => {
  const api = useStrapiApi()
  const runtimeConfig = useRuntimeConfig()
  const strapiBaseUrl = String(runtimeConfig.public?.strapi?.url || '').replace(/\/$/, '')

  const asyncData = await useAsyncData<RentContent | null>(
    key,
    () => api.fetchRent(),
    { default: () => null, server: true },
  )

  const rent = computed(() => asyncData.data.value as RentCms | null)

  const hero = computed<RentHeroViewModel>(() => {
    const heroData = rent.value?.HeroBlock
    const titleLines = heroData?.Title
    const imageSrc = pickMediaUrl(heroData?.image, strapiBaseUrl) || ''

    return {
      titleAccent: titleLines?.line_1 || '',
      titleLine2: titleLines?.line_2 || '',
      description: titleLines?.description || '',
      caption: heroData?.Chip || '',
      imageSrc,
      imageAlt: heroData?.image?.alt || titleLines?.line_1 || '',
    }
  })

  const intro = computed<RentIntroViewModel>(() => {
    const info = rent.value?.MainBlock
    const lead = [info?.description, info?.paragraph]
      .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
      .join(' ')
      .trim()

    const introImages = (info?.images || [])
      .map(image => toMediaUrl(image?.formats?.large?.url || image?.formats?.medium?.url || image?.url, strapiBaseUrl))
      .filter((url): url is string => typeof url === 'string' && url.trim().length > 0)

    const highlights = mapHighlights(info?.Cards)

    return {
      title: info?.title || '',
      lead: lead || '',
      imageSrc: introImages[0] || '',
      imageAlt: info?.title || '',
      highlights,
    }
  })

  const options = computed<RentOptionViewModel[]>(() => {
    const variants = rent.value?.VariantsBlock?.Variant || []

    return variants
      .map((variant) => {
        const title = variant?.title || ''
        if (!title) return null

        const imageSrc = pickMediaUrl(variant?.Image, strapiBaseUrl) || ''
        const features = Array.isArray(variant?.lines)
          ? variant.lines
            .map((line) => {
              if (!line || typeof line !== 'object') return ''
              const value = typeof line.value === 'string' ? line.value.trim() : ''
              const lineTitle = typeof line.title === 'string' ? line.title.trim() : ''
              return value || lineTitle
            })
            .filter((line): line is string => Boolean(line))
          : []

        return {
          title,
          subtitle: variant?.subtitle || '',
          tag: variant?.tag || '',
          price: variant?.price || '',
          imageSrc,
          imageAlt: variant?.Image?.alt || title,
          description: variant?.description || '',
          features,
        }
      })
      .filter((item): item is RentOptionViewModel => Boolean(item))
  })

  return {
    rent,
    hero,
    intro,
    options,
    pending: asyncData.pending,
    error: asyncData.error,
    refresh: asyncData.refresh,
  }
}
