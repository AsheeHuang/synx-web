"use client"

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
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-foreground">Synx</span>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground">
            {t.footer.contact}:{" "}
            <a href="mailto:timhuang304@gmail.com" className="text-primary hover:underline">
              timhuang304@gmail.com
            </a>
          </p>

          <p className="text-sm text-muted-foreground pt-6">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
