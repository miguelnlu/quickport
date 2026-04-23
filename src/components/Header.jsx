import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import './Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="header"
    >
      <div className="header-content">
        <Link to="/" className="logo-container">
          <img src="/QUICKPORT.jpg" alt="QuickPort" className="logo" />
        </Link>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="menu-button"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="menu-dropdown glass"
          >
            <Link
              to="/integrantes"
              className="menu-item"
              onClick={() => setMenuOpen(false)}
            >
              <motion.span
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Integrantes
              </motion.span>
            </Link>
            <Link
              to="/"
              className="menu-item"
              onClick={() => setMenuOpen(false)}
            >
              <motion.span
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Escáner
              </motion.span>
            </Link>
            <Link
              to="/explicacion"
              className="menu-item"
              onClick={() => setMenuOpen(false)}
            >
              <motion.span
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Explicación
              </motion.span>
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
