import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://synxapp.com"),
  title: "Synx 部落格 – 關於資產管理、開發、投資追蹤 | Blog on Asset Management, Development, and Investment Tracking",
  description:
    "分享資產追蹤、投資記錄與財務管理的心得與經驗。Thoughts on net worth tracking, investment management, and financial planning.",
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
    title: "Synx 部落格 – 關於資產管理、開發、投資追蹤",
    description:
      "分享資產追蹤、投資記錄與財務管理的心得與經驗。",
    url: "https://synxapp.com/blog",
    siteName: "Synx",
    type: "website",
    images: [{ url: "/og-image.png", width: 1080, height: 720, alt: "Synx Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synx 部落格 – 關於資產管理、開發、投資追蹤",
    description: "分享資產追蹤、投資記錄與財務管理的心得與經驗。",
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
