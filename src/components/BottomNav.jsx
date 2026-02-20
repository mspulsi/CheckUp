import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search, User, Zap } from 'lucide-react'
import './BottomNav.css'

const navItems = [
  { path: '/feed', icon: Home, label: 'Feed' },
  { path: '/search', icon: Search, label: 'Discover' },
  { path: '/saved', icon: User, label: 'Profile' },
  { path: '/quiz', icon: Zap, label: 'Quiz' },
]

function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-inner">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          
          return (
            <button
              key={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
              aria-label={item.label}
            >
              <div className="nav-icon-wrapper">
                {isActive && (
                  <motion.div
                    className="nav-active-bg"
                    layoutId="activeNav"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon 
                  size={22} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className="nav-icon"
                />
              </div>
              <span className="nav-label">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav
