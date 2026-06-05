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
  gap: 25px;
  padding-bottom: 20px;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 4px 4px 0;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
  &__intro {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}

@media (min-width: 1024px) {
  .page__content {
    padding: 20px 20px 0;
  }
  .page__info {
    gap: 80px;
  }
  .page__intro {
    gap: 25px;
  }
}
</style>
