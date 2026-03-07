import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { JsonLd } from "@/components/json-ld"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const BASE_URL = "https://synxapp.com"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Synx – 淨資產管理・投資追蹤 App | Net Worth & Investment Tracker",
  description:
    "Synx 是隱私優先的淨資產管理與投資追蹤 App，整合現金流、股票、加密貨幣等多類資產管理，即時同步全球市場行情。Privacy-first net worth tracker & investment portfolio manager — data never leaves your device.",
  keywords: [
    "淨資產管理",
    "投資追蹤",
    "資產管理",
    "淨資產",
    "投資組合追蹤",
    "財富管理 App",
    "定期定額記錄",
    "net worth tracker",
    "investment tracker",
    "portfolio tracker",
    "wealth management app",
    "asset management",
  ],
  openGraph: {
    title: "Synx – 淨資產管理・投資追蹤 App",
    description:
      "整合淨資產、投資組合與現金流的資產管理 App。即時同步全球市場行情，隱私優先，零上傳。Net worth tracker & investment portfolio manager.",
    url: BASE_URL,
    siteName: "Synx",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_TW"],
    images: [
      {
        url: "/og-image.png",
        width: 1080,
        height: 720,
        alt: "Synx – Net Worth & Investment Tracker App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synx – 淨資產管理・投資追蹤 App",
    description:
      "整合淨資產、投資組合與資產管理的隱私優先 App。即時同步全球市場，隱私優先零上傳。",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      en: BASE_URL,
      "zh-TW": BASE_URL,
      "x-default": BASE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
