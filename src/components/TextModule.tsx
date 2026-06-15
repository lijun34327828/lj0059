import { cn } from '@/lib/utils'
import type { TextContent } from '@/shared/types'

interface TextModuleProps {
  content: TextContent
  fontSize: number
  textColor: string
  isSelected: boolean
  onClick: () => void
}

export default function TextModule({ content, fontSize, textColor, isSelected, onClick }: TextModuleProps) {
  return (
    <div
      className={cn(
        'h-full w-full cursor-pointer p-3 overflow-hidden',
        isSelected && 'ring-2 ring-dashed'
      )}
      style={{ color: textColor, fontSize }}
      onClick={onClick}
    >
      <h3
        className="mb-2 font-bold leading-tight"
        style={{ fontFamily: '"ZCOOL XiaoWei", serif', fontSize: fontSize * 1.4 }}
      >
        {content.title}
      </h3>
      <p className="whitespace-pre-wrap leading-relaxed overflow-hidden" style={{ fontSize: fontSize * 0.9 }}>
        {content.body}
      </p>
    </div>
  )
}
