import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Events from './pages/Events'
import Voiceover from './pages/Voiceover'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"          element={<Home />} />
        <Route path="/about"     element={<About />} />
        <Route path="/voiceover" element={<Voiceover />} />
        <Route path="/events"    element={<Events />} />
        <Route path="/contact"   element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-white relative">
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  )
}