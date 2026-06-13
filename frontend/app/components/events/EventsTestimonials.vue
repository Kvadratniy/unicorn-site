<script setup lang="ts">
type Testimonial = {
  name: string
  event: string
  text: string
  avatar: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: 'Анна и Дмитрий',
    event: 'Свадьба на 80 гостей',
    text: 'Организовали свадьбу мечты! Всё чётко, профессионально, без нервов. Гости до сих пор вспоминают ведущего и конкурсы!',
    avatar: '/images/clients/skfu.png',
    rating: 5,
  },
  {
    name: 'Алексей',
    event: 'HR-менеджер компании',
    text: 'Корпоратив удался на славу! Звуковое оборудование было на высоте, а активности сплотили команду.',
    avatar: '/images/clients/onyx.png',
    rating: 5,
  },
  {
    name: 'Мария',
    event: 'День рождения на 50 гостей',
    text: 'Спасибо огромное за организацию юбилея! Диджей создал потрясающую атмосферу, все гости были в восторге. Рекомендую всем!',
    avatar: '/images/clients/cardo.png',
    rating: 5,
  },
  {
    name: 'Сергей',
    event: 'Корпоративный фестиваль',
    text: 'Работали с командой на масштабном мероприятии для 500+ человек. Профессионализм на высшем уровне, всё прошло идеально!',
    avatar: '/images/clients/fazenda.png',
    rating: 5,
  },
]
</script>

<template>
  <UBaseWrapper aria-labelledby="events-testimonials-title">
    <UBaseTitle
      label="Отзывы"
      title="Что говорят наши клиенты"
      description="Реальные отзывы от довольных заказчиков"
    />

    <div class="testimonials-grid">
      <article
        v-for="(testimonial, i) in testimonials"
        :key="testimonial.name"
        class="testimonial-card"
        :style="{ '--i': i }"
      >
        <div class="testimonial-header">
          <div class="testimonial-avatar-wrapper">
            <NuxtImg
              :src="testimonial.avatar"
              :alt="testimonial.name"
              class="testimonial-avatar"
              format="webp"
              loading="lazy"
              width="80"
              height="80"
            />
          </div>
          <div class="testimonial-info">
            <h3 class="testimonial-name">{{ testimonial.name }}</h3>
            <p class="testimonial-event">{{ testimonial.event }}</p>
            <div class="testimonial-rating">
              <span
                v-for="star in testimonial.rating"
                :key="star"
                class="star"
                aria-hidden="true"
              >
                ★
              </span>
            </div>
          </div>
        </div>
        <blockquote class="testimonial-text">
          <span class="quote-mark">"</span>
          {{ testimonial.text }}
          <span class="quote-mark">"</span>
        </blockquote>
      </article>
    </div>
  </UBaseWrapper>
</template>

<style scoped>
.testimonials-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
  }
}

@media (min-width: 1024px) {
  .testimonials-grid {
    gap: 32px;
  }
}

.testimonial-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 28px;
  background: linear-gradient(135deg, var(--u-color-white) 0%, #fafafa 100%);
  border: 1px solid var(--u-black-a06);
  border-radius: 24px;
  transition: all 0.3s var(--u-ease-standard);
  opacity: 0;
  animation: fadeInUp 0.6s var(--u-ease-out) forwards;
  animation-delay: calc(var(--i, 0) * 100ms);
}

@media (min-width: 1024px) {
  .testimonial-card {
    padding: 36px 32px;
    gap: 24px;
  }
}

.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px var(--u-black-a10);
  border-color: var(--u-pink-a20);
}

.testimonial-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

@media (min-width: 1024px) {
  .testimonial-header {
    gap: 20px;
  }
}

.testimonial-avatar-wrapper {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  border: 3px solid var(--u-pink-a20);
  transition: all 0.3s ease;
}

@media (min-width: 1024px) {
  .testimonial-avatar-wrapper {
    width: 72px;
    height: 72px;
  }
}

.testimonial-card:hover .testimonial-avatar-wrapper {
  border-color: var(--u-pink-a40);
  transform: scale(1.05);
}

.testimonial-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonial-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.testimonial-name {
  margin: 0;
  font-size: var(--u-font-18);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #111;
  font-family: 'Suisse Intl', sans-serif;
  line-height: 1.3;
}

@media (min-width: 1024px) {
  .testimonial-name {
    font-size: var(--u-font-19);
  }
}

.testimonial-event {
  margin: 0;
  font-size: var(--u-font-14);
  line-height: 1.4;
  color: var(--u-text-muted);
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 500;
}

@media (min-width: 1024px) {
  .testimonial-event {
    font-size: var(--u-font-15);
  }
}

.testimonial-rating {
  display: flex;
  gap: 2px;
  margin-top: 2px;
}

.star {
  font-size: var(--u-font-14);
  color: #fbbf24;
  line-height: 1;
}

@media (min-width: 1024px) {
  .star {
    font-size: var(--u-font-16);
  }
}

.testimonial-text {
  margin: 0;
  font-size: var(--u-font-15);
  line-height: 1.7;
  color: #475569;
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 400;
  font-style: italic;
  position: relative;
  padding: 0 8px;
}

@media (min-width: 1024px) {
  .testimonial-text {
    font-size: var(--u-font-16);
    line-height: 1.75;
  }
}

.quote-mark {
  font-size: var(--u-font-28);
  line-height: 0;
  color: var(--u-pink-a30);
  font-weight: 700;
  font-style: normal;
  vertical-align: middle;
}

@media (min-width: 1024px) {
  .quote-mark {
    font-size: var(--u-font-32);
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
  .testimonial-card {
    animation: none;
    opacity: 1;
  }

  .testimonial-card:hover {
    transform: none;
  }

  .testimonial-card:hover .testimonial-avatar-wrapper {
    transform: none;
  }
}
</style>
