<template>
  <NuxtLink to="/" class="u-logo" aria-label="Unicorn Studio">
    <NuxtImg
      src="/images/logo/heda.png"
      alt="Unicorn Studio Logo"
      class="u-logo__image"
      format="webp"
    />

    <span class="u-logo__text">
      <span class="u-logo__title">Юникорн</span>
      <span class="u-logo__subtitle">музыкальная студия</span>
    </span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.u-logo {
  display: flex;
  min-width: 0;
  gap: 9px;
  color: inherit;
  text-decoration: none;
  align-items: center;

  &__image {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    margin-left: 6px;
    object-fit: contain;
  }

  &__text {
    display: flex;
    min-width: 0;
    flex-direction: column;
    line-height: 1;
    gap: 1px;
  }

  &__title {
    color: var(--u-color-accent);
    font-family: var(--u-font-montserrat);
    font-size: var(--u-font-15);
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  &__subtitle {
    margin-top: 2px;
    color: var(--u-text-nav-muted);
    font-size: var(--u-font-9);
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-family: var(--u-font-montserrat);
  }

  @media (max-width: 640px) {
    &__title {
      font-size: var(--u-font-14);
    }

    &__subtitle {
      display: none;
    }
  }
}
</style>