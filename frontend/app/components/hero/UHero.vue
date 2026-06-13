<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

type VideoSrc = string | { mobile: string; desktop: string }

type Stat = { value: string; label: string }

const props = withDefaults(
  defineProps<{
    videoSrc: VideoSrc
    /** URL картинки для мобильных (экономия трафика). Если задан — на мобильном показывается картинка вместо видео. */
    imageSrc?: string
    videoType?: string
    titleId?: string
    titleAccent: string
    titleLine2: string
    description: string
    stats: Stat[]
    tagRight?: string
    titleNowrap?: boolean
  }>(),
  {
    videoType: 'video/mp4',
    tagRight: '40px',
    titleNowrap: false,
  }
)

const { open: openContactModal } = useContactModal()
const isMobile = useMediaQuery('(max-width: 768px)')

const desktopVideoSrc = computed(() => {
  const src = props.videoSrc
  if (typeof src === 'string') return src
  return src.desktop
})

const mobileVideoSrc = computed(() => {
  const src = props.videoSrc
  if (typeof src === 'string') return src
  return src.mobile
})

/** Текущий источник видео на основе размера экрана */
const currentVideoSrc = computed(() => {
  return isMobile.value ? mobileVideoSrc.value : desktopVideoSrc.value
})

/** Состояние готовности видео к воспроизведению */
const isVideoReady = ref(false)
const videoError = ref(false)

/** Обработчик успешной загрузки видео */
const handleVideoCanPlay = () => {
  isVideoReady.value = true
  videoError.value = false
}

/** Обработчик ошибки загрузки видео */
const handleVideoError = () => {
  videoError.value = true
  isVideoReady.value = false
}

/** Всегда загружаем видео на всех скоростях соединения */
const shouldLoadVideo = computed(() => {
  // On mobile we prefer image-only hero to reduce LCP and bandwidth.
  if (isMobile.value && props.imageSrc) return false
  return true
})

/** Показывать видео только если оно готово и нет ошибки */
const showVideo = computed(() => {
  return shouldLoadVideo.value && isVideoReady.value && !videoError.value
})

/** Сбрасываем состояние при изменении источника видео */
watch(currentVideoSrc, () => {
  isVideoReady.value = false
  videoError.value = false
})
</script>

<template>
  <section
    class="hero"
    :aria-labelledby="titleId || undefined"
  >
    <div class="hero__bg" aria-hidden="true">
      <!-- Картинка всегда показывается как placeholder -->
      <NuxtImg
        v-if="imageSrc"
        :src="imageSrc"
        alt=""
        class="hero__image"
        :class="{ 'hero__image--hidden': showVideo }"
        fetchpriority="high"
        width="600"
        height="1080"
        sizes="xs:100vw lg:100vw"
        format="webp"
      />

      <!-- Видео загружается в фоне и показывается после готовности -->
      <video
        v-if="shouldLoadVideo"
        :key="currentVideoSrc"
        :src="currentVideoSrc"
        :poster="imageSrc"
        :type="videoType"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
        class="hero__video"
        :class="{ 'hero__video--visible': showVideo }"
        @canplaythrough="handleVideoCanPlay"
        @loadeddata="handleVideoCanPlay"
        @error="handleVideoError"
      />
    </div>

    <div class="hero__decor" aria-hidden="true">
      <div class="decor-glow decor-glow--1"></div>
      <div class="decor-glow decor-glow--2"></div>
    </div>

    <div class="hero__wrapper">
      <div class="hero__content">
        <h1 :id="titleId" class="hero__title">
          <span
            class="title__line title__line--accent title__line--1"
            :class="{ 'title__line--nowrap': titleNowrap }"
          >
            {{ titleAccent }}
          </span>{{ ' ' }}<span
            class="title__line title__line--3"
            :class="{ 'title__line--nowrap': titleNowrap }"
          >
            {{ titleLine2 }}
          </span>
        </h1>

        <p class="hero__text">
          {{ description }}
        </p>

        <div class="hero__actions">
          <slot name="actions">
            <UButton variant="hero-primary" @click="openContactModal">
              Бесплатное пробное занятие
            </UButton>
          </slot>
        </div>
      </div>

      <div
        class="hero__tag"
        aria-hidden="true"
        :style="tagRight ? { '--hero-tag-right': tagRight } : undefined"
      >
        <div class="tag__body">
          <div
            v-for="(stat, i) in stats"
            :key="i"
            class="tag__stat"
            :style="{ '--delay': `${i * 0.1}s` }"
          >
            <span class="tag__value">{{ stat.value }}</span>
            <span class="tag__label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
$desktop: 1024px;
$title-desktop: 900px;
$small-mobile: 525px;
$ease-out: var(--u-ease-out);
$ease-spring: var(--u-ease-spring);

.hero {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 120px);
  overflow: hidden;
  border-radius: 20px;

  @media (min-width: $desktop) {
    min-height: auto;
    height: 650px;
    max-height: 650px;
    align-items: center;
  }

  &__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;

    &::after {
      position: absolute;
      inset: 0;
      z-index: 3;
      pointer-events: none;
      content: '';
      background: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.65) 0%,
        var(--u-black-a40) 55%,
        var(--u-black-a60) 100%
      );
    }
  }

  &__image,
  &__video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: opacity 0.6s ease-in-out;
  }

  &__image {
    z-index: 1;

    &--hidden {
      opacity: 0;
      pointer-events: none;
    }
  }

  &__video {
    z-index: 2;
    opacity: 0;

    &--visible {
      opacity: 1;
    }
  }

  &__decor {
    position: absolute;
    inset: 0;
    z-index: 1;
    overflow: hidden;
    pointer-events: none;
  }

  &__wrapper {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: flex-end;
    width: 100%;
    min-height: 100%;
    margin: 0 auto;
    padding: 0 16px;

    @media (min-width: $desktop) {
      padding: 0 80px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    width: 100%;
    padding-bottom: 120px;

    @media (min-width: $desktop) {
      max-width: 640px;
      gap: 32px;
      padding: 0 0 150px;
    }

    @media (max-width: $small-mobile) {
      padding-bottom: 40px;
    }
  }

  &__title {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin: 0;
  }

  &__text {
    max-width: 520px;
    margin: 0;
    font-family: 'Suisse Intl', sans-serif;
    font-size: var(--u-font-16);
    line-height: 1.7;
    color: var(--u-white-a85);
    opacity: 0;
    animation: fadeInUp 0.7s $ease-out forwards;
    animation-delay: 0.7s;

    @media (min-width: $desktop) {
      font-size: var(--u-font-18);
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    opacity: 0;
    animation: fadeInUp 0.7s $ease-out forwards;
    animation-delay: 0.85s;

    @media (min-width: $desktop) {
      margin-top: 8px;
    }
  }

  &__tag {
    display: none;

    @media (min-width: $desktop) {
      position: absolute;
      right: var(--hero-tag-right, 40px);
      bottom: 80px;
      z-index: 3;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      opacity: 0;
      animation: tagSwing 0.8s $ease-spring forwards;
      animation-delay: 1.2s;
    }
  }

}

.decor-glow {
  position: absolute;
  border-radius: 50%;
  opacity: 0.18;
  filter: blur(120px);
  animation: float 14s ease-in-out infinite;

  &--1 {
    top: -160px;
    left: 10%;
    width: 520px;
    height: 520px;
    background: linear-gradient(135deg, var(--u-color-rose), #c084fc);
    animation-delay: 0s;
  }

  &--2 {
    right: 28%;
    bottom: -120px;
    width: 420px;
    height: 420px;
    background: linear-gradient(135deg, #60a5fa, #34d399);
    animation-delay: -5s;
  }
}

.title {
  &__line {
    display: block;
    font-family: 'Druk Wide', sans-serif;
    font-size: var(--u-font-fluid-display-hero-tag);
    font-weight: 600;
    line-height: 1.2;
    color: var(--u-color-white);
    text-shadow: 0 4px 30px var(--u-black-a30);
    opacity: 0;
    animation:
      fadeInUp 0.8s $ease-out forwards,
      gradientShift 5s ease-in-out infinite;

    @media (min-width: $title-desktop) {
      font-size: var(--u-font-60);
      line-height: 1.06;
    }

    &--nowrap {
      white-space: nowrap;
    }

    &--1 {
      animation-delay: 0.35s;
    }

    &--3 {
      animation-delay: 0.55s;
    }

    &--accent {
      background: linear-gradient(135deg, var(--u-color-white) 100%, var(--u-color-white) 100%, var(--u-color-magenta) 100%);
      background-clip: text;
      background-size: 200% 100%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

.tag {
  &__body {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 0;
    padding: 0;
    overflow: hidden;
    background: var(--u-white-a95);
    border: 1px solid var(--u-black-a06);
    border-radius: 20px;
    box-shadow:
      0 25px 60px var(--u-black-a08),
      0 0 0 1px var(--u-white-a50) inset;
    backdrop-filter: blur(24px);

    &::before {
      position: absolute;
      inset: -1px;
      z-index: -1;
      border-radius: 21px;
      opacity: 0;
      content: '';
      background: linear-gradient(
        135deg,
        rgba(251, 113, 133, 0.14),
        transparent 40%,
        transparent 60%,
        rgba(59, 130, 246, 0.14)
      );
      transition: opacity 0.4s ease;
    }

    &::after {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      content: '';
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.6),
        transparent
      );
      animation: tagShine 12s ease-in-out infinite;
      animation-delay: 6s;
    }
  }

  &__stat {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 20px 24px;
    text-align: center;
    opacity: 0;
    animation: fadeInUp 0.5s $ease-out forwards;
    animation-delay: calc(1.3s + var(--delay));

    &:not(:last-child)::after {
      position: absolute;
      top: 50%;
      right: 0;
      width: 1px;
      height: 40px;
      content: '';
      background: linear-gradient(
        180deg,
        transparent,
        var(--u-black-a08),
        transparent
      );
      transform: translateY(-50%);
    }

    &:first-child {
      padding-left: 28px;
    }

    &:last-child {
      padding-right: 28px;
    }
  }

  &__value {
    font-size: var(--u-font-32);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -1px;
    background: linear-gradient(135deg, var(--u-color-gray-900) 0%, #374151 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__label {
    font-size: var(--u-font-10);
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 1.2px;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-30px) scale(1.05);
  }
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes tagSwing {
  0% {
    opacity: 0;
    transform: translateY(-20px) rotate(5deg);
  }
  60% {
    transform: translateY(5px) rotate(-2deg);
  }
  80% {
    transform: translateY(-2px) rotate(1deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotate(0deg);
  }
}

@keyframes tagShine {
  0%,
  100% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .title__line,
  .hero__text,
  .hero__actions,
  .hero__tag,
  .tag__stat {
    animation: none;
    opacity: 1;
  }

  .decor-glow {
    animation: none;
  }

  .title__line--accent {
    animation: none;
    opacity: 1;
  }
}
</style>
