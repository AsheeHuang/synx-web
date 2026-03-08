"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  author: string
  content: string
  readingTime?: number
}

function getInitialLanguage(): "en" | "zh" {
  if (typeof window === "undefined") return "en"

  const browserLang = navigator.language || navigator.languages?.[0] || "en"
  return browserLang.toLowerCase().startsWith("zh") ? "zh" : "en"
}

export default function BlogPostClient({ slug }: { slug: string }) {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setLanguage(getInitialLanguage())
    setMounted(true)
  }, [])

  // Fetch blog post content
  useEffect(() => {
    const fetchPost = async () => {
      if (!slug || !mounted) return

      setLoading(true)
      try {
        // Fetch the markdown file directly
        const response = await fetch(`/blog/${language}/${slug}.md`)
        if (response.ok) {
          const markdown = await response.text()

          // Parse frontmatter manually (simple version)
          const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
          const match = markdown.match(frontmatterRegex)

          if (match) {
            const frontmatter = match[1]
            const content = match[2]

            // Parse frontmatter fields
            const titleMatch = frontmatter.match(/title:\s*"([^"]+)"/)
            const dateMatch = frontmatter.match(/date:\s*"([^"]+)"/)
            const descriptionMatch = frontmatter.match(/description:\s*"([^"]+)"/)
            const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/)
            const authorMatch = frontmatter.match(/author:\s*"([^"]+)"/)

            const tags = tagsMatch
              ? tagsMatch[1]
                  .split(",")
                  .map((t) => t.trim().replace(/"/g, ""))
                  .filter(Boolean)
              : []

            // Calculate reading time
            const wordCount = content.split(/\s+/).length
            const readingTime = Math.ceil(wordCount / 200)

            setPost({
              slug,
              title: titleMatch ? titleMatch[1] : "Untitled",
              date: dateMatch ? dateMatch[1] : new Date().toISOString(),
              description: descriptionMatch ? descriptionMatch[1] : "",
              tags,
              author: authorMatch ? authorMatch[1] : "Synx Team",
              content,
              readingTime,
            })
          } else {
            setPost(null)
          }
        } else {
          setPost(null)
        }
      } catch (error) {
        console.error("Failed to fetch blog post:", error)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug, language, mounted])

  if (!mounted) {
    return null
  }

  const t = {
    en: {
      backToBlog: "Back to Blog",
      readingTime: "min read",
      notFound: "Blog post not found",
      notFoundDesc: "The blog post you're looking for doesn't exist or has been removed.",
    },
    zh: {
      backToBlog: "返回部落格",
      readingTime: "分鐘閱讀",
      notFound: "找不到文章",
      notFoundDesc: "您尋找的文章不存在或已被移除。",
    },
  }

  const content = t[language]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  if (loading) {
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
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!post) {
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
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">{content.notFound}</h1>
            <p className="text-muted-foreground mb-8">{content.notFoundDesc}</p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {content.backToBlog}
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
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
        <article className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link href="/blog" className="inline-block mb-8">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {content.backToBlog}
            </Button>
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">{post.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString(language === "zh" ? "zh-TW" : "en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
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

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded-full flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-4xl font-bold mt-12 mb-6 text-gray-900" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-2xl font-bold mt-10 mb-6 text-gray-900" {...props} />
                ),
                h4: ({ node, ...props }) => (
                  <h4 className="text-xl font-semibold mt-8 mb-4 text-gray-900" {...props} />
                ),
                p: ({ node, ...props }) => <p className="mb-6 leading-relaxed text-gray-700" {...props} />,
                ul: ({ node, ...props }) => <ul className="mb-6 ml-6 space-y-2 list-disc" {...props} />,
                ol: ({ node, ...props }) => <ol className="mb-6 ml-6 space-y-2 list-decimal" {...props} />,
                li: ({ node, ...props }) => <li className="leading-relaxed text-gray-700" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-semibold text-gray-900" {...props} />,
                em: ({ node, ...props }) => <em className="italic" {...props} />,
                a: ({ node, ...props }) => (
                  <a className="text-blue-600 hover:text-blue-800 underline font-medium" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-blue-500 pl-6 py-2 italic my-6 text-gray-600 bg-gray-50"
                    {...props}
                  />
                ),
                code: ({ node, inline, ...props }: any) =>
                  inline ? (
                    <code
                      className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800"
                      {...props}
                    />
                  ) : (
                    <code
                      className="block bg-gray-900 text-gray-100 p-6 rounded-lg text-sm font-mono overflow-x-auto"
                      {...props}
                    />
                  ),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="min-w-full border border-gray-300" {...props} />
                  </div>
                ),
                thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
                th: ({ node, ...props }) => (
                  <th className="px-4 py-2 border border-gray-300 text-left font-semibold" {...props} />
                ),
                td: ({ node, ...props }) => <td className="px-4 py-2 border border-gray-300" {...props} />,
                hr: ({ node, ...props }) => <hr className="my-12 border-gray-300" {...props} />,
                img: ({ node, ...props }) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="rounded-lg my-8 w-full shadow-md" {...props} alt={props.alt || ""} />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Author Info */}
          {post.author && (
            <div className="mt-16 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                {language === "en" ? "Written by" : "作者"}{" "}
                <span className="font-semibold text-foreground">{post.author}</span>
              </p>
            </div>
          )}
        </article>
      </main>
    </div>
  )
}
