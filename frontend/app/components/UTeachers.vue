<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

type Teacher = {
  name: string
  role: string
  description?: string[]
  image?: string
}

type Props = {
  title?: string
  subtitle: string
  teachers: Teacher[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Тренеры',
})

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(
  sectionRef,
  ([entry]) => {
    if (entry?.isIntersecting) {
      isVisible.value = true
    }
  },
  {
    threshold: 0.1,
  }
)

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
</script>

<template>
  <div>
    <UTitle
      title-id="guitar-teacher-title"
      :title="title"
      :subtitle="subtitle"
    />

    <ul ref="sectionRef" class="teachers-list" role="list">
      <li
        v-for="(t, i) in teachers"
        :key="i"
        class="teacher-card"
        :class="{ 'is-visible': isVisible }"
        :style="{ '--i': i }"
        role="listitem"
      >
        <div class="teacher-card__avatar" aria-hidden="true">
          <NuxtImg
            v-if="t.image"
            :src="t.image"
            :alt="t.name"
            loading="lazy"
            class="teacher-card__image"
            width="180"
            height="180"
            format="webp"
          />
          <span v-else class="teacher-card__initials">
            {{ initials(t.name) }}
          </span>
        </div>

        <div class="teacher-card__body">
          <h3 class="teacher-card__name">
            {{ t.name }}
          </h3>
          <p class="teacher-card__role">
            {{ t.role }}
          </p>
          <div v-if="t.description" class="teacher-card__descriptions">
            <p
              v-for="(desc, idx) in t.description"
              :key="idx"
              class="teacher-card__description"
              :class="idx === 0 ? 'teacher-card__description--primary' : 'teacher-card__description--secondary'"
            >
              {{ desc }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.teachers-list {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  row-gap: 40px;
  column-gap: 24px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 48px;
    column-gap: 32px;
  }
}

.teacher-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 20px;
  align-items: flex-start;
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.6s var(--u-ease-standard),
    transform 0.6s var(--u-ease-standard);

  @media (min-width: 640px) {
    gap: 24px;
  }

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
    transition-delay: calc(var(--i, 0) * 120ms);
  }

  &__avatar {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 130px;
    height: 130px;
    overflow: hidden;
    background: linear-gradient(to bottom right, rgb(0 0 0 / 3%), rgb(0 0 0 / 1%));
    border-radius: 20px;
    box-shadow: 0 2px 10px rgb(0 0 0 / 5%);

    @media (min-width: 640px) {
      width: 180px;
      height: 180px;
      border-radius: 22px;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__initials,
  &__name {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif;
    font-weight: 600;
    letter-spacing: -0.025em;
  }

  &__initials {
    font-size: var(--u-font-32);
    color: var(--u-text-secondary);

    @media (min-width: 640px) {
      font-size: var(--u-font-40);
    }
  }

  &__body {
    display: grid;
    gap: 6px;
    min-width: 0;
    padding-top: 4px;
  }

  &__name {
    margin: 0;
    font-size: var(--u-font-20);
    line-height: 1.25;
    color: var(--u-text-primary);

    @media (min-width: 640px) {
      font-size: var(--u-font-22);
    }
  }

  &__role,
  &__description {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
  }

  &__role {
    font-size: var(--u-font-12);
    font-weight: 600;
    line-height: 1.4;
    color: var(--u-color-accent);
    opacity: 0.65;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  &__descriptions {
    display: grid;
    gap: 12px;
    margin-top: 8px;
  }

  &__description {
    max-width: 56ch;
    font-size: var(--u-font-15);
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: -0.006em;

    &--primary {
      color: #424245;
    }

    &--secondary {
      font-size: var(--u-font-14);
      color: #6e6e73;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .teacher-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
