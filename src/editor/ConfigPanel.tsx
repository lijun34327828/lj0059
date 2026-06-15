import { Trash2, Palette, Type, Sparkles, LayoutGrid } from 'lucide-react'
import { useEditorStore } from '@/shared/store'
import { themes } from '@/shared/themes'
import type { ThemeId, TextContent, SpecimenContent, ScheduleContent } from '@/shared/types'

const themeOptions: { id: ThemeId; label: string; emoji: string }[] = [
  { id: 'spring', label: '春日', emoji: '🌸' },
  { id: 'autumn', label: '秋日', emoji: '🍂' },
]

const decorationOptions: { value: 'petals' | 'leaves'; label: string; emoji: string }[] = [
  { value: 'petals', label: '花瓣', emoji: '🌸' },
  { value: 'leaves', label: '枫叶', emoji: '🍁' },
]

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-6 h-6 rounded-md overflow-hidden shrink-0" style={{ border: '1px solid #e0e0e0' }}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
        />
        <div className="w-full h-full" style={{ backgroundColor: value }} />
      </div>
      <span className="text-[10px] font-medium min-w-[40px]" style={{ color: '#666' }}>{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-1.5 py-0.5 text-[10px] font-mono border rounded focus:outline-none focus:ring-1"
        style={{ borderColor: '#e0e0e0', width: 0 }}
      />
    </div>
  )
}

function SectionHeader({ icon: Icon, title, color }: { icon: React.ElementType; title: string; color: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon size={12} style={{ color }} />
      <h3 className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>
        {title}
      </h3>
    </div>
  )
}

export default function ConfigPanel() {
  const themeId = useEditorStore((s) => s.themeId)
  const fontSize = useEditorStore((s) => s.fontSize)
  const decorationOpacity = useEditorStore((s) => s.decorationOpacity)
  const selectedModuleId = useEditorStore((s) => s.selectedModuleId)
  const modules = useEditorStore((s) => s.modules)
  const setTheme = useEditorStore((s) => s.setTheme)
  const setFontSize = useEditorStore((s) => s.setFontSize)
  const setDecorationOpacity = useEditorStore((s) => s.setDecorationOpacity)
  const updateModule = useEditorStore((s) => s.updateModule)
  const removeModule = useEditorStore((s) => s.removeModule)
  const setSelectedModule = useEditorStore((s) => s.setSelectedModule)

  const theme = themes[themeId]
  const selectedModule = modules.find((m) => m.id === selectedModuleId) ?? null

  const handleContentChange = (field: string, value: string) => {
    if (!selectedModule) return
    updateModule(selectedModule.id, {
      content: { ...selectedModule.content, [field]: value },
    })
  }

  const handleScheduleRowChange = (index: number, field: string, value: string) => {
    if (!selectedModule || selectedModule.type !== 'schedule') return
    const content = selectedModule.content as ScheduleContent
    const newRows = content.rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    )
    updateModule(selectedModule.id, { content: { rows: newRows } })
  }

  const addScheduleRow = () => {
    if (!selectedModule || selectedModule.type !== 'schedule') return
    const content = selectedModule.content as ScheduleContent
    updateModule(selectedModule.id, {
      content: { rows: [...content.rows, { time: '', activity: '', location: '' }] },
    })
  }

  const removeScheduleRow = (index: number) => {
    if (!selectedModule || selectedModule.type !== 'schedule') return
    const content = selectedModule.content as ScheduleContent
    updateModule(selectedModule.id, {
      content: { rows: content.rows.filter((_, i) => i !== index) },
    })
  }

  const inputStyle = {
    borderColor: `${theme.primaryColor}30`,
    borderRadius: '8px',
  }

  return (
    <div
      className="flex flex-col gap-4 p-4 w-[280px] min-w-[280px] overflow-y-auto"
      style={{ backgroundColor: '#fff', borderLeft: `1px solid ${theme.primaryColor}15` }}
    >
      <SectionHeader icon={LayoutGrid} title="主题风格" color={theme.primaryColor} />
      <div className="flex gap-2">
        {themeOptions.map((opt) => {
          const isActive = themeId === opt.id
          const optTheme = themes[opt.id]
          return (
            <button
              key={opt.id}
              onClick={() => setTheme(opt.id)}
              className="flex-1 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                backgroundColor: isActive ? optTheme.primaryColor : `${optTheme.primaryColor}08`,
                color: isActive ? '#fff' : optTheme.primaryColor,
                border: `1.5px solid ${optTheme.primaryColor}${isActive ? '' : '30'}`,
                boxShadow: isActive ? `0 2px 8px ${optTheme.primaryColor}30` : 'none',
              }}
            >
              {opt.emoji} {opt.label}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-medium" style={{ color: '#888' }}>装饰纹样</label>
        <div className="flex gap-2">
          {decorationOptions.map((opt) => {
            const isActive = theme.decorationPattern === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => {
                  const targetTheme = Object.values(themes).find(t => t.decorationPattern === opt.value)
                  if (targetTheme) {
                    setTheme(targetTheme.id)
                  }
                }}
                className="flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                style={{
                  backgroundColor: isActive ? theme.primaryColor : `${theme.primaryColor}08`,
                  color: isActive ? '#fff' : theme.primaryColor,
                  border: `1.5px solid ${theme.primaryColor}${isActive ? '' : '25'}`,
                }}
              >
                {opt.emoji} {opt.label}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${theme.primaryColor}10` }} />

      <SectionHeader icon={Palette} title="主题配色" color={theme.primaryColor} />
      <div className="flex flex-col gap-2">
        <ColorField label="主色" value={theme.primaryColor} onChange={() => {}} />
        <ColorField label="辅色" value={theme.secondaryColor} onChange={() => {}} />
        <ColorField label="强调" value={theme.accentColor} onChange={() => {}} />
        <ColorField label="背景" value={theme.bgColor} onChange={() => {}} />
        <ColorField label="文字" value={theme.textColor} onChange={() => {}} />
      </div>

      <div style={{ borderTop: `1px solid ${theme.primaryColor}10` }} />

      <SectionHeader icon={Type} title="字体大小" color={theme.primaryColor} />
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={12}
          max={24}
          step={1}
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="flex-1"
          style={{ accentColor: theme.primaryColor }}
        />
        <span className="text-[10px] font-mono min-w-[32px] text-right" style={{ color: '#888' }}>
          {fontSize}px
        </span>
      </div>

      <SectionHeader icon={Sparkles} title="装饰透明度" color={theme.primaryColor} />
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={decorationOpacity}
          onChange={(e) => setDecorationOpacity(Number(e.target.value))}
          className="flex-1"
          style={{ accentColor: theme.primaryColor }}
        />
        <span className="text-[10px] font-mono min-w-[28px] text-right" style={{ color: '#888' }}>
          {decorationOpacity.toFixed(2)}
        </span>
      </div>

      <div style={{ borderTop: `1px solid ${theme.primaryColor}10` }} />

      {selectedModule && (
        <div className="flex flex-col gap-3">
          <SectionHeader icon={LayoutGrid} title="编辑模块" color={theme.primaryColor} />

          <div className="flex gap-2 text-[10px]" style={{ color: '#888' }}>
            <span className="px-1.5 py-0.5 rounded" style={{ backgroundColor: `${theme.primaryColor}10` }}>
              {selectedModule.type === 'text' ? '科普文字' : selectedModule.type === 'specimen' ? '昆虫标本' : '活动时间表'}
            </span>
            <span>
              {Math.round(selectedModule.width)}×{Math.round(selectedModule.height)}
            </span>
          </div>

          {selectedModule.type === 'text' && (() => {
            const content = selectedModule.content as TextContent
            return (
              <>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-medium" style={{ color: '#888' }}>标题</label>
                  <textarea
                    value={content.title}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border resize-none focus:outline-none focus:ring-1"
                    style={inputStyle}
                    rows={1}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-medium" style={{ color: '#888' }}>正文</label>
                  <textarea
                    value={content.body}
                    onChange={(e) => handleContentChange('body', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border resize-none focus:outline-none focus:ring-1"
                    style={inputStyle}
                    rows={4}
                  />
                </div>
              </>
            )
          })()}

          {selectedModule.type === 'specimen' && (() => {
            const content = selectedModule.content as SpecimenContent
            return (
              <>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-medium" style={{ color: '#888' }}>名称</label>
                  <input
                    value={content.name}
                    onChange={(e) => handleContentChange('name', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border focus:outline-none focus:ring-1"
                    style={inputStyle}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-medium" style={{ color: '#888' }}>拉丁名</label>
                  <input
                    value={content.latinName}
                    onChange={(e) => handleContentChange('latinName', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border italic focus:outline-none focus:ring-1"
                    style={inputStyle}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-medium" style={{ color: '#888' }}>简介</label>
                  <textarea
                    value={content.description}
                    onChange={(e) => handleContentChange('description', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border resize-none focus:outline-none focus:ring-1"
                    style={inputStyle}
                    rows={3}
                  />
                </div>
              </>
            )
          })()}

          {selectedModule.type === 'schedule' && (() => {
            const content = selectedModule.content as ScheduleContent
            return (
              <div className="flex flex-col gap-2">
                {content.rows.map((row, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 p-2 rounded-lg border"
                    style={{ borderColor: `${theme.primaryColor}20`, backgroundColor: `${theme.primaryColor}05` }}
                  >
                    <div className="flex gap-1 items-center">
                      <input
                        value={row.time}
                        onChange={(e) => handleScheduleRowChange(i, 'time', e.target.value)}
                        placeholder="时间"
                        className="flex-1 px-1.5 py-1 text-[10px] border focus:outline-none focus:ring-1"
                        style={{ ...inputStyle, borderColor: `${theme.primaryColor}20` }}
                      />
                      <button
                        onClick={() => removeScheduleRow(i)}
                        className="w-5 h-5 flex items-center justify-center rounded-full transition-colors"
                        style={{ color: theme.textColor + '50' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444' }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = theme.textColor + '50' }}
                      >
                        ×
                      </button>
                    </div>
                    <input
                      value={row.activity}
                      onChange={(e) => handleScheduleRowChange(i, 'activity', e.target.value)}
                      placeholder="活动"
                      className="w-full px-1.5 py-1 text-[10px] border focus:outline-none focus:ring-1"
                      style={{ ...inputStyle, borderColor: `${theme.primaryColor}20` }}
                    />
                    <input
                      value={row.location}
                      onChange={(e) => handleScheduleRowChange(i, 'location', e.target.value)}
                      placeholder="地点"
                      className="w-full px-1.5 py-1 text-[10px] border focus:outline-none focus:ring-1"
                      style={{ ...inputStyle, borderColor: `${theme.primaryColor}20` }}
                    />
                  </div>
                ))}
                <button
                  onClick={addScheduleRow}
                  className="w-full py-1.5 text-[10px] font-medium rounded-lg border border-dashed transition-colors"
                  style={{ borderColor: `${theme.primaryColor}40`, color: theme.primaryColor }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${theme.primaryColor}10` }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  + 添加行
                </button>
              </div>
            )
          })()}

          <button
            onClick={() => {
              removeModule(selectedModule.id)
              setSelectedModule(null)
            }}
            className="flex items-center justify-center gap-1.5 w-full px-3 py-2 mt-1 text-xs font-medium rounded-lg transition-colors"
            style={{
              color: '#ef4444',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fee2e2' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fef2f2' }}
          >
            <Trash2 size={12} />
            删除模块
          </button>
        </div>
      )}

      {!selectedModule && (
        <p className="text-[10px] text-center py-4" style={{ color: theme.textColor + '40' }}>
          点击画布上的模块进行编辑
        </p>
      )}
    </div>
  )
}
