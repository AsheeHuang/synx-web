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
      title: t.features.visualize.title,
      description: t.features.visualize.description,
      imagePosition: "left" as const,
      background: "bg-gradient-to-br from-orange-50/50 to-amber-50/50 dark:from-orange-950/30 dark:to-amber-950/30",
      screenshot: "/screenshots/shot7.png",
    },
    {
      title: t.features.portfolio.title,
      description: t.features.portfolio.description,
      imagePosition: "right" as const,
      background: "bg-gradient-to-bl from-blue-50/50 to-cyan-50/50 dark:from-blue-950/30 dark:to-cyan-950/30",
      screenshot: "/screenshots/shot5.png",
    },
    {
      title: t.features.transactions.title,
      description: t.features.transactions.description,
      imagePosition: "left" as const,
      background: "bg-gradient-to-br from-orange-50/50 to-amber-50/50 dark:from-orange-950/30 dark:to-amber-950/30",
      screenshot: "/screenshots/shot6.png",
    },
    {
      title: t.features.multiCurrency.title,
      description: t.features.multiCurrency.description,
      imagePosition: "right" as const,
      background: "bg-gradient-to-bl from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/30",
      screenshot: "/screenshots/shot3.png",
    },
    {
      title: t.features.investmentDashboard.title,
      description: t.features.investmentDashboard.description,
      imagePosition: "left" as const,
      background: "bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/30 dark:to-pink-950/30",
      screenshot: "/screenshots/shot8.png",
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
          className={`py-12 sm:py-16 lg:py-20 ${feature.background}`}
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
                    >
                      <Image
                        src={feature.screenshot}
                        alt={feature.title}
                        width={384}
                        height={768}
                        className="w-full h-full object-contain"
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
                    >
                      <Image
                        src={feature.screenshot}
                        alt={feature.title}
                        width={384}
                        height={768}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Banner Features */}
      <div className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-slate-50/50 to-gray-50/50 dark:from-slate-950/30 dark:to-gray-950/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
              {/* Multi-Currency */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-4 sm:mb-6">
                  <Image
                    src="/icons/1.svg"
                    alt={t.features.banner.multiCurrency.title}
                    width={80}
                    height={80}
                    className="w-full h-full"
                  />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground">
                  {t.features.banner.multiCurrency.title}
                </h3>
              </div>

              {/* Offline First */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-4 sm:mb-6">
                  <Image
                    src="/icons/2.svg"
                    alt={t.features.banner.offline.title}
                    width={80}
                    height={80}
                    className="w-full h-full"
                  />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground">
                  {t.features.banner.offline.title}
                </h3>
              </div>

              {/* iCloud Backup */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-4 sm:mb-6">
                  <Image
                    src="/icons/3.svg"
                    alt={t.features.banner.icloudBackup.title}
                    width={80}
                    height={80}
                    className="w-full h-full"
                  />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground">
                  {t.features.banner.icloudBackup.title}
                </h3>
              </div>

              {/* Privacy First */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-4 sm:mb-6">
                  <Image
                    src="/icons/4.svg"
                    alt={t.features.banner.privacy.title}
                    width={80}
                    height={80}
                    className="w-full h-full"
                  />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground">
                  {t.features.banner.privacy.title}
                </h3>
              </div>

              {/* Batch Transactions */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-4 sm:mb-6">
                  <Image
                    src="/icons/5.svg"
                    alt={t.features.banner.batchTransactions.title}
                    width={80}
                    height={80}
                    className="w-full h-full"
                  />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground">
                  {t.features.banner.batchTransactions.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
