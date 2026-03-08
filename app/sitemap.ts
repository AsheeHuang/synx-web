import { MetadataRoute } from "next"
import { getAllSlugs } from "@/lib/blog"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://synxapp.com"

  // Get all blog post slugs
  const blogSlugs = getAllSlugs()

  // Generate blog post URLs
  const blogUrls = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogUrls,
  ]
}
