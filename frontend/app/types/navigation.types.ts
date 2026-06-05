export type NavigationMenuItem = {
  title: string
  description: string
  icon: string
  src: string
}

export type NavigationEntry = {
  label: string
  subtitle?: string
  to?: string
  items?: NavigationMenuItem[]
}
