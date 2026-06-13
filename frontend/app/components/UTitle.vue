<script setup lang="ts">
type Props = {
  titleId: string
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>

<template>
  <header class="head">
    <h2 :id="titleId" class="text-[28px] lg:text-4xl font-bold tracking-tight text-neutral-900">{{ title }}</h2>
    <p v-if="subtitle" class="head__subtitle">
      {{ subtitle }}
    </p>
  </header>
</template>

<style scoped>
.head {
  display: grid;
  gap: 12px;
  margin-bottom: 35px;
}

.head__subtitle {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
  font-size: var(--u-font-17);
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.011em;
  color: var(--u-text-secondary);
  max-width: 70ch;
}
</style>
