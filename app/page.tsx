"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

function getInitialLanguage(): "en" | "zh" {
  if (typeof window === "undefined") return "en"

  const browserLang = navigator.language || navigator.languages?.[0] || "en"
  return browserLang.toLowerCase().startsWith("zh") ? "zh" : "en"
}

export default function Home() {
  const [language, setLanguage] = useState<"en" | "zh">("en")

  useEffect(() => {
    setLanguage(getInitialLanguage())
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <HeroSection language={language} />
        <FeaturesSection language={language} />
        <FaqSection language={language} />
      </main>
      <Footer language={language} />
    </div>
  )
}
