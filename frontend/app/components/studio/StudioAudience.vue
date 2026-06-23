<script setup lang="ts">
import type { StudioAudienceViewModel } from '~/composables/pages/useStudio'

const props = defineProps<{
  audience: StudioAudienceViewModel
}>()

const { open: openContactModal } = useContactModal()
</script>

<template>
  <UBaseWrapper aria-labelledby="studio-audience-title">
    <UBaseTitle
        label="Для кого"
        :title="props.audience.title"
        :description="props.audience.subtitle"
      />

      <div class="items">
        <div
          v-for="(item, i) in props.audience.items"
          :key="item.title"
          class="item"
          :style="{ '--i': i }"
        >
          <div class="item__number" aria-hidden="true">
            {{ String(i + 1).padStart(2, '0') }}
          </div>

          <div class="item__content">
            <h3 class="item__title">{{ item.title }}</h3>
            <p class="item__text">{{ item.subtitle }}</p>
          </div>

          <div class="item__line" aria-hidden="true"></div>
        </div>
      </div>

      <div class="actions">
        <button type="button" class="cta" @click="openContactModal">
          <span>Обсудить проект</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4 9h10M10 5l4 4-4 4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
  </UBaseWrapper>
</template>

<style scoped>
.items {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 56px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 1024px) {
  .items {
    margin-bottom: 72px;
  }
}

/* Item - horizontal layout */
.item {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 32px;
  align-items: flex-start;
  padding: 36px 0;
  position: relative;
  opacity: 0;
  animation: fadeIn 0.8s ease forwards;
  animation-delay: calc(0.4s + var(--i, 0) * 0.15s);
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .item {
    grid-template-columns: 100px 1fr;
    gap: 48px;
    padding: 44px 0;
  }
}

@media (min-width: 1024px) {
  .item {
    grid-template-columns: 120px 1fr;
    gap: 56px;
    padding: 52px 0;
  }
}

.item:hover {
  transform: translateX(3px);
}

/* Number indicator */
.item__number {
  font-size: var(--u-font-56);
  font-weight: 700;
  line-height: 1;
  color: var(--u-color-accent);
  opacity: 0.12;
  transition: opacity 0.3s ease;
  user-select: none;
}

@media (min-width: 768px) {
  .item__number {
    font-size: var(--u-font-72);
  }
}

@media (min-width: 1024px) {
  .item__number {
    font-size: var(--u-font-88);
  }
}

.item:hover .item__number {
  opacity: 0.25;
}

/* Content */
.item__content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 4px;
}

@media (min-width: 768px) {
  .item__content {
    gap: 14px;
    padding-top: 6px;
  }
}

@media (min-width: 1024px) {
  .item__content {
    gap: 16px;
    padding-top: 8px;
  }
}

/* Title */
.item__title {
  margin: 0;
  font-size: var(--u-font-20);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--u-text-primary);
  transition: color 0.3s ease;
}

@media (min-width: 768px) {
  .item__title {
    font-size: var(--u-font-22);
  }
}

@media (min-width: 1024px) {
  .item__title {
    font-size: var(--u-font-24);
  }
}

.item:hover .item__title {
  color: var(--u-color-accent);
}

/* Text */
.item__text {
  margin: 0;
  font-size: var(--u-font-16);
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.01em;
  color: var(--u-text-muted);
  max-width: 720px;
}

@media (min-width: 768px) {
  .item__text {
    font-size: var(--u-font-17);
    line-height: 1.65;
  }
}

@media (min-width: 1024px) {
  .item__text {
    font-size: var(--u-font-18);
    line-height: 1.7;
    letter-spacing: -0.015em;
  }
}

/* Decorative line */
.item__line {
  position: absolute;
  bottom: 0;
  left: 80px;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--u-color-accent) 0%, var(--u-pink-a30) 30%, transparent 100%);
  opacity: 0.12;
  transition: opacity 0.3s ease;
}

@media (min-width: 768px) {
  .item__line {
    left: 100px;
  }
}

@media (min-width: 1024px) {
  .item__line {
    left: 120px;
  }
}

.item:hover .item__line {
  opacity: 0.35;
}

.item:last-child .item__line {
  display: none;
}

/* CTA section */
.actions {
  text-align: center;
  opacity: 0;
  animation: fadeIn 0.8s ease 0.9s forwards;
  padding-bottom: 40px;
}

/* Button */
.cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 28px;
  padding: 14px 28px;
  border-radius: 14px;
  font-size: var(--u-font-16);
  font-weight: 600;
  line-height: 1.17;
  letter-spacing: -0.01em;
  color: var(--u-color-white);
  text-decoration: none;
  background: #1a1716;
  transition:
    transform 0.25s var(--u-ease-out),
    background-color 0.25s ease;
}

@media (min-width: 768px) {
  .cta {
    padding: 15px 32px;
    font-size: var(--u-font-17);
  }
}

@media (min-width: 1024px) {
  .cta {
    padding: 16px 36px;
    font-size: var(--u-font-18);
  }
}

.cta:hover {
  transform: translateY(-2px);
  background: #2a2523;
}

.cta:active {
  transform: translateY(0);
}

.cta svg {
  width: 18px;
  height: 18px;
  transition: transform 0.25s var(--u-ease-out);
}

@media (min-width: 1024px) {
  .cta svg {
    width: 20px;
    height: 20px;
  }
}

.cta:hover svg {
  transform: translateX(3px);
}

/* Animations */
@keyframes fadeIn {
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
  .item,
  .actions {
    animation: none;
    opacity: 1;
    transform: none;
  }
  
  .item:hover {
    transform: none;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
