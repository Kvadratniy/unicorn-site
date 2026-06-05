export const newsContentBlockTypes = {
  paragraph: 'paragraph',
  heading: 'heading',
  list: 'list',
} as const

export type NewsContentBlockType =
  (typeof newsContentBlockTypes)[keyof typeof newsContentBlockTypes]

export type NewsContentParagraph = {
  type: typeof newsContentBlockTypes.paragraph
  text: string
}

export type NewsContentHeading = {
  type: typeof newsContentBlockTypes.heading
  text: string
}

export type NewsContentList = {
  type: typeof newsContentBlockTypes.list
  items: string[]
  /** По умолчанию маркированный список (`ul`); `true` — нумерованный (`ol`) */
  ordered?: boolean
}

export type NewsContentBlock = NewsContentParagraph | NewsContentHeading | NewsContentList

export type NewsAuthor = {
  name: string
  avatarUrl?: string
}

export type NewsArticle = {
  id: string
  title: string
  subtitle: string
  author: NewsAuthor
  category: string
  publishDate: string
  readingTime: string
  heroImage: string
  content: NewsContentBlock[]
}
