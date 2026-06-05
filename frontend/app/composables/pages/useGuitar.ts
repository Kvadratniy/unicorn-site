export type { GuitarContent } from '~/composables/useStrapiApi'

import type { GuitarContent } from '~/composables/useStrapiApi'
import type {
  FaqViewModel,
  HeroViewModel,
  MainViewModel,
  ServiceViewModel,
  ServicesCms,
  ServicesViewModel,
  TeacherViewModel,
  TeachersViewModel,
} from '~/composables/pages/contentTypes'
import { useCoursePage } from '~/composables/pages/useCoursePage'

export type GuitarHeroViewModel = HeroViewModel
export type GuitarMainViewModel = MainViewModel
export type GuitarServiceViewModel = ServiceViewModel
export type GuitarServicesViewModel = ServicesViewModel
export type GuitarTeacherViewModel = TeacherViewModel
export type GuitarTeachersViewModel = TeachersViewModel
export type GuitarFaqItemViewModel = FaqViewModel['items'][number]
export type GuitarFaqViewModel = FaqViewModel

type GuitarCms = {
  Services?: ServicesCms | null
  Formats?: ServicesCms | null
}

export const useGuitar = async (key = 'guitar-content') => {
  const api = useStrapiApi()

  const base = await useCoursePage<GuitarContent, 'guitar'>({
    key,
    contentName: 'guitar',
    fetchContent: () => api.fetchGuitar(),
    selectServices: (content) => {
      const typed = content as GuitarCms | null
      return typed?.Services || typed?.Formats
    },
    faqMode: 'auto',
    pickHeroMedia: true,
  })

  return {
    guitar: base.guitar,
    hero: base.hero,
    main: base.main,
    services: base.services,
    teachers: base.teachers,
    faq: base.faq,
    pending: base.pending,
    error: base.error,
    refresh: base.refresh,
  }
}
