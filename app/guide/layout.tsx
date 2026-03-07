import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://synxapp.com"),
  title: "Synx User Guide – How to Use Synx | 使用指南",
  description:
    "Complete guide to using Synx: add accounts, track investments, manage DCA, and set up recurring transactions. 完整 Synx 使用指南：新增帳戶、追蹤投資、定期定額設定。",
  openGraph: {
    title: "Synx User Guide | 使用指南",
    description:
      "Complete guide to using Synx for net worth tracking and investment management.",
    url: "https://synxapp.com/guide",
    siteName: "Synx",
    type: "website",
    images: [{ url: "/og-image.png", width: 1080, height: 720, alt: "Synx User Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synx User Guide | 使用指南",
    description: "Complete guide to using Synx for net worth tracking and investment management.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://synxapp.com/guide",
    languages: {
      en: "https://synxapp.com/guide",
      "zh-TW": "https://synxapp.com/guide",
      "x-default": "https://synxapp.com/guide",
    },
  },
}

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
