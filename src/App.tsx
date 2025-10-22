import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import PageTransition from './components/motion/PageTransition'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'

// Import pages
import About from './pages/About'
import Creators from './pages/Creators'
import Home from './pages/Home'
import Join from './pages/Join'
import Journal from './pages/Journal'
import JournalPost from './pages/JournalPost'
import NotFound from './pages/NotFound'
import Projects from './pages/Projects'

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
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar sticky />
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
      <Footer />
    </div>
  )
}

App.displayName = 'App'

export default App
