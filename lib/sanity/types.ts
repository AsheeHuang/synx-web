export interface SanityCoverImage {
  url: string
  alt?: string
}

export interface SanityPost {
  slug: string
  date: string
  author: string
  tags: string[]
  coverImage?: SanityCoverImage
  title: string
  description: string
  content: string
  readingTime?: number
}

export interface SanityPostSummary {
  slug: string
  date: string
  author: string
  tags: string[]
  coverImage?: SanityCoverImage
  title: string
  description: string
  readingTime?: number
}
