"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { translations } from "@/lib/translations"

interface FeaturesSectionProps {
  language: "en" | "zh"
}

export function FeaturesSection({ language }: FeaturesSectionProps) {
  const t = translations[language]
  const screenshotRefs = useRef<(HTMLDivElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.2 }
    )

    screenshotRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    contentRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      title: t.features.portfolio.title,
      description: t.features.portfolio.description,
      imagePosition: "left" as const,
      background: "bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/30 dark:to-cyan-950/30",
      screenshot: "/screenshots/shot5.png",
    },
    {
      title: t.features.transactions.title,
      description: t.features.transactions.description,
      imagePosition: "right" as const,
      background: "bg-gradient-to-bl from-orange-50/50 to-amber-50/50 dark:from-orange-950/30 dark:to-amber-950/30",
      screenshot: "/screenshots/shot6.png",
    },
    {
      title: t.features.multiCurrency.title,
      description: t.features.multiCurrency.description,
      imagePosition: "left" as const,
      background: "bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/30",
      screenshot: "/screenshots/shot3.png",
    },
    {
      title: t.features.privacy.title,
      description: t.features.privacy.description,
      imagePosition: "right" as const,
      background: "bg-gradient-to-bl from-amber-50/50 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/30",
      screenshot: "/screenshots/shot4.png",
    },
  ]

  return (
    <section id="features" className="scroll-mt-20">
      {/* Section Title */}
      <div className="py-0 sm:py-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground text-center">
            {t.features.title}
          </h2>
        </div>
      </div>

      {/* Feature Blocks */}
      {features.map((feature, index) => (
        <div
          key={index}
          className={`py-16 sm:py-24 lg:py-32 ${feature.background}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-16 items-center">
                {/* Screenshot - Left position */}
                {feature.imagePosition === "left" && (
                  <div className="flex items-center justify-center">
                    <div
                      ref={(el) => { screenshotRefs.current[index] = el }}
                      className="w-40 h-80 sm:w-52 sm:h-[416px] lg:w-64 lg:h-[512px] rounded-3xl overflow-hidden float-up-on-scroll"
                      style={{ filter: 'drop-shadow(0 20px 20px rgba(0, 0, 0, 0.2))' }}
                    >
                      <Image
                        src={feature.screenshot}
                        alt={feature.title}
                        width={384}
                        height={768}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div
                  ref={(el) => { contentRefs.current[index] = el }}
                  className="text-left float-up-on-scroll-delay"
                >
                  <h3 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-2 sm:mb-4 lg:mb-6">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-base lg:text-lg xl:text-xl text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Screenshot - Right position */}
                {feature.imagePosition === "right" && (
                  <div className="flex items-center justify-center order-last">
                    <div
                      ref={(el) => { screenshotRefs.current[index] = el }}
                      className="w-40 h-80 sm:w-52 sm:h-[416px] lg:w-64 lg:h-[512px] rounded-3xl overflow-hidden float-up-on-scroll"
                      style={{ filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))' }}
                    >
                      <Image
                        src={feature.screenshot}
                        alt={feature.title}
                        width={384}
                        height={768}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
