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
const { open: openContactModal } = useContactModal()

const socialLinks = [
  {
    name: 'Telegram',
    url: 'https://t.me/posledniy_edinorog',
    ariaLabel: 'Telegram',
  },
  {
    name: 'VKontakte',
    url: 'https://vk.com/1unicornstudio',
    ariaLabel: 'VKontakte',
  },
]

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
  <section class="contacts-page">
    <header class="contacts-page__hero">
      <div class="contacts-page__hero-glow contacts-page__hero-glow--right" />
      <div class="contacts-page__hero-glow contacts-page__hero-glow--left" />
      <div class="contacts-page__hero-inner">
        <p class="contacts-page__hero-badge">
          Unicorn Studio
        </p>
        <h1 id="contacts-title" class="contacts-page__hero-title">
          Контакты
        </h1>
        <p class="contacts-page__hero-subtitle">
          Адрес, телефон, почта и график работы: приходите в гости, звоните или пишите — поможем записаться на занятие или сессию.
        </p>
      </div>
    </header>

    <div class="contacts-page__content">
      <div class="contacts-page__layout">
        <div class="contacts-page__map">
          <iframe
            src="https://yandex.ru/map-widget/v1/?z=14&ol=biz&oid=161471835951"
            frameborder="0"
            title="Карта расположения Unicorn Studio"
          />
        </div>

        <div class="contacts-page__info">
          <article class="contacts-card">
            <div class="contacts-card__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 10.833a2.917 2.917 0 1 0 0-5.833 2.917 2.917 0 0 0 0 5.833Z" stroke="currentColor" stroke-width="1.5" />
                <path d="M10 18.333c3.333-3.333 5.833-6.25 5.833-9.583a5.833 5.833 0 1 0-11.666 0c0 3.333 2.5 6.25 5.833 9.583Z" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </div>
            <div class="contacts-card__body">
              <h2 class="contacts-card__title">
                Адрес
              </h2>
              <p class="contacts-card__text">
                Ставрополь, 50 лет ВЛКСМ д. 93, 5 этаж
              </p>
            </div>
          </article>

          <article class="contacts-card">
            <div class="contacts-card__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.167 3.333h11.666c.92 0 1.667.746 1.667 1.667v10c0 .92-.746 1.667-1.667 1.667H4.167A1.667 1.667 0 0 1 2.5 15V5c0-.92.746-1.667 1.667-1.667Z" stroke="currentColor" stroke-width="1.5" />
                <path d="m5 6.667 5 3.333 5-3.333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div class="contacts-card__body">
              <h2 class="contacts-card__title">
                Связаться
              </h2>
              <div class="contacts-card__rows">
                <a href="tel:+79064649496" class="contacts-card__link">
                  <span class="contacts-card__label">Телефон</span>
                  <span class="contacts-card__value">+7 (906) 464-94-96</span>
                </a>
                <a href="mailto:studio.unicorn.stv@gmail.com" class="contacts-card__link">
                  <span class="contacts-card__label">Почта</span>
                  <span class="contacts-card__value">studio.unicorn.stv@gmail.com</span>
                </a>
              </div>
            </div>
          </article>

          <article class="contacts-card">
            <div class="contacts-card__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7.5" stroke="currentColor" stroke-width="1.5" />
                <path d="M10 5.833V10l2.917 1.667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div class="contacts-card__body">
              <h2 class="contacts-card__title">
                График работы
              </h2>
              <p class="contacts-card__text">
                <span class="contacts-card__label">пн–вс</span>
                <span class="contacts-card__value contacts-card__value--inline">10:00 — 22:00</span>
              </p>
            </div>
          </article>

          <div class="contacts-page__footer">
            <div class="contacts-page__social">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                :aria-label="social.ariaLabel"
                target="_blank"
                rel="noopener noreferrer"
                class="contacts-page__social-link"
              >
                <svg
                  v-if="social.name === 'Telegram'"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.09-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"
                    fill="currentColor"
                  />
                </svg>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.743c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.814-.542 1.27-1.422 2.18-3.608 2.18-3.608.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"
                    fill="currentColor"
                  />
                </svg>
                <span>{{ social.name }}</span>
              </a>
            </div>

            <button
              type="button"
              class="contacts-page__cta"
              @click="openContactModal"
            >
              Записаться
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4.667 12.333 8 9 11.333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contacts-page {
  width: 100%;
  padding: 0 0 80px;

  &__hero {
    position: relative;
    width: 100%;
    overflow: hidden;
    background: var(--u-color-white);
    border: 1px solid var(--u-black-a04);
    border-radius: 20px;
    padding: 36px 20px;
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
    filter: blur(64px);
    opacity: 0.7;

    &--right {
      top: -72px;
      right: -48px;
      width: 200px;
      height: 200px;
      background: var(--u-pink-light-a45);
    }

    &--left {
      bottom: -64px;
      left: -32px;
      width: 180px;
      height: 180px;
      background: var(--u-purple-light-a45);
    }
  }

  &__hero-badge {
    display: inline-flex;
    width: fit-content;
    margin: 0 0 14px;
    border-radius: 8px;
    background: var(--u-pink-a06);
    padding: 5px 12px;
    color: var(--u-color-accent);
    font-size: var(--u-font-11);
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  &__hero-title {
    margin: 0;
    text-wrap: balance;
    color: #1a1716;
    font-size: var(--u-font-30);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.025em;
  }

  &__hero-subtitle {
    margin: 14px 0 0;
    max-width: 700px;
    text-wrap: pretty;
    color: var(--u-text-muted);
    font-size: var(--u-font-14);
    line-height: 1.65;
  }

  &__content {
    margin: 0 auto;
    padding-top: 32px;
  }

  &__layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: stretch;
  }

  &__map {
    overflow: hidden;
    min-height: 480px;
    border: 1px solid var(--u-black-a06);
    border-radius: 18px;
    background: #eee;

    iframe {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 480px;
      border: 0;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 100%;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: auto;
    padding-top: 6px;
  }

  &__social {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__social-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border: 1px solid var(--u-black-a06);
    border-radius: 10px;
    background: var(--u-color-white);
    color: #404040;
    font-size: var(--u-font-13);
    font-weight: 500;
    text-decoration: none;
    transition:
      border-color 0.2s ease,
      color 0.2s ease,
      background-color 0.2s ease;

    svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    &:hover {
      border-color: var(--u-pink-a18);
      background: var(--u-pink-a06);
      color: var(--u-color-accent);
    }
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 14px 20px;
    border: 0;
    border-radius: 12px;
    background: #1a1716;
    color: var(--u-color-white);
    cursor: pointer;
    font-size: var(--u-font-15);
    font-weight: 600;
    font-family: var(--u-font-montserrat);
    transition:
      background-color 0.25s ease,
      transform 0.15s ease;

    &:hover {
      background: #2a2523;
    }

    &:active {
      transform: scale(0.985);
    }
  }
}

.contacts-card {
  display: flex;
  gap: 16px;
  padding: 18px;
  border: 1px solid var(--u-black-a06);
  border-radius: 16px;
  background: var(--u-color-white);
  box-shadow: 0 1px 3px var(--u-black-a04);
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    border-color: var(--u-pink-a15);
    box-shadow: 0 6px 20px var(--u-pink-a08);
  }

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: var(--u-pink-a06);
    color: var(--u-color-accent);
  }

  &__body {
    flex: 1;
    min-width: 0;
  }

  &__title {
    margin: 0 0 8px;
    color: var(--u-text-muted);
    font-size: var(--u-font-11);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: var(--u-font-montserrat);
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 0;
  }

  &__rows {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  &__link {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px 0;
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
    }

    & + & {
      border-top: 1px solid var(--u-black-a04);
    }

    &:hover .contacts-card__value {
      color: var(--u-color-accent);
    }
  }

  &__label {
    color: var(--u-text-muted);
    font-size: var(--u-font-12);
    font-family: var(--u-font-montserrat);
  }

  &__value {
    color: #1a1716;
    font-size: var(--u-font-15);
    font-weight: 600;
    line-height: 1.4;
    font-family: var(--u-font-montserrat);
    word-break: break-word;
    transition: color 0.2s ease;

    &--inline {
      display: block;
      margin-top: 2px;
    }
  }

  &__text > &__value--inline {
    font-size: var(--u-font-16);
  }
}

@media (min-width: 640px) {
  .contacts-page {
    &__hero {
      padding: 44px 28px;
    }

    &__hero-title {
      font-size: var(--u-font-36);
    }

    &__hero-subtitle {
      font-size: var(--u-font-15);
    }

    &__content {
      padding-top: 40px;
    }
  }
}

@media (min-width: 1024px) {
  .contacts-page {
    &__hero {
      padding: 52px 36px;
    }

    &__hero-title {
      font-size: var(--u-font-46);
    }

    &__content {
      padding-top: 48px;
    }

    &__layout {
      gap: 28px;
    }

    &__map,
    &__map iframe {
      min-height: 560px;
    }
  }
}

@media (max-width: 768px) {
  .contacts-page {
    &__layout {
      grid-template-columns: 1fr;
    }

    &__info {
      order: -1;
    }
  }
}
</style>
