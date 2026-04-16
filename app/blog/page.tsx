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
