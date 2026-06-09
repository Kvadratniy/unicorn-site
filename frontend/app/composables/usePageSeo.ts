type PageSeoOptions = {
  title: string
  description: string
  image?: string
  keywords?: string
  noindex?: boolean
}

export const usePageSeo = (options: PageSeoOptions) => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const siteUrl = String(config.public.siteUrl).replace(/\/$/, '')

  const canonicalPath = route.path === '/'
    ? '/'
    : `${route.path.replace(/\/$/, '')}/`
  const canonicalUrl = `${siteUrl}${canonicalPath === '/' ? '' : canonicalPath}`
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
