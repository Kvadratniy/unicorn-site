import { buildPopulateQuery, fetchHomeList } from '../shared'

export default defineEventHandler(
  async (event) => {
    const slug = String(getRouterParam(event, 'slug') || '').trim()
    if (!slug) {
      return {
        data: [],
        error: { status: 400, name: 'BadRequest', message: 'Missing article slug' },
      }
    }

    return fetchHomeList(
      'blogs',
      {
        ...buildPopulateQuery(
          [
            'MainImage.src',
            'Content',
          ],
        ),
        'filters[slug][$eq]': slug,
        status: 'published',
        'pagination[page]': 1,
        'pagination[pageSize]': 1,
      },
      'Failed to load article',
    )
  },
)
