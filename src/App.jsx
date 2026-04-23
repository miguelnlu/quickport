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
  const [videoEnded, setVideoEnded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const video = document.getElementById('intro-video')
    
    // Timeout de seguridad: si después de 3 segundos el video no se reproduce, saltar al contenido
    const timeout = setTimeout(() => {
      if (!videoEnded) {
        console.log('Video timeout, skipping to content')
        setVideoEnded(true)
        setShowContent(true)
      }
    }, 3000)
    
    if (video) {
      // Intentar reproducir el video
      const playPromise = video.play()
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video se reproduce correctamente
            console.log('Video playing')
            clearTimeout(timeout)
          })
          .catch(err => {
            console.log('Autoplay prevented:', err)
            // Si el autoplay falla (común en móviles), saltar directamente al contenido
            clearTimeout(timeout)
            setVideoEnded(true)
            setShowContent(true)
          })
      }
    }
    
    return () => clearTimeout(timeout)
  }, [])

  const handleVideoEnd = () => {
    setVideoEnded(true)
    setShowContent(true)
  }

  return (
    <Router>
      <div className="app">
        <AnimatePresence>
          {!videoEnded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="video-intro"
            >
              <video
                id="intro-video"
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={handleVideoEnd}
                onError={() => {
                  console.log('Video error, skipping to content')
                  setVideoEnded(true)
                  setShowContent(true)
                }}
                className="intro-video"
              >
                <source src="/intro.mp4" type="video/mp4" />
              </video>
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
