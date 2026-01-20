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
        description: "See your net worth come to life through interactive line charts. Switch between time ranges, assets, investments, and liabilities to understand your financial direction at a glance.",
      },
      portfolio: {
        title: "Real-Time Market Sync",
        description: "Your assets stay perfectly aligned with real-time prices from major global markets including the U.S., Taiwan, China, U.K., Japan, Hong Kong, precious metals, and cryptocurrencies. You can also manually add assets from other markets.",
      },
      transactions: {
        title: "Customizable Portfolio Insights",
        description: "Visualize your entire portfolio with clear performance metrics, growth trends, and asset proportions. Create custom views that match your investment style.",
      },
      multiCurrency: {
        title: "Automated Transaction Management",
        description: "Synx handles fixed and variable transactions differently to maximize efficiency. Fixed income and expenses execute automatically in the background, while variable investments like DCA are pre-filled based on real-time market data. You simply review and confirm in one tap, saving time while ensuring your portfolio costs remain accurate.",
      },
      privacy: {
        title: "Privacy First, Always.",
        description: "Your data stays on your device and is never uploaded to any server. With Face ID protection and one-tap privacy mode, Synx keeps your portfolio secure while letting you control what's visible.",
      },
      investmentDashboard: {
        title: "Investment Dashboard",
        description: "The Investment Dashboard gives you a clear snapshot of your portfolio. See your cost basis, unrealized and realized P&L, and explore interactive charts showing price, average cost, and market value trends. Understand your investment performance at a glance.",
      },
      banner: {
        multiCurrency: {
          title: "Multi-Currency Support",
        },
        offline: {
          title: "Offline First",
        },
        icloudBackup: {
          title: "iCloud Auto Backup",
        },
        privacy: {
          title: "Privacy First",
        },
        batchTransactions: {
          title: "Batch Transactions",
        },
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
          answer: "Synx currently supports live market price syncing for the U.S., Taiwan, China, the U.K., cryptocurrencies, and precious metals. You can also manually add assets from other markets. For currencies, most major currencies are supported, with more markets and currencies continuously being added.\n\nYou can also manually track other asset types such as real estate, bank accounts, or valuables like jewelry to get a complete and accurate view of your total net worth.",
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
      playStore: "Get it on Google Play",
      comingSoon: "Android version coming soon",
    },
    footer: {
      contact: "Contact",
      termsOfUse: "Terms of Use",
      privacyPolicy: "Privacy Policy",
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
    guide: {
      introduction: {
        title: "Synx Introduction",
        corePhilosophy: {
          title: "Core Philosophy",
          content: "Coming soon...",
        },
        features: {
          title: "Features Overview",
          content: "Coming soon...",
        },
      },
      userGuide: {
        title: "User Guide",
        interface: {
          title: "Understanding the Interface",
          content: "Coming soon...",
        },
        addAccount: {
          title: "Add Account",
          content: "Coming soon...",
        },
        addTransaction: {
          title: "Add Transaction",
          content: "Coming soon...",
        },
        addPortfolio: {
          title: "Add Portfolio",
          content: "Coming soon...",
        },
        recurring: {
          title: "Recurring Transactions",
          content: "Coming soon...",
        },
        adjustBalance: {
          title: "Adjust Balance",
          content: "Coming soon...",
        },
      },
      advanced: {
        title: "Advanced Guide",
        dividend: {
          title: "Dividends & Stock Splits",
          content: "Coming soon...",
        },
        bulkTransactions: {
          title: "Bulk Add Transactions",
          content: "Coming soon...",
        },
        groups: {
          title: "Group Settings",
          content: "Coming soon...",
        },
        exclude: {
          title: "Exclude from Statistics",
          content: "Coming soon...",
        },
        order: {
          title: "Display Order",
          content: "Coming soon...",
        },
        archive: {
          title: "Delete & Archive",
          content: "Coming soon...",
        },
        dashboard: {
          title: "Stock Dashboard",
          content: "Coming soon...",
        },
      },
      others: {
        title: "Others",
        privacy: {
          title: "Privacy & Security",
          content: "Coming soon...",
        },
        cost: {
          title: "Cost Calculation",
          content: "Coming soon...",
        },
        pricing: {
          title: "Free & Premium",
          content: "Coming soon...",
        },
        dataDelay: {
          title: "Data Delay",
          content: "Coming soon...",
        },
        aboutDeveloper: {
          title: "About Developer",
          content: "Coming soon...",
        },
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
        description: "您的資產與全球主要市場的即時價格完美同步，包括美國、台灣、中國、英國、日本、香港、貴金屬和加密貨幣。您也可以手動新增其他市場的資產。",
      },
      transactions: {
        title: "自訂投資組合",
        description: "透過清晰的績效指標、成長趨勢和資產比例視覺化您的整個投資組合——創建符合您投資風格的自訂視圖。",
      },
      multiCurrency: {
        title: "自動交易管理",
        description: "Synx 針對交易性質提供最適合的處理方式。薪資與房租等固定收支會全自動執行，讓記帳完全隱形；對於定期定額等變動投資，系統則依據市場數據預先填好資料。您只需一鍵確認，就能在省下時間的同時，確保投資成本絕對精準。",
      },
      privacy: {
        title: "隱私至上 始終如一",
        description: "您的資料保存在您的裝置上——永不上傳至任何伺服器。透過 Face ID 保護和一鍵隱私模式，Synx 確保您的投資組合安全，同時讓您控制可見內容。",
      },
      investmentDashboard: {
        title: "投資儀表板",
        description: "個股儀表板讓你快速掌握投資全貌。清楚查看成本、未實現與已實現損益，並透過互動式圖表了解股價、平均成本與市值的變化。用最直觀的方式看懂你的投資表現。",
      },
      banner: {
        multiCurrency: {
          title: "多幣別支援",
        },
        offline: {
          title: "離線優先",
        },
        icloudBackup: {
          title: "iCloud 自動備份",
        },
        privacy: {
          title: "隱私至上",
        },
        batchTransactions: {
          title: "批次新增交易",
        },
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
          answer: "Synx 目前支援 美國、台灣、中國、英國、加密貨幣與貴金屬的市場價格同步，你也可以手動新增其他市場的資產。在幣別方面，支援大多數主流貨幣，未來還會持續新增更多市場與幣別。\n\n此外，你也可以手動追蹤其他資產，例如房地產、銀行帳戶或珠寶等項目，以獲得更完整的淨資產視圖。",
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
      playStore: "在 Google Play 下載",
      comingSoon: "Android 版即將推出",
    },
    footer: {
      contact: "聯絡",
      termsOfUse: "使用條款",
      privacyPolicy: "隱私政策",
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
    guide: {
      introduction: {
        title: "Synx 簡介",
        corePhilosophy: {
          title: "核心理念",
          content: "Synx 是一個全方位的資產管理與淨值追蹤工具 。它的核心價值在於讓您告別繁雜的試算表 。無論您是擁有現金、負債、股票、加密貨幣、貴金屬還是多國貨幣，Synx 能將所有資產、負債與現金流整合在一個介面中,讓您清楚掌握自己的資產配置與財務全貌 。",
        },
        features: {
          title: "功能介紹",
          content: "1. **即時價格同步**：您的投資資產（如台美股、加密貨幣、貴金屬等）會隨全球市場價格自動更新，不再需要手動查詢並輸入每日股價 。\n\n2. **自動化交易管理**：針對固定收支（如薪水、訂閱費）與變動投資（如定期定額 DCA），系統具備自動化追蹤功能，您只需一鍵確認即可，省時並確保成本計算精準 。\n\n3. **視覺化圖表**：提供互動式折線圖，可切換不同時間範圍與資產類別，檢視淨值成長、資產比例與財務方向 。\n\n4. **投資績效分析**：透過儀表板查看個股持有成本、未實現/已實現損益 (P&L) 以及市值趨勢 。",
        },
        insideSynx: {
          title: "開發者的話",
          content: "（內容待補充）",
        },
      },
      userGuide: {
        title: "使用指南",
        interface: {
          title: "認識 Synx 介面",
          content: "所有的核心功能都集中在底部的導航列，由左至右分別為：\n\n#### 1. 投資組合頁面\n\n這是您管理所有投資資產的地方。\n\n- **功能**：查看資產配置圓餅圖、各項投資標的（股票、加密貨幣等）的最新價格與損益表現。\n- **適合情境**：當您想知道「我現在手上持有什麼？」以及「某支股票賺了多少？」時查看。\n\n#### 2. 總覽頁面\n\n這是 Synx 啟動後的預設開啟頁面，你可以在此查看帳戶的餘額以及歷史的淨資產走勢。\n\n- **功能**：顯示您的「總淨值 (Net Worth)」、資產與負債的總額對比，以及淨值走勢圖。\n- **適合情境**：快速掌握整體財務健康度，確認資產是否在成長軌道上。\n\n#### 3. 交易頁面\n\n這是掌管現金流與歷史紀錄的地方。\n\n- **功能**：條列式顯示所有的歷史交易紀錄（包含消費、收入、投資買賣），以及「即將到來」的待處理款項（如信用卡費、定期定額扣款）。\n- **適合情境**：記帳、檢查是否有遺漏的款項，或是回顧上個月花了多少錢。\n\n#### 4. 「+」號按鈕\n\n右下角的藍綠色 + 按鈕是 Synx 最重要的操作入口，它會根據您當下的狀態自動改變功能：\n\n- **剛下載時（無帳戶狀態）**：點擊後直接進入「新增帳戶」流程，幫助您快速建立第一個銀行或投資帳戶。\n\n- **開始使用後（已有帳戶）**：點擊後會展開選單，讓您選擇接下來的動作：\n  1. 新增投資組合：買入新的股票或幣種。\n  2. 新增帳戶：增加新的銀行、信用卡或資產項目。\n  3. 新增交易：紀錄一般的收入或支出（記帳）。",
        },
        addAccount: {
          title: "新增帳戶",
          content: "點擊右下角的「+」按鈕後，您將進入新增帳戶的流程。為了精準計算您的資產，Synx 將帳戶分為三大類型，請依照您的資產性質進行選擇：\n\n#### 1. 選擇帳戶類型\n\n- **資產**：適用於不需要同步市場價格的項目。\n  - 範例：現金、銀行存款、房地產、儲值卡餘額。\n\n- **投資**：適用於價格會隨市場浮動的項目。Synx 會協助您追蹤其即時市值。\n  - 範例：股票、加密貨幣、貴金屬。\n\n- **負債**：適用於負資產，即您需要償還的債務。\n  - 範例：信用貸款、房貸、車貸、信用卡費。\n\n#### 2. 設定帳戶細節\n\n在選擇類型後，請依序填入以下資訊：\n\n- **群組與名稱**：\n  - 您可以自由設定群組（如：生活費、退休金）以便分類管理。\n  - PS. 如果是選擇投資帳戶，帳戶名稱預設會自動帶入標的名稱（例如輸入 TSLA，名稱自動設為 Tesla），省去打字的麻煩。\n  - 注意：群組與名稱在建立後，隨時都可以再修改。\n\n- **初始狀態**：\n  - **初始餘額 (Initial Amount)**：輸入該帳戶目前的金額。\n  - **開始日期 (Start Date)**：設定開始記帳的時間點，這會影響淨資產圖表甚麼時候開始顯示這個帳戶的餘額。\n  - **備註 (Notes)**：紀錄帳號資訊或其他提醒事項。\n\n- 設定完成後，點擊右下角的儲存，您的帳戶就建立完成了！",
        },
        addTransaction: {
          title: "新增交易",
          content: "在 Synx 中，所有的資金變動都必須歸屬於某個「帳戶」。這就是以帳戶為本的核心邏輯：您先建立了帳戶，接著透過「新增交易」來改變該帳戶的餘額。\n\n點擊右下角「+」> 選擇「新增交易」後，系統會先請您選擇要操作哪個帳戶。根據您選擇的帳戶類型，操作流程會有以下不同：\n\n#### 1. 非投資帳戶交易 (一般資產/負債)\n\n若您選擇的是現金、銀行或信用卡等帳戶，您將看到三個操作選項：\n\n**收入 / 支出 (Income / Expense)**：\n- **分類**：選擇對應的消費或收入類別（如：食、衣、住、行、育、樂）。\n- **金額**：輸入交易金額，直接增減該帳戶餘額。\n\n**轉移 (Transfer)**：\n- 將資金從一個帳戶移動到另一個帳戶（例如：從銀行領錢到錢包）。\n- ⚠️ **限制**：轉移功能僅限於「同幣別」帳戶之間。\n- **跨幣別轉帳小撇步**：若需換匯（如台幣轉美金），請手動拆分成兩筆交易：(1) 台幣帳戶新增一筆「支出」、(2) 美金帳戶新增一筆「收入」。\n\n#### 2. 投資帳戶交易 (股票/加密貨幣)\n\n若您選擇的是投資帳戶（如台積電 2330），系統會切換為投資專用介面。除了輸入股數與成本外，也可以設定買賣股票資金來源與去向：\n\n**買入 (Buy)：設定扣款來源**\n- 您需要選擇「來源帳戶 (From)」（例如：您的銀行交割戶）。\n- **邏輯**：系統會自動從「來源帳戶」扣除相應金額，並在「投資帳戶」增加持股。\n\n**賣出 (Sell)：設定入帳去向**\n- 您需要選擇「轉入帳戶 (To)」。\n- **邏輯**：系統會扣除持股，並將賣出所得的金額存入您指定的帳戶中。",
        },
        addPortfolio: {
          title: "新增投資組合",
          content: "您擁有多個帳戶後，「投資組合頁面」能幫助您從不同角度分析資產。Synx 預設提供多種視圖（如：列出所有資產、僅列出「投資資產」，或依市場分類），但您也可以自訂專屬的投資組合。\n\n#### 建立自訂投資組合\n\n若您想將特定的資產歸類在一起（例如：「退休基金」或「美股專區」），請依照以下步驟操作：\n\n1. 點擊「+」並選擇「新增投資組合 (Add Portfolio)」。\n2. 系統會列出您所有的資產（包含投資與非投資帳戶）。勾選您想要加入此組合的帳戶。\n3. 為這個投資組合設定一個名稱。\n\n#### 進階群組管理 (Editing Groups)\n\n建立組合後，下一步會進入「編輯群組」畫面。這是 Synx 強大的分類功能：\n\n- **預設群組**：系統會自動帶入您在新增帳戶時設定的原始群組。\n- **自訂群組**：您可以針對這個特定的投資組合，建立全新的分類邏輯，而不會影響其他頁面。\n- **應用範例**：您可以按照「風險等級」（高/低風險）、「產業類別」（科技/金融），甚至是「大盤 vs 個股」來重新歸類您的資產。\n\n#### 切換視圖\n\n設定完成後，回到投資組合頁面。點擊左上角的選單，即可在預設視圖與您的「自訂投資組合」之間自由切換，從不同維度檢視您的財富。",
        },
        recurring: {
          title: "重複交易 / 定期投資",
          content: "重複交易與定期投資是您處理重複金流的好方法，兩個本質上是一樣的東西，只是一個是非投資帳戶，一個是投資帳戶。您不僅可以設定頻率，還能根據金流性質決定是否要全自動記帳。\n\n#### 1. 設定重複頻率\n\n在新增交易時開啟「重複」選項，您可以靈活設定：\n\n- **頻率**：每年、每季、每月，或每週。\n- **特定日**：例如「每週三」或「每月 5 號」。\n\n#### 2. 自動記錄交易\n\n這是 Synx 管理金流的精髓。您可以自由選擇是否開啟「自動記錄」：\n\n**固定金流（開啟自動記錄）**：\n- **適用對象**：金額固定的項目（如：房租、薪資、固定訂閱費）。\n- **操作**：設定好金額後，開啟「自動記錄」。時間一到，系統會直接完成記帳，完全自動化，您無需操心。\n\n**彈性金流（關閉自動記錄）**：\n- **適用對象**：金額會變動的項目（如：水電費、信用卡帳單）。\n- **操作**：設定重複頻率，但關閉「自動記錄」。時間到時，交易會進入「待處理」清單，提醒您手動填入當期實際金額。\n\n⚠️ **注意**：定期投資（如定期定額買股）因每次成交價格浮動，為了精確計算成本，系統預設不支援自動記錄，一律需經由確認。",
        },
        adjustBalance: {
          title: "調整帳戶餘額",
          content: "有時候，您可能發現 App 內的餘額與實際銀行餘額不一致，但不想手動計算差額來新增一筆修正交易。Synx 提供了一個快速校正的捷徑，適用於非投資帳戶。透過此方式，您可以直接將餘額「校正」到正確數字，無需自己計算並手動新增一筆「支出」或「收入」交易來修正。\n\n#### 操作步驟：\n\n1. **進入帳戶**：從「總覽 (Overview)」頁面打開帳戶列表，點擊您想要調整的特定帳戶。\n2. **檢視資訊**：進入帳戶詳情頁面（顯示該帳戶的交易紀錄與資訊）。\n3. **編輯餘額**：\n   - 點擊右上角的「編輯 (Edit)」按鈕。\n   - 直接修改最上方的「餘額 (Balance)」欄位，填入正確的現有金額。\n4. **自動修正**：按下儲存後，系統會自動計算差額，並新增一筆相對應的**「餘額調整」**交易紀錄。",
        },
      },
      advanced: {
        title: "進階使用指南",
        dividend: {
          title: "紀錄股息與拆股",
          content: "（內容待補充）",
        },
        bulkTransactions: {
          title: "批量新增投資交易",
          content: "（內容待補充）",
        },
        groups: {
          title: "群組設定與顯示",
          content: "（內容待補充）",
        },
        exclude: {
          title: "排除帳戶統計",
          content: "（內容待補充）",
        },
        order: {
          title: "帳戶顯示順序",
          content: "（內容待補充）",
        },
        archive: {
          title: "刪除與封存帳戶",
          content: "（內容待補充）",
        },
        dashboard: {
          title: "個股儀表板",
          content: "（內容待補充）",
        },
      },
      others: {
        title: "其他",
        privacy: {
          title: "隱私安全",
          content: "（內容待補充）",
        },
        cost: {
          title: "成本計算",
          content: "（內容待補充）",
        },
        pricing: {
          title: "免費與付費用戶",
          content: "（內容待補充）",
        },
        dataDelay: {
          title: "資料延遲",
          content: "（內容待補充）",
        },
        aboutDeveloper: {
          title: "關於開發者",
          content: "（內容待補充）",
        },
      },
    },
  },
}
