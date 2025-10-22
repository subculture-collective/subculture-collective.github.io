import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'

// Import pages
import About from './pages/About'
import Creators from './pages/Creators'
import Home from './pages/Home'
import Join from './pages/Join'
import Journal from './pages/Journal'
import JournalPost from './pages/JournalPost'
import NotFound from './pages/NotFound'
import Projects from './pages/Projects'

function App() {
  return (
    <Layout variant="default" transitionType="glitch">
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
    </Layout>
  )
}

App.displayName = 'App'

export default App
