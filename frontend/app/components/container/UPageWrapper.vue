<template>
  <div class="page">
    <slot name="hero" />
    <div class="page__content">
      <div class="page__intro">
        <UBreadcrumbs />
        <slot name="intro" />
      </div>

      <div class="page__info">
        <slot name="info" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding-bottom: 24px;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 44px;
    padding: 4px 4px 0;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 56px;
  }
  &__intro {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }
}

@media (min-width: 1024px) {
  .page__content {
    padding: 20px 20px 0;
  }
  .page__info {
    gap: 88px;
  }
  .page__intro {
    gap: 24px;
  }
}
</style>
