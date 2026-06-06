<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import type { HomeCatalogCategory, HomeCatalogService } from '~/composables/useStrapiApi'

type Service = {
  title: string
  description: string
  features: string[]
  price: string
  slug: string
  image: string
}

type Category = {
  id: string
  title: string
  description: string
  services: Service[]
}

const DEFAULT_SERVICE_IMAGE = '/images/studio/record-s.jpg'

const titleRef = ref<HTMLElement | null>(null)
const isTitleVisible = ref(false)

useIntersectionObserver(
  titleRef,
  (entries) => {
    if (entries[0]?.isIntersecting) {
      isTitleVisible.value = true
    }
  },
  {
    threshold: 0.1,
  }
)

const categoryRefs = ref<(HTMLElement | null)[]>([])
const visibleCategories = ref<Set<number>>(new Set())

const setCategoryRef = (el: HTMLElement | null, index: number) => {
  if (el) {
    categoryRefs.value[index] = el
  }
}

onMounted(() => {
  categoryRefs.value.forEach((el, index) => {
    if (el) {
      useIntersectionObserver(
        el,
        (entries) => {
          if (entries[0]?.isIntersecting) {
            visibleCategories.value.add(index)
          }
        },
        {
          threshold: 0.2,
        }
      )
    }
  })
})

const isCategoryVisible = (index: number) => {
  return visibleCategories.value.has(index)
}

const { categories: loadedCategories, pending, error } = await useHomeCatalog('home-services-categories')

const normalizeService = (service: HomeCatalogService): Service => ({
  title: service.title,
  description: service.description || '',
  features: service.features || [],
  price: service.price || '',
  slug: service.slug || '',
  image: service.image || DEFAULT_SERVICE_IMAGE,
})

const normalizeCategory = (category: HomeCatalogCategory): Category => ({
  id: category.id,
  title: category.title,
  description: category.description,
  services: category.services.map(normalizeService),
})

const getServiceLink = (slug: string) => (slug ? `/${slug}` : '#services')

const normalizedLoadedCategories = computed<Category[]>(() =>
  (loadedCategories.value || [])
    .map(normalizeCategory)
    .filter(category => category.services.length)
)

const categories = computed<Category[]>(() => {
  if (normalizedLoadedCategories.value.length) return normalizedLoadedCategories.value
  if (pending.value) return []
  return []
})

</script>

<template>
  <UBaseWrapper id="services">
    <div ref="titleRef">
      <UBaseTitle
        :class="{ 'title-visible': isTitleVisible }"
        class="section-title"
        label="Услуги студии"
        title="Всё для вашего звука"
        description="От идеи до готового релиза — полный цикл музыкального производства"
      />
    </div>

    <div v-if="pending" class="catalog-message">
      Загружаем услуги...
    </div>
    <div v-else-if="error" class="catalog-message catalog-message--error">
      Не удалось загрузить услуги из каталога.
    </div>
    <div v-else-if="!categories.length" class="catalog-message">
      Услуги пока не добавлены.
    </div>

    <div class="categories">
      <div
        v-for="(category, catIndex) in categories"
        :key="category.id"
        :ref="(el) => setCategoryRef(el as HTMLElement, catIndex)"
        class="category"
      >
        <div class="category__header">
          <div class="category__counter">
            <span>{{ String(catIndex + 1).padStart(2, '0') }}</span>
            <span class="category__counter-divider">/</span>
            <span>{{ String(categories.length).padStart(2, '0') }}</span>
          </div>
          <h3 class="category__title">
            {{ category.title }}
          </h3>
          <p class="category__description">
            {{ category.description }}
          </p>
        </div>

        <div class="category__services">
          <NuxtLink
            v-for="(service, index) in category.services"
            :key="`${category.id}-${service.slug || service.title}-${index}`"
            :to="getServiceLink(service.slug)"
            class="services-card-link"
          >
            <article
              class="services-card"
              :class="{ 'is-visible': isCategoryVisible(catIndex) }"
              :style="{ '--i': index }"
            >
              <NuxtImg
                :src="service.image"
                :alt="service.title"
                format="webp"
                class="services-card__image"
                width="220px"
              />
              <div class="services-card__header">
                <h4 class="services-card__title">
                  {{ service.title }}
                </h4>
                <span class="services-card__price">
                  от {{ service.price }}₽
                </span>
              </div>

              <p class="services-card__description">
                {{ service.description }}
              </p>

              <div class="services-card__features">
                <span
                  v-for="f in service.features"
                  :key="f"
                  class="services-card__feature"
                >
                  {{ f }}
                </span>
              </div>

              <div class="services-card__cta">
                <span>Подробнее</span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" class="card-arrow">
                  <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </article>
          </NuxtLink>
        </div>
      </div>
    </div>
  </UBaseWrapper>
</template>

<style scoped lang="scss">
$sm: 640px;
$md: 768px;
$lg: 1024px;
$ease-default: cubic-bezier(0.4, 0, 0.2, 1);
$ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

.catalog-message {
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: #64748b;

  &--error {
    color: #ef4444;
  }
}

.section-title {
  opacity: 0;
  transform: scale(0.9);
  transition:
    opacity 0.6s $ease-default,
    transform 0.6s $ease-spring;

  &.title-visible {
    opacity: 1;
    transform: scale(1);
  }
}

.categories {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.category {
  &__header {
    margin-bottom: 2.5rem;
    padding-left: 0.125rem;
  }

  &__counter {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin-bottom: 0.75rem;
    font-size: 13px;
    font-weight: 500;
    color: #94a3b8;
    font-variant-numeric: tabular-nums;
  }

  &__counter-divider {
    opacity: 0.5;
  }

  &__title {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
    font-weight: 500;
    color: #1a1a1a;
    letter-spacing: -0.025em;

    @media (min-width: $lg) {
      font-size: 32px;
      letter-spacing: -0.5px;
    }
  }

  &__description {
    margin: 0;
    font-size: 15px;
    font-weight: 400;
    color: #64748b;
  }

  &__services {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;

    @media (min-width: $sm) {
      gap: 1.25rem;
    }

    @media (min-width: $md) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: $lg) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
}

.services-card-link {
  display: block;
  color: inherit;
  text-decoration: none;

  &:hover {
    .services-card {
      &.is-visible {
        border-color: rgba(0, 0, 0, 0.1);
        box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.1);
        transform: translateY(-4px) scale(1);
      }

      &__cta {
        gap: 0.625rem;
        color: #fff;
        background: #1a1a1a;
        border-color: #1a1a1a;
        box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.1);
      }
    }

    .card-arrow {
      transform: translateX(0.125rem);
    }
  }
}

.services-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.75rem;
  cursor: pointer;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  opacity: 0;
  transform: scale(0.7);
  transition:
    opacity 0.7s $ease-default,
    transform 0.7s $ease-spring,
    border-color 0.4s $ease-default,
    box-shadow 0.4s $ease-default;

  @media (max-width: $md) {
    padding: 1.5rem;
  }

  &.is-visible {
    opacity: 1;
    transform: scale(1);
    transition-delay: calc(var(--i, 0) * 150ms);
  }

  &__image {
    display: block;
    margin-right: auto;
    margin-left: auto;
    padding-bottom: 1rem;
  }

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.875rem;
  }

  &__title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.375;
    color: #1a1a1a;
    letter-spacing: -0.3px;
  }

  &__price {
    flex-shrink: 0;
    padding: 0.25rem 0.625rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #64748b;
    white-space: nowrap;
    background: #f1f5f9;
    border-radius: 0.375rem;
  }

  &__description {
    flex: 1;
    margin: 0 0 1.25rem;
    font-size: 0.875rem;
    line-height: 1.625;
    color: #64748b;
  }

  &__features {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin-bottom: 1.5rem;
  }

  &__feature {
    padding: 0.375rem 0.625rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: #475569;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #1a1a1a;
    text-decoration: none;
    background: transparent;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    transition: all 0.3s;
  }
}

.card-arrow {
  transition: transform 0.3s;
}

@media (prefers-reduced-motion: reduce) {
  .section-title {
    opacity: 1;
    transform: none;
  }

  .services-card {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .services-card-link:hover .services-card {
    transform: none;
  }

  .card-arrow {
    transition: none;
  }
}
</style>
