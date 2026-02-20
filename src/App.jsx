import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, createContext } from 'react'
import { AnimatePresence } from 'framer-motion'
import AuthPage from './pages/AuthPage'
import FeedPage from './pages/FeedPage'
import SavedPage from './pages/SavedPage'
import QuizPage from './pages/QuizPage'
import SearchPage from './pages/SearchPage'
import BottomNav from './components/BottomNav'

export const AuthContext = createContext(null)

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const login = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      <BrowserRouter>
        <div className="app-container">
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={isAuthenticated ? <Navigate to="/feed" /> : <AuthPage />} 
              />
              <Route 
                path="/feed" 
                element={isAuthenticated ? <FeedPage /> : <Navigate to="/" />} 
              />
              <Route 
                path="/saved" 
                element={isAuthenticated ? <SavedPage /> : <Navigate to="/" />} 
              />
              <Route 
                path="/quiz" 
                element={isAuthenticated ? <QuizPage /> : <Navigate to="/" />} 
              />
              <Route 
                path="/search" 
                element={isAuthenticated ? <SearchPage /> : <Navigate to="/" />} 
              />
            </Routes>
          </AnimatePresence>
          {isAuthenticated && <BottomNav />}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
