<script setup lang="ts">
type Feature = {
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: '⭐',
    title: 'Опыт',
    description: 'более 10 лет организуем праздники любого формата',
  },
  {
    icon: '👥',
    title: 'Масштаб',
    description: 'работаем с группами от 20 до нескольких тысяч человек',
  },
  {
    icon: '🎯',
    title: 'Полный цикл',
    description: 'всё под ключ — от идеи до реализации',
  },
  {
    icon: '✓',
    title: 'Контроль и надежность',
    description: 'согласование на всех этапах, сценарий за 30 дней до мероприятия или раньше',
  },
]

const paragraphs = [
  'Мы знаем, как превратить любое событие в незабываемое впечатление. Наша команда профессионалов возьмёт на себя все заботы по организации и проведению праздника — от разработки концепции до финального фейерверка.',
  'Доверьтесь нашему опыту: мы успешно проводим мероприятия для групп от 20 человек до нескольких тысяч гостей. Гарантируем безупречное качество услуг, индивидуальный подход и внимание к каждой детали.',
]
</script>

<template>
  <UBaseWrapper aria-labelledby="events-about-title">
    <UBaseTitle
      label="О направлении"
      title="Почему стоит доверить праздник нам?"
      description="Профессиональная команда для организации вашего идеального мероприятия"
    />

    <div class="about-content">
      <div class="about-text">
        <p v-for="(paragraph, i) in paragraphs" :key="i" class="about-paragraph">
          {{ paragraph }}
        </p>
      </div>

      <div class="features-grid">
        <div
          v-for="(feature, i) in features"
          :key="feature.title"
          class="feature-card"
          :style="{ '--i': i }"
        >
          <div class="feature-icon">
            {{ feature.icon }}
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </UBaseWrapper>
</template>

<style scoped>
.about-content {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

@media (min-width: 1024px) {
  .about-content {
    gap: 64px;
  }
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.about-paragraph {
  margin: 0;
  font-size: var(--u-font-16);
  line-height: 1.7;
  color: #475569;
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 400;
}

@media (min-width: 1024px) {
  .about-paragraph {
    font-size: var(--u-font-18);
    line-height: 1.75;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 640px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
  }
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px 24px;
  background: linear-gradient(135deg, var(--u-color-white) 0%, #fafafa 100%);
  border: 1px solid var(--u-black-a06);
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s var(--u-ease-standard);
  opacity: 0;
  animation: fadeInUp 0.6s var(--u-ease-out) forwards;
  animation-delay: calc(var(--i, 0) * 100ms);
}

@media (min-width: 1024px) {
  .feature-card {
    padding: 40px 28px;
    gap: 18px;
  }
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px var(--u-black-a08);
  border-color: var(--u-pink-a20);
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  font-size: var(--u-font-32);
  background: linear-gradient(135deg, var(--u-pink-a10), rgba(139, 92, 246, 0.1));
  border-radius: 16px;
  transition: transform 0.3s ease;
}

@media (min-width: 1024px) {
  .feature-icon {
    width: 72px;
    height: 72px;
    font-size: var(--u-font-36);
  }
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.feature-title {
  margin: 0;
  font-size: var(--u-font-18);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #111;
  font-family: 'Suisse Intl', sans-serif;
}

@media (min-width: 1024px) {
  .feature-title {
    font-size: var(--u-font-20);
  }
}

.feature-description {
  margin: 0;
  font-size: var(--u-font-14);
  line-height: 1.6;
  color: var(--u-text-muted);
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 400;
}

@media (min-width: 1024px) {
  .feature-description {
    font-size: var(--u-font-15);
    line-height: 1.65;
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
  .feature-card {
    animation: none;
    opacity: 1;
  }

  .feature-card:hover {
    transform: none;
  }

  .feature-card:hover .feature-icon {
    transform: none;
  }
}
</style>
