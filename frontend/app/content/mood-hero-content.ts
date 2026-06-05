import type { ArticleSlide } from '~/components/mood/UMoodSlide.vue'
import type { MoodCard } from '~/components/mood/UMoodCards.vue'

export type MoodHeroArticle = ArticleSlide

export type MoodHeroContent = {
  heroPosterSrc: string
  heroVideoSrc: string
  moodCards: MoodCard[]
  article: MoodHeroArticle
  /** @deprecated left for backward compatibility */
  articleSlides?: ArticleSlide[]
}
