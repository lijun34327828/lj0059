import type { BoardTheme } from './types'

export const themes: Record<string, BoardTheme> = {
  spring: {
    id: 'spring',
    primaryColor: '#7CB342',
    secondaryColor: '#F48FB1',
    accentColor: '#AED581',
    bgColor: '#FFF8E1',
    textColor: '#37474F',
    decorationPattern: 'petals',
    label: '春日',
  },
  autumn: {
    id: 'autumn',
    primaryColor: '#E65100',
    secondaryColor: '#8D6E63',
    accentColor: '#FFB74D',
    bgColor: '#FFF3E0',
    textColor: '#3E2723',
    decorationPattern: 'leaves',
    label: '秋日',
  },
}

export const fontSizes = [12, 14, 16, 18, 20, 22, 24]
