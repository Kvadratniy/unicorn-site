export type { PianoContent } from '~/composables/useStrapiApi'

import type { PianoContent } from '~/composables/useStrapiApi'
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

export type PianoHeroViewModel = HeroViewModel
export type PianoMainViewModel = MainViewModel
export type PianoServiceViewModel = ServiceViewModel
export type PianoServicesViewModel = ServicesViewModel
export type PianoTeacherViewModel = TeacherViewModel
export type PianoTeachersViewModel = TeachersViewModel
export type PianoFaqItemViewModel = FaqViewModel['items'][number]
export type PianoFaqViewModel = FaqViewModel

type PianoCms = {
  Formats?: ServicesCms | null
}

export const usePiano = async (key = 'piano-content') => {
  const api = useStrapiApi()

  const base = await useCoursePage<PianoContent, 'piano'>({
    key,
    contentName: 'piano',
    fetchContent: () => api.fetchPiano(),
    selectServices: content => (content as PianoCms | null)?.Formats,
    faqMode: 'object',
    pickHeroMedia: true,
  })

  return {
    piano: base.piano,
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
