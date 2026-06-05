<script setup lang="ts">
const { open: openContactModal } = useContactModal()
</script>

<template>
    <div
      class="flex flex-col items-center gap-8 rounded-[20px] border border-black/[0.06] bg-white py-9 px-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:flex-row sm:justify-between sm:p-[38px] sm:text-left"
    >
      <div class="flex-1">
        <h3 class="m-0 mb-1.5 text-2xl font-semibold text-[#1a1a1a]">
          Нужна консультация?
        </h3>
        <p class="m-0 text-[15px] text-slate-500">
          Поможем с выбором под ваш проект
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-xl bg-[#1a1a1a] px-8 py-4 text-[15px] font-semibold text-white no-underline transition-all duration-300 hover:gap-3 hover:bg-[#333]"
        @click="openContactModal"
      >
        Связаться
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
</template>
