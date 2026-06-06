<script setup lang="ts">
import { newsContentBlockTypes } from '~/types/news.types'
import { createNewsArticleSchema } from '~/composables/useSchemas'

const route = useRoute()
const { getNewsArticleBySlug } = useNews()

const { data: article } = await useAsyncData(
  'news-article',
  async () => {
    const id = String(route.params.id ?? '')
    const item = await getNewsArticleBySlug(id)
    if (!item) {
      throw createError({ statusCode: 404, statusMessage: 'Новость не найдена' })
    }
    return item
  },
  {
    watch: [() => route.params.id],
  },
)

const config = useRuntimeConfig()
const siteUrl = (config.public.siteUrl || config.public.site?.url) as string

const pageUrl = computed(() => `${siteUrl}/news/${String(route.params.id ?? '')}`)

watch(
  () => article.value,
  (a) => {
    if (!a) return
    usePageSeo({
      title: a.title,
      description: a.subtitle,
      image: a.heroImage,
    })
  },
  { immediate: true },
)

const newsArticleSchema = computed(() => {
  if (!article.value) return null
  return createNewsArticleSchema({
    siteUrl,
    pageUrl: pageUrl.value,
    article: article.value,
  })
})

useHead({
  script: computed(() =>
    !newsArticleSchema.value
      ? []
      : [
          {
            type: 'application/ld+json',
            children: JSON.stringify(newsArticleSchema.value),
          },
        ],
  ),
})

const contentBlockTypes = newsContentBlockTypes
</script>

<template>
  <div class="px-2 pb-16 lg:px-4">
    <UBreadcrumbs class="mb-6 mt-2" />
    <article v-if="article" class="max-w-3xl ">

      <header class="flex flex-col gap-4 sm:gap-5">
        <h1
          class="text-balance text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
          {{ article.title }}
        </h1>
        <p class="text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg">
          {{ article.subtitle }}
        </p>
      </header>

      <div class="mt-6 flex items-center justify-center overflow-hidden rounded-2xl ring-1 ring-neutral-200/60 sm:mt-8">
        <NuxtImg :src="article.heroImage" :alt="article.title" width="1200"
          class="w-full h-auto max-h-[min(820px,75vh)] w-auto max-w-full object-contain" sizes="sm:100vw md:768px"
          format="webp" />
      </div>

      <div class="space-y-6 pt-8 text-base leading-relaxed text-neutral-700 sm:pt-10">
        <template v-for="(block, index) in article.content" :key="index">
          <p v-if="block.type === contentBlockTypes.paragraph" class="text-pretty">
            {{ block.text }}
          </p>
          <h2
            v-else-if="block.type === contentBlockTypes.heading"
            class="pt-2 text-xl font-semibold tracking-tight text-neutral-900"
          >
            {{ block.text }}
          </h2>
          <component
            v-else-if="block.type === contentBlockTypes.list"
            :is="block.ordered ? 'ol' : 'ul'"
            class="list-outside space-y-2 pl-6 marker:text-neutral-400 sm:pl-7"
            :class="block.ordered ? 'list-decimal marker:text-neutral-500' : 'list-disc'"
          >
            <li v-for="(item, itemIndex) in block.items" :key="itemIndex" class="text-pretty leading-relaxed">
              {{ item }}
            </li>
          </component>
        </template>
      </div>
      <div
        class="mt-8 flex flex-col gap-4 border-b border-neutral-200/80 pb-8 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div class="flex items-center gap-3">
          <div
            class="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-neutral-100 ring-1 ring-neutral-200/80">
            <NuxtImg src="/images/logo/heda.png" alt="Unicorn Studio Logo"
              width="44" height="44" class="h-full w-full object-contain" format="webp" />
          </div>
          <p class="text-sm text-neutral-600">
            <span class="font-medium text-neutral-900"> Unicorn Studio</span>
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2 sm:justify-end">
          <span
            class="inline-flex rounded-full border border-neutral-200/90 bg-white px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm">
            {{ article.category }}
          </span>
          <span
            class="inline-flex rounded-full border border-neutral-200/90 bg-neutral-50 px-3 py-1 text-xs text-neutral-600">
            {{ article.publishDate }}
          </span>
        </div>
      </div>
    </article>
  </div>
</template>
