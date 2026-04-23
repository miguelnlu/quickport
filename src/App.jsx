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
    
    if (video) {
      // Asegurar que el video esté muted para permitir autoplay
      video.muted = true
      
      // Intentar reproducir inmediatamente
      const playVideo = () => {
        video.play()
          .then(() => console.log('Video playing'))
          .catch(err => {
            console.log('Play attempt failed:', err)
            // Reintentar cada 100ms hasta que funcione
            setTimeout(playVideo, 100)
          })
      }
      
      // Múltiples intentos de reproducción
      playVideo()
      
      // Intentar cuando el video cargue
      video.addEventListener('loadedmetadata', playVideo)
      video.addEventListener('canplay', playVideo)
      
      return () => {
        video.removeEventListener('loadedmetadata', playVideo)
        video.removeEventListener('canplay', playVideo)
      }
    }
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
