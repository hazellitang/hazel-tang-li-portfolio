import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import FigmaSheet from './FigmaSheet'
import './styles.css'

const isFigmaSheet = new URLSearchParams(window.location.search).has('figma')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isFigmaSheet ? <FigmaSheet /> : <App />}
  </StrictMode>,
)
