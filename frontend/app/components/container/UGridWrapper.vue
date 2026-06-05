<script setup lang="ts">
type Props = {
  titleId: string
}

defineProps<Props>()
</script>

<template>
  <div>
    <slot name="header" />
      <div class="grid">
        <slot />
      </div>
  </div>
</template>

<style scoped>
.section {
  padding: 50px 0 30px;
}

.wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (min-width: 1024px) {
  .wrap {
    padding: 0 40px;
  }
}

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
