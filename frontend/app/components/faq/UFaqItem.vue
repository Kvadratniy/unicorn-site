<script setup lang="ts">
type FaqItem = {
  question: string
  answer: string
}

const {
  item,
  index,
  isOpen,
  panelId,
  triggerId,
} = defineProps<{
  item: FaqItem
  index: number
  isOpen: boolean
  panelId: string
  triggerId: string
}>()

const emit = defineEmits<{
  toggle: [index: number]
}>()
</script>

<template>
  <div
    class="faq-item"
    :class="{ 'faq-item--open': isOpen }"
    role="listitem"
  >
    <button
      :id="triggerId"
      type="button"
      class="faq-item__trigger"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      @click="emit('toggle', index)"
    >
      <span class="faq-item__question">{{ item.question }}</span>
      <span class="faq-item__icon" aria-hidden="true">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 4v12M4 10h12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </span>
    </button>

    <div
      :id="panelId"
      class="faq-item__panel"
      role="region"
      :aria-labelledby="triggerId"
      :aria-hidden="!isOpen"
    >
      <div class="faq-item__panel-inner">
        <p class="faq-item__answer">
          {{ item.answer }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$faq-accent: rgb(236 72 153);
$faq-open-border: rgb(139 92 246 / 0.2);
$faq-text: rgb(23 23 23);
$faq-body: rgb(64 64 64);

@mixin interactive-transition {
  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out,
    color 0.2s ease-in-out,
    background-color 0.2s ease-in-out,
    transform 0.25s ease-in-out,
    grid-template-rows 0.3s ease-in-out;
}

.faq-item {
  overflow: hidden;
  border: 1px solid rgb(0 0 0 / 0.06);
  border-radius: 14px;
  background: rgb(255 255 255 / 0.85);
  box-shadow: 0 4px 16px rgb(0 0 0 / 0.04);
  backdrop-filter: blur(10px);

  @include interactive-transition;

  &--open {
    border-color: $faq-open-border;
    box-shadow: 0 8px 24px rgb(0 0 0 / 0.06);
  }

  &__trigger {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 18px 20px;
    border: 0;
    background: transparent;
    color: $faq-text;
    cursor: pointer;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.025em;
    text-align: left;

    @include interactive-transition;

    &:hover {
      color: $faq-accent;
    }
  }

  &--open &__trigger {
    color: $faq-accent;
  }

  &__question {
    flex: 1;
    line-height: 1.35;
  }

  &__icon {
    display: flex;
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: rgb(236 72 153 / 0.1);
    color: $faq-accent;

    @include interactive-transition;
  }

  &--open &__icon {
    transform: rotate(45deg);
    background: rgb(236 72 153 / 0.18);
  }

  &__panel {
    display: grid;
    grid-template-rows: 0fr;

    @include interactive-transition;
  }

  &--open &__panel {
    grid-template-rows: 1fr;
  }

  &__panel-inner {
    min-height: 0;
    overflow: hidden;
  }

  &__answer {
    margin: 0;
    padding: 1rem 1.25rem 18px;
    border-top: 1px solid rgb(0 0 0 / 0.05);
    color: $faq-body;
    font-size: 15px;
    line-height: 1.7;
  }
}

@media (prefers-reduced-motion: reduce) {
  .faq-item,
  .faq-item__trigger,
  .faq-item__icon,
  .faq-item__panel {
    transition: none;
  }
}
</style>
