<script setup lang="ts">
type MegaFeatureItem = {
  title: string
  description: string
  icon: string
  src: string
}

const props = defineProps<{
  title: string
  items: MegaFeatureItem[]
}>()

const emit = defineEmits<{
  (event: 'select'): void
}>()
</script>

<template>
  <section class="u-menu-studio-column">
    <p class="u-menu-studio-title">{{ props.title }}</p>

    <ul class="u-menu-studio-list">
      <li v-for="(feature, index) in items" :key="feature.title" class="u-menu-studio-list-item">
        <NuxtLink
          :to="feature.src"
          class="u-menu-studio-feature-item"
          @click="emit('select')"
        >
          <span class="u-menu-studio-feature-index" aria-hidden="true">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <span class="u-menu-studio-feature-copy">
            <span class="u-menu-studio-feature-title">{{ feature.title }}</span>
            <span class="u-menu-studio-feature-description">{{ feature.description }}</span>
          </span>
          <svg class="u-menu-studio-feature-arrow" viewBox="0 0 16 16" aria-hidden="true">
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
  </section>
</template>
<style scoped lang="scss">
$accent: var(--u-color-accent);

.u-menu-studio-column {
  min-width: 0;

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

    &-item + &-item {
      border-top: 1px solid var(--u-ink-a07);
    }
  }

  .u-menu-studio-feature-item {
    display: grid;
    grid-template-columns: 16px minmax(0, 1fr) 14px;
    gap: 10px;
    align-items: start;
    min-height: 52px;
    padding: 12px;
    color: inherit;
    text-decoration: none;
    transition: background-color 0.18s ease, color 0.18s ease;

    &:hover,
    &:focus-visible,
    &.router-link-active {
      background-color: #faf8fb;
    }

    &:focus-visible {
      outline: 2px solid var(--u-accent-a20);
      outline-offset: 2px;
    }

    &:hover,
    &:focus-visible {
      .u-menu-studio-feature-arrow {
        color: $accent;
        transform: translateX(2px);
      }
    }
  }

  .u-menu-studio-feature-index {
    display: block;
    padding-top: 1px;
    color: #b6aeb9;
    font: 600 9px/15px inherit;
    letter-spacing: 0.6px;
  }

  .u-menu-studio-feature-copy {
    min-width: 0;
    overflow: hidden;
  }

  .u-menu-studio-feature-title {
    display: block;
    overflow: hidden;
    color: #26202a;
    font: 600 12px/15px inherit;
    letter-spacing: -0.1px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .u-menu-studio-feature-description {
    display: -webkit-box;
    width: 200px;
    margin-top: 4px;
    color: #756f7a;
    font-size: var(--u-font-10);
    line-height: 14px;
  }

  .u-menu-studio-feature-arrow {
    width: 14px;
    height: 14px;
    margin-top: 1px;
    color: #b8b0bd;
    transition: color 0.18s ease, transform 0.18s ease;
  }
}
</style>