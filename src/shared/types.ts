export const BOARD_WIDTH = 600
export const BOARD_HEIGHT = 900

export interface TextContent {
  title: string
  body: string
}

export interface SpecimenContent {
  image: string
  name: string
  latinName: string
  description: string
}

export interface ScheduleRow {
  time: string
  activity: string
  location: string
}

export interface ScheduleContent {
  rows: ScheduleRow[]
}

export type ModuleType = 'text' | 'specimen' | 'schedule'

export interface BoardModule {
  id: string
  type: ModuleType
  x: number
  y: number
  width: number
  height: number
  content: TextContent | SpecimenContent | ScheduleContent
}

export type ThemeId = 'spring' | 'autumn'

export interface BoardTheme {
  id: ThemeId
  primaryColor: string
  secondaryColor: string
  accentColor: string
  bgColor: string
  textColor: string
  decorationPattern: 'petals' | 'leaves'
  label: string
}

export interface BoardState {
  modules: BoardModule[]
  themeId: ThemeId
  fontSize: number
  decorationOpacity: number
}
