import { buildPopulateQuery, fetchHomeSingle } from './shared'

const query = buildPopulateQuery(
  [
    'HeroBlock.Title',
    'HeroBlock.image.src',
    'MainBlock.Cards',
    'MainBlock.images',
    'Variants',
    'Variants.Variant.Image.src',
    'Variants.Variant.lines',
  ],
  { status: 'published' },
)

export default defineEventHandler(() =>
  fetchHomeSingle(
    'page-distribution',
    query,
    'Failed to load distribution data',
  ),
)
