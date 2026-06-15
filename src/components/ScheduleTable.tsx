import { cn } from '@/lib/utils'
import type { ScheduleContent } from '@/shared/types'

interface ScheduleTableProps {
  content: ScheduleContent
  fontSize: number
  primaryColor: string
  textColor: string
  isSelected: boolean
  onClick: () => void
}

export default function ScheduleTable({ content, fontSize, primaryColor, textColor, isSelected, onClick }: ScheduleTableProps) {
  return (
    <div
      className={cn(
        'h-full w-full cursor-pointer overflow-hidden rounded',
        isSelected && 'ring-2 ring-dashed'
      )}
      style={{ fontSize, color: textColor }}
      onClick={onClick}
    >
      <table className="w-full border-collapse text-left">
        <thead>
          <tr style={{ backgroundColor: primaryColor }}>
            <th className="px-3 py-1.5 font-semibold text-white" style={{ fontSize: fontSize * 0.85 }}>时间</th>
            <th className="px-3 py-1.5 font-semibold text-white" style={{ fontSize: fontSize * 0.85 }}>活动</th>
            <th className="px-3 py-1.5 font-semibold text-white" style={{ fontSize: fontSize * 0.85 }}>地点</th>
          </tr>
        </thead>
        <tbody>
          {content.rows.map((row, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? `${primaryColor}08` : 'transparent',
                fontSize,
              }}
            >
              <td className="whitespace-nowrap px-3 py-1.5" style={{ fontSize: fontSize * 0.85 }}>{row.time}</td>
              <td className="px-3 py-1.5" style={{ fontSize: fontSize * 0.85 }}>{row.activity}</td>
              <td className="px-3 py-1.5" style={{ fontSize: fontSize * 0.85 }}>{row.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
