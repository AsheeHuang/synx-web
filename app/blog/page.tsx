"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Tag } from "lucide-react"
import { getAllPosts } from "@/lib/blog"

interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  author: string
  readingTime?: number
}

function getInitialLanguage(): "en" | "zh" {
  if (typeof window === "undefined") return "en"

  const browserLang = navigator.language || navigator.languages?.[0] || "en"
  return browserLang.toLowerCase().startsWith("zh") ? "zh" : "en"
}

export default function BlogPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setLanguage(getInitialLanguage())
    setMounted(true)
  }, [])

  // Load blog posts based on language
  useEffect(() => {
    if (mounted) {
      try {
        // Import is client-side only, so we use dynamic import
        import("@/lib/blog-client").then((module) => {
          const blogPosts = module.getBlogPosts(language)
          setPosts(blogPosts)
        })
      } catch (error) {
        console.error("Failed to load blog posts:", error)
      }
    }
  }, [language, mounted])

  if (!mounted) {
    return null
  }

  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort()

  // Filter posts by selected tag
  const filteredPosts = selectedTag ? posts.filter((post) => post.tags.includes(selectedTag)) : posts

  const t = {
    en: {
      title: "Blog",
      subtitle: "Insights on wealth management and investment tracking",
      allPosts: "All Posts",
      readMore: "Read More",
      readingTime: "min read",
      noPostsYet: "No blog posts yet. Check back soon!",
    },
    zh: {
      title: "部落格",
      subtitle: "財富管理與投資追蹤的洞察",
      allPosts: "所有文章",
      readMore: "閱讀更多",
      readingTime: "分鐘閱讀",
      noPostsYet: "目前還沒有文章。敬請期待！",
    },
  }

  const content = t[language]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header - Same as Guide page */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
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
              className="text-xs sm:text-sm min-w-[60px] bg-transparent"
            >
              {"EN / 中文"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{content.title}</h1>
          <p className="text-lg text-muted-foreground">{content.subtitle}</p>
        </div>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className="rounded-full"
              >
                {content.allPosts}
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className="rounded-full"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="max-w-4xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">{content.noPostsYet}</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="border border-border rounded-lg p-6 sm:p-8 hover:shadow-lg transition-shadow bg-card"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                  </Link>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(language === "zh" ? "zh-TW" : "en-US")}</time>
                    </div>
                    {post.readingTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {post.readingTime} {content.readingTime}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">{post.description}</p>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="link" className="p-0 h-auto font-semibold">
                      {content.readMore} →
                    </Button>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
