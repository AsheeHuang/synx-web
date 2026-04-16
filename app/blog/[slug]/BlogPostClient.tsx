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
  suppressPrimaryHeading?: boolean
}

export default function BlogPostClient({ post, suppressPrimaryHeading = false }: BlogPostClientProps) {
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

          {post.coverImage?.url && (
            <div className="relative w-full aspect-[16/9] mb-10 rounded-xl overflow-hidden">
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

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
