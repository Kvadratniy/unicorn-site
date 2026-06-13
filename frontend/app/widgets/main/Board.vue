<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import type { ArticleSlide } from '~/components/mood/UMoodSlide.vue'
import homeMoodHeroData from '~/content/umood-hero.json'
import type { MoodHeroContent } from '~/content/mood-hero-content'
import type { NewsArticle } from '~/types/news.types'
import type { MoodCard } from '~/components/mood/UMoodCards.vue'

const props = defineProps<{
  /** Если не передан — контент главной из umood-hero.json */
  content?: MoodHeroContent
  backgroundColor?: string
}>()

const moodHeroData = computed(
  (): MoodHeroContent => props.content ?? (homeMoodHeroData as MoodHeroContent),
)

const sectionRef = ref<HTMLElement | null>(null)
const isHeroVisible = ref(false)

const { stop: stopHeroObserver } = useIntersectionObserver(
  sectionRef,
  ([entry]) => {
    if (!entry?.isIntersecting) return
    isHeroVisible.value = true
    stopHeroObserver()
  },
  { threshold: 0.1, rootMargin: '0px 0px -4% 0px' },
)

onMounted(() => {
  nextTick(() => {
    const el = sectionRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const vh = typeof window !== 'undefined' ? window.innerHeight : 0
    if (rect.top < vh * 0.92 && rect.bottom > 0) {
      isHeroVisible.value = true
      stopHeroObserver()
    }
  })
})

const heroPosterSrc = computed(() => moodHeroData.value.heroPosterSrc)
const heroVideoSrc = computed(() => moodHeroData.value.heroVideoSrc)
const articleSlides = computed((): ArticleSlide[] => {
  if (moodHeroData.value.article) return [moodHeroData.value.article as ArticleSlide]
  return moodHeroData.value.articleSlides as ArticleSlide[] ?? []
})
const { getNewsArticles } = useNews()
const { data: latestNews } = await useAsyncData(
  'home-mood-hero-news',
  async () => {
    if (props.content) return [] as NewsArticle[]
    const news = await getNewsArticles()
    return news.slice(0, 2)
  },
  { default: () => [] as NewsArticle[] },
)

/** На главной (без своего `content`) — две последние записи из Strapi; иначе карточки из JSON контента */
type MoodHeroBottomItem = { key: string; card: MoodCard; to?: string }

const moodHeroBottomItems = computed((): MoodHeroBottomItem[] => {
  if (props.content) {
    return (moodHeroData.value.moodCards as MoodCard[]).map((card) => ({
      key: card.tag,
      card,
    }))
  }
  return (latestNews.value || [])
    .map((a) => ({
      key: a.id,
      to: `/news/${a.id}`,
      card: {
        tag: a.category,
        title: a.title,
        imageSrc: a.heroImage,
        imageAlt: a.title,
      },
    }))
})
</script>

<template>
  <section ref="sectionRef" class="mood-hero">
    <div class="mood-hero__grid">
      <UMoodSlide
        class="mood-hero-reveal mood-hero-reveal--from-top mood-hero-reveal--0"
        :class="{ 'mood-hero-reveal--in': isHeroVisible }"
        :slides="articleSlides"
        :background-color="backgroundColor"
      />

      <UMoodVideo
        class="mood-hero__video mood-hero-reveal mood-hero-reveal--from-right mood-hero-reveal--1"
        :class="{ 'mood-hero-reveal--in': isHeroVisible }"
        :poster-src="heroPosterSrc"
        :video-src="heroVideoSrc"
      />

      <div class="mood-hero__bottom">
        <UMoodCard
          v-for="(item, index) in moodHeroBottomItems"
          :key="item.key"
          class="mood-hero-reveal"
          :class="[
            index === 0 ? 'mood-hero-reveal--from-bl mood-hero-reveal--2' : 'mood-hero-reveal--from-br mood-hero-reveal--3',
            { 'mood-hero-reveal--in': isHeroVisible },
          ]"
          :card="item.card"
          :to="item.to"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.mood-hero {
  position: relative;
  overflow: hidden;

  &__grid {
    display: grid;
    gap: 14px;

    @media (min-width: 640px) {
      gap: 16px;
    }

    @media (min-width: 1024px) {
      grid-template-columns: minmax(0, 1.02fr) minmax(360px, 1fr);
      align-items: flex-start;
      gap: 18px;
    }
  }

  &__video {
    display: none;

    @media (min-width: 1024px) {
      display: flex;
    }
  }

  &__bottom {
    display: grid;
    gap: 14px;

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    @media (min-width: 1024px) {
      grid-column-start: 1;
      grid-row-start: 2;
    }
  }
}

.mood-hero-reveal {
  opacity: 0;
  transition:
    opacity 1.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 1.7s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;

  &--from-top {
    transform: translate3d(0, -22px, 0);
  }

  &--from-right {
    transform: translate3d(22px, 0, 0);
  }

  &--from-bl {
    transform: translate3d(-18px, 18px, 0);
  }

  &--from-br {
    transform: translate3d(18px, 18px, 0);
  }

  &--in {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  &--0 {
    transition-delay: 0ms;
  }

  &--1 {
    transition-delay: 90ms;
  }

  &--2 {
    transition-delay: 180ms;
  }

  &--3 {
    transition-delay: 260ms;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mood-hero-reveal {
    opacity: 1;
    transform: none;
    transition: none;
    will-change: auto;
  }
}
</style>
