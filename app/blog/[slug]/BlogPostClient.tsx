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
  suppressPrimaryHeading?: boolean
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

export default function BlogPostClient({ post, slug, suppressPrimaryHeading = false }: BlogPostClientProps) {
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
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group cursor-pointer">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
            {t.backToBlog}
          </Link>

          <PostHeader
            title={title}
            date={post.date}
            author={post.author}
            tags={post.tags ?? []}
            readingTime={post.readingTime}
            language={language}
            hideTitle={suppressPrimaryHeading}
          />

          <PortableTextRenderer content={content} />

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
