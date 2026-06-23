<script setup lang="ts">
type PackagesSection = {
  eyebrow: string
  title: string
  subtitle: string
}

type PackageItem = {
  name: string
  subtitle: string
  description: string
  bullets: readonly string[]
  cta: string
}

defineProps<{
  packagesSection: PackagesSection
  packages: readonly PackageItem[]
}>()

const { open: openContactModal } = useContactModal()
</script>

<template>
  <section class="dist-packages" aria-labelledby="distribution-packages-title">
    <header class="dist-packages__header">
      <p class="dist-packages__eyebrow">{{ packagesSection.eyebrow }}</p>
      <h2 id="distribution-packages-title" class="dist-packages__title">
        {{ packagesSection.title }}
      </h2>
      <p class="dist-packages__subtitle">
        {{ packagesSection.subtitle }}
      </p>
    </header>

    <div class="dist-packages__grid">
      <article
        v-for="pkg in packages"
        :key="pkg.name"
        class="dist-packages__card"
      >
        <div class="dist-packages__card-main">
          <header class="dist-packages__card-head">
            <h3 class="dist-packages__card-title">{{ pkg.name }}</h3>
            <p v-if="pkg.subtitle" class="dist-packages__card-tagline">
              {{ pkg.subtitle }}
            </p>
          </header>

          <div class="dist-packages__card-body">
            <p v-if="pkg.description" class="dist-packages__card-description">
              {{ pkg.description }}
            </p>

            <ul v-if="pkg.bullets.length" class="dist-packages__card-list">
              <li
                v-for="bullet in pkg.bullets"
                :key="bullet"
                class="dist-packages__card-item"
              >
                {{ bullet }}
              </li>
            </ul>
          </div>
        </div>

        <footer class="dist-packages__card-footer">
          <button
            type="button"
            class="dist-packages__card-button"
            @click="openContactModal"
          >
            <span class="dist-packages__card-button-label">{{ pkg.cta }}</span>
          </button>
        </footer>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.dist-packages {
  display: grid;
  gap: 28px;
  font-family: var(--u-font-montserrat);

  &__header {
    display: grid;
    gap: 12px;
    max-width: 58ch;
  }

  &__eyebrow {
    margin: 0;
    color: var(--u-color-accent);
    font-size: var(--u-font-11);
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.7;
  }

  &__title {
    margin: 0;
    color: #1a1716;
    font-family: 'Montserrat', sans-serif;
    font-size: var(--u-font-fluid-display-page);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.025em;
  }

  &__subtitle {
    margin: 0;
    color: var(--u-text-muted);
    font-size: var(--u-font-16);
    line-height: 1.7;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    align-items: stretch;
  }

  &__card {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    border-radius: 18px;
    background: var(--u-color-white);
    border: 1px solid var(--u-black-a06);
    box-shadow: 0 1px 3px var(--u-black-a04);
    transition:
      border-color 0.25s ease,
      box-shadow 0.25s ease,
      transform 0.3s var(--u-ease-out);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--u-color-accent);
      opacity: 0.45;
    }

    &:hover {
      border-color: var(--u-pink-a15);
      box-shadow: 0 10px 28px var(--u-pink-a08);
      transform: translateY(-2px);
    }
  }

  &__card-main {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 28px 26px 10px;
    min-width: 0;
  }

  &__card-head {
    display: grid;
    gap: 8px;
    margin-bottom: 20px;
  }

  &__card-title {
    margin: 0;
    color: #1a1716;
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.32;
    letter-spacing: -0.015em;
  }

  &__card-tagline {
    margin: 0;
    color: var(--u-color-accent);
    font-size: var(--u-font-13);
    font-weight: 600;
    line-height: 1.5;
  }

  &__card-body {
    display: grid;
    gap: 18px;
  }

  &__card-description {
    margin: 0;
    color: var(--u-text-muted);
    font-size: var(--u-font-14);
    line-height: 1.7;
  }

  &__card-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 11px;
  }

  &__card-item {
    position: relative;
    padding-left: 15px;
    color: #374151;
    font-size: var(--u-font-14);
    line-height: 1.55;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.62em;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--u-color-accent);
      opacity: 0.5;
    }
  }

  &__card-footer {
    margin-top: auto;
    padding: 20px 26px 24px;
    border-top: 1px solid var(--u-black-a06);
  }

  &__card-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 100%;
    padding: 13px 16px;
    border: 1px solid var(--u-black-a08);
    border-radius: 12px;
    background: transparent;
    color: #1a1716;
    font-family: var(--u-font-montserrat);
    cursor: pointer;
    transition:
      background-color 0.25s ease,
      border-color 0.25s ease,
      color 0.25s ease;

    &:hover {
      background: #1a1716;
      border-color: #1a1716;
      color: var(--u-color-white);

      .dist-packages__card-button-price {
        color: var(--u-white-a85);
      }
    }
  }

  &__card-button-label {
    font-size: var(--u-font-14);
    font-weight: 600;
    line-height: 1.2;
  }

  &__card-button-price {
    font-size: var(--u-font-13);
    font-weight: 500;
    line-height: 1.3;
    color: var(--u-text-body);
    transition: color 0.2s ease;
  }
}

@media (min-width: 900px) {
  .dist-packages {
    gap: 36px;

    &__grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
    }

    &__card-main {
      padding: 30px 28px 20px;
    }

    &__card-head {
      margin-bottom: 22px;
    }

    &__card-title {
      font-size: 22px;
    }

    &__card-footer {
      padding: 22px 28px 26px;
    }
  }
}

@media (max-width: 640px) {
  .dist-packages {
    gap: 28px;

    &__card {
      border-radius: 14px;
    }

    &__card-main {
      padding: 22px 20px 0;
    }

    &__card-head {
      margin-bottom: 16px;
      gap: 6px;
    }

    &__card-title {
      font-size: var(--u-font-18);
    }

    &__card-body {
      gap: 16px;
    }

    &__card-footer {
      padding: 18px 20px 22px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .dist-packages__card-button {
    transition: none;
  }
}
</style>
