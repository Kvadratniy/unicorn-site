<script setup lang="ts">
type ButtonVariant = 'primary' | 'ghost' | 'hero-primary'

interface Props {
  variant?: ButtonVariant
  to?: string
  icon?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  icon: true,
  disabled: false,
})

const emit = defineEmits<{ click: [e: MouseEvent] }>()

const isLink = computed(() => !!props.to)
const isAnchor = computed(() => props.to?.startsWith('#'))

const component = computed(() => {
  if (!isLink.value || isAnchor.value) return 'button'
  return props.to?.startsWith('http') ? 'a' : 'NuxtLink'
})

const linkProps = computed(() => {
  if (!isLink.value || isAnchor.value) return {}
  if (props.to?.startsWith('http')) {
    return { href: props.to, target: '_blank', rel: 'noopener noreferrer' }
  }
  return { to: props.to }
})

const handleClick = (e: Event) => {
  if (isAnchor.value && props.to) {
    e.preventDefault()
    const targetId = props.to.substring(1)
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }
  emit('click', e as MouseEvent)
}
</script>

<template>
  <component
    :is="component"
    v-bind="linkProps"
    :disabled="disabled"
    :class="[
      'ui-button',
      `ui-button--${variant}`,
      { 'ui-button--disabled': disabled }
    ]"
    @click="handleClick"
  >
    <span class="ui-button__content">
      <slot />
    </span>
    <svg
      v-if="icon"
      class="ui-button__icon"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M4 10h12M12 6l4 4-4 4"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </component>
</template>

<style scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (min-width: 1024px) {
  .ui-button {
    padding: 20px 40px;
    font-size: 16px;
  }
}

.ui-button__content {
  position: relative;
  z-index: 2;
}

.ui-button__icon {
  position: relative;
  z-index: 2;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

/* Primary Variant - Filled Gradient */
.ui-button--primary {
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  color: #fff;
  box-shadow: 0 8px 32px rgba(236, 72, 153, 0.25);
}

.ui-button--primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}

.ui-button--primary::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}

.ui-button--primary:hover {
  box-shadow: 0 20px 50px rgba(236, 72, 153, 0.35);
}

.ui-button--primary:hover::before {
  opacity: 1;
}

.ui-button--primary:hover::after {
  left: 100%;
}

.ui-button--primary:hover .ui-button__icon {
  transform: translateX(4px);
}

.ui-button--primary:focus-visible {
  outline: 2px solid #ec4899;
  outline-offset: 2px;
}

/* Hero Primary — стили из UHero (hero__btn--primary) */
.ui-button--hero-primary {
  background: linear-gradient(135deg, #fff 0%, #e339a2 45%, #c91d7a 100%);
  color: #fff;
  box-shadow: 0 8px 32px rgba(227, 57, 162, 0.22);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.ui-button--hero-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #e339a2, #c91d7a);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}

.ui-button--hero-primary:hover {
  box-shadow: 0 20px 50px rgba(227, 57, 162, 0.32);
}

.ui-button--hero-primary:hover::before {
  opacity: 1;
}

.ui-button--hero-primary:hover .ui-button__icon {
  transform: translateX(4px);
}

.ui-button--hero-primary:focus-visible {
  outline: 2px solid #e339a2;
  outline-offset: 2px;
}

/* Ghost Variant - Semi-transparent */
.ui-button--ghost {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.ui-button--ghost::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}

.ui-button--ghost:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.ui-button--ghost:hover::after {
  left: 100%;
}

.ui-button--ghost:hover .ui-button__icon {
  transform: translateX(4px);
}

.ui-button--ghost:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

/* Disabled State */
.ui-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .ui-button,
  .ui-button::before,
  .ui-button::after,
  .ui-button__icon {
    transition: none;
  }

  .ui-button--primary:hover::after,
  .ui-button--ghost:hover::after {
    left: -100%;
  }

  .ui-button--hero-primary:hover::before {
    opacity: 0;
  }

  .ui-button:hover .ui-button__icon {
    transform: none;
  }
}
</style>
