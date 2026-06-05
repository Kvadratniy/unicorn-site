<script setup lang="ts">
type WorkflowStep = {
  number: number
  title: string
  description: string
  icon: string
}

const steps: WorkflowStep[] = [
  {
    number: 1,
    title: 'Онлайн бриф',
    description: 'Пройдите наш короткий опрос в телеграмме. У нас будет базовое представление о вашем торжестве.',
    icon: '📱',
  },
  {
    number: 2,
    title: 'Личная консультация',
    description: 'Обсуждаем ваши пожелания, бюджет и формат мероприятия на личной встрече.',
    icon: '💬',
  },
  {
    number: 3,
    title: 'Подбор команды и оборудования',
    description: 'Формируем необходимую команду и техническую смету.',
    icon: '🎯',
  },
  {
    number: 4,
    title: 'Согласование и договор',
    description: 'Фиксируем детали и заключаем договор.',
    icon: '📋',
  },
  {
    number: 5,
    title: 'Разработка концепции',
    description: 'Создаём уникальный сценарий и подбираем активности. Сценарий полностью согласуется с вами заранее.',
    icon: '✨',
  },
  {
    number: 6,
    title: 'Проведение мероприятия',
    description: 'В день праздника мы приезжаем на локацию минимум за 2 часа до начала. На большие мероприятия возможен запрос доступа за 8-10 часов.',
    icon: '🎉',
  },
  {
    number: 7,
    title: 'Обратная связь',
    description: 'Получаем ваш отзыв и вносим улучшения для будущих проектов.',
    icon: '⭐',
  },
]
</script>

<template>
  <UBaseWrapper aria-labelledby="events-workflow-title">
    <UBaseTitle
      label="Процесс"
      title="Как мы работаем"
      description="Этапы организации праздника от первого контакта до успешного завершения"
    />

    <div class="workflow-container">
      <div class="workflow-timeline">
        <div
          v-for="(step, i) in steps"
          :key="step.number"
          class="workflow-step"
          :style="{ '--i': i }"
        >
          <div class="step-connector" v-if="i < steps.length - 1" />
          
          <div class="step-number-wrapper">
            <div class="step-number">
              <span>{{ String(step.number).padStart(2, '0') }}</span>
            </div>
          </div>

          <div class="step-content">
            <div class="step-icon">
              {{ step.icon }}
            </div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </UBaseWrapper>
</template>

<style scoped>
.workflow-container {
  max-width: 900px;
  margin: 0 auto;
}

.workflow-timeline {
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;
}

@media (min-width: 1024px) {
  .workflow-timeline {
    gap: 40px;
  }
}

.workflow-step {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px;
  position: relative;
  opacity: 0;
  animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(var(--i, 0) * 100ms);
}

@media (min-width: 768px) {
  .workflow-step {
    gap: 32px;
  }
}

@media (min-width: 1024px) {
  .workflow-step {
    gap: 40px;
  }
}

.step-connector {
  position: absolute;
  left: 23px;
  top: 56px;
  bottom: -32px;
  width: 2px;
  background: linear-gradient(
    180deg,
    rgba(236, 72, 153, 0.3) 0%,
    rgba(139, 92, 246, 0.3) 100%
  );
}

@media (min-width: 1024px) {
  .step-connector {
    left: 27px;
    top: 64px;
    bottom: -40px;
  }
}

.step-number-wrapper {
  display: flex;
  align-items: flex-start;
  padding-top: 8px;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  border-radius: 50%;
  box-shadow: 0 8px 24px rgba(236, 72, 153, 0.25);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

@media (min-width: 1024px) {
  .step-number {
    width: 56px;
    height: 56px;
  }
}

.step-number span {
  font-size: 18px;
  font-weight: 800;
  color: #fff;
  font-family: 'Suisse Intl', sans-serif;
  font-variant-numeric: tabular-nums;
}

@media (min-width: 1024px) {
  .step-number span {
    font-size: 20px;
  }
}

.workflow-step:hover .step-number {
  transform: scale(1.1);
  box-shadow: 0 12px 32px rgba(236, 72, 153, 0.35);
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (min-width: 1024px) {
  .step-content {
    padding: 28px 32px;
    gap: 14px;
  }
}

.workflow-step:hover .step-content {
  background: #fafafa;
  border-color: rgba(236, 72, 153, 0.2);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.step-icon {
  font-size: 32px;
  line-height: 1;
  margin-bottom: 4px;
}

@media (min-width: 1024px) {
  .step-icon {
    font-size: 36px;
  }
}

.step-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #111;
  font-family: 'Suisse Intl', sans-serif;
  line-height: 1.3;
}

@media (min-width: 1024px) {
  .step-title {
    font-size: 22px;
  }
}

.step-description {
  margin: 0;
  font-size: 15px;
  line-height: 1.65;
  color: #64748b;
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 400;
}

@media (min-width: 1024px) {
  .step-description {
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
  .workflow-step {
    animation: none;
    opacity: 1;
  }

  .workflow-step:hover .step-number {
    transform: none;
  }

  .workflow-step:hover .step-content {
    box-shadow: none;
  }
}
</style>
