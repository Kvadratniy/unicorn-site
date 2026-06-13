<script setup lang="ts">
import { createLocalBusinessSchema } from '~/composables/useSchemas'

usePageSeo({
  title: 'Контакты студии Юникорн',
  description:
    'Unicorn Studio, Ставрополь: адрес 50 лет ВЛКСМ д. 93, телефон +7 (906) 464-94-96, почта. График работы пн–вс 10:00–22:00. Как добраться.',
})

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string

const localBusinessSchema = createLocalBusinessSchema(siteUrl)

useHead({
  link: [
    { rel: 'preconnect', href: 'https://api-maps.yandex.ru' },
  ],
  script: computed(() => [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(localBusinessSchema),
    },
  ]),
})
</script>

<template>
  <div class="contacts-page-min-height">
    <UBaseWrapper aria-labelledby="contacts-title" class="contacts-section">
      <h1 id="contacts-title" class="contacts-title">Контакты</h1>

      <div class="contacts-info">
      <!-- Адрес -->
      <div class="contacts-column">
        <h2 class="contacts-column-title">Адрес</h2>
        <p class="contacts-column-text">
          Ставрополь, 50 лет ВЛКСМ д. 93, 5 этаж
        </p>
        <div class="contacts-divider" />
      </div>

      <!-- Телефоны -->
      <div class="contacts-column">
        <h2 class="contacts-column-title">Связаться</h2>
        <div class="contacts-phone-list">
          <div class="contacts-phone-item">
            <span class="contacts-phone-label">Телефон</span>
            <a href="tel:+78005454515" class="contacts-phone-number">+7 (906) 464-94-96</a>
          </div>
          <div class="contacts-phone-item">
            <span class="contacts-phone-label">Почта</span>
            <a href="mailto:studio.unicorn.stv@gmail.com" class="contacts-phone-number">✉️
              studio.unicorn.stv@gmail.com</a>
          </div>
        </div>
        </div>

        <!-- График работы -->
        <div class="contacts-column">
          <h2 class="contacts-column-title">График работы</h2>
          <div class="contacts-schedule-list">
            <div class="contacts-schedule-item">
              <span class="contacts-schedule-label">пн-вс:</span>
              <span class="contacts-schedule-time">10:00 — 22:00</span>
            </div>
          </div>
        </div>
      </div>

      <iframe src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=161471835951" height="600" frameborder="0"></iframe>
    </UBaseWrapper>
  </div>
</template>

<style scoped>
.contacts-page-min-height {
  display: flex;
  flex-direction: column;
}

.contacts-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 40px;
}

.contacts-title {
  font-size: var(--u-font-56);
  font-weight: 700;
  color: #000;
  margin-bottom: 64px;
  padding-top: 16px;
  font-family: 'Druk Wide', sans-serif;
  letter-spacing: -1px;
  line-height: 1.1;
}

@media (min-width: 1024px) {
  .contacts-title {
    padding-top: 80px;
  }
}

.contacts-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  margin-bottom: 64px;
}

.contacts-column {
  display: flex;
  flex-direction: column;
}

.contacts-column-title {
  font-size: var(--u-font-18);
  font-weight: 700;
  color: #000;
  margin-bottom: 16px;
  font-family: 'Druk Wide', sans-serif;
  letter-spacing: -0.5px;
}

.contacts-column-text {
  font-size: var(--u-font-16);
  line-height: 1.6;
  color: #404040;
  margin-bottom: 16px;
  font-family: 'Suisse Intl', sans-serif;
}

.contacts-divider {
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
  margin-bottom: 16px;
}

.contacts-phone-list,
.contacts-schedule-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contacts-phone-item,
.contacts-schedule-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contacts-phone-label,
.contacts-schedule-label {
  font-size: var(--u-font-14);
  color: #808080;
  font-family: 'Suisse Intl', sans-serif;
}

.contacts-phone-number,
.contacts-schedule-time {
  font-size: var(--u-font-16);
  font-weight: 600;
  color: #000;
  text-decoration: none;
  font-family: 'Suisse Intl', sans-serif;
}

.contacts-phone-number:hover {
  color: #404040;
}

@media (max-width: 1024px) {
  .contacts-info {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .contacts-title {
    font-size: var(--u-font-36);
    margin-bottom: 32px;
  }

  .contacts-info {
    margin-bottom: 48px;
  }
}

@media (max-width: 480px) {
  .contacts-title {
    font-size: var(--u-font-28);
    line-height: 1.15;
  }
}
</style>
