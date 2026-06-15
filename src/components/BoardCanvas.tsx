import { useEditorStore } from '@/shared/store'
import { themes } from '@/shared/themes'
import { BOARD_WIDTH, BOARD_HEIGHT } from '@/shared/types'
import type { BoardModule, BoardTheme, ScheduleContent, SpecimenContent, TextContent } from '@/shared/types'
import Decoration from './Decoration'
import TextModule from './TextModule'
import SpecimenCard from './SpecimenCard'
import ScheduleTable from './ScheduleTable'

interface BoardCanvasProps {
  interactive: boolean
}

function ModuleRenderer({ module, fontSize, theme, isSelected, onSelect }: {
  module: BoardModule
  fontSize: number
  theme: BoardTheme
  isSelected: boolean
  onSelect: () => void
}) {
  const commonProps = {
    fontSize,
    isSelected,
    onClick: onSelect,
  }

  switch (module.type) {
    case 'text':
      return (
        <TextModule
          {...commonProps}
          content={module.content as TextContent}
          textColor={theme.textColor}
        />
      )
    case 'specimen':
      return (
        <SpecimenCard
          {...commonProps}
          content={module.content as SpecimenContent}
          primaryColor={theme.primaryColor}
          textColor={theme.textColor}
        />
      )
    case 'schedule':
      return (
        <ScheduleTable
          {...commonProps}
          content={module.content as ScheduleContent}
          primaryColor={theme.primaryColor}
          textColor={theme.textColor}
        />
      )
    default:
      return null
  }
}

export default function BoardCanvas({ interactive }: BoardCanvasProps) {
  const { modules, themeId, fontSize, decorationOpacity, selectedModuleId, setSelectedModule } = useEditorStore()
  const theme = themes[themeId]

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: BOARD_WIDTH,
        height: BOARD_HEIGHT,
        backgroundColor: theme.bgColor,
        border: `3px solid ${theme.primaryColor}`,
        borderRadius: 4,
        boxShadow: `inset 0 0 0 1px ${theme.primaryColor}30`,
      }}
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

      {modules.map((mod) => (
        <div
          key={mod.id}
          className="absolute"
          style={{
            left: mod.x,
            top: mod.y,
            width: mod.width,
            height: mod.height,
          }}
          onClick={interactive ? () => setSelectedModule(mod.id) : undefined}
        >
          <ModuleRenderer
            module={mod}
            fontSize={fontSize}
            theme={theme}
            isSelected={interactive && selectedModuleId === mod.id}
            onSelect={interactive ? () => setSelectedModule(mod.id) : () => {}}
          />
        </div>
      ))}
    </div>
  )
}
