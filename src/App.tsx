import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import PageTransition from './components/motion/PageTransition'

// Import pages
import Home from './pages/Home'
import About from './pages/About'
import Creators from './pages/Creators'
import Projects from './pages/Projects'
import Journal from './pages/Journal'
import JournalPost from './pages/JournalPost'
import Join from './pages/Join'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

ScrollToTop.displayName = 'ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <PageTransition type="glitch">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<JournalPost />} />
          <Route path="/join" element={<Join />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </>
  )
}

App.displayName = 'App'

export default App
