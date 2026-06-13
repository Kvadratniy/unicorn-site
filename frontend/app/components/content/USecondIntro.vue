<script setup lang="ts">
type IntroHighlight = {
  title: string
  text: string
}

const props = defineProps<{
  titleId?: string
  title: string
  lead: string
  imageSrc: string
  imageAlt: string
  highlights: readonly IntroHighlight[]
}>()
</script>

<template>
  <section class="intro" :aria-labelledby="props.titleId || undefined">
    <div class="intro__main">
      <div class="intro__content">
        <h1 :id="props.titleId" class="intro__title">
          {{ props.title }}
        </h1>
        <p class="intro__lead">
          {{ props.lead }}
        </p>
        <div class="intro__highlights" aria-label="Преимущества аренды">
          <article
            v-for="item in props.highlights"
            :key="item.title"
            class="highlight"
          >
            <h3 class="highlight__title">{{ item.title }}</h3>
            <p class="highlight__text">{{ item.text }}</p>
          </article>
        </div>
      </div>

      <div class="intro__visual">
        <NuxtImg
          :src="props.imageSrc"
          :alt="props.imageAlt"
          class="intro__image"
          width="420"
          height="420"
          fit="inside"
          loading="lazy"
          decoding="async"
          sizes="xs:70vw lg:420px"
          format="webp"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.intro {
  display: grid;
  gap: 16px;
  padding: 18px;
  border-radius: 20px;

  &__main {
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;
  }

  &__content {
    display: grid;
    gap: 14px;
  }

  &__visual {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    background: var(--u-color-white);
    min-height: 260px;
  }

  &__image {
    width: 70%;
    max-width: 420px;
    height: auto;
    object-fit: contain;
  }

  &__title {
    margin: 0;
    color: var(--u-color-gray-900);
    font-family: 'Suisse Intl', sans-serif;
    font-size: var(--u-font-fluid-display-intro);
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.024em;
  }

  &__lead {
    margin: 0;
    color: var(--u-text-body);
    font-family: var(--u-font-montserrat);
    font-size: var(--u-font-16);
    line-height: 1.65;
  }

  &__highlights {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

.highlight {
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 6px;
  padding: 16px 18px;
  border-radius: 14px;
  box-shadow:
    0 10px 24px var(--u-pink-deep-a10),
    0 1px 0 var(--u-white-a80) inset;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, var(--u-color-pink-deep), var(--u-color-pink));
  }

  &__title {
    margin: 0;
    color: #831843;
    font-family: 'Suisse Intl', sans-serif;
    font-size: var(--u-font-16);
    line-height: 1.3;
  }

  &__text {
    margin: 0;
    color: var(--u-text-body);
    font-family: var(--u-font-montserrat);
    font-size: var(--u-font-13);
    line-height: 1.4;
  }
}

@media (min-width: 1024px) {
  .intro {
    padding: 28px 0;

    &__main {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      align-items: stretch;
      gap: 20px;
    }

    &__visual {
      min-height: 360px;
    }

    &__highlights {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      max-width: 980px;
    }
  }
}
</style>
