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
$headline-contact-muted: #817783;
$headline-contact-accent: var(--u-color-accent);
$headline-contact-border: var(--u-headline-ink-a12);
$headline-contact-surface: #fbfafb;
$headline-contact-hover: #f8f3f7;
$headline-contact-focus: var(--u-accent-a18);

.u-headline-contact {
  display: none;
  align-items: center;
  gap: 16px;

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
    line-height: 13px;
    font-family: var(--u-font-montserrat);
  }

  &__phone {
    color: $headline-contact-text;
    font-size: var(--u-font-11);
    font-weight: 600;
    letter-spacing: 0.1px;
    line-height: 14px;
    text-decoration: none;
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
    gap: 10px;
    padding: 5px 6px 5px 16px;
    border: 1px solid $headline-contact-border;
    border-radius: 9999px;
    background-color: $headline-contact-surface;
    color: $headline-contact-text;
    cursor: pointer;
    font-size: var(--u-font-12);
    font-weight: 600;
    letter-spacing: 0.2px;
    line-height: 14px;
    transition:
      background-color 180ms ease,
      border-color 180ms ease,
      color 180ms ease;

    &:hover {
      border-color: rgba(201, 54, 134, 0.24);
      background-color: $headline-contact-hover;
      color: $headline-contact-accent;

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
    border-radius: 50%;
    background-color: var(--u-color-white);
    color: $headline-contact-muted;
    transition:
      background-color 180ms ease,
      color 180ms ease;
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
