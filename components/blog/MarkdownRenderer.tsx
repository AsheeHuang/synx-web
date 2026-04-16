import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Components } from "react-markdown"

const components: Components = {
  p: ({ children }) => (
    <p className="mb-6 leading-[1.8] text-foreground font-serif">{children}</p>
  ),
  h1: ({ children }) => (
    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-5 leading-tight">{children}</h2>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-5 leading-tight">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-10 mb-4 leading-tight">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-semibold text-foreground mt-8 mb-3">{children}</h4>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-muted-foreground text-lg leading-relaxed">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 ml-6 space-y-2 list-disc text-foreground font-serif">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 ml-6 space-y-2 list-decimal text-foreground font-serif">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children, className }) => {
    const isBlock = !!className
    if (isBlock) {
      return (
        <code className="block bg-[#1e1e2e] text-[#cdd6f4] p-6 rounded-lg overflow-x-auto text-sm leading-relaxed font-mono">
          {children}
        </code>
      )
    }
    return (
      <code className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
        {children}
      </code>
    )
  },
  pre: ({ children }) => (
    <pre className="bg-[#1e1e2e] my-8 rounded-lg overflow-x-auto">{children}</pre>
  ),
  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http")
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
      >
        {children}
      </a>
    )
  },
  img: ({ src, alt }) => (
    <figure className="my-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? ""}
        className="w-full rounded-lg shadow-sm"
        loading="lazy"
      />
    </figure>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 text-left border border-border text-foreground bg-secondary font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 text-left border border-border text-foreground">{children}</td>
  ),
  hr: () => <hr className="my-10 border-border" />,
}

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null
  return (
    <div className="prose-custom">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </Markdown>
    </div>
  )
}
