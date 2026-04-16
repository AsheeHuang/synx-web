"use client"

import { useState } from "react"
import { PostCard } from "@/components/blog/PostCard"
import { TagFilter } from "@/components/blog/TagFilter"
import type { SanityPostSummary } from "@/lib/sanity/types"

interface BlogListClientProps {
  posts: SanityPostSummary[]
  allTags: string[]
}

export function BlogListClient({ posts, allTags }: BlogListClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = selectedTag
    ? posts.filter((p) => p.tags?.includes(selectedTag))
    : posts

  return (
    <>
      <TagFilter
        tags={allTags}
        selectedTag={selectedTag}
        onSelect={setSelectedTag}
        allLabel="所有文章"
      />
      {filteredPosts.length === 0 ? (
        <p className="text-muted-foreground text-center py-20">目前還沒有文章。敬請期待！</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  )
}
