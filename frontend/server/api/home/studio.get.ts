import { buildPopulateQuery, fetchHomeSingle } from './shared'

const query = buildPopulateQuery(
  ['Hero.Title', 'Hero.Card', 'Hero.image.src', 'Hero.video.src', 'Main', 'Services.Service', 'Clients.Client.Logo', 'Audience.Title', 'Audience.Items'],
  { status: 'published' },
)

export default defineEventHandler(() =>
  fetchHomeSingle(
    'studio',
    query,
    'Failed to load studio data',
  ),
)
