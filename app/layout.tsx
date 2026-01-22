import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { JsonLd } from "@/components/json-ld"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Synx - 淨資產管理與投資追蹤 App",
  description:
    "一站式管理現金流與淨資產，台美股價自動同步，讓你清楚又安全掌握全局財務狀況。",
  openGraph: {
    title: "Synx - 淨資產管理與投資追蹤 App",
    description:
      "一站式管理現金流與淨資產，台美股價自動同步，讓你清楚又安全掌握全局財務狀況。",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head>
        <JsonLd />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
