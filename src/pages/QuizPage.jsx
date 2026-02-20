import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, ChevronRight, Lock, CheckCircle, Zap } from 'lucide-react'
import Header from '../components/Header'
import './QuizPage.css'

const quizzes = [
  {
    id: 1,
    title: 'Nutrition Myths',
    description: 'Can you spot the food fads from facts?',
    progress: 75,
    totalQuestions: 10,
    completed: 7,
    category: 'nutrition',
    unlocked: true,
    icon: '🥗',
  },
  {
    id: 2,
    title: 'Fitness Misconceptions',
    description: 'Test your workout knowledge',
    progress: 40,
    totalQuestions: 12,
    completed: 5,
    category: 'fitness',
    unlocked: true,
    icon: '💪',
  },
  {
    id: 3,
    title: 'Sleep Myths Debunked',
    description: 'Separate sleep facts from fiction',
    progress: 0,
    totalQuestions: 8,
    completed: 0,
    category: 'health',
    unlocked: true,
    icon: '😴',
  },
  {
    id: 4,
    title: 'Viral Health Trends',
    description: 'Which TikTok tips are actually true?',
    progress: 0,
    totalQuestions: 10,
    completed: 0,
    category: 'health',
    unlocked: false,
    icon: '📱',
  },
  {
    id: 5,
    title: 'Supplement Claims',
    description: 'Marketing hype or real benefits?',
    progress: 0,
    totalQuestions: 15,
    completed: 0,
    category: 'nutrition',
    unlocked: false,
    icon: '💊',
  },
]

function QuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState(null)

  const totalPoints = 1250
  const currentStreak = 7

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <div className="quiz-page">
      <Header />
      
      <div className="quiz-content">
        {/* Welcome section */}
        <motion.div 
          className="quiz-welcome"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="welcome-title">
            Test Your Knowledge
          </h1>
          <p className="welcome-subtitle">
            Can you tell health facts from fiction?
          </p>
        </motion.div>

        {/* Stats cards */}
        <motion.div 
          className="stats-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-card points">
            <div className="stat-icon">
              <Trophy size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{totalPoints.toLocaleString()}</span>
              <span className="stat-label">Points</span>
            </div>
          </div>
          
          <div className="stat-card streak">
            <div className="stat-icon">
              <Zap size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{currentStreak}</span>
              <span className="stat-label">Day Streak</span>
            </div>
          </div>
        </motion.div>

        {/* Continue section */}
        <motion.div 
          className="continue-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="section-title">Continue</h2>
          
          {quizzes.filter(q => q.progress > 0 && q.progress < 100).slice(0, 1).map((quiz) => (
            <motion.div
              key={quiz.id}
              className="continue-card"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="continue-icon">{quiz.icon}</div>
              <div className="continue-info">
                <h3 className="continue-title">{quiz.title}</h3>
                <div className="progress-container">
                  <span className="progress-text">Progress {quiz.progress}%</span>
                  <div className="progress-bar">
                    <motion.div 
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${quiz.progress}%` }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </div>
                </div>
              </div>
              <ChevronRight size={24} className="continue-arrow" />
            </motion.div>
          ))}
        </motion.div>

        {/* All quizzes */}
        <motion.div 
          className="quizzes-section"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="section-title">All Quizzes</h2>
          
          <div className="quizzes-list">
            {quizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                className={`quiz-card ${!quiz.unlocked ? 'locked' : ''} ${quiz.progress === 100 ? 'completed' : ''}`}
                variants={itemVariants}
                whileHover={quiz.unlocked ? { scale: 1.02, x: 4 } : {}}
                whileTap={quiz.unlocked ? { scale: 0.98 } : {}}
                onClick={() => quiz.unlocked && setSelectedQuiz(quiz)}
              >
                <div className="quiz-icon-wrapper">
                  <span className="quiz-icon">{quiz.icon}</span>
                  {!quiz.unlocked && (
                    <div className="lock-overlay">
                      <Lock size={16} />
                    </div>
                  )}
                  {quiz.progress === 100 && (
                    <div className="complete-badge">
                      <CheckCircle size={16} />
                    </div>
                  )}
                </div>
                
                <div className="quiz-info">
                  <h3 className="quiz-title">{quiz.title}</h3>
                  <p className="quiz-description">{quiz.description}</p>
                  {quiz.unlocked && quiz.progress > 0 && (
                    <div className="quiz-progress">
                      <div className="mini-progress-bar">
                        <div 
                          className="mini-progress-fill"
                          style={{ width: `${quiz.progress}%` }}
                        />
                      </div>
                      <span className="quiz-progress-text">
                        {quiz.completed}/{quiz.totalQuestions}
                      </span>
                    </div>
                  )}
                </div>

                <ChevronRight 
                  size={20} 
                  className={`quiz-arrow ${!quiz.unlocked ? 'hidden' : ''}`}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievement hint */}
        <motion.div 
          className="achievement-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Star size={16} />
          <span>Complete 3 more quizzes to become a Myth Buster!</span>
        </motion.div>
      </div>
    </div>
  )
}

export default QuizPage
