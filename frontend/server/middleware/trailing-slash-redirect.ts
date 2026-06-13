export default defineEventHandler((event) => {
  if (event.method !== 'GET' && event.method !== 'HEAD') return

  const path = event.path.split('?')[0] || '/'
  const shouldSkip
    = path === '/'
      || !path.endsWith('/')
      || path.includes('.')
      || path.startsWith('/api/')
      || path.startsWith('/_nuxt/')
      || path.startsWith('/__')

  if (shouldSkip) return

  const withoutSlash = path.slice(0, -1) || '/'
  const queryIndex = event.path.indexOf('?')
  const query = queryIndex === -1 ? '' : event.path.slice(queryIndex)

  return sendRedirect(event, `${withoutSlash}${query}`, 301)
})
