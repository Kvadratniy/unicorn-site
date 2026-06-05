<script setup lang="ts">
usePageSeo({
  title: 'Ведём яркие праздники в Ставрополе — диджей, ведущий, организация мероприятий',
  description:
    'Профессиональная организация и проведение мероприятий в Ставрополе: свадьбы, корпоративы, дни рождения, фестивали. Диджей, ведущий, звуковое оборудование, полный цикл под ключ.',
  keywords:
    'организация мероприятий ставрополь, ведущий на свадьбу ставрополь, диджей на праздник ставрополь, корпоратив под ключ, организация свадьбы ставрополь, проведение праздников, звуковое оборудование в аренду, ведущий на день рождения, организация фестивалей, event агентство ставрополь',
  noindex: true,
})

const { open: openContactModal } = useContactModal()
</script>

<template>
  <div class="flex flex-col gap-10 pb-10">
    <UHero
      image-src="/images/studio/main.jpg"
      video-src="/video/main.mp4"
      title-id="events-hero-title"
      title-accent="Всем хочется"
      title-line2="праздник мечты!"
      description="А мы организуем и проводим такие мероприятия! Любого масштаба: от камерного торжества до масштабного фестиваля."
      :stats="[{ value: 'от 20 до 1000+ гостей', label: 'организуем мероприятия любого масштаба' }]"
    >
      <template #actions>
        <UButton variant="hero-primary" @click="openContactModal">
          Рассчитать стоимость
        </UButton>
        <UButton to="#services" variant="ghost" :icon="false">
          Наши услуги
        </UButton>
      </template>
    </UHero>
    <UBreadcrumbs />
    <EventsAbout />
    <EventsServices />
    <EventsTypes />
    <EventsWorkflow />
    <EventsPortfolio />
    <EventsVideoGallery />
    <EventsTestimonials />
    <UFaq
      title-id="events-faq-title"
      title="Часто задаваемые вопросы"
      subtitle="Ответы на популярные вопросы о проведении мероприятий"
      id-prefix="events-faq"
      :items="faqItems"
    />
    <section class="cta-section relative w-full overflow-hidden py-20 lg:py-28">
      <div class="relative z-10 mx-auto max-w-[1200px] px-6 text-center lg:px-10">
        <h2 class="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
          Готовы организовать ваш яркий праздник?
        </h2>
        <p class="mx-auto mb-10 max-w-2xl text-lg leading-relaxed  lg:text-xl">
          Пройдите опрос и оставьте заявку прямо сейчас, и наш менеджер свяжется с вами в течение 1 часа для бесплатной консультации!
        </p>
        <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <UButton variant="hero-primary" @click="openContactModal">
            Получить консультацию
          </UButton>
          <a
            href="tel:+79280000000"
            class="inline-flex items-center gap-2 rounded-[14px] border-2 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 3h3l2 7-2.5 1.5a11 11 0 006 6L10 15l7 2v3a2 2 0 01-2 2A16 16 0 012 5a2 2 0 012-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            +7 (928) 000-00-00
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
const faqItems = [
  {
    question: 'Сколько стоит организация мероприятия?',
    answer: 'Стоимость зависит от масштаба, формата и набора услуг. Пройдите наш опрос в телеграмме, и мы подготовим индивидуальный расчёт. Опрос занимает 5 минут, но мы будем знать уже многое о вас и вашем торжестве.',
  },
  {
    question: 'Можно ли заказать только ведущего или только диджея?',
    answer: 'Да, вы можете выбрать отдельные услуги. Мы предлагаем гибкий подход и готовы предоставить как комплексное решение, так и отдельные услуги в зависимости от ваших потребностей.',
  },
  {
    question: 'Работаете ли вы с нестандартными площадками?',
    answer: 'Да, мы адаптируем решения под любые условия — от ресторанов до открытых пространств и лофтов. Наша команда имеет опыт работы с самыми разными локациями.',
  },
  {
    question: 'Как забронировать дату?',
    answer: 'Свяжитесь с нами любым удобным способом, мы проверим доступность и забронируем дату после подписания договора.',
  },
]
</script>
