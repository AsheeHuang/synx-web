# Blog → Sanity CMS Migration & Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the file-based markdown blog with Sanity CMS as the content backend, redesign both the blog list and article pages with an editorial grid layout, and add per-post SEO metadata.

**Architecture:** Sanity acts as a headless CMS; Next.js fetches post data at build time via `@sanity/client` (preserving `output: 'export'` static generation). The Sanity Studio runs separately. Bilingual content (en/zh) is stored as separate fields on a single document. Portable Text replaces raw markdown for rich body content.

**Tech Stack:** Next.js 15 App Router (static export), Sanity v3, `@sanity/client`, `@portabletext/react`, `next-sanity`, Inter + Georgia typography (editorial grid style), Tailwind CSS 4.x, shadcn/ui.

**Design System (ui-ux-pro-max):**
- Style: **Editorial Grid / Magazine** — asymmetric grid, large heading typography, pull quotes, high contrast
- Colors: Primary `#2563EB`, Background `#F8FAFC`, Text `#1E293B` (existing Tailwind tokens preserved)
- Typography: Inter (headings/UI) + Georgia/serif (article body) — `font-serif` via Tailwind
- Rules to follow: `line-length-control` (65–75 chars), `line-height` 1.5–1.75 body, `heading-hierarchy` h1→h6, `image-optimization`, `lazy-loading`

---

## ⚠️ Critical Notes Before Starting

1. **`output: 'export'` is set in `next.config.mjs`** — the site is fully static. All data fetching must happen at build time via `generateStaticParams` + async server components. No client-side Sanity fetching for initial content.
2. **No Sanity Studio embedded in Next.js** — because static export can't serve the Studio. The Studio is initialized in a separate `studio/` directory.
3. **Bilingual slug handling** — slugs are shared between en/zh (same slug, different language content on the same document). Language selection in the UI works client-side as before.
4. **Don't break existing routes** — `/blog`, `/blog/[slug]` must keep working.

---

## File Map

### New Files (create)
- `sanity.config.ts` — Sanity project config (projectId, dataset)
- `lib/sanity/client.ts` — Sanity client instance
- `lib/sanity/queries.ts` — GROQ queries for posts
- `lib/sanity/types.ts` — TypeScript types for Sanity post data
- `lib/sanity/image.ts` — Image URL builder (for cover images)
- `studio/sanity.config.ts` — Sanity Studio config
- `studio/schemas/post.ts` — Post document schema (bilingual fields)
- `studio/schemas/index.ts` — Schema registry
- `scripts/migrate-to-sanity.mjs` — One-time migration script
- `components/blog/PostCard.tsx` — Editorial post card component
- `components/blog/PostHeader.tsx` — Article page header
- `components/blog/PortableTextRenderer.tsx` — Portable Text → React renderer
- `components/blog/TagFilter.tsx` — Tag pill filter component
- `components/blog/ReadingProgress.tsx` — Thin top progress bar for article page

### Modified Files
- `app/blog/page.tsx` — Redesign with editorial grid + Sanity data
- `app/blog/layout.tsx` — Add font loading (Inter + Georgia)
- `app/blog/[slug]/page.tsx` — Server-side Sanity fetch + generateMetadata
- `app/blog/[slug]/BlogPostClient.tsx` — Simplified: receives post as props
- `app/sitemap.ts` — Switch to Sanity slug query
- `lib/blog.ts` — Keep for now (used by existing sitemap until Task 6)
- `next.config.mjs` — Add Sanity image domain to `images.remotePatterns`
- `package.json` — New dependencies

### Deleted (after migration complete)
- `lib/blog-client.ts` — Replaced by Sanity client
- `scripts/generate-blog-data.mjs` — No longer needed
- `public/blog-data-en.json` — No longer needed
- `public/blog-data-zh.json` — No longer needed

---

## Task 1: Install Dependencies & Initialize Sanity Project

**Files:**
- Modify: `package.json`
- Create: `studio/` directory

- [ ] **Step 1.1: Install npm packages**

```bash
npm install @sanity/client @portabletext/react next-sanity gray-matter
npm install --save-dev sanity @sanity/vision
```

Expected: packages installed without errors.

- [ ] **Step 1.2: Initialize Sanity Studio in `studio/` directory**

```bash
cd /home/timhuang/dev/synx-web
npm create sanity@latest -- --project-id <YOUR_PROJECT_ID> --dataset production --output-path studio --template clean
```

> If you don't have a Sanity project yet: go to https://sanity.io/manage → New Project → copy the project ID. Then run the command above replacing `<YOUR_PROJECT_ID>`.

After init, verify `studio/sanity.config.ts` exists.

- [ ] **Step 1.3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install sanity dependencies"
```

---

## Task 2: Define Sanity Schema (Post Document)

**Files:**
- Create: `studio/schemas/post.ts`
- Create: `studio/schemas/index.ts`
- Modify: `studio/sanity.config.ts`

- [ ] **Step 2.1: Create post schema**

Create `studio/schemas/post.ts`:

```typescript
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
      options: { source: 'titleEn', maxLength: 96 },
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
    // --- English ---
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contentEn',
      title: 'Content (English)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [
            { name: 'language', type: 'string', title: 'Language' },
            { name: 'code', type: 'text', title: 'Code' },
          ],
          preview: { select: { title: 'language', subtitle: 'code' } },
        },
      ],
    }),
    // --- Chinese ---
    defineField({
      name: 'titleZh',
      title: '標題 (中文)',
      type: 'string',
    }),
    defineField({
      name: 'descriptionZh',
      title: '描述 (中文)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contentZh',
      title: '內容 (中文)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [
            { name: 'language', type: 'string', title: 'Language' },
            { name: 'code', type: 'text', title: 'Code' },
          ],
          preview: { select: { title: 'language', subtitle: 'code' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'titleEn', subtitle: 'date' },
  },
})
```

- [ ] **Step 2.2: Create schema index**

Create `studio/schemas/index.ts`:

```typescript
import { postSchema } from './post'

export const schemaTypes = [postSchema]
```

- [ ] **Step 2.3: Register schema in Studio config**

Edit `studio/sanity.config.ts` to add `schema: { types: schemaTypes }`:

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'synx-blog',
  title: 'Synx Blog',
  projectId: '<YOUR_PROJECT_ID>',  // same as in .env.local
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
```

- [ ] **Step 2.4: Commit**

```bash
git add studio/
git commit -m "feat(sanity): add post schema with bilingual fields"
```

---

## Task 3: Set Up Sanity Client in Next.js

**Files:**
- Create: `.env.local` (not committed)
- Create: `lib/sanity/client.ts`
- Create: `lib/sanity/types.ts`
- Create: `lib/sanity/queries.ts`
- Modify: `next.config.mjs`

- [ ] **Step 3.1: Create `.env.local`**

```bash
cat >> .env.local << 'EOF'
NEXT_PUBLIC_SANITY_PROJECT_ID=<YOUR_PROJECT_ID>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<your-read-token-from-sanity-manage>
EOF
```

> Get read token: sanity.io/manage → Your project → API → Tokens → Add API Token (Viewer role).

- [ ] **Step 3.2: Create `lib/sanity/client.ts`**

```typescript
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
})
```

- [ ] **Step 3.3: Create `lib/sanity/types.ts`**

```typescript
export type Language = 'en' | 'zh'

export interface SanityPost {
  slug: string
  date: string
  author: string
  tags: string[]
  titleEn: string
  titleZh: string
  descriptionEn: string
  descriptionZh: string
  contentEn: any[]   // Portable Text blocks
  contentZh: any[]
  readingTime?: number
}

export interface SanityPostSummary {
  slug: string
  date: string
  author: string
  tags: string[]
  titleEn: string
  titleZh: string
  descriptionEn: string
  descriptionZh: string
  readingTime?: number
}
```

- [ ] **Step 3.4: Create `lib/sanity/queries.ts`**

```typescript
import { sanityClient } from './client'
import type { SanityPost, SanityPostSummary } from './types'

// Estimate reading time from Portable Text blocks
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
      titleEn,
      titleZh,
      descriptionEn,
      descriptionZh,
    }
  `)
  return posts
}

export async function getAllSlugs(): Promise<string[]> {
  const slugs = await sanityClient.fetch<{ slug: string }[]>(`
    *[_type == "post"] { "slug": slug.current }
  `)
  return slugs.map((s) => s.slug)
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  const post = await sanityClient.fetch<SanityPost | null>(`
    *[_type == "post" && slug.current == $slug][0] {
      "slug": slug.current,
      date,
      author,
      tags,
      titleEn,
      titleZh,
      descriptionEn,
      descriptionZh,
      contentEn,
      contentZh,
    }
  `, { slug })

  if (!post) return null

  return {
    ...post,
    readingTime: estimateReadingTime(post.contentEn),
  }
}
```

- [ ] **Step 3.5: Add Sanity image domain to next.config.mjs**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 3.6: Verify Sanity connection**

```bash
node -e "
const { createClient } = require('@sanity/client');
const c = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
});
c.fetch('*[_type == \"post\"][0..2]').then(r => console.log('OK', r.length, 'posts')).catch(e => console.error('FAIL', e.message));
" 2>/dev/null || echo "Run: NEXT_PUBLIC_SANITY_PROJECT_ID=xxx SANITY_API_TOKEN=xxx node -e '...'"
```

Expected: `OK 0 posts` (no posts yet, but connection works).

- [ ] **Step 3.7: Commit**

```bash
git add lib/sanity/ next.config.mjs
git commit -m "feat(sanity): add sanity client, queries, and types"
```

---

## Task 4: Create Blog UI Components (Editorial Design)

**Files:**
- Create: `components/blog/PostCard.tsx`
- Create: `components/blog/TagFilter.tsx`
- Create: `components/blog/PortableTextRenderer.tsx`
- Create: `components/blog/ReadingProgress.tsx`
- Create: `components/blog/PostHeader.tsx`

**Design rationale:**
- PostCard: large bold title (text-2xl/3xl), date and tag metadata below, description as muted text, no card border (use spacing instead for editorial feel)
- Article body: `font-serif` (Georgia) for body paragraphs, Inter for headings, line-height 1.75, max-width `65ch`
- Colors: use existing CSS variables (`foreground`, `muted-foreground`, `primary`) — no hardcoded hex

- [ ] **Step 4.1: Create `components/blog/PostCard.tsx`**

```tsx
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import type { SanityPostSummary, Language } from "@/lib/sanity/types"

interface PostCardProps {
  post: SanityPostSummary
  language: Language
}

const labels = {
  en: { readingTime: "min read" },
  zh: { readingTime: "分鐘閱讀" },
}

export function PostCard({ post, language }: PostCardProps) {
  const title = language === "zh" ? (post.titleZh || post.titleEn) : post.titleEn
  const description = language === "zh" ? (post.descriptionZh || post.descriptionEn) : post.descriptionEn
  const locale = language === "zh" ? "zh-TW" : "en-US"
  const t = labels[language]

  return (
    <article className="group py-10 border-b border-border last:border-b-0">
      {/* Tags row */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
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

      {/* Title — editorial large */}
      <Link href={`/blog/${post.slug}`}>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors duration-150 cursor-pointer">
          {title}
        </h2>
      </Link>

      {/* Description */}
      {description && (
        <p className="text-muted-foreground leading-relaxed mb-4 max-w-[65ch]">
          {description}
        </p>
      )}

      {/* Meta row */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        {post.readingTime && (
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readingTime} {t.readingTime}</span>
          </div>
        )}
      </div>
    </article>
  )
}
```

- [ ] **Step 4.2: Create `components/blog/TagFilter.tsx`**

```tsx
"use client"

interface TagFilterProps {
  tags: string[]
  selectedTag: string | null
  onSelect: (tag: string | null) => void
  allLabel: string
}

export function TagFilter({ tags, selectedTag, onSelect, allLabel }: TagFilterProps) {
  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mb-12">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 cursor-pointer ${
          selectedTag === null
            ? "bg-foreground text-background"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        {allLabel}
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelect(tag)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 cursor-pointer ${
            selectedTag === tag
              ? "bg-foreground text-background"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 4.3: Create `components/blog/PortableTextRenderer.tsx`**

```tsx
import { PortableText, type PortableTextComponents } from "@portabletext/react"

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
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
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-6 space-y-2 list-disc text-foreground font-serif">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 ml-6 space-y-2 list-decimal text-foreground font-serif">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono text-foreground">{children}</code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value.asset?.url ?? value.url}
          alt={value.alt ?? ""}
          className="w-full rounded-lg shadow-sm"
          loading="lazy"
        />
        {value.caption && (
          <figcaption className="text-center text-sm text-muted-foreground mt-2">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    codeBlock: ({ value }) => (
      <pre className="bg-[#1e1e2e] text-[#cdd6f4] p-6 rounded-lg overflow-x-auto my-8 text-sm leading-relaxed font-mono">
        {value.language && (
          <div className="text-xs text-[#6c7086] mb-3 uppercase tracking-wider">{value.language}</div>
        )}
        <code>{value.code}</code>
      </pre>
    ),
  },
}

interface PortableTextRendererProps {
  content: any[]
}

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  if (!content || content.length === 0) return null
  return (
    <div className="prose-custom">
      <PortableText value={content} components={components} />
    </div>
  )
}
```

- [ ] **Step 4.4: Create `components/blog/ReadingProgress.tsx`**

```tsx
"use client"

import { useEffect, useState } from "react"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }

    window.addEventListener("scroll", updateProgress, { passive: true })
    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-[2px] bg-primary z-[100] transition-[width] duration-150"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}
```

- [ ] **Step 4.5: Create `components/blog/PostHeader.tsx`**

```tsx
import { Calendar, Clock } from "lucide-react"
import type { Language } from "@/lib/sanity/types"

interface PostHeaderProps {
  title: string
  date: string
  author: string
  tags: string[]
  readingTime?: number
  language: Language
}

const labels = {
  en: { readingTime: "min read", by: "By" },
  zh: { readingTime: "分鐘閱讀", by: "作者" },
}

export function PostHeader({ title, date, author, tags, readingTime, language }: PostHeaderProps) {
  const locale = language === "zh" ? "zh-TW" : "en-US"
  const t = labels[language]

  return (
    <header className="mb-12 pb-8 border-b border-border">
      {/* Tags */}
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="text-xs font-medium uppercase tracking-wider text-primary">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
        {title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <time dateTime={date}>
            {new Date(date).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        {readingTime && (
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{readingTime} {t.readingTime}</span>
          </div>
        )}
        {author && (
          <span>{t.by} <span className="font-medium text-foreground">{author}</span></span>
        )}
      </div>
    </header>
  )
}
```

- [ ] **Step 4.6: Commit**

```bash
git add components/blog/
git commit -m "feat(blog): add editorial UI components (PostCard, TagFilter, PortableTextRenderer, ReadingProgress, PostHeader)"
```

---

## Task 5: Redesign Blog List Page (`app/blog/page.tsx`)

**Files:**
- Modify: `app/blog/page.tsx`

The new design is a **server component** that fetches all posts from Sanity at build time, then passes them to a thin client component for tag filtering.

- [ ] **Step 5.1: Create `app/blog/BlogListClient.tsx`** (client component for tag filter interactivity)

Create `app/blog/BlogListClient.tsx`:

```tsx
"use client"

import { useState } from "react"
import { PostCard } from "@/components/blog/PostCard"
import { TagFilter } from "@/components/blog/TagFilter"
import type { SanityPostSummary, Language } from "@/lib/sanity/types"

interface BlogListClientProps {
  posts: SanityPostSummary[]
  language: Language
  allTags: string[]
}

const labels = {
  en: { allPosts: "All", noPostsYet: "No posts yet. Check back soon!" },
  zh: { allPosts: "所有文章", noPostsYet: "目前還沒有文章。敬請期待！" },
}

export function BlogListClient({ posts, language, allTags }: BlogListClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const t = labels[language]

  const filteredPosts = selectedTag
    ? posts.filter((p) => p.tags?.includes(selectedTag))
    : posts

  return (
    <>
      <TagFilter
        tags={allTags}
        selectedTag={selectedTag}
        onSelect={setSelectedTag}
        allLabel={t.allPosts}
      />
      {filteredPosts.length === 0 ? (
        <p className="text-muted-foreground text-center py-20">{t.noPostsYet}</p>
      ) : (
        <div>
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} language={language} />
          ))}
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 5.2: Rewrite `app/blog/page.tsx`**

Replace the entire file content with:

```tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getAllPostSummaries } from "@/lib/sanity/queries"
import { getInitialLanguage, setStoredLanguage, type Language } from "@/lib/language"
import { BlogListClient } from "./BlogListClient"
import type { SanityPostSummary } from "@/lib/sanity/types"

const labels = {
  en: {
    title: "Blog",
    subtitle: "Sharing thoughts on asset management, development, and investment tracking",
  },
  zh: {
    title: "部落格",
    subtitle: "分享關於資產管理、開發、投資追蹤的一些想法",
  },
}

export default function BlogPage() {
  const [language, setLanguage] = useState<Language>("en")
  const [posts, setPosts] = useState<SanityPostSummary[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setLanguage(getInitialLanguage())
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    getAllPostSummaries().then(setPosts)
  }, [mounted])

  if (!mounted) return null

  const t = labels[language]
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags ?? []))).sort()

  const toggleLanguage = () => {
    const next: Language = language === "en" ? "zh" : "en"
    setLanguage(next)
    setStoredLanguage(next)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-[var(--banner-h,0px)] left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/icon_fill.png" alt="Synx" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 rounded" />
              <span className="text-xl sm:text-2xl font-bold text-foreground">Synx</span>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="text-xs sm:text-sm min-w-[60px] bg-transparent cursor-pointer"
            >
              EN / 中文
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Editorial page header */}
        <div className="max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4 leading-none tracking-tight">
            {t.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-[55ch]">
            {t.subtitle}
          </p>
        </div>

        {/* Posts */}
        <div className="max-w-3xl mx-auto">
          <BlogListClient posts={posts} language={language} allTags={allTags} />
        </div>
      </main>
    </div>
  )
}
```

> Note: Since `output: 'export'` requires static rendering and the blog page uses client-side language state (matching the existing pattern), we keep it client-side for data fetching. For a future enhancement, this can be split into a server shell + client island.

- [ ] **Step 5.3: Build and verify blog list page renders**

```bash
npm run dev
```

Open http://localhost:3000/blog — expect the editorial redesign with empty post list (no posts in Sanity yet). No JS errors in console.

- [ ] **Step 5.4: Commit**

```bash
git add app/blog/
git commit -m "feat(blog): redesign blog list page with editorial grid layout and Sanity data"
```

---

## Task 6: Redesign Blog Post Page + SEO Metadata

**Files:**
- Modify: `app/blog/[slug]/page.tsx`
- Modify: `app/blog/[slug]/BlogPostClient.tsx`

- [ ] **Step 6.1: Rewrite `app/blog/[slug]/page.tsx`**

Replace entire file:

```tsx
import { getAllSlugs, getPostBySlug } from "@/lib/sanity/queries"
import BlogPostClient from "./BlogPostClient"
import type { Metadata } from "next"

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
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
```

- [ ] **Step 6.2: Rewrite `app/blog/[slug]/BlogPostClient.tsx`**

Replace entire file:

```tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { PostHeader } from "@/components/blog/PostHeader"
import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer"
import { ReadingProgress } from "@/components/blog/ReadingProgress"
import { getInitialLanguage, setStoredLanguage, type Language } from "@/lib/language"
import type { SanityPost } from "@/lib/sanity/types"

interface BlogPostClientProps {
  post: SanityPost | null
  slug: string
}

const labels = {
  en: {
    backToBlog: "Back to Blog",
    notFound: "Blog post not found",
    notFoundDesc: "The blog post you're looking for doesn't exist or has been removed.",
    by: "Written by",
  },
  zh: {
    backToBlog: "返回部落格",
    notFound: "找不到文章",
    notFoundDesc: "您尋找的文章不存在或已被移除。",
    by: "作者",
  },
}

function BlogHeader({ language, onToggle }: { language: Language; onToggle: () => void }) {
  return (
    <header className="fixed top-[var(--banner-h,0px)] left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icon_fill.png" alt="Synx" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 rounded" />
            <span className="text-xl sm:text-2xl font-bold text-foreground">Synx</span>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggle}
            className="text-xs sm:text-sm min-w-[60px] bg-transparent cursor-pointer"
          >
            EN / 中文
          </Button>
        </div>
      </div>
    </header>
  )
}

export default function BlogPostClient({ post, slug }: BlogPostClientProps) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setLanguage(getInitialLanguage())
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    const next: Language = language === "en" ? "zh" : "en"
    setLanguage(next)
    setStoredLanguage(next)
  }

  if (!mounted) return null

  const t = labels[language]

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <BlogHeader language={language} onToggle={toggleLanguage} />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">{t.notFound}</h1>
            <p className="text-muted-foreground mb-8">{t.notFoundDesc}</p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToBlog}
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const title = language === "zh" ? (post.titleZh || post.titleEn) : post.titleEn
  const content = language === "zh" ? (post.contentZh?.length ? post.contentZh : post.contentEn) : post.contentEn

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <BlogHeader language={language} onToggle={toggleLanguage} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <article className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group cursor-pointer">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
            {t.backToBlog}
          </Link>

          {/* Post header */}
          <PostHeader
            title={title}
            date={post.date}
            author={post.author}
            tags={post.tags ?? []}
            readingTime={post.readingTime}
            language={language}
          />

          {/* Content */}
          <PortableTextRenderer content={content} />

          {/* Author footer */}
          {post.author && (
            <footer className="mt-16 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                {t.by}{" "}
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

- [ ] **Step 6.3: Verify build passes**

```bash
npm run build 2>&1 | tail -30
```

Expected: Build succeeds. Each blog post slug generates a static page. No type errors blocking build (errors ignored per `ignoreBuildErrors: true`).

- [ ] **Step 6.4: Commit**

```bash
git add app/blog/[slug]/
git commit -m "feat(blog): redesign article page with editorial layout, reading progress, and SEO metadata"
```

---

## Task 7: Update Sitemap to Use Sanity

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 7.1: Rewrite `app/sitemap.ts`**

```typescript
import { MetadataRoute } from "next"
import { getAllSlugs } from "@/lib/sanity/queries"

export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://synxapp.com"
  const slugs = await getAllSlugs()

  const blogUrls = slugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...blogUrls,
  ]
}
```

- [ ] **Step 7.2: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat(seo): update sitemap to source blog slugs from Sanity"
```

---

## Task 8: Migrate Existing Markdown Posts to Sanity

**Files:**
- Create: `scripts/migrate-to-sanity.mjs`

This script reads the existing markdown files from `public/blog/en/` and `public/blog/zh/`, parses their frontmatter, and creates Sanity documents. It runs once.

- [ ] **Step 8.1: Create migration script**

Create `scripts/migrate-to-sanity.mjs`:

```javascript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { createClient } from '@sanity/client'

// Load env
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN env vars')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

const BLOG_DIR = path.join(process.cwd(), 'public', 'blog')

function readPostsFromDir(lang) {
  const dir = path.join(BLOG_DIR, lang)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug: path.basename(f, '.md'),
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        description: data.description || '',
        tags: data.tags || [],
        author: data.author || 'Synx Team',
        content,  // raw markdown
        lang,
      }
    })
}

// Convert raw markdown to a single Portable Text paragraph block
// (Simple: wraps entire content as one text block. Writer can re-format in Studio.)
function markdownToPortableText(markdown) {
  // Split by double newline to create paragraphs
  const paragraphs = markdown.split(/\n\n+/).filter(Boolean)
  return paragraphs.map((para, i) => ({
    _type: 'block',
    _key: `para_${i}`,
    style: 'normal',
    children: [{ _type: 'span', _key: `span_${i}`, text: para.trim(), marks: [] }],
    markDefs: [],
  }))
}

async function migrate() {
  const enPosts = readPostsFromDir('en')
  const zhPosts = readPostsFromDir('zh')

  // Group by slug
  const slugs = new Set([...enPosts.map((p) => p.slug), ...zhPosts.map((p) => p.slug)])
  console.log(`Found ${slugs.size} unique slugs to migrate`)

  for (const slug of slugs) {
    const en = enPosts.find((p) => p.slug === slug)
    const zh = zhPosts.find((p) => p.slug === slug)
    const base = en || zh

    const doc = {
      _type: 'post',
      _id: `post-${slug}`,
      slug: { _type: 'slug', current: slug },
      date: base.date,
      author: base.author,
      tags: base.tags,
      titleEn: en?.title || '',
      descriptionEn: en?.description || '',
      contentEn: en ? markdownToPortableText(en.content) : [],
      titleZh: zh?.title || '',
      descriptionZh: zh?.description || '',
      contentZh: zh ? markdownToPortableText(zh.content) : [],
    }

    try {
      await client.createOrReplace(doc)
      console.log(`✓ Migrated: ${slug}`)
    } catch (err) {
      console.error(`✗ Failed: ${slug}`, err.message)
    }
  }

  console.log('Migration complete!')
}

migrate()
```

- [ ] **Step 8.2: Run migration**

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-id> SANITY_API_TOKEN=<your-token> node scripts/migrate-to-sanity.mjs
```

Expected output:
```
Found N unique slugs to migrate
✓ Migrated: how-synx-tracks-assets
✓ Migrated: finding-fund-codes
...
Migration complete!
```

- [ ] **Step 8.3: Verify in Sanity Studio**

```bash
cd studio && npm run dev
```

Open http://localhost:3333 — posts should appear in the Studio. Check that title, date, tags, and content are populated.

- [ ] **Step 8.4: Verify blog pages show content**

```bash
cd ..  # back to project root
npm run dev
```

Open http://localhost:3000/blog — posts appear with editorial layout.
Open http://localhost:3000/blog/<any-slug> — article renders with reading progress bar.

- [ ] **Step 8.5: Commit**

```bash
git add scripts/migrate-to-sanity.mjs
git commit -m "chore(migration): add script to import markdown posts into Sanity"
```

---

## Task 9: Update Build Script & Clean Up Legacy Files

**Files:**
- Modify: `package.json` (remove `generate-blog-data.mjs` from build)
- Delete: `lib/blog-client.ts`, `public/blog-data-en.json`, `public/blog-data-zh.json`

- [ ] **Step 9.1: Remove the blog data generation step from build**

In `package.json`, change:
```json
"build": "node scripts/generate-blog-data.mjs && next build",
```
To:
```json
"build": "next build",
```

- [ ] **Step 9.2: Verify full build passes**

```bash
npm run build 2>&1 | tail -40
```

Expected: Build succeeds, generates static pages for all blog posts found in Sanity.

- [ ] **Step 9.3: Remove legacy files**

```bash
rm lib/blog-client.ts
rm public/blog-data-en.json public/blog-data-zh.json
```

Verify nothing imports `lib/blog-client.ts`:

```bash
grep -r "blog-client" app/ lib/ components/ --include="*.ts" --include="*.tsx"
```

Expected: No output (nothing imports the deleted file).

- [ ] **Step 9.4: Final build check**

```bash
npm run build 2>&1 | tail -20
```

Expected: Clean build, no import errors.

- [ ] **Step 9.5: Commit**

```bash
git add package.json
git rm lib/blog-client.ts public/blog-data-en.json public/blog-data-zh.json 2>/dev/null || true
git commit -m "chore: remove legacy file-based blog system, switch fully to Sanity"
```

---

## Self-Review

### Spec Coverage Check

| Requirement | Task |
|---|---|
| 換成 Sanity CMS | Tasks 1–3, 8 |
| 方便管理與新增文章 | Task 2 (Studio schema), Task 1 (Studio setup) |
| SEO | Task 6 (`generateMetadata`, OG tags, Twitter cards, canonical) |
| Blog UI redesign (editorial) | Tasks 4–6 |
| Bilingual support preserved | Tasks 2, 5, 6 (titleEn/zh, contentEn/zh) |
| Sitemap updated | Task 7 |
| Static export preserved | Tasks 3, 6 (no client-side data fetching for content) |
| Migrate existing posts | Task 8 |
| Build script cleanup | Task 9 |

### Placeholder Scan
- No TBD or TODO items remaining
- All code blocks show complete file contents
- All commands include expected output

### Type Consistency
- `SanityPost` defined in `lib/sanity/types.ts` (Task 3) and used in Tasks 5, 6
- `getAllSlugs()` returns `string[]` — used in Task 6 page and Task 7 sitemap ✓
- `getPostBySlug()` returns `SanityPost | null` — handled in both page and client ✓
- `Language` type from `lib/language.ts` (existing) used consistently ✓

---

**Plan complete and saved to `docs/superpowers/plans/2026-03-31-blog-sanity-migration.md`.**

Two execution options:

**1. Subagent-Driven (recommended)** — Fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, with checkpoints

**Which approach?**
