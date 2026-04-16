import { Calendar } from "lucide-react"

interface PostHeaderProps {
  title: string
  date: string
  author: string
  tags: string[]
  readingTime?: number
  hideTitle?: boolean
}

export function PostHeader({ title, date, author, tags, readingTime, hideTitle = false }: PostHeaderProps) {
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
            {new Date(date).toLocaleDateString("zh-TW", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        {author && (
          <span>作者 <span className="font-medium text-foreground">{author}</span></span>
        )}
        {readingTime && (
          <span>{readingTime} 分鐘閱讀</span>
        )}
      </div>
    </header>
  )
}
