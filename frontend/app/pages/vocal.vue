<script setup lang="ts">
import { useVocal } from '~/composables/pages/useVocal'
import { createFaqPageSchema, createVocalMusicSchoolSchema, createVocalServiceSchema } from '~/composables/useSchemas'

usePageSeo({
  title: 'Уроки вокала в студии Юникорн',
  description:
    'Уроки вокала в Ставрополе в музыкальной студии Юникорн: обучение пению для детей и взрослых с нуля, индивидуально и в группе. Бесплатное пробное занятие!',
  keywords:
    'уроки вокала ставрополь, школа вокала ставрополь, курсы вокала ставрополь, обучение вокалу ставрополь, занятия по вокалу ставрополь, преподаватель по вокалу, тренер по вокалу, студия вокала ставрополь, юникорн вокал, постановка голоса ставрополь, вокал для детей, вокал для взрослых, уроки пения ставрополь, пробное занятие по вокалу',
})

const { hero, main, services, teachers, faq } = await useVocal('vocal-content')

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string
const pageUrl = `${siteUrl}/vocal`

const serviceSchema = computed(() =>
  createVocalServiceSchema({
    siteUrl,
    pageUrl,
    servicesTitle: services.value.title,
    services: services.value.items,
  }),
)

const faqSchema = computed(() => createFaqPageSchema(pageUrl, faq.value.items))
const musicSchoolSchema = createVocalMusicSchoolSchema(siteUrl, pageUrl)

useHead({
  script: computed(() => [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(musicSchoolSchema),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(serviceSchema.value),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(faqSchema.value),
    },
  ]),
})

</script>
<template>
  <UPageWrapper>
    <template #hero>
      <UHero
        show-loader-until-ready
        title-id="vocal-hero-title"
        :image-src="hero.imageSrc"
        :video-src="hero.videoSrc"
        :title-accent="hero.title"
        :title-line2="hero.line2"
        :description="hero.description"
        :stats="hero.stats"
        title-nowrap
      />
    </template>
    <template #intro>
      <UBaseIntro
        title-id="vocal-intro-title"
        :title="main.title"
        :lead-paragraphs="main.leadParagraphs"
        :features="main.features"
        visual-label="Пробное занятие бесплатно"
        :images="main.images"
        theme="vocal"
      />
    </template>
    <template #info>
      <UDirectionsServicesGrid
        title-id="vocal-directions-title"
        :services="services"
      />
      <UTeachers
        :title="teachers.title"
        :subtitle="teachers.subtitle"
        :teachers="teachers.items"
      />
      <UFaq
        title-id="vocal-faq-title"
        :items="faq.items"
        :title="faq.title"
        :subtitle="faq.subtitle"
        id-prefix="vocal-faq"
      />
      <UNeedHelp />
    </template>
  </UPageWrapper>
</template>