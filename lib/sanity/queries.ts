import { sanityClient } from './client'
import type { SanityPost, SanityPostSummary } from './types'

function estimateReadingTime(blocks: any[]): number {
  if (!blocks || !blocks.length) return 1
  const text = blocks
    .filter((b) => b._type === 'block')
    .map((b) => b.children?.map((c: any) => c.text).join('') ?? '')
    .join(' ')
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200))
}

export async function getAllPostSummaries(): Promise<SanityPostSummary[]> {
  const posts = await sanityClient.fetch<SanityPostSummary[]>(`
    *[_type == "post"] | order(date desc) {
      "slug": slug.current,
      date,
      author,
      tags,
      "coverImage": coverImage { "url": asset->url, alt },
      titleEn,
      titleZh,
      descriptionEn,
      descriptionZh,
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
      titleEn,
      titleZh,
      descriptionEn,
      descriptionZh,
      "contentEn": contentEn[]{
        ...,
        _type == "image" => { ..., "asset": asset->{ url } }
      },
      "contentZh": contentZh[]{
        ...,
        _type == "image" => { ..., "asset": asset->{ url } }
      },
    }
  `, { slug })

  if (!post) return null

  return {
    ...post,
    readingTime: estimateReadingTime(
      post.contentEn?.length ? post.contentEn : (post.contentZh ?? [])
    ),
  }
}
