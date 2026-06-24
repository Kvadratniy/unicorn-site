<script setup lang="ts">
import { useNavigation } from '~/composables/useNavigation'

type MenuItem = {
  label: string
  to: string
}

type NestedMobileMenuItem = {
  label: string
  description?: string
  icon?: string
  to: string
}

type MobileMenuItem = {
  label: string
  subtitle?: string
  to?: string
  items?: NestedMobileMenuItem[]
}

const DESKTOP_BREAKPOINT_PX = 960

const route = useRoute()
const { open: openContactModal } = useContactModal()
const { entries: navigationEntries } = await useNavigation()

const mobileMenuItems = computed<MobileMenuItem[]>(() =>
  navigationEntries.value
    .map((entry) => {
      const nestedItems = (entry.items || [])
        .filter(item => typeof item.src === 'string' && item.src.length > 0)
        .map(item => ({
          label: item.title,
          description: item.description,
          icon: item.icon,
          to: item.src,
        }))

      const link = typeof entry.to === 'string' && entry.to.length > 0 ? entry.to : undefined
      return {
        label: entry.label,
        subtitle: entry.subtitle,
        to: link,
        items: nestedItems.length ? nestedItems : undefined,
      }
    })
    .filter(item => Boolean(item.to) || Boolean(item.items?.length)),
)

const isMobileMenuOpen = ref(false)

const lockPageScroll = (locked: boolean) => {
  document.body.style.overflow = locked ? 'hidden' : ''
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleContactClick = () => {
  closeMobileMenu()
  openContactModal()
}

const closeMobileMenuOnDesktop = () => {
  if (window.innerWidth > DESKTOP_BREAKPOINT_PX && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  window.addEventListener('resize', closeMobileMenuOnDesktop)
})

onUnmounted(() => {
  window.removeEventListener('resize', closeMobileMenuOnDesktop)
  lockPageScroll(false)
})

watch(
  () => route.path,
  () => {
    closeMobileMenu()
  },
)

watch(isMobileMenuOpen, lockPageScroll)

</script>

<template>
  <header class="u-headline">
    <div class="u-headline__bar">
      <ULogo />

      <UNav />

      <div class="u-headline__actions">
        <UContact @contact="handleContactClick" />

        <UBurgerButton :open="isMobileMenuOpen" @toggle="toggleMobileMenu" />
      </div>
    </div>

    <UMobileNav :open="isMobileMenuOpen" :items="mobileMenuItems" @close="closeMobileMenu" />
  </header>
</template>

<style scoped lang="scss">
$headline-bar-border: rgba(36, 31, 27, 0.07);
$headline-bar-surface: rgba(255, 255, 255, 0.92);
$headline-action-text: #332d36;
$headline-action-border: var(--u-headline-ink-a12);
$headline-action-surface: #fbfafb;
$headline-action-hover: #f8f3f7;
$headline-action-focus: var(--u-accent-a18);
$headline-mobile-breakpoint: 640px;
$headline-desktop-breakpoint: 1000px;

.u-headline {
  position: relative;
  z-index: 40;
  width: 100%;
  padding: 14px 16px;

  @media (max-width: $headline-mobile-breakpoint) {
    padding: 10px 12px;
  }

  &__bar {
    position: relative;
    display: grid;
    width: 100%;
    max-width: 1500px;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 16px;
    margin: 0 auto;
    padding: 8px 16px;
    border: 1px solid $headline-bar-border;
    border-radius: 14px;
    background-color: $headline-bar-surface;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.02);

    // blur вынесен на псевдоэлемент: backdrop-filter на самом баре создаёт
    // stacking context и прячет бургер (z-index: 101) под мобильным меню.
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
      border-radius: inherit;
      backdrop-filter: blur(16px);
    }

    @media (max-width: $headline-mobile-breakpoint) {
      gap: 10px;
      padding: 8px 12px;
    }
  }

  &__actions {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;

    @media (min-width: $headline-desktop-breakpoint) {
      padding-left: 14px;
      border-left: 1px solid rgba(51, 45, 54, 0.06);
    }

    :deep(.u-burger-button) {
      width: 38px;
      height: 38px;
      border-color: $headline-action-border;
      background-color: var(--u-pink-deep-a70);
      transition:
        background-color 180ms ease,
        border-color 180ms ease;

      &:hover {
        border-color: rgba(51, 45, 54, 0.18);
        background-color: var(--u-pink-deep-a80);
      }

      &:focus-visible {
        outline: 3px solid $headline-action-focus;
        outline-offset: 2px;
      }
    }

    :deep(.u-burger-button__line) {
      background-color: white;
    }
  }
}
</style>
