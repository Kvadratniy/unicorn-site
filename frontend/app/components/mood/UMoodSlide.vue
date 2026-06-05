<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import { useIntervalFn, usePreferredReducedMotion } from '@vueuse/core'

export type ArticleSlide = {
  titleLine1?: string
  titleLine2?: string
  body: string
  directions: string[]
  /** Картинка под текстом слайда; по умолчанию `/images/1.png` */
  imageSrc?: string
  imageAlt?: string
  /** Фон карточки для этого слайда (любой валидный CSS color) */
  backgroundColor?: string
}

const DEFAULT_TITLE_1 = 'Музыкальная студия'
const DEFAULT_TITLE_2 = 'ЮНИКОРН'
const DEFAULT_SURFACE = 'rgba(132, 112, 187, 0.291)'
const DEFAULT_SLIDE_IMAGE = '/images/1.png'
const DEFAULT_SLIDE: ArticleSlide = { body: '', directions: [] }

const props = withDefaults(
  defineProps<{
    slides: ArticleSlide[]
    autoPlayMs?: number
    /** Фон по умолчанию, если у слайда не задан `backgroundColor` */
    backgroundColor?: string
  }>(),
  { autoPlayMs: 8000 },
)

const currentIndex = ref(0)
const isPaused = ref(false)
const prefersReducedMotion = usePreferredReducedMotion()

const slideCount = computed(() => props.slides.length)
const currentSlide = computed((): ArticleSlide => {
  return props.slides[currentIndex.value] ?? props.slides[0] ?? DEFAULT_SLIDE
})

watch(slideCount, (len) => {
  if (currentIndex.value >= len) currentIndex.value = Math.max(0, len - 1)
})

const titleLine1 = computed(() => currentSlide.value?.titleLine1 ?? DEFAULT_TITLE_1)
const titleLine2 = computed(() => currentSlide.value?.titleLine2 ?? DEFAULT_TITLE_2)
const slideImageSrc = computed(() => currentSlide.value?.imageSrc ?? DEFAULT_SLIDE_IMAGE)
const slideImageAlt = computed(() => currentSlide.value?.imageAlt ?? 'Unicorn Studio')
const articleAriaLabel = computed(() =>
  canNavigate.value
    ? `О студии, слайд ${currentIndex.value + 1} из ${slideCount.value}`
    : 'О студии',
)

const articleSurfaceStyle = computed(() => {
  const color =
    currentSlide.value?.backgroundColor ?? props.backgroundColor ?? DEFAULT_SURFACE
  return { '--u-article-surface': color }
})

const canNavigate = computed(() => slideCount.value > 1)
const canAutoPlay = computed(() => {
  return canNavigate.value && props.autoPlayMs > 0 && !prefersReducedMotion.value
})

const goNext = () => {
  if (!canNavigate.value) return
  currentIndex.value = (currentIndex.value + 1) % slideCount.value
}

const goPrev = () => {
  if (!canNavigate.value) return
  currentIndex.value = (currentIndex.value - 1 + slideCount.value) % slideCount.value
}

const intervalMs = computed(() => props.autoPlayMs)
const { pause, resume } = useIntervalFn(goNext, intervalMs, { immediate: false })

watchEffect(() => {
  const run = canAutoPlay.value && !isPaused.value
  if (run) resume()
  else pause()
})

const setPaused = (paused: boolean) => {
  if (!canAutoPlay.value) return
  isPaused.value = paused
}

const onPointerEnter = () => {
  setPaused(true)
}

const onPointerLeave = () => {
  setPaused(false)
}

const onFocusIn = () => {
  setPaused(true)
}

const onFocusOut = (e: FocusEvent) => {
  const article = e.currentTarget
  if (!(article instanceof HTMLElement)) return
  if (article.contains(e.relatedTarget as Node | null)) return
  setPaused(false)
}
</script>

<template>
  <article
    role="region"
    :aria-label="articleAriaLabel"
    aria-roledescription="карусель"
    class="u-article-content"
    :style="articleSurfaceStyle"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <div class="u-article-header">
      <span class="u-article-eyebrow">
        Музыкальная студия
      </span>
      <span class="u-article-header-divider" />
      <div class="u-article-header-actions">
        <div
          v-if="canNavigate"
          class="u-article-nav"
          role="group"
          aria-label="Переключение слайдов"
        >
          <button
            type="button"
            class="u-article-nav-btn"
            aria-label="Предыдущий слайд"
            @click="goPrev"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" class="u-article-nav-icon">
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            class="u-article-nav-btn"
            aria-label="Следующий слайд"
            @click="goNext"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" class="u-article-nav-icon">
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div aria-live="off" class="u-article-viewport">
      <Transition name="article-carousel" mode="out-in">
        <div :key="currentIndex" class="article-carousel-panel">
          <h1 class="u-article-title">
            <span class="u-article-title-line1">
              {{ titleLine1 }}
            </span>
            <br>
            <span class="u-article-title-line2">
              {{ titleLine2 }}
            </span>
          </h1>

          <p class="u-article-body">
            {{ currentSlide.body }}
          </p>
          <NuxtImg
            :src="slideImageSrc"
            :alt="slideImageAlt"
            format="webp"
            class="u-article-image"
          />
        </div>
      </Transition>
    </div>
  </article>
</template>

<style scoped lang="scss">
$sm: 640px;
$lg: 1024px;

.u-article-content {
  --u-article-border: rgb(36 31 27 / 0.08);
  --u-article-surface: rgba(132, 112, 187, 0.291);
  --u-article-shadow: rgb(49 40 32 / 0.08);
  --u-article-header-foreground: rgb(36 31 27 / 0.7);
  --u-article-divider: rgb(36 31 27 / 0.2);
  --u-article-nav-border: rgba(36, 31, 27, 0);
  --u-article-nav-bg: rgb(255 255 255 / 0.55);
  --u-article-nav-fg: rgb(36 31 27 / 0.75);
  --u-article-nav-bg-hover: rgba(196, 131, 224, 0.55);
  --u-article-heading: #13110f;
  --u-article-accent: #d24ade9c;
  --u-article-body-text: rgb(36 31 27 / 0.72);

  position: relative;
  overflow: hidden;
  background-color: var(--u-article-surface);
  border: 1px solid var(--u-article-border);
  border-radius: 28px;
  transition: background-color 0.22s ease;
  /* box-shadow: 0 14px 40px var(--u-article-shadow); */

  @media (min-width: $lg) {
    grid-column-start: 1;
    grid-row-start: 1;
    min-height: 390px;
    border-radius: 30px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.u-article-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.75rem;
  color: var(--u-article-header-foreground);
}

.u-article-eyebrow {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
  letter-spacing: 0.24em;
}

.u-article-header-divider {
  flex: 1;
  height: 1px;
  background-color: var(--u-article-divider);
}

.u-article-header-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 20px;
}

.u-article-nav {
  display: flex;
  flex-shrink: 0;
  justify-content: flex-end;
  gap: 0.25rem;

  @media (min-width: $sm) {
    margin-left: auto;
  }
}

.u-article-nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-color: var(--u-article-nav-border);
  border-style: solid;
  border-width: 1px;
  border-radius: 9999px;
  background-color: var(--u-article-nav-bg);
  color: var(--u-article-nav-fg);
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background-color: var(--u-article-nav-bg-hover);
    color: var(--u-article-heading);
  }

  &:focus-visible {
    outline: 2px solid var(--u-article-accent);
    outline-offset: 2px;
  }
}

.u-article-nav-icon {
  flex-shrink: 0;
}

.u-article-viewport {
  min-height: 0;
}

.u-article-title {
  margin: 0;
  padding-right: 1.75rem;
  padding-left: 1.75rem;
}

.u-article-title-line1,
.u-article-title-line2 {
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.u-article-title-line1 {
  font-size: 38px;
  font-weight: 500;
  color: var(--u-article-heading);
}

.u-article-title-line2 {
  font-family: 'Druk Wide', sans-serif;
  font-size: clamp(2rem, 10vw, 4.26rem);
  font-weight: 800;
  color: var(--u-article-accent);
}

.u-article-body {
  max-width: 34rem;
  margin: 0.5rem 0 0;
  padding-right: 1.75rem;
  padding-bottom: 1.25rem;
  padding-left: 1.75rem;
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--u-article-body-text);
  white-space: pre-line;

  @media (min-width: $sm) {
    font-size: 15px;
  }

  @media (min-width: $lg) {
    font-size: 1rem;
  }
}

.u-article-image {
  margin-top: 20px;
  padding-bottom: 0.75rem;
}

.article-carousel-enter-active,
.article-carousel-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.article-carousel-enter-from {
  opacity: 0;
  transform: translate3d(10px, 0, 0);
}

.article-carousel-leave-to {
  opacity: 0;
  transform: translate3d(-10px, 0, 0);
}

@media (prefers-reduced-motion: reduce) {

  .article-carousel-enter-active,
  .article-carousel-leave-active {
    transition: none;
  }

  .article-carousel-enter-from,
  .article-carousel-leave-to {
    transform: none;
  }
}
</style>
