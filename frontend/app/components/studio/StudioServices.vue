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
.services-menu {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--u-black-a06);
  border-radius: 18px;
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
  background: var(--u-color-white);
  opacity: 0;
  animation: fadeInUp 0.5s var(--u-ease-out) forwards;
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
  background: #fafafa;
}

.menu-item__num {
  font-size: var(--u-font-12);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
  color: var(--u-color-accent);
  opacity: 0.4;
  font-family: 'Suisse Intl', sans-serif;
  padding-top: 2px;
}

@media (min-width: 1024px) {
  .menu-item__num {
    font-size: var(--u-font-13);
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
  font-size: var(--u-font-18);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: #1a1716;
  font-family: 'Suisse Intl', sans-serif;
}

@media (min-width: 768px) {
  .menu-item__title {
    font-size: var(--u-font-20);
  }
}

@media (min-width: 1024px) {
  .menu-item__title {
    font-size: var(--u-font-22);
    letter-spacing: -0.04em;
  }
}

.menu-item__badge {
  display: inline-block;
  padding: 3px 8px;
  font-size: var(--u-font-10);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--u-color-accent);
  background: var(--u-pink-a06);
  border-radius: 6px;
  font-family: 'Suisse Intl', sans-serif;
}

@media (min-width: 1024px) {
  .menu-item__badge {
    font-size: var(--u-font-11);
    padding: 4px 10px;
  }
}

.menu-item__price {
  margin: 0;
  font-size: var(--u-font-17);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
  color: #1a1716;
  font-family: 'Suisse Intl', sans-serif;
  white-space: nowrap;
}

@media (min-width: 1024px) {
  .menu-item__price {
    font-size: var(--u-font-19);
  }
}

.menu-item__desc {
  margin: 0;
  font-size: var(--u-font-15);
  line-height: 1.65;
  color: var(--u-text-muted);
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 400;
  max-width: 56ch;
}

@media (min-width: 1024px) {
  .menu-item__desc {
    font-size: var(--u-font-16);
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
  font-size: var(--u-font-14);
  line-height: 1.45;
  color: rgba(0, 0, 0, 0.7);
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 400;
}

@media (min-width: 1024px) {
  .menu-item__features li {
    font-size: var(--u-font-15);
    gap: 12px;
  }
}

.menu-item__check {
  flex-shrink: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--u-black-a35);
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
  font-size: var(--u-font-18);
  font-weight: 600;
  color: var(--u-text-primary);
  font-family: 'Suisse Intl', sans-serif;
  letter-spacing: -0.02em;
}

@media (min-width: 1024px) {
  .actions__text {
    font-size: var(--u-font-20);
  }
}

.actions__note {
  margin: 0;
  font-size: var(--u-font-15);
  line-height: 1.6;
  color: var(--u-text-muted);
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 400;
  max-width: 480px;
}

@media (min-width: 1024px) {
  .actions__note {
    font-size: var(--u-font-16);
  }
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  border-radius: 14px;
  font-size: var(--u-font-15);
  font-weight: 600;
  letter-spacing: 0.2px;
  color: var(--u-color-white);
  text-decoration: none;
  background: linear-gradient(135deg, var(--u-color-rose), var(--u-color-purple));
  box-shadow: 0 6px 24px var(--u-rose-a22);
  transition:
    transform 0.3s var(--u-ease-out),
    box-shadow 0.3s var(--u-ease-out);
  position: relative;
  overflow: hidden;
  font-family: 'Suisse Intl', sans-serif;
}

@media (min-width: 1024px) {
  .cta {
    padding: 18px 36px;
    font-size: var(--u-font-16);
  }
}

.cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--u-color-purple), var(--u-color-blue));
  opacity: 0;
  transition: opacity 0.35s ease;
}

.cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 40px var(--u-rose-a32);
}

.cta:hover::before {
  opacity: 1;
}

.cta svg {
  transition: transform 0.25s var(--u-ease-out);
}

.cta:hover svg {
  transform: translateX(3px);
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
