type Ym = ((...args: unknown[]) => void) & { a?: unknown[]; l?: number }

declare global {
  interface Window {
    ym?: Ym
  }
}

/**
 * Инициализация Yandex.Metrika в рантайме.
 * Единственный источник правды — runtimeConfig.public.yandexMetrikaId
 * (его же читает UContactModal для отправки цели). ID можно задавать
 * при деплое без пересборки; если он пустой — счётчик не подключается.
 */
export default defineNuxtPlugin(() => {
  const { public: { yandexMetrikaId } } = useRuntimeConfig()
  const id = Number(String(yandexMetrikaId ?? '').trim())
  if (!id) return

  const tagSrc = `https://mc.yandex.ru/metrika/tag.js?id=${id}`
  if (Array.from(document.scripts).some(script => script.src === tagSrc)) return

  const stub: Ym = window.ym || ((...args: unknown[]) => {
    (stub.a = stub.a || []).push(args)
  })
  window.ym = stub
  stub.l = Date.now()

  const script = document.createElement('script')
  script.async = true
  script.src = tagSrc
  document.head.appendChild(script)

  window.ym(id, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: 'dataLayer',
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  })
})
