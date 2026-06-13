<script setup lang="ts">
import { useStudio } from '~/composables/pages/useStudio'
import { createStudioLocalBusinessSchema, createStudioServiceSchema } from '~/composables/useSchemas'

usePageSeo({
  title: 'Студия звукозаписи Юникорн',
  description:
    'Запись песни в Ставрополе в студии Юникорн: запись вокала и инструментов, сведение, мастеринг и аранжировка. От идеи до релиза.',
  keywords:
    'студия звукозаписи ставрополь, запись песни ставрополь, запись песни под ключ, запись вокала ставрополь, запись инструментов, сведение треков ставрополь, мастеринг ставрополь, аранжировка на заказ, профессиональная запись звука, саунд-дизайн, коррекция вокала, дикторская озвучка',
})

const { open: openContactModal } = useContactModal()
const { hero, main, services, clients, audience } = await useStudio('studio-content')

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string
const pageUrl = `${siteUrl}/studio`

const serviceSchema = computed(() =>
  createStudioServiceSchema({
    siteUrl,
    pageUrl,
    servicesTitle: services.value.title,
    services: services.value.items,
  }),
)
const studioLocalBusinessSchema = createStudioLocalBusinessSchema(siteUrl, pageUrl)

useHead({
  script: computed(() => [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(studioLocalBusinessSchema),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(serviceSchema.value),
    },
  ]),
})
</script>

<template>
  <UPageWrapper>
    <template #hero>
      <UHero
        :image-src="hero.imageSrc"
        :video-src="hero.videoSrc"
        show-loader-until-ready
        title-id="studio-hero-title"
        :title-accent="hero.title"
        :title-line2="hero.line2"
        :description="hero.description"
        :stats="hero.stats"
        title-nowrap
      >
        <template #actions>
          <UButton variant="hero-primary" @click="openContactModal">
            Обсудить проект
          </UButton>
        </template>
      </UHero>
    </template>
    <template #intro>
      <UBaseIntro
        title-id="studio-intro-title"
        :title="main.title"
        :lead-paragraphs="main.leadParagraphs"
        :features="main.features"
        visual-label="От идеи до релиза"
        :images="main.images"
        theme="vocal"
      />
    </template>
    <template #info>
      <StudioServices :services="services" />
      <StudioClients :clients="clients" />
      <StudioAudience :audience="audience" />
    </template>
  </UPageWrapper>
</template>