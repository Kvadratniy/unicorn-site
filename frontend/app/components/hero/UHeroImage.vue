<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    titleId?: string
    titleAccent: string
    titleLine2: string
    description: string
    caption?: string
    imageSrc: string
    imageAlt?: string
    imageWidth?: number
    imageHeight?: number
  }>(),
  {
    caption: '',
    imageAlt: '',
    imageWidth: 840,
    imageHeight: 840,
  }
)

const { open: openContactModal } = useContactModal()
</script>

<template>
  <section
    class="hero-image"
    :aria-labelledby="titleId || undefined"
  >
    <div class="hero-image__bg" aria-hidden="true">
      <div class="hero-image__glow hero-image__glow--left"></div>
      <div class="hero-image__glow hero-image__glow--right"></div>
    </div>

    <div class="hero-image__wrapper">
      <div class="hero-image__heading">
        <h1 :id="titleId" class="hero-image__title">
          <span class="title__line title__line--accent">{{ titleAccent }}</span>{{ ' ' }}<span class="title__line">{{ titleLine2 }}</span>
        </h1>
      </div>

      <div class="hero-image__visual">
        <NuxtImg
          :src="props.imageSrc"
          :alt="props.imageAlt"
          class="hero-image__img"
          :width="props.imageWidth"
          :height="props.imageHeight"
          fetchpriority="high"
          loading="eager"
          decoding="async"
          sizes="(max-width: 768px) 100vw, 60vw"
          format="webp"
        />
      </div>

      <div class="hero-image__body">
        <p class="hero-image__text">
          {{ description }}
        </p>

        <p v-if="caption" class="hero-image__caption">
          {{ caption }}
        </p>

        <div class="hero-image__actions">
          <slot name="actions">
            <UButton variant="hero-primary" @click="openContactModal">
              Бесплатное пробное занятие
            </UButton>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
$desktop: 1024px;

.hero-image {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  padding: 20px 0;
  // background: linear-gradient(
  //   180deg,
  //   #fff 0%,
  //   rgba(255, 255, 255, 0.92) 45%,
  //   rgba(236, 72, 153, 0.16) 100%
  // );

  @media (min-width: $desktop) {
    padding: 0;
    background: linear-gradient(
      90deg,
      rgba(236, 72, 153, 0.1) 0%,
      rgba(236, 72, 153, 0.05) 24%,
      #fff 40%,
      #fff 100%
    );
  }

  &__bg {
    display: none;
  }

  &__wrapper {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      'heading'
      'visual'
      'body';
    padding: 0 16px;

    @media (min-width: $desktop) {
      grid-template-columns: 40% 60%;
      grid-template-areas:
        'heading visual'
        'body visual';
      align-items: center;
      padding: 20px 40px;
    }
  }

  &__heading {
    grid-area: heading;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: flex-end;
  }

  &__body {
    grid-area: body;
    display: flex;
    flex-direction: column;
    gap: 18px;
    max-width: 620px;

    @media (min-width: $desktop) {
      gap: 24px;
    }
  }

  &__title {
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  &__text {
    max-width: 630px;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    line-height: 1.7;
    color: #374151;

    @media (min-width: $desktop) {
      font-size: 16px;
    }
  }

  &__caption {
    max-width: 480px;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #6b7280;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 6px;
  }

  &__visual {
    grid-area: visual;
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    min-height: 240px;
  }

  &__img {
    display: block;
    width: 100%;
    height: auto;
    max-height: 520px;
    object-fit: contain;
    object-position: center bottom;
    user-select: none;

    @media (max-width: 768px) {
      width: min(100%, 360px);
      max-height: 320px;
    }
  }
}

.title {
  &__line {
    display: block;
    font-family: 'Druk Wide', sans-serif;
    font-size: clamp(24px, 6vw, 54px);
    font-weight: 600;
    line-height: 1.1;
    color: #111827;
    text-shadow: none;

    &--accent {
      background: linear-gradient(135deg, #be185d 0%, #ec4899 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
