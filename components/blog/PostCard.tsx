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

      <Link href={`/blog/${post.slug}`}>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors duration-150 cursor-pointer">
          {title}
        </h2>
      </Link>

      {description && (
        <p className="text-muted-foreground leading-relaxed mb-4 max-w-[65ch]">
          {description}
        </p>
      )}

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
