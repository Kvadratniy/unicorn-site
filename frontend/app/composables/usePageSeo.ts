import type { MaybeRefOrGetter } from 'vue'

type PageSeoOptions = {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  image?: MaybeRefOrGetter<string | undefined>
  keywords?: string
  ogType?: 'website' | 'article'
  noindex?: boolean
}

export const usePageSeo = (options: PageSeoOptions) => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const siteUrl = String(config.public.siteUrl).replace(/\/$/, '')

  const canonicalUrl = computed(() => {
    const path = route.path.replace(/\/$/, '')
    return path ? `${siteUrl}${path}` : `${siteUrl}/`
  })
  const ogImage = computed(() => {
    const image = toValue(options.image)
    if (!image) return `${siteUrl}/images/logo/logo-4.png`
    return image.startsWith('http') ? image : `${siteUrl}${image}`
  })

  useSeoMeta({
    title: () => toValue(options.title),
    description: () => toValue(options.description),
    ogTitle: () => toValue(options.title),
    ogDescription: () => toValue(options.description),
    ogImage: () => ogImage.value,
    ogUrl: () => canonicalUrl.value,
    ogType: options.ogType ?? 'website',
    ogLocale: 'ru_RU',
    twitterCard: 'summary_large_image',
    twitterTitle: () => toValue(options.title),
    twitterDescription: () => toValue(options.description),
    twitterImage: () => ogImage.value,
    ...(options.noindex && { robots: 'noindex, nofollow' }),
  })

  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }],
    ...(options.keywords && {
      meta: [{ name: 'keywords', content: options.keywords }],
    }),
  })
}
