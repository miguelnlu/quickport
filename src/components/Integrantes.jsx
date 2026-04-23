import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import './Integrantes.css'

const integrantes = [
  { 
    nombre: 'Miguel A. Nuñez', 
    matricula: '2025-0073',
    avatar: 'https://ui-avatars.com/api/?name=Miguel+Nunez&background=1a1a1a&color=fff&size=200&bold=true'
  },
  { 
    nombre: 'Mia M. Medina', 
    matricula: '2025-0136',
    avatar: 'https://ui-avatars.com/api/?name=Mia+Medina&background=1a1a1a&color=fff&size=200&bold=true'
  },
  { 
    nombre: 'Mileika P. Santana', 
    matricula: '2025-0045',
    avatar: 'https://ui-avatars.com/api/?name=Mileika+Santana&background=1a1a1a&color=fff&size=200&bold=true'
  },
  { 
    nombre: 'Jose R. Reyes', 
    matricula: '2025-0729',
    avatar: 'https://ui-avatars.com/api/?name=Jose+Reyes&background=1a1a1a&color=fff&size=200&bold=true'
  },
  { 
    nombre: 'Melody Familia', 
    matricula: '2025-0155',
    avatar: 'https://ui-avatars.com/api/?name=Melody+Familia&background=1a1a1a&color=fff&size=200&bold=true'
  }
]

function Integrantes() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="integrantes-container"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="integrantes-header"
      >
        <Users size={40} strokeWidth={1.5} />
        <h1 className="integrantes-title">Nuestro Equipo</h1>
        <p className="integrantes-subtitle">
          Profesionales dedicados a la innovación aduanera
        </p>
      </motion.div>

      <div className="integrantes-grid">
        {integrantes.map((integrante, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="integrante-card glass"
          >
            <div className="integrante-avatar">
              <img src={integrante.avatar} alt={integrante.nombre} className="avatar-img" />
            </div>
            <h3 className="integrante-nombre">{integrante.nombre}</h3>
            <p className="integrante-rol">{integrante.matricula}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Integrantes
