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
  margin-bottom: 1.25rem;
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
    background: linear-gradient(to right, #ec4899, #f472b6, #ec4899);
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    border-color: rgb(236 72 153 / 15%);
    box-shadow:
      0 4px 12px rgb(236 72 153 / 8%),
      0 20px 40px rgb(0 0 0 / 8%);
    transform: translateY(-0.25rem);

    &::before {
      opacity: 1;
    }

    .client-card__image {
      transform: scale(1.05);
    }

    .client-card__title {
      color: #be185d;
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
    padding: 1.25rem;
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
    margin: 0 0 0.625rem;
    font-size: 17px;
    font-weight: 600;
    line-height: 1.35;
    color: #0f172a;
    letter-spacing: -0.025em;
    transition: color 0.15s;

    @media (min-width: $md) {
      margin-bottom: 0.75rem;
      font-size: 18px;
    }

    @media (min-width: $lg) {
      font-size: 19px;
    }
  }

  &__description {
    margin: 0;
    font-size: 14px;
    line-height: 1.65;
    color: #475569;
    letter-spacing: -0.025em;
    -webkit-font-smoothing: antialiased;
    font-feature-settings: 'liga' 1, 'calt' 1;
    transition: color 0.15s;

    @media (min-width: $md) {
      font-size: 14.5px;
      line-height: 1.7;
    }

    @media (min-width: $lg) {
      font-size: 15px;
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
