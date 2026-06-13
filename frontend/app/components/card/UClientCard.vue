<script setup lang="ts">
type Client = {
  name: string
  description: string
  logo: string
}

const props = withDefaults(
  defineProps<{
    client: Client
    index?: number
  }>(),
  { index: 0 }
)
</script>

<template>
  <article
    class="client-card card-entrance"
    :style="{ '--i': props.index }"
  >
    <div class="client-card__media">
      <NuxtImg
        :src="client.logo"
        :alt="`Логотип ${client.name}`"
        loading="lazy"
        format="webp"
        class="client-card__image"
      />
    </div>
    <div class="client-card__body">
      <h3 class="client-card__title">
        {{ client.name }}
      </h3>
      <p class="client-card__description">
        {{ client.description }}
      </p>
    </div>
  </article>
</template>

<style scoped lang="scss">
$md: 768px;
$lg: 1024px;

.client-card {
  position: relative;
  display: inline-block;
  width: 100%;
  padding: 0;
  margin-bottom: 20px;
  overflow: hidden;
  cursor: pointer;
  break-inside: avoid;
  background: rgb(255 255 255 / 90%);
  border: 1px solid rgb(0 0 0 / 6%);
  border-radius: 20px;
  box-shadow:
    0 1px 3px rgb(0 0 0 / 4%),
    0 8px 24px rgb(0 0 0 / 4%);
  transition:
    transform 0.3s ease-in-out,
    border-color 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
  backdrop-filter: blur(10px);

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 3px;
    content: '';
    background: linear-gradient(to right, var(--u-color-pink), var(--u-color-pink-light), var(--u-color-pink));
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    border-color: rgb(236 72 153 / 15%);
    box-shadow:
      0 4px 12px rgb(236 72 153 / 8%),
      0 20px 40px rgb(0 0 0 / 8%);
    transform: translateY(-4px);

    &::before {
      opacity: 1;
    }

    .client-card__image {
      transform: scale(1.05);
    }

    .client-card__title {
      color: var(--u-color-pink-deep);
    }

    .client-card__description {
      color: #334155;
    }
  }

  &__media {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 180px;
    overflow: hidden;
    background: #f8fafc;

    @media (min-width: $md) {
      height: 200px;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    padding: 20px;
    object-fit: contain;
    transition: transform 0.4s;
  }

  &__body {
    padding: 22px;

    @media (min-width: $md) {
      padding: 26px;
    }

    @media (min-width: $lg) {
      padding: 28px;
    }
  }

  &__title {
    margin: 0 0 10px;
    font-size: var(--u-font-17);
    font-weight: 600;
    line-height: 1.35;
    color: #0f172a;
    letter-spacing: -0.025em;
    transition: color 0.15s;

    @media (min-width: $md) {
      margin-bottom: 12px;
      font-size: var(--u-font-18);
    }

    @media (min-width: $lg) {
      font-size: var(--u-font-19);
    }
  }

  &__description {
    margin: 0;
    font-size: var(--u-font-14);
    line-height: 1.65;
    color: #475569;
    letter-spacing: -0.025em;
    -webkit-font-smoothing: antialiased;
    font-feature-settings: 'liga' 1, 'calt' 1;
    transition: color 0.15s;

    @media (min-width: $md) {
      font-size: var(--u-font-15);
      line-height: 1.7;
    }

    @media (min-width: $lg) {
      font-size: var(--u-font-15);
      line-height: 1.7;
    }
  }
}

.card-entrance {
  opacity: 0;
  transform: translateY(24px);
  animation: fadeUp 0.5s ease forwards;
  animation-delay: calc(var(--i, 0) * 60ms);
}

@media (prefers-reduced-motion: reduce) {
  .client-card {
    transform: translateY(0);

    &:hover {
      transform: translateY(0);
    }

    &__image {
      transition: none;
    }
  }

  .card-entrance {
    animation: none;
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
