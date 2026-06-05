import type { NewsArticle } from '~/types/news.types'

export const useNews = () => {
  const api = useStrapiApi()

  const getNewsArticles = (): Promise<NewsArticle[]> => api.fetchArticles()

  const getNewsArticleBySlug = (slug: string): Promise<NewsArticle | null> => api.fetchArticleBySlug(slug)

  return { getNewsArticles, getNewsArticleBySlug }
}
