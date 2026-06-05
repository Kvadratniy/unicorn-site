<script setup lang="ts">
type EventType = {
  title: string
  image: string
}

const eventTypes: EventType[] = [
  {
    title: 'Свадьбы и вторые дни свадьбы',
    image: '/images/studio/studio-main.jpg',
  },
  {
    title: 'Дни рождения и юбилеи',
    image: '/images/studio/studio-2.jpg',
  },
  {
    title: 'Корпоративы и тимбилдинги',
    image: '/images/studio/mic.jpg',
  },
  {
    title: 'Мальчишники и девичники',
    image: '/images/vocal/lesson-1.jpg',
  },
  {
    title: 'Новогодние вечеринки и праздники',
    image: '/images/vocal/vocal-2.jpg',
  },
  {
    title: 'Фестивали и городские праздники',
    image: '/images/piano/piano-1.jpg',
  },
  {
    title: 'Выставки и презентации',
    image: '/images/piano/piano-2.jpg',
  },
  {
    title: 'Концерты и шоу-программы',
    image: '/images/guitar/1.jpg',
  },
]
</script>

<template>
  <UBaseWrapper aria-labelledby="events-types-title">
    <UBaseTitle
      label="Типы мероприятий"
      title="Для каких событий подойдёт наше предложение?"
      description="Организуем праздники любого формата и масштаба"
    />

    <div class="types-grid">
      <article
        v-for="(type, i) in eventTypes"
        :key="type.title"
        class="type-card"
        :style="{ '--i': i }"
      >
        <div class="type-image-wrapper">
          <NuxtImg
            :src="type.image"
            :alt="type.title"
            class="type-image"
            format="webp"
            loading="lazy"
            width="400"
            height="300"
          />
          <div class="type-overlay" />
        </div>
        <div class="type-content">
          <h3 class="type-title">{{ type.title }}</h3>
        </div>
      </article>
    </div>
  </UBaseWrapper>
</template>

<style scoped>
.types-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 640px) {
  .types-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (min-width: 1024px) {
  .types-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
  }
}

.type-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(var(--i, 0) * 60ms);
  cursor: pointer;
}

.type-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  border-color: rgba(236, 72, 153, 0.3);
}

.type-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
}

.type-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.type-card:hover .type-image {
  transform: scale(1.08);
}

.type-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.2) 60%,
    rgba(0, 0, 0, 0.5) 100%
  );
  transition: opacity 0.3s ease;
}

.type-card:hover .type-overlay {
  opacity: 0.7;
}

.type-content {
  padding: 20px 20px 24px;
}

@media (min-width: 1024px) {
  .type-content {
    padding: 24px 24px 28px;
  }
}

.type-title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #111;
  font-family: 'Suisse Intl', sans-serif;
  line-height: 1.35;
  transition: color 0.3s ease;
}

@media (min-width: 1024px) {
  .type-title {
    font-size: 18px;
  }
}

.type-card:hover .type-title {
  color: #ec4899;
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
  .type-card {
    animation: none;
    opacity: 1;
  }

  .type-card:hover {
    transform: none;
  }

  .type-card:hover .type-image {
    transform: none;
  }
}
</style>
