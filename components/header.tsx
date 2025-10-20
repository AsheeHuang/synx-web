"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { translations } from "@/lib/translations"

interface HeaderProps {
  language: "en" | "zh"
  setLanguage: (lang: "en" | "zh") => void
}

export function Header({ language, setLanguage }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/icon_fill.png"
              alt="Synx"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded"
            />
            <span className="text-xl sm:text-2xl font-bold text-foreground">Synx</span>
          </div>

          {/* Center navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm lg:text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.features}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm lg:text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Right side navigation */}
          <div className="flex items-center gap-4 lg:gap-6">
            <Link
              href="/inside"
              className="hidden md:block text-sm lg:text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.inside}
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
      </div>
    </header>
  )
}
