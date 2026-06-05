export type MenuItem = {
  title: string
  description: string
  icon: string
  src: string
}

export type MenuLinkItem = {
  title: string
  to: string
  preview: string
  tone: 'blue' | 'violet' | 'yellow'
}

export const featuredMenuLinks: MenuLinkItem[] = [
  {
    title: 'Как подготовиться к первой записи в студии',
    to: '/studio',
    preview: '◉',
    tone: 'blue',
  },
  {
    title: 'Как выбрать направление обучения',
    to: '/vocal',
    preview: '◉',
    tone: 'violet',
  },
  {
    title: 'Записаться на консультацию',
    to: '/contacts',
    preview: '◉',
    tone: 'yellow',
  },
]