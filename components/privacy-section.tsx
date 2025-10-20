"use client"

import { Button } from "@/components/ui/button"
import { translations } from "@/lib/translations"

interface PrivacySectionProps {
  language: "en" | "zh" | "ja"
}

export function PrivacySection({ language }: PrivacySectionProps) {
  const t = translations[language]

  return (
    <section id="privacy" className="py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 text-balance">
            {t.privacy.title}
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 text-pretty leading-relaxed">
            {t.privacy.description}
          </p>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base border-2 bg-transparent"
          >
            {t.privacy.button}
          </Button>
        </div>
      </div>
    </section>
  )
}
