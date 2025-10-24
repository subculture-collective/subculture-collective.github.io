import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/error/ErrorBoundary'
import Analytics from './components/analytics/Analytics'
import { initWebVitals } from './utils/performance'

// Initialize Web Vitals monitoring
if (import.meta.env.PROD) {
  initWebVitals()
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Analytics domain="subculture-collective.github.io" />
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
)
