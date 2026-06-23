<script setup lang="ts">
import type { RentOptionViewModel } from '~/composables/pages/useRent'

const { option, index = 0 } = defineProps<{
  option: RentOptionViewModel
  index?: number
}>()
</script>

<template>
  <article
    class="rent-card"
    :style="{ '--card-delay': `${index * 0.08}s` }"
  >
    <NuxtImg
      :src="option.imageSrc"
      :alt="option.imageAlt"
      class="rent-card__image"
      width="600"
      height="400"
      loading="lazy"
      decoding="async"
      sizes="xs:100vw lg:50vw"
      format="webp"
    />
    <div class="rent-card__body">
      <div class="rent-card__top">
        <p class="rent-card__tag">{{ option.tag }}</p>
        <h3 class="rent-card__title">{{ option.title }}</h3>
        <p class="rent-card__subtitle">{{ option.subtitle }}</p>
      </div>

      <p class="rent-card__description">{{ option.description }}</p>

      <div class="rent-card__divider"></div>

      <p class="rent-card__benefits-title">Что входит</p>
      <ul class="rent-card__list">
        <li v-for="feature in option.features" :key="feature" class="rent-card__item">
          {{ feature }}
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped lang="scss">
.rent-card {
  --card-delay: 0s;
  display: grid;
  gap: 0;
  padding: 0;
  border-radius: 20px;
  border: 1px solid var(--u-black-a06);
  box-shadow: 0 1px 3px var(--u-black-a04);
  font-family: var(--u-font-montserrat);
  opacity: 0;
  transform: translateY(14px);
  animation: cardIn 0.55s ease forwards;
  animation-delay: var(--card-delay);
  transition:
    transform 0.3s var(--u-ease-out),
    box-shadow 0.3s ease,
    border-color 0.3s ease;
  overflow: hidden;

  &:hover {
    border-color: var(--u-pink-a15);
    box-shadow: 0 12px 32px var(--u-black-a08);
    transform: translateY(-3px);
  }

  &__tag {
    width: fit-content;
    margin: 0;
    padding: 5px 10px;
    border-radius: 8px;
    background: var(--u-pink-a06);
    color: var(--u-color-accent);
    font-family: var(--u-font-montserrat);
    font-size: var(--u-font-11);
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: 0.02em;
  }

  &__image {
    width: calc(100% - 20px);
    margin: 10px auto 0;
    height: clamp(180px, 20vw, 235px);
    object-fit: cover;
    object-position: center;
    border-radius: 16px;
  }

  &__body {
    display: grid;
    gap: 14px;
    padding: 18px 24px 24px;
  }

  &__top {
    display: grid;
    gap: 10px;
  }

  &__title {
    margin: 0;
    color: #1a1716;
    font-family: var(--u-font-montserrat);
    font-size: var(--u-font-21);
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -0.015em;
  }

  &__subtitle {
    margin: 0;
    color: var(--u-color-accent);
    font-family: var(--u-font-montserrat);
    font-size: var(--u-font-14);
    font-weight: 600;
    line-height: 1.45;
  }

  &__description {
    margin: 0;
    padding: 12px 14px;
    border-radius: 12px;
    background: var(--u-pink-a06);
    color: var(--u-text-body);
    font-family: var(--u-font-montserrat);
    font-size: var(--u-font-14);
    font-weight: 500;
    line-height: 1.6;
  }

  &__divider {
    height: 1px;
    background: var(--u-black-a06);
  }

  &__benefits-title {
    margin: 0;
    color: var(--u-color-accent);
    opacity: 0.65;
    font-family: var(--u-font-montserrat);
    font-size: var(--u-font-11);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  &__list {
    margin: 0 0 6px;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 10px;
  }

  &__item {
    position: relative;
    margin: 0;
    padding-left: 16px;
    color: var(--u-text-body);
    font-family: var(--u-font-montserrat);
    font-size: var(--u-font-14);
    font-weight: 500;
    line-height: 1.5;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 7px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--u-color-accent);
      opacity: 0.4;
    }
  }
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .rent-card {
    animation: none;
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
