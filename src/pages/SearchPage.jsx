import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, TrendingUp, Clock, ChevronRight } from 'lucide-react'
import Header from '../components/Header'
import './SearchPage.css'

const categories = [
  {
    id: 'nutrition',
    name: 'Nutrition Myths',
    description: 'Diet fads, superfoods & eating claims',
    icon: '🥗',
    color: '#5A8F7B',
    count: 234,
  },
  {
    id: 'fitness',
    name: 'Fitness Facts',
    description: 'Workout myths & exercise science',
    icon: '💪',
    color: '#C45D3E',
    count: 189,
  },
  {
    id: 'health',
    name: 'Medical Claims',
    description: 'Debunking viral health misinformation',
    icon: '🏥',
    color: '#D4A853',
    count: 156,
  },
  {
    id: 'trending',
    name: 'Trending Now',
    description: 'Current social media health claims',
    icon: '📱',
    color: '#7C6CA8',
    count: 98,
  },
  {
    id: 'remedies',
    name: 'Home Remedies',
    description: 'Which actually work?',
    icon: '🏠',
    color: '#6B5E4F',
    count: 67,
  },
]

const trendingSearches = [
  'Detox cleanses',
  'Alkaline water',
  'Intermittent fasting',
  'Seed oils',
  'Raw water trend',
]

const recentSearches = [
  'Apple cider vinegar',
  'Collagen supplements',
  'Blue light glasses',
]

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState(['nutrition', 'fitness', 'health', 'trending', 'remedies'])
  const [isFocused, setIsFocused] = useState(false)

  const toggleCategory = (id) => {
    setSelectedCategories(prev => 
      prev.includes(id) 
        ? prev.filter(c => c !== id)
        : [...prev, id]
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="search-page">
      <Header />
      
      <div className="search-content">
        {/* Title */}
        <motion.div 
          className="search-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="search-title">Discover</h1>
          <p className="search-subtitle">
            Search health claims or browse by topic
          </p>
        </motion.div>

        {/* Search input */}
        <motion.div 
          className={`search-input-wrapper ${isFocused ? 'focused' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search any health claim..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="search-input"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                className="clear-btn"
                onClick={() => setSearchQuery('')}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <X size={18} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Quick searches */}
        <AnimatePresence>
          {!searchQuery && (
            <motion.div 
              className="quick-searches"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {/* Trending */}
              <div className="quick-section">
                <div className="quick-header">
                  <TrendingUp size={16} />
                  <span>Trending</span>
                </div>
                <div className="quick-tags">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      className="quick-tag"
                      onClick={() => setSearchQuery(term)}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent */}
              {recentSearches.length > 0 && (
                <div className="quick-section">
                  <div className="quick-header">
                    <Clock size={16} />
                    <span>Recent</span>
                  </div>
                  <div className="quick-tags">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        className="quick-tag recent"
                        onClick={() => setSearchQuery(term)}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories */}
        <motion.div 
          className="categories-section"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="section-title">Categories</h2>
          
          <div className="categories-list">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.id)
              
              return (
                <motion.div
                  key={category.id}
                  className={`category-card ${isSelected ? 'selected' : ''}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleCategory(category.id)}
                  style={{
                    '--category-color': category.color,
                  }}
                >
                  <div className="category-checkbox">
                    <motion.div 
                      className="checkbox-inner"
                      animate={{ 
                        scale: isSelected ? 1 : 0,
                        opacity: isSelected ? 1 : 0,
                      }}
                    />
                  </div>
                  
                  <div className="category-icon">
                    {category.icon}
                  </div>
                  
                  <div className="category-info">
                    <h3 className="category-name">{category.name}</h3>
                    <p className="category-description">{category.description}</p>
                  </div>

                  <div className="category-count">
                    {category.count}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Explore button */}
        <motion.button
          className="explore-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Explore {selectedCategories.length} Categories</span>
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  )
}

export default SearchPage
