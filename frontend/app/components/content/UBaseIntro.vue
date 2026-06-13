<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const SLIDE_INTERVAL_MS = 10000
const INTERSECTION_THRESHOLD = 0.15

type Theme = 'vocal' | 'piano' | 'guitar'

type Feature = {
  readonly title: string
  readonly text: string
}

type IntroImage = string | {
  readonly src: string
  readonly alt?: string
}

type Props = {
  titleId: string
  title: string
  leadParagraphs: readonly string[]
  features: readonly Feature[]
  visualLabel: string
  images?: readonly IntroImage[]
  backgroundImage?: string
  reverseLayout?: boolean
  theme?: Theme
  sectionBackground?: string
}

const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  reverseLayout: false,
  theme: 'vocal',
  sectionBackground: 'var(--u-color-white)',
})

const sectionRef = ref<HTMLElement>()
const isVisible = ref(false)
const currentImageIndex = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null
let stopSectionObserver: (() => void) | null = null

const normalizedImages = computed(() =>
  props.images
    .map((image): { src: string, alt: string } | null => {
      if (typeof image === 'string') {
        const src = image.trim()
        if (!src) return null
        return { src, alt: props.visualLabel }
      }

      const src = image.src.trim()
      if (!src) return null
      const alt = image.alt?.trim() || props.visualLabel
      return { src, alt }
    })
    .filter((image): image is { src: string, alt: string } => image !== null),
)
const hasMultipleImages = computed(() => normalizedImages.value.length > 1)
const hasImages = computed(() => normalizedImages.value.length > 0)
const currentImage = computed(() => normalizedImages.value[currentImageIndex.value] ?? null)
const currentImageSrc = computed(() => currentImage.value?.src || '')
const currentImageAlt = computed(() => currentImage.value?.alt || props.visualLabel)

onMounted(() => {
  const { stop } = useIntersectionObserver(
    sectionRef,
    ([entry]) => {
      if (entry?.isIntersecting && !isVisible.value) {
        isVisible.value = true
      }
    },
    { threshold: INTERSECTION_THRESHOLD }
  )
  stopSectionObserver = stop

  if (hasMultipleImages.value) {
    intervalId = setInterval(() => {
      currentImageIndex.value = (currentImageIndex.value + 1) % normalizedImages.value.length
    }, SLIDE_INTERVAL_MS)
  }
})

onUnmounted(() => {
  stopSectionObserver?.()

  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div
    ref="sectionRef"
    class="section"
    :class="[`theme-${theme}`, { 'section--reverse': reverseLayout, 'is-visible': isVisible }]"
    :style="{ '--section-bg': sectionBackground }"
    :aria-labelledby="titleId"
  >
    <div class="grid">
      <div class="content">
        <h2
          :id="titleId"
          class="unicorn-studio-title title"
        >
          {{ title }}
        </h2>
        <p
          v-for="(paragraph, idx) in leadParagraphs"
          :key="idx"
          class="lead"
          :class="`lead-${idx + 1}`"
        >
          {{ paragraph }}
        </p>

        <div class="cards">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            class="card"
            :class="`card-${index + 1}`"
          >
            <div class="card__head">
              <span
                class="card__dot"
                aria-hidden="true"
              />
              <h3 class="card__title">{{ feature.title }}</h3>
            </div>
            <p class="card__text">{{ feature.text }}</p>
          </div>
        </div>
      </div>

      <div
        class="visual"
        aria-hidden="true"
      >
        <div
          class="visual__frame"
          :class="{ 'visual__frame--with-bg': backgroundImage }"
          :style="backgroundImage ? { '--bg-image': `url(${backgroundImage})` } : undefined"
        >
          <slot name="visual">
            <Transition
              v-if="hasImages"
              name="fade"
              mode="out-in"
            >
              <NuxtImg
                :key="currentImageSrc"
                :src="currentImageSrc"
                :alt="currentImageAlt"
                loading="lazy"
                class="visual__image"
                width="500"
                format="webp"
              />
            </Transition>
          </slot>
          <div class="visual__shine" />
          <div class="visual__label">{{ visualLabel }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.section--reverse .grid {
  direction: rtl;
}

.section--reverse .grid > * {
  direction: ltr;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  /* align-items: center; */
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: 1.2fr 0.8fr;
    gap: 48px;
  }
}

.title {
  transform: translateY(30px);
  transition: all 0.8s var(--u-ease-smooth);
}

.section.is-visible .title {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.2s;
}

.lead {
  margin: 28px 0 0 3px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
  font-size: var(--u-font-17);
  font-weight: 400;
  line-height: 1.47;
  letter-spacing: -0.011em;
  color: var(--u-text-primary);
  max-width: 62ch;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s var(--u-ease-smooth);
}

@media (min-width: 1024px) {
  .lead {
    margin: 18px 0 0 3px;
  }
}


.section.is-visible .lead-1 {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.4s;
}

.section.is-visible .lead-2 {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.5s;
}

@media (min-width: 1024px) {
  .lead {
    font-size: var(--u-font-19);
    line-height: 1.52;
  }
}

.lead+.lead {
  margin-top: 50px;
  font-size: var(--u-font-16);
  color: var(--u-text-secondary);
}

.cards {
  margin-top: 22px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 768px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }
}

.card {
  background: var(--u-white-a85);
  border: 1px solid var(--u-black-a06);
  border-radius: 18px;
  padding: 16px 16px 14px;
  box-shadow: 0 8px 24px var(--u-black-a04);
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: all 0.7s var(--u-ease-smooth);
}

.section.is-visible .card-1 {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition-delay: 0.6s;
}

.section.is-visible .card-2 {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition-delay: 0.75s;
}

.section.is-visible .card-3 {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition-delay: 0.9s;
}

.card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 32px var(--u-black-a08);
  border-color: var(--u-black-a10);
}

.card__head {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Theme-specific dot colors */
.theme-vocal .card__dot {
  background: linear-gradient(135deg, var(--u-color-rose), var(--u-color-purple));
  box-shadow: 0 0 0 6px var(--u-purple-a08);
}

.theme-piano .card__dot {
  background: linear-gradient(135deg, #60a5fa, #34d399);
  box-shadow: 0 0 0 6px rgba(52, 211, 153, 0.1);
}

.theme-guitar .card__dot {
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  box-shadow: 0 0 0 6px rgba(245, 158, 11, 0.1);
}

.card__dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  transition: all 0.4s var(--u-ease-spring);
}

.card:hover .card__dot {
  transform: scale(1.3) rotate(180deg);
}

.card__title {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
  font-size: var(--u-font-14);
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--u-text-primary);
}

.card__text {
  margin: 10px 0 0;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
  font-size: var(--u-font-13);
  font-weight: 400;
  line-height: 1.47;
  letter-spacing: -0.006em;
  color: var(--u-text-secondary);
}

.visual {
  display: flex;
  justify-content: center;
  opacity: 0;
  transform: translateX(40px) scale(0.95);
  transition: all 1s var(--u-ease-smooth);
}

.section.is-visible .visual {
  opacity: 1;
  transform: translateX(0) scale(1);
  transition-delay: 0.3s;
}

.section--reverse .visual {
  transform: translateX(-40px) scale(0.95);
}

.section--reverse.is-visible .visual {
  transform: translateX(0) scale(1);
}

/* Theme-specific visual frame gradients */
.theme-vocal .visual__frame {
  background: radial-gradient(120% 120% at 0% 0%,
      rgba(251, 113, 133, 0.3),
      transparent 60%),
    radial-gradient(120% 120% at 100% 100%,
      rgba(59, 130, 246, 0.35),
      transparent 55%),
    linear-gradient(135deg, var(--u-gray-900-a92), var(--u-gray-900-a74));
}

.theme-piano .visual__frame {
  background-image: radial-gradient(120% 120% at 0% 0%,
      rgba(96, 165, 250, 0.25),
      transparent 60%),
    radial-gradient(120% 120% at 100% 100%,
      rgba(52, 211, 153, 0.28),
      transparent 55%),
    linear-gradient(135deg, rgba(17, 24, 39, 0.5), rgba(17, 24, 39, 0.35)),
    var(--bg-image, none);
  background-size: 100% 100%, 100% 100%, 100% 100%, cover;
  background-position: 0 0, 0 0, 0 0, center;
  background-repeat: no-repeat;
}

.theme-guitar .visual__frame {
  background: radial-gradient(120% 120% at 0% 0%,
      rgba(245, 158, 11, 0.3),
      transparent 60%),
    radial-gradient(120% 120% at 100% 100%,
      rgba(239, 68, 68, 0.35),
      transparent 55%),
    linear-gradient(135deg, var(--u-gray-900-a92), var(--u-gray-900-a74));
}

.visual__frame {
  position: relative;
  width: min(420px, 100%);
  aspect-ratio: 4 / 5;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.18);
  display: grid;
  place-items: center;
  color: var(--u-white-a90);
  transition: all 0.5s var(--u-ease-smooth);
}

.visual__frame:hover {
  transform: scale(1.02);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.22);
}

.visual__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 28px;
}

.visual__shine {
  position: absolute;
  inset: -1px;
  background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.16),
      transparent 45%,
      transparent 70%,
      var(--u-white-a14));
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.8s ease;
}

.section.is-visible .visual__shine {
  opacity: 0.55;
  transition-delay: 0.8s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.content {
  padding-top: 0;
}

@media (min-width: 1024px) {
  .content {
    padding-top: 20px;
  }
}
.visual__label {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  padding: 12px 14px;
  border-radius: 16px;
  background: var(--u-white-a10);
  backdrop-filter: blur(16px);
  border: 1px solid var(--u-white-a14);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
  font-size: var(--u-font-12);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s var(--u-ease-smooth);
}

.section.is-visible .visual__label {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 1s;
}

/* For slot content like SVG icons */
:slotted(svg) {
  opacity: 0.95;
  filter: drop-shadow(0 16px 40px var(--u-black-a35));
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {

  .title,
  .lead,
  .card,
  .visual,
  .visual__shine,
  .visual__label,
  .card__dot {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  .section.is-visible .title,
  .section.is-visible .lead,
  .section.is-visible .card,
  .section.is-visible .visual,
  .section.is-visible .visual__shine,
  .section.is-visible .visual__label {
    animation: none !important;
    transition: none !important;
  }
}
</style>
