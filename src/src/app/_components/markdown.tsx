"use client"

import { Mermaid } from "@/app/_components/mermaid"
import { cn } from "@/lib/utils"

import ReactMarkdown from "react-markdown"

export const Markdown = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      components={{
        // eslint-disable-next-line  unused-imports/no-unused-vars
        pre: ({ node, ...props }) => <pre {...props} className={cn(props.className, "w-full")} />,
        // eslint-disable-next-line  unused-imports/no-unused-vars
        code: ({ node, children, className }) => {
          if (className === "language-mermaid") {
            return <Mermaid code={children as string} />
          } else {
            // ここでSyntaxHighlighterなど
            return <></>
          }
        },
      }}
      >
      {content}
    </ReactMarkdown>
  )
}