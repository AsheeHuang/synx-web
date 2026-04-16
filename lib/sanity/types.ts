export type Language = 'en' | 'zh'

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
  titleEn: string
  titleZh: string
  descriptionEn: string
  descriptionZh: string
  contentEn: any[]
  contentZh: any[]
  readingTime?: number
}

export interface SanityPostSummary {
  slug: string
  date: string
  author: string
  tags: string[]
  coverImage?: SanityCoverImage
  titleEn: string
  titleZh: string
  descriptionEn: string
  descriptionZh: string
  readingTime?: number
}
