<script setup lang="ts">
import { offset, useFloating } from '@floating-ui/vue'
import type { MenuItem, MenuLinkItem } from './menu'

const props = withDefaults(defineProps<{
  label: string
  subtitle?: string
  items: MenuItem[]
  links: MenuLinkItem[]
}>(), {
  subtitle: '',
})

const CLOSE_DELAY_MS = 160

const activeMenuLabel = useState<string | null>('active-menu-dropdown', () => null)

const rootRef = ref<HTMLElement | null>(null)
const referenceRef = ref<HTMLElement | null>(null)
const floatingRef = ref<HTMLElement | null>(null)
const closeTimeoutRef = ref<ReturnType<typeof setTimeout> | null>(null)
const isOpen = computed(() => activeMenuLabel.value === props.label)

const { floatingStyles } = useFloating(referenceRef, floatingRef, {
  placement: 'bottom',
  middleware: [offset(18)],
})

const clearCloseTimeout = () => {
  if (!closeTimeoutRef.value) {
    return
  }

  clearTimeout(closeTimeoutRef.value)
  closeTimeoutRef.value = null
}

const openMenu = () => {
  clearCloseTimeout()
  activeMenuLabel.value = props.label
}

const closeMenu = () => {
  clearCloseTimeout()
  if (isOpen.value) {
    activeMenuLabel.value = null
  }
}

const scheduleClose = () => {
  clearCloseTimeout()
  closeTimeoutRef.value = setTimeout(() => {
    if (isOpen.value) {
      activeMenuLabel.value = null
    }
    closeTimeoutRef.value = null
  }, CLOSE_DELAY_MS)
}

const onTriggerClick = () => {
  if (isOpen.value) {
    closeMenu()
    return
  }

  openMenu()
}

const onDocumentPointerdown = (event: PointerEvent) => {
  if (!isOpen.value) {
    return
  }

  const target = event.target as Node | null
  if (target && rootRef.value?.contains(target)) {
    return
  }

  closeMenu()
}

const onZoneMouseenter = () => {
  clearCloseTimeout()
}

const onZoneMouseleave = () => {
  if (!isOpen.value) {
    return
  }

  scheduleClose()
}

const onZoneFocusout = (event: FocusEvent) => {
  const nextFocused = event.relatedTarget as Node | null
  if (nextFocused && rootRef.value?.contains(nextFocused)) {
    return
  }

  scheduleClose()
}

const onPanelEscape = () => {
  closeMenu()
  referenceRef.value?.focus()
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerdown, true)
})

onBeforeUnmount(() => {
  clearCloseTimeout()
  document.removeEventListener('pointerdown', onDocumentPointerdown, true)
  if (isOpen.value) {
    activeMenuLabel.value = null
  }
})
</script>

<template>
  <div
    ref="rootRef"
    class="u-menu-dropdown"
    :class="{ 'u-menu-dropdown--open': isOpen }"
    @mouseenter="onZoneMouseenter"
    @mouseleave="onZoneMouseleave"
    @focusout="onZoneFocusout"
  >
    <button
      ref="referenceRef"
      type="button"
      aria-haspopup="menu"
      :aria-expanded="isOpen ? 'true' : 'false'"
      @click="onTriggerClick"
    >
      <span>{{ label }}</span>
      <svg
        class="u-menu-dropdown__chevron"
        viewBox="0 0 12 12"
        aria-hidden="true"
      >
        <path
          d="M3 4.5L6 7.5L9 4.5"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
      </svg>
    </button>
    <Transition name="u-menu-panel">
      <div
        v-if="isOpen"
        ref="floatingRef"
        :style="floatingStyles"
        class="u-menu-panel"
        @keydown.esc.prevent="onPanelEscape"
      >
        <div class="u-menu-panel__header">
          <p class="u-menu-panel__eyebrow">{{ label }}</p>
          <p class="u-menu-panel__lead">{{ subtitle }}</p>
        </div>

        <div class="u-menu-panel-grid">
          <UChildNav :items="items" title="Обучение" @select="closeMenu" />
          <UNewsNav :items="links" @select="closeMenu" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.u-menu-dropdown {
  display: inline-flex;
}

.u-menu-dropdown :where(button) {
  gap: 8px;
}

.u-menu-dropdown--open {
  color: #26202a;
}

.u-menu-dropdown__chevron {
  width: 11px;
  height: 11px;
  flex: 0 0 auto;
  opacity: 0.52;
  transition: transform 0.18s ease, opacity 0.18s ease;
}

.u-menu-dropdown--open .u-menu-dropdown__chevron {
  opacity: 1;
  transform: rotate(180deg);
}

.u-menu-panel {
  width: min(750px, calc(100vw - 32px));
  background-color: var(--u-color-white);
  border-radius: 14px;
  border: 1px solid rgba(38, 32, 42, 0.12);
  padding: 28px 22px;
  z-index: 50;
  box-shadow: 0 22px 60px rgba(25, 18, 30, 0.12);
}

.u-menu-panel-enter-active {
  transition:
    opacity 180ms ease,
    margin-top 180ms ease;
}

.u-menu-panel-leave-active {
  transition:
    opacity 120ms ease,
    margin-top 120ms ease;
}

.u-menu-panel-enter-from,
.u-menu-panel-leave-to {
  margin-top: -8px;
  opacity: 0;
}

.u-menu-panel-enter-to,
.u-menu-panel-leave-from {
  margin-top: 0;
  opacity: 1;
}

.u-menu-panel__header {
  display: grid;
  gap: 4px;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--u-ink-a08);
}

.u-menu-panel__eyebrow,
.u-menu-panel__lead {
  margin: 0;
}

.u-menu-panel__eyebrow {
  color: var(--u-color-accent);
  font-size: var(--u-font-10);
  font-weight: 700;
  letter-spacing: 1.3px;
  line-height: 10px;
  text-transform: uppercase;
}

.u-menu-panel__lead {
  max-width: 360px;
  color: #706977;
  font-size: var(--u-font-11);
  line-height: 16px;
  text-transform: none;
}

.u-menu-panel-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 16px;
  align-items: stretch;
}

@media (max-width: 860px) {
  .u-menu-panel {
    width: min(760px, calc(100vw - 20px));
  }

  .u-menu-panel-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .u-menu-panel-enter-active,
  .u-menu-panel-leave-active {
    transition: none;
  }

  .u-menu-panel-enter-from,
  .u-menu-panel-leave-to {
    margin-top: 0;
    opacity: 1;
  }
}
</style>