<script setup lang="ts">
import type { StudioClientsViewModel } from '~/composables/pages/useStudio'

const props = defineProps<{
  clients: StudioClientsViewModel
}>()
</script>

<template>
  <UBaseWrapper aria-labelledby="studio-clients-title">
    <UBaseTitle
        label="Кейсы"
        :title="props.clients.title"
        :description="props.clients.subtitle"
      />

      <div class="clients-masonry">
        <UClientCard
          v-for="(client, i) in props.clients.items"
          :key="client.name"
          :client="client"
          :index="i"
        />
      </div>
  </UBaseWrapper>
</template>

<style scoped>
.section {
  padding: 40px 0;
  background: linear-gradient(180deg, #de71a80f 0%, #f3f5f7 50%, #f1f4f7 100%);
  position: relative;
  overflow: hidden;
}

@media (min-width: 768px) {
  .section {
    padding: 50px 0 50px;
  }
}

@media (min-width: 1024px) {
  .section {
    padding: 50px 0 50px;
  }
}

.section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 800px;
  height: 400px;
  background: radial-gradient(ellipse at center top, #ec48990f 0%, transparent 70%);
  pointer-events: none;
}

.wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
}

@media (min-width: 1024px) {
  .wrap {
    padding: 0 40px;
  }
}

.head {
  text-align: center;
  margin-bottom: 64px;
}

@media (min-width: 768px) {
  .head {
    margin-bottom: 76px;
  }
}

@media (min-width: 1024px) {
  .head {
    margin-bottom: 88px;
  }
}

.eyebrow {
  margin: 0 0 16px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #94a3b8;
  opacity: 0;
  animation: fadeIn 0.8s ease 0.1s forwards;
}

@media (min-width: 768px) {
  .eyebrow {
    font-size: 12px;
    margin-bottom: 20px;
  }
}

.title {
  margin: 0 0 16px;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.025em;
  color: #0f172a;
  opacity: 0;
  animation: fadeIn 0.8s ease 0.2s forwards;
}

@media (min-width: 768px) {
  .title {
    margin-bottom: 20px;
  }
}

.subtitle {
  margin: 0 auto;
  max-width: 640px;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  font-weight: 400;
  opacity: 0;
  animation: fadeIn 0.8s ease 0.3s forwards;
  font-feature-settings: 'liga' 1, 'calt' 1;
  text-rendering: optimizeLegibility;
}

@media (min-width: 768px) {
  .subtitle {
    font-size: 17px;
    line-height: 1.7;
  }
}

@media (min-width: 1024px) {
  .subtitle {
    font-size: 18px;
  }
}

/* Pinterest-style masonry: колонки + разная высота карточек по контенту */
.clients-masonry {
  width: 100%;
  column-count: 1;
  column-gap: 20px;
}

@media (min-width: 768px) {
  .clients-masonry {
    column-count: 3;
    column-gap: 24px;
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .eyebrow,
  .title,
  .subtitle {
    animation: none;
    opacity: 1;
  }
}
</style>
