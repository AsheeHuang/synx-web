import { PortableText, type PortableTextComponents } from "@portabletext/react"

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 leading-[1.8] text-foreground font-serif">{children}</p>
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
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-6 space-y-2 list-disc text-foreground font-serif">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 ml-6 space-y-2 list-decimal text-foreground font-serif">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono text-foreground">{children}</code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value.asset?.url ?? value.url}
          alt={value.alt ?? ""}
          className="w-full rounded-lg shadow-sm"
          loading="lazy"
        />
        {value.caption && (
          <figcaption className="text-center text-sm text-muted-foreground mt-2">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    codeBlock: ({ value }) => (
      <pre className="bg-[#1e1e2e] text-[#cdd6f4] p-6 rounded-lg overflow-x-auto my-8 text-sm leading-relaxed font-mono">
        {value.language && (
          <div className="text-xs text-[#6c7086] mb-3 uppercase tracking-wider">{value.language}</div>
        )}
        <code>{value.code}</code>
      </pre>
    ),
	table: ({ value }) => (
	  <div className="overflow-x-auto my-8">
		<table className="min-w-full border-collapse text-sm">
		  <tbody>
			{value.rows?.map((row: any, ri: number) => (
			  <tr
				key={row._key ?? ri}
				className={row.isHeader ? "bg-secondary font-semibold" : "border-t border-border"}
			  >
				{row.cells?.map((cell: any, ci: number) => {
				  const Tag = row.isHeader ? "th" : "td"
				  return (
					<Tag
					  key={cell._key ?? ci}
					  className="px-4 py-2 text-left border border-border text-foreground"
					>
					  {cell.text}
					</Tag>
				  )
				})}
			  </tr>
			))}
		  </tbody>
		</table>
	  </div>
	),
  },
}

interface PortableTextRendererProps {
  content: any[]
}

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  if (!content || content.length === 0) return null
  return (
    <div className="prose-custom">
      <PortableText value={content} components={components} />
    </div>
  )
}
