import { computed } from 'vue'
import type { MoodHeroContent } from '~/content/mood-hero-content'
import { pickMediaUrl } from '~/composables/pages/contentMappers'

type HomeHeroCms = {
  Card?: Array<{ title?: string; value?: string }> | null
  Title?: {
    line_1?: string
    line_2?: string
    description?: string
  } | null
  image?: unknown
  video?: unknown
}

type HomeCms = {
  Hero?: HomeHeroCms | null
}

const toMoodHeroContent = (home: HomeCms | null, strapiBaseUrl: string): MoodHeroContent => {
  const hero = home?.Hero
  const title = hero?.Title
  const cards = Array.isArray(hero?.Card) ? hero.Card : []

  const moodCards = cards
    .map((item, index) => {
      const tag = typeof item?.title === 'string' ? item.title.trim() : ''
      const title = typeof item?.value === 'string' ? item.value.trim() : ''
      if (!tag || !title) return null

      return {
        tag,
        title,
        imageSrc: '',
        imageAlt: tag,
      }
    })
    .filter((item): item is MoodHeroContent['moodCards'][number] => item !== null)

  const heroPosterSrc = pickMediaUrl(hero?.image, strapiBaseUrl) || ''
  const heroVideoSrc = pickMediaUrl(hero?.video, strapiBaseUrl) || ''

  return {
    heroPosterSrc,
    heroVideoSrc,
    moodCards,
    article: {
      directions: [],
      imageSrc: heroPosterSrc,
      imageAlt: title?.line_1 || '',
      titleLine1: title?.line_1 || '',
      titleLine2: title?.line_2 || '',
      body: title?.description || '',
    },
  }
}

export const useHome = async (key = 'home-page-content') => {
  const api = useStrapiApi()
  const runtimeConfig = useRuntimeConfig()
  const strapiBaseUrl = String(runtimeConfig.public?.strapi?.url || '').replace(/\/$/, '')

  const asyncData = await useAsyncData(
    key,
    () => api.fetchHomePage(),
    { default: () => null, server: true },
  )

  const home = computed(() => asyncData.data.value as HomeCms | null)
  const moodHeroContent = computed<MoodHeroContent>(() =>
    toMoodHeroContent(home.value, strapiBaseUrl),
  )

  return {
    home,
    moodHeroContent,
    pending: asyncData.pending,
    error: asyncData.error,
    refresh: asyncData.refresh,
  }
}
