<script setup lang="ts">
const props = defineProps<{
  isVisible: boolean
  articleStyle: Record<string, string>
  titleLine1: string
  titleLine2: string
  body: string
  imageSrc: string
  imageAlt: string
}>()
</script>

<template>
  <article
    class="mood-hero__article mood-hero-reveal mood-hero-reveal--from-top mood-hero-reveal--0"
    :class="{ 'mood-hero-reveal--in': props.isVisible }"
    :style="props.articleStyle"
  >
    <div class="mood-hero__article-header">
      <span class="mood-hero__article-eyebrow">
        Музыкальная студия
      </span>
      <span class="mood-hero__article-header-divider" />
    </div>

    <h1 class="mood-hero__article-title">
      <span class="mood-hero__article-title-line1">
        {{ props.titleLine1 }}
      </span>
      <br>
      <span class="mood-hero__article-title-line2">
        {{ props.titleLine2 }}
      </span>
    </h1>

    <p class="mood-hero__article-body">
      {{ props.body }}
    </p>

    <NuxtImg
      :src="props.imageSrc"
      :alt="props.imageAlt"
      format="webp"
      class="mood-hero__article-image"
    />
  </article>
</template>

<style scoped lang="scss">
.mood-hero {
  &__article {
    --u-article-surface: rgba(132, 112, 187, 0.291);
    position: relative;
    overflow: hidden;
    background-color: var(--u-article-surface);
    border: 1px solid rgb(36 31 27 / 0.08);
    border-radius: 28px;
    transition: background-color 0.22s ease;

    @media (min-width: 1024px) {
      grid-column-start: 1;
      grid-row-start: 1;
      min-height: 390px;
      border-radius: 30px;
    }
  }

  &__article-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.75rem;
    color: rgb(36 31 27 / 0.7);
  }

  &__article-eyebrow {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    white-space: nowrap;
    letter-spacing: 0.24em;
  }

  &__article-header-divider {
    flex: 1;
    height: 1px;
    background-color: rgb(36 31 27 / 0.2);
  }

  &__article-title {
    margin: 0;
    padding-right: 1.75rem;
    padding-left: 1.75rem;
  }

  &__article-title-line1,
  &__article-title-line2 {
    margin: 0;
    line-height: 1.1;
    letter-spacing: -0.03em;
  }

  &__article-title-line1 {
    font-size: 38px;
    font-weight: 500;
    color: #13110f;
  }

  &__article-title-line2 {
    font-family: 'Druk Wide', sans-serif;
    font-size: clamp(2rem, 10vw, 4.26rem);
    font-weight: 800;
    color: #d24ade9c;
  }

  &__article-body {
    max-width: 34rem;
    margin: 0.5rem 0 0;
    padding-right: 1.75rem;
    padding-bottom: 1.25rem;
    padding-left: 1.75rem;
    font-size: 0.875rem;
    line-height: 1.65;
    color: rgb(36 31 27 / 0.72);
    white-space: pre-line;

    @media (min-width: 640px) {
      font-size: 15px;
    }

    @media (min-width: 1024px) {
      font-size: 1rem;
    }
  }

  &__article-image {
    margin-top: 20px;
    padding-bottom: 0.75rem;
    width: 100%;
  }
}
</style>
