# Synx 部落格功能使用指南

## 功能概述

Synx 網站現在包含完整的部落格功能，支援：

- ✅ **Markdown 支援**: 使用 `react-markdown` + `remark-gfm` (支援 GFM 表格、刪除線等)
- ✅ **雙語切換**: 英文和中文內容
- ✅ **Frontmatter 元數據**: 標題、日期、描述、標籤、作者
- ✅ **SEO 優化**: 動態 metadata、JSON-LD、OpenGraph、sitemap
- ✅ **標籤分類**: 文章標籤過濾功能
- ✅ **閱讀時間**: 自動計算閱讀時間
- ✅ **響應式設計**: 支援手機、平板、桌面

## 檔案結構

```
synx-web/
├── app/
│   ├── blog/
│   │   ├── page.tsx              # 部落格列表頁
│   │   ├── layout.tsx            # 部落格 SEO metadata
│   │   └── [slug]/
│   │       ├── page.tsx          # 文章詳情頁
│   │       └── metadata.ts       # 動態 metadata 生成
│   ├── api/
│   │   └── blog/
│   │       ├── route.ts          # 獲取所有文章 API
│   │       └── [slug]/
│   │           └── route.ts      # 獲取單篇文章 API
│   └── sitemap.ts                # 自動生成 sitemap
├── lib/
│   └── blog.ts                   # 部落格工具函數
└── public/
    └── blog/
        ├── en/                   # 英文文章
        │   ├── welcome-to-synx-blog.md
        │   └── privacy-first-wealth-tracking.md
        └── zh/                   # 中文文章
            ├── welcome-to-synx-blog.md
            └── privacy-first-wealth-tracking.md
```

## 如何新增文章

### 1. 建立 Markdown 檔案

在 `public/blog/en/` 或 `public/blog/zh/` 目錄下建立新的 `.md` 檔案。

檔名將成為文章的 URL slug，例如：
- `my-new-post.md` → `/blog/my-new-post`

### 2. 編寫 Frontmatter

每篇文章開頭必須包含 YAML frontmatter：

```markdown
---
title: "文章標題"
date: "2026-03-08"
description: "文章摘要描述，會顯示在列表頁和 SEO metadata"
tags: ["標籤1", "標籤2", "標籤3"]
author: "作者名稱"
---

文章內容從這裡開始...
```

**必填欄位說明：**

- `title`: 文章標題
- `date`: 發布日期 (ISO 8601 格式：YYYY-MM-DD)
- `description`: 文章摘要 (用於列表頁和 SEO)
- `tags`: 標籤陣列
- `author`: 作者名稱

### 3. 編寫文章內容

支援完整的 GFM (GitHub Flavored Markdown) 語法：

#### 標題

```markdown
# H1 標題
## H2 標題
### H3 標題
#### H4 標題
```

#### 段落與強調

```markdown
這是一個段落。

**粗體文字**
*斜體文字*
~~刪除線~~
```

#### 列表

```markdown
- 無序列表項目 1
- 無序列表項目 2
  - 子項目

1. 有序列表項目 1
2. 有序列表項目 2
```

#### 連結與圖片

```markdown
[連結文字](https://example.com)

![圖片替代文字](https://example.com/image.png)
```

#### 程式碼

行內程式碼：`code here`

程式碼區塊：

````markdown
```javascript
function hello() {
  console.log("Hello World")
}
```
````

#### 表格

```markdown
| 標題1 | 標題2 | 標題3 |
|-------|-------|-------|
| 內容1 | 內容2 | 內容3 |
| 內容4 | 內容5 | 內容6 |
```

#### 引用

```markdown
> 這是一段引用文字
> 可以跨越多行
```

#### 分隔線

```markdown
---
```

### 4. 雙語文章

如果你的文章需要支援英文和中文，需要建立兩個檔案，檔名必須相同：

```
public/blog/
├── en/
│   └── my-article.md
└── zh/
    └── my-article.md
```

兩個檔案的內容可以不同（翻譯），但 slug 相同。

## 範例文章

參考以下範例文章：

- [welcome-to-synx-blog.md](public/blog/en/welcome-to-synx-blog.md) - 簡單的歡迎文章
- [privacy-first-wealth-tracking.md](public/blog/en/privacy-first-wealth-tracking.md) - 包含表格、列表、標題等完整範例

## SEO 最佳實踐

本部落格系統已按照 2025 SEO 最佳實踐實作：

### 1. Metadata 優化

每篇文章自動生成：
- `<title>` 標籤
- `<meta name="description">`
- OpenGraph 標籤 (Facebook, LinkedIn)
- Twitter Card 標籤
- Canonical URL

### 2. JSON-LD 結構化資料

部落格列表和文章詳情頁可以進一步加入 JSON-LD BlogPosting schema（目前未實作，可選加入）。

### 3. Sitemap

自動生成 sitemap.xml，包含：
- 首頁
- 指南頁
- 部落格列表頁
- 所有部落格文章

存取：`https://synxapp.com/sitemap.xml`

### 4. 語義化 HTML

- 使用 `<article>` 標籤
- 正確的標題層級 (H1 → H2 → H3)
- `<time>` 標籤標記日期

### 5. 效能優化

- 客戶端渲染 (CSR) 用於即時語言切換
- API routes 提供 JSON 資料
- 可升級為 SSG (Static Site Generation) 以獲得更好的 SEO

## 建議升級為 SSG (可選)

目前部落格使用 Client-Side Rendering，如果你想要更好的 SEO 表現，可以將 `app/blog/page.tsx` 和 `app/blog/[slug]/page.tsx` 改為 SSG：

### 升級步驟：

1. 在 `app/blog/page.tsx` 中移除 `"use client"`，改為 server component
2. 在 `app/blog/[slug]/page.tsx` 中加入 `generateStaticParams()` 和 `generateMetadata()`
3. 預渲染所有部落格頁面為靜態 HTML

這樣可以獲得：
- 更快的首次載入速度
- 更好的 SEO
- 更低的伺服器負載

## 開發工作流程

1. **建立新文章**：在 `public/blog/en/` 和 `public/blog/zh/` 新增 `.md` 檔案
2. **本地預覽**：執行 `npm run dev`，打開 http://localhost:3000/blog
3. **檢查文章**：確認 frontmatter 正確、內容格式正常
4. **部署**：執行 `npm run build && npm start` 或部署到 Vercel

## 常見問題

### Q: 如何隱藏某篇文章？

將該文章的 `.md` 檔案移出 `public/blog/` 目錄即可。

### Q: 如何改變文章順序？

文章按照 `date` 欄位的日期倒序排列（最新的在前）。修改日期即可改變順序。

### Q: 支援草稿功能嗎？

目前不支援。建議將草稿存放在其他目錄（如 `drafts/`），完成後再移動到 `public/blog/`。

### Q: 可以加入圖片嗎？

可以！將圖片放在 `public/blog/images/` 目錄，然後在文章中使用相對路徑：

```markdown
![描述](/blog/images/my-image.png)
```

### Q: 如何加入更多樣式？

編輯 `app/blog/[slug]/page.tsx` 中 ReactMarkdown 的 `components` prop，自訂各個 HTML 元素的樣式。

## 技術細節

### 套件使用

- `gray-matter`: 解析 Markdown frontmatter
- `react-markdown`: 渲染 Markdown 為 React 元件
- `remark-gfm`: 支援 GitHub Flavored Markdown

### API Routes

- `GET /api/blog?language=en|zh`: 獲取所有文章列表
- `GET /api/blog/[slug]?language=en|zh`: 獲取單篇文章內容

### 工具函數 (lib/blog.ts)

- `getAllPosts(language)`: 獲取所有文章
- `getPostBySlug(slug, language)`: 獲取單篇文章
- `getAllTags(language)`: 獲取所有標籤
- `getAllSlugs()`: 獲取所有 slug（用於 sitemap）

---

**祝你寫作愉快！** 如有問題，請參考現有範例文章或查閱 Next.js 和 react-markdown 官方文檔。
