import { buildPopulateQuery, fetchHomeSingle } from './shared'

const query = buildPopulateQuery(
  ['Hero.Title', 'Hero.Card', 'Hero.image.src', 'Hero.video.src'],
  { status: 'published' },
)

export default defineEventHandler(() =>
  fetchHomeSingle(
    'home',
    query,
    'Failed to load home data',
  ),
)
