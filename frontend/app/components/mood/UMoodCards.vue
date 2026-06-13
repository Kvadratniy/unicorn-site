<script setup lang="ts">
import { NuxtLink } from '#components'
import { computed } from 'vue'

export type MoodCard = {
  title: string
  tag: string
  imageSrc: string
  imageAlt: string
}

const props = defineProps<{
  card: MoodCard
  /** Если задано — карточка ведёт на страницу (например новость) */
  to?: string
}>()

const rootIs = computed(() => (props.to ? NuxtLink : 'div'))
const rootBind = computed(() => (props.to ? { to: props.to } : {}))
</script>

<template>
  <component
    :is="rootIs"
    v-bind="rootBind"
    class="u-article-mood"
    :class="{ 'u-article-mood--link': props.to }"
  >
    <article class="u-article-mood__card">
      <NuxtImg
        :src="props.card.imageSrc"
        :alt="props.card.imageAlt"
        width="420"
        height="340"
        format="webp"
        loading="lazy"
        class="u-article-mood__image"
      />
      <div class="u-article-mood__overlay" />
      <div class="u-article-mood__content">
        <span class="u-article-mood__tag">
          {{ props.card.tag }}
        </span>
        <span class="u-article-mood__title">
          {{ props.card.title }}
        </span>
      </div>
    </article>
  </component>
</template>

<style scoped lang="scss">
$lg: 1024px;
$sm: 640px;

.u-article-mood {
  display: block;
  border-radius: 28px;
  outline: none;

  @media (min-width: $lg) {
    border-radius: 30px;
  }

  &--link {
    cursor: pointer;
    text-decoration: none;

    &:focus-visible {
      box-shadow:
        0 0 0 2px rgb(255 255 255 / 90%),
        0 0 0 4px rgb(23 23 23 / 30%);
    }
  }

  &__card {
    position: relative;
    min-height: 180px;
    overflow: hidden;
    background: #b8b7b1;
    border-radius: 28px;
    max-height: 300px;

    @media (min-width: $sm) {
      min-height: 210px;
    }

    @media (min-width: $lg) {
      min-height: 208px;
      border-radius: 30px;
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgb(17 15 13 / 5%),
      rgb(17 15 13 / 52%)
    );
  }

  &__content {
    position: absolute;
    right: 18px;
    bottom: 18px;
    left: 18px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: var(--u-color-white);
  }

  &__tag {
    font-size: var(--u-font-fluid-display-card-tag);
    font-weight: 500;
    line-height: 0.98;
    letter-spacing: -0.04em;
  }

  &__title {
    font-size: var(--u-font-13);
    line-height: 1.35;
    color: rgb(255 255 255 / 82%);
  }
}
</style>
