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
            alt="Unicorn Studio Logo"
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
  height: 100dvh;
  max-height: 100dvh;
  background: var(--u-neutral-a60);
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
    height: 100dvh;
    max-height: 100dvh;
    flex-direction: column;
    padding: 0;
    overflow-y: auto;
    background: var(--u-color-white);
    font-family: var(--u-font-montserrat);
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }

  &__header {
    z-index: 10;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 2px solid var(--u-black-a06);
  }

  &__logo {
    width: auto;
    height: 55px;
    object-fit: contain;
  }

  &__nav {
    display: flex;
    min-height: 0;
    flex: 1 1 0;
    flex-direction: column;
    gap: 14px;
    padding: 16px 20px 64px;
    overflow-y: auto;
    overscroll-behavior: contain;
    touch-action: pan-y;
  }

  &__section {
    border: 1px solid var(--u-black-a06);
    border-radius: 16px;
    background: linear-gradient(180deg, var(--u-color-white) 0%, #fdfcfe 100%);
  }

  &__section-title {
    margin: 0;
    color: $mobile-menu-text;
    font-size: var(--u-font-16);
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
    padding: 8px 16px;
    border: 1px solid transparent;
    border-radius: 12px;
    transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;

    &:hover {
      border-color: var(--u-pink-a24);
      background: var(--u-pink-a08);
      color: rgb(190 24 93);
    }

    &:active {
      color: $mobile-menu-accent;
      border-color: var(--u-pink-a28);
      background: var(--u-pink-a14);
    }

    &:focus-visible {
      outline: 3px solid var(--u-pink-a22);
      outline-offset: 2px;
    }
  }

  &__section-title--active {
    color: $mobile-menu-accent;
    border-color: var(--u-pink-a25);
    background: var(--u-pink-a10);
    font-weight: 700;
  }

  &__section-title--active:hover {
    color: rgb(190 24 93);
    border-color: var(--u-pink-a30);
    background: var(--u-pink-a14);
  }

  &__section-title--active:active {
    border-color: var(--u-pink-a35);
    background: var(--u-pink-a18);
  }

  &__section-title--active:focus-visible {
    outline: 3px solid var(--u-pink-a25);
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
    border-color: var(--u-pink-deep-a70);
    background: var(--u-pink-a20);
  }

  &__section-title--active:hover::before {
    background: currentcolor;
  }

  &__section-title--link:active::before {
    border-color: var(--u-pink-deep-a80);
    background: var(--u-pink-a28);
  }

  &__section-title--active:active::before {
    background: currentcolor;
  }

  &__section-title--link:focus-visible::before {
    border-color: var(--u-pink-deep-a80);
  }

  &__section-title--active:focus-visible::before {
    background: currentcolor;
  }

  &__section-title:not(.mobile-menu__section-title--link) {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 4px 16px;
  }

  &__section-title:not(.mobile-menu__section-title--link)::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 10px;
    border-radius: 50%;
    background: var(--u-pink-deep-a75);
    flex-shrink: 0;
  }

  &__section-items {
    display: flex;
    flex-direction: column;
    gap: 4.8px;
    margin-top: 12px;
  }

  &__nested-link {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
    align-items: start;
    min-height: 44px;
    padding: 10px 8px;
    border: 1px solid transparent;
    border-radius: 12px;
    color: $mobile-menu-text;
    text-decoration: none;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;

    &:hover {
      color: rgb(190 24 93);
      border-color: var(--u-pink-a20);
      background: var(--u-pink-a06);
    }

    &:active {
      color: $mobile-menu-accent;
      border-color: var(--u-pink-a26);
      background: var(--u-pink-a12);
    }

    &:focus-visible {
      outline: 3px solid var(--u-pink-a22);
      outline-offset: 2px;
    }

    &.router-link-exact-active {
      color: $mobile-menu-accent;
      border-color: var(--u-pink-a22);
      background: var(--u-pink-a10);
    }
  }

  &__nested-icon {
    display: inline-flex;
    width: 16px;
    height: 16px;
    align-items: center;
    justify-content: center;
    margin-top: 2.4px;
    color: rgb(190 24 93);
    font-size: var(--u-font-12);
    line-height: 1;
  }

  &__nested-content {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  &__nested-label {
    color: inherit;
    font-size: var(--u-font-15);
    font-weight: 500;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  &__nested-description {
    margin-top: 3.2px;
    color: rgb(107 107 107);
    font-size: var(--u-font-12);
    font-weight: 400;
    line-height: 1.35;
  }
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s var(--u-ease-standard);

  .mobile-menu__content {
    transition: transform 0.3s var(--u-ease-standard);
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
      border-color: var(--u-pink-a25);
      background: var(--u-pink-a10);
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
