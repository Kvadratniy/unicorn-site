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
    <img
      :src="option.imageSrc"
      :alt="option.imageAlt"
      class="rent-card__image"
      loading="lazy"
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
  border: 1px solid rgb(236 72 153 / 0.2);
  border-radius: 24px;
  box-shadow:
    0 1px 2px rgb(15 23 42 / 0.04),
    0 12px 30px rgb(236 72 153 / 0.08);
  font-family: 'Montserrat';
  opacity: 0;
  transform: translateY(14px);
  animation: cardIn 0.55s ease forwards;
  animation-delay: var(--card-delay);
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease;
  overflow: hidden;

  &:hover {
    border-color: rgb(236 72 153 / 0.32);
    box-shadow:
      0 2px 6px rgb(15 23 42 / 0.07),
      0 16px 34px rgb(236 72 153 / 0.12);
    transform: translateY(-4px);
  }

  &__tag {
    width: fit-content;
    margin: 0;
    padding: 7px 11px;
    border-radius: 999px;
    background: rgb(236 72 153 / 0.1);
    color: #9d174d;
    font-family: 'Montserrat';
    font-size: 12px;
    font-weight: 600;
    line-height: 1.2;
  }

  &__image {
    width: calc(100% - 20px);
    margin: 10px auto 0;
    height: clamp(180px, 20vw, 235px);
    object-fit: cover;
    object-position: center;
    border-radius: 18px;
  }

  &__body {
    display: grid;
    gap: 14px;
    padding: 18px 24px 22px;
  }

  &__top {
    display: grid;
    gap: 10px;
  }

  &__title {
    margin: 0;
    color: #3f2535;
    font-family: 'Montserrat';
    font-size: 21px;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -0.01em;
  }

  &__subtitle {
    margin: 0;
    color: #7a425f;
    font-family: 'Montserrat';
    font-size: 15px;
    font-weight: 500;
    line-height: 1.45;
  }

  &__description {
    margin: 0;
    padding: 12px 14px;
    border-radius: 12px;
    background: rgb(252 231 243 / 0.58);
    color: #5f3b50;
    font-family: 'Montserrat';
    font-size: 14px;
    font-weight: 500;
    line-height: 1.6;
  }

  &__divider {
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgb(244 114 182 / 0.28) 15%,
      rgb(244 114 182 / 0.28) 85%,
      transparent 100%
    );
  }

  &__benefits-title {
    margin: 0;
    color: #8b3d66;
    font-family: 'Montserrat';
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.04em;
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
    padding-left: 18px;
    color: #5b4352;
    font-family: 'Montserrat';
    font-size: 14px;
    font-weight: 500;
    line-height: 1.45;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: radial-gradient(circle at center, #ec4899 45%, #fbcfe8 46%);
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
