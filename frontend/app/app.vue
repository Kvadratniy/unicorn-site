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

const isAppReady = ref(false)
/**
 * Prevent first-load FOUC: keep overlay until styles/assets are ready.
 * We still use a timeout fallback to avoid a stuck loader.
 */
const LOADER_TIMEOUT_MS = 3000

onMounted(() => {
  if (import.meta.server) return

  let timeoutId: number | null = null

  const finish = async () => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId)
      timeoutId = null
    }
    window.removeEventListener('load', finish)

    // One frame buffer after load to avoid a flash between hydration and styles paint.
    await nextTick()
    requestAnimationFrame(() => {
      isAppReady.value = true
    })
  }

  if (document.readyState === 'complete') {
    void finish()
    return
  }

  window.addEventListener('load', finish, { once: true })
  timeoutId = window.setTimeout(() => {
    void finish()
  }, LOADER_TIMEOUT_MS)

  onUnmounted(() => {
    if (timeoutId !== null) window.clearTimeout(timeoutId)
    window.removeEventListener('load', finish)
  })
})
</script>
<template>
  <div>
    <AppLoader :visible="!isAppReady" />
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
