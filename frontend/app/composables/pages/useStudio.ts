import { computed } from 'vue'
import type { HeroViewModel, MainFeature, MainViewModel } from '~/composables/pages/contentTypes'
import { pickMediaUrl, toMediaUrl } from '~/composables/pages/contentMappers'
import type { StudioContent } from '~/composables/useStrapiApi'

type StudioServiceCms = {
  Title?: string
  Description?: string
  Price?: string
  Badge?: string
  Features?: unknown
}

type StudioClientCms = {
  Name?: string
  Description?: string
  Logo?: {
    url?: string
    formats?: {
      large?: { url?: string }
      medium?: { url?: string }
    }
  } | null
}

type StudioAudienceItemCms = {
  Title?: string
  Subtitle?: string
}

type StudioCms = {
  Hero?: {
    Card?: Array<{
      title?: string
      value?: string
    }> | null
    Title?: {
      line_1?: string
      line_2?: string
      description?: string
    } | null
    line_1?: string
    line_2?: string
    description?: string
    image?: unknown
    video?: unknown
    Image?: unknown
    Video?: unknown
  } | null
  Main?: {
    Cards?: Array<{
      title?: string
      value?: string
    }> | null
    title?: string
    description?: string
    paragraph?: string
    images?: Array<{
      url?: string
      formats?: {
        large?: { url?: string }
        medium?: { url?: string }
      }
    }> | null
  } | null
  Services?: {
    Title?: string
    Description?: string
    Service?: StudioServiceCms[] | null
  } | null
  Clients?: {
    Title?: string
    Description?: string
    Client?: StudioClientCms[] | null
  } | null
  Audience?: {
    Title?: StudioAudienceItemCms | null
    Items?: StudioAudienceItemCms[] | null
  } | null
}

export type StudioServicesViewModel = {
  title: string
  subtitle: string
  items: Array<{
    title: string
    description: string
    priceFrom: string
    badge: string
    features: string[]
  }>
}

export type StudioClientsViewModel = {
  title: string
  subtitle: string
  items: Array<{
    name: string
    description: string
    logo: string
  }>
}

export type StudioAudienceViewModel = {
  title: string
  subtitle: string
  items: Array<{
    title: string
    subtitle: string
  }>
}

const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
  }
  if (value && typeof value === 'object' && Array.isArray((value as { values?: unknown[] }).values)) {
    return (value as { values: unknown[] }).values
      .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
  }
  return []
}

const createHero = (heroData: StudioCms['Hero'], strapiBaseUrl: string): HeroViewModel => {
  const mainFallbackImage = '/images/studio/studio-main.jpg'
  const imageSrc
    = pickMediaUrl(heroData?.image, strapiBaseUrl)
      || pickMediaUrl((heroData as Record<string, unknown> | null | undefined)?.Image, strapiBaseUrl)
      || mainFallbackImage
  const videoSrc
    = pickMediaUrl(heroData?.video, strapiBaseUrl)
      || pickMediaUrl((heroData as Record<string, unknown> | null | undefined)?.Video, strapiBaseUrl)
      || ''
  const cardStats = (heroData?.Card || [])
    .map((item) => {
      const value = typeof item?.title === 'string' ? item.title.trim() : ''
      const label = typeof item?.value === 'string' ? item.value.trim() : ''
      if (!value || !label) return null
      return { value, label }
    })
    .filter((item): item is HeroViewModel['stats'][number] => item !== null)

  return {
    title: heroData?.Title?.line_1 || heroData?.line_1 || '',
    line2: heroData?.Title?.line_2 || heroData?.line_2 || '',
    description: heroData?.Title?.description || heroData?.description || '',
    stats: cardStats,
    imageSrc,
    videoSrc: {
      mobile: videoSrc,
      desktop: videoSrc,
    },
  }
}

const createMain = (mainData: StudioCms['Main'], strapiBaseUrl: string): MainViewModel => {
  const leadParagraphs = [mainData?.description, mainData?.paragraph]
    .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)

  const cardsFeatures = (mainData?.Cards || [])
    .map((item) => {
      const title = typeof item?.title === 'string' ? item.title.trim() : ''
      const text = typeof item?.value === 'string' ? item.value.trim() : ''
      if (!title || !text) return null
      return { title, text }
    })
    .filter((item): item is MainFeature => item !== null)
  const features = cardsFeatures
  const images = (mainData?.images || [])
    .map(image => toMediaUrl(image?.formats?.large?.url || image?.formats?.medium?.url || image?.url, strapiBaseUrl))
    .filter((url): url is string => typeof url === 'string' && url.trim().length > 0)

  return {
    title: mainData?.title || '',
    leadParagraphs,
    features,
    images,
  }
}

export const useStudio = async (key = 'studio-content') => {
  const api = useStrapiApi()
  const runtimeConfig = useRuntimeConfig()
  const strapiBaseUrl = String(runtimeConfig.public?.strapi?.url || '').replace(/\/$/, '')

  const asyncData = await useAsyncData<StudioContent | null>(
    key,
    () => api.fetchStudio(),
    { default: () => null, server: true },
  )

  const studio = computed(() => asyncData.data.value as StudioCms | null)

  const hero = computed(() => createHero(studio.value?.Hero, strapiBaseUrl))
  const main = computed(() => createMain(studio.value?.Main, strapiBaseUrl))

  const services = computed<StudioServicesViewModel>(() => {
    const servicesRoot = studio.value?.Services
    const items = (servicesRoot?.Service || [])
      .map((service) => {
        const title = service?.Title || ''
        if (!title) return null

        return {
          title,
          description: service?.Description || '',
          priceFrom: service?.Price || '',
          badge: service?.Badge || '',
          features: toStringArray(service?.Features),
        }
      })
      .filter((item): item is StudioServicesViewModel['items'][number] => item !== null)

    return {
      title: servicesRoot?.Title || '',
      subtitle: servicesRoot?.Description || '',
      items,
    }
  })

  const clients = computed<StudioClientsViewModel>(() => {
    const clientsRoot = studio.value?.Clients
    const items = (clientsRoot?.Client || [])
      .map((client) => {
        const name = client?.Name || ''
        if (!name) return null

        return {
          name,
          description: client?.Description || '',
          logo: toMediaUrl(
            client?.Logo?.formats?.large?.url || client?.Logo?.formats?.medium?.url || client?.Logo?.url,
            strapiBaseUrl,
          ) || '',
        }
      })
      .filter((item): item is StudioClientsViewModel['items'][number] => item !== null)

    return {
      title: clientsRoot?.Title || '',
      subtitle: clientsRoot?.Description || '',
      items,
    }
  })

  const audience = computed<StudioAudienceViewModel>(() => {
    const audienceRoot = studio.value?.Audience
    const items = (audienceRoot?.Items || [])
      .map(item => ({
        title: item?.Title || '',
        subtitle: item?.Subtitle || '',
      }))
      .filter(item => item.title.length > 0)

    return {
      title: audienceRoot?.Title?.Title || '',
      subtitle: audienceRoot?.Title?.Subtitle || '',
      items,
    }
  })

  return {
    studio,
    hero,
    main,
    services,
    clients,
    audience,
    pending: asyncData.pending,
    error: asyncData.error,
    refresh: asyncData.refresh,
  }
}
