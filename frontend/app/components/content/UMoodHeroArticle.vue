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
      </span>{{ ' ' }}<br aria-hidden="true"><span class="mood-hero__article-title-line2">
        {{ props.titleLine2 }}
      </span>
    </h1>

    <p class="mood-hero__article-body">
      {{ props.body }}
    </p>

    <NuxtImg
      :src="props.imageSrc"
      :alt="props.imageAlt"
      width="800"
      sizes="sm:100vw md:800px"
      class="mood-hero__article-image"
    />
  </article>
</template>

<style scoped lang="scss">
.mood-hero {
  &__article {
    position: relative;
    overflow: hidden;
    background-color: var(--u-article-surface);
    border: 1px solid var(--u-article-ink-a08);
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
    gap: 12px;
    padding: 16px 28px;
    color: var(--u-article-ink-a70);
  }

  &__article-eyebrow {
    font-size: var(--u-font-10);
    font-weight: 700;
    text-transform: uppercase;
    white-space: nowrap;
    letter-spacing: 0.24em;
  }

  &__article-header-divider {
    flex: 1;
    height: 1px;
    background-color: var(--u-article-ink-a20);
  }

  &__article-title {
    margin: 0;
    padding-right: 28px;
    padding-left: 28px;
  }

  &__article-title-line1,
  &__article-title-line2 {
    margin: 0;
    line-height: 1.1;
    letter-spacing: -0.03em;
  }

  &__article-title-line1 {
    font-size: var(--u-font-38);
    font-weight: 500;
    color: #13110f;
  }

  &__article-title-line2 {
    font-family: 'Druk Wide', sans-serif;
    font-size: var(--u-font-fluid-display-mood);
    font-weight: 800;
    color: #d24ade9c;
  }

  &__article-body {
    max-width: 544px;
    margin: 8px 0 0;
    padding-right: 28px;
    padding-bottom: 20px;
    padding-left: 28px;
    font-size: var(--u-font-14);
    line-height: 1.65;
    color: var(--u-article-ink-a72);
    white-space: pre-line;

    @media (min-width: 640px) {
      font-size: var(--u-font-15);
    }

    @media (min-width: 1024px) {
      font-size: var(--u-font-16);
    }
  }

  &__article-image {
    margin-top: 20px;
    padding-bottom: 12px;
    width: 100%;
  }
}
</style>
