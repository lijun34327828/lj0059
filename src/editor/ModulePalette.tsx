import { Type, Bug, CalendarDays } from 'lucide-react'
import { useEditorStore } from '@/shared/store'
import { themes } from '@/shared/themes'
import type { ModuleType } from '@/shared/types'

const moduleItems: { type: ModuleType; label: string; icon: React.ElementType; desc: string }[] = [
  { type: 'text', label: '科普文字', icon: Type, desc: '标题与正文' },
  { type: 'specimen', label: '昆虫标本', icon: Bug, desc: '标本卡片' },
  { type: 'schedule', label: '活动时间表', icon: CalendarDays, desc: '活动安排' },
]

export default function ModulePalette() {
  const themeId = useEditorStore((s) => s.themeId)
  const theme = themes[themeId]

  const handleDragStart = (e: React.DragEvent, type: ModuleType) => {
    e.dataTransfer.setData('moduleType', type)
    e.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <div
      className="flex flex-col gap-2 p-3 w-[180px] min-w-[180px] overflow-y-auto"
      style={{ backgroundColor: '#fff', borderRight: `1px solid ${theme.primaryColor}15` }}
    >
      <h3
        className="text-[10px] font-bold uppercase tracking-widest mb-1 px-1"
        style={{ color: theme.primaryColor }}
      >
        模块组件
      </h3>
      {moduleItems.map(({ type, label, icon: Icon, desc }) => (
        <div
          key={type}
          draggable
          onDragStart={(e) => handleDragStart(e, type)}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-grab active:cursor-grabbing select-none transition-all duration-150"
          style={{
            backgroundColor: `${theme.primaryColor}08`,
            border: `1px solid ${theme.primaryColor}20`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${theme.primaryColor}15`
            e.currentTarget.style.borderColor = `${theme.primaryColor}40`
            e.currentTarget.style.boxShadow = `0 2px 8px ${theme.primaryColor}15`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = `${theme.primaryColor}08`
            e.currentTarget.style.borderColor = `${theme.primaryColor}20`
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
            style={{ backgroundColor: `${theme.primaryColor}18`, color: theme.primaryColor }}
          >
            <Icon size={16} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold leading-tight" style={{ color: theme.textColor }}>
              {label}
            </span>
            <span className="text-[10px] leading-tight" style={{ color: theme.textColor + '80' }}>
              {desc}
            </span>
          </div>
        </div>
      ))}

      <div className="mt-auto pt-4 px-1">
        <p className="text-[10px] leading-relaxed" style={{ color: theme.textColor + '50' }}>
          拖拽模块到画布上，点击模块可编辑内容
        </p>
      </div>
    </div>
  )
}
