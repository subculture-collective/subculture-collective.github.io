import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'
import LoadingSpinner from './components/ui/LoadingSpinner'
import { trackPageView } from './utils/analytics'

// Lazy load all pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const AccessibilityStatement = lazy(
  () => import('./pages/AccessibilityStatement')
)
const Creators = lazy(() => import('./pages/Creators'))
const Projects = lazy(() => import('./pages/Projects'))
const Journal = lazy(() => import('./pages/Journal'))
const JournalPost = lazy(() => import('./pages/JournalPost'))
const Join = lazy(() => import('./pages/Join'))
const ServerError = lazy(() => import('./pages/ServerError'))
const NetworkError = lazy(() => import('./pages/NetworkError'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  const location = useLocation()

  // Track page views on route changes
  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])

  return (
    <Layout variant="default" transitionType="glitch">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/accessibility" element={<AccessibilityStatement />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<JournalPost />} />
          <Route path="/join" element={<Join />} />
          <Route path="/error" element={<ServerError />} />
          <Route path="/network-error" element={<NetworkError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

App.displayName = 'App'

export default App
