import { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Bell, ArrowRight, Sparkles, User, Calendar, Stethoscope } from 'lucide-react'
import { AuthContext } from '../App'
import './AuthPage.css'

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [dob, setDob] = useState('')
  const [medicalField, setMedicalField] = useState('')
  const [notifications, setNotifications] = useState(true)
  const [error, setError] = useState('')
  const { login } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
    const body = isLogin
      ? { email, password }
      : { email, password, username, dob, medicalField }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        return
      }
      login(data)
    } catch {
      setError('Could not reach server')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="auth-page">
      {/* Decorative background elements */}
      <div className="auth-bg-pattern">
        <div className="bg-circle bg-circle-1" />
        <div className="bg-circle bg-circle-2" />
        <div className="bg-circle bg-circle-3" />
      </div>

      <motion.div
        className="auth-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div className="auth-logo" variants={itemVariants}>
          <svg viewBox="0 0 60 60" className="logo-svg">
            <circle cx="30" cy="18" r="9" fill="currentColor" opacity="0.9" />
            <circle cx="18" cy="39" r="9" fill="currentColor" opacity="0.7" />
            <circle cx="42" cy="39" r="9" fill="currentColor" opacity="0.7" />
            <circle cx="30" cy="30" r="6" fill="var(--accent-primary)" />
          </svg>
          <span className="logo-text">CheckUp</span>
        </motion.div>

        {/* Welcome text */}
        <motion.div className="auth-welcome" variants={itemVariants}>
          <h1 className="welcome-title">
            {isLogin ? 'Welcome back' : 'Join us'}
          </h1>
          <p className="welcome-subtitle">
            {isLogin 
              ? 'Continue exploring verified health information' 
              : 'Get access to credible, fact-checked health content'}
          </p>
        </motion.div>

        {/* Form */}
        <motion.form 
          className="auth-form" 
          onSubmit={handleSubmit}
          variants={itemVariants}
        >
          <div className="input-group">
            <label className="input-label">Email</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                className="signup-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="input-group">
                  <label className="input-label">Username</label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      placeholder="@username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Date of Birth</label>
                  <div className="input-wrapper">
                    <Calendar size={18} className="input-icon" />
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">
                    Medical Background
                    <span className="optional-tag"> (optional)</span>
                  </label>
                  <div className="input-wrapper">
                    <Stethoscope size={18} className="input-icon" />
                    <input
                      type="text"
                      placeholder="e.g. diabetes, hypertension..."
                      value={medicalField}
                      onChange={(e) => setMedicalField(e.target.value)}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                className="checkbox-group"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                  <span className="checkbox-custom">
                    <Bell size={12} />
                  </span>
                  <span className="checkbox-text">
                    Alert me when new myths are debunked
                  </span>
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          {error && <p className="auth-error">{error}</p>}

          <motion.button
            type="submit"
            className="auth-submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight size={18} />
          </motion.button>

          {isLogin && (
            <button type="button" className="forgot-password">
              Forgot password?
            </button>
          )}
        </motion.form>

        {/* Toggle */}
        <motion.div className="auth-toggle" variants={itemVariants}>
          <span className="toggle-text">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </span>
          <button
            type="button"
            className="toggle-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
            <Sparkles size={14} />
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AuthPage
