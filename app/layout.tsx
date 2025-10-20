import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Synx - Track Your Wealth. Simplified.",
  description:
    "Synx helps you monitor your total assets, investments, and cash flow across multiple markets and currencies — all in one place.",
  openGraph: {
    title: "Synx - Track Your Wealth. Simplified.",
    description:
      "Synx helps you monitor your total assets, investments, and cash flow across multiple markets and currencies — all in one place.",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
