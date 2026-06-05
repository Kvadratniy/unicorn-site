<script setup lang="ts">
type BreadcrumbItem = {
  label: string
  to?: string
}

const route = useRoute()

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const items: BreadcrumbItem[] = [
    { label: 'Главная', to: '/' }
  ]

  const pathSegments = route.path.split('/').filter(Boolean)

  const routeMap: Record<string, string> = {
    'vocal': 'Уроки вокала',
    'piano': 'Уроки фортепиано',
    'guitar': 'Уроки гитары',
    'studio': 'Студия звукозаписи',
    'distribution': 'Музыкальная дистрибуция',
    'rent': 'Аренда',
    'contacts': 'Контакты',
    'news': 'Новости',
  }

  pathSegments.forEach((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/')
    const label = routeMap[segment] || segment

    if (index === pathSegments.length - 1) {
      items.push({ label })
    } else {
      items.push({ label, to: path })
    }
  })

  return items
})

const shouldShowBreadcrumbs = computed(() => {
  return route.path !== '/'
})

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string

const breadcrumbListSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.value.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: `${siteUrl}${item.to ?? route.path}`,
  })),
}))

useHead({
  script: computed(() =>
    !shouldShowBreadcrumbs.value
      ? []
      : [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(breadcrumbListSchema.value),
          },
        ],
  ),
})
</script>

<template>
  <nav
    v-if="shouldShowBreadcrumbs"
    class="breadcrumbs"
    aria-label="Хлебные крошки"
  >
    <ol class="breadcrumbs__list">
      <li
        v-for="(item, index) in breadcrumbs"
        :key="item.to ?? item.label"
        class="breadcrumbs__item"
      >
        <NuxtLink
          v-if="item.to"
          :to="item.to"
          class="breadcrumbs__link"
        >
          {{ item.label }}
        </NuxtLink>
        <span
          v-else
          class="breadcrumbs__current"
          aria-current="page"
        >
          {{ item.label }}
        </span>

        <span
          v-if="index < breadcrumbs.length - 1"
          class="breadcrumbs__separator"
          aria-hidden="true"
        >
          /
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped lang="scss">
.breadcrumbs {
  width: 100%;
  font-family: 'Montserrat';

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 18px;
    font-weight: 500;
    line-height: 1;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__link {
    color: #db2777;
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #be185d;
    }
  }

  &__current {
    color: #64748b;
  }

  &__separator {
    color: #cbd5e1;
  }
}
</style>
