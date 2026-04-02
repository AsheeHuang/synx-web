import type { SanityPost } from "@/lib/sanity/types"

interface BlogPostJsonLdProps {
  post: SanityPost
}

const BASE_URL = "https://synxapp.com"

export function BlogPostJsonLd({ post }: BlogPostJsonLdProps) {
  const headline = post.titleZh || post.titleEn
  const description = post.descriptionZh || post.descriptionEn || ""
  const url = `${BASE_URL}/blog/${post.slug}`

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: url,
    url,
    inLanguage: post.titleZh ? "zh-TW" : "en",
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Synx",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icon_fill.png`,
      },
    },
    keywords: post.tags,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
