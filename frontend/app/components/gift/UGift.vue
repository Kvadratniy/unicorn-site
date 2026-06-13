<script setup lang="ts">
const { open: openContactModal } = useContactModal()

const features = [
  { icon: '₽', value: 'от 1 000', label: 'Любой номинал' },
  { icon: '∞', value: '12 мес', label: 'Срок действия' },
  { icon: '★', value: '100%', label: 'Все услуги' },
]
</script>

<template>
  <section class="gift-section">
    <div class="gift-bg">
      <div class="gift-gradient" />
      <div class="gift-pattern" />
    </div>

    <div class="gift-container">
      <div class="gift-layout">
        <div class="gift-visual">
          <div class="gift-cert">
            <div class="gift-cert-inner">
              <div class="gift-cert-shine" />
              <div class="gift-cert-row">
                <span class="gift-cert-logo">Юникорн</span>
                <span class="gift-cert-label">СЕРТИФИКАТ</span>
              </div>
              <div class="gift-cert-amount">
                <span class="amount-currency">₽</span>
                <span class="amount-value">5 000</span>
              </div>
              <div class="gift-cert-row">
                <span class="gift-cert-validity">Действителен 1 год</span>
                <span class="gift-cert-code">#Юникорн-2026</span>
              </div>
            </div>
          </div>
          <div class="gift-float gift-float-1">🎵</div>
          <div class="gift-float gift-float-2">🎤</div>
          <div class="gift-float gift-float-3">🎧</div>
        </div>

        <div class="gift-info">
          <span class="gift-badge">
            Подарок
          </span>

          <h2 class="gift-title">
            Подарочный{{ ' ' }}<br aria-hidden="true"><span class="gift-title-accent">сертификат</span>
          </h2>

          <p class="gift-description">
            Идеальный подарок для тех, кто мечтает о музыке.
            Сертификат можно использовать на любые услуги студии —
            от уроков вокала до профессиональной записи.
          </p>

          <div class="gift-features">
            <div
              v-for="(feature, i) in features"
              :key="i"
              class="gift-feature"
            >
              <span class="gift-feature-icon">
                {{ feature.icon }}
              </span>
              <div class="gift-feature-text">
                <span class="gift-feature-value">{{ feature.value }}</span>
                <span class="gift-feature-label">{{ feature.label }}</span>
              </div>
            </div>
          </div>

          <div class="gift-actions">
            <button type="button" class="gift-btn" @click="openContactModal">
              <span>Узнать больше</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="gift-btn-icon">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
$lg: 1024px;
$ease-out: cubic-bezier(0.23, 1, 0.32, 1);

.gift-section {
  position: relative;
  width: 100%;
  padding: 60px 0;
  overflow: hidden;
}

.gift-bg,
.gift-gradient,
.gift-pattern {
  position: absolute;
  inset: 0;
}

.gift-bg {
  z-index: 0;
}

.gift-gradient {
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%);
}

.gift-pattern {
  background-image:
    radial-gradient(circle at 20% 30%, var(--u-pink-a15) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, var(--u-purple-a15) 0%, transparent 50%);
}

.gift-pattern::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--u-white-a02) 1px, transparent 1px),
    linear-gradient(90deg, var(--u-white-a02) 1px, transparent 1px);
  background-size: 60px 60px;
}

.gift-container {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  padding: 0 24px;
  margin: 0 auto;

  @media (min-width: $lg) {
    padding: 0 40px;
  }
}

.gift-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;

  @media (min-width: $lg) {
    flex-direction: row;
    justify-content: space-between;
    gap: 80px;
  }
}

.gift-visual {
  position: relative;
  flex-shrink: 0;

  @media (min-width: $lg) {
    order: 2;
  }
}

.gift-cert {
  width: 320px;
  perspective: 1000px;

  @media (min-width: $lg) {
    width: 420px;
  }
}

.gift-cert-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 200px;
  padding: 28px;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%);
  border: 1px solid var(--u-white-a10);
  border-radius: 20px;
  box-shadow:
    0 30px 60px var(--u-black-a40),
    0 0 0 1px var(--u-white-a05) inset,
    0 0 80px var(--u-pink-a15);
  transform: rotateY(-5deg) rotateX(5deg);
  transition: transform 0.5s $ease-out;

  &:hover {
    transform: rotateY(0) rotateX(0) scale(1.02);
  }

  @media (min-width: $lg) {
    height: 260px;
    padding: 36px;
    border-radius: 24px;
  }
}

.gift-cert-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 40%,
    var(--u-white-a03) 45%,
    var(--u-white-a05) 50%,
    var(--u-white-a03) 55%,
    transparent 60%
  );
  animation: gift-shine 8s ease-in-out infinite;
}

.gift-cert-row {
  display: flex;
  justify-content: space-between;
}

.gift-cert-logo {
  font-size: var(--u-font-20);
  font-weight: 800;
  background: var(--u-gradient-brand);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (min-width: $lg) {
    font-size: var(--u-font-24);
  }
}

.gift-cert-label {
  font-size: var(--u-font-10);
  font-weight: 700;
  color: rgb(255 255 255 / 40%);
  letter-spacing: 0.3em;

  @media (min-width: $lg) {
    font-size: var(--u-font-11);
  }
}

.gift-cert-amount {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.amount-currency {
  font-size: var(--u-font-28);
  font-weight: 300;
  color: rgb(255 255 255 / 50%);

  @media (min-width: $lg) {
    font-size: var(--u-font-36);
  }
}

.amount-value {
  font-family: 'Druk Wide', sans-serif;
  font-size: var(--u-font-48);
  font-weight: 800;
  color: var(--u-color-white);
  letter-spacing: -0.025em;

  @media (min-width: $lg) {
    font-size: var(--u-font-64);
  }
}

.gift-cert-validity {
  font-size: var(--u-font-11);
  font-weight: 500;
  color: rgb(255 255 255 / 40%);

  @media (min-width: $lg) {
    font-size: var(--u-font-12);
  }
}

.gift-cert-code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: var(--u-font-11);
  font-weight: 600;
  color: rgb(255 255 255 / 30%);

  @media (min-width: $lg) {
    font-size: var(--u-font-12);
  }
}

.gift-info {
  max-width: 520px;
  text-align: center;

  @media (min-width: $lg) {
    order: 1;
    text-align: left;
  }
}

.gift-title {
  margin: 0 0 24px;
  font-family: 'Druk Wide', sans-serif;
  font-size: var(--u-font-fluid-display-gift);
  font-weight: 800;
  line-height: 1;
  color: var(--u-color-white);
  letter-spacing: -0.025em;
}

.gift-title-accent {
  background: var(--u-gradient-brand);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gift-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  margin-bottom: 24px;
  font-size: var(--u-font-12);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  background: var(--u-pink-a15);
  border: 1px solid;
  border-radius: 9999px;
  border-color: var(--u-pink-a30);
  color: var(--u-color-pink);
}

.gift-description {
  margin: 0 0 40px;
  font-size: var(--u-font-16);
  line-height: 1.625;
  color: rgb(255 255 255 / 60%);

  @media (min-width: $lg) {
    font-size: var(--u-font-18);
  }
}

.gift-features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-bottom: 40px;

  @media (min-width: $lg) {
    justify-content: flex-start;
    gap: 24px;
  }
}

.gift-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: var(--u-white-a05);
  border: 1px solid;
  border-radius: 16px;
  border-color: var(--u-white-a08);
  transition: all 0.3s;

  &:hover {
    background: var(--u-white-a08);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
}

.gift-feature-icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  font-size: var(--u-font-18);
  font-weight: 700;
  color: var(--u-color-white);
  background: linear-gradient(135deg, var(--u-pink-a20), rgba(139, 92, 246, 0.2));
  border-radius: 12px;
}

.gift-feature-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gift-feature-value {
  font-size: var(--u-font-16);
  font-weight: 700;
  color: var(--u-color-white);
}

.gift-feature-label {
  font-size: var(--u-font-12);
  font-weight: 500;
  color: rgb(255 255 255 / 50%);
}

.gift-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media (min-width: $lg) {
    flex-direction: row;
    gap: 24px;
  }
}

.gift-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 36px;
  font-size: var(--u-font-16);
  font-weight: 700;
  color: var(--u-color-white);
  background: var(--u-gradient-brand);
  border: 0;
  border-radius: 14px;
  box-shadow: 0 8px 32px var(--u-pink-a30);
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 16px 48px var(--u-pink-a40);
    transform: translateY(-4px);

    .gift-btn-icon {
      transform: translateX(4px);
    }
  }
}

.gift-btn-icon {
  transition: transform 0.3s;
}

.gift-float {
  position: absolute;
  font-size: var(--u-font-32);
  animation: gift-float 6s ease-in-out infinite;
  filter: drop-shadow(0 10px 20px var(--u-black-a30));
}

.gift-float-1 {
  top: -20px;
  right: -10px;
  animation-delay: 0s;

  @media (min-width: $lg) {
    top: -30px;
    right: -20px;
  }
}

.gift-float-2 {
  bottom: -15px;
  left: -20px;
  animation-delay: -2s;

  @media (min-width: $lg) {
    bottom: -20px;
    left: -30px;
  }
}

.gift-float-3 {
  top: 50%;
  right: -30px;
  font-size: var(--u-font-28);
  animation-delay: -4s;

  @media (min-width: $lg) {
    right: -50px;
    font-size: var(--u-font-36);
  }
}

@media (min-width: $lg) {
  .gift-float {
    font-size: var(--u-font-40);
  }
}

@keyframes gift-shine {
  0%, 100% {
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
  }
  50% {
    transform: translateX(0%) translateY(0%) rotate(45deg);
  }
}

@keyframes gift-float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .gift-cert-shine,
  .gift-float {
    animation: none;
  }

  .gift-cert-inner {
    transform: none;
  }

  .gift-cert-inner:hover {
    transform: none;
  }

  .gift-feature:hover {
    transform: none;
  }

  .gift-btn:hover {
    transform: none;
  }

  .gift-btn-icon {
    transition: none;
  }
}
</style>
