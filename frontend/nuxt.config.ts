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
    // SWR-кэш для индексируемых страниц: робот всегда получает быстрый
    // отрендеренный HTML, а один удачный рендер переживает кратковременные
    // сбои/рестарты бэкенда (Strapi). Ревалидация идёт в фоне.
    '/': { swr: 600 },
    '/studio': { swr: 600 },
    '/vocal': { swr: 600 },
    '/piano': { swr: 600 },
    '/guitar': { swr: 600 },
    '/contacts': { swr: 600 },
    '/rent': { swr: 600 },
    '/distribution': { swr: 600 },
    '/news': { swr: 600 },
    '/news/**': { swr: 600 },
    '/events': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  image: {
    // Используем ipx провайдер (автоматически переключается на ipxStatic при nuxt generate)
    provider: 'ipx',
    // Качество изображений по умолчанию
    quality: 80,
    // Формат по умолчанию
    format: ['webp'],
    // Разрешаем IPX проксировать удалённые изображения Strapi через Nuxt-сервер.
    // Без этого браузер делает прямые запросы к api.unicorn-studio.pro, которые
    // блокируются на уровне TCP с российских IP (ERR_TIMED_OUT).
    domains: ['api.unicorn-studio.pro'],
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
      yandexMapsApiKey: process.env.NUXT_PUBLIC_YANDEX_MAPS_API_KEY,
      yandexMetrikaId: process.env.NUXT_PUBLIC_YANDEX_METRIKA_ID || '',
    },
  },
  css: ['~/assets/css/tokens.css', '~/assets/css/main.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'ru' },
      titleTemplate: '%s | Ставрополь',
      title: 'Unicorn Studio',
      link: [
        // Preload критических начертаний Montserrat (используются в шапке на первом экране),
        // чтобы уменьшить CLS/мерцание текста. crossorigin обязателен для шрифтов.
        {
          rel: 'preload',
          as: 'font',
          type: 'font/ttf',
          href: '/fonts/Montserrat/Montserrat-Regular.ttf',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/ttf',
          href: '/fonts/Montserrat/Montserrat-Medium.ttf',
          crossorigin: 'anonymous',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
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
            'html,body{background-color:#fafafa;min-height:100vh}#__nuxt{min-height:100vh}',
          tagPriority: 'high',
        },
      ],
    },
  },
})