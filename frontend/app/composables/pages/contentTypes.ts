import type { StrapiMedia } from '~/composables/pages/contentMappers'

export type HeroStat = {
  value: string
  label: string
}

export type MainFeature = {
  title: string
  text: string
}

export type HeroViewModel = {
  title: string
  line2: string
  description: string
  stats: HeroStat[]
  imageSrc: string
  videoSrc: { mobile: string; desktop: string }
}

export type MainViewModel = {
  title: string
  leadParagraphs: string[]
  features: MainFeature[]
  images: string[]
}

export type ServiceViewModel = {
  title: string
  subtitle: string
  description: string
  bullets: string[]
  priceFrom: string
  isNew: boolean
}

export type ServicesViewModel = {
  title: string
  subtitle: string
  items: ServiceViewModel[]
}

export type TeacherViewModel = {
  name: string
  role: string
  image: string
  description: string[]
}

export type TeachersViewModel = {
  title: string
  subtitle: string
  items: TeacherViewModel[]
}

export type FaqItemViewModel = {
  question: string
  answer: string
}

export type FaqViewModel = {
  title: string
  subtitle: string
  items: FaqItemViewModel[]
}

export type HeroCms = {
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
  image?: StrapiMedia | StrapiMedia[] | null
  video?: StrapiMedia | StrapiMedia[] | null
}

export type MainCms = {
  Cards?: Array<{
    title?: string
    value?: string
  }> | null
  title?: string
  description?: string
  paragraph?: string
  images?: StrapiMedia[] | null
}

export type ServicesCms = {
  title?: string
  description?: string
  services?: Array<{
    advantages?: Array<{
      title?: string
      value?: string
    }> | null
    title?: string
    audience?: string | null
    description?: string
    price?: string
    new?: boolean
  }>
}

export type TeachersCms = {
  title?: string
  description?: string
  Title?: string
  Subtitle?: string
  teachers?: Array<{
    name?: string
    role?: string
    Title?: string
    Role?: string
    Subtitle?: string
    Achievements?: string
    description?: string | string[] | { values?: string[] } | null
    image?: StrapiMedia | null
    Image?: StrapiMedia | null
  }>
  Teacher?: Array<{
    name?: string
    role?: string
    Title?: string
    Role?: string
    Subtitle?: string
    Achievements?: string
    description?: string | string[] | { values?: string[] } | null
    image?: StrapiMedia | null
    Image?: StrapiMedia | null
  }>
}

export type FaqCms = {
  FAQ_H?: {
    Title?: string
    Subtitle?: string
    Question?: Array<{
      Question?: string
      Answer?: string
    }>
  } | null
}
