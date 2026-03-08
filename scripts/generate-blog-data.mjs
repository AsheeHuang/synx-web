import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.join(__dirname, "..")

const postsDirectory = path.join(projectRoot, "public/blog")

/**
 * Parse markdown file and extract frontmatter
 */
function parseMarkdownFile(filePath, language) {
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
    readingTime,
  }
}

/**
 * Get all blog posts for a specific language
 */
function getAllPosts(language) {
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

// Generate JSON files
const enPosts = getAllPosts("en")
const zhPosts = getAllPosts("zh")

fs.writeFileSync(
  path.join(projectRoot, "public/blog-data-en.json"),
  JSON.stringify(enPosts, null, 2)
)

fs.writeFileSync(
  path.join(projectRoot, "public/blog-data-zh.json"),
  JSON.stringify(zhPosts, null, 2)
)

console.log(`✅ Generated blog data:`)
console.log(`   - ${enPosts.length} English posts`)
console.log(`   - ${zhPosts.length} Chinese posts`)
