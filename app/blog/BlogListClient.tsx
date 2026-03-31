"use client"

import { useState } from "react"
import { PostCard } from "@/components/blog/PostCard"
import { TagFilter } from "@/components/blog/TagFilter"
import type { SanityPostSummary, Language } from "@/lib/sanity/types"

interface BlogListClientProps {
  posts: SanityPostSummary[]
  language: Language
  allTags: string[]
}

const labels = {
  en: { allPosts: "All", noPostsYet: "No posts yet. Check back soon!" },
  zh: { allPosts: "所有文章", noPostsYet: "目前還沒有文章。敬請期待！" },
}

export function BlogListClient({ posts, language, allTags }: BlogListClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const t = labels[language]

  const filteredPosts = selectedTag
    ? posts.filter((p) => p.tags?.includes(selectedTag))
    : posts

  return (
    <>
      <TagFilter
        tags={allTags}
        selectedTag={selectedTag}
        onSelect={setSelectedTag}
        allLabel={t.allPosts}
      />
      {filteredPosts.length === 0 ? (
        <p className="text-muted-foreground text-center py-20">{t.noPostsYet}</p>
      ) : (
        <div>
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} language={language} />
          ))}
        </div>
      )}
    </>
  )
}
