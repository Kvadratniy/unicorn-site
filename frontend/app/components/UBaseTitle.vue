<script setup lang="ts">
type Props = {
  label?: string
  title: string
  description?: string
  maxDescriptionWidth?: string
}

withDefaults(defineProps<Props>(), {
  maxDescriptionWidth: '480px',
})
</script>

<template>
  <header class="mb-5 text-center">
    <div
      v-if="label"
      class="mb-8 flex items-center justify-center gap-5 lg:mb-[16px]"
    >
      <span class="h-px w-14 bg-gradient-to-r from-transparent to-black/15 lg:w-[60px]" />
      <span class="text-[11px] font-regular tracking-[0.3em] uppercase text-slate-500">
        {{ label }}
      </span>
      <span class="h-px w-14 bg-gradient-to-r from-black/15 to-transparent lg:w-[60px]" />
    </div>
    <h2 class="unicorn-studio-title-2 mb-6 text-[#1a1a1a]">
      {{ title }}
    </h2>

    <p
      v-if="description"
      class="mx-auto text-base leading-relaxed text-slate-500 lg:text-[17px]"
      :style="{ maxWidth: maxDescriptionWidth }"
    >
      {{ description }}
    </p>
  </header>
</template>
