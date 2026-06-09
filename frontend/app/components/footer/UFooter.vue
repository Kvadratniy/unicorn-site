<script setup lang="ts">
const route = useRoute()

const menuItems = [
  { label: 'Студия звукозаписи', to: '/studio/' },
  { label: 'Курсы вокала', to: '/vocal/' },
  { label: 'Курсы фортепиано', to: '/piano/' },
  { label: 'Курсы гитары', to: '/guitar/' },
  { label: 'Новости', to: '/news/' },
  // { label: 'Музыкальная дистрибуция', to: '/distribution' },
  // { label: 'Аренда', to: '/rent' },
  { label: 'Контакты', to: '/contacts/' },
]

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

const contacts = {
  phone: '+7 (906) 464-94-96',
  email: 'studio.unicorn.stv@gmail.com',
  address: `Ставрополь, ул. 50 лет ВЛКСМ д. 93, 5 этаж`,
}
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Логотип и описание -->
      <div class="footer-section footer-section--logo">
        <h2 class="footer-logo-text">Юникорн</h2>
        <p class="footer-description">
          Творческая студия в Ставрополе. Помогаем реализовывать творческий потенциал на высшем
          уровне.
        </p>
      </div>

      <!-- Навигация -->
      <div class="footer-section footer-section--nav">
        <h3 class="footer-title">Навигация</h3>
        <nav class="footer-nav">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.to"
            :to="item.to"
            class="footer-link"
            :class="{ 'footer-link--active': route.path === item.to }"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>

      <!-- Контакты -->
      <div class="footer-section footer-section--contacts">
        <h3 class="footer-title">Контакты</h3>
        <div class="footer-contacts">
          <a :href="`tel:${contacts.phone.replace(/[^0-9+]/g, '')}`" class="footer-contact">
            <span class="footer-contact-icon">📞</span>
            <span>{{ contacts.phone }}</span>
          </a>
          <a :href="`mailto:${contacts.email}`" class="footer-contact">
            <span class="footer-contact-icon">✉️</span>
            <span>{{ contacts.email }}</span>
          </a>
          <div class="footer-contact">
            <span class="footer-contact-icon">📍</span>
            <span>{{ contacts.address }}</span>
          </div>
        </div>
      </div>

      <!-- Социальные сети -->
      <div class="footer-section footer-section--social">
        <h3 class="footer-title">Мы в соцсетях</h3>
        <div class="footer-social">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            :aria-label="social.ariaLabel"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-social-link"
          >
            <svg
              v-if="social.name === 'Telegram'"
              class="footer-social-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.09-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"
                fill="currentColor"
              />
            </svg>
            <svg
              v-else-if="social.name === 'VKontakte'"
              class="footer-social-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.743c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.814-.542 1.27-1.422 2.18-3.608 2.18-3.608.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Копирайт -->
    <div class="footer-bottom">
      <p class="footer-copyright">
        © {{ new Date().getFullYear() }} Юникорн. Все права защищены.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #fff;
  padding: 60px 20px 20px;
  position: relative;
  z-index: 10;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(236, 72, 153, 0.5),
    transparent
  );
}

.footer-container {
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-section--logo {
  max-width: 300px;
}

.footer-logo-text {
  font-size: 24px;
  font-weight: 700;
  font-family: 'Druk Wide', sans-serif;
  color: #fff;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.footer-description {
  font-size: 14px;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 500;
}

.footer-title {
  font-size: 18px;
  font-weight: 700;
  font-family: 'Druk Wide', sans-serif;
  color: #fff;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  padding-left: 0;
  display: inline-block;
  width: fit-content;
}

.footer-link::before {
  content: '';
  position: absolute;
  left: -16px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 2px;
  background: var(--ui-primary, #ec4899);
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-link:hover {
  color: #fff;
  padding-left: 20px;
}

.footer-link:hover::before {
  width: 12px;
}

.footer-link--active {
  color: var(--ui-primary, #ec4899);
  font-weight: 600;
}

.footer-contacts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-contact {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 500;
  transition: color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-contact:hover {
  color: #fff;
}

.footer-contact-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.footer-social {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.footer-social-link {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.footer-social-link:hover {
  background: rgba(236, 72, 153, 0.2);
  border-color: var(--ui-primary, #ec4899);
  transform: translateY(-2px);
}

.footer-social-icon {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.9);
  fill: currentColor;
  flex-shrink: 0;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  margin-top: 40px;
  text-align: center;
}

.footer-copyright {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 500;
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 20px 20px;
  }

  .footer-container {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer-section {
    gap: 16px;
  }
}
</style>
