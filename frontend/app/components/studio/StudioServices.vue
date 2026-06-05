<script setup lang="ts">
import type { StudioServicesViewModel } from '~/composables/pages/useStudio'

const props = defineProps<{
  services: StudioServicesViewModel
}>()

const { open: openContactModal } = useContactModal()
</script>

<template>
  <div>
    <UBaseTitle label="Услуги" :title="props.services.title" :description="props.services.subtitle" />

    <div class="services-menu">
      <article v-for="(service, i) in props.services.items" :key="service.title" class="menu-item"
        :style="{ '--i': i }">
        <span class="menu-item__num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
        <div class="menu-item__content">
          <header class="menu-item__header">
            <div class="menu-item__title-row">
              <h3 class="menu-item__title">{{ service.title }}</h3>
              <span v-if="service.badge" class="menu-item__badge">{{ service.badge }}</span>
            </div>
            <p class="menu-item__price">{{ service.priceFrom }}</p>
          </header>
          <p class="menu-item__desc">{{ service.description }}</p>
          <ul class="menu-item__features" role="list">
            <li v-for="feature in service.features" :key="feature">
              <span class="menu-item__check" aria-hidden="true" />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
      </article>
    </div>

    <div class="actions">
      <div class="actions__content">
        <p class="actions__text">Не уверены, что выбрать?</p>
        <button type="button" class="cta" @click="openContactModal">
          <span>Получить консультацию</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
        <p class="actions__note">Бесплатная консультация по вашему проекту и точный расчёт стоимости</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section {
  padding: 40px 0 50px;
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 50%, #de71a80f 100%);
  position: relative;
}

@media (min-width: 1024px) {
  .section {
    padding: 50px 0 70px;
  }
}

.wrap {
  max-width: 980px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (min-width: 1024px) {
  .wrap {
    padding: 0 40px;
  }
}

.head {
  margin-bottom: 64px;
  text-align: center;
}

@media (min-width: 1024px) {
  .head {
    margin-bottom: 80px;
  }
}

.head__label {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: #94a3b8;
  font-family: 'Suisse Intl', sans-serif;
}

@media (min-width: 1024px) {
  .head__label {
    font-size: 13px;
    margin-bottom: 16px;
  }
}

.title {
  margin: 0 0 20px;
  font-size: clamp(2.75rem, 5vw, 4rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: #1d1d1f;
  font-family: 'Suisse Intl', sans-serif;
}

@media (min-width: 1024px) {
  .title {
    margin-bottom: 28px;
  }
}

.subtitle {
  margin: 0 auto;
  max-width: 640px;
  font-size: 17px;
  line-height: 1.65;
  color: #64748b;
  font-weight: 400;
  font-family: 'Suisse Intl', sans-serif;
}

@media (min-width: 1024px) {
  .subtitle {
    font-size: 19px;
    line-height: 1.7;
  }
}

.services-menu {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .services-menu {
    border-radius: 20px;
  }
}

.menu-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px 32px;
  align-items: start;
  padding: 32px 24px;
  background: #fff;
  opacity: 0;
  animation: fadeInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(var(--i, 0) * 50ms);
  transition: background 0.25s ease;
  cursor: default;
}

@media (min-width: 768px) {
  .menu-item {
    padding: 40px 40px;
    gap: 28px 48px;
  }
}

@media (min-width: 1024px) {
  .menu-item {
    padding: 44px 56px;
    gap: 32px 56px;
  }
}

.menu-item:hover {
  background: #fcfcfc;
}

.menu-item__num {
  font-size: 13px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
  color: rgba(0, 0, 0, 0.25);
  font-family: 'Suisse Intl', sans-serif;
  padding-top: 2px;
}

@media (min-width: 1024px) {
  .menu-item__num {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.3);
  }
}

.menu-item__content {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (min-width: 1024px) {
  .menu-item__content {
    gap: 14px;
  }
}

.menu-item__header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px 24px;
}

.menu-item__title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.menu-item__title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: #111;
  font-family: 'Suisse Intl', sans-serif;
}

@media (min-width: 768px) {
  .menu-item__title {
    font-size: 20px;
  }
}

@media (min-width: 1024px) {
  .menu-item__title {
    font-size: 22px;
    letter-spacing: -0.04em;
  }
}

.menu-item__badge {
  display: inline-block;
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  font-family: 'Suisse Intl', sans-serif;
}

@media (min-width: 1024px) {
  .menu-item__badge {
    font-size: 11px;
    padding: 4px 10px;
  }
}

.menu-item__price {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
  color: #111;
  font-family: 'Suisse Intl', sans-serif;
  white-space: nowrap;
}

@media (min-width: 1024px) {
  .menu-item__price {
    font-size: 19px;
  }
}

.menu-item__desc {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.55);
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 400;
  max-width: 56ch;
}

@media (min-width: 1024px) {
  .menu-item__desc {
    font-size: 16px;
    line-height: 1.65;
  }
}

.menu-item__features {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

@media (min-width: 1024px) {
  .menu-item__features {
    gap: 8px;
  }
}

.menu-item__features li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  line-height: 1.45;
  color: rgba(0, 0, 0, 0.7);
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 400;
}

@media (min-width: 1024px) {
  .menu-item__features li {
    font-size: 15px;
    gap: 12px;
  }
}

.menu-item__check {
  flex-shrink: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.35);
}

.actions {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 1024px) {
  .actions {
    margin-top: 36px;
  }
}

.actions__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}

@media (min-width: 1024px) {
  .actions__content {
    gap: 24px;
  }
}

.actions__text {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1d1d1f;
  font-family: 'Suisse Intl', sans-serif;
  letter-spacing: -0.02em;
}

@media (min-width: 1024px) {
  .actions__text {
    font-size: 20px;
  }
}

.actions__note {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #64748b;
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 400;
  max-width: 480px;
}

@media (min-width: 1024px) {
  .actions__note {
    font-size: 16px;
  }
}

.cta {
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
}

@media (min-width: 1024px) {
  .cta {
    padding: 20px 40px;
    font-size: 16px;
  }
}

.cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.cta:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 20px 50px rgba(251, 113, 133, 0.32);
}

.cta:hover::before {
  opacity: 1;
}

.cta svg {
  transition: transform 0.3s ease;
}

.cta:hover svg {
  transform: translateX(4px);
}

.cta span,
.cta svg {
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
  .menu-item {
    animation: none;
    opacity: 1;
  }

  .cta:hover {
    transform: none;
  }
}
</style>
