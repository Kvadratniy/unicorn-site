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
  <section class="dist-intro" :aria-labelledby="props.titleId || undefined">
    <div class="dist-intro__top">
      <div class="dist-intro__visual">
        <NuxtImg
          :src="props.imageSrc"
          :alt="props.imageAlt"
          class="dist-intro__image"
          width="240"
          height="240"
          fit="inside"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 767px) 30vw, 240px"
          format="webp"
        />
      </div>
      <div class="dist-intro__copy">
        <h2 :id="props.titleId" class="dist-intro__title">
          {{ props.title }}
        </h2>
        <p class="dist-intro__lead">
          {{ props.lead }}
        </p>
      </div>
    </div>

    <div class="dist-intro__cards" aria-label="Услуги дистрибуции">
      <article
        v-for="(item, index) in props.highlights"
        :key="item.title"
        class="dist-intro__card"
      >
        <div class="dist-intro__card-body">
          <span class="dist-intro__card-num" aria-hidden="true">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <h3 class="dist-intro__card-title">{{ item.title }}</h3>
          <p class="dist-intro__card-text">{{ item.text }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.dist-intro {
  display: grid;
  gap: 32px;
  font-family: var(--u-font-montserrat);

  &__top {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  &__copy {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    min-width: 0;
    max-width: 950px;
  }

  &__title {
    margin: 0;
    color: #1a1716;
    font-family: 'Montserrat', sans-serif;
    font-size: var(--u-font-fluid-display-intro);
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -0.025em;
  }

  &__lead {
    margin: 0;
    color: var(--u-text-muted);
    font-size: var(--u-font-16);
    font-family: 'Montserrat', sans-serif;
    line-height: 1.7;
    max-width: 58ch;
  }

  &__visual {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background: var(--u-color-white);
  }

  &__cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }

  &__card {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    border-radius: 18px;
    background: var(--u-color-white);
    border: 1px solid var(--u-black-a06);
    box-shadow: 0 1px 3px var(--u-black-a04);
    transition:
      border-color 0.25s ease,
      box-shadow 0.25s ease;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--u-color-accent);
      opacity: 0.5;
    }

    &:hover {
      border-color: var(--u-pink-a15);
      box-shadow: 0 8px 24px var(--u-pink-a08);
    }
  }

  &__card-body {
    display: grid;
    gap: 10px;
    padding: 24px 22px 22px;
    min-width: 0;
  }

  &__card-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    padding: 4px 9px;
    border-radius: 8px;
    background: var(--u-pink-a06);
    color: var(--u-color-accent);
    font-family: 'Montserrat', sans-serif;
    font-size: var(--u-font-11);
    font-weight: 600;
    letter-spacing: 0.1em;
    line-height: 1;
  }

  &__card-title {
    margin: 0;
    color: #1a1716;
    font-family: 'Montserrat', sans-serif;
    font-size: var(--u-font-17);
    font-weight: 600;
    line-height: 1.38;
    letter-spacing: -0.012em;
  }

  &__card-text {
    margin: 0;
    color: var(--u-text-muted);
    font-size: var(--u-font-15);
    line-height: 1.65;
    letter-spacing: 0.005em;
  }
}

@media (min-width: 640px) {
  .dist-intro {
    &__cards {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }
  }
}

@media (min-width: 768px) {
  .dist-intro {
    gap: 40px;

    &__top {
      grid-template-columns: 250px 1fr;
      gap: 32px;
    }

    &__visual {
      padding: 8px;
    }
  }
}

@media (min-width: 1024px) {
  .dist-intro {
    gap: 44px;

    &__top {
      gap: 40px;
    }

    &__lead {
      font-size: var(--u-font-17);
    }

    &__cards {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
    }

    &__card-body {
      padding: 26px 24px 24px;
    }

    &__card-title {
      font-size: var(--u-font-18);
    }
  }
}

@media (max-width: 639px) {
  .dist-intro {
    gap: 28px;

    &__card-body {
      padding: 20px 18px 18px;
    }
  }
}
</style>
