import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import './DocumentModal.css'

const documents = [
  'Factura Comercial',
  'Lista de Empaque',
  'Conocimiento de Embarque',
  'Certificado de Origen',
  'Declaración Aduanera',
  'Póliza de Seguro',
  'Permiso de Importación',
  'Certificado Sanitario',
  'Certificado Fitosanitario',
  'Documento de Transporte',
  'Manifiesto de Carga',
  'Declaración de Valor'
]

function DocumentModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="modal-content glass"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Documentos Verificados</h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="close-button"
              >
                <X size={24} />
              </motion.button>
            </div>

            <div className="documents-list">
              {documents.map((doc, index) => (
                <motion.div
                  key={doc}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="document-item"
                >
                  <CheckCircle2 size={20} className="check-icon" />
                  <span className="document-name">{doc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DocumentModal
