<script setup lang="ts">
import { createNewsCollectionSchema } from '~/composables/useSchemas'

const { getNewsArticles } = useNews()
const { data: articles, pending } = await useAsyncData('news-list', getNewsArticles)

usePageSeo({
  title: 'Новости',
  description:
    'Статьи и заметки студии: вокал, инструменты, запись и практические советы для занятий и сессий в студии.',
})

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string
const pageUrl = `${siteUrl}/news`

const newsCollectionSchema = computed(() =>
  createNewsCollectionSchema({
    siteUrl,
    pageUrl,
    articles: articles.value || [],
  }),
)

useHead({
  script: computed(() => [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(newsCollectionSchema.value),
    },
  ]),
})
</script>

<template>
  <section class="news-page">
    <header class="news-page__hero">
      <div class="news-page__hero-glow news-page__hero-glow--right" />
      <div class="news-page__hero-glow news-page__hero-glow--left" />
      <div class="news-page__hero-inner">
        <p class="news-page__hero-badge">
          Блог студии
        </p>
        <h1 class="news-page__hero-title">
          Новости и полезные материалы
        </h1>
        <p class="news-page__hero-subtitle">
          Публикуем статьи о вокале, инструментах, записи и подготовке релизов: короткие практические материалы и кейсы из работы студии.
        </p>
      </div>
    </header>

    <div class="news-page__content">
      <UBreadcrumbs class="news-page__breadcrumbs" />

      <div v-if="pending" class="news-page__skeleton-grid">
        <div
          v-for="skeleton in 6"
          :key="skeleton"
          class="news-page__skeleton-card"
        />
      </div>

      <div v-else-if="!articles || articles.length === 0" class="news-page__empty">
        <h2 class="news-page__empty-title">
          Пока нет опубликованных новостей
        </h2>
        <p class="news-page__empty-text">
          Как только появятся первые статьи, они отобразятся здесь. Можно вернуться позже или перейти в другие разделы студии.
        </p>
        <NuxtLink
          to="/"
          class="news-page__empty-button"
        >
          На главную
        </NuxtLink>
      </div>

      <ul v-else class="news-page__grid">
        <li v-for="a in articles" :key="a.id">
          <NuxtLink
            :to="`/news/${a.id}`"
            class="news-card"
          >
            <div class="news-card__media">
              <NuxtImg
                :src="a.heroImage || '/images/studio/main.jpg'"
                :alt="a.title"
                width="960"
                height="600"
                class="news-card__image"
                format="webp"
              />
              <div class="news-card__overlay" />
              <div class="news-card__meta">
                <span>{{ a.category || 'Новости' }}</span>
                <span class="news-card__dot">•</span>
                <span>{{ a.publishDate || 'Без даты' }}</span>
              </div>
            </div>

            <div class="news-card__body">
              <h2 class="news-card__title">
                {{ a.title }}
              </h2>
              <p class="news-card__subtitle">
                {{ a.subtitle || 'Открыть материал' }}
              </p>
              <div class="news-card__action">
                Читать статью
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.news-page {
  width: 100%;
  padding: 0 0 80px;

  &__hero {
    position: relative;
    width: 100%;
    overflow: hidden;
    background: var(--u-color-white);
    box-shadow: 0 1px 2px var(--u-slate-a05);
    padding: 32px 16px;
    border-radius: 16px;
  }

  &__hero-inner {
    position: relative;
    z-index: 1;
    max-width: 1400px;
    margin: 0 auto;
  }

  &__hero-glow {
    pointer-events: none;
    position: absolute;
    border-radius: 9999px;
    filter: blur(48px);

    &--right {
      top: -64px;
      right: -40px;
      width: 176px;
      height: 176px;
      background: var(--u-pink-light-a45);
    }

    &--left {
      bottom: -56px;
      left: -24px;
      width: 160px;
      height: 160px;
      background: var(--u-purple-light-a45);
    }
  }

  &__hero-badge {
    display: inline-flex;
    width: fit-content;
    margin: 0 0 12px;
    border-radius: 999px;
    background: #fdf2f8;
    padding: 4px 12px;
    color: #be185d;
    font-size: var(--u-font-12);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__hero-title {
    margin: 0;
    text-wrap: balance;
    color: #171717;
    font-size: var(--u-font-30);
    font-weight: 600;
    line-height: 1.12;
    letter-spacing: -0.02em;
  }

  &__hero-subtitle {
    margin: 16px 0 0;
    max-width: 768px;
    text-wrap: pretty;
    color: #525252;
    font-size: var(--u-font-14);
    line-height: 1.6;
  }

  &__content {
    margin: 0 auto;
    padding: 0 16px;
  }

  &__breadcrumbs {
    margin: 24px 0 20px;
  }

  &__skeleton-grid {
    margin-top: 28px;
    display: grid;
    gap: 16px;
  }

  &__skeleton-card {
    height: 288px;
    animation: pulse 1.5s ease-in-out infinite;
    border: 1px solid var(--u-gray-a80);
    border-radius: 16px;
    background: var(--u-color-white);
  }

  &__empty {
    margin-top: 32px;
    border: 1px dashed #d4d4d8;
    border-radius: 16px;
    background: var(--u-white-a75);
    padding: 32px;
    text-align: center;
  }

  &__empty-title {
    margin: 0;
    color: #171717;
    font-size: var(--u-font-22);
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  &__empty-text {
    margin: 12px auto 0;
    max-width: 576px;
    color: #525252;
    font-size: var(--u-font-14);
    line-height: 1.6;
  }

  &__empty-button {
    margin-top: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    background: var(--u-color-white);
    padding: 8px 16px;
    color: #262626;
    font-size: var(--u-font-14);
    font-weight: 500;
    text-decoration: none;
    transition: border-color 0.2s ease, background-color 0.2s ease;

    &:hover {
      border-color: #d4d4d8;
      background: #fafafa;
    }
  }

  &__grid {
    margin: 32px 0 0;
    display: grid;
    gap: 16px;
    padding: 0;
    list-style: none;
  }
}

.news-card {
  display: block;
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--u-gray-a90);
  border-radius: 16px;
  background: var(--u-color-white);
  box-shadow: 0 1px 2px var(--u-slate-a05);
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: #fbcfe8;
    box-shadow: 0 8px 20px var(--u-slate-a08);
  }

  &__media {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: #f5f5f5;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover &__image {
    transform: scale(1.02);
  }

  &__overlay {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 80px;
    background: linear-gradient(to top, var(--u-black-a35), var(--u-black-a10), transparent);
  }

  &__meta {
    position: absolute;
    bottom: 12px;
    left: 12px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border-radius: 999px;
    background: var(--u-black-a50);
    padding: 4px 10px;
    color: var(--u-color-white);
    font-size: var(--u-font-11);
    font-weight: 500;
    backdrop-filter: blur(4px);
  }

  &__dot {
    opacity: 0.7;
  }

  &__body {
    display: flex;
    min-height: 176px;
    flex-direction: column;
    padding: 16px;
  }

  &__title {
    margin: 0;
    color: #171717;
    font-size: var(--u-font-18);
    font-weight: 600;
    line-height: 1.35;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.2s ease;
  }

  &:hover &__title {
    color: #be185d;
  }

  &__subtitle {
    margin: 8px 0 0;
    color: #525252;
    font-size: var(--u-font-14);
    line-height: 1.6;
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__action {
    margin-top: auto;
    padding-top: 16px;
    color: #be185d;
    font-size: var(--u-font-14);
    font-weight: 500;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.55;
  }
}

@media (min-width: 640px) {
  .news-page {
    &__hero {
      padding: 40px 24px;
    }

    &__hero-title {
      font-size: var(--u-font-36);
    }

    &__hero-subtitle {
      font-size: var(--u-font-16);
    }

    &__content {
      padding: 0 24px;
    }

    &__breadcrumbs {
      margin: 28px 0 24px;
    }

    &__skeleton-grid,
    &__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    &__empty {
      padding: 40px;
    }
  }

  .news-card {
    &__body {
      padding: 20px;
    }
  }
}

@media (min-width: 1024px) {
  .news-page {
    &__hero {
      padding: 48px 32px;
    }

    &__hero-title {
      font-size: var(--u-font-46);
    }

    &__content {
      padding: 0 20px;
    }

    &__grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
}
</style>
