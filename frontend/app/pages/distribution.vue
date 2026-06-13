<script setup lang="ts">
import { useDistribution } from '~/composables/pages/useDistribution'
import { createDistributionServiceSchema } from '~/composables/useSchemas'

usePageSeo({
  title: 'Музыкальная дистрибуция в Ставрополе — выпуск и монетизация музыки от Unicorn Studio',
  description:
    'Поможем выпустить трек на Spotify, Apple Music, Яндекс Музыку и VK Музыку: подготовка релиза, проверка метаданных, оформление карточки артиста и запуск монетизации. Выпуск песни от 3 дней.',
  keywords:
    'музыкальная дистрибуция ставрополь, выпуск трека, выпуск песни на площадки, монетизация музыки, релиз на spotify, релиз на apple music, релиз на яндекс музыке, релиз на вк музыке, продвижение артиста, подготовка релиза',
})

const { open: openContactModal } = useContactModal()

const {
  hero,
  intro: distributionIntro,
  packagesSection,
  packages,
} = await useDistribution('distribution-content')

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string
const pageUrl = `${siteUrl}/distribution`

const serviceSchema = computed(() =>
  createDistributionServiceSchema({
    siteUrl,
    pageUrl,
    packagesTitle: packagesSection.value.title,
    packages: packages.value,
  }),
)

useHead({
  script: computed(() => [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(serviceSchema.value),
    },
  ]),
})
</script>

<template>
  <div class="distribution-page">
    <UHeroImage
      title-id="distribution-hero-title"
      :title-accent="hero.titleAccent"
      :title-line2="hero.titleLine2"
      :description="hero.description"
      :image-src="hero.imageSrc"
      :image-alt="hero.imageAlt"
    >
      <template #actions>
        <UButton variant="hero-primary" @click="openContactModal">
          Обсудить релиз
        </UButton>
      </template>
    </UHeroImage>

    <div class="distribution-page__content">
      <UBreadcrumbs class="distribution-page__breadcrumbs" />

      <USecondIntro
        title-id="distribution-intro-title"
        :title="distributionIntro.title"
        :lead="distributionIntro.lead"
        :image-src="distributionIntro.imageSrc"
        :image-alt="distributionIntro.imageAlt"
        :highlights="distributionIntro.highlights"
      />

      <section class="distribution-packages" aria-labelledby="distribution-packages-title">
        <header class="distribution-packages__header">
          <p class="distribution-packages__eyebrow">{{ packagesSection.eyebrow }}</p>
          <h2 id="distribution-packages-title" class="distribution-packages__title">
            {{ packagesSection.title }}
          </h2>
          <p class="distribution-packages__subtitle">
            {{ packagesSection.subtitle }}
          </p>
        </header>

        <div class="distribution-packages__grid">
          <article v-for="pkg in packages" :key="pkg.name" class="distribution-package-card">
            <h3 class="distribution-package-card__title">{{ pkg.name }}</h3>
            <p class="distribution-package-card__subtitle">{{ pkg.subtitle }}</p>
            <p class="distribution-package-card__description">{{ pkg.description }}</p>
            <ul class="distribution-package-card__list">
              <li v-for="bullet in pkg.bullets" :key="bullet" class="distribution-package-card__item">
                {{ bullet }}
              </li>
            </ul>
            <p class="distribution-package-card__price">{{ pkg.cta }}</p>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.distribution-page {
  display: flex;
  flex-direction: column;
  gap: 26px;
  padding-bottom: 20px;
  font-family: var(--u-font-montserrat);

  &__content {
    display: flex;
    flex-direction: column;
    gap: 44px;
    padding: 4px 4px 0;
  }

  &__breadcrumbs {
    margin-top: 2px;
  }
}

.distribution-packages {
  display: grid;
  gap: 22px;

  &__header {
    display: grid;
    gap: 10px;
    max-width: 72ch;
  }

  &__eyebrow {
    margin: 0;
    color: #be185d;
    font-size: var(--u-font-12);
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  &__title {
    margin: 0;
    font-family: 'Suisse Intl', sans-serif;
    font-size: var(--u-font-fluid-display-page);
    font-weight: 600;
    line-height: 1.17;
    letter-spacing: -0.023em;
    color: var(--u-color-gray-900);
  }

  &__subtitle {
    margin: 0;
    color: var(--u-text-body);
    font-size: var(--u-font-16);
    line-height: 1.6;
  }

  &__grid {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
  }
}

.distribution-package-card {
  display: grid;
  gap: 12px;
  padding: 22px 20px;
  border: 1px solid var(--u-gray-900-a08);
  border-radius: 18px;
  background: var(--u-color-white);
  box-shadow: 0 10px 28px var(--u-slate-a04);

  &__title {
    margin: 0;
    color: var(--u-color-gray-900);
    font-size: var(--u-font-23);
    line-height: 1.2;
    letter-spacing: -0.02em;
    font-family: 'Suisse Intl', sans-serif;
  }

  &__subtitle {
    margin: 0;
    color: #be185d;
    font-size: var(--u-font-14);
    font-weight: 600;
    line-height: 1.4;
  }

  &__description {
    margin: 0;
    color: #374151;
    font-size: var(--u-font-15);
    line-height: 1.58;
  }

  &__list {
    margin: 2px 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 8px;
  }

  &__item {
    position: relative;
    padding-left: 16px;
    color: #1f2937;
    font-size: var(--u-font-14);
    line-height: 1.46;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #f472b6;
    }
  }

  &__price {
    margin: 6px 0 0;
    color: var(--u-color-gray-900);
    font-size: var(--u-font-14);
    font-weight: 600;
  }
}

@media (min-width: 900px) {
  .distribution-page {
    gap: 30px;

    &__content {
      gap: 56px;
      padding: 20px 20px 0;
    }
  }

  .distribution-packages__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .distribution-page {
    gap: 22px;

    &__content {
      gap: 36px;
    }
  }

  .distribution-package-card {
    border-radius: 14px;
    padding: 18px;

    &__title {
      font-size: var(--u-font-20);
    }
  }
}
</style>
