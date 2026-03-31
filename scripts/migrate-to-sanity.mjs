#!/usr/bin/env node
/**
 * One-time migration script: imports markdown posts from public/blog/ into Sanity.
 *
 * Usage:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=4gehu4mu SANITY_API_TOKEN=<your-editor-token> node scripts/migrate-to-sanity.mjs
 *
 * Requires a Sanity API token with Editor role.
 * Get one at: https://sanity.io/manage → project 4gehu4mu → API → Tokens → Add API Token (Editor)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@sanity/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
  process.exit(1)
}
if (!token) {
  console.error('❌ Missing SANITY_API_TOKEN')
  console.error('   Get one at: https://sanity.io/manage → project 4gehu4mu → API → Tokens → Add API Token (Editor)')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

const BLOG_DIR = path.join(ROOT, 'public', 'blog')

/**
 * Parse frontmatter from markdown content.
 * Handles: title, date, description, tags, author
 */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const frontmatterStr = match[1]
  const content = match[2].trim()

  const data = {}

  const titleMatch = frontmatterStr.match(/^title:\s*["']?(.+?)["']?\s*$/m)
  if (titleMatch) data.title = titleMatch[1].trim()

  const dateMatch = frontmatterStr.match(/^date:\s*["']?(.+?)["']?\s*$/m)
  if (dateMatch) data.date = dateMatch[1].trim()

  const descMatch = frontmatterStr.match(/^description:\s*["'](.+?)["']\s*$/m)
  if (descMatch) data.description = descMatch[1].trim()

  const tagsMatch = frontmatterStr.match(/^tags:\s*\[(.+?)\]\s*$/m)
  if (tagsMatch) {
    data.tags = tagsMatch[1]
      .split(',')
      .map((t) => t.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean)
  } else {
    data.tags = []
  }

  const authorMatch = frontmatterStr.match(/^author:\s*["']?(.+?)["']?\s*$/m)
  if (authorMatch) data.author = authorMatch[1].trim()

  return { data, content }
}

/**
 * Convert raw markdown body to Sanity Portable Text blocks.
 * Strategy: split by double newline into paragraphs; detect headings and blockquotes.
 * Images and code blocks are converted to their respective custom types.
 */
function markdownToPortableText(markdown) {
  if (!markdown || !markdown.trim()) return []

  const blocks = []
  const rawBlocks = markdown.split(/\n\n+/)

  rawBlocks.forEach((raw, i) => {
    const trimmed = raw.trim()
    if (!trimmed) return

    const key = `block_${i}`

    // Heading detection
    const h2Match = trimmed.match(/^##\s+(.+)$/)
    const h3Match = trimmed.match(/^###\s+(.+)$/)
    const h4Match = trimmed.match(/^####\s+(.+)$/)
    const blockquoteMatch = trimmed.match(/^>\s*(.+)$/)

    // Code block detection (``` ... ```)
    const codeMatch = trimmed.match(/^```(\w*)\n([\s\S]*?)```$/)

    // Image detection
    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)

    if (codeMatch) {
      blocks.push({
        _type: 'codeBlock',
        _key: key,
        language: codeMatch[1] || 'text',
        code: codeMatch[2].trim(),
      })
    } else if (imageMatch) {
      // External image URL reference — store as a note since we can't upload binaries
      blocks.push({
        _type: 'block',
        _key: key,
        style: 'normal',
        children: [{
          _type: 'span',
          _key: `${key}_0`,
          text: `[Image: ${imageMatch[1] || imageMatch[2]}]`,
          marks: [],
        }],
        markDefs: [],
      })
    } else if (h2Match) {
      blocks.push({
        _type: 'block',
        _key: key,
        style: 'h2',
        children: [{ _type: 'span', _key: `${key}_0`, text: h2Match[1], marks: [] }],
        markDefs: [],
      })
    } else if (h3Match) {
      blocks.push({
        _type: 'block',
        _key: key,
        style: 'h3',
        children: [{ _type: 'span', _key: `${key}_0`, text: h3Match[1], marks: [] }],
        markDefs: [],
      })
    } else if (h4Match) {
      blocks.push({
        _type: 'block',
        _key: key,
        style: 'h4',
        children: [{ _type: 'span', _key: `${key}_0`, text: h4Match[1], marks: [] }],
        markDefs: [],
      })
    } else if (blockquoteMatch) {
      blocks.push({
        _type: 'block',
        _key: key,
        style: 'blockquote',
        children: [{ _type: 'span', _key: `${key}_0`, text: blockquoteMatch[1], marks: [] }],
        markDefs: [],
      })
    } else {
      // Normal paragraph — strip remaining markdown syntax (bold, italic, inline code, links)
      let text = trimmed
        .replace(/\*\*(.+?)\*\*/g, '$1')     // bold
        .replace(/\*(.+?)\*/g, '$1')          // italic
        .replace(/`(.+?)`/g, '$1')            // inline code
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
        .replace(/^[-*]\s+/gm, '')            // list bullets
        .replace(/^\d+\.\s+/gm, '')          // numbered list
      blocks.push({
        _type: 'block',
        _key: key,
        style: 'normal',
        children: [{ _type: 'span', _key: `${key}_0`, text, marks: [] }],
        markDefs: [],
      })
    }
  })

  return blocks
}

function readPostsFromLang(lang) {
  const dir = path.join(BLOG_DIR, lang)
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8')
      const { data, content } = parseFrontmatter(raw)
      return {
        slug: path.basename(f, '.md'),
        title: data.title || 'Untitled',
        date: data.date ? data.date.split('T')[0] : new Date().toISOString().split('T')[0],
        description: data.description || '',
        tags: data.tags || [],
        author: data.author || 'Synx Team',
        content,
        lang,
      }
    })
}

async function migrate() {
  const enPosts = readPostsFromLang('en')
  const zhPosts = readPostsFromLang('zh')

  const slugs = new Set([...enPosts.map((p) => p.slug), ...zhPosts.map((p) => p.slug)])
  console.log(`\n📚 Found ${slugs.size} unique post(s) to migrate (${enPosts.length} EN, ${zhPosts.length} ZH)\n`)

  let success = 0
  let failed = 0

  for (const slug of slugs) {
    const en = enPosts.find((p) => p.slug === slug)
    const zh = zhPosts.find((p) => p.slug === slug)
    const base = en || zh

    const doc = {
      _type: 'post',
      _id: `post-${slug}`,
      slug: { _type: 'slug', current: slug },
      date: base.date,
      author: base.author,
      tags: base.tags,
      titleEn: en?.title || '',
      descriptionEn: en?.description || '',
      contentEn: en ? markdownToPortableText(en.content) : [],
      titleZh: zh?.title || '',
      descriptionZh: zh?.description || '',
      contentZh: zh ? markdownToPortableText(zh.content) : [],
    }

    try {
      await client.createOrReplace(doc)
      console.log(`  ✓ ${slug}`)
      success++
    } catch (err) {
      console.error(`  ✗ ${slug}: ${err.message}`)
      failed++
    }
  }

  console.log(`\n${success > 0 ? '✅' : '❌'} Done: ${success} succeeded, ${failed} failed`)
  if (failed > 0) process.exit(1)
}

migrate().catch((err) => {
  console.error('Fatal error:', err.message)
  process.exit(1)
})
