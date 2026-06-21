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

      <UDistributionIntro
        title-id="distribution-intro-title"
        :title="distributionIntro.title"
        :lead="distributionIntro.lead"
        :image-src="distributionIntro.imageSrc"
        :image-alt="distributionIntro.imageAlt"
        :highlights="distributionIntro.highlights"
      />

      <UNeedHelp />

      <UDistributionPackages
        :packages-section="packagesSection"
        :packages="packages"
      />
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

@media (min-width: 900px) {
  .distribution-page {
    gap: 30px;

    &__content {
      gap: 56px;
      padding: 20px 20px 0;
    }
  }
}

@media (max-width: 640px) {
  .distribution-page {
    gap: 22px;

    &__content {
      gap: 36px;
    }
  }
}
</style>
