export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Synx",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": ["iOS", "Android"],
        "description": "Synx 是隱私優先的淨資產管理與投資追蹤 App，支援股票、ETF、加密貨幣等多類資產管理，即時同步全球市場行情，零上傳隱私保護。Privacy-first net worth tracker and investment portfolio manager with real-time global market sync.",
        "keywords": "淨資產管理,投資追蹤,資產管理,淨資產,投資組合,定期定額,net worth tracker,investment tracker,portfolio tracker,wealth management",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "ratingCount": "325"
        },
        "author": {
          "@type": "Organization",
          "name": "Synx"
        },
        "downloadUrl": [
          "https://apps.apple.com/app/id6753709890",
          "https://play.google.com/store/apps/details?id=com.synxapp.synx"
        ],
        "screenshot": "https://synxapp.com/screenshots/shot1.png",
        "featureList": [
          "Net Worth Visualization",
          "Real-Time Global Market Sync",
          "Custom Portfolio Analysis",
          "Automated Transaction Management",
          "DCA / Recurring Investment Tracking",
          "Multi-Currency Support",
          "Offline First",
          "iCloud Auto Backup",
          "Privacy First – Data Never Uploaded",
          "淨資產視覺化追蹤與管理",
          "即時全球股票市場行情同步",
          "投資追蹤與組合分析",
          "多類資產管理（股票、ETF、加密貨幣）",
          "定期定額投資追蹤記錄",
          "多幣別支援",
          "離線優先",
          "iCloud 自動備份",
          "隱私至上 - 資料不上傳伺服器"
        ],
        "releaseNotes": "Net Worth Tracking & Investment Management App"
      },
      {
        "@type": "Organization",
        "name": "Synx",
        "url": "https://synxapp.com",
        "logo": "https://synxapp.com/icon_fill.png",
        "description": "Privacy-first net worth tracking and investment management. 提供隱私至上的淨資產管理與投資追蹤解決方案",
        "email": "support@synxapp.com",
        "sameAs": [
          "https://www.instagram.com/synxapp/",
          "https://www.threads.net/@synxapp",
          "https://www.facebook.com/profile.php?id=61584705035446",
          "https://x.com/synxapp_"
        ]
      },
      {
        "@type": "WebSite",
        "name": "Synx",
        "url": "https://synxapp.com",
        "description": "Privacy-first net worth tracking and investment management app. 一站式管理現金流與淨資產，台美股價自動同步。",
        "publisher": {
          "@type": "Organization",
          "name": "Synx"
        }
      },
      {
        "@type": "MobileApplication",
        "name": "Synx (iOS)",
        "applicationCategory": "Finance",
        "operatingSystem": "iOS 17.0 or later",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "158"
        },
        "downloadUrl": "https://apps.apple.com/app/id6753709890"
      },
      {
        "@type": "MobileApplication",
        "name": "Synx (Android)",
        "applicationCategory": "Finance",
        "operatingSystem": "Android",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "downloadUrl": "https://play.google.com/store/apps/details?id=com.synxapp.synx"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
