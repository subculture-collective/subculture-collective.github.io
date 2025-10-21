import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Creators from './pages/Creators';
import Projects from './pages/Projects';
import Journal from './pages/Journal';
import Join from './pages/Join';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-subcult-black">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

