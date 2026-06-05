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
  row-gap: 2.5rem;
  column-gap: 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 3rem;
    column-gap: 2rem;
  }
}

.teacher-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 1.25rem;
  align-items: flex-start;
  opacity: 0;
  transform: scale(0.7);
  transition:
    opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);

  @media (min-width: 640px) {
    gap: 1.5rem;
  }

  &.is-visible {
    opacity: 1;
    transform: scale(1);
    transition-delay: calc(var(--i, 0) * 150ms);

    &:hover {
      opacity: 0.85;
    }
  }

  &__avatar {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 130px;
    height: 130px;
    overflow: hidden;
    background: linear-gradient(to bottom right, rgb(0 0 0 / 4%), rgb(0 0 0 / 2%));
    border-radius: 20px;
    box-shadow: 0 4px 16px rgb(0 0 0 / 6%);

    @media (min-width: 640px) {
      width: 180px;
      height: 180px;
      border-radius: 24px;
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
    font-size: 32px;
    color: #86868b;

    @media (min-width: 640px) {
      font-size: 40px;
    }
  }

  &__body {
    display: grid;
    gap: 0.375rem;
    min-width: 0;
    padding-top: 0.25rem;
  }

  &__name {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.25;
    color: #1d1d1f;

    @media (min-width: 640px) {
      font-size: 22px;
    }
  }

  &__role,
  &__description {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
  }

  &__role {
    font-size: 13px;
    font-weight: 500;
    line-height: 1.4;
    color: #86868b;
    letter-spacing: 0.025em;
    text-transform: uppercase;
  }

  &__descriptions {
    display: grid;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  &__description {
    max-width: 56ch;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: -0.006em;

    &--primary {
      color: #424245;
    }

    &--secondary {
      font-size: 0.875rem;
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
