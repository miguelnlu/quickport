import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, QrCode, FileText, X } from 'lucide-react'
import { Html5Qrcode } from 'html5-qrcode'
import DocumentModal from './DocumentModal'
import './Scanner.css'

function Scanner({ isScanning, setIsScanning }) {
  const [status, setStatus] = useState('ESPERANDO')
  const [showModal, setShowModal] = useState(false)
  const [isScanned, setIsScanned] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [scannedData, setScannedData] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState(0)
  const scannerRef = useRef(null)
  const html5QrCodeRef = useRef(null)

  const processingMessages = [
    'Verificando Producto',
    'Inspeccionando Documentos',
    'Identificando Intermediarios'
  ]

  const startScanner = async () => {
    try {
      setIsCameraActive(true)
      
      // Primero verificar si el navegador soporta getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Tu navegador no soporta acceso a la cámara. Por favor, usa un navegador moderno como Chrome, Firefox o Safari.");
        setIsCameraActive(false)
        return;
      }

      // Solicitar permisos de cámara explícitamente
      try {
        await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      } catch (permissionError) {
        alert("Necesitamos acceso a tu cámara para escanear códigos QR. Por favor, permite el acceso cuando tu navegador lo solicite.");
        setIsCameraActive(false)
        return;
      }
      
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode("qr-reader")
      }

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      }

      await html5QrCodeRef.current.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          // QR detectado exitosamente
          setScannedData(decodedText)
          stopScanner()
          
          // Iniciar proceso de verificación
          setStatus('VERIFICANDO')
          setIsProcessing(true)
          setProcessingStep(0)
          
          // Secuencia de mensajes (2.5 segundos cada uno)
          setTimeout(() => setProcessingStep(1), 2500)
          setTimeout(() => setProcessingStep(2), 5000)
          setTimeout(() => {
            setProcessingStep(3)
            setIsProcessing(false)
            setStatus('EN REGLA')
            setIsScanned(true)
          }, 7500)
        },
        (errorMessage) => {
          // Error de escaneo (normal mientras busca QR)
        }
      )
    } catch (err) {
      console.error("Error al iniciar el escáner:", err)
      let errorMessage = "No se pudo acceder a la cámara. ";
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage += "Por favor, permite el acceso a la cámara en la configuración de tu navegador.";
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage += "No se encontró ninguna cámara en tu dispositivo.";
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage += "La cámara está siendo usada por otra aplicación.";
      } else if (err.name === 'OverconstrainedError') {
        errorMessage += "No se encontró una cámara que cumpla con los requisitos.";
      } else if (err.name === 'SecurityError') {
        errorMessage += "El acceso a la cámara está bloqueado por razones de seguridad. Asegúrate de estar usando HTTPS.";
      } else {
        errorMessage += "Error desconocido: " + err.message;
      }
      
      alert(errorMessage);
      setIsCameraActive(false)
    }
  }

  const stopScanner = async () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      try {
        await html5QrCodeRef.current.stop()
        setIsCameraActive(false)
      } catch (err) {
        console.error("Error al detener el escáner:", err)
      }
    }
  }

  const handleClose = async () => {
    await stopScanner()
    setIsScanning(false)
    setStatus('ESPERANDO')
    setIsScanned(false)
    setScannedData('')
    setIsProcessing(false)
    setProcessingStep(0)
  }

  useEffect(() => {
    return () => {
      // Cleanup al desmontar
      if (html5QrCodeRef.current) {
        stopScanner()
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {isScanning && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="scanner-overlay"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="scanner-container glass"
              onClick={(e) => e.stopPropagation()}
            >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="close-button-top"
              onClick={handleClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <X size={24} />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="status-section"
            >
              <p className="status-label">STATUS</p>
              <motion.div
                animate={{
                  color: status === 'EN REGLA' ? '#4ade80' : '#ffffff'
                }}
                className="status-value"
              >
                {status}
              </motion.div>
            </motion.div>

            {!isCameraActive && !isScanned && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="qr-icon-container"
              >
                <QrCode size={120} strokeWidth={1.5} />
              </motion.div>
            )}

            {isCameraActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="camera-container"
              >
                <div id="qr-reader" ref={scannerRef}></div>
              </motion.div>
            )}

            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="processing-container"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="loading-spinner"
                >
                  <svg width="60" height="60" viewBox="0 0 60 60">
                    <circle
                      cx="30"
                      cy="30"
                      r="25"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeDasharray="120"
                      strokeDashoffset="30"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={processingStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="processing-text"
                  >
                    {processingMessages[processingStep]}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            )}

            {!isCameraActive && !isScanned && !isProcessing && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startScanner}
                className="camera-button glass"
              >
                <Camera size={20} />
                <span>Escanear QR</span>
              </motion.button>
            )}

            <AnimatePresence>
              {isScanned && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="success-icon"
                  >
                    <QrCode size={80} strokeWidth={1.5} />
                  </motion.div>
                  
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(true)}
                    className="documents-button glass"
                  >
                    <FileText size={20} />
                    <span>Ver Documentos</span>
                  </motion.button>
                </>
              )}
            </AnimatePresence>
            </motion.div>
          </motion.div>

          <DocumentModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </>
      )}
    </AnimatePresence>
  )
}

export default Scanner
