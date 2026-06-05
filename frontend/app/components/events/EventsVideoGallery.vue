<script setup lang="ts">
type VideoItem = {
  src: string
  poster: string
  title: string
}

const videos: VideoItem[] = [
  {
    src: '/video/studio.mp4',
    poster: '/images/studio/studio-main.jpg',
    title: 'Пример работы 1',
  },
  {
    src: '/video/studio.mp4',
    poster: '/images/studio/studio-2.jpg',
    title: 'Пример работы 2',
  },
  {
    src: '/video/studio.mp4',
    poster: '/images/studio/mic.jpg',
    title: 'Пример работы 3',
  },
  {
    src: '/video/studio.mp4',
    poster: '/images/vocal/lesson-1.jpg',
    title: 'Пример работы 4',
  },
]
</script>

<template>
  <UBaseWrapper aria-labelledby="events-videos-title">
    <UBaseTitle
      label="Видео"
      title="Наши мероприятия в действии"
      description="Посмотрите, как проходят наши праздники"
    />

    <div class="videos-grid">
      <div
        v-for="(video, i) in videos"
        :key="video.src"
        class="video-item"
        :style="{ '--i': i }"
      >
        <div class="video-wrapper">
          <video
            :src="video.src"
            :poster="video.poster"
            class="video-element"
            controls
            playsinline
            preload="metadata"
            :aria-label="video.title"
          />
          <div class="video-play-overlay">
            <div class="play-button">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M11 8l12 8-12 8V8z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UBaseWrapper>
</template>

<style scoped>
.videos-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  max-width: 900px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .videos-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

@media (min-width: 1024px) {
  .videos-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
}

.video-item {
  opacity: 0;
  animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(var(--i, 0) * 80ms);
}

.video-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 16;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.video-wrapper:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  opacity: 1;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.video-element:not([data-playing]) ~ .video-play-overlay {
  opacity: 1;
}

.video-wrapper:hover .video-play-overlay {
  background: rgba(0, 0, 0, 0.4);
}

.play-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  color: #ec4899;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

@media (min-width: 1024px) {
  .play-button {
    width: 64px;
    height: 64px;
  }
}

.video-wrapper:hover .play-button {
  transform: scale(1.1);
  background: #fff;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.play-button svg {
  margin-left: 3px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .video-item {
    animation: none;
    opacity: 1;
  }

  .video-wrapper:hover {
    transform: none;
  }

  .video-wrapper:hover .play-button {
    transform: none;
  }
}
</style>
