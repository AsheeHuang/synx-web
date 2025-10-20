"use client"

import Image from "next/image"
import { translations } from "@/lib/translations"

interface FooterProps {
  language: "en" | "zh"
}

export function Footer({ language }: FooterProps) {
  const t = translations[language]

  return (
    <footer id="contact" className="py-12 sm:py-16 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Image
              src="/icon_fill.png"
              alt="Synx"
              width={32}
              height={32}
              className="w-8 h-8 rounded"
            />
            <span className="text-xl font-bold text-foreground">Synx</span>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground">
            {t.footer.contact}:{" "}
            <a href="mailto:support@synxapp.com" className="text-primary hover:underline">
              support@synxapp.com
            </a>
          </p>

          <p className="text-sm text-muted-foreground pt-6">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
