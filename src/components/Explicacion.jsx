import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import './Explicacion.css'

const sections = [
  {
    title: 'Escaneo Inteligente',
    description: 'Utiliza la cámara de tu dispositivo para escanear códigos QR de documentos aduaneros. El sistema verifica automáticamente la autenticidad y validez de cada documento.'
  },
  {
    title: 'Verificación Instantánea',
    description: 'Una vez escaneado el código QR, el sistema procesa la información en tiempo real y determina si la documentación está en regla para el tránsito aduanero.'
  },
  {
    title: 'Documentación Completa',
    description: 'Accede a la lista completa de documentos verificados, incluyendo factura comercial, certificados de origen, permisos de importación y más.'
  },
  {
    title: 'Interfaz Minimalista',
    description: 'Diseño elegante y profesional que facilita la navegación y el uso de todas las funcionalidades del sistema de verificación aduanera.'
  }
]

function Explicacion() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="explicacion-container"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="explicacion-header"
      >
        <HelpCircle size={40} strokeWidth={1.5} />
        <h1 className="explicacion-title">¿Cómo Funciona?</h1>
        <p className="explicacion-subtitle">
          QuickPort simplifica el proceso de verificación aduanera mediante tecnología de escaneo QR
        </p>
      </motion.div>

      <div className="explicacion-content">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="explicacion-section glass"
          >
            <div className="section-number">{index + 1}</div>
            <h3 className="section-title">{section.title}</h3>
            <p className="section-description">{section.description}</p>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="video-container glass"
        >
          <video controls poster="">
            <source src="/intro.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Explicacion
