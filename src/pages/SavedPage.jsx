import { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { Flame, Grid, List, Heart, Eye, X } from 'lucide-react'
import { AuthContext } from '../App'
import Header from '../components/Header'
import './SavedPage.css'

const savedContent = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&q=80',
    title: 'Detox Myth Debunked',
    views: 1234,
    category: 'nutrition',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
    title: 'Spot Reduction Myth',
    views: 892,
    category: 'fitness',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80',
    title: 'Stretching Facts',
    views: 2341,
    category: 'fitness',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
    title: 'Superfoods Reality',
    views: 567,
    category: 'nutrition',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80',
    title: 'Sleep Myths Busted',
    views: 1890,
    category: 'health',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?w=400&q=80',
    title: 'Vitamin Truths',
    views: 3421,
    category: 'nutrition',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80',
    title: 'Muscle Myths',
    views: 1567,
    category: 'fitness',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80',
    title: 'Wellness Trends',
    views: 2890,
    category: 'health',
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80',
    title: 'Juice Cleanse Facts',
    views: 4123,
    category: 'nutrition',
  },
]

function SavedPage() {
  const { user, updateUser } = useContext(AuthContext)
  const [viewMode, setViewMode] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showEditModal, setShowEditModal] = useState(false)
  const [editForm, setEditForm] = useState({ name: '', email: '', username: '', dob: '', medicalField: '' })

  const openEditModal = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || '',
      username: user?.username || '',
      dob: user?.dob || '',
      medicalField: user?.medicalField || '',
    })
    setShowEditModal(true)
  }

  const handleSaveProfile = async () => {
    try {
      const res = await fetch(`/api/users/${user.user_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editForm.name,
          email: editForm.email,
          dob: editForm.dob,
          medicalField: editForm.medicalField,
        }),
      })
      if (!res.ok) return
      const updated = await res.json()
      updateUser(updated)
      setShowEditModal(false)
    } catch {
      // keep modal open on network error
    }
  }

  const categories = ['all', 'nutrition', 'fitness', 'health']
  
  const filteredContent = selectedCategory === 'all' 
    ? savedContent 
    : savedContent.filter(item => item.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <div className="saved-page">
      <Header />
      
      <div className="saved-content">
        {/* Profile header */}
        <motion.div 
          className="profile-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="profile-avatar">
            <div className="avatar-ring" />
            <div className="avatar-inner">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
          
          <div className="profile-info">
            <h1 className="profile-name">{user?.name || 'User'}</h1>
            <p className="profile-email">{user?.email || 'user@email.com'}</p>
          </div>

          <button className="profile-settings" onClick={openEditModal}>
            Edit Profile
          </button>
        </motion.div>

        {/* Streak card */}
        <motion.div 
          className="streak-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="streak-icon">
            <Flame size={24} />
          </div>
          <div className="streak-info">
            <span className="streak-count">7 Day Streak</span>
            <span className="streak-label">Myth-busting pro!</span>
          </div>
          <div className="streak-flames">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="mini-flame"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                <Flame size={14} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Saved content section */}
        <motion.div 
          className="saved-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="saved-header">
            <h2 className="saved-title">Saved Content</h2>
            <div className="view-toggle">
              <button 
                className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={18} />
              </button>
              <button 
                className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Category filters */}
          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Content grid */}
          <motion.div 
            className={`content-grid ${viewMode}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={selectedCategory + viewMode}
          >
            {filteredContent.map((item) => (
              <motion.div
                key={item.id}
                className="content-item"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="item-image-wrapper">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="item-image"
                    loading="lazy"
                  />
                  <div className="item-overlay">
                    <Heart size={16} className="overlay-icon" />
                  </div>
                </div>
                {viewMode === 'list' && (
                  <div className="item-details">
                    <span className="item-title">{item.title}</span>
                    <span className="item-views">
                      <Eye size={12} />
                      {item.views.toLocaleString()}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <motion.div
            className="edit-profile-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Edit Profile</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <label className="form-label">
                Username
                <input
                  className="form-input"
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value, name: e.target.value }))}
                  placeholder="@username"
                />
              </label>
              <label className="form-label">
                Email
                <input
                  className="form-input"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Your email"
                />
              </label>
              <label className="form-label">
                Date of Birth
                <input
                  className="form-input"
                  type="date"
                  value={editForm.dob}
                  onChange={(e) => setEditForm(prev => ({ ...prev, dob: e.target.value }))}
                />
              </label>
              <label className="form-label">
                Medical Background
                <span className="form-label-optional"> (optional)</span>
                <input
                  className="form-input"
                  type="text"
                  value={editForm.medicalField}
                  onChange={(e) => setEditForm(prev => ({ ...prev, medicalField: e.target.value }))}
                  placeholder="e.g. diabetes, hypertension..."
                />
              </label>
            </div>

            <div className="modal-footer">
              <button className="modal-btn cancel" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="modal-btn save" onClick={handleSaveProfile}>
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default SavedPage
