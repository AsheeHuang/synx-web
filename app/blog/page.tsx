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
    title: "Asset Management Blog",
    subtitle: "Notes on net worth tracking, investment records, DCA, and building a simpler asset management workflow",
  },
  zh: {
    title: "資產管理部落格",
    subtitle: "分享淨資產追蹤、投資記錄、定期定額與資產管理流程的實作心得",
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
        <div className="mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4 leading-none tracking-tight">
            {t.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-[55ch]">
            {t.subtitle}
          </p>
        </div>

        <BlogListClient posts={posts} language={language} allTags={allTags} />

      </main>
    </div>
  )
}
