/// <reference types="node" />
// https://nuxt.com/docs/api/configuration/nuxt-config

const normalizeBaseUrl = (value: string): string => {
  if (!value) return 'http://localhost:1337'
  return value.endsWith('/') ? value.slice(0, -1) : value
}

const strapiBaseUrl = normalizeBaseUrl(process.env.STRAPI_URL || 'http://localhost:1337')
const publicStrapiBaseUrl = normalizeBaseUrl(process.env.NUXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337')
const siteUrl = normalizeBaseUrl(process.env.NUXT_PUBLIC_SITE_URL || 'https://unicorn-studio.pro')

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  ssr: true,
  routeRules: {
    // Для SSR не выполняем глобальный pre-render страниц.
    '/**': { prerender: false },
    '/teacher': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/teacher/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/events': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/events/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/distribution': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/distribution/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/rent': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/rent/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/strapi'],
  strapi: {
    url: publicStrapiBaseUrl,
    // Keep browser-side Strapi token empty; server-side token lives in runtimeConfig.strapi.
    token: '',
    prefix: '/api',
    admin: '/admin',
    version: 'v5',
    cookie: {},
    cookieName: 'strapi_jwt',
  },
  hooks: {
    'nitro:config'(nitroConfig) {
      // Extra hardening: keep public runtime payload lean.
      void nitroConfig
    },
  },
  image: {
    // Используем ipx провайдер (автоматически переключается на ipxStatic при nuxt generate)
    provider: 'ipx',
    // Качество изображений по умолчанию
    quality: 80,
    // Формат по умолчанию
    format: ['webp'],
  },
  components: [
    { path: '~/components', pathPrefix: false, extensions: ['vue'] },
  ],
  runtimeConfig: {
    strapi: {
      url: strapiBaseUrl,
      token: process.env.STRAPI_TOKEN,
    },
    public: {
      strapi: {
        url: publicStrapiBaseUrl,
      },
      siteUrl,
      site: {
        url: siteUrl,
      },
      yandexMapsApiKey: process.env.NUXT_PUBLIC_YANDEX_MAPS_API_KEY,
      yandexMetrikaId: process.env.NUXT_PUBLIC_YANDEX_METRIKA_ID || '',
    },
  },
  css: ['~/assets/css/main.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'ru' },
      titleTemplate: '%s | Unicorn Studio',
      title: 'Unicorn Studio',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Музыкальная студия Юникорн в Ставрополе — полный цикл музыкального производства.',
        },
      ],
      // Минимальные критические стили в <head>, чтобы убрать FOUC: фон совпадает с layout до загрузки Tailwind
      style: [
        {
          innerHTML:
            'html,body{background-color:#f3f4f6;min-height:100vh}#__nuxt{min-height:100vh}',
          tagPriority: 'high',
        },
      ],
      // Yandex.Metrika counter
      ...(process.env.NUXT_PUBLIC_YANDEX_METRIKA_ID && {
        script: [
          {
            type: 'text/javascript',
            innerHTML: `
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${process.env.NUXT_PUBLIC_YANDEX_METRIKA_ID}', 'ym');
ym(${process.env.NUXT_PUBLIC_YANDEX_METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `.trim(),
            tagPriority: 'high',
          },
        ],
        noscript: [
          {
            innerHTML: `<div><img src="https://mc.yandex.ru/watch/${process.env.NUXT_PUBLIC_YANDEX_METRIKA_ID}" style="position:absolute; left:-9999px;" alt="" /></div>`,
          },
        ],
      }),
    },
  },
})