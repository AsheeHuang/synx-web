import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"
import type { SanityPostSummary } from "@/lib/sanity/types"

interface PostCardProps {
  post: SanityPostSummary
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-200 cursor-pointer">
      <Link href={`/blog/${post.slug}`} className="flex flex-col flex-1">
        {/* Cover image */}
        <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden">
          {post.coverImage?.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <Image
                src="/icon_fill.png"
                alt="Synx"
                width={128}
                height={128}
                className="w-16 h-16 rounded-xl opacity-40"
              />
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
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

          {/* Title */}
          <h2 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-150 line-clamp-2">
            {post.title}
          </h2>

          {/* Description */}
          {post.description && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
              {post.description}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1 mt-auto">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("zh-TW", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
