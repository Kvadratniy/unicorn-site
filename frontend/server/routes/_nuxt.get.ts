/**
 * Обработка запросов к /_nuxt и /_nuxt/ (без имени файла).
 * Без этого запрос GET /_nuxt/ приводит к ошибке createError в dev-сервере Nuxt.
 */
export default defineEventHandler((event) => {
  const path = event.path.replace(/\/$/, '') || '/'
  if (path === '/_nuxt') {
    setResponseStatus(event, 404, 'Not Found')
    return { error: 'Asset not found' }
  }
})
