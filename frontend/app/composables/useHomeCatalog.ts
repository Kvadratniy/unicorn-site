import type { HomeCatalogCategory } from '~/composables/useStrapiApi'

export const useHomeCatalog = async (key = 'home-catalog') => {
  const api = useStrapiApi()

  const { data, pending, error, refresh } = await useAsyncData<HomeCatalogCategory[]>(
    key,
    () => api.fetchCategories(),
    { default: () => [], server: true },
  )

  const categories = computed(() => data.value ?? [])
  const services = computed(() => categories.value.flatMap(category => category.services))

  return { categories, services, pending, error, refresh }
}
