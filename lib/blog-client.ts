// Client-side blog data loader
// This file loads pre-generated blog post data for static export

import blogDataEn from "@/public/blog-data-en.json"
import blogDataZh from "@/public/blog-data-zh.json"

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  author: string
  readingTime?: number
}

export function getBlogPosts(language: "en" | "zh"): BlogPost[] {
  return language === "en" ? blogDataEn : blogDataZh
}
