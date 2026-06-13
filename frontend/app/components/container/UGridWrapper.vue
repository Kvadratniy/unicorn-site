<template>
  <div>
    <slot name="header" />
    <div class="grid">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}
</style>
