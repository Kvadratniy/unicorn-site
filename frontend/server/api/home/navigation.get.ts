import { fetchHomeSingle } from './shared'
import { mapNavigationResponse } from '../../utils/navigation'

export default defineEventHandler(async () => {
  const response = await fetchHomeSingle(
    'navigation',
    {
      'populate[Navigation][populate][Navigation][populate]': '*',
      status: 'published',
    },
    'Failed to load navigation',
  )

  if (response.error) {
    return []
  }

  return mapNavigationResponse(response)
})
