<script setup lang="ts">
import { createOrganizationSchema } from '~/composables/useSchemas'

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string

const organizationSchema = createOrganizationSchema(siteUrl)

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify(organizationSchema),
    },
  ],
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
