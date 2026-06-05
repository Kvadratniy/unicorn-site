import type { NavigationEntry } from '~/types/navigation.types'

export const useNavigation = async (key = 'site-navigation') => {
  const api = useStrapiApi()

  const { data, pending, error, refresh } = await useAsyncData<NavigationEntry[]>(
    key,
    () => api.fetchNavigation(),
    { default: () => [], server: true },
  )

  const entries = computed(() => data.value ?? [])

  return { entries, pending, error, refresh }
}
