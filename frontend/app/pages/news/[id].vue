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
const siteUrl = config.public.siteUrl as string

const pageUrl = computed(() => `${siteUrl}/news/${String(route.params.id ?? '')}`)

usePageSeo({
  title: () => article.value?.title ?? 'Новость',
  description: () => article.value?.subtitle ?? '',
  image: () => article.value?.heroImage,
  ogType: 'article',
})

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
            innerHTML: JSON.stringify(newsArticleSchema.value),
          },
        ],
  ),
})

const contentBlockTypes = newsContentBlockTypes
</script>

<template>
  <div class="px-3 pb-16 lg:px-5">
    <UBreadcrumbs class="mb-6 mt-3" />
    <article v-if="article" class="max-w-3xl">

      <header class="flex flex-col gap-4 sm:gap-5 pb-7">
        <h1
          class="text-balance text-[28px] font-bold leading-[1.12] tracking-tight text-[#1a1716] sm:text-4xl lg:text-[42px] lg:leading-[1.1]"
        >
          {{ article.title }}
        </h1>
        <p class="text-pretty text-[15px] leading-relaxed text-[#64748b] sm:text-lg">
          {{ article.subtitle }}
        </p>
      </header>

      <NuxtImg
        :src="article.heroImage"
        :alt="article.title"
        width="1200"
        class="h-auto max-h-[min(420px,55vh)] w-auto max-w-full rounded-2xl object-contain"
        sizes="sm:100vw md:768px"
        format="webp"
      />

      <div class="space-y-6 pt-8 text-[15px] leading-[1.7] text-neutral-700 sm:pt-10">
        <template v-for="(block, index) in article.content" :key="index">
          <p v-if="block.type === contentBlockTypes.paragraph" class="text-pretty">
            {{ block.text }}
          </p>
          <h2
            v-else-if="block.type === contentBlockTypes.heading"
            class="pt-3 text-xl font-semibold tracking-[-0.02em] text-[#1a1716]"
          >
            {{ block.text }}
          </h2>
          <component
            v-else-if="block.type === contentBlockTypes.list"
            :is="block.ordered ? 'ol' : 'ul'"
            class="list-outside space-y-2.5 pl-6 marker:text-neutral-400 sm:pl-7"
            :class="block.ordered ? 'list-decimal marker:text-neutral-500' : 'list-disc'"
          >
            <li v-for="(item, itemIndex) in block.items" :key="itemIndex" class="text-pretty leading-relaxed">
              {{ item }}
            </li>
          </component>
        </template>
      </div>

      <div
        class="mt-10 flex flex-col gap-4 border-b border-neutral-200/60 pb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
      >
        <div class="flex items-center gap-3">
          <div
            class="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-neutral-50 ring-1 ring-neutral-200/60"
          >
            <NuxtImg
              src="/images/logo/heda.png"
              alt="Unicorn Studio Logo"
              width="40"
              height="40"
              class="h-full w-full object-contain"
              format="webp"
            />
          </div>
          <p class="text-sm text-neutral-600">
            <span class="font-semibold text-[#1a1716]">Unicorn Studio</span>
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2 sm:justify-end">
          <span
            class="inline-flex rounded-lg border border-neutral-200/80 bg-white px-3 py-1 text-xs font-semibold text-[#1a1716]"
          >
            {{ article.category }}
          </span>
          <span
            class="inline-flex rounded-lg border border-neutral-200/80 bg-neutral-50 px-3 py-1 text-xs text-neutral-500"
          >
            {{ article.publishDate }}
          </span>
        </div>
      </div>
    </article>
  </div>
</template>
