type PageSeoOptions = {
  title: string
  description: string
  image?: string
  keywords?: string
  noindex?: boolean
}

export const usePageSeo = (options: PageSeoOptions) => {
  const config = useRuntimeConfig()
  const siteConfig = useSiteConfig()
  const route = useRoute()
  const siteUrl = (siteConfig.url || config.public.siteUrl) as string

  const canonicalUrl = `${siteUrl}${route.path === '/' ? '' : route.path}`
  const ogImage = options.image
    ? (options.image.startsWith('http') ? options.image : `${siteUrl}${options.image}`)
    : `${siteUrl}/images/logo/logo-4.png`

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogImage,
    ogUrl: canonicalUrl,
    ogType: 'website',
    ogLocale: 'ru_RU',
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: ogImage,
    ...(options.noindex && { robots: 'noindex, nofollow' }),
  })

  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }],
    ...(options.keywords && {
      meta: [{ name: 'keywords', content: options.keywords }],
    }),
  })
}
