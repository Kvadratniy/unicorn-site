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
<style scoped>
.u-menu-studio-feature-item {
  display: grid;
  min-height: 52px;
  grid-template-columns: 16px minmax(0, 1fr) 14px;
  gap: 10px;
  align-items: start;
  padding: 12px 12px;
  color: inherit;
  text-decoration: none;
  transition:
    background-color 0.18s ease,
    color 0.18s ease;
}

.u-menu-studio-feature-item:hover,
.u-menu-studio-feature-item:focus-visible,
.u-menu-studio-feature-item-active {
  background-color: #faf8fb;
}

.u-menu-studio-feature-item:focus-visible {
  outline: 2px solid rgba(201, 54, 134, 0.2);
  outline-offset: 2px;
}

.u-menu-studio-feature-index {
  display: block;
  padding-top: 1px;
  color: #b6aeb9;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.6px;
  line-height: 15px;
  text-align: left;
}

.u-menu-studio-feature-copy {
  min-width: 0;
  overflow: hidden;
}

.u-menu-studio-feature-title,
.u-menu-studio-feature-description {
  display: block;
}

.u-menu-studio-feature-title {
  overflow: hidden;
  color: #26202a;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.1px;
  line-height: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.u-menu-studio-feature-description {
  display: -webkit-box;
  margin-top: 4px;
  color: #756f7a;
  width: 200px;
  font-size: 10px;
  line-height: 14px;
  text-transform: none;
}

.u-menu-studio-feature-arrow {
  width: 14px;
  height: 14px;
  margin-top: 1px;
  color: #b8b0bd;
  transition:
    color 0.18s ease,
    transform 0.18s ease;
}

.u-menu-studio-feature-item:hover .u-menu-studio-feature-arrow,
.u-menu-studio-feature-item:focus-visible .u-menu-studio-feature-arrow {
  color: #c93686;
  transform: translateX(2px);
}

.u-menu-studio-title {
  margin: 0 0 8px;
  color: #8b8590;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.1px;
  line-height: 9px;
  text-transform: uppercase;
}

.u-menu-studio-column {
  min-width: 0;
}

.u-menu-studio-list {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
}

.u-menu-studio-list-item + .u-menu-studio-list-item {
  border-top: 1px solid rgba(38, 32, 42, 0.07);
}
</style>