import { sanityClient } from './client'
import type { SanityPost, SanityPostSummary } from './types'

function estimateReadingTime(content: string): number {
  if (!content) return 1
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200))
}

export async function getAllPostSummaries(): Promise<SanityPostSummary[]> {
  const posts = await sanityClient.fetch<SanityPostSummary[]>(`
    *[_type == "post"] | order(date desc) {
      "slug": slug.current,
      date,
      author,
      tags,
      "coverImage": coverImage { "url": asset->url, alt },
      title,
      description,
    }
  `)
  return posts ?? []
}

export async function getAllSlugs(): Promise<string[]> {
  const slugs = await sanityClient.fetch<{ slug: string }[]>(`
    *[_type == "post"] { "slug": slug.current }
  `)
  return (slugs ?? []).map((s) => s.slug)
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  const post = await sanityClient.fetch<SanityPost | null>(`
    *[_type == "post" && slug.current == $slug][0] {
      "slug": slug.current,
      date,
      author,
      tags,
      "coverImage": coverImage { "url": asset->url, alt },
      title,
      description,
      content,
    }
  `, { slug })

  if (!post) return null

  return {
    ...post,
    readingTime: estimateReadingTime(post.content ?? ''),
  }
}
