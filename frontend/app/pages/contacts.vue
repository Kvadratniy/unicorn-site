<script setup lang="ts">
usePageSeo({
  title: 'Контакты',
  description:
    'Unicorn Studio, Ставрополь: адрес 50 лет ВЛКСМ д. 93, телефон +7 (906) 464-94-96, почта. График работы пн–вс 10:00–22:00. Как добраться.',
})

// Координаты для адреса: Ставрополь, ул. 50 лет ВЛКСМ, д. 93
// Источник: геокодинг Яндекс / открытые данные
const mapCenter: [number, number] = [45.000217, 41.9192]
const mapZoom = 17

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Unicorn Studio',
  url: siteUrl,
  image: `${siteUrl}/images/logo/logo-4.png`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ставрополь',
    streetAddress: 'ул. 50 лет ВЛКСМ, д. 93',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.000217,
    longitude: 41.9192,
  },
  telephone: '+7-906-464-94-96',
  email: 'studio.unicorn.stv@gmail.com',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '10:00',
    closes: '22:00',
  },
}

useHead({
  link: [
    { rel: 'preconnect', href: 'https://api-maps.yandex.ru' },
  ],
  script: [
    {
      type: 'application/ld+json',
      // Nuxt 3 рекомендует использовать children для JSON-LD
      children: JSON.stringify(localBusinessSchema),
    },
  ],
})
</script>

<template>
  <div class="contacts-page-min-height">
    <UBaseWrapper aria-labelledby="contacts-title" class="contacts-section pt-10">
      <h1 class="contacts-title lg:pt-20 pt-4">Контакты</h1>

      <div class="contacts-info">
      <!-- Адрес -->
      <div class="contacts-column">
        <h2 class="contacts-column-title">Адрес</h2>
        <p class="contacts-column-text">
          Ставрополь, 50 лет ВЛКСМ д. 93, 5 этаж
        </p>
        <div class="contacts-divider" />
        <!-- <button class="contacts-button">
          <svg
            class="contacts-button-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0C4.134 0 1 3.134 1 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5c-1.381 0-2.5-1.119-2.5-2.5S6.619 4.5 8 4.5s2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"
              fill="currentColor"
            />
          </svg>
          <span>Как добраться</span>
        </button> -->
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
      <!-- Карта -->
      <!-- <div class="contacts-map">
        <ClientOnly>
          <YandexMap :center="mapCenter" :zoom="mapZoom" />
          <template #fallback>
            <div class="yandex-map" style="width: 100%; height: 600px; background-color: #f5f5f5;" />
          </template>
        </ClientOnly>
      </div> -->
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
}

.contacts-page {
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 140px 20px 80px;
  box-sizing: border-box;
}

.contacts-title {
  font-size: 56px;
  font-weight: 700;
  color: #000;
  margin-bottom: 64px;
  font-family: 'Druk Wide', sans-serif;
  letter-spacing: -1px;
  line-height: 1.1;
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
  font-size: 18px;
  font-weight: 700;
  color: #000;
  margin-bottom: 16px;
  font-family: 'Druk Wide', sans-serif;
  letter-spacing: -0.5px;
}

.contacts-column-text {
  font-size: 16px;
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

.contacts-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: 1px solid #d4d4d4;
  background: transparent;
  color: #404040;
  font-size: 14px;
  font-family: 'Suisse Intl', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
}

.contacts-button:hover {
  border-color: #000;
  color: #000;
}

.contacts-button-icon {
  color: #808080;
  flex-shrink: 0;
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
  font-size: 14px;
  color: #808080;
  font-family: 'Suisse Intl', sans-serif;
}

.contacts-phone-number,
.contacts-schedule-time {
  font-size: 16px;
  font-weight: 600;
  color: #000;
  text-decoration: none;
  font-family: 'Suisse Intl', sans-serif;
}

.contacts-phone-number:hover {
  color: #404040;
}

.contacts-map {
  width: 100%;
  margin-top: 48px;
}

@media (max-width: 1024px) {
  .contacts-page {
    padding-top: 120px;
    padding-bottom: 64px;
  }

  .contacts-info {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .contacts-page {
    padding-top: 100px;
    padding-inline: 12px;
  }

  .contacts-title {
    font-size: 36px;
    margin-bottom: 32px;
  }

  .contacts-info {
    margin-bottom: 48px;
  }

  .contacts-map {
    margin-top: 32px;
  }
}

@media (max-width: 480px) {
  .contacts-title {
    font-size: 28px;
    line-height: 1.15;
  }
}
</style>
