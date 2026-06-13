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
  font-size: var(--u-font-15);
  font-weight: 700;
  letter-spacing: 0.3px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.4s var(--u-ease-standard);
}

@media (min-width: 1024px) {
  .ui-button {
    padding: 20px 40px;
    font-size: var(--u-font-16);
  }
}

.ui-button__content {
  position: relative;
  z-index: 2;
}

.ui-button__icon {
  position: relative;
  z-index: 2;
  transition: transform 0.3s var(--u-ease-standard);
  flex-shrink: 0;
}

/* Primary Variant - Filled Gradient */
.ui-button--primary {
  background: var(--u-gradient-brand);
  color: var(--u-color-white);
  box-shadow: 0 8px 32px var(--u-pink-a25);
}

.ui-button--primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--u-color-purple), var(--u-color-blue));
  opacity: 0;
  transition: opacity 0.4s var(--u-ease-standard);
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
  transition: left 0.6s var(--u-ease-standard);
  z-index: 1;
}

.ui-button--primary:hover {
  box-shadow: 0 20px 50px var(--u-pink-a35);
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
  outline: 2px solid var(--u-color-pink);
  outline-offset: 2px;
}

/* Hero Primary — стили из UHero (hero__btn--primary) */
.ui-button--hero-primary {
  background: linear-gradient(135deg, var(--u-color-white) 0%, var(--u-color-magenta) 45%, var(--u-color-magenta-deep) 100%);
  color: var(--u-color-white);
  box-shadow: 0 8px 32px rgba(227, 57, 162, 0.22);
  transition: all 0.4s var(--u-ease-standard);
}

.ui-button--hero-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--u-color-magenta), var(--u-color-magenta-deep));
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
  outline: 2px solid var(--u-color-magenta);
  outline-offset: 2px;
}

/* Ghost Variant - Semi-transparent */
.ui-button--ghost {
  background: var(--u-white-a10);
  color: var(--u-color-white);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px var(--u-black-a10);
  transition: all 0.4s var(--u-ease-standard);
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
    var(--u-white-a20),
    transparent
  );
  transition: left 0.6s var(--u-ease-standard);
  z-index: 1;
}

.ui-button--ghost:hover {
  background: var(--u-white-a20);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 24px var(--u-black-a15);
}

.ui-button--ghost:hover::after {
  left: 100%;
}

.ui-button--ghost:hover .ui-button__icon {
  transform: translateX(4px);
}

.ui-button--ghost:focus-visible {
  outline: 2px solid var(--u-white-a50);
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
