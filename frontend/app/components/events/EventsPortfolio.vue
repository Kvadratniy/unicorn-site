<script setup lang="ts">
type PortfolioItem = {
  title: string
  description: string
  image: string
  guests?: string
  format?: string
}

const portfolioItems: PortfolioItem[] = [
  {
    title: 'Необычная свадьба',
    description: '50 гостей, зал в центре города. Ведущий, диджей, интерактивные игры. Всё оборудование и реквизит предоставлены нами или подобраны в аренде.',
    image: '/images/studio/studio-main.jpg',
    guests: '50 гостей',
    format: 'Свадебное торжество',
  },
  {
    title: 'Корпоратив IT компании',
    description: 'Арендованный дом с бассейном. По запросу заказчика диджей играет только хаус-музыку. Формат «Тик-Ток вечеринка» подразумевал, что все активности будут взяты исключительно из старых и новых трендов и мемов.',
    image: '/images/studio/studio-2.jpg',
    guests: '80+ гостей',
    format: 'Тик-Ток вечеринка',
  },
  {
    title: 'Выпускной 9 класса',
    description: 'Большая открытая арендованная территория с беседками и зеленым газоном. Вечеринка в стиле «Уже можно». Одна из главных особенностей: родители и дети соревнуются в различных современных забавах и челленджах.',
    image: '/images/studio/mic.jpg',
    guests: '120+ гостей',
    format: 'Стиль «Уже можно»',
  },
]
</script>

<template>
  <UBaseWrapper aria-labelledby="events-portfolio-title">
    <UBaseTitle
      label="Портфолио"
      title="Некоторые наши мероприятия"
      description="Примеры успешно проведённых праздников"
    />

    <div class="portfolio-grid">
      <article
        v-for="(item, i) in portfolioItems"
        :key="item.title"
        class="portfolio-card"
        :style="{ '--i': i }"
      >
        <div class="portfolio-image-wrapper">
          <NuxtImg
            :src="item.image"
            :alt="item.title"
            class="portfolio-image"
            format="webp"
            loading="lazy"
            width="600"
            height="400"
          />
          <div class="portfolio-overlay" />
          <div class="portfolio-badges">
            <span v-if="item.guests" class="portfolio-badge">{{ item.guests }}</span>
            <span v-if="item.format" class="portfolio-badge">{{ item.format }}</span>
          </div>
        </div>
        <div class="portfolio-content">
          <h3 class="portfolio-title">{{ item.title }}</h3>
          <p class="portfolio-description">{{ item.description }}</p>
        </div>
      </article>
    </div>
  </UBaseWrapper>
</template>

<style scoped>
.portfolio-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

@media (min-width: 768px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
  }
}

@media (min-width: 1024px) {
  .portfolio-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}

.portfolio-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(var(--i, 0) * 120ms);
}

.portfolio-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
  border-color: rgba(236, 72, 153, 0.3);
}

.portfolio-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
}

.portfolio-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.portfolio-card:hover .portfolio-image {
  transform: scale(1.1);
}

.portfolio-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
  transition: opacity 0.3s ease;
}

.portfolio-card:hover .portfolio-overlay {
  opacity: 0.6;
}

.portfolio-badges {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 2;
}

.portfolio-badge {
  display: inline-block;
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  font-family: 'Suisse Intl', sans-serif;
}

@media (min-width: 1024px) {
  .portfolio-badge {
    font-size: 12px;
    padding: 7px 14px;
  }
}

.portfolio-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
}

@media (min-width: 1024px) {
  .portfolio-content {
    padding: 28px;
    gap: 14px;
  }
}

.portfolio-title {
  margin: 0;
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #111;
  font-family: 'Suisse Intl', sans-serif;
  line-height: 1.3;
  transition: color 0.3s ease;
}

@media (min-width: 1024px) {
  .portfolio-title {
    font-size: 23px;
  }
}

.portfolio-card:hover .portfolio-title {
  color: #ec4899;
}

.portfolio-description {
  margin: 0;
  font-size: 15px;
  line-height: 1.65;
  color: #64748b;
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 400;
}

@media (min-width: 1024px) {
  .portfolio-description {
    font-size: 16px;
    line-height: 1.7;
  }
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
  .portfolio-card {
    animation: none;
    opacity: 1;
  }

  .portfolio-card:hover {
    transform: none;
  }

  .portfolio-card:hover .portfolio-image {
    transform: none;
  }
}
</style>
