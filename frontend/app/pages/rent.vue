<script setup lang="ts">
import { useRent } from '~/composables/pages/useRent'
import { createRentServiceSchema } from '~/composables/useSchemas'

usePageSeo({
  title: 'Аренда вокального класса и студии звукозаписи в Ставрополе',
  description:
    'Аренда вокального класса и студии звукозаписи в Ставрополе. Почасовая аренда пространства для репетиций, записи и самостоятельной работы с материалом.',
  keywords:
    'аренда вокального класса, аренда студии звукозаписи, аренда студии ставрополь, репетиционная студия, студия для вокала, почасовая аренда студии',
})

const { open: openContactModal } = useContactModal()

const { hero, intro, options: rentOptions } = await useRent('rent-content')

const config = useRuntimeConfig()
const siteUrl = (config.public.siteUrl || config.public.site?.url) as string
const pageUrl = `${siteUrl}/rent/`

const serviceSchema = computed(() =>
  createRentServiceSchema({
    siteUrl,
    pageUrl,
    options: rentOptions.value,
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
  <UPageWrapper>
    <template #hero>
      <UHeroImage
        :image-src="hero.imageSrc"
        :image-alt="hero.imageAlt"
        title-id="rent-hero-title"
        :title-accent="hero.titleAccent"
        :title-line2="hero.titleLine2"
        :description="hero.description"
        :caption="hero.caption"
      >
        <template #actions>
          <UButton variant="hero-primary" @click="openContactModal">
            Забронировать
          </UButton>
        </template>
      </UHeroImage>
    </template>
    <template #intro>
      <USecondIntro
        title-id="rent-intro-title"
        :title="intro.title"
        :lead="intro.lead"
        :image-src="intro.imageSrc"
        :image-alt="intro.imageAlt"
        :highlights="intro.highlights"
      />
    </template>
    <template #info>
      <section class="rent-options" aria-label="Форматы аренды">
        <div class="rent-options__grid">
          <URentCard
            v-for="(option, index) in rentOptions"
            :key="option.title"
            :option="option"
            :index="index"
          />
        </div>
      </section>
      <UNeedHelp />
    </template>
  </UPageWrapper>
</template>


<style scoped lang="scss">
.rent-options {
  display: block;

  &__grid {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1024px) {
  .rent-options__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }
}
</style>
