import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Share2, ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react'
import Header from '../components/Header'
import './FeedPage.css'

const feedData = [
  {
    id: 1,
    type: 'featured',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80',
    title: 'Detox Teas: Fact or Fiction?',
    subtitle: 'What the science actually says',
    likes: 234,
    saved: false,
    tag: 'Myth Busted',
  },
  {
    id: 2,
    type: 'regular',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    title: 'The "No Pain, No Gain" Myth',
    subtitle: 'Why rest days matter for results',
    likes: 189,
    saved: true,
    tag: 'Verified',
  },
  {
    id: 3,
    type: 'regular',
    image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?w=800&q=80',
    title: 'Supplements: Do You Need Them?',
    subtitle: 'Evidence-based recommendations',
    likes: 312,
    saved: false,
    tag: 'Fact Check',
  },
  {
    id: 4,
    type: 'regular',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    title: 'Superfoods: Marketing vs Reality',
    subtitle: 'Separating hype from nutrition',
    likes: 156,
    saved: false,
    tag: 'Myth Busted',
  },
  {
    id: 5,
    type: 'regular',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    title: '8 Hours of Sleep: One Size Fits All?',
    subtitle: 'What research tells us about rest',
    likes: 278,
    saved: true,
    tag: 'Verified',
  },
]

function FeedPage() {
  const [posts, setPosts] = useState(feedData)

  const toggleSave = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, saved: !post.saved } : post
    ))
  }

  const toggleLike = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked } : post
    ))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="feed-page">
      <Header title="Feed" />
      
      <motion.div
        className="feed-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 className="feed-section-title" variants={cardVariants}>
          Latest Fact Checks
        </motion.h2>

        <div className="feed-grid">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              className={`feed-card ${post.type === 'featured' ? 'featured' : ''}`}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="card-image-wrapper">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="card-image"
                  loading="lazy"
                />
                <div className="card-overlay" />
                
                {/* Save button */}
                <motion.button
                  className={`card-save ${post.saved ? 'saved' : ''}`}
                  onClick={() => toggleSave(post.id)}
                  whileTap={{ scale: 0.9 }}
                  aria-label={post.saved ? 'Unsave' : 'Save'}
                >
                  <Heart 
                    size={20} 
                    fill={post.saved ? 'currentColor' : 'none'}
                  />
                </motion.button>

                {/* Tag badge */}
                {post.tag && (
                  <div className={`tag-badge ${post.tag.toLowerCase().replace(' ', '-')}`}>
                    {post.tag === 'Myth Busted' && <AlertTriangle size={14} />}
                    {post.tag === 'Verified' && <ShieldCheck size={14} />}
                    {post.tag === 'Fact Check' && <CheckCircle size={14} />}
                    <span>{post.tag}</span>
                  </div>
                )}
              </div>

              <div className="card-content">
                <h3 className="card-title">{post.title}</h3>
                <p className="card-subtitle">{post.subtitle}</p>
                
                <div className="card-actions">
                  <button 
                    className={`action-btn ${post.liked ? 'liked' : ''}`}
                    onClick={() => toggleLike(post.id)}
                  >
                    <Heart size={16} fill={post.liked ? 'currentColor' : 'none'} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="action-btn">
                    <MessageCircle size={16} />
                  </button>
                  <button className="action-btn">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </motion.div>
    </div>
  )
}

export default FeedPage
