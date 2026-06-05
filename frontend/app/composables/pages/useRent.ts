export type { RentContent } from '~/composables/useStrapiApi'

import { computed } from 'vue'
import type { RentContent } from '~/composables/useStrapiApi'
import { pickMedia, toMediaUrl, toStringList } from '~/composables/pages/contentMappers'

type RentHeroCms = {
  Title?: {
    line_1?: string
    line_2?: string
    description?: string
  } | null
  Card?: Array<{ title?: string; value?: string }> | null
  title?: string
  title2?: string
  description?: string
  caption?: string
  image?: unknown
  Image?: unknown
}

type RentMainCms = {
  title?: string
  description?: string
  paragraph?: string
  Cards?: Array<{ title?: string; value?: string }> | null
  tags?: { values?: Array<{ title?: string; text?: string }> } | null
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
  ctaLabel?: string
  image?: unknown
  Image?: unknown
  description?: string
  lines?: Array<{ title?: string; value?: string }> | null
  features?: unknown
}

type RentCms = {
  HeroBlock?: RentHeroCms | null
  MainBlock?: RentMainCms | null
  VariantsBlock?: {
    Variant?: RentVariantCms[] | null
  } | null
  Hero?: RentHeroCms | null
  Info?: RentMainCms[] | null
  Variants?: {
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
  ctaLabel: string
  imageSrc: string
  imageAlt: string
  description: string
  features: string[]
}

const FALLBACK_HERO: RentHeroViewModel = {
  titleAccent: 'Аренда пространства',
  titleLine2: 'для вашей музыки',
  description: 'Аренда вокального класса и студии звукозаписи. Комфортные условия для репетиций, записи и работы над материалом в удобном формате.',
  caption: '2 формата аренды: вокальный класс и студия звукозаписи',
  imageSrc: '/images/rent.png',
  imageAlt: 'Интерьер студии для аренды',
}

const FALLBACK_INTRO: RentIntroViewModel = {
  title: 'Аренда вокального класса и студии звукозаписи',
  lead: 'Если вам нужно пространство для репетиций, уроков или записи со своей командой, подберем подходящий формат аренды. Поможем выбрать удобное время и расскажем, какой вариант лучше подойдет под ваши задачи.',
  imageSrc: '/images/rent-1.png',
  imageAlt: 'Пространство Unicorn Studio для аренды',
  highlights: [
    { title: 'Почасовое бронирование', text: 'Подберем удобные слоты под ваш график' },
    { title: '2 формата аренды', text: 'Вокальный класс и студия звукозаписи' },
    { title: 'Комфортная среда', text: 'Подходит для репетиций, занятий и записи' },
  ],
}

const FALLBACK_OPTIONS: RentOptionViewModel[] = [
  {
    title: 'Аренда вокального класса',
    subtitle: 'Готовое пространство для занятий и регулярной практики',
    tag: 'Для преподавателей и артистов',
    ctaLabel: 'Забронировать вокальный класс',
    imageSrc: '/images/studio/studio-main.jpg',
    imageAlt: 'Вокальный класс Unicorn Studio',
    description: 'Запускайте уроки, репетиции и вокальные разборы в комфортной среде без организационных сложностей.',
    features: [
      'Быстрый старт: заезжаете и работаете сразу',
      'Почасовое бронирование под ваш график',
      'Уютная акустика для продуктивной практики',
    ],
  },
  {
    title: 'Аренда студии звукозаписи',
    subtitle: 'Профессиональная среда для записи и творческих сессий',
    tag: 'Для артистов и команд',
    ctaLabel: 'Забронировать студию',
    imageSrc: '/images/studio/studio.jpg',
    imageAlt: 'Студия звукозаписи Unicorn Studio',
    description: 'Работайте над материалом в подготовленной студии, где все настроено для сфокусированной и качественной записи.',
    features: [
      'Студийный сетап для сольных и командных сессий',
      'Комфортная атмосфера для длинных рабочих блоков',
      'Гибкое бронирование по времени',
    ],
  },
]

const pickImageUrl = (image: unknown, strapiBaseUrl: string): string => {
  const media = pickMedia(image)
  return toMediaUrl(
    media?.formats?.large?.url || media?.formats?.medium?.url || media?.url,
    strapiBaseUrl,
  ) || ''
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
    const heroData = rent.value?.HeroBlock || rent.value?.Hero
    const titleLines = heroData?.Title
    const imageSrc = pickImageUrl(heroData?.image || heroData?.Image, strapiBaseUrl) || FALLBACK_HERO.imageSrc

    return {
      titleAccent: titleLines?.line_1 || heroData?.title || FALLBACK_HERO.titleAccent,
      titleLine2: titleLines?.line_2 || heroData?.title2 || FALLBACK_HERO.titleLine2,
      description: titleLines?.description || heroData?.description || FALLBACK_HERO.description,
      caption: heroData?.caption || FALLBACK_HERO.caption,
      imageSrc,
      imageAlt: titleLines?.line_1 || heroData?.title || FALLBACK_HERO.imageAlt,
    }
  })

  const intro = computed<RentIntroViewModel>(() => {
    const info = rent.value?.MainBlock || rent.value?.Info?.[0]
    const lead = [info?.description, info?.paragraph]
      .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
      .join(' ')
      .trim()

    const introImages = (info?.images || [])
      .map(image => toMediaUrl(image?.formats?.large?.url || image?.formats?.medium?.url || image?.url, strapiBaseUrl))
      .filter((url): url is string => typeof url === 'string' && url.trim().length > 0)

    const highlights = mapHighlights(info?.Cards || info?.tags?.values)

    return {
      title: info?.title || FALLBACK_INTRO.title,
      lead: lead || FALLBACK_INTRO.lead,
      imageSrc: introImages[0] || FALLBACK_INTRO.imageSrc,
      imageAlt: info?.title || FALLBACK_INTRO.imageAlt,
      highlights: highlights.length ? highlights : FALLBACK_INTRO.highlights,
    }
  })

  const options = computed<RentOptionViewModel[]>(() => {
    const variants = rent.value?.VariantsBlock?.Variant || rent.value?.Variants?.Variant || []

    const mapped = variants
      .map((variant) => {
        const title = variant?.title || ''
        if (!title) return null

        const imageSrc = pickImageUrl(variant?.Image || variant?.image, strapiBaseUrl)
        const features = toStringList(variant?.features)
        const lineFeatures = Array.isArray(variant?.lines)
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
          ctaLabel: variant?.ctaLabel || '',
          imageSrc: imageSrc || FALLBACK_OPTIONS[0].imageSrc,
          imageAlt: title,
          description: variant?.description || '',
          features: features.length ? features : lineFeatures,
        }
      })
      .filter((item): item is RentOptionViewModel => Boolean(item))

    if (mapped.length) {
      return mapped.map((item, index) => ({
        ...item,
        subtitle: item.subtitle || FALLBACK_OPTIONS[index]?.subtitle || '',
        tag: item.tag || FALLBACK_OPTIONS[index]?.tag || '',
        ctaLabel: item.ctaLabel || FALLBACK_OPTIONS[index]?.ctaLabel || '',
        imageSrc: item.imageSrc || FALLBACK_OPTIONS[index]?.imageSrc || FALLBACK_OPTIONS[0].imageSrc,
        imageAlt: item.imageAlt || FALLBACK_OPTIONS[index]?.imageAlt || item.title,
        description: item.description || FALLBACK_OPTIONS[index]?.description || '',
        features: item.features.length ? item.features : (FALLBACK_OPTIONS[index]?.features || []),
      }))
    }

    return FALLBACK_OPTIONS
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
