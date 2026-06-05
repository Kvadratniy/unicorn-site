<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const isNotFound = computed(() => props.error?.statusCode === 404)

const pageTitle = computed(() =>
  isNotFound.value ? 'Страница не найдена' : 'Произошла ошибка'
)

useHead({
  title: pageTitle,
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

const handleGoHome = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="error-page">
    <div class="error-page__content">
      <p class="error-page__code" aria-hidden="true">
        {{ error?.statusCode || 404 }}
      </p>
      <h1 class="error-page__title unicorn-studio-title">
        {{ isNotFound ? 'Страница не найдена' : 'Что-то пошло не так' }}
      </h1>
      <p class="error-page__text unicorn-studio-subtitle">
        <template v-if="isNotFound">
          Возможно, страница была перемещена или вы перешли по неверной ссылке.
        </template>
        <template v-else>
          Произошла непредвиденная ошибка. Мы уже работаем над её устранением.
        </template>
      </p>
      <div class="error-page__actions">
        <UButton variant="primary" @click="handleGoHome">
          На главную
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem 1.5rem;
}

.error-page__content {
  text-align: center;
  max-width: 28rem;
}

.error-page__code {
  font-family: 'Suisse Intl', sans-serif;
  font-size: clamp(5rem, 20vw, 10rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  color: #1d1d1f;
  opacity: 0.12;
  margin-bottom: 0.5rem;
}

.error-page__title {
  margin-bottom: 1rem;
}

.error-page__text {
  margin-bottom: 2rem;
  color: #86868b;
}

.error-page__actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
