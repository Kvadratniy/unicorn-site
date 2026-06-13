<script setup lang="ts">
const { open: openContactModal } = useContactModal()

type Service = {
  title: string
  description: string
  icon: string
}

const services: Service[] = [
  {
    title: 'Профессиональный диджей',
    description: 'Подберём музыку под настроение вашего праздника и создадим идеальную атмосферу.',
    icon: '🎧',
  },
  {
    title: 'Опытный ведущий',
    description: 'Харизматичный ведущий сделает праздник живым, весёлым и запоминающимся.',
    icon: '🎤',
  },
  {
    title: 'Звуковое оборудование',
    description: 'Поставим мощную и чистую акустику для любого помещения или открытой площадки.',
    icon: '🔊',
  },
  {
    title: 'Проработка сценария',
    description: 'Создадим уникальный сценарий с учётом ваших пожеланий и особенностей мероприятия.',
    icon: '📝',
  },
  {
    title: 'Развлечения и активности',
    description: 'Организуем современные конкурсы, интерактивы и игры для гостей всех возрастов.',
    icon: '🎮',
  },
  {
    title: 'Реквизит для развлечений',
    description: 'Предоставим всё необходимое — от микрофонов до реквизита для квестов и шоу-программ.',
    icon: '🎭',
  },
  {
    title: 'Координация в день мероприятия',
    description: 'Наш менеджер будет на связи и решит любые вопросы на месте.',
    icon: '📱',
  },
]
</script>

<template>
  <UBaseWrapper id="services" aria-labelledby="events-services-title">
    <UBaseTitle
      label="Услуги"
      title="Что мы предлагаем?"
      description="Полный спектр услуг для организации незабываемого праздника"
    />

    <div class="services-grid">
      <article
        v-for="(service, i) in services"
        :key="service.title"
        class="service-card"
        :style="{ '--i': i }"
      >
        <div class="service-icon">
          {{ service.icon }}
        </div>
        <div class="service-content">
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-description">{{ service.description }}</p>
        </div>
      </article>
    </div>

    <div class="services-cta">
      <p class="services-cta-text">Не знаете, что выбрать?</p>
      <button type="button" class="cta-button" @click="openContactModal">
        <span>Получить консультацию</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M5 10h10M11 6l4 4-4 4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <p class="services-cta-note">Бесплатная консультация и точный расчёт стоимости</p>
    </div>
  </UBaseWrapper>
</template>

<style scoped>
.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 48px;
}

@media (min-width: 640px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    margin-bottom: 64px;
  }
}

.service-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 28px;
  background: var(--u-color-white);
  border: 1px solid var(--u-black-a06);
  border-radius: 20px;
  transition: all 0.3s var(--u-ease-standard);
  opacity: 0;
  animation: fadeInUp 0.6s var(--u-ease-out) forwards;
  animation-delay: calc(var(--i, 0) * 80ms);
}

@media (min-width: 1024px) {
  .service-card {
    padding: 36px 32px;
    gap: 22px;
  }
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px var(--u-black-a10);
  border-color: var(--u-pink-a20);
}

.service-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  font-size: var(--u-font-32);
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.08), var(--u-purple-a08));
  border-radius: 16px;
  transition: all 0.3s ease;
}

@media (min-width: 1024px) {
  .service-icon {
    width: 72px;
    height: 72px;
    font-size: var(--u-font-36);
  }
}

.service-card:hover .service-icon {
  transform: scale(1.1) rotate(-5deg);
  background: linear-gradient(135deg, var(--u-pink-a15), var(--u-purple-a15));
}

.service-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.service-title {
  margin: 0;
  font-size: var(--u-font-19);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #111;
  font-family: 'Suisse Intl', sans-serif;
  line-height: 1.3;
}

@media (min-width: 1024px) {
  .service-title {
    font-size: var(--u-font-21);
  }
}

.service-description {
  margin: 0;
  font-size: var(--u-font-15);
  line-height: 1.6;
  color: var(--u-text-muted);
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 400;
}

@media (min-width: 1024px) {
  .service-description {
    font-size: var(--u-font-16);
    line-height: 1.65;
  }
}

.services-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
  padding: 40px 24px;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  border-radius: 24px;
  border: 1px solid var(--u-black-a04);
}

@media (min-width: 1024px) {
  .services-cta {
    padding: 48px 32px;
    gap: 28px;
  }
}

.services-cta-text {
  margin: 0;
  font-size: var(--u-font-20);
  font-weight: 600;
  color: var(--u-text-primary);
  font-family: 'Suisse Intl', sans-serif;
  letter-spacing: -0.02em;
}

@media (min-width: 1024px) {
  .services-cta-text {
    font-size: var(--u-font-22);
  }
}

.services-cta-note {
  margin: 0;
  font-size: var(--u-font-15);
  line-height: 1.6;
  color: var(--u-text-muted);
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 400;
  max-width: 480px;
}

@media (min-width: 1024px) {
  .services-cta-note {
    font-size: var(--u-font-16);
  }
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 36px;
  border-radius: 14px;
  font-size: var(--u-font-15);
  font-weight: 700;
  letter-spacing: 0.3px;
  color: var(--u-color-white);
  text-decoration: none;
  background: linear-gradient(135deg, var(--u-color-rose), var(--u-color-purple));
  box-shadow: 0 8px 32px var(--u-rose-a22);
  transition: all 0.4s var(--u-ease-standard);
  position: relative;
  overflow: hidden;
  font-family: 'Suisse Intl', sans-serif;
  border: none;
  cursor: pointer;
}

@media (min-width: 1024px) {
  .cta-button {
    padding: 20px 40px;
    font-size: var(--u-font-16);
  }
}

.cta-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--u-color-purple), var(--u-color-blue));
  opacity: 0;
  transition: opacity 0.4s ease;
}

.cta-button:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 20px 50px var(--u-rose-a32);
}

.cta-button:hover::before {
  opacity: 1;
}

.cta-button svg {
  transition: transform 0.3s ease;
}

.cta-button:hover svg {
  transform: translateX(4px);
}

.cta-button span,
.cta-button svg {
  position: relative;
  z-index: 1;
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
  .service-card {
    animation: none;
    opacity: 1;
  }

  .service-card:hover {
    transform: none;
  }

  .service-card:hover .service-icon {
    transform: none;
  }

  .cta-button:hover {
    transform: none;
  }
}
</style>
