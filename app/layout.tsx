import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Synx - Your Net Worth, in Perfect Sync.",
  description:
    "From live market prices to automated cash flow, Synx gives you a clear, private, and real-time view of your entire financial life.",
  openGraph: {
    title: "Synx - Your Net Worth, in Perfect Sync.",
    description:
      "From live market prices to automated cash flow, Synx gives you a clear, private, and real-time view of your entire financial life.",
    type: "website",
  },
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
