<script setup lang="ts">
import UMoodHero from '~/components/content/UMoodHero.vue'
import HomeCategories from '~/widgets/categories/Categories.vue'
import { useHome } from '~/composables/pages/useHome'

usePageSeo({
  title: 'Музыкальная студия Юникорн в Ставрополе',
  description:
    'Полный цикл музыкального производства в Ставрополе. Команда музыкантов, вокалистов и саунд-инженеров с опытом более 10 лет — поможем раскрыть ваш музыкальный талант.',
  keywords: 'юникорн ставрополь, музыкальная студия юникорн, unicorn studio ставрополь, юникорн',
})

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