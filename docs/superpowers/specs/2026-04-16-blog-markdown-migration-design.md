# Blog Content: Migrate to Markdown (Chinese Only)

**Date:** 2026-04-16  
**Status:** Approved

## Overview

Migrate the blog content system from Sanity Portable Text (block content) to plain Markdown strings. At the same time, drop bilingual (EN/ZH) support and make the blog Chinese-only. Existing posts will be deleted and re-uploaded as Markdown.

## Goals

- Authors can paste raw Markdown directly into Sanity without converting headings, tables, or lists
- Images are handled via URL (`![alt](url)`) pointing to Sanity Assets
- No language toggle UI; blog is Chinese-only
- Code blocks render correctly (syntax highlighting can be added later if needed)

## Out of Scope

- Migrating existing Portable Text content programmatically
- Syntax highlighting (deferred)
- Image upload within the Markdown editor

---

## Architecture

### 1. Sanity Schema (`studio/schemaTypes/post.js`)

Remove all bilingual fields (`titleEn`, `descriptionEn`, `contentEn`, `titleZh`, `descriptionZh`, `contentZh`). Replace with single-language fields:

| Field | Type | Notes |
|---|---|---|
| `title` | `string` | Required. Also the slug source |
| `description` | `text` (3 rows) | Optional summary |
| `content` | `text` | Markdown string |

The `slug` field changes its source from `titleEn` to `title`.

The `image`, `codeBlock`, and `table` sub-types inside the old content array are removed entirely. Images are embedded in Markdown as `![alt](sanity-asset-url)`.

### 2. TypeScript Types (`lib/sanity/types.ts`)

`SanityPost` and `SanityPostSummary` updated:

```ts
export interface SanityPost {
  slug: string
  date: string
  author: string
  tags: string[]
  coverImage?: SanityCoverImage
  title: string
  description: string
  content: string        // Markdown string
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

### 3. GROQ Queries (`lib/sanity/queries.ts`)

- `getAllPostSummaries`: replace `titleEn`/`titleZh`/`descriptionEn`/`descriptionZh` with `title`/`description`
- `getPostBySlug`: replace bilingual content fields with `content`. Remove the `asset->url` expansion (no longer needed since images are plain URLs in Markdown)
- `estimateReadingTime`: change from block-array word counting to plain string word split: `Math.ceil(content.split(/\s+/).length / 200)`

### 4. Markdown Renderer (`components/blog/MarkdownRenderer.tsx`)

Replace `PortableTextRenderer.tsx` with a new `MarkdownRenderer.tsx` using:

- `react-markdown` — core Markdown parser/renderer
- `remark-gfm` — GitHub Flavored Markdown (tables, strikethrough, task lists)

Custom components map Markdown elements to the same Tailwind CSS classes currently used in `PortableTextRenderer`, so the visual output stays consistent:

| Element | Class |
|---|---|
| `p` | `mb-6 leading-[1.8] text-foreground font-serif` |
| `h2` | `text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-5 leading-tight` |
| `h3` | `text-xl sm:text-2xl font-bold text-foreground mt-10 mb-4 leading-tight` |
| `h4` | `text-lg font-semibold text-foreground mt-8 mb-3` |
| `blockquote` | `border-l-4 border-primary pl-6 py-2 my-8 italic text-muted-foreground text-lg leading-relaxed` |
| `ul` | `mb-6 ml-6 space-y-2 list-disc text-foreground font-serif` |
| `ol` | `mb-6 ml-6 space-y-2 list-decimal text-foreground font-serif` |
| `code` (inline) | `bg-secondary px-1.5 py-0.5 rounded text-sm font-mono text-foreground` |
| `pre` / code block | `bg-[#1e1e2e] text-[#cdd6f4] p-6 rounded-lg overflow-x-auto my-8 text-sm leading-relaxed font-mono` |
| `img` | `w-full rounded-lg shadow-sm my-10` |
| `a` | `text-primary underline underline-offset-2 hover:text-primary/80 transition-colors` |
| `table` | `min-w-full border-collapse text-sm` wrapped in `overflow-x-auto my-8` |

### 5. Blog Post Page (`app/blog/[slug]/BlogPostClient.tsx`)

- Remove `language` state, `toggleLanguage`, and the EN/中文 toggle button
- Remove `labels` translation object
- Replace `PortableTextRenderer` with `MarkdownRenderer`
- Pass `post.content` (string) directly

### 6. Other Components

- `components/blog/PostCard.tsx` — remove `language` prop, use `post.title` and `post.description` directly
- `components/blog/PostHeader.tsx` — remove `language` prop, use `title` directly
- `app/blog/BlogListClient.tsx` — remove language-related logic
- `app/blog/page.tsx` and `app/blog/[slug]/page.tsx` — remove language prop passing

### 7. Dependencies

Remove: `@portabletext/react`  
Add: `react-markdown`, `remark-gfm`

---

## Implementation Order

1. Update Sanity schema + deploy
2. Update TypeScript types
3. Update GROQ queries
4. Create `MarkdownRenderer` component
5. Update `BlogPostClient` (remove language toggle, swap renderer)
6. Update `PostCard`, `PostHeader`, list/page components
7. Remove `@portabletext/react`, install `react-markdown` + `remark-gfm`
8. Delete existing Sanity posts, re-upload as Markdown
