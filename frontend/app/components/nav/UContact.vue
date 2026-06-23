<script setup lang="ts">
const emit = defineEmits<{
  contact: []
}>()
</script>

<template>
  <div class="u-headline-contact">
    <div class="u-headline-contact__info" aria-label="Контактная информация">
      <span class="u-headline-contact__address">50 лет ВЛКСМ, 93</span>
      <a class="u-headline-contact__phone" href="tel:+79064649496">+7 906 464-94-96</a>
    </div>

    <button type="button" class="u-headline-contact__button" @click="emit('contact')">
      <span class="u-headline-contact__label">Связаться</span>
      <span class="u-headline-contact__mark" aria-hidden="true">
        <svg viewBox="0 0 12 12" class="u-headline-contact__icon">
          <path
            d="M3 9L9 3M9 3H4M9 3V8"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.4"
          />
        </svg>
      </span>
    </button>
  </div>
</template>

<style scoped lang="scss">
$headline-contact-text: #332d36;
$headline-contact-muted: #8b8590;
$headline-contact-accent: var(--u-color-accent);
$headline-contact-border: rgba(36, 31, 27, 0.08);
$headline-contact-surface: #faf9fb;
$headline-contact-hover: rgba(201, 54, 134, 0.06);
$headline-contact-focus: var(--u-accent-a18);

.u-headline-contact {
  display: none;
  align-items: center;
  gap: 14px;

  @media (min-width: 1000px) {
    display: inline-flex;
  }

  &__info {
    display: none;
    min-width: 118px;
    text-align: right;

    @media (min-width: 1240px) {
      display: block;
    }
  }

  &__address,
  &__phone {
    display: block;
    white-space: nowrap;
  }

  &__address {
    color: $headline-contact-muted;
    font-size: var(--u-font-10);
    font-weight: 500;
    letter-spacing: 0.1px;
    line-height: 14px;
    font-family: var(--u-font-montserrat);
  }

  &__phone {
    color: $headline-contact-text;
    font-size: var(--u-font-11);
    font-weight: 600;
    letter-spacing: 0.2px;
    line-height: 14px;
    text-decoration: none;
    font-variant-numeric: tabular-nums;
    transition: color 180ms ease;
    font-family: var(--u-font-montserrat);
  
    &:hover,
    &:focus-visible {
      color: $headline-contact-accent;
    }

    &:focus-visible {
      outline: 2px solid $headline-contact-focus;
      outline-offset: 2px;
    }
  }

  &__button {
    display: inline-flex;
    min-height: 36px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 5px 6px 5px 16px;
    border: 1px solid $headline-contact-border;
    border-radius: 10px;
    background-color: $headline-contact-surface;
    color: $headline-contact-text;
    cursor: pointer;
    font-size: var(--u-font-12);
    font-weight: 600;
    letter-spacing: 0.2px;
    line-height: 14px;
    transition:
      background-color 200ms ease,
      border-color 200ms ease,
      color 200ms ease,
      box-shadow 200ms ease;

    &:hover {
      border-color: rgba(201, 54, 134, 0.18);
      background-color: $headline-contact-hover;
      color: $headline-contact-accent;
      box-shadow: 0 2px 8px rgba(201, 54, 134, 0.1);

      .u-headline-contact__mark {
        background-color: $headline-contact-accent;
        color: var(--u-color-white);
      }
    }

    &:focus-visible {
      outline: 3px solid $headline-contact-focus;
      outline-offset: 2px;
    }
  }

  &__label {
    white-space: nowrap;
  }

  &__mark {
    display: inline-flex;
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: var(--u-color-white);
    color: $headline-contact-muted;
    transition:
      background-color 200ms ease,
      color 200ms ease;
  }

  &__icon {
    width: 12px;
    height: 12px;
  }

  @media (prefers-reduced-motion: reduce) {
    &__phone,
    &__button,
    &__mark {
      transition: none;
    }
  }
}
</style>
