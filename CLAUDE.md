# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Synx is a marketing website for a wealth tracking application. It's a bilingual (English/Chinese) Next.js landing page showcasing the Synx app's features, privacy commitments, and download options.

## Development Commands

```bash
# Install dependencies (use npm, not pnpm despite pnpm-lock.yaml presence)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint the codebase
npm run lint
```

## Architecture

### Core Structure

This is a Next.js 15 App Router project with a single-page marketing site architecture:

- **App Router**: Uses Next.js App Router (`/app` directory)
- **Single Page Application**: Main page at `app/page.tsx` composing section components
- **Client-Side State**: Language selection managed in client component with `useState`

### Component Organization

```
components/
├── ui/           # shadcn/ui components (Radix UI primitives)
├── header.tsx    # Navigation with language switcher
├── hero-section.tsx
├── features-section.tsx
├── privacy-section.tsx
├── download-section.tsx
└── footer.tsx
```

All page sections receive a `language` prop and use translations from `lib/translations.ts`.

### Internationalization Pattern

Language support is implemented through:
1. State in root page component (`app/page.tsx`)
2. Centralized translations object in `lib/translations.ts` with `en` and `zh` keys
3. Props drilling to all sections

**Important**: The type definition in some components includes `"ja"` (Japanese) but translations only exist for `"en"` and `"zh"`. The actual language type should be `"en" | "zh"`.

### Styling

- **Tailwind CSS 4.x**: Using the new `@tailwindcss/postcss` plugin
- **shadcn/ui**: New York style variant with neutral base color
- **CSS Variables**: Theme customization via CSS custom properties
- **Path Aliases**: `@/*` resolves to project root

### Build Configuration

The `next.config.mjs` has two important settings:
- `typescript.ignoreBuildErrors: true` - TypeScript errors won't block builds
- `images.unoptimized: true` - Image optimization is disabled

## Key Files

- [lib/translations.ts](lib/translations.ts) - All UI text for English and Chinese
- [components.json](components.json) - shadcn/ui configuration
- [app/globals.css](app/globals.css) - Global styles and CSS variables

## Component Dependencies

- UI components use Radix UI primitives via shadcn/ui
- Charts use Recharts (`animated-chart.tsx`)
- Forms use React Hook Form + Zod (via shadcn/ui components)
- Icons from Lucide React

## Development Notes

- This project uses App Router, not Pages Router
- All section components are client components (`"use client"`)
- Language switching doesn't persist (no localStorage/cookies)
- TypeScript strict mode enabled but build errors are ignored
