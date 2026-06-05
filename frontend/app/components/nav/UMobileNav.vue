<script setup lang="ts">
type MobileNestedMenuItem = {
  label: string
  description?: string
  icon?: string
  to: string
}

type MobileMenuItem = {
  label: string
  subtitle?: string
  to?: string
  items?: MobileNestedMenuItem[]
}

defineProps<{
  open: boolean
  items: MobileMenuItem[]
}>()

const route = useRoute()

const emit = defineEmits<{
  close: []
}>()

const isExactActive = (to?: string) => {
  if (!to) return false
  return route.path === to
}
</script>

<template>
  <Transition name="mobile-menu">
    <div
      v-if="open"
      class="mobile-menu"
      @click="emit('close')"
    >
      <div class="mobile-menu__content" @click.stop>
        <div class="mobile-menu__header">
          <NuxtImg
            src="/images/logo/heda.png"
            alt="Unicorn"
            class="mobile-menu__logo"
            format="webp"
          />
        </div>

        <nav class="mobile-menu__nav" aria-label="Мобильная навигация">
          <div
            v-for="item in items"
            :key="item.label"
            class="mobile-menu__section"
          >
            <NuxtLink
              v-if="item.to"
              :to="item.to"
              class="mobile-menu__section-title mobile-menu__section-title--link"
              :class="{ 'mobile-menu__section-title--active': isExactActive(item.to) }"
              @click="emit('close')"
            >
              {{ item.label }}
            </NuxtLink>
            <p
              v-else
              class="mobile-menu__section-title"
            >
              {{ item.label }}
            </p>

            <div v-if="item.items?.length" class="mobile-menu__section-items">
              <NuxtLink
                v-for="nestedItem in item.items"
                :key="nestedItem.to"
                :to="nestedItem.to"
                class="mobile-menu__nested-link"
                @click="emit('close')"
              >
                <span class="mobile-menu__nested-icon">
                  {{ nestedItem.icon || '✦' }}
                </span>
                <span class="mobile-menu__nested-content">
                  <span class="mobile-menu__nested-label">{{ nestedItem.label }}</span>
                  <span
                    v-if="nestedItem.description"
                    class="mobile-menu__nested-description"
                  >
                    {{ nestedItem.description }}
                  </span>
                </span>
              </NuxtLink>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
$mobile-menu-accent: rgb(236 72 153);
$mobile-menu-text: rgb(38 38 38);

.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: none;
  width: 100vw;
  height: 100vh;
  background: rgb(23 23 23 / 0.6);
  backdrop-filter: blur(16px);

  @media (max-width: 1000px) {
    display: block;
  }

  &__content {
    position: absolute;
    inset: 0 0 0 auto;
    display: flex;
    width: 100%;
    max-width: 100%;
    height: 100vh;
    flex-direction: column;
    padding: 0;
    overflow-y: auto;
    background: #fff;
    font-family: 'Montserrat', sans-serif;
    overscroll-behavior: contain;
  }

  &__header {
    z-index: 10;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 2px solid rgb(0 0 0 / 0.06);
  }

  &__logo {
    width: auto;
    height: 55px;
    object-fit: contain;
  }

  &__close {
    position: relative;
    display: flex;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border: 1px solid rgb(0 0 0 / 0.08);
    border-radius: 50%;
    background: rgb(255 255 255 / 0.8);
    box-shadow: 0 2px 8px rgb(0 0 0 / 0.06);
    cursor: pointer;
    backdrop-filter: blur(8px);
    transition:
      background-color 0.2s ease,
      transform 0.2s ease;

    &:active {
      transform: scale(0.9);
      background: rgb(245 245 245 / 0.9);
    }
  }

  &__close-line {
    position: absolute;
    width: 20px;
    height: 2px;
    border-radius: 2px;
    background: rgb(23 23 23);

    &:first-child {
      transform: rotate(45deg);
    }

    &:last-child {
      transform: rotate(-45deg);
    }
  }

  &__nav {
    display: flex;
    min-height: 0;
    flex: 1 1 0;
    flex-direction: column;
    gap: 0.875rem;
    padding: 1rem 1.25rem 4rem;
    overflow-y: auto;
    overscroll-behavior: contain;
    touch-action: pan-y;
  }

  &__section {
    border: 1px solid rgb(0 0 0 / 0.06);
    border-radius: 16px;
    background: linear-gradient(180deg, #fff 0%, #fdfcfe 100%);
  }

  &__section-title {
    margin: 0;
    color: $mobile-menu-text;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -0.01em;
    text-decoration: none;
  }

  &__section-title--link {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    border-radius: 12px;
    transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;

    &:hover {
      border-color: rgb(236 72 153 / 0.24);
      background: rgb(236 72 153 / 0.08);
      color: rgb(190 24 93);
    }

    &:active {
      color: $mobile-menu-accent;
      border-color: rgb(236 72 153 / 0.28);
      background: rgb(236 72 153 / 0.14);
    }

    &:focus-visible {
      outline: 3px solid rgb(236 72 153 / 0.22);
      outline-offset: 2px;
    }
  }

  &__section-title--active {
    color: $mobile-menu-accent;
    border-color: rgb(236 72 153 / 0.25);
    background: rgb(236 72 153 / 0.1);
    font-weight: 700;
  }

  &__section-title--active:hover {
    color: rgb(190 24 93);
    border-color: rgb(236 72 153 / 0.3);
    background: rgb(236 72 153 / 0.14);
  }

  &__section-title--active:active {
    border-color: rgb(236 72 153 / 0.35);
    background: rgb(236 72 153 / 0.18);
  }

  &__section-title--active:focus-visible {
    outline: 3px solid rgb(236 72 153 / 0.25);
    outline-offset: 2px;
  }

  &__section-title--active::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 10px;
    border-radius: 50%;
    background: currentcolor;
    flex-shrink: 0;
    opacity: 0.9;
  }

  &__section-title--link:not(.mobile-menu__section-title--active)::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 10px;
    border-radius: 50%;
    border: 1px solid rgb(156 163 175);
    background: transparent;
    flex-shrink: 0;
    opacity: 0.8;
  }

  &__section-title--link:hover::before {
    border-color: rgb(190 24 93 / 0.7);
    background: rgb(236 72 153 / 0.2);
  }

  &__section-title--active:hover::before {
    background: currentcolor;
  }

  &__section-title--link:active::before {
    border-color: rgb(190 24 93 / 0.8);
    background: rgb(236 72 153 / 0.28);
  }

  &__section-title--active:active::before {
    background: currentcolor;
  }

  &__section-title--link:focus-visible::before {
    border-color: rgb(190 24 93 / 0.8);
  }

  &__section-title--active:focus-visible::before {
    background: currentcolor;
  }

  &__section-title:not(.mobile-menu__section-title--link) {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0.25rem 1rem;
  }

  &__section-title:not(.mobile-menu__section-title--link)::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 10px;
    border-radius: 50%;
    background: rgb(190 24 93 / 0.75);
    flex-shrink: 0;
  }

  &__section-subtitle {
    margin: 0.375rem 0 0;
    color: rgb(82 82 82);
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 1.35;
  }

  &__section-items {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    margin-top: 0.75rem;
  }

  &__nested-link {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.625rem;
    align-items: start;
    min-height: 44px;
    padding: 0.625rem 0.5rem;
    border: 1px solid transparent;
    border-radius: 12px;
    color: $mobile-menu-text;
    text-decoration: none;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;

    &:hover {
      color: rgb(190 24 93);
      border-color: rgb(236 72 153 / 0.2);
      background: rgb(236 72 153 / 0.06);
    }

    &:active {
      color: $mobile-menu-accent;
      border-color: rgb(236 72 153 / 0.26);
      background: rgb(236 72 153 / 0.12);
    }

    &:focus-visible {
      outline: 3px solid rgb(236 72 153 / 0.22);
      outline-offset: 2px;
    }

    &.router-link-exact-active {
      color: $mobile-menu-accent;
      border-color: rgb(236 72 153 / 0.22);
      background: rgb(236 72 153 / 0.1);
    }
  }

  &__nested-icon {
    display: inline-flex;
    width: 1rem;
    height: 1rem;
    align-items: center;
    justify-content: center;
    margin-top: 0.15rem;
    color: rgb(190 24 93);
    font-size: 0.75rem;
    line-height: 1;
  }

  &__nested-content {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  &__nested-label {
    color: inherit;
    font-size: 0.95rem;
    font-weight: 500;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  &__nested-description {
    margin-top: 0.2rem;
    color: rgb(107 107 107);
    font-size: 0.78rem;
    font-weight: 400;
    line-height: 1.35;
  }
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  .mobile-menu__content {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;

  .mobile-menu__content {
    transform: translateX(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mobile-menu,
  .mobile-menu__close,
  .mobile-menu__link,
  .mobile-menu-enter-active,
  .mobile-menu-leave-active,
  .mobile-menu-enter-active .mobile-menu__content,
  .mobile-menu-leave-active .mobile-menu__content {
    transition: none;
  }

  .mobile-menu-enter-from,
  .mobile-menu-leave-to {
    opacity: 1;

    .mobile-menu__content {
      transform: none;
    }
  }
}

@media (hover: none) {
  .mobile-menu {
    &__section-title--link:hover,
    &__nested-link:hover {
      color: inherit;
      border-color: transparent;
      background: transparent;
    }

    &__section-title--active:hover {
      color: $mobile-menu-accent;
      border-color: rgb(236 72 153 / 0.25);
      background: rgb(236 72 153 / 0.1);
    }

    &__section-title--link:hover::before {
      border-color: rgb(156 163 175);
      background: transparent;
    }

    &__section-title--active:hover::before {
      background: currentcolor;
    }
  }
}
</style>
