"use client"

import { useState, useEffect } from "react"

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.synxapp.synx"

export function AppBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const isAndroid = /android/i.test(navigator.userAgent)
    const dismissed = sessionStorage.getItem("synx-banner-dismissed")
    if (isAndroid && !dismissed) {
      setShow(true)
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty("--banner-h", show ? "52px" : "0px")
    return () => document.documentElement.style.setProperty("--banner-h", "0px")
  }, [show])

  if (!show) return null

  return (
    <div className="flex items-center gap-3 bg-white border-b border-gray-200 px-3 py-2 fixed top-0 left-0 right-0 z-[60] shadow-sm" style={{ height: "52px" }}>
      <button
        onClick={() => {
          setShow(false)
          sessionStorage.setItem("synx-banner-dismissed", "1")
        }}
        className="text-gray-400 text-xl leading-none shrink-0"
        aria-label="關閉"
      >
        ×
      </button>
      <img src="/icon_fill.png" alt="Synx" className="w-10 h-10 rounded-xl shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">Synx</p>
        <p className="text-xs text-gray-500 truncate">淨資產管理・投資追蹤</p>
      </div>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 bg-black text-white text-xs font-medium px-3 py-1.5 rounded-full"
      >
        取得
      </a>
    </div>
  )
}
