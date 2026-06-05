<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import type { MoodHeroContent } from '~/content/mood-hero-content'
import type { NewsArticle } from '~/types/news.types'
import UMoodCard from '~/components/mood/UMoodCards.vue'

const props = defineProps<{
  content?: MoodHeroContent
  backgroundColor?: string
}>()

const moodHeroData = computed<MoodHeroContent | null>(() => props.content ?? null)

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

const heroPosterSrc = computed(() => moodHeroData.value?.heroPosterSrc || '')
const heroVideoSrc = computed(() => moodHeroData.value?.heroVideoSrc || '')
type MoodHeroSlide = {
  titleLine1?: string
  titleLine2?: string
  body: string
  directions: string[]
  imageSrc?: string
  imageAlt?: string
  backgroundColor?: string
}

const heroArticleSlide = computed((): MoodHeroSlide => {
  return (moodHeroData.value?.article as MoodHeroSlide)
    ?? (moodHeroData.value?.articleSlides?.[0] as MoodHeroSlide)
    ?? { body: '', directions: [] }
})
const heroArticleStyle = computed(() => {
  const color = heroArticleSlide.value.backgroundColor ?? props.backgroundColor ?? ''
  return { '--u-article-surface': color }
})
const heroTitleLine1 = computed(() => heroArticleSlide.value.titleLine1 ?? '')
const heroTitleLine2 = computed(() => heroArticleSlide.value.titleLine2 ?? '')
const heroBody = computed(() => heroArticleSlide.value.body)
const heroImageSrc = computed(() => heroArticleSlide.value.imageSrc ?? '')
const heroImageAlt = computed(() => heroArticleSlide.value.imageAlt ?? '')

type MoodHeroBottomItem = { key: string; card: any; to?: string }

const { getNewsArticles } = useNews()
const { data: latestNews } = await useAsyncData(
  'home-mood-hero-news',
  async () => {
    const news = await getNewsArticles()
    return news.slice(0, 2)
  },
  { default: () => [] as NewsArticle[] },
)

const moodHeroBottomItems = computed((): MoodHeroBottomItem[] => {
  return (latestNews.value || [])
    .map((news) => ({
      key: news.id,
      to: `/news/${news.id}`,
      card: {
        tag: news.category,
        title: news.title,
        imageSrc: news.heroImage,
        imageAlt: news.title,
      },
    }))
})
</script>

<template>
  <section ref="sectionRef" class="mood-hero">
    <div class="mood-hero__grid">
      <UMoodHeroArticle
        :is-visible="isHeroVisible"
        :article-style="heroArticleStyle"
        :title-line1="heroTitleLine1"
        :title-line2="heroTitleLine2"
        :body="heroBody"
        :image-src="heroImageSrc"
        :image-alt="heroImageAlt"
      />

      <UMoodVideo
        class="mood-hero__video mood-hero-reveal mood-hero-reveal--from-right mood-hero-reveal--1"
        :class="{ 'mood-hero-reveal--in': isHeroVisible }"
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
    gap: 0.875rem;

    @media (min-width: 640px) {
      gap: 1rem;
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
    gap: 0.875rem;

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
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
