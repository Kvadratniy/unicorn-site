export type { VocalContent } from '~/composables/useStrapiApi'
export type { HeroStat, MainFeature } from '~/composables/pages/contentTypes'

import type { VocalContent } from '~/composables/useStrapiApi'
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

type VocalCms = {
  Services?: ServicesCms | null
}

export type VocalHeroViewModel = HeroViewModel
export type VocalMainViewModel = MainViewModel
export type VocalServiceViewModel = ServiceViewModel
export type VocalServicesViewModel = ServicesViewModel
export type VocalTeacherViewModel = TeacherViewModel
export type VocalTeachersViewModel = TeachersViewModel
export type VocalFaqItemViewModel = FaqViewModel['items'][number]
export type VocalFaqViewModel = FaqViewModel

export const useVocal = async (key = 'vocal-content') => {
  const api = useStrapiApi()

  const base = await useCoursePage<VocalContent, 'vocal'>({
    key,
    contentName: 'vocal',
    fetchContent: () => api.fetchVocal(),
    selectServices: content => (content as VocalCms | null)?.Services,
    faqMode: 'array',
    teachersFallback: {
      title: 'Тренеры по вокалу',
      subtitle: 'Кто ведёт занятия по вокалу — познакомьтесь с нашими тренерами',
    },
    faqFallback: {
      title: 'Часто задаваемые вопросы',
      subtitle: 'Краткие ответы на типичные вопросы о занятиях вокалом.',
    },
    pickHeroMedia: false,
  })

  return {
    vocal: base.vocal,
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
