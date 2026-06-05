<script setup lang="ts">
defineProps<{
  videoSrc: string
}>()

const isVideoReady = ref(false)
const videoError = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)

const showVideo = computed(() => isVideoReady.value && !videoError.value)

const handleVideoCanPlay = () => {
  const video = videoRef.value
  if (video) {
    video.muted = true
    video.defaultMuted = true
    video.volume = 0
  }
  isVideoReady.value = true
  videoError.value = false
}

const handleVideoError = () => {
  videoError.value = true
  isVideoReady.value = false
}

const enforceMuted = () => {
  const video = videoRef.value
  if (!video) return
  if (!video.muted || video.volume !== 0) {
    video.muted = true
    video.defaultMuted = true
    video.volume = 0
  }
}
</script>

<template>
  <article
    class="u-article-video"
  >
    <video
      ref="videoRef"
      :src="videoSrc"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      disablepictureinpicture
      disableremoteplayback
      class="u-article-video__media"
      :class="{ 'u-article-video__media--visible': showVideo }"
      @canplay="handleVideoCanPlay"
      @loadeddata="handleVideoCanPlay"
      @volumechange="enforceMuted"
      @error="handleVideoError"
    />

    <div class="u-article-video__gradient" />
  </article>
</template>

<style scoped lang="scss">
$lg: 1024px;

.u-article-video {
  --u-av-surface: #cfcbd7;
  --u-av-shadow: rgb(49 40 32 / 0.12);
  --u-av-shadow-hover: rgb(49 40 32 / 0.16);
  --u-av-gradient: linear-gradient(
    180deg,
    rgba(17, 15, 13, 0.02) 0%,
    rgba(17, 15, 13, 0.1) 56%,
    rgba(17, 15, 13, 0.45) 100%
  );
  --u-av-cta-solid-bg: rgba(179, 156, 242, 0.776);
  --u-av-cta-solid-text: #ffffff;
  --u-av-cta-solid-shadow-hover: rgb(17 15 13 / 0.18);
  --u-av-cta-solid-icon-bg: #ffffff;
  --u-av-cta-solid-icon-fg: #000000;
  --u-av-cta-ghost-border: rgb(255 255 255 / 0.28);
  --u-av-cta-ghost-bg: rgb(255 255 255 / 0.12);
  --u-av-cta-ghost-text: #fff;
  --u-av-cta-ghost-border-hover: rgb(255 255 255 / 0.38);
  --u-av-cta-ghost-bg-hover: rgb(255 255 255 / 0.2);

  position: relative;
  grid-column-start: auto;
  grid-row: auto;
  align-self: auto;
  height: 100%;
  min-height: 420px;
  overflow: hidden;
  background-color: var(--u-av-surface);
  border-radius: 28px;
  transition: box-shadow 0.3s;
  /* box-shadow: 0 18px 50px var(--u-av-shadow); */

  @media (min-width: $lg) {
    grid-column-start: 2;
    grid-row: 1 / span 2;
    align-self: stretch;
    min-height: 620px;
    border-radius: 30px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &__poster,
  &__media {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease-in-out;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  &__poster {
    opacity: 1;

    &--hidden {
      opacity: 0;
    }
  }

  &__media {
    position: absolute;
    inset: 0;
    opacity: 0;

    &--visible {
      opacity: 1;
    }
  }

  &__gradient {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: var(--u-av-gradient);
  }

  &-cta-primary {
    background-color: var(--u-av-cta-solid-bg);
    color: var(--u-av-cta-solid-text);

    &:hover {
      box-shadow: 0 10px 24px var(--u-av-cta-solid-shadow-hover);
    }
  }

  &-cta-primary-icon {
    background-color: var(--u-av-cta-solid-icon-bg);
    color: var(--u-av-cta-solid-icon-fg);
  }

  &-cta-secondary {
    border-color: var(--u-av-cta-ghost-border);
    background-color: var(--u-av-cta-ghost-bg);
    color: var(--u-av-cta-ghost-text);

    &:hover {
      border-color: var(--u-av-cta-ghost-border-hover);
      background-color: var(--u-av-cta-ghost-bg-hover);
    }
  }
}
</style>
