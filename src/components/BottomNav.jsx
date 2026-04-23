import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, QrCode, Home, HelpCircle } from 'lucide-react'
import './BottomNav.css'

function BottomNav({ setIsScanning }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleScanClick = () => {
    setIsScanning(true)
  }

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
      className="bottom-nav glass"
    >
      <motion.button
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/integrantes')}
        className={`nav-button ${location.pathname === '/integrantes' ? 'active' : ''}`}
      >
        <User size={20} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')}
        className={`nav-button ${location.pathname === '/' ? 'active' : ''}`}
      >
        <Home size={20} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.15, y: -8 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleScanClick}
        className="nav-button center-button"
      >
        <QrCode size={24} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/explicacion')}
        className={`nav-button ${location.pathname === '/explicacion' ? 'active' : ''}`}
      >
        <HelpCircle size={20} />
      </motion.button>
    </motion.nav>
  )
}

export default BottomNav
