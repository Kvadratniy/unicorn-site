<script setup lang="ts">
import type { ServicesViewModel } from '~/composables/pages/contentTypes'

type Props = {
  titleId: string
  services: ServicesViewModel
}

defineProps<Props>()
</script>

<template>
  <UGridWrapper>
    <template #header>
      <UTitle
        :title-id="titleId"
        :title="services.title"
        :subtitle="services.subtitle"
      />
    </template>
    <UServiceCard
      v-for="(service, i) in services.items"
      :key="i"
      :title="service.title"
      :subtitle="service.subtitle"
      :description="service.description"
      :bullets="service.bullets"
      :price-from="service.priceFrom"
      :is-new="service.isNew"
    />
  </UGridWrapper>
</template>
