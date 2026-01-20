"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function GuidePage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [activeSection, setActiveSection] = useState("core-philosophy")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  // Guide structure
  const guideStructure = [
    {
      id: "introduction",
      title: language === "en" ? "Synx Introduction" : "Synx 簡介",
      subsections: [
        {
          id: "core-philosophy",
          title: language === "en" ? "Core Philosophy" : "核心理念",
          content: []
        },
        {
          id: "features",
          title: language === "en" ? "Features Overview" : "功能介紹",
          content: []
        },
        {
          id: "inside-synx",
          title: language === "en" ? "Developer's Notes" : "開發者的話",
          content: []
        }
      ]
    },
    {
      id: "user-guide",
      title: language === "en" ? "User Guide" : "使用指南",
      subsections: [
        {
          id: "interface",
          title: language === "en" ? "Understanding the Interface" : "認識介面",
          content: []
        },
        {
          id: "overview-page",
          title: language === "en" ? "Overview Page" : "總覽頁面",
          content: []
        },
        {
          id: "portfolio-page",
          title: language === "en" ? "Portfolio Page" : "投資組合頁面",
          content: []
        }
      ]
    },
    {
      id: "advanced",
      title: language === "en" ? "Advanced Topics" : "進階主題",
      subsections: [
        {
          id: "privacy",
          title: language === "en" ? "Privacy & Security" : "隱私與安全",
          content: []
        },
        {
          id: "tips",
          title: language === "en" ? "Tips & Tricks" : "使用技巧",
          content: []
        }
      ]
    }
  ]

  // Get current active subsection
  const getCurrentSubsection = () => {
    for (const section of guideStructure) {
      const subsection = section.subsections.find(s => s.id === activeSection)
      if (subsection) return subsection
    }
    return guideStructure[0].subsections[0]
  }

  const currentSubsection = getCurrentSubsection()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

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
            </div>

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

      {/* Main Content */}
      <div className="pt-16 sm:pt-20 flex">
        {/* Sidebar Navigation */}
        <aside className="hidden md:block w-64 lg:w-80 border-r border-gray-200 fixed left-0 top-16 sm:top-20 bottom-0 overflow-y-auto bg-gray-50">
          <nav className="p-6 space-y-6">
            {guideStructure.map((section) => (
              <div key={section.id}>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.subsections.map((subsection) => (
                    <li key={subsection.id}>
                      <button
                        onClick={() => setActiveSection(subsection.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          activeSection === subsection.id
                            ? "bg-blue-500 text-white font-medium"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        {subsection.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 md:ml-64 lg:ml-80">
          <article className="mx-auto max-w-3xl px-6 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              {currentSubsection.title}
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 italic">
                {language === "en"
                  ? "Content coming soon..."
                  : "內容即將推出..."}
              </p>
            </div>
          </article>
        </main>
      </div>

      {/* Mobile Navigation Sidebar */}
      <>
        {/* Overlay */}
        <div
          className={`md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sidebar */}
        <aside className={`md:hidden fixed left-0 top-16 sm:top-20 bottom-0 w-80 bg-gray-50 z-40 overflow-y-auto border-r border-gray-200 shadow-xl transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
          <nav className="p-6 space-y-6">
            {guideStructure.map((section) => (
              <div key={section.id}>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.subsections.map((subsection) => (
                    <li key={subsection.id}>
                      <button
                        onClick={() => {
                          setActiveSection(subsection.id)
                          setIsMobileMenuOpen(false)
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          activeSection === subsection.id
                            ? "bg-blue-500 text-white font-medium"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        {subsection.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>
      </>
    </div>
  )
}
