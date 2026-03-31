"use client"

interface TagFilterProps {
  tags: string[]
  selectedTag: string | null
  onSelect: (tag: string | null) => void
  allLabel: string
}

export function TagFilter({ tags, selectedTag, onSelect, allLabel }: TagFilterProps) {
  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mb-12">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 cursor-pointer ${
          selectedTag === null
            ? "bg-foreground text-background"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        {allLabel}
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelect(tag)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 cursor-pointer ${
            selectedTag === tag
              ? "bg-foreground text-background"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
