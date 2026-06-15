import { useRef, useState, useCallback, useEffect } from 'react'
import { useEditorStore } from '@/shared/store'
import { themes } from '@/shared/themes'
import { BOARD_WIDTH, BOARD_HEIGHT } from '@/shared/types'
import type { ModuleType, BoardModule, TextContent, SpecimenContent, ScheduleContent } from '@/shared/types'
import Decoration from '@/components/Decoration'
import TextModule from '@/components/TextModule'
import SpecimenCard from '@/components/SpecimenCard'
import ScheduleTable from '@/components/ScheduleTable'

const MIN_MODULE_W = 80
const MIN_MODULE_H = 60

function createDefaultContent(type: ModuleType) {
  if (type === 'text') return { title: '标题文字', body: '在此输入科普内容...' }
  if (type === 'specimen') return {
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=insect%20specimen%20illustration%20on%20white%20background&image_size=square',
    name: '标本名称',
    latinName: 'Latin name',
    description: '标本简介...',
  }
  return { rows: [{ time: '09:00', activity: '活动名称', location: '地点' }] }
}

function getDefaultSize(type: ModuleType) {
  if (type === 'text') return { width: 480, height: 160 }
  if (type === 'specimen') return { width: 220, height: 280 }
  return { width: 480, height: 200 }
}

type ResizeHandle = 'nw' | 'ne' | 'sw' | 'se'

interface DragInfo {
  moduleId: string
  startMouseX: number
  startMouseY: number
  startModuleX: number
  startModuleY: number
}

interface ResizeInfo {
  moduleId: string
  handle: ResizeHandle
  startMouseX: number
  startMouseY: number
  startX: number
  startY: number
  startW: number
  startH: number
}

function ModuleRender({ module, fontSize, theme }: {
  module: BoardModule
  fontSize: number
  theme: { primaryColor: string; textColor: string }
}) {
  if (module.type === 'text') {
    return <TextModule content={module.content as TextContent} fontSize={fontSize} textColor={theme.textColor} isSelected={false} onClick={() => {}} />
  }
  if (module.type === 'specimen') {
    return <SpecimenCard content={module.content as SpecimenContent} fontSize={fontSize} primaryColor={theme.primaryColor} textColor={theme.textColor} isSelected={false} onClick={() => {}} />
  }
  return <ScheduleTable content={module.content as ScheduleContent} fontSize={fontSize} primaryColor={theme.primaryColor} textColor={theme.textColor} isSelected={false} onClick={() => {}} />
}

const handleCursors: Record<ResizeHandle, string> = {
  nw: 'nw-resize',
  ne: 'ne-resize',
  sw: 'sw-resize',
  se: 'se-resize',
}

export default function CanvasArea() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [dragInfo, setDragInfo] = useState<DragInfo | null>(null)
  const [resizeInfo, setResizeInfo] = useState<ResizeInfo | null>(null)
  const [dragOverActive, setDragOverActive] = useState(false)

  const modules = useEditorStore((s) => s.modules)
  const themeId = useEditorStore((s) => s.themeId)
  const fontSize = useEditorStore((s) => s.fontSize)
  const decorationOpacity = useEditorStore((s) => s.decorationOpacity)
  const selectedModuleId = useEditorStore((s) => s.selectedModuleId)
  const addModule = useEditorStore((s) => s.addModule)
  const updateModulePosition = useEditorStore((s) => s.updateModulePosition)
  const updateModuleSize = useEditorStore((s) => s.updateModuleSize)
  const setSelectedModule = useEditorStore((s) => s.setSelectedModule)

  const theme = themes[themeId]

  const computeScale = useCallback(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const padding = 64
    const sx = (rect.width - padding) / BOARD_WIDTH
    const sy = (rect.height - padding) / BOARD_HEIGHT
    setScale(Math.min(sx, sy, 1))
  }, [])

  useEffect(() => {
    computeScale()
    const observer = new ResizeObserver(computeScale)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [computeScale])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    setDragOverActive(true)
  }

  const handleDragLeave = () => {
    setDragOverActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOverActive(false)
    const moduleType = e.dataTransfer.getData('moduleType') as ModuleType
    if (!moduleType) return

    const boardEl = (e.currentTarget as HTMLElement).querySelector('[data-board]') as HTMLElement
    if (!boardEl) return

    const boardRect = boardEl.getBoundingClientRect()
    const x = (e.clientX - boardRect.left) / scale
    const y = (e.clientY - boardRect.top) / scale
    const size = getDefaultSize(moduleType)

    const newModule: BoardModule = {
      id: `${moduleType}-${Date.now()}`,
      type: moduleType,
      x: Math.max(0, Math.min(x - size.width / 2, BOARD_WIDTH - size.width)),
      y: Math.max(0, Math.min(y - size.height / 2, BOARD_HEIGHT - size.height)),
      ...size,
      content: createDefaultContent(moduleType),
    }
    addModule(newModule)
    setSelectedModule(newModule.id)
  }

  const handleModuleMouseDown = (e: React.MouseEvent, moduleId: string) => {
    if (resizeInfo) return
    e.stopPropagation()
    const mod = modules.find((m) => m.id === moduleId)
    if (!mod) return
    setSelectedModule(moduleId)
    setDragInfo({
      moduleId,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startModuleX: mod.x,
      startModuleY: mod.y,
    })
  }

  const handleResizeMouseDown = (e: React.MouseEvent, moduleId: string, handle: ResizeHandle) => {
    e.stopPropagation()
    e.preventDefault()
    const mod = modules.find((m) => m.id === moduleId)
    if (!mod) return
    setResizeInfo({
      moduleId,
      handle,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startX: mod.x,
      startY: mod.y,
      startW: mod.width,
      startH: mod.height,
    })
  }

  useEffect(() => {
    if (!dragInfo && !resizeInfo) return

    const handleMouseMove = (e: MouseEvent) => {
      if (dragInfo) {
        const dx = (e.clientX - dragInfo.startMouseX) / scale
        const dy = (e.clientY - dragInfo.startMouseY) / scale
        const mod = modules.find((m) => m.id === dragInfo.moduleId)
        if (!mod) return
        const newX = Math.max(0, Math.min(dragInfo.startModuleX + dx, BOARD_WIDTH - mod.width))
        const newY = Math.max(0, Math.min(dragInfo.startModuleY + dy, BOARD_HEIGHT - mod.height))
        updateModulePosition(dragInfo.moduleId, newX, newY)
      }

      if (resizeInfo) {
        const dx = (e.clientX - resizeInfo.startMouseX) / scale
        const dy = (e.clientY - resizeInfo.startMouseY) / scale
        const { handle, startX, startY, startW, startH, moduleId } = resizeInfo

        let newX = startX
        let newY = startY
        let newW = startW
        let newH = startH

        if (handle === 'se') {
          newW = Math.max(MIN_MODULE_W, startW + dx)
          newH = Math.max(MIN_MODULE_H, startH + dy)
        } else if (handle === 'sw') {
          newW = Math.max(MIN_MODULE_W, startW - dx)
          newH = Math.max(MIN_MODULE_H, startH + dy)
          newX = startX + startW - newW
        } else if (handle === 'ne') {
          newW = Math.max(MIN_MODULE_W, startW + dx)
          newH = Math.max(MIN_MODULE_H, startH - dy)
          newY = startY + startH - newH
        } else if (handle === 'nw') {
          newW = Math.max(MIN_MODULE_W, startW - dx)
          newH = Math.max(MIN_MODULE_H, startH - dy)
          newX = startX + startW - newW
          newY = startY + startH - newH
        }

        newX = Math.max(0, newX)
        newY = Math.max(0, newY)
        if (newX + newW > BOARD_WIDTH) newW = BOARD_WIDTH - newX
        if (newY + newH > BOARD_HEIGHT) newH = BOARD_HEIGHT - newY

        updateModulePosition(moduleId, newX, newY)
        updateModuleSize(moduleId, newW, newH)
      }
    }

    const handleMouseUp = () => {
      setDragInfo(null)
      setResizeInfo(null)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragInfo, resizeInfo, modules, scale, updateModulePosition, updateModuleSize])

  const handleBoardClick = () => {
    setSelectedModule(null)
  }

  const isActive = dragInfo !== null || resizeInfo !== null

  return (
    <div
      ref={containerRef}
      className="flex-1 flex items-center justify-center overflow-hidden select-none"
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${theme.bgColor}66 0%, #f0f0f0 70%)`,
        cursor: isActive ? 'grabbing' : 'default',
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        data-board
        className="relative origin-center board-canvas"
        style={{
          width: BOARD_WIDTH,
          height: BOARD_HEIGHT,
          transform: `scale(${scale})`,
          backgroundColor: theme.bgColor,
          border: `3px solid ${theme.primaryColor}`,
          borderRadius: 4,
          boxShadow: dragOverActive
            ? `0 0 0 4px ${theme.primaryColor}40, 0 12px 40px rgba(0,0,0,0.15)`
            : `0 8px 32px rgba(0,0,0,0.1), inset 0 0 0 1px ${theme.primaryColor}20`,
          transition: 'box-shadow 0.2s ease',
        }}
        onClick={handleBoardClick}
      >
        <Decoration
          pattern={theme.decorationPattern}
          color={theme.secondaryColor}
          opacity={decorationOpacity}
        />

        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.06 }}>
          {Array.from({ length: Math.ceil(BOARD_WIDTH / 40) + 1 }, (_, xi) =>
            Array.from({ length: Math.ceil(BOARD_HEIGHT / 40) + 1 }, (_, yi) => (
              <circle key={`${xi}-${yi}`} cx={xi * 40} cy={yi * 40} r={1} fill={theme.primaryColor} />
            ))
          )}
        </svg>

        {modules.map((mod) => {
          const isSelected = selectedModuleId === mod.id
          const isDragging = dragInfo?.moduleId === mod.id
          const isReszing = resizeInfo?.moduleId === mod.id

          return (
            <div
              key={mod.id}
              className="absolute group"
              style={{
                left: mod.x,
                top: mod.y,
                width: mod.width,
                height: mod.height,
                cursor: isDragging ? 'grabbing' : 'grab',
                zIndex: isSelected ? 10 : 1,
                borderRadius: mod.type === 'specimen' ? '8px' : '4px',
                background: mod.type === 'specimen' ? 'transparent' : `${theme.bgColor}ee`,
                boxShadow: isSelected
                  ? `0 0 0 2px ${theme.primaryColor}, 0 4px 16px ${theme.primaryColor}30`
                  : '0 1px 4px rgba(0,0,0,0.06)',
                outline: isSelected ? `2px dashed ${theme.primaryColor}` : 'none',
                outlineOffset: '2px',
                transition: isDragging || isReszing ? 'none' : 'box-shadow 0.15s ease',
              }}
              onMouseDown={(e) => handleModuleMouseDown(e, mod.id)}
              onClick={(e) => e.stopPropagation()}
            >
              <ModuleRender module={mod} fontSize={fontSize} theme={theme} />

              {isSelected && (
                <>
                  {(['nw', 'ne', 'sw', 'se'] as ResizeHandle[]).map((h) => (
                    <div
                      key={h}
                      onMouseDown={(e) => handleResizeMouseDown(e, mod.id, h)}
                      className="absolute w-3 h-3 rounded-sm z-20"
                      style={{
                        cursor: handleCursors[h],
                        backgroundColor: theme.primaryColor,
                        border: '2px solid #fff',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        top: h.startsWith('n') ? -6 : undefined,
                        bottom: h.startsWith('s') ? -6 : undefined,
                        left: h.endsWith('w') ? -6 : undefined,
                        right: h.endsWith('e') ? -6 : undefined,
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          )
        })}

        {dragOverActive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ backgroundColor: `${theme.primaryColor}10` }}
          >
            <div className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: `${theme.primaryColor}20`, color: theme.primaryColor }}>
              释放以添加模块
            </div>
          </div>
        )}
      </div>

      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-medium select-none pointer-events-none"
        style={{ backgroundColor: `${theme.primaryColor}18`, color: theme.primaryColor + 'aa' }}
      >
        展板 {BOARD_WIDTH} × {BOARD_HEIGHT} · {scale.toFixed(1)}x
      </div>
    </div>
  )
}
