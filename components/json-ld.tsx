export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Synx",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": ["iOS", "Android"],
        "description": "一站式管理現金流與淨資產，台美股價自動同步，讓你清楚又安全掌握全局財務狀況。淨資產管理、投資組合追蹤、定期定額投資記錄。",
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
          "淨資產視覺化追蹤",
          "即時股票市場價格同步",
          "自訂投資組合分析",
          "自動交易管理",
          "定期定額投資記錄",
          "多幣別支援",
          "離線優先",
          "iCloud 自動備份",
          "隱私至上 - 資料不上傳伺服器"
        ],
        "releaseNotes": "淨資產管理與投資追蹤應用程式"
      },
      {
        "@type": "Organization",
        "name": "Synx",
        "url": "https://synxapp.com",
        "logo": "https://synxapp.com/icon_fill.png",
        "description": "提供隱私至上的淨資產管理與投資追蹤解決方案",
        "email": "support@synxapp.com",
        "sameAs": [
          "https://www.instagram.com/synxapp/",
          "https://www.threads.net/@synxapp"
        ]
      },
      {
        "@type": "WebSite",
        "name": "Synx - 你的資產,時時同步",
        "url": "https://synxapp.com",
        "description": "一站式管理現金流與淨資產，台美股價自動同步，讓你清楚又安全掌握全局財務狀況。淨資產管理、投資組合追蹤、定期定額投資記錄。",
        "publisher": {
          "@type": "Organization",
          "name": "Synx"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://synxapp.com/?s={search_term_string}",
          "query-input": "required name=search_term_string"
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
