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
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid rgb(0 0 0 / 0.06);
  border-radius: 14px;
  background: rgb(255 255 255 / 0.85);
  box-shadow: 0 4px 16px rgb(0 0 0 / 0.04);
  backdrop-filter: blur(10px);
  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    border-color: rgb(236 72 153 / 0.2);
    box-shadow: 0 4px 24px rgb(236 72 153 / 0.08);
  }

  &__header {
    display: grid;
    gap: 0.75rem;
  }

  &__meta-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }

  &__badges {
    display: flex;
    min-height: 1.5rem;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }

  &__new-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    background: linear-gradient(to bottom right, rgb(249 115 22), rgb(234 88 12));
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    box-shadow: 0 2px 8px rgb(249 115 22 / 0.25);
  }

  &__subtitle {
    padding: 0;
    border: 0;
    background: transparent;
    color: $service-card-muted;
    font-size: 0.75rem;
  }

  &__price {
    @include center-flex;

    height: 1.5rem;
    flex-shrink: 0;
    padding: 0.375rem 0.75rem;
    border-radius: 0.5rem;
    background: linear-gradient(to bottom right, rgb(236 72 153 / 0.1), rgb(219 39 119 / 0.15));
  }

  &__price-text {
    color: $service-card-accent-dark;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    white-space: nowrap;
  }

  &__title {
    margin: 0;
    color: $service-card-text;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.35;
    letter-spacing: -0.025em;
  }

  &__description {
    margin: 0;
    color: $service-card-muted;
    font-size: 0.875rem;
    line-height: 1.55;
  }

  &__bullets {
    display: grid;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__bullet {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.625rem;
  }

  &__bullet-marker {
    color: $service-card-accent;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1;
  }

  &__bullet-text {
    color: $service-card-body;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  &__footer {
    margin-top: auto;
    padding-top: 0.5rem;
  }

  &__button {
    @include center-flex(inline-flex);

    padding: 0.75rem 1rem;
    border: 2px solid $service-card-accent;
    border-radius: 10px;
    background: transparent;
    color: $service-card-accent-dark;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    transition:
      background-color 0.2s ease-in-out,
      color 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out;

    &:hover {
      background-color: $service-card-accent;
      color: #fff;
      box-shadow: 0 4px 16px rgb(236 72 153 / 0.35);
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
