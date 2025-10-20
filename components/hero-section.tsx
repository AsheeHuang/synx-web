"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AnimatedChart } from "@/components/animated-chart"
import { translations } from "@/lib/translations"

interface HeroSectionProps {
  language: "en" | "zh"
}

export function HeroSection({ language }: HeroSectionProps) {
  const t = translations[language]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <AnimatedChart />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6 text-balance">
            {t.hero.title}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto text-pretty leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Screenshots */}
          <div className="flex sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* Mobile: Stacked overlapping layout */}
            <div className="relative sm:hidden w-full max-w-sm h-[380px]">
              {/* Bottom image - positioned to the left and lower */}
              <div className="absolute bottom-0 left-12 w-40 h-[320px] rounded-3xl overflow-hidden animate-float-up-delay-1" style={{ filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))' }}>
                <Image
                  src="/screenshots/shot2.png"
                  alt="Synx App Screenshot 2"
                  width={384}
                  height={768}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Top image - overlaps bottom right, positioned top right */}
              <div className="absolute top-0 right-12 w-44 h-[352px] rounded-3xl overflow-hidden animate-float-up" style={{ filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))' }}>
                <Image
                  src="/screenshots/shot1.png"
                  alt="Synx App Screenshot 1"
                  width={384}
                  height={768}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Desktop: Side by side layout */}
            <div className="hidden sm:flex items-center justify-center gap-6">
              <div className="w-64 h-[512px] rounded-3xl overflow-hidden animate-float-up" style={{ filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))' }}>
                <Image
                  src="/screenshots/shot1.png"
                  alt="Synx App Screenshot 1"
                  width={384}
                  height={768}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-64 h-[512px] rounded-3xl overflow-hidden animate-float-up-delay-1" style={{ filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))' }}>
                <Image
                  src="/screenshots/shot2.png"
                  alt="Synx App Screenshot 2"
                  width={384}
                  height={768}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 h-14 flex items-center gap-3"
            >
              <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-xs leading-tight">{t.hero.appStore.line1}</span>
                <span className="text-base font-semibold leading-tight">{t.hero.appStore.line2}</span>
              </div>
            </Button>
            <Button
              size="lg"
              variant="outline"
              disabled
              className="rounded-xl px-6 h-14 border-2 bg-transparent flex items-center gap-3 opacity-60 cursor-not-allowed"
            >
              <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-xs leading-tight">{t.hero.playStore.line1}</span>
                <span className="text-base font-semibold leading-tight">{t.hero.playStore.line2}</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
