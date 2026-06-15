import { cn } from '@/lib/utils'
import type { SpecimenContent } from '@/shared/types'

interface SpecimenCardProps {
  content: SpecimenContent
  fontSize: number
  primaryColor: string
  textColor: string
  isSelected: boolean
  onClick: () => void
}

export default function SpecimenCard({ content, fontSize, primaryColor, textColor, isSelected, onClick }: SpecimenCardProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-lg',
        isSelected && 'ring-2 ring-dashed'
      )}
      style={{ fontSize, color: textColor, border: `2px solid ${primaryColor}`, backgroundColor: '#fff' }}
      onClick={onClick}
    >
      <div
        className="flex-shrink-0 overflow-hidden"
        style={{ borderBottom: `1px solid ${primaryColor}40` }}
      >
        <img
          src={content.image}
          alt={content.name}
          className="h-full w-full object-cover"
          style={{ maxHeight: '55%' }}
        />
      </div>
      <div className="flex flex-1 flex-col p-2.5">
        <h4 className="font-bold leading-tight" style={{ fontFamily: '"ZCOOL XiaoWei", serif', fontSize: fontSize * 1.2 }}>
          {content.name}
        </h4>
        <p className="italic opacity-60" style={{ fontSize: fontSize * 0.8 }}>
          {content.latinName}
        </p>
        <p className="mt-1 line-clamp-3 leading-snug" style={{ fontSize: fontSize * 0.75, color: textColor + 'bb' }}>
          {content.description}
        </p>
      </div>
    </div>
  )
}
