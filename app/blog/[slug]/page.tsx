import { getAllSlugs, getPostBySlug } from "@/lib/sanity/queries"
import BlogPostClient from "./BlogPostClient"
import type { Metadata } from "next"

export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs()
    if (slugs.length > 0) {
      return slugs.map((slug) => ({ slug }))
    }
  } catch {
    // Sanity unreachable at build time — fall through to stub
  }
  // Static export requires at least one param; use a stub that renders "not found"
  return [{ slug: "_placeholder" }]
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: "Post Not Found | Synx Blog" }

  const title = `${post.titleEn} | Synx Blog`
  const description = post.descriptionEn || ""

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
      url: `https://synxapp.com/blog/${post.slug}`,
      siteName: "Synx",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://synxapp.com/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)
  return <BlogPostClient post={post} slug={params.slug} />
}
