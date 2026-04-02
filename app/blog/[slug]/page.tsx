import { getAllSlugs, getPostBySlug } from "@/lib/sanity/queries"
import BlogPostClient from "./BlogPostClient"
import { BlogPostJsonLd } from "@/components/blog/BlogPostJsonLd"
import type { Metadata } from "next"

const BASE_URL = "https://synxapp.com"

function getPreferredTitle(post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>) {
  return post.titleZh || post.titleEn
}

function getPreferredDescription(post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>) {
  return post.descriptionZh || post.descriptionEn || ""
}

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

  const title = `${getPreferredTitle(post)} | Synx`
  const description = getPreferredDescription(post)
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
      alternateLocale: ["en_US"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
      languages: {
        "zh-TW": url,
        en: url,
        "x-default": url,
      },
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)
  const serverTitle = post ? getPreferredTitle(post) : null
  const serverDescription = post ? getPreferredDescription(post) : null

  return (
    <>
      {post ? <BlogPostJsonLd post={post} /> : null}

      {post ? (
        <article className="sr-only" aria-hidden="true">
          <h1>{serverTitle}</h1>
          {serverDescription ? <p>{serverDescription}</p> : null}
          <time dateTime={post.date}>{post.date}</time>
        </article>
      ) : null}

      <BlogPostClient post={post} slug={params.slug} suppressPrimaryHeading={Boolean(post)} />
    </>
  )
}
