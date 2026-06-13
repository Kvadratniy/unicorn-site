<script setup lang="ts">
type MegaExploreItem = {
  title: string
  to: string
  preview: string
  tone: 'blue' | 'violet' | 'yellow'
}

const props = defineProps<{
  items: MegaExploreItem[]
}>()

const emit = defineEmits<{
  (event: 'select'): void
}>()
</script>

<template>
  <aside class="u-menu-studio-explore">
    <p class="u-menu-studio-title">Новости и материалы</p>
    <ul v-if="items.length" class="u-menu-studio-list">
      <li v-for="article in items" :key="article.title" class="u-menu-studio-list-item">
        <NuxtLink :to="article.to" class="u-menu-studio-link" role="menuitem" @click="emit('select')">
          <span class="u-menu-studio-preview-glyph-wrap" aria-hidden="true" />
          <span class="u-menu-studio-preview">{{ article.title }}</span>
          <svg class="u-menu-studio-link-arrow" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M6 4L10 8L6 12"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.6"
            />
          </svg>
        </NuxtLink>
      </li>
    </ul>
    <p v-else class="u-menu-studio-empty">Пока нет опубликованных материалов</p>
  </aside>
</template>

<style scoped>
.u-menu-studio-explore {
  min-width: 0;
  height: 100%;
  padding-left: 16px;
  border-left: 1px solid var(--u-ink-a08);
}

.u-menu-studio-title {
  margin: 0 0 8px;
  color: var(--u-text-nav-muted);
  font-size: var(--u-font-9);
  font-weight: 700;
  letter-spacing: 1.1px;
  line-height: 9px;
  text-transform: uppercase;
}

.u-menu-studio-list {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
}

.u-menu-studio-empty {
  margin: 0;
  color: var(--u-text-nav-muted);
  font-size: var(--u-font-11);
  line-height: 15px;
}

.u-menu-studio-list-item + .u-menu-studio-list-item {
  border-top: 1px solid rgba(38, 32, 42, 0.07);
}

.u-menu-studio-link {
  display: grid;
  grid-template-columns: 6px minmax(0, 1fr) 14px;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #5f5864;
  border-radius: 8px;
  padding: 8px 6px;
  transition:
    background-color 0.18s ease,
    color 0.18s ease;
}

.u-menu-studio-link:hover,
.u-menu-studio-link:focus-visible {
  background-color: #faf8fb;
  color: var(--u-color-accent);
}

.u-menu-studio-link:focus-visible {
  outline: 2px solid var(--u-accent-a20);
  outline-offset: 2px;
}

.u-menu-studio-preview-glyph-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentcolor;
  opacity: 0.42;
  flex-shrink: 0;
}

.u-menu-studio-preview {
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;
  font-size: var(--u-font-11);
  font-weight: 500;
  line-height: 15px;
  white-space: nowrap;
}

.u-menu-studio-link-arrow {
  width: 14px;
  height: 14px;
  color: #b8b0bd;
  transition:
    color 0.18s ease,
    transform 0.18s ease;
}

.u-menu-studio-link:hover .u-menu-studio-link-arrow,
.u-menu-studio-link:focus-visible .u-menu-studio-link-arrow {
  color: var(--u-color-accent);
  transform: translateX(2px);
}

@media (max-width: 860px) {
  .u-menu-studio-explore {
    padding: 14px 0 0;
    border-top: 1px solid var(--u-ink-a08);
    border-left: 0;
  }
}
</style>