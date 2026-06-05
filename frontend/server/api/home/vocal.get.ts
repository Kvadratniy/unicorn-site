import { buildPopulateQuery, fetchHomeSingle } from './shared'

const query = buildPopulateQuery(
  ['Hero.Title', 'Hero.Card', 'Hero.image.src', 'Hero.video.src', 'Main', 'Services.services.advantages', 'Teachers.Teacher', 'FAQ.FAQ_H'],
  { status: 'published' },
)

export default defineEventHandler(() =>
  fetchHomeSingle(
    'vocal',
    query,
    'Failed to load vocal data',
  ),
)
