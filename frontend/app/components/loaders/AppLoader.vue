<script setup lang="ts">
defineProps<{
  visible: boolean
}>()
</script>

<template>
  <Transition name="app-loader">
    <div
      v-show="visible"
      class="app-loader"
      aria-hidden="true"
    >
      <div class="app-loader__bg" />
      <div class="app-loader__content" aria-label="Загрузка">
        <div class="app-loader__logo-wrap">
          <NuxtImg
            src="/images/logo/logo-4.png"
            alt="Unicorn Studio Logo"
            class="app-loader__logo"
            width="200"
            height="200"
            format="webp"
          />
        </div>
        <div class="app-loader__bar">
          <div class="app-loader__bar-fill" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.app-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fdf2f8;
}

.app-loader__bg {
  position: absolute;
  inset: 0;
  background-color: #fdf2f8;
}

.app-loader__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
}

.app-loader__logo-wrap {
  position: relative;
  width: clamp(120px, 25vw, 180px);
  height: clamp(120px, 25vw, 180px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: app-loader-pulse 1.8s ease-in-out infinite;
}

.app-loader__logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(190, 24, 93, 0.15));
}

.app-loader__bar {
  width: 80px;
  height: 3px;
  background-color: rgba(190, 24, 93, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.app-loader__bar-fill {
  height: 100%;
  width: 40%;
  background-color: #e339a2;
  border-radius: 2px;
  animation: app-loader-progress 1.2s ease-in-out infinite;
}

@keyframes app-loader-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.03);
    opacity: 0.92;
  }
}

@keyframes app-loader-progress {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(350%);
  }
}

.app-loader-enter-active,
.app-loader-leave-active {
  transition: opacity 0.35s ease-out;
}

.app-loader-enter-from,
.app-loader-leave-to {
  opacity: 0;
}

.app-loader-leave-active .app-loader__content {
  transition: transform 0.25s ease-out;
}

.app-loader-leave-to .app-loader__content {
  transform: scale(0.98);
}
</style>
