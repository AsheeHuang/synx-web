import { getAllSlugs, getPostBySlug } from "@/lib/sanity/queries"
import BlogPostClient from "./BlogPostClient"
import { BlogPostJsonLd } from "@/components/blog/BlogPostJsonLd"
import type { Metadata } from "next"

const BASE_URL = "https://synxapp.com"

export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs()
    if (slugs.length > 0) {
      return slugs.map((slug) => ({ slug }))
    }
  } catch {
    // Sanity unreachable at build time — fall through to stub
  }
  return [{ slug: "_placeholder" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Post Not Found | Synx Blog" }

  const title = `${post.title} | Synx`
  const description = post.description || ""
  const url = `${BASE_URL}/blog/${post.slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      url,
      siteName: "Synx",
      locale: "zh_TW",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  return (
    <>
      {post ? <BlogPostJsonLd post={post} /> : null}
      <BlogPostClient post={post} slug={slug} />
    </>
  )
}
