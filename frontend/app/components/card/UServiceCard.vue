<script setup lang="ts">
type Props = {
  title: string
  subtitle: string
  description: string
  bullets: string[]
  priceFrom: string
  isNew?: boolean
  ctaText?: string
  ctaLink?: string
  /** Если true, кнопка открывает модальное окно «Свяжитесь с нами» вместо перехода по ctaLink */
  ctaOpensModal?: boolean
}

const {
  title,
  subtitle,
  description,
  bullets,
  priceFrom,
  isNew = false,
  ctaText = 'Узнать подробнее',
  ctaLink = '/contacts',
  ctaOpensModal = true,
} = defineProps<Props>()

const { open: openContactModal } = useContactModal()
const NuxtLinkComponent = resolveComponent('NuxtLink')

const ctaAttrs = computed(() =>
  ctaOpensModal
    ? { type: 'button' as const }
    : { to: ctaLink },
)

const ctaComponent = computed(() => (ctaOpensModal ? 'button' : NuxtLinkComponent))

const handleCtaClick = () => {
  if (ctaOpensModal) openContactModal()
}
</script>

<template>
  <article class="service-card">
    <div class="service-card__header">
      <div class="service-card__meta-row">
        <div class="service-card__badges">
          <span v-if="isNew" class="service-card__new-badge">
            Новинка
          </span>
          <span class="service-card__subtitle">
            {{ subtitle }}
          </span>
        </div>
        <div class="service-card__price">
          <span class="service-card__price-text">
            {{ priceFrom }}
          </span>
        </div>
      </div>
      <h3 class="service-card__title">
        {{ title }}
      </h3>
    </div>

    <p class="service-card__description">
      {{ description }}
    </p>

    <ul class="service-card__bullets">
      <li v-for="bullet in bullets" :key="bullet" class="service-card__bullet">
        <span class="service-card__bullet-marker" aria-hidden="true">—</span>
        <span class="service-card__bullet-text">{{ bullet }}</span>
      </li>
    </ul>

    <div class="service-card__footer">
      <component
        :is="ctaComponent"
        v-bind="ctaAttrs"
        class="service-card__button"
        @click="handleCtaClick"
      >
        {{ ctaText }}
      </component>
    </div>
  </article>
</template>

<style scoped lang="scss">
$service-card-accent: rgb(236 72 153);
$service-card-accent-dark: rgb(219 39 119);
$service-card-text: rgb(23 23 23);
$service-card-muted: rgb(82 82 82);
$service-card-body: rgb(64 64 64);

@mixin center-flex($display: flex) {
  display: $display;
  align-items: center;
  justify-content: center;
}

.service-card {
  display: flex;
  min-height: 0;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border: 1px solid var(--u-black-a06);
  border-radius: 14px;
  background: var(--u-white-a85);
  box-shadow: 0 4px 16px var(--u-black-a04);
  backdrop-filter: blur(10px);
  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    border-color: var(--u-pink-a20);
    box-shadow: 0 4px 24px var(--u-pink-a08);
  }

  &__header {
    display: grid;
    gap: 12px;
  }

  &__meta-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  &__badges {
    display: flex;
    min-height: 24px;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  &__new-badge {
    padding: 4px 8px;
    border-radius: 6px;
    background: linear-gradient(to bottom right, rgb(249 115 22), rgb(234 88 12));
    color: var(--u-color-white);
    font-size: var(--u-font-11);
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    box-shadow: 0 2px 8px var(--u-orange-a25);
  }

  &__subtitle {
    padding: 0;
    border: 0;
    background: transparent;
    color: $service-card-muted;
    font-size: var(--u-font-12);
  }

  &__price {
    @include center-flex;

    height: 24px;
    flex-shrink: 0;
    padding: 6px 12px;
    border-radius: 8px;
    background: linear-gradient(to bottom right, var(--u-pink-a10), var(--u-pink-600-a15));
  }

  &__price-text {
    color: $service-card-accent-dark;
    font-size: var(--u-font-14);
    font-weight: 700;
    letter-spacing: -0.025em;
    white-space: nowrap;
  }

  &__title {
    margin: 0;
    color: $service-card-text;
    font-size: var(--u-font-20);
    font-weight: 700;
    line-height: 1.35;
    letter-spacing: -0.025em;
  }

  &__description {
    margin: 0;
    color: $service-card-muted;
    font-size: var(--u-font-14);
    line-height: 1.55;
  }

  &__bullets {
    display: grid;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__bullet {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 10px;
  }

  &__bullet-marker {
    color: $service-card-accent;
    font-size: var(--u-font-14);
    font-weight: 600;
    line-height: 1;
  }

  &__bullet-text {
    color: $service-card-body;
    font-size: var(--u-font-14);
    line-height: 1.5;
  }

  &__footer {
    margin-top: auto;
    padding-top: 8px;
  }

  &__button {
    @include center-flex(inline-flex);

    padding: 12px 16px;
    border: 2px solid $service-card-accent;
    border-radius: 10px;
    background: transparent;
    color: $service-card-accent-dark;
    font-size: var(--u-font-14);
    font-weight: 600;
    text-decoration: none;
    transition:
      background-color 0.2s ease-in-out,
      color 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out;

    &:hover {
      background-color: $service-card-accent;
      color: var(--u-color-white);
      box-shadow: 0 4px 16px var(--u-pink-a35);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    &__button {
      transition: none;
    }
  }
}
</style>
