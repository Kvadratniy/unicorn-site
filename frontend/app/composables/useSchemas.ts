type SchemaServiceItem = {
  title: string
  subtitle?: string
  description: string
  priceFrom: string
}

type FaqItem = {
  question: string
  answer: string
}

type ServiceSchemaInput = {
  siteUrl: string
  pageUrl: string
  servicesTitle: string
  services: SchemaServiceItem[]
}

type DistributionPackageItem = {
  name: string
  subtitle: string
  description: string
  cta: string
}

type CreateDistributionServiceSchemaInput = {
  siteUrl: string
  pageUrl: string
  packagesTitle: string
  packages: DistributionPackageItem[]
}

type RentOptionItem = {
  title: string
  subtitle: string
  description: string
  ctaLabel: string
}

type CreateRentServiceSchemaInput = {
  siteUrl: string
  pageUrl: string
  options: RentOptionItem[]
}

type NewsListItem = {
  id: string
  title: string
  subtitle: string
  heroImage: string
  publishDate: string
}

type CreateNewsCollectionSchemaInput = {
  siteUrl: string
  pageUrl: string
  articles: NewsListItem[]
}

type NewsAuthorItem = {
  name: string
}

type NewsArticleItem = {
  id: string
  title: string
  subtitle: string
  heroImage: string
  publishDate: string
  category: string
  author?: NewsAuthorItem
}

type CreateNewsArticleSchemaInput = {
  siteUrl: string
  pageUrl: string
  article: NewsArticleItem
}

type BaseServiceSchemaOptions = {
  siteUrl: string
  pageUrl: string
  serviceType: string
  name: string
  description: string
  audience?: Array<{ '@type': 'PeopleAudience'; audienceType: string }>
}

const SCHEMA_CONTEXT = 'https://schema.org'
const CURRENCY = 'RUB'
const LOGO_PATH = '/images/logo/logo-4.png'
const DAY_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const

const COMPANY_NAME = 'Unicorn Studio'
const COMPANY_PHONE = '+7-906-464-94-96'
const COMPANY_EMAIL = 'studio.unicorn.stv@gmail.com'
const COMPANY_STREET = 'ул. 50 лет ВЛКСМ, д. 93'
const COMPANY_CITY = 'Ставрополь'
const COMPANY_COUNTRY = 'RU'
const COMPANY_LAT = 45.000217
const COMPANY_LNG = 41.9192

const COMMON_SERVICE_AUDIENCE = [
  { '@type': 'PeopleAudience' as const, audienceType: 'Дети' },
  { '@type': 'PeopleAudience' as const, audienceType: 'Взрослые' },
]

const basePostalAddress = () => ({
  '@type': 'PostalAddress',
  addressCountry: COMPANY_COUNTRY,
  addressLocality: COMPANY_CITY,
  streetAddress: COMPANY_STREET,
})

const baseAreaServed = () => ({
  '@type': 'City',
  name: COMPANY_CITY,
})

const baseProvider = (siteUrl: string) => ({
  '@type': 'Organization',
  '@id': `${siteUrl}#organization`,
  name: COMPANY_NAME,
  url: siteUrl,
  telephone: COMPANY_PHONE,
  address: basePostalAddress(),
})

const openingHoursSpecification = () => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: [...DAY_OF_WEEK],
  opens: '10:00',
  closes: '22:00',
})

const getPriceValue = (value: string) => value.replace(/[^\d]/g, '')

const createPriceOffer = (priceValue: string, unitText: string) =>
  priceValue
    ? {
        '@type': 'Offer',
        priceCurrency: CURRENCY,
        price: priceValue,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: CURRENCY,
          price: priceValue,
          unitText,
        },
      }
    : undefined

const createServiceCatalogFromServices = (
  title: string,
  services: SchemaServiceItem[],
) => ({
  '@type': 'OfferCatalog',
  name: title,
  itemListElement: services.map(item => ({
    '@type': 'Offer',
    priceCurrency: CURRENCY,
    itemOffered: {
      '@type': 'Service',
      name: item.title,
      description: item.description,
      audience: COMMON_SERVICE_AUDIENCE,
    },
  })),
})

const createBaseServiceSchema = ({
  siteUrl,
  pageUrl,
  serviceType,
  name,
  description,
  audience,
}: BaseServiceSchemaOptions) => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'Service',
  '@id': `${pageUrl}#service`,
  serviceType,
  name,
  description,
  url: pageUrl,
  areaServed: baseAreaServed(),
  provider: baseProvider(siteUrl),
  ...(audience ? { audience } : {}),
})

const toIsoDate = (value: string): string | undefined => {
  if (!value) return undefined
  const parsed = new Date(value)
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString()

  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/)
  if (!match) return undefined

  const [, dd, mm, yyyy] = match
  const fromRu = new Date(`${yyyy}-${mm}-${dd}T00:00:00.000Z`)
  return Number.isNaN(fromRu.getTime()) ? undefined : fromRu.toISOString()
}

export const createOrganizationSchema = (siteUrl: string) => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'Organization',
  '@id': `${siteUrl}#organization`,
  name: COMPANY_NAME,
  legalName: COMPANY_NAME,
  url: siteUrl,
  logo: `${siteUrl}${LOGO_PATH}`,
  image: `${siteUrl}${LOGO_PATH}`,
  description:
    'Музыкальная студия в Ставрополе: уроки вокала, фортепиано и гитары, студия звукозаписи, аранжировка, сведение и мастеринг.',
  slogan: 'Полный цикл музыкального производства в Ставрополе',
  telephone: COMPANY_PHONE,
  email: COMPANY_EMAIL,
  priceRange: 'от 1000 RUB',
  address: basePostalAddress(),
  geo: {
    '@type': 'GeoCoordinates',
    latitude: COMPANY_LAT,
    longitude: COMPANY_LNG,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
    contactType: 'customer service',
    hoursAvailable: openingHoursSpecification(),
    areaServed: COMPANY_COUNTRY,
    availableLanguage: 'Russian',
  },
  openingHoursSpecification: openingHoursSpecification(),
  areaServed: baseAreaServed(),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Услуги Unicorn Studio',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Обучение',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Уроки вокала' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Уроки гитары' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Уроки фортепиано' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Уроки музыкального продюсирования' } },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Студийные услуги',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Звукозапись' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Аранжировка' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Сведение' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Мастеринг' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Коррекция вокала' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Саунд-дизайн' } },
        ],
      },
    ],
  },
  makesOffer: [
    {
      '@type': 'Offer',
      url: `${siteUrl}/vocal/`,
      priceCurrency: CURRENCY,
      itemOffered: {
        '@type': 'Service',
        name: 'Уроки вокала',
      },
    },
    {
      '@type': 'Offer',
      url: `${siteUrl}/studio/`,
      priceCurrency: CURRENCY,
      itemOffered: {
        '@type': 'Service',
        name: 'Студия звукозаписи',
      },
    },
  ],
  knowsAbout: [
    'Обучение вокалу',
    'Постановка голоса',
    'Уроки гитары',
    'Уроки фортепиано',
    'Звукозапись',
    'Сведение',
    'Мастеринг',
    'Аранжировка',
  ],
  sameAs: ['https://vk.com/1unicornstudio'],
})

export const createLocalBusinessSchema = (siteUrl: string) => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/contacts#local-business`,
  name: COMPANY_NAME,
  url: siteUrl,
  image: `${siteUrl}${LOGO_PATH}`,
  telephone: COMPANY_PHONE,
  email: COMPANY_EMAIL,
  address: basePostalAddress(),
  geo: {
    '@type': 'GeoCoordinates',
    latitude: COMPANY_LAT,
    longitude: COMPANY_LNG,
  },
  openingHoursSpecification: openingHoursSpecification(),
  areaServed: baseAreaServed(),
  parentOrganization: {
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: COMPANY_NAME,
    url: siteUrl,
  },
})

const createGenericCourseServiceSchema = (
  input: ServiceSchemaInput,
  options: {
    serviceType: string
    name: string
    description: string
    catalogFallback: string
    unitText: string
  },
) => {
  const firstPrice = input.services.find(item => item.priceFrom)?.priceFrom || ''
  const priceValue = getPriceValue(firstPrice)
  const offer = createPriceOffer(priceValue, options.unitText)

  return {
    ...createBaseServiceSchema({
      siteUrl: input.siteUrl,
      pageUrl: input.pageUrl,
      serviceType: options.serviceType,
      name: options.name,
      description: options.description,
      audience: COMMON_SERVICE_AUDIENCE,
    }),
    hasOfferCatalog: createServiceCatalogFromServices(
      input.servicesTitle || options.catalogFallback,
      input.services,
    ),
    offers: offer,
  }
}

export const createVocalServiceSchema = (input: ServiceSchemaInput) =>
  createGenericCourseServiceSchema(input, {
    serviceType: 'Уроки вокала',
    name: 'Уроки вокала в Ставрополе',
    description: 'Обучение вокалу для детей и взрослых с нуля: индивидуальные и групповые занятия, постановка голоса и дыхания.',
    catalogFallback: 'Программы по вокалу',
    unitText: 'за занятие',
  })

export const createStudioServiceSchema = (input: ServiceSchemaInput) =>
  createGenericCourseServiceSchema(input, {
    serviceType: 'Студия звукозаписи',
    name: 'Студия звукозаписи в Ставрополе',
    description: 'Профессиональная запись вокала и инструментов, сведение, мастеринг и аранжировка. Услуги студии полного цикла в Ставрополе.',
    catalogFallback: 'Услуги студии звукозаписи',
    unitText: 'за услугу',
  })

export const createPianoServiceSchema = (input: ServiceSchemaInput) =>
  createGenericCourseServiceSchema(input, {
    serviceType: 'Уроки фортепиано',
    name: 'Уроки фортепиано в Ставрополе',
    description: 'Индивидуальные занятия по фортепиано для взрослых и детей: обучение с нуля, развитие техники и музыкального слуха.',
    catalogFallback: 'Программы по фортепиано',
    unitText: 'за занятие',
  })

export const createGuitarServiceSchema = (input: ServiceSchemaInput) =>
  createGenericCourseServiceSchema(input, {
    serviceType: 'Уроки гитары',
    name: 'Уроки гитары в Ставрополе',
    description: 'Индивидуальные занятия по гитаре для взрослых и детей: акустическая, электрогитара, бас-гитара и укулеле.',
    catalogFallback: 'Программы по гитаре',
    unitText: 'за занятие',
  })

export const createDistributionServiceSchema = ({
  siteUrl,
  pageUrl,
  packagesTitle,
  packages,
}: CreateDistributionServiceSchemaInput) => ({
  ...createBaseServiceSchema({
    siteUrl,
    pageUrl,
    serviceType: 'Музыкальная дистрибуция',
    name: 'Музыкальная дистрибуция в Ставрополе',
    description: 'Подготовка и выпуск релизов на стриминговые платформы, оформление карточки артиста и запуск монетизации.',
    audience: COMMON_SERVICE_AUDIENCE,
  }),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: packagesTitle || 'Пакеты музыкальной дистрибуции',
    itemListElement: packages.map(pkg => ({
      '@type': 'Offer',
      priceCurrency: CURRENCY,
      description: pkg.cta || undefined,
      itemOffered: {
        '@type': 'Service',
        name: pkg.name,
        description: [pkg.subtitle, pkg.description].filter(Boolean).join('. '),
        audience: COMMON_SERVICE_AUDIENCE,
      },
    })),
  },
})

export const createRentServiceSchema = ({
  siteUrl,
  pageUrl,
  options,
}: CreateRentServiceSchemaInput) => ({
  ...createBaseServiceSchema({
    siteUrl,
    pageUrl,
    serviceType: 'Аренда вокального класса и студии звукозаписи',
    name: 'Аренда вокального класса и студии звукозаписи в Ставрополе',
    description: 'Почасовая аренда вокального класса и студии звукозаписи для репетиций, записи и самостоятельной работы.',
    audience: COMMON_SERVICE_AUDIENCE,
  }),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Форматы аренды',
    itemListElement: options.map(option => ({
      '@type': 'Offer',
      description: option.ctaLabel || undefined,
      itemOffered: {
        '@type': 'Service',
        name: option.title,
        description: [option.subtitle, option.description].filter(Boolean).join('. '),
        audience: COMMON_SERVICE_AUDIENCE,
      },
    })),
  },
})

export const createNewsCollectionSchema = ({
  siteUrl,
  pageUrl,
  articles,
}: CreateNewsCollectionSchemaInput) => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'CollectionPage',
  '@id': `${pageUrl}#collection`,
  name: 'Новости и полезные материалы Unicorn Studio',
  description:
    'Статьи и заметки студии о вокале, инструментах, записи и музыкальном продакшене.',
  url: pageUrl,
  isPartOf: {
    '@type': 'WebSite',
    url: siteUrl,
  },
  publisher: {
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: COMPANY_NAME,
    url: siteUrl,
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: articles.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/news/${article.id}/`,
      item: {
        '@type': 'Article',
        headline: article.title,
        description: article.subtitle || undefined,
        image: article.heroImage || undefined,
        datePublished: toIsoDate(article.publishDate),
      },
    })),
  },
})

export const createNewsArticleSchema = ({
  siteUrl,
  pageUrl,
  article,
}: CreateNewsArticleSchemaInput) => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'NewsArticle',
  '@id': `${pageUrl}#article`,
  mainEntityOfPage: pageUrl,
  url: pageUrl,
  headline: article.title,
  description: article.subtitle || undefined,
  image: article.heroImage || undefined,
  articleSection: article.category || undefined,
  datePublished: toIsoDate(article.publishDate),
  dateModified: toIsoDate(article.publishDate),
  author: article.author?.name
    ? {
        '@type': 'Person',
        name: article.author.name,
      }
    : {
        '@type': 'Organization',
        name: COMPANY_NAME,
      },
  publisher: {
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: COMPANY_NAME,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}${LOGO_PATH}`,
    },
  },
})

export const createFaqPageSchema = (pageUrl: string, items: FaqItem[]) => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'FAQPage',
  '@id': `${pageUrl}#faq`,
  mainEntity: items.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
})
