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
    radial-gradient(circle at 20% 30%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%);
}

.gift-pattern::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}

.gift-container {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  padding: 0 1.5rem;
  margin: 0 auto;

  @media (min-width: $lg) {
    padding: 0 2.5rem;
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
    gap: 5rem;
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
  padding: 1.75rem;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset,
    0 0 80px rgba(236, 72, 153, 0.15);
  transform: rotateY(-5deg) rotateX(5deg);
  transition: transform 0.5s $ease-out;

  &:hover {
    transform: rotateY(0) rotateX(0) scale(1.02);
  }

  @media (min-width: $lg) {
    height: 260px;
    padding: 2.25rem;
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
    rgba(255, 255, 255, 0.03) 45%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.03) 55%,
    transparent 60%
  );
  animation: gift-shine 8s ease-in-out infinite;
}

.gift-cert-row {
  display: flex;
  justify-content: space-between;
}

.gift-cert-logo {
  font-size: 1.25rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (min-width: $lg) {
    font-size: 1.5rem;
  }
}

.gift-cert-label {
  font-size: 10px;
  font-weight: 700;
  color: rgb(255 255 255 / 40%);
  letter-spacing: 0.3em;

  @media (min-width: $lg) {
    font-size: 11px;
  }
}

.gift-cert-amount {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.amount-currency {
  font-size: 28px;
  font-weight: 300;
  color: rgb(255 255 255 / 50%);

  @media (min-width: $lg) {
    font-size: 2.25rem;
  }
}

.amount-value {
  font-family: 'Druk Wide', sans-serif;
  font-size: 3rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.025em;

  @media (min-width: $lg) {
    font-size: 64px;
  }
}

.gift-cert-validity {
  font-size: 11px;
  font-weight: 500;
  color: rgb(255 255 255 / 40%);

  @media (min-width: $lg) {
    font-size: 0.75rem;
  }
}

.gift-cert-code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 11px;
  font-weight: 600;
  color: rgb(255 255 255 / 30%);

  @media (min-width: $lg) {
    font-size: 0.75rem;
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
  margin: 0 0 1.5rem;
  font-family: 'Druk Wide', sans-serif;
  font-size: clamp(2.25rem, 8vw, 3.5rem);
  font-weight: 800;
  line-height: 1;
  color: #fff;
  letter-spacing: -0.025em;
}

.gift-title-accent {
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gift-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  background: rgba(236, 72, 153, 0.15);
  border: 1px solid;
  border-radius: 9999px;
  border-color: rgba(236, 72, 153, 0.3);
  color: #ec4899;
}

.gift-description {
  margin: 0 0 2.5rem;
  font-size: 1rem;
  line-height: 1.625;
  color: rgb(255 255 255 / 60%);

  @media (min-width: $lg) {
    font-size: 1.125rem;
  }
}

.gift-features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2.5rem;

  @media (min-width: $lg) {
    justify-content: flex-start;
    gap: 1.5rem;
  }
}

.gift-feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid;
  border-radius: 1rem;
  border-color: rgba(255, 255, 255, 0.08);
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-0.125rem);
  }
}

.gift-feature-icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.2));
  border-radius: 0.75rem;
}

.gift-feature-text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.gift-feature-value {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
}

.gift-feature-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgb(255 255 255 / 50%);
}

.gift-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (min-width: $lg) {
    flex-direction: row;
    gap: 1.5rem;
  }
}

.gift-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 18px 2.25rem;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  border: 0;
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(236, 72, 153, 0.3);
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 16px 48px rgba(236, 72, 153, 0.4);
    transform: translateY(-4px);

    .gift-btn-icon {
      transform: translateX(0.25rem);
    }
  }
}

.gift-btn-icon {
  transition: transform 0.3s;
}

.gift-float {
  position: absolute;
  font-size: 32px;
  animation: gift-float 6s ease-in-out infinite;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
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
  font-size: 28px;
  animation-delay: -4s;

  @media (min-width: $lg) {
    right: -50px;
    font-size: 36px;
  }
}

@media (min-width: $lg) {
  .gift-float {
    font-size: 40px;
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
