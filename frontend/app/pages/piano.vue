<script setup lang="ts">
import { usePiano } from '~/composables/pages/usePiano'
import { createFaqPageSchema, createPianoMusicSchoolSchema, createPianoServiceSchema } from '~/composables/useSchemas'

usePageSeo({
  title: 'Уроки фортепиано в студии Юникорн',
  description:
    'Уроки фортепиано в Ставрополе в студии Юникорн: индивидуальные занятия для детей от 5 лет и взрослых с нуля. Бесплатное пробное занятие!',
  keywords:
    'уроки фортепиано ставрополь, школа фортепиано ставрополь, уроки пианино ставрополь, курсы фортепиано ставрополь, обучение фортепиано ставрополь, фортепиано с нуля, фортепиано для начинающих, фортепиано для детей, фортепиано для взрослых, индивидуальные занятия фортепиано, преподаватель фортепиано ставрополь, научиться играть на пианино, пробное занятие фортепиано бесплатно, фортепиано с 5 лет',
})

const { hero, main, services, teachers, faq } = await usePiano('piano-content')

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string
const pageUrl = `${siteUrl}/piano`

const serviceSchema = computed(() =>
  createPianoServiceSchema({
    siteUrl,
    pageUrl,
    servicesTitle: services.value.title,
    services: services.value.items,
  }),
)

const faqSchema = computed(() => createFaqPageSchema(pageUrl, faq.value.items))
const musicSchoolSchema = createPianoMusicSchoolSchema(siteUrl, pageUrl)

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
        :image-src="hero.imageSrc"
        :video-src="hero.videoSrc"
        show-loader-until-ready
        title-id="piano-hero-title"
        :title-accent="hero.title"
        :title-line2="hero.line2"
        :description="hero.description"
        :stats="hero.stats"
        title-nowrap
      />
    </template>
    <template #intro>
      <UBaseIntro
        title-id="piano-intro-title"
        :title="main.title"
        :lead-paragraphs="main.leadParagraphs"
        :features="main.features"
        visual-label="Пробное занятие бесплатно"
        :images="main.images"
        theme="piano"
      />
    </template>
    <template #info>
      <UDirectionsServicesGrid
        title-id="piano-directions-title"
        :services="services"
      />
      <UTeachers
        :title="teachers.title"
        :subtitle="teachers.subtitle"
        :teachers="teachers.items"
      />
      <UFaq
        title-id="piano-faq-title"
        :items="faq.items"
        :title="faq.title"
        :subtitle="faq.subtitle"
        id-prefix="piano-faq"
      />
      <UNeedHelp />
    </template>
  </UPageWrapper>
</template>