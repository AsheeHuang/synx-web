"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { getInitialLanguage, setStoredLanguage, type Language } from "@/lib/language"

export default function Home() {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    setLanguage(getInitialLanguage())
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setStoredLanguage(lang)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} setLanguage={handleLanguageChange} />
      <main>
        <HeroSection language={language} />
        <FeaturesSection language={language} />
        <FaqSection language={language} />
      </main>
      <Footer language={language} />
    </div>
  )
}
