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
/** Лоадер скрывается по DOMContentLoaded или по таймауту — не ждём window.load, чтобы не откладывать LCP */
const LOADER_TIMEOUT_MS = 1800

onMounted(() => {
  if (import.meta.server) return

  let timeoutId: number | null = null

  const finish = () => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId)
      timeoutId = null
    }
    window.removeEventListener('DOMContentLoaded', finish)
    nextTick(() => {
      isAppReady.value = true
    })
  }

  if (document.readyState !== 'loading') {
    nextTick(() => { isAppReady.value = true })
    return
  }

  window.addEventListener('DOMContentLoaded', finish, { once: true })
  timeoutId = window.setTimeout(finish, LOADER_TIMEOUT_MS)

  onUnmounted(() => {
    if (timeoutId !== null) window.clearTimeout(timeoutId)
    window.removeEventListener('DOMContentLoaded', finish)
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
