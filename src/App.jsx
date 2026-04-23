import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import Scanner from './components/Scanner'
import Integrantes from './components/Integrantes'
import Explicacion from './components/Explicacion'
import './App.css'

function App() {
  const [isScanning, setIsScanning] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Mostrar el GIF por 3.33 segundos (duración del video original)
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 3330)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Router>
      <div className="app">
        <AnimatePresence>
          {!showContent && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="video-intro"
            >
              <img
                src="/intro.gif"
                alt="QuickPort Intro"
                className="intro-gif"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {showContent && (
          <>
            <Header />
            
            <main className="main-content">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="home-view"
                    >
                      <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="welcome-title"
                      >
                        Bienvenido a QuickPort
                      </motion.h1>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="welcome-subtitle"
                      >
                        Sistema de verificación aduanera inteligente
                      </motion.p>
                      <motion.img
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        src="/logistifc.PNG"
                        alt="Logística"
                        className="home-image"
                      />
                    </motion.div>
                  } />
                  <Route path="/integrantes" element={<Integrantes />} />
                  <Route path="/explicacion" element={<Explicacion />} />
                </Routes>
              </AnimatePresence>
            </main>

            <Scanner isScanning={isScanning} setIsScanning={setIsScanning} />
            
            {!isScanning && <BottomNav setIsScanning={setIsScanning} />}
          </>
        )}
      </div>
    </Router>
  )
}

export default App
