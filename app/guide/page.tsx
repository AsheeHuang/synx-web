"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { translations } from "@/lib/translations"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function getInitialLanguage(): "en" | "zh" {
  if (typeof window === "undefined") return "en"

  const browserLang = navigator.language || navigator.languages?.[0] || "en"
  return browserLang.toLowerCase().startsWith("zh") ? "zh" : "en"
}

export default function GuidePage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [activeSection, setActiveSection] = useState("interface")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [markdownContent, setMarkdownContent] = useState("")

  // Initialize language and section from URL hash
  useEffect(() => {
    setLanguage(getInitialLanguage())

    // Read section from URL hash
    const hash = window.location.hash.slice(1) // Remove '#'
    if (hash) {
      setActiveSection(hash)
    }
  }, [])

  // Update URL hash when section changes
  useEffect(() => {
    window.location.hash = activeSection
  }, [activeSection])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const t = translations[language].guide

  // Guide structure
  const guideStructure = [
    {
      id: "introduction",
      title: t.introduction.title,
      subsections: [
        {
          id: "corePhilosophy",
          title: t.introduction.corePhilosophy.title,
          content: t.introduction.corePhilosophy.content
        },
        {
          id: "features",
          title: t.introduction.features.title,
          content: t.introduction.features.content
        },
      ]
    }, {
      id: "userGuide",
      title: t.userGuide.title,
      subsections: [
        {
          id: "interface",
          title: t.userGuide.interface.title,
          content: t.userGuide.interface.content
        },
        {
          id: "addAccount",
          title: t.userGuide.addAccount.title,
          content: t.userGuide.addAccount.content
        },
        {
          id: "addTransaction",
          title: t.userGuide.addTransaction.title,
          content: t.userGuide.addTransaction.content
        },
        {
          id: "addPortfolio",
          title: t.userGuide.addPortfolio.title,
          content: t.userGuide.addPortfolio.content
        },
        {
          id: "recurring",
          title: t.userGuide.recurring.title,
          content: t.userGuide.recurring.content
        },
        {
          id: "adjustBalance",
          title: t.userGuide.adjustBalance.title,
          content: t.userGuide.adjustBalance.content
        },
        {
          id: "deleteAccount",
          title: t.userGuide.deleteAccount.title,
          content: t.userGuide.deleteAccount.content
        },
      ]
    },
    {
      id: "advanced",
      title: t.advanced.title,
      subsections: [
        {
          id: "dividend",
          title: t.advanced.dividend.title,
          content: t.advanced.dividend.content
        },
        {
          id: "bulkTransactions",
          title: t.advanced.bulkTransactions.title,
          content: t.advanced.bulkTransactions.content
        },
        {
          id: "groups",
          title: t.advanced.groups.title,
          content: t.advanced.groups.content
        },
        {
          id: "exclude",
          title: t.advanced.exclude.title,
          content: t.advanced.exclude.content
        },
        {
          id: "order",
          title: t.advanced.order.title,
          content: t.advanced.order.content
        },
        {
          id: "dashboard",
          title: t.advanced.dashboard.title,
          content: t.advanced.dashboard.content
        },
      ]
    },
    {
      id: "others",
      title: t.others.title,
      subsections: [
        {
          id: "privacy",
          title: t.others.privacy.title,
          content: t.others.privacy.content
        },
        {
          id: "cost",
          title: t.others.cost.title,
          content: t.others.cost.content
        },
        {
          id: "pricing",
          title: t.others.pricing.title,
          content: t.others.pricing.content
        },
        {
          id: "dataDelay",
          title: t.others.dataDelay.title,
          content: t.others.dataDelay.content
        },
        {
          id: "aboutDeveloper",
          title: t.others.aboutDeveloper.title,
          content: t.others.aboutDeveloper.content
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

  // Markdown file mapping
  const mdFileMap: Record<string, string> = {
    corePhilosophy: "core-philosophy",
    features: "features",
    interface: "interface",
    addAccount: "add-account",
    addTransaction: "add-transaction",
    addPortfolio: "add-portfolio",
    recurring: "recurring",
    adjustBalance: "adjust-balance",
    deleteAccount: "delete-account",
    dividend: "dividend",
    bulkTransactions: "bulk-transactions",
    groups: "groups",
    exclude: "exclude",
    order: "order",
    dashboard: "dashboard",
    privacy: "privacy",
    cost: "cost",
    pricing: "pricing",
    dataDelay: "data-delay",
    aboutDeveloper: "about-developer",
  }

  // Load markdown content when section changes
  useEffect(() => {
    const loadMarkdown = async () => {
      const fileName = mdFileMap[activeSection]
      if (!fileName) {
        setMarkdownContent(currentSubsection.content)
        return
      }

      try {
        const response = await fetch(`/guide/content/${language}/${fileName}.md`)
        if (response.ok) {
          const text = await response.text()
          setMarkdownContent(text)
        } else {
          setMarkdownContent(currentSubsection.content)
        }
      } catch (error) {
        console.error("Failed to load markdown:", error)
        setMarkdownContent(currentSubsection.content)
      }
    }

    loadMarkdown()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, language])

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

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-10 mb-6 text-gray-900" {...props} />,
                  h4: ({node, ...props}) => <h4 className="text font-semibold mt-8 mb-4 text-gray-900" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                  ul: ({node, ...props}) => <ul className="mb-4 ml-6 space-y-2 list-disc" {...props} />,
                  ol: ({node, ...props}) => <ol className="mb-4 ml-6 space-y-2 list-decimal" {...props} />,
                  li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                  em: ({node, ...props}) => <em className="italic" {...props} />,
                  a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600" {...props} />,
                  code: ({node, inline, ...props}: any) =>
                    inline
                      ? <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800" {...props} />
                      : <code className="block bg-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto" {...props} />,
                }}
              >
                {markdownContent}
              </ReactMarkdown>
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
