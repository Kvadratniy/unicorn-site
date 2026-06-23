<script setup lang="ts">
const { open: openContactModal } = useContactModal()
</script>

<template>
    <div
      class="flex flex-col items-center gap-8 rounded-[18px] border border-black/[0.06] bg-white py-9 px-7 shadow-[0_1px_3px_rgba(0,0,0,0.03)] sm:flex-row sm:justify-between sm:p-[38px] sm:text-left"
    >
      <div class="flex-1">
        <h3 class="m-0 mb-1.5 text-[22px] font-semibold tracking-[-0.02em] text-[#1a1716]">
          Нужна консультация?
        </h3>
        <p class="m-0 text-[15px] leading-relaxed text-[#64748b]">
          Поможем с выбором под ваш проект
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-xl bg-[#1a1716] px-8 py-4 text-[15px] font-semibold text-white no-underline transition-all duration-300 hover:gap-3 hover:bg-[#2a2523]"
        @click="openContactModal"
      >
        Связаться
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
</template>
