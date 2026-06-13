<script setup lang="ts">
import type { StudioClientsViewModel } from '~/composables/pages/useStudio'

const props = defineProps<{
  clients: StudioClientsViewModel
}>()
</script>

<template>
  <UBaseWrapper aria-labelledby="studio-clients-title">
    <UBaseTitle
        label="Кейсы"
        :title="props.clients.title"
        :description="props.clients.subtitle"
      />

      <div class="clients-masonry">
        <UClientCard
          v-for="(client, i) in props.clients.items"
          :key="client.name"
          :client="client"
          :index="i"
        />
      </div>
  </UBaseWrapper>
</template>

<style scoped>
.clients-masonry {
  width: 100%;
  column-count: 1;
  column-gap: 20px;
}

@media (min-width: 768px) {
  .clients-masonry {
    column-count: 3;
    column-gap: 24px;
  }
}
</style>
