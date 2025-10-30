export const translations = {
  en: {
    nav: {
      features: "Features",
      faq: "FAQ",
      privacy: "Privacy",
      download: "Download",
      contact: "Contact",
      inside: "Inside Synx",
    },
    hero: {
      title: "Your Net Worth, in Perfect Sync.",
      subtitle: "From live market prices to automated cash flow, Synx gives you a clear, private, and real-time view of your entire financial life.",
      appStore: {
        line1: "Download on the",
        line2: "App Store",
      },
      playStore: {
        line1: "Get it on",
        line2: "Google Play",
      },
    },
    features: {
      title: "Features",
      visualize: {
        title: "Visualize Your Financial Journey",
        description: "See your net worth come to life through interactive line charts. Switch between time ranges, assets, investments, and liabilities — and understand your financial direction at a glance.",
      },
      portfolio: {
        title: "Real-Time Market Sync",
        description: "Your assets stay perfectly aligned with real-time prices from major global markets — including the U.S., Taiwan, China, the U.K., and crypto, with more on the way.",
      },
      transactions: {
        title: "Customizable Portfolio Insights",
        description: "Visualize your entire portfolio with clear performance metrics, growth trends, and asset proportions — create custom views that match your investment style.",
      },
      multiCurrency: {
        title: "Automated Transaction Management",
        description: "Handle recurring payments, flexible investments, and even uncertain amounts with ease. Synx automatically tracks your cash flow, manages transfers, and reminds you when it's time to act.",
      },
      privacy: {
        title: "Privacy First, Always.",
        description: "Your data stays on your device — never uploaded to any server. With Face ID protection and one-tap privacy mode, Synx keeps your portfolio secure while letting you control what's visible.",
      },
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "Is Synx a budgeting or expense-tracking app?",
          answer: "Not exactly. While you can record and manage transactions like a traditional budgeting app, Synx is built for net worth management. It focuses on your overall assets, investments, and major cash flows rather than everyday spending.\n\nYou don't need to log every coffee or meal. Instead, you can update your data weekly or whenever you make larger financial moves, keeping your focus on long-term growth and clarity.",
        },
        {
          question: "How can I track my recurring (DCA) investments?",
          answer: "You can add a recurring transaction when creating a new record, and set the schedule for when your DCA occurs (such as every month, every week, or every quarter). Synx supports flexible scheduling patterns, including skipping weekends or non-trading days automatically.\n\nBecause DCA transactions usually don't have fixed amounts, Synx keeps them in an \"upcoming\" state until the scheduled day. On that day, the transaction automatically moves to \"pending\", with the day's closing price prefilled. All you need to do is confirm the number of shares and finalize the record.\n\nYou can also preview your future recurring investments on the calendar, so you'll always know when the next one will happen.",
        },
        {
          question: "Is my financial data safe?",
          answer: "Absolutely. All your data stays on your device and is never uploaded to any server. We use Face ID/Touch ID protection and offer a privacy mode to keep your information secure at all times.",
        },
        {
          question: "Which markets and currencies does Synx support?",
          answer: "Synx currently supports live market price syncing for the U.S., Taiwan, China, the U.K., and cryptocurrencies. For currencies, you can track assets in USD, TWD, JPY, EUR, CNY, and GBP, with more markets and currencies continuously being added.\n\nYou can also manually track other asset types such as real estate, bank accounts, or valuables like jewelry to get a complete and accurate view of your total net worth.",
        },
        {
          question: "Can Synx sync with my bank accounts?",
          answer: "No. Synx does not sync with banks. This is both due to regulatory restrictions and our privacy-first philosophy. We will never ask for your bank credentials or access your account data, because that would go against Synx's privacy standards.\n\nAnd honestly, you don't need to. Instead of syncing every tiny transaction, Synx encourages you to record your asset updates manually once a week or month, so you can focus on the bigger financial picture. Full bank syncing often adds unnecessary noise that makes understanding your wealth more complicated than it needs to be.",
        },
        {
          question: "What's the difference between the Free plan and Synx Pro?",
          answer: "Both the Free and Pro versions of Synx include the same core features. You can track your assets, investments, and cash flow in either plan.\n\nThe main differences are in the limits: the Free plan restricts the number of investment accounts you can create and the daily API requests for market prices. Since real-time market data requires paid API access, these limits help keep the service running smoothly.\n\nUpgrading to Synx Pro removes those limits and gives you full access to all available data and updates.",
        },
        {
          question: "Is Synx subscription-based or a one-time purchase?",
          answer: "I'll be honest: I don't like subscriptions either. But since the backend APIs that power live market data are subscription-based, Synx also has to follow that model to keep running.\n\nThe difference is, I've kept the price as low as possible (much cheaper than most asset management apps) because Synx is built by a small independent studio. I just want to cover the costs and pay myself a fair salary, not make extra profit.\n\nIn the future, if the app becomes financially stable, I might offer a one-time purchase option. For now, it remains subscription-based so the service can stay sustainable.",
        },
        {
          question: "Why isn't the stock price update completely real-time?",
          answer: "There are two main reasons. First, the APIs I use don't provide second-by-second real-time data. Most sources have a 15 to 30 minute delay, which is standard for many financial APIs. Second, Synx caches price data to reduce unnecessary API calls and keep costs low. This helps the app stay fast and sustainable without overloading the servers.\n\nSynx focuses on long-term net worth tracking, not high-frequency trading, so minute-level accuracy isn't really necessary. A small delay of 15 to 30 minutes still gives you a clear and accurate picture of your overall financial trends.",
        },
      ],
    },
    privacy: {
      title: "Your Privacy Matters",
      description: "Your data stays yours. Synx never shares or sells user information.",
      button: "Read Privacy Policy",
    },
    download: {
      title: "Get Started Today",
      subtitle: "Download Synx and take control of your financial future",
      appStore: "Download on the App Store",
      playStore: "Coming Soon - Google Play",
      comingSoon: "Android version coming soon",
    },
    footer: {
      contact: "Contact",
      copyright: "© 2025 Synx. All rights reserved.",
    },
    inside: {
      hero: {
        title: "Inside Synx",
        subtitle: "A behind-the-scenes look at how Synx was designed, built, and refined — from first concept to daily companion.",
      },
      content: {
        p1: "I've always been someone who loves data. Even if the data isn't useful, I still like to keep it — just because. Like how I track the temperature in my room every day. I don't really need that information, but I just enjoy seeing the numbers go up and down.",
        p2: "It's the same with financial data. I like watching my assets change, the movement of that line going up and down. Maybe it doesn't mean much to anyone else, but for me, it represents a kind of measurable growth.",
        p3: "When I started looking for asset management apps, I ran into two main problems. The first one is that most apps that can sync with the stock market only do that — they can't include other types of assets like real estate, cash, or bank accounts. I wanted a single place where I could see everything together and understand the bigger picture.",
        p4: "The second issue is that I invest regularly through DCA. I noticed that these apps couldn't record each contribution in real time. Sometimes I forgot to enter it, sometimes I had to type it in manually, and there were no reminders. The data just wasn't accurate or up to date, and that made tracking my cash flow difficult.",
        p5: "I've tried a lot of different apps. Some are too automatic — they ask for your bank credentials so they can sync everything. That never felt secure to me, and often ran into limits with bank or legal restrictions. Some banks don't even support syncing at all, which leaves your data incomplete. Others are too manual — you have to enter every little expense yourself. Tracking things like dinner or coffee every day felt exhausting. I didn't want to be tied to bookkeeping.",
        p6: "So with Synx, I wanted to find the middle ground — something semi-automatic. Your stocks and investments could sync automatically and stay organized, but your cash flow and recurring payments could stay under your own control, with reminders when needed.",
        p7: "I don't care about recording every small expense. I just want to focus on the big picture — the major inflows and outflows — and see the overall direction of my finances.",
        p8: "That's why I want Synx to be a simple and practical tool. It doesn't need to be flashy or overloaded with features. It should help organize my data without getting in my way. Some parts should be automatic, and others I can control myself. I just want a clear view of how everything changes.",
        p9: "I've always been the kind of person who likes solving problems. As a software engineer, I usually start with my own needs, and this time, I wanted to solve more than just my own.",
        p10: "I think Synx fills that missing space in asset management — something simple yet complete, clean and reliable, without unnecessary complexity or linking accounts.",
        p11: "So I figured, if it doesn't exist, I'll just build it myself.",
        p12: "I made this app purely to solve my own problems, and I'm really happy that those problems are finally solved. I hope Synx can help solve yours too. If there's a feature you'd like to see, feel free to reach out — it might be something I need as well.",
      },
      footer: {
        copyright: "© 2025 Synx. All rights reserved.",
        backToHome: "← Back to Homepage",
      },
    },
  },
  zh: {
    nav: {
      features: "功能",
      faq: "常見問題",
      contact: "聯絡",
      inside: "深入 Synx",
    },
    hero: {
      title: "你的資產，時時同步",
      subtitle: "從即時市場到自動化金流，Synx 讓你清楚又安全地掌握全局財務狀況。",
      appStore: {
        line1: "Download on the",
        line2: "App Store",
      },
      playStore: {
        line1: "Get it on",
        line2: "Google Play",
      },
    },
    features: {
      title: "功能",
      visualize: {
        title: "視覺化你的財務旅程",
        description: "用互動折線圖清楚看見你的淨資產變化。可自由切換時間區間、資產、投資與負債，一眼掌握財務走向。",
      },
      portfolio: {
        title: "即時市場同步",
        description: "您的資產與全球主要市場的即時價格完美同步——包括美國、台灣、中國、英國和加密貨幣，更多市場即將推出。",
      },
      transactions: {
        title: "自訂投資組合",
        description: "透過清晰的績效指標、成長趨勢和資產比例視覺化您的整個投資組合——創建符合您投資風格的自訂視圖。",
      },
      multiCurrency: {
        title: "自動交易管理",
        description: "輕鬆處理定期付款、彈性投資，甚至不確定的金額。Synx 自動追蹤您的現金流、管理轉帳，並在該行動時提醒您。",
      },
      privacy: {
        title: "隱私至上 始終如一",
        description: "您的資料保存在您的裝置上——永不上傳至任何伺服器。透過 Face ID 保護和一鍵隱私模式，Synx 確保您的投資組合安全，同時讓您控制可見內容。",
      },
    },
    faq: {
      title: "常見問題",
      items: [
        {
          question: "Synx 是記帳 App 嗎？",
          answer: "不完全是。雖然 Synx 也能像一般記帳 App 一樣記錄交易，但它更專注於淨資產的管理，讓你追蹤整體的資產、投資與主要的金流變化，而不是每天的零碎花費。\n\n你不需要每天記下每一杯咖啡或每一餐，只要在有較大的收支變化時或每週同步一次，就能清楚掌握你的財務走向與長期成長。",
        },
        {
          question: "要怎麼追蹤定期定額的投資？",
          answer: "你可以在新增交易時建立一筆重複交易，並設定定期定額的週期，例如每月、每週或每季。Synx 支援多種排程模式，甚至能自動跳過週末或非交易日。\n\n由於定期定額的金流金額通常不固定，Synx 會先把它保留在「即將發生」的狀態。等到那一天到來時，系統會自動把它轉成「待處理」，並自動帶入當日的收盤價。使用者只需要確認股數和價格，就能完成紀錄。\n\n你也可以在畫面上看到未來的定期定額日期，只要在那一天填入實際金額，就能輕鬆維持完整紀錄。",
        },
        {
          question: "我的財務資料安全嗎？",
          answer: "絕對安全。您的所有資料都保存在您的裝置上，永遠不會上傳到任何伺服器。我們使用 Face ID/Touch ID 保護，並提供隱私模式，讓您的資訊始終保持安全。",
        },
        {
          question: "Synx 支援哪些市場與幣別？",
          answer: "Synx 目前支援 美國、台灣、中國、英國與加密貨幣的市場價格同步。在幣別方面，目前可使用 美金（USD）、台幣（TWD）、日圓（JPY）、歐元（EUR）、人民幣（CNY） 與 英鎊（GBP），未來還會持續新增更多市場與幣別。\n\n此外，你也可以手動追蹤其他資產，例如房地產、銀行帳戶或珠寶等項目，以獲得更完整的淨資產視圖。",
        },
        {
          question: "Synx 可以同步銀行帳戶嗎？",
          answer: "不行，Synx 不支援銀行同步。這一方面是因為受到法規限制，另一方面則是出於我們的隱私原則。Synx 不會要求你提供銀行帳號或密碼，也不會代替你去同步資料，這不符合我們的隱私保護標準。\n\n不過，其實你也不需要銀行同步。Synx 的設計理念是讓你只需每週或每月更新一次資產變動，就能掌握整體財務狀況。若使用自動銀行同步，反而會帶入太多細小的雜項，讓你更難看清真正的財務走向。",
        },
        {
          question: "免費方案與 Synx Pro 方案有什麼差別？",
          answer: "Synx 的 免費版與 Pro 付費版都提供相同的主要功能，不論是追蹤資產、投資或金流都能使用。\n\n差別主要在於使用上的限制：免費版會限制可建立的投資帳戶數量以及每日可取得的市場價格更新次數。由於即時市場資料需要付費的 API 來源，這樣的設計能讓服務更穩定。\n\n升級到 Synx Pro 後，這些限制將會解除，你就能完整使用所有資料與更新內容。",
        },
        {
          question: "Synx 是訂閱制還是一次性購買？",
          answer: "老實說，我也不喜歡訂閱制。但由於提供即時市場資料的後端 API 本身就是訂閱制收費，Synx 也只能採用相同的模式來維持運作。\n\n不過我已經把價格壓到最低，比大多數資產管理 App 都便宜，因為 Synx 是由我個人工作室開發，我只想負擔開發成本，給自己一份合理的薪水，並不是要從中賺取額外利潤。\n\n未來如果現金流穩定，我會考慮推出一次性購買方案。目前仍採用訂閱制，讓服務能長期穩定地繼續提供給大家。",
        },
        {
          question: "為什麼股價更新不是完全即時的？",
          answer: "主要有兩個原因。第一，後端使用的 API 無法提供秒級即時的股價資訊，大多會延遲約 15 到 30 分鐘，這在金融資料服務中是很常見的情況。第二，Synx 會將股價資料進行快取（cache），以避免過於頻繁地向伺服器請求資料，同時也能降低運行成本。\n\nSynx 著重在長期的淨資產管理，而不是高頻交易，因此不需要到秒級的即時性。15 到 30 分鐘的延遲仍足以準確地呈現你的財務變化與整體趨勢。",
        },
      ],
    },
    privacy: {
      title: "您的隱私很重要",
      description: "您的資料屬於您。Synx 絕不分享或出售使用者資訊。",
      button: "閱讀隱私政策",
    },
    download: {
      title: "立即開始",
      subtitle: "下載 Synx，掌控您的財務未來",
      appStore: "在 App Store 下載",
      playStore: "即將推出 - Google Play",
      comingSoon: "Android 版即將推出",
    },
    footer: {
      contact: "聯絡",
      copyright: "© 2025 Synx. All rights reserved.",
    },
    inside: {
      hero: {
        title: "深入 Synx",
        subtitle: "從最初的概念到日常夥伴 — 深入了解 Synx 是如何被設計、建構和精煉的幕後故事。",
      },
      content: {
        p1: "我一直都是個喜歡看資料的人。即使那些資料沒有實際用途，我還是會想把它們留下來，就像我會記錄房間每天的溫度變化，雖然不一定會用到那些數據，但我就是單純喜歡看著它們上上下下。",
        p2: "對我來說，財務的數據也一樣。我喜歡看著資產的變化、那條折線的起伏，也許對別人來說這沒有什麼實際意義，但對我而言，那是一種可被量化的成長感。",
        p3: "在找資產管理 App 的時候，我發現了兩個痛點。第一個是，大部分能同步股票的 App 通常就只能同步股票，沒辦法同時記錄其他類型的資產，像房地產、現金或銀行帳戶。但我希望能把所有資產都放在同一個地方，清楚看到整體的變化。",
        p4: "第二個痛點是我有定期定額的習慣。我發現這類 App 沒辦法即時記錄每一次的金額，有時會忘記，有時又要手動輸入，也沒有提醒。資料因此變得不即時，也讓我沒辦法完整地追蹤金流。",
        p5: "我試過很多資產管理 App。有些太自動，要你交出銀行帳號密碼讓系統幫你同步，但那樣讓人覺得不安心，也常受到法規或銀行限制，甚至有些銀行根本不開放同步，資料就不完整。也有一些 App 太手動，每筆開銷都得自己輸入，連吃飯或買咖啡都要記下來，對我來說那太繁瑣，我不想被記帳綁住。",
        p6: "我希望 Synx 能找到中間的平衡，一個「半自動」的系統。股票和投資資產可以自動同步、幫我整理，但現金流和定期定額的紀錄，我能自己掌控時間和金額，系統只要在該提醒的時候提醒我就好。",
        p7: "我不追求記下所有小額消費，只想專注在主要的支出與收入，看到財務的整體方向和趨勢。",
        p8: "所以我希望 Synx 是一個簡單又實用的工具，不需要太花俏，也不需要太多功能。它應該能幫我整理資料，但不要干擾我，該自動的地方自動，該手動的地方我能自己控制，只要讓我能清楚看到一切的變化就夠了。",
        p9: "我本來就是個喜歡解決問題的人。身為軟體工程師，我總是從自己的需求開始動手，而這一次，我想解決的不只是自己的問題。",
        p10: "我希望 Synx 能補上市場上那個「簡單但完整的資產管理」的空缺，不需要雜亂的操作，也不需要連線帳號，只要乾淨、明確、可靠。",
        p11: "所以我想，既然沒有這樣的產品，那就自己來做一個。",
        p12: "我做這個 App，完全是為了解決自己的問題，而我很開心這些問題真的被解決了。希望 Synx 也能幫你解決你的問題。如果你有想加入的功能，歡迎隨時聯繫我，或許那也是我需要的功能。",
      },
      footer: {
        copyright: "© 2025 Synx. All rights reserved.",
        backToHome: "← 返回首頁",
      },
    },
  },
}
