import { fetchHomeList } from './shared'

export default defineEventHandler(() =>
  fetchHomeList(
    'categories',
    {
      'populate[services][populate][0]': 'image',
      'sort[0]': 'id:asc',
      status: 'published',
    },
    'Failed to load categories',
  ),
)
