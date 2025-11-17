"use client"

import { Button } from "@/components/ui/button"
import { translations } from "@/lib/translations"

interface DownloadSectionProps {
  language: "en" | "zh" | "ja"
}

export function DownloadSection({ language }: DownloadSectionProps) {
  const t = translations[language]

  return (
    <section id="download" className="py-16 sm:py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              {t.download.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              {t.download.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* App Mockups */}
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <div className="w-40 h-80 sm:w-48 sm:h-96 bg-muted rounded-3xl border-4 border-border flex items-center justify-center shadow-2xl">
                <span className="text-xs sm:text-sm text-muted-foreground text-center px-4">
                  App Screenshot
                  <br />
                  Placeholder
                </span>
              </div>
              <div className="w-40 h-80 sm:w-48 sm:h-96 bg-muted rounded-3xl border-4 border-border flex items-center justify-center shadow-2xl -mt-8">
                <span className="text-xs sm:text-sm text-muted-foreground text-center px-4">
                  App Screenshot
                  <br />
                  Placeholder
                </span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="space-y-6">
              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-16 sm:h-20 text-base sm:text-lg"
                asChild
              >
                <a href="https://apps.apple.com/app/id6753709890" target="_blank" rel="noopener noreferrer">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                  </svg>
                  {t.download.appStore}
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-2xl h-16 sm:h-20 text-base sm:text-lg border-2 bg-transparent cursor-not-allowed opacity-60"
                disabled
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                {t.download.playStore}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
