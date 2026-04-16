import { Calendar } from "lucide-react"
import type { Language } from "@/lib/sanity/types"

interface PostHeaderProps {
  title: string
  date: string
  author: string
  tags: string[]
  readingTime?: number
  language: Language
  hideTitle?: boolean
}

const labels = {
  en: { readingTime: "min read", by: "By" },
  zh: { readingTime: "分鐘閱讀", by: "作者" },
}

export function PostHeader({ title, date, author, tags, readingTime, language, hideTitle = false }: PostHeaderProps) {
  const locale = language === "zh" ? "zh-TW" : "en-US"
  const t = labels[language]

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
            {new Date(date).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
{author && (
          <span>{t.by} <span className="font-medium text-foreground">{author}</span></span>
        )}
      </div>
    </header>
  )
}
