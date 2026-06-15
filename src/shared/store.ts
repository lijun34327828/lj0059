import { create } from 'zustand'
import type { BoardModule, BoardState, ThemeId } from './types'
import { defaultState } from './mockData'

interface EditorStore extends BoardState {
  addModule: (module: BoardModule) => void
  removeModule: (id: string) => void
  updateModule: (id: string, updates: Partial<BoardModule>) => void
  updateModulePosition: (id: string, x: number, y: number) => void
  updateModuleSize: (id: string, width: number, height: number) => void
  setTheme: (themeId: ThemeId) => void
  setFontSize: (fontSize: number) => void
  setDecorationOpacity: (opacity: number) => void
  setState: (state: BoardState) => void
  selectedModuleId: string | null
  setSelectedModule: (id: string | null) => void
}

const STORAGE_KEY = 'board-editor-state'

function loadState(): BoardState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // ignore
  }
  return defaultState
}

function saveState(state: BoardState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

function broadcastState(state: BoardState) {
  try {
    localStorage.setItem(STORAGE_KEY + '-broadcast', JSON.stringify({ ...state, _ts: Date.now() }))
  } catch {
    // ignore
  }
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  ...loadState(),
  selectedModuleId: null,

  addModule: (module: BoardModule) => {
    const state = get()
    const newState = { ...state, modules: [...state.modules, module] }
    saveState({ modules: newState.modules, themeId: newState.themeId, fontSize: newState.fontSize, decorationOpacity: newState.decorationOpacity })
    broadcastState({ modules: newState.modules, themeId: newState.themeId, fontSize: newState.fontSize, decorationOpacity: newState.decorationOpacity })
    set({ modules: newState.modules })
  },

  removeModule: (id: string) => {
    const state = get()
    const newState = { ...state, modules: state.modules.filter(m => m.id !== id) }
    saveState({ modules: newState.modules, themeId: newState.themeId, fontSize: newState.fontSize, decorationOpacity: newState.decorationOpacity })
    broadcastState({ modules: newState.modules, themeId: newState.themeId, fontSize: newState.fontSize, decorationOpacity: newState.decorationOpacity })
    set({ modules: newState.modules, selectedModuleId: state.selectedModuleId === id ? null : state.selectedModuleId })
  },

  updateModule: (id: string, updates: Partial<BoardModule>) => {
    const state = get()
    const newModules = state.modules.map(m => m.id === id ? { ...m, ...updates } : m)
    const boardState = { modules: newModules, themeId: state.themeId, fontSize: state.fontSize, decorationOpacity: state.decorationOpacity }
    saveState(boardState)
    broadcastState(boardState)
    set({ modules: newModules })
  },

  updateModulePosition: (id: string, x: number, y: number) => {
    const state = get()
    const newModules = state.modules.map(m => m.id === id ? { ...m, x, y } : m)
    const boardState = { modules: newModules, themeId: state.themeId, fontSize: state.fontSize, decorationOpacity: state.decorationOpacity }
    saveState(boardState)
    broadcastState(boardState)
    set({ modules: newModules })
  },

  updateModuleSize: (id: string, width: number, height: number) => {
    const state = get()
    const newModules = state.modules.map(m => m.id === id ? { ...m, width, height } : m)
    const boardState = { modules: newModules, themeId: state.themeId, fontSize: state.fontSize, decorationOpacity: state.decorationOpacity }
    saveState(boardState)
    broadcastState(boardState)
    set({ modules: newModules })
  },

  setTheme: (themeId: ThemeId) => {
    const state = get()
    const boardState = { modules: state.modules, themeId, fontSize: state.fontSize, decorationOpacity: state.decorationOpacity }
    saveState(boardState)
    broadcastState(boardState)
    set({ themeId })
  },

  setFontSize: (fontSize: number) => {
    const state = get()
    const boardState = { modules: state.modules, themeId: state.themeId, fontSize, decorationOpacity: state.decorationOpacity }
    saveState(boardState)
    broadcastState(boardState)
    set({ fontSize })
  },

  setDecorationOpacity: (decorationOpacity: number) => {
    const state = get()
    const boardState = { modules: state.modules, themeId: state.themeId, fontSize: state.fontSize, decorationOpacity }
    saveState(boardState)
    broadcastState(boardState)
    set({ decorationOpacity })
  },

  setState: (newState: BoardState) => {
    saveState(newState)
    broadcastState(newState)
    set({ ...newState })
  },

  setSelectedModule: (id: string | null) => {
    set({ selectedModuleId: id })
  },
}))
