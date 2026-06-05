<script setup lang="ts">
import UMoodHero from '~/components/content/UMoodHero.vue'
import HomeCategories from '~/widgets/categories/Categories.vue'
import { useHome } from '~/composables/pages/useHome'

usePageSeo({
  title: 'Музыкальная студия Юникорн — полный цикл музыкального производства в Ставрополе',
  description:
    'Музыкальная студия Юникорн в Ставрополе: обучение музыкальным направлениям, студия звукозаписи, ведущие и вокалисты на мероприятия. Запишитесь на пробное занятие!',
  keywords:
    'музыкальная школа ставрополь, студия звукозаписи ставрополь, запись песен ставрополь, уроки вокала, уроки гитары, уроки фортепиано, вокалисты на мероприятия, музыкальная школа для детей и взрослых, юникорн, unicorn',
})
// Preload LCP image (hero fallback on mobile/slow connection)
useHead({
  link: [
    { rel: 'preload', as: 'image', href: '/images/studio/main.jpg' },
  ],
})

const { moodHeroContent } = await useHome('home-page')

</script>

<template>
  <div class="flex flex-col gap-10 pb-10">
    <UMoodHero :content="moodHeroContent" />
    <HomeCategories class="pt-[20px]"/>
  </div>
</template>