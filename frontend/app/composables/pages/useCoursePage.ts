import type { ComputedRef } from 'vue'
import type {
  FaqCms,
  FaqViewModel,
  HeroCms,
  HeroViewModel,
  MainFeature,
  MainViewModel,
  ServiceViewModel,
  ServicesCms,
  ServicesViewModel,
  TeacherViewModel,
  TeachersCms,
  TeachersViewModel,
} from '~/composables/pages/contentTypes'
import {
  mapFaqItems,
  mapServiceItem,
  mapTeacherItem,
  pickMediaUrl,
  toMediaUrl,
} from '~/composables/pages/contentMappers'

type CourseCms = {
  Hero?: HeroCms | null
  Main?: {
    Cards?: Array<{
      title?: string
      value?: string
    }> | null
    title?: string
    description?: string
    paragraph?: string
    images?: Array<{ url?: string; formats?: { large?: { url?: string }; medium?: { url?: string } } }> | null
  } | null
  Services?: ServicesCms | null
  Formats?: ServicesCms | null
  Teachers?: TeachersCms | null
  FAQ?: FaqCms | FaqCms[] | null
}

type FaqMode = 'array' | 'object' | 'auto'

type CoursePageConfig<TContent, TContentName extends string> = {
  key: string
  contentName: TContentName
  fetchContent: () => Promise<TContent | null>
  selectServices: (content: CourseCms | null) => ServicesCms | null | undefined
  faqMode: FaqMode
  teachersFallback?: {
    title: string
    subtitle: string
  }
  faqFallback?: {
    title: string
    subtitle: string
  }
  pickHeroMedia: boolean
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0

const createHero = (
  heroData: HeroCms | null | undefined,
  strapiBaseUrl: string,
  _pickHeroMedia: boolean,
  mainData?: CourseCms['Main'],
): HeroViewModel => {
  const mainFallbackImage = toMediaUrl(
    mainData?.images?.[0]?.formats?.large?.url
    || mainData?.images?.[0]?.formats?.medium?.url
    || mainData?.images?.[0]?.url,
    strapiBaseUrl,
  ) || ''
  const imageSrc
    = pickMediaUrl(heroData?.image, strapiBaseUrl)
      || pickMediaUrl((heroData as Record<string, unknown> | undefined)?.Image, strapiBaseUrl)
      || mainFallbackImage
  const videoSrc
    = pickMediaUrl(heroData?.video, strapiBaseUrl)
      || pickMediaUrl((heroData as Record<string, unknown> | undefined)?.Video, strapiBaseUrl)
      || ''
  const titleLines = heroData?.Title
  const cardStats = (heroData?.Card || [])
    .map((item) => {
      const value = typeof item?.title === 'string' ? item.title.trim() : ''
      const label = typeof item?.value === 'string' ? item.value.trim() : ''
      if (!value || !label) return null
      return { value, label }
    })
    .filter((item): item is HeroViewModel['stats'][number] => item !== null)

  return {
    title: titleLines?.line_1 || heroData?.line_1 || '',
    line2: titleLines?.line_2 || heroData?.line_2 || '',
    description: titleLines?.description || heroData?.description || '',
    stats: cardStats,
    imageSrc,
    videoSrc: {
      mobile: videoSrc,
      desktop: videoSrc,
    },
  }
}

const createMain = (
  mainData: CourseCms['Main'],
  strapiBaseUrl: string,
): MainViewModel => {
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

const createServices = (servicesData: ServicesCms | null | undefined): ServicesViewModel => {
  const items = (servicesData?.services || [])
    .map((service): ServiceViewModel | null => mapServiceItem(service))
    .filter((item): item is ServiceViewModel => Boolean(item))

  return {
    title: servicesData?.title || '',
    subtitle: servicesData?.description || '',
    items,
  }
}

const createTeachers = (
  teachersData: TeachersCms | null | undefined,
  strapiBaseUrl: string,
  fallback?: { title: string; subtitle: string },
): TeachersViewModel => {
  const teacherList = teachersData?.teachers || teachersData?.Teacher || []
  const items = teacherList
    .map((teacher): TeacherViewModel | null => mapTeacherItem(teacher, strapiBaseUrl))
    .filter((item): item is TeacherViewModel => Boolean(item))

  return {
    title: teachersData?.title || teachersData?.Title || fallback?.title || '',
    subtitle: teachersData?.description || teachersData?.Subtitle || fallback?.subtitle || '',
    items,
  }
}

const resolveFaqData = (
  faqRoot: FaqCms | FaqCms[] | null | undefined,
  faqMode: FaqMode,
) => {
  if (faqMode === 'array') return Array.isArray(faqRoot) ? faqRoot[0]?.FAQ_H : undefined
  if (faqMode === 'object') return !Array.isArray(faqRoot) ? faqRoot?.FAQ_H : undefined
  return Array.isArray(faqRoot) ? faqRoot[0]?.FAQ_H : faqRoot?.FAQ_H
}

const createFaq = (
  faqRoot: FaqCms | FaqCms[] | null | undefined,
  faqMode: FaqMode,
  fallback?: { title: string; subtitle: string },
): FaqViewModel => {
  const faqData = resolveFaqData(faqRoot, faqMode)
  const items = mapFaqItems(faqData?.Question)

  return {
    title: isNonEmptyString(faqData?.Title) ? faqData.Title : fallback?.title || '',
    subtitle: isNonEmptyString(faqData?.Subtitle) ? faqData.Subtitle : fallback?.subtitle || '',
    items,
  }
}

type CoursePageResult<TContent, TContentName extends string> = {
  hero: ComputedRef<HeroViewModel>
  main: ComputedRef<MainViewModel>
  services: ComputedRef<ServicesViewModel>
  teachers: ComputedRef<TeachersViewModel>
  faq: ComputedRef<FaqViewModel>
  pending: ReturnType<typeof useAsyncData<TContent | null>>['pending']
  error: ReturnType<typeof useAsyncData<TContent | null>>['error']
  refresh: ReturnType<typeof useAsyncData<TContent | null>>['refresh']
} & Record<TContentName, ComputedRef<TContent | null>>

export const useCoursePage = async <TContent, TContentName extends string>(
  config: CoursePageConfig<TContent, TContentName>,
) => {
  const runtimeConfig = useRuntimeConfig()
  const strapiBaseUrl = String(runtimeConfig.public?.strapi?.url || '').replace(/\/$/, '')

  const asyncData = await useAsyncData<TContent | null>(
    config.key,
    () => config.fetchContent(),
    { default: () => null, server: true },
  )

  const content = computed(() => asyncData.data.value as CourseCms | null)
  const hero = computed<HeroViewModel>(() =>
    createHero(content.value?.Hero, strapiBaseUrl, config.pickHeroMedia, content.value?.Main))
  const main = computed<MainViewModel>(() => createMain(content.value?.Main, strapiBaseUrl))
  const services = computed<ServicesViewModel>(() => createServices(config.selectServices(content.value)))
  const teachers = computed<TeachersViewModel>(() =>
    createTeachers(content.value?.Teachers, strapiBaseUrl, config.teachersFallback))
  const faq = computed<FaqViewModel>(() =>
    createFaq(content.value?.FAQ, config.faqMode, config.faqFallback))

  const result = {
    hero,
    main,
    services,
    teachers,
    faq,
    pending: asyncData.pending,
    error: asyncData.error,
    refresh: asyncData.refresh,
  }

  return {
    ...result,
    [config.contentName]: content,
  } as CoursePageResult<TContent, TContentName>
}
