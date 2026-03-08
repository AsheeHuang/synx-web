import { getAllSlugs } from "@/lib/blog"
import BlogPostClient from "./BlogPostClient"

// This is required for static export
export function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostClient slug={params.slug} />
}
