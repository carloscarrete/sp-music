import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { WebPlayer } from './WebPlayer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebPlayer />
  </StrictMode>,
)
