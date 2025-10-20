"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { translations } from "@/lib/translations"

export default function InsidePage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const t = translations[language].inside

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Custom Header for Inside Page */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/icon_fill.png"
                alt="Synx"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded"
              />
              <span className="text-xl sm:text-2xl font-bold text-foreground">Synx</span>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="text-xs sm:text-sm min-w-[60px] bg-transparent"
            >
              {"EN / 中文"}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#06D6D6]/10 via-white to-[#06D6D6]/5 py-24 px-6 mt-16 sm:mt-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl mb-6">
            {t.hero.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {/* {t.hero.subtitle} */}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
          <p>{t.content.p1}</p>
          <p>{t.content.p2}</p>

          <div className="h-4"></div>

          <p>{t.content.p3}</p>
          <p>{t.content.p4}</p>
          <p>{t.content.p5}</p>

          <div className="h-4"></div>

          <p>{t.content.p6}</p>
          <p>{t.content.p7}</p>

          <div className="h-4"></div>

          <p>{t.content.p8}</p>
          <p>{t.content.p9}</p>
          <p>{t.content.p10}</p>

          <div className="h-4"></div>

          <p>{t.content.p11}</p>

          <div className="h-4"></div>

          <p>{t.content.p12}</p>
          <p>{t.content.p13}</p>
          <p>{t.content.p14}</p>

          <div className="h-4"></div>

          <p>{t.content.p15}</p>
          <p>{t.content.p16}</p>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-gray-600 mb-4">
            {t.footer.copyright}
          </p>
          <a
            href="/"
            className="text-[#06D6D6] hover:text-[#05C5C5] transition-colors font-medium"
          >
            {t.footer.backToHome}
          </a>
        </div>
      </footer>
    </div>
  );
}
