"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { translations } from "@/lib/translations"

interface FaqSectionProps {
  language: "en" | "zh"
}

export function FaqSection({ language }: FaqSectionProps) {
  const t = translations[language]

  return (
    <section id="faq" className="py-16 sm:py-24 lg:py-32 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground text-center mb-12 sm:mb-16">
            {t.faq.title}
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {t.faq.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg sm:text-xl font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base sm:text-lg text-muted-foreground">
                  {item.answer.split('\n\n').map((paragraph, i) => (
                    <p key={i} className={i > 0 ? 'mt-4' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
