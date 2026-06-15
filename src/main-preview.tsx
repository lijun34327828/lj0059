import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppPreview from './AppPreview'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppPreview />
  </StrictMode>,
)
