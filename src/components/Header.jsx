import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import './Header.css'

function Header({ title, showMenu = true }) {
  return (
    <header className="header">
      <motion.div 
        className="header-logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg viewBox="0 0 40 40" className="logo-icon">
          <circle cx="20" cy="12" r="6" fill="currentColor" opacity="0.9" />
          <circle cx="12" cy="26" r="6" fill="currentColor" opacity="0.7" />
          <circle cx="28" cy="26" r="6" fill="currentColor" opacity="0.7" />
          <circle cx="20" cy="20" r="4" fill="var(--accent-primary)" />
        </svg>
      </motion.div>
      
      {title && (
        <motion.h1 
          className="header-title"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {title}
        </motion.h1>
      )}
      
      {showMenu && (
        <button className="header-menu" aria-label="Menu">
          <Menu size={24} />
        </button>
      )}
    </header>
  )
}

export default Header
