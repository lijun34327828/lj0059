import { useEffect, useRef, useState } from 'react'
import { useEditorStore } from '@/shared/store'
import { themes } from '@/shared/themes'
import { BOARD_WIDTH, BOARD_HEIGHT } from '@/shared/types'
import BoardCanvas from '@/components/BoardCanvas'
import type { BoardState } from '@/shared/types'

const STATE_KEY = 'board-editor-state'
const BROADCAST_KEY = 'board-editor-state-broadcast'

export default function PreviewPage() {
  const { themeId, setState } = useEditorStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const theme = themes[themeId] ?? themes.spring

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STATE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as BoardState
        setState(parsed)
      }
    } catch {
      // ignore
    }
  }, [setState])

  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === BROADCAST_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue) as BoardState & { _ts?: number }
          const { _ts, ...boardState } = parsed
          setState(boardState as BoardState)
        } catch {
          // ignore
        }
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [setState])

  useEffect(() => {
    function updateScale() {
      if (!containerRef.current) return
      const vw = containerRef.current.clientWidth
      const vh = containerRef.current.clientHeight
      const scaleX = vw / BOARD_WIDTH
      const scaleY = vh / BOARD_HEIGHT
      setScale(Math.min(scaleX, scaleY) * 0.85)
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${theme.bgColor} 0%, ${theme.secondaryColor}15 50%, ${theme.primaryColor}08 100%)`,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          width: BOARD_WIDTH,
          height: BOARD_HEIGHT,
        }}
      >
        <BoardCanvas interactive={false} />
      </div>

      <div
        className="fixed top-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm select-none"
        style={{
          backgroundColor: `${theme.primaryColor}dd`,
          color: '#fff',
        }}
      >
        预览模式
      </div>

      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-[10px] font-medium shadow backdrop-blur-sm select-none"
        style={{
          backgroundColor: 'rgba(255,255,255,0.8)',
          color: theme.textColor + 'aa',
        }}
      >
        展板尺寸 {BOARD_WIDTH} × {BOARD_HEIGHT} · 缩放 {scale.toFixed(2)}x
      </div>
    </div>
  )
}
