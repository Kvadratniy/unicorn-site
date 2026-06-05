import { buildPopulateQuery, fetchHomeList } from './shared'

const query = {
  ...buildPopulateQuery(
    [
      'MainImage.src',
      'Content',
    ],
  ),
  'sort[0]': 'publishedAt:desc',
  status: 'published',
}

export default defineEventHandler(() =>
  fetchHomeList(
    'blogs',
    query,
    'Failed to load articles',
  ),
)
