export type { DistributionContent } from '~/composables/useStrapiApi'

import { computed } from 'vue'
import type { DistributionContent } from '~/composables/useStrapiApi'
import { pickMediaUrl, toMediaUrl } from '~/composables/pages/contentMappers'

type DistributionHeroCms = {
  Title?: {
    line_1?: string
    line_2?: string
    description?: string
  } | null
  image?: unknown
}

type DistributionMainCms = {
  title?: string
  description?: string
  paragraph?: string
  Cards?: Array<{ title?: string; value?: string }> | null
  images?: Array<{
    url?: string
    formats?: {
      large?: { url?: string }
      medium?: { url?: string }
    }
  }> | null
}

type DistributionVariantCms = {
  title?: string
  subtitle?: string
  description?: string
  lines?: Array<{ title?: string; value?: string }> | null
  ctaLabel?: string
  price?: string
}

type DistributionCms = {
  HeroBlock?: DistributionHeroCms | null
  MainBlock?: DistributionMainCms | null
  Variants?: {
    title?: string
    description?: string
    Variant?: DistributionVariantCms[] | null
  } | null
}

export type DistributionHeroViewModel = {
  titleAccent: string
  titleLine2: string
  description: string
  imageSrc: string
  imageAlt: string
}

export type DistributionHighlightViewModel = {
  title: string
  text: string
}

export type DistributionIntroViewModel = {
  title: string
  lead: string
  imageSrc: string
  imageAlt: string
  highlights: DistributionHighlightViewModel[]
}

export type DistributionPackageViewModel = {
  name: string
  subtitle: string
  description: string
  bullets: string[]
  cta: string
}

export type DistributionPackagesSectionViewModel = {
  eyebrow: string
  title: string
  subtitle: string
}

export const useDistribution = async (key = 'distribution-content') => {
  const api = useStrapiApi()
  const runtimeConfig = useRuntimeConfig()
  const strapiBaseUrl = String(runtimeConfig.public?.strapi?.url || '').replace(/\/$/, '')

  const asyncData = await useAsyncData<DistributionContent | null>(
    key,
    () => api.fetchDistribution(),
    { default: () => null, server: true },
  )

  const distribution = computed(() => asyncData.data.value as DistributionCms | null)

  const hero = computed<DistributionHeroViewModel>(() => {
    const heroData = distribution.value?.HeroBlock
    const titleLines = heroData?.Title
    const imageSrc = pickMediaUrl(heroData?.image, strapiBaseUrl) || ''

    return {
      titleAccent: titleLines?.line_1 || '',
      titleLine2: titleLines?.line_2 || '',
      description: titleLines?.description || '',
      imageSrc,
      imageAlt: titleLines?.line_1 || '',
    }
  })

  const intro = computed<DistributionIntroViewModel>(() => {
    const main = distribution.value?.MainBlock
    const lead = [main?.description, main?.paragraph]
      .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
      .join(' ')
      .trim()

    const introImages = (main?.images || [])
      .map(image => toMediaUrl(image?.formats?.large?.url || image?.formats?.medium?.url || image?.url, strapiBaseUrl))
      .filter((url): url is string => typeof url === 'string' && url.trim().length > 0)

    const highlights = Array.isArray(main?.Cards)
      ? main.Cards
        .map((item) => {
          const title = typeof item?.title === 'string' ? item.title.trim() : ''
          const text = typeof item?.value === 'string' ? item.value.trim() : ''
          if (!title || !text) return null
          return { title, text }
        })
        .filter((item): item is DistributionHighlightViewModel => item !== null)
      : []

    return {
      title: main?.title || '',
      lead: lead || '',
      imageSrc: introImages[0] || '',
      imageAlt: main?.title || '',
      highlights,
    }
  })

  const packagesSection = computed<DistributionPackagesSectionViewModel>(() => ({
    eyebrow: 'Пакеты услуг',
    title: distribution.value?.Variants?.title || '',
    subtitle: distribution.value?.Variants?.description || '',
  }))

  const packages = computed<DistributionPackageViewModel[]>(() => {
    const variants = distribution.value?.Variants?.Variant || []

    const mapped = variants
      .map((variant) => {
        const name = typeof variant?.title === 'string' ? variant.title.trim() : ''
        if (!name) return null

        const bullets = Array.isArray(variant?.lines)
          ? variant.lines
            .map((item) => {
              if (!item || typeof item !== 'object') return ''
              const value = typeof item.value === 'string' ? item.value.trim() : ''
              const title = typeof item.title === 'string' ? item.title.trim() : ''
              return value || title
            })
            .filter((item): item is string => Boolean(item))
          : []

        const ctaLabel = typeof variant?.ctaLabel === 'string' ? variant.ctaLabel.trim() : ''
        const price = typeof variant?.price === 'string' ? variant.price.trim() : ''

        return {
          name,
          subtitle: typeof variant?.subtitle === 'string' ? variant.subtitle : '',
          description: typeof variant?.description === 'string' ? variant.description : '',
          bullets,
          cta: ctaLabel || (price ? `Стоимость: ${price}` : ''),
        }
      })
      .filter((item): item is DistributionPackageViewModel => item !== null)

    return mapped
  })

  return {
    distribution,
    hero,
    intro,
    packagesSection,
    packages,
    pending: asyncData.pending,
    error: asyncData.error,
    refresh: asyncData.refresh,
  }
}
