<script setup lang="ts">
import { useGuitar } from '~/composables/pages/useGuitar'

usePageSeo({
  title: 'Уроки гитары в Ставрополе для детей и взрослых. Бесплатное пробное занятие!',
  description:
    'Школа гитары Юникорн в Ставрополе: индивидуальные занятия для детей от 9 лет и взрослых. Акустика, электрогитара, бас-гитара, укулеле. Бесплатное пробное занятие!',
  keywords:
    'уроки гитары ставрополь, школа гитары ставрополь, курсы гитары ставрополь, обучение гитаре ставрополь, гитара с нуля, гитара для начинающих, гитара для детей, гитара для взрослых, индивидуальные занятия гитарой, преподаватель гитары ставрополь, акустическая гитара, электрогитара, бас-гитара ставрополь, укулеле ставрополь, уроки укулеле, научиться играть на гитаре, пробное занятие гитара бесплатно',
})

const { hero, main, services, teachers, faq } = await useGuitar('guitar-content')
</script>

<template>
  <UPageWrapper>
    <template #hero>
      <UHero
        :image-src="hero.imageSrc"
        :video-src="hero.videoSrc"
        show-loader-until-ready
        title-id="guitar-hero-title"
        :title-accent="hero.title"
        :title-line2="hero.line2"
        :description="hero.description"
        :stats="hero.stats"
        title-nowrap
      />
    </template>
    <template #intro>
      <UBaseIntro
        title-id="guitar-intro-title"
        :title="main.title"
        :lead-paragraphs="main.leadParagraphs"
        :features="main.features"
        visual-label="Пробное занятие бесплатно"
        theme="guitar"
        :images="main.images"
      />
    </template>
    <template #info>
      <UDirectionsServicesGrid
        title-id="guitar-directions-title"
        :services="services"
      />

      <UTeachers
        :title="teachers.title"
        :subtitle="teachers.subtitle"
        :teachers="teachers.items"
      />
      <UFaq
        title-id="guitar-faq-title"
        :items="faq.items"
        :title="faq.title"
        :subtitle="faq.subtitle"
        id-prefix="guitar-faq"
      />

      <UNeedHelp />
    </template>
  </UPageWrapper>
</template>
