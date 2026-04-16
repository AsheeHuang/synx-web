# Blog Markdown Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Sanity Portable Text block content with plain Markdown strings and drop bilingual support — blog becomes Chinese-only.

**Architecture:** Sanity schema fields are simplified to single-language `title`/`description`/`content` (text type). Frontend replaces `@portabletext/react` with `react-markdown` + `remark-gfm`. Language toggle and all bilingual logic are removed across the blog.

**Tech Stack:** Next.js 15 App Router, Sanity, `react-markdown`, `remark-gfm` (both already installed)

---

## File Map

| File | Action | What changes |
|---|---|---|
| `studio/schemaTypes/post.js` | Modify | Drop EN/ZH fields → single `title`, `description`, `content` (text) |
| `lib/sanity/types.ts` | Modify | Update `SanityPost` + `SanityPostSummary`, remove `Language` export |
| `lib/sanity/queries.ts` | Modify | Update GROQ queries + fix `estimateReadingTime` for string |
| `components/blog/MarkdownRenderer.tsx` | Create | New renderer using `react-markdown` + `remark-gfm` |
| `components/blog/PortableTextRenderer.tsx` | Delete | Replaced by `MarkdownRenderer` |
| `components/blog/PostHeader.tsx` | Modify | Remove `language` prop, hardcode Chinese locale/labels |
| `components/blog/PostCard.tsx` | Modify | Remove `language` prop, use `post.title`/`post.description` directly |
| `components/blog/BlogPostJsonLd.tsx` | Modify | Use `post.title`/`post.description` directly |
| `app/blog/BlogListClient.tsx` | Modify | Remove `language` prop, hardcode Chinese labels |
| `app/blog/page.tsx` | Modify | Remove language toggle + state, hardcode Chinese heading |
| `app/blog/[slug]/BlogPostClient.tsx` | Modify | Remove language toggle, use `MarkdownRenderer`, use `post.content` |
| `app/blog/[slug]/page.tsx` | Modify | Remove bilingual helpers, use `post.title`/`post.description` |

---

### Task 1: Update Sanity schema

**Files:**
- Modify: `studio/schemaTypes/post.js`

- [ ] **Step 1: Replace the schema**

Replace the entire content of `studio/schemaTypes/post.js` with:

```js
import { defineField, defineType } from 'sanity'

export const postSchema = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Published Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Synx Team',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt text' },
      ],
    }),
    defineField({
      name: 'title',
      title: '標題',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '描述',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: '內容 (Markdown)',
      type: 'text',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'date' },
  },
})
```

- [ ] **Step 2: Commit**

```bash
git add studio/schemaTypes/post.js
git commit -m "feat(schema): replace Portable Text with markdown text field, drop bilingual"
```

---

### Task 2: Update TypeScript types

**Files:**
- Modify: `lib/sanity/types.ts`

- [ ] **Step 1: Replace the file content**

```ts
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
```

Note: `Language` type is removed — the blog is now Chinese-only. The main site's `lib/language.ts` has its own `Language` type and is unaffected.

- [ ] **Step 2: Commit**

```bash
git add lib/sanity/types.ts
git commit -m "feat(types): update SanityPost for single-language markdown content"
```

---

### Task 3: Update GROQ queries

**Files:**
- Modify: `lib/sanity/queries.ts`

- [ ] **Step 1: Replace the file content**

```ts
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
```

- [ ] **Step 2: Commit**

```bash
git add lib/sanity/queries.ts
git commit -m "feat(queries): update GROQ for single-language markdown fields"
```

---

### Task 4: Create MarkdownRenderer component

**Files:**
- Create: `components/blog/MarkdownRenderer.tsx`

- [ ] **Step 1: Create the file**

```tsx
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Components } from "react-markdown"

const components: Components = {
  p: ({ children }) => (
    <p className="mb-6 leading-[1.8] text-foreground font-serif">{children}</p>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-5 leading-tight">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-10 mb-4 leading-tight">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-semibold text-foreground mt-8 mb-3">{children}</h4>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-muted-foreground text-lg leading-relaxed">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 ml-6 space-y-2 list-disc text-foreground font-serif">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 ml-6 space-y-2 list-decimal text-foreground font-serif">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children, className }) => {
    const isBlock = !!className
    if (isBlock) {
      return (
        <code className="block bg-[#1e1e2e] text-[#cdd6f4] p-6 rounded-lg overflow-x-auto text-sm leading-relaxed font-mono">
          {children}
        </code>
      )
    }
    return (
      <code className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
        {children}
      </code>
    )
  },
  pre: ({ children }) => (
    <pre className="bg-[#1e1e2e] my-8 rounded-lg overflow-x-auto">{children}</pre>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
    >
      {children}
    </a>
  ),
  img: ({ src, alt }) => (
    <figure className="my-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? ""}
        className="w-full rounded-lg shadow-sm"
        loading="lazy"
      />
    </figure>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 text-left border border-border text-foreground bg-secondary font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 text-left border border-border text-foreground">{children}</td>
  ),
  hr: () => <hr className="my-10 border-border" />,
}

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null
  return (
    <div className="prose-custom">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/blog/MarkdownRenderer.tsx
git commit -m "feat(blog): add MarkdownRenderer using react-markdown + remark-gfm"
```

---

### Task 5: Update PostHeader

**Files:**
- Modify: `components/blog/PostHeader.tsx`

- [ ] **Step 1: Replace the file content**

```tsx
import { Calendar } from "lucide-react"

interface PostHeaderProps {
  title: string
  date: string
  author: string
  tags: string[]
  readingTime?: number
  hideTitle?: boolean
}

export function PostHeader({ title, date, author, tags, readingTime, hideTitle = false }: PostHeaderProps) {
  return (
    <header className="mb-12 pb-8 border-b border-border">
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="text-xs font-medium uppercase tracking-wider text-primary">
              {tag}
            </span>
          ))}
        </div>
      )}

      {!hideTitle && (
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
          {title}
        </h1>
      )}

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <time dateTime={date}>
            {new Date(date).toLocaleDateString("zh-TW", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        {author && (
          <span>作者 <span className="font-medium text-foreground">{author}</span></span>
        )}
        {readingTime && (
          <span>{readingTime} 分鐘閱讀</span>
        )}
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/blog/PostHeader.tsx
git commit -m "feat(blog): remove language prop from PostHeader, hardcode zh-TW"
```

---

### Task 6: Update PostCard

**Files:**
- Modify: `components/blog/PostCard.tsx`

- [ ] **Step 1: Replace the file content**

```tsx
import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"
import type { SanityPostSummary } from "@/lib/sanity/types"

interface PostCardProps {
  post: SanityPostSummary
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-200 cursor-pointer">
      <Link href={`/blog/${post.slug}`} className="flex flex-col flex-1">
        {/* Cover image */}
        <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden">
          {post.coverImage?.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <Image
                src="/icon_fill.png"
                alt="Synx"
                width={128}
                height={128}
                className="w-16 h-16 rounded-xl opacity-40"
              />
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium uppercase tracking-wider text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-150 line-clamp-2">
            {post.title}
          </h2>

          {/* Description */}
          {post.description && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
              {post.description}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1 mt-auto">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("zh-TW", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/blog/PostCard.tsx
git commit -m "feat(blog): remove language prop from PostCard, use post.title directly"
```

---

### Task 7: Update BlogPostJsonLd

**Files:**
- Modify: `components/blog/BlogPostJsonLd.tsx`

- [ ] **Step 1: Replace the file content**

```tsx
import type { SanityPost } from "@/lib/sanity/types"

interface BlogPostJsonLdProps {
  post: SanityPost
}

const BASE_URL = "https://synxapp.com"

export function BlogPostJsonLd({ post }: BlogPostJsonLdProps) {
  const url = `${BASE_URL}/blog/${post.slug}`

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || "",
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: url,
    url,
    inLanguage: "zh-TW",
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Synx",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icon_fill.png`,
      },
    },
    keywords: post.tags,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/blog/BlogPostJsonLd.tsx
git commit -m "feat(blog): simplify JsonLd to single-language zh-TW"
```

---

### Task 8: Update BlogListClient

**Files:**
- Modify: `app/blog/BlogListClient.tsx`

- [ ] **Step 1: Replace the file content**

```tsx
"use client"

import { useState } from "react"
import { PostCard } from "@/components/blog/PostCard"
import { TagFilter } from "@/components/blog/TagFilter"
import type { SanityPostSummary } from "@/lib/sanity/types"

interface BlogListClientProps {
  posts: SanityPostSummary[]
  allTags: string[]
}

export function BlogListClient({ posts, allTags }: BlogListClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = selectedTag
    ? posts.filter((p) => p.tags?.includes(selectedTag))
    : posts

  return (
    <>
      <TagFilter
        tags={allTags}
        selectedTag={selectedTag}
        onSelect={setSelectedTag}
        allLabel="所有文章"
      />
      {filteredPosts.length === 0 ? (
        <p className="text-muted-foreground text-center py-20">目前還沒有文章。敬請期待！</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/blog/BlogListClient.tsx
git commit -m "feat(blog): remove language prop from BlogListClient"
```

---

### Task 9: Update blog list page

**Files:**
- Modify: `app/blog/page.tsx`

- [ ] **Step 1: Replace the file content**

```tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { getAllPostSummaries } from "@/lib/sanity/queries"
import { BlogListClient } from "./BlogListClient"
import type { SanityPostSummary } from "@/lib/sanity/types"

export default function BlogPage() {
  const [posts, setPosts] = useState<SanityPostSummary[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    getAllPostSummaries().then(setPosts)
  }, [mounted])

  if (!mounted) return null

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags ?? []))).sort()

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-[var(--banner-h,0px)] left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/icon_fill.png" alt="Synx" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 rounded" />
              <span className="text-xl sm:text-2xl font-bold text-foreground">Synx</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4 leading-none tracking-tight">
            資產管理部落格
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-[55ch]">
            分享淨資產追蹤、投資記錄、定期定額與資產管理流程的實作心得
          </p>
        </div>

        <BlogListClient posts={posts} allTags={allTags} />
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/blog/page.tsx
git commit -m "feat(blog): remove language toggle from blog list page"
```

---

### Task 10: Update BlogPostClient

**Files:**
- Modify: `app/blog/[slug]/BlogPostClient.tsx`

- [ ] **Step 1: Replace the file content**

```tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { PostHeader } from "@/components/blog/PostHeader"
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer"
import { ReadingProgress } from "@/components/blog/ReadingProgress"
import type { SanityPost } from "@/lib/sanity/types"

interface BlogPostClientProps {
  post: SanityPost | null
  slug: string
  suppressPrimaryHeading?: boolean
}

export default function BlogPostClient({ post, slug, suppressPrimaryHeading = false }: BlogPostClientProps) {
  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <header className="fixed top-[var(--banner-h,0px)] left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16 sm:h-20">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/icon_fill.png" alt="Synx" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 rounded" />
                <span className="text-xl sm:text-2xl font-bold text-foreground">Synx</span>
              </Link>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">找不到文章</h1>
            <p className="text-muted-foreground mb-8">您尋找的文章不存在或已被移除。</p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回部落格
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <header className="fixed top-[var(--banner-h,0px)] left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/icon_fill.png" alt="Synx" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 rounded" />
              <span className="text-xl sm:text-2xl font-bold text-foreground">Synx</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <article className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group cursor-pointer">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
            返回部落格
          </Link>

          <PostHeader
            title={post.title}
            date={post.date}
            author={post.author}
            tags={post.tags ?? []}
            readingTime={post.readingTime}
            hideTitle={suppressPrimaryHeading}
          />

          <MarkdownRenderer content={post.content} />

          {post.author && (
            <footer className="mt-16 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                作者{" "}
                <span className="font-semibold text-foreground">{post.author}</span>
              </p>
            </footer>
          )}
        </article>
      </main>
    </div>
  )
}
```

Note: `BlogPostClient` no longer needs `useState`/`useEffect` for language — it can be a regular client component (still needs `"use client"` for `ReadingProgress`).

- [ ] **Step 2: Commit**

```bash
git add app/blog/[slug]/BlogPostClient.tsx
git commit -m "feat(blog): remove language toggle from BlogPostClient, use MarkdownRenderer"
```

---

### Task 11: Update blog post page (server component)

**Files:**
- Modify: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Replace the file content**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add app/blog/[slug]/page.tsx
git commit -m "feat(blog): simplify post page metadata to single-language"
```

---

### Task 12: Remove PortableTextRenderer and uninstall dependency

**Files:**
- Delete: `components/blog/PortableTextRenderer.tsx`

- [ ] **Step 1: Delete the old renderer**

```bash
rm components/blog/PortableTextRenderer.tsx
```

- [ ] **Step 2: Uninstall @portabletext/react**

```bash
npm uninstall @portabletext/react
```

- [ ] **Step 3: Verify the build passes**

```bash
npm run build
```

Expected: build completes with no errors related to missing imports or type mismatches.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove PortableTextRenderer and @portabletext/react"
```

---

### Task 13: Manual verification

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

- [ ] **Step 2: Verify blog list page**

Open `http://localhost:3000/blog` and confirm:
- Language toggle button is gone
- Page renders in Chinese
- Post cards show correctly

- [ ] **Step 3: Verify blog post page**

Navigate to any post (or create a test post in Sanity with Markdown content including `# heading`, `**bold**`, a table, and `![img](url)`) and confirm:
- Language toggle is gone
- Heading renders correctly
- Tables render with borders
- Images render from URL
- Code blocks render in dark background

- [ ] **Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix(blog): post-migration visual fixes"
```
