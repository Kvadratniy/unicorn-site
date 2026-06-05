<script setup lang="ts">
defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()

const burgerLineClass = 'u-burger-button__line'
</script>

<template>
  <button
    type="button"
    class="u-burger-button"
    aria-label="Открыть меню"
    :aria-expanded="open"
    @click="emit('toggle')"
  >
    <span :class="[burgerLineClass, open ? 'u-burger-button__line--top-open' : '']" />
    <span :class="[burgerLineClass, 'u-burger-button__line--middle', open ? 'u-burger-button__line--middle-open' : '']" />
    <span :class="[burgerLineClass, 'u-burger-button__line--bottom', open ? 'u-burger-button__line--bottom-open' : '']" />
  </button>
</template>

<style scoped lang="scss">
.u-burger-button {
  position: relative;
  z-index: 101;
  display: flex;
  height: 42px;
  width: 42px;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--burger-button-border, rgb(16 16 16 / 0.08));
  border-radius: 9999px;
  padding: 0;
  border-color: var(--burger-button-border, rgb(16 16 16 / 0.08));
  background-color: var(--burger-button-bg, rgb(255 255 255 / 0.82));

  &__line {
    display: block;
    width: 18px;
    height: 2px;
    border-radius: 9999px;
    background-color: var(--burger-button-line, #e339a2);
    transition: transform 250ms ease-out, opacity 250ms ease-out;

    &--middle,
    &--bottom {
      margin-top: 4px;
    }

    &--top-open {
      transform: translateY(6px) rotate(45deg);
    }

    &--middle-open {
      opacity: 0;
    }

    &--bottom-open {
      transform: translateY(-6px) rotate(-45deg);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .u-burger-button__line {
    transition: none;
  }
}

@media (min-width: 1000px) {
  .u-burger-button {
    display: none;
  }
}
</style>
