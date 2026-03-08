import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://synxapp.com"),
  title: "Synx Blog – 財富管理洞察與投資心得 | Wealth Management Insights",
  description:
    "探索淨資產管理、投資追蹤與財務規劃的最佳實踐。Discover insights on net worth tracking, investment management, and financial planning best practices.",
  keywords: [
    "財富管理",
    "投資心得",
    "淨資產追蹤",
    "理財文章",
    "投資組合管理",
    "wealth management blog",
    "investment insights",
    "net worth tracking",
    "financial planning",
    "portfolio management",
  ],
  openGraph: {
    title: "Synx Blog – 財富管理洞察與投資心得",
    description:
      "探索淨資產管理、投資追蹤與財務規劃的最佳實踐。Discover insights on wealth management and investment tracking.",
    url: "https://synxapp.com/blog",
    siteName: "Synx",
    type: "website",
    images: [{ url: "/og-image.png", width: 1080, height: 720, alt: "Synx Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synx Blog – 財富管理洞察與投資心得",
    description: "探索淨資產管理、投資追蹤與財務規劃的最佳實踐。",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://synxapp.com/blog",
    languages: {
      en: "https://synxapp.com/blog",
      "zh-TW": "https://synxapp.com/blog",
      "x-default": "https://synxapp.com/blog",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
