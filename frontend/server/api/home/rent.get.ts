import { buildPopulateQuery, fetchHomeSingle } from './shared'

const query = buildPopulateQuery(
  ['HeroBlock.Title', 'HeroBlock.image.src', 'MainBlock.Cards', 'MainBlock.images', 'VariantsBlock.Variant.Image.src', 'VariantsBlock.Variant.lines'],
  { status: 'published' },
)

export default defineEventHandler(() =>
  fetchHomeSingle(
    'rent',
    query,
    'Failed to load rent data',
  ),
)
