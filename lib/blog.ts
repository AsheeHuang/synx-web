import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  author: string
  content: string
  language: "en" | "zh"
  readingTime?: number
}

const postsDirectory = path.join(process.cwd(), "public/blog")

/**
 * Parse markdown file and extract frontmatter + content
 */
function parseMarkdownFile(filePath: string, language: "en" | "zh"): BlogPost {
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)

  const slug = path.basename(filePath, ".md")

  // Calculate reading time (average 200 words per minute)
  const wordCount = content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || new Date().toISOString(),
    description: data.description || "",
    tags: data.tags || [],
    author: data.author || "Synx Team",
    content,
    language,
    readingTime,
  }
}

/**
 * Get all blog posts for a specific language
 */
export function getAllPosts(language: "en" | "zh"): BlogPost[] {
  const langDirectory = path.join(postsDirectory, language)

  // Check if directory exists
  if (!fs.existsSync(langDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(langDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const filePath = path.join(langDirectory, fileName)
      return parseMarkdownFile(filePath, language)
    })
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))

  return posts
}

/**
 * Get a single blog post by slug and language
 */
export function getPostBySlug(slug: string, language: "en" | "zh"): BlogPost | null {
  const langDirectory = path.join(postsDirectory, language)
  const filePath = path.join(langDirectory, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  return parseMarkdownFile(filePath, language)
}

/**
 * Get all unique tags from all posts
 */
export function getAllTags(language: "en" | "zh"): string[] {
  const posts = getAllPosts(language)
  const tags = new Set<string>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).sort()
}

/**
 * Get all slugs for static generation
 */
export function getAllSlugs(): string[] {
  const slugs = new Set<string>()

  ;(["en", "zh"] as const).forEach((lang) => {
    const langDirectory = path.join(postsDirectory, lang)
    if (fs.existsSync(langDirectory)) {
      const fileNames = fs.readdirSync(langDirectory)
      fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .forEach((fileName) => {
          slugs.add(path.basename(fileName, ".md"))
        })
    }
  })

  return Array.from(slugs)
}
