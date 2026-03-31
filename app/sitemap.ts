import { MetadataRoute } from "next"
import { getAllSlugs } from "@/lib/sanity/queries"

export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://synxapp.com"

  let slugs: string[] = []
  try {
    slugs = await getAllSlugs()
    // Filter out the _placeholder slug used during build when Sanity is empty
    slugs = slugs.filter((s) => s !== '_placeholder')
  } catch {
    // If Sanity is unreachable at build time, generate sitemap without blog posts
    slugs = []
  }

  const blogUrls = slugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...blogUrls,
  ]
}
