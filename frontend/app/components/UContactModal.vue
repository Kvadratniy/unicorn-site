<script setup lang="ts">
type Props = {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const closeModal = () => {
  emit('close')
}

// Блокировка скролла страницы при открытой модалке
let scrollY = 0

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      scrollY = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      window.scrollTo(0, scrollY)
    }
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
})

const handleBackdropClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    closeModal()
  }
}

const phone = '+7 (906) 464-94-96'
const address = 'Ставрополь, ул. 50 лет ВЛКСМ 93, 5 этаж'

const socialLinks = {
  whatsapp: 'https://wa.me/79064649496',
  telegram: 'https://t.me/+79064649496',
  max: 'https://max.ru/u/f9LHodD0cOJqtwO9DMr_9wejvhGTZo-_v0zi8fEeWerMyz9nOjWLvm8IJdo',
}

// Яндекс Навигатор
const yandexMapsLink = 'https://yandex.ru/maps/-/CDaZzRxB'

// Цель Метрики: переход в WhatsApp (id цели 485817348)
const { public: { yandexMetrikaId } } = useRuntimeConfig()
const YANDEX_GOAL_WHATSAPP = '485817348'

const sendWhatsAppGoal = () => {
  const id = yandexMetrikaId ? Number(yandexMetrikaId) : 0
  if (!id) return
  const w = import.meta.client ? window : null
  const ym = w && (w as unknown as { ym?: (id: number, action: string, goal: string) => void }).ym
  if (ym) {
    ym(id, 'reachGoal', YANDEX_GOAL_WHATSAPP)
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="modal-backdrop"
        @click="handleBackdropClick"
      >
        <div class="modal-content">
          <!-- Fixed header (handle, close, title) -->
          <div class="modal-header">
            <h2 class="modal-title">Свяжитесь с нами</h2>
            <button class="modal-close" @click="closeModal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <div class="modal-content-scroll">
          <!-- Phone Button -->
          <a :href="`tel:${phone.replace(/\s/g, '')}`" class="modal-phone-button">
            <div class="modal-phone-avatar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div class="modal-phone-content">
              <span class="modal-phone-name">Unicorn Studio</span>
              <span class="modal-phone-number">{{ phone }}</span>
            </div>
          </a>

          <!-- Messengers -->
          <div class="modal-messengers">
            <a :href="socialLinks.max" target="_blank" rel="noopener noreferrer" class="modal-messenger modal-messenger--max">
              <div class="modal-messenger-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 5.58 2 10c0 2.24 1.12 4.24 2.88 5.66L4 20l4.34-2.17C9.52 18.26 10.74 18.5 12 18.5c5.52 0 10-3.58 10-8S17.52 2 12 2z"/>
                </svg>
              </div>
              <div class="modal-messenger-content">
                <span class="modal-messenger-name">MAX</span>
                <span class="modal-messenger-desc">Написать в мессенджер</span>
              </div>
              <svg class="modal-messenger-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a :href="socialLinks.telegram" target="_blank" rel="noopener noreferrer" class="modal-messenger modal-messenger--telegram">
              <div class="modal-messenger-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              <div class="modal-messenger-content">
                <span class="modal-messenger-name">Telegram</span>
                <span class="modal-messenger-desc">Написать в мессенджер</span>
              </div>
              <svg class="modal-messenger-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a :href="socialLinks.whatsapp" target="_blank" rel="noopener noreferrer" class="modal-messenger modal-messenger--whatsapp" @click="sendWhatsAppGoal">
              <div class="modal-messenger-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div class="modal-messenger-content">
                <span class="modal-messenger-name">WhatsApp</span>
                <span class="modal-messenger-desc">Написать в мессенджер</span>
              </div>
              <svg class="modal-messenger-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <!-- Social & Address -->
          <div class="modal-footer">
            <div class="modal-footer-section">
              <div class="modal-footer-title">Адрес</div>
              <a :href="yandexMapsLink" target="_blank" rel="noopener noreferrer" class="modal-address">
                {{ address }}
              </a>
            </div>
          </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: var(--u-black-a60);
  backdrop-filter: blur(8px);
  transition: background 0.35s ease, backdrop-filter 0.35s ease;
}

.modal-content {
  position: relative;
  width: 100%;
  max-width: 440px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 32px;
  background: var(--u-color-white);
  border: 1px solid var(--u-black-a08);
  border-radius: 24px;
  box-shadow: 
    0 25px 50px -12px var(--u-black-a25),
    0 0 0 1px var(--u-white-a10) inset;
  scroll-behavior: smooth;
}

.modal-header {
  position: relative;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:  0 0 20px;
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: transparent;
  color: #a3a3a3;
  cursor: pointer;
  transition: color 0.25s ease, transform 0.25s ease;
}

.modal-close:hover {
  color: #171717;
  transform: scale(1.05);
}

.modal-title {
  font-size: var(--u-font-24);
  font-weight: 700;
  color: #171717;
  letter-spacing: -0.02em;
}

/* Phone Button */
.modal-phone-button {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 14px 16px;
  background: #22c55e;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s var(--u-ease-standard);
  margin-bottom: 24px;
}

.modal-phone-button:hover {
  background: #16a34a;
}

.modal-phone-button:active {
  background: #15803d;
}

.modal-phone-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--u-white-a20);
  border-radius: 50%;
  color: var(--u-color-white);
  flex-shrink: 0;
}

.modal-phone-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.modal-phone-name {
  font-size: var(--u-font-16);
  font-weight: 600;
  color: var(--u-color-white);
  line-height: 1.2;
}

.modal-phone-number {
  font-size: var(--u-font-15);
  font-weight: 400;
  color: var(--u-white-a90);
  line-height: 1.2;
}

/* Messengers */
.modal-messengers {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.modal-messenger {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 14px;
  text-decoration: none;
  background: #f5f5f5;
  border: 1px solid var(--u-black-a06);
  transition: all 0.3s var(--u-ease-standard);
}

.modal-messenger:hover {
  background: #ebebeb;
  border-color: var(--u-black-a10);
  box-shadow: 0 4px 12px var(--u-black-a06);
  transform: translateY(-1px);
}

.modal-messenger:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px var(--u-black-a04);
}

.modal-messenger-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  color: var(--u-color-white);
  flex-shrink: 0;
  transition: transform 0.3s var(--u-ease-standard);
}

.modal-messenger:hover .modal-messenger-icon {
  transform: scale(1.05);
}

.modal-messenger-icon svg {
  flex-shrink: 0;
}

.modal-messenger-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.modal-messenger-name {
  font-size: var(--u-font-15);
  font-weight: 600;
  color: #171717;
  line-height: 1.2;
}

.modal-messenger-desc {
  font-size: var(--u-font-13);
  font-weight: 400;
  color: #737373;
  line-height: 1.2;
}

.modal-messenger-arrow {
  flex-shrink: 0;
  color: #a3a3a3;
  transition: color 0.25s ease, transform 0.3s var(--u-ease-standard);
}

.modal-messenger:hover .modal-messenger-arrow {
  color: #525252;
  transform: translateX(2px);
}

.modal-messenger--whatsapp .modal-messenger-icon {
  background: #25D366;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.35);
}

.modal-messenger--telegram .modal-messenger-icon {
  background: #0088cc;
  box-shadow: 0 4px 12px rgba(0, 136, 204, 0.35);
}

.modal-messenger--max .modal-messenger-icon {
  background: linear-gradient(135deg, #6366F1 0%, var(--u-color-purple) 100%);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
}

/* Footer */
.modal-footer {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid var(--u-black-a08);
}

.modal-footer-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.modal-footer-title {
  font-size: var(--u-font-13);
  font-weight: 600;
  color: #a3a3a3;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.modal-address {
  font-size: var(--u-font-15);
  color: #525252;
  text-decoration: none;
  transition: color 0.25s ease;
  line-height: 1.5;
}

.modal-address:hover {
  color: #171717;
}

/* Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.35s var(--u-ease-standard);
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.4s var(--u-ease-emphasized), opacity 0.35s var(--u-ease-standard);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}

/* Mobile — bottom sheet */
@media (max-width: 640px) {
  .modal-backdrop {
    align-items: flex-end;
    justify-content: center;
    padding: 0;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    height: 80vh;
    max-height: 80vh;
    border-radius: 24px 24px 0 0;
    padding: 0;
    padding-top: 8px;
    box-shadow: 0 -4px 24px var(--u-black-a15);
    overflow: hidden;
  }

  .modal-content-scroll {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    padding: 0 20px calc(28px + env(safe-area-inset-bottom, 0px));
  }

  .modal-header {
    padding-left: 20px;
    flex-shrink: 0;
    padding: 20px;
  }

  .modal-close {
    top: 12px;
    right: 16px;
  }

  .modal-title {
    font-size: var(--u-font-22);
  }

  .modal-messenger {
    padding: 10px 14px;
  }

  .modal-messenger-icon {
    width: 40px;
    height: 40px;
  }

  .modal-messenger-icon svg {
    width: 20px;
    height: 20px;
  }
}

/* Bottom sheet animation on mobile */
@media (max-width: 640px) {
  .modal-enter-active .modal-content,
  .modal-leave-active .modal-content {
    transition: transform 0.45s var(--u-ease-emphasized), opacity 0.35s var(--u-ease-standard);
  }

  .modal-enter-from .modal-content,
  .modal-leave-to .modal-content {
    transform: translateY(100%);
    opacity: 1;
  }

  .modal-enter-to .modal-content,
  .modal-leave-from .modal-content {
    transform: translateY(0);
  }
}
</style>
