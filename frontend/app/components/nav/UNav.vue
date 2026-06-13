<script setup lang="ts">
import type { MenuItem as MenuItemType, MenuLinkItem as MenuLinkItemType } from '~/components/nav/menu'
import { useNavigation } from '~/composables/useNavigation'
import { useNews } from '~/composables/useNews'

const route = useRoute()

type DropdownNavItem = {
  type: 'dropdown'
  label: string
  subtitle?: string
  items: MenuItemType[]
  links: MenuLinkItemType[]
}

type LinkNavItem = {
  type: 'link'
  label: string
  to: string
}

type TextNavItem = {
  type: 'text'
  label: string
}

type NavItem = DropdownNavItem | LinkNavItem | TextNavItem

const { entries: navigationEntries } = await useNavigation()
const { getNewsArticles } = useNews()

const { data: latestNews } = await useAsyncData(
  'nav-latest-news',
  async () => {
    const articles = await getNewsArticles()
    return articles.slice(0, 4)
  },
  { default: () => [] },
)

const latestNewsLinks = computed<MenuLinkItemType[]>(() =>
  (latestNews.value || []).map(article => ({
    title: article.title,
    to: `/news/${article.id}`,
    preview: '◉',
    tone: 'violet',
  })),
)

const menuItems = computed<NavItem[]>(() =>
  navigationEntries.value.map((entry) => {
    if (entry.items?.length) {
      return {
        type: 'dropdown',
        label: entry.label,
        subtitle: entry.subtitle,
        items: entry.items,
        links: latestNewsLinks.value,
      }
    }

    if (entry.to) {
      return {
        type: 'link',
        label: entry.label,
        to: entry.to,
      }
    }

    return {
      type: 'text',
      label: entry.label,
    }
  }),
)

const isActiveLink = (to: string) => route.path === to
</script>

<template>
  <nav class="u-nav" aria-label="Основная навигация">
    <template v-for="item in menuItems" :key="item.label">
      <UDropdownNav
        v-if="item.type === 'dropdown'"
        :label="item.label"
        :subtitle="item.subtitle"
        :items="item.items"
        :links="item.links"
        class="u-nav__link"
      />

      <NuxtLink
        v-else-if="item.type === 'link'"
        :to="item.to"
        class="u-nav__link"
        :class="{ 'u-nav__link--active': isActiveLink(item.to) }"
      >
        {{ item.label }}
      </NuxtLink>

      <span v-else class="u-nav__link">
        {{ item.label }}
      </span>
    </template>
  </nav>
</template>

<style scoped lang="scss">
$nav-link-color: #3c3740;
$nav-link-active-color: var(--u-color-accent);
$nav-link-hover-bg: #fbf6fc;
$nav-link-active-bg: transparent;
$nav-link-hover-border: rgba(201, 54, 134, 0.1);
$nav-link-focus-ring: var(--u-accent-a20);

.u-nav {
  display: none;
  min-width: 0;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media (min-width: 1000px) {
    display: flex;
  }

  @media (min-width: 1000px) and (max-width: 1180px) {
    gap: 8px;
  }
}

.u-nav__link {
  position: relative;
  display: inline-flex;
  min-height: 34px;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border: 1px solid transparent;
  border-radius: 9999px;
  color: $nav-link-color;
  font-family: var(--u-font-montserrat);
  font-size: var(--u-font-12);
  font-weight: 450;
  line-height: 14px;
  text-decoration: none;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.9px;
  transition:
    background-color 220ms ease,
    border-color 220ms ease,
    color 220ms ease;

  &:deep(button) {
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: -8px -32px;
    padding: 8px 32px;
    border-radius: inherit;
    color: inherit;
    cursor: pointer;
    font: inherit;
    letter-spacing: inherit;
    line-height: inherit;
    text-transform: inherit;
  }

  &:hover {
    border-color: $nav-link-hover-border;
    background-color: $nav-link-hover-bg;
    color: $nav-link-active-color;
  }

  &:focus-visible,
  &:has(:focus-visible) {
    outline: 3px solid $nav-link-focus-ring;
    outline-offset: 2px;
  }

  &--active {
    border-color: transparent;
    color: $nav-link-active-color;
    background-color: $nav-link-active-bg;
    font-weight: 500;

    &::after {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      border-radius: 9999px;
      background-color: currentcolor;
      content: '';
    }
  }

  &--active:hover {
    border-color: transparent;
    background-color: transparent;
  }

  @media (min-width: 961px) and (max-width: 1180px) {
    min-height: 32px;
    padding-inline: 9px;
    font-size: var(--u-font-11);
    letter-spacing: 0.7px;

    &:deep(button) {
      margin-inline: -9px;
      padding-inline: 9px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
</style>
