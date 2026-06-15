import { useEditorStore } from '@/shared/store'
import { themes } from '@/shared/themes'
import type { ThemeId } from '@/shared/types'
import ModulePalette from './ModulePalette'
import CanvasArea from './CanvasArea'
import ConfigPanel from './ConfigPanel'

const themeOptions: { id: ThemeId; label: string; emoji: string }[] = [
  { id: 'spring', label: '春日', emoji: '🌸' },
  { id: 'autumn', label: '秋日', emoji: '🍂' },
]

export default function EditorPage() {
  const themeId = useEditorStore((s) => s.themeId)
  const setTheme = useEditorStore((s) => s.setTheme)
  const theme = themes[themeId]

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: '#fafafa' }}>
      <header
        className="flex items-center justify-between px-5 h-12 shrink-0"
        style={{
          backgroundColor: '#fff',
          borderBottom: `2px solid ${theme.primaryColor}20`,
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-2 h-6 rounded-full"
            style={{ backgroundColor: theme.primaryColor }}
          />
          <h1
            className="text-sm font-bold tracking-wide"
            style={{ fontFamily: '"ZCOOL XiaoWei", serif', color: theme.textColor, fontSize: 18 }}
          >
            科普展板编辑器
          </h1>
        </div>
        <div className="flex gap-2">
          {themeOptions.map((opt) => {
            const isActive = themeId === opt.id
            const optTheme = themes[opt.id]
            return (
              <button
                key={opt.id}
                onClick={() => setTheme(opt.id)}
                className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                style={{
                  backgroundColor: isActive ? optTheme.primaryColor : 'transparent',
                  color: isActive ? '#fff' : optTheme.primaryColor,
                  border: `1.5px solid ${optTheme.primaryColor}`,
                  boxShadow: isActive ? `0 2px 8px ${optTheme.primaryColor}40` : 'none',
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {opt.emoji} {opt.label}
              </button>
            )
          })}
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <ModulePalette />
        <CanvasArea />
        <ConfigPanel />
      </div>
    </div>
  )
}
