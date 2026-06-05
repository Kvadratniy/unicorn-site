<template>
  <NuxtLink to="/" class="u-logo" aria-label="Unicorn Studio">
    <NuxtImg
      src="/images/logo/heda.png"
      alt=""
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
  gap: 10px;
  color: inherit;
  text-decoration: none;
  align-items: center;

  &__image {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    margin-left: 15px;
    object-fit: contain;
  }

  &__text {
    display: flex;
    min-width: 0;
    flex-direction: column;
    line-height: 1;
	gap: 2px;
  }

  &__title {
    color: #b84eb9;
    font-family: 'Montserrat';
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.03em;
  }

  &__subtitle {
    margin-top: 3px;
    color: #1b1b1b;
    font-size: 10px;
    font-weight: 300;
    letter-spacing: 0.12em;
    text-transform: uppercase;
	font-family: 'Montserrat';
  }

  @media (max-width: 640px) {
    &__title {
      font-size: 14px;
    }

    &__subtitle {
      display: none;
    }
  }
}
</style>