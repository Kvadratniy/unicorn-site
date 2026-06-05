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
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
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
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
  border-color: rgba(236, 72, 153, 0.2);
}

.service-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  font-size: 32px;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.08), rgba(139, 92, 246, 0.08));
  border-radius: 16px;
  transition: all 0.3s ease;
}

@media (min-width: 1024px) {
  .service-icon {
    width: 72px;
    height: 72px;
    font-size: 36px;
  }
}

.service-card:hover .service-icon {
  transform: scale(1.1) rotate(-5deg);
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.15));
}

.service-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.service-title {
  margin: 0;
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #111;
  font-family: 'Suisse Intl', sans-serif;
  line-height: 1.3;
}

@media (min-width: 1024px) {
  .service-title {
    font-size: 21px;
  }
}

.service-description {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #64748b;
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 400;
}

@media (min-width: 1024px) {
  .service-description {
    font-size: 16px;
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
  border: 1px solid rgba(0, 0, 0, 0.04);
}

@media (min-width: 1024px) {
  .services-cta {
    padding: 48px 32px;
    gap: 28px;
  }
}

.services-cta-text {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1d1d1f;
  font-family: 'Suisse Intl', sans-serif;
  letter-spacing: -0.02em;
}

@media (min-width: 1024px) {
  .services-cta-text {
    font-size: 22px;
  }
}

.services-cta-note {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #64748b;
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 400;
  max-width: 480px;
}

@media (min-width: 1024px) {
  .services-cta-note {
    font-size: 16px;
  }
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 36px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: #fff;
  text-decoration: none;
  background: linear-gradient(135deg, #fb7185, #8b5cf6);
  box-shadow: 0 8px 32px rgba(251, 113, 133, 0.22);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  font-family: 'Suisse Intl', sans-serif;
  border: none;
  cursor: pointer;
}

@media (min-width: 1024px) {
  .cta-button {
    padding: 20px 40px;
    font-size: 16px;
  }
}

.cta-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.cta-button:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 20px 50px rgba(251, 113, 133, 0.32);
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
