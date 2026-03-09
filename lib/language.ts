export type Language = "en" | "zh"

const LANGUAGE_KEY = "synx-language"

export function getStoredLanguage(): Language | null {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem(LANGUAGE_KEY)
    if (stored === "en" || stored === "zh") {
      return stored
    }
  } catch (e) {
    // localStorage might be disabled
    console.error("Failed to read language from localStorage:", e)
  }

  return null
}

export function setStoredLanguage(language: Language): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(LANGUAGE_KEY, language)
  } catch (e) {
    // localStorage might be disabled
    console.error("Failed to save language to localStorage:", e)
  }
}

export function getBrowserLanguage(): Language {
  if (typeof window === "undefined") return "en"

  const browserLang = navigator.language || navigator.languages?.[0] || "en"
  return browserLang.toLowerCase().startsWith("zh") ? "zh" : "en"
}

export function getInitialLanguage(): Language {
  // Priority: stored preference > browser language
  return getStoredLanguage() ?? getBrowserLanguage()
}
