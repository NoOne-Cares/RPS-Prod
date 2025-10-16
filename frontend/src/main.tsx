import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import RainbowkitProvider from './Providers/RainbowKistProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RainbowkitProvider>
      <App />
    </RainbowkitProvider>
  </StrictMode>,
)
