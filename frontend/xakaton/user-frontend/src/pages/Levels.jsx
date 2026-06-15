import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, Lock, CheckCircle, Play, Star, 
  Zap, Trophy, Target, Clock, Award, BookOpen 
} from 'lucide-react'
import { api } from '../utils/api'

const DIFFICULTY_ICONS = {
  easy: Star,
  medium: BookOpen,
  hard: Target,
  expert: Trophy,
}

const DIFFICULTY_COLORS = {
  easy: '#00FF94',
  medium: '#00D4FF',
  hard: '#FF6B35',
  expert: '#9C27B0',
}

const enrichLevel = (level) => ({
  ...level,
  icon: DIFFICULTY_ICONS[level.difficulty] || Zap,
  color: DIFFICULTY_COLORS[level.difficulty] || '#00D4FF',
})

export default function Levels() {
  const navigate = useNavigate()
  const [levels, setLevels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setLoading(true)
        const data = await api.getLevels()
        setLevels((data.levels || []).map(enrichLevel))
        setError(null)
      } catch (err) {
        setError(err.error || 'Ошибка загрузки уровней')
      } finally {
        setLoading(false)
      }
    }

    fetchLevels()
  }, [])

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-500'
      case 'medium': return 'bg-blue-500/20 text-blue-500'
      case 'hard': return 'bg-orange-500/20 text-orange-500'
      case 'expert': return 'bg-purple-500/20 text-purple-500'
      default: return 'bg-gray-700 text-gray-300'
    }
  }

  const getDifficultyName = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'Легкий'
      case 'medium': return 'Средний'
      case 'hard': return 'Сложный'
      case 'expert': return 'Эксперт'
      default: return difficulty
    }
  }

  const filteredLevels = selectedDifficulty === 'all' 
    ? levels 
    : levels.filter(l => l.difficulty === selectedDifficulty)

  const completedCount = levels.filter(l => l.status === 'completed').length
  const totalXPFromLevels = levels.reduce((sum, l) => sum + (l.status === 'completed' ? l.xpReward : 0), 0)

  const handleLevelClick = (level) => {
    if (level.status !== 'locked') {
      navigate(`/level/${level.id}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1115] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D4FF] mx-auto mb-4"></div>
          <p className="text-gray-400">Загрузка уровней...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F1115] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-[#00D4FF] text-black rounded-lg"
          >
            На главную
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F1115]">
      <div className="bg-[#1A1D24] border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} /> Назад
            </button>
            <h1 className="text-2xl font-bold text-[#00D4FF]">Карта уровней</h1>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#0F1115] rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Пройдено</div>
              <div className="text-xl font-bold text-[#00FF94]">{completedCount}/{levels.length}</div>
            </div>
            <div className="bg-[#0F1115] rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Доступно</div>
              <div className="text-xl font-bold text-[#00D4FF]">{levels.filter(l => l.status === 'available').length}</div>
            </div>
            <div className="bg-[#0F1115] rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Получено XP</div>
              <div className="text-xl font-bold text-[#FFD700]">{totalXPFromLevels}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedDifficulty('all')}
            className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
              selectedDifficulty === 'all' 
                ? 'bg-[#00D4FF] text-black' 
                : 'bg-[#1A1D24] text-gray-400 hover:bg-gray-800'
            }`}
          >
            Все уровни
          </button>
          <button
            onClick={() => setSelectedDifficulty('easy')}
            className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
              selectedDifficulty === 'easy' 
                ? 'bg-green-500 text-white' 
                : 'bg-[#1A1D24] text-gray-400 hover:bg-gray-800'
            }`}
          >
            🟢 Легкие
          </button>
          <button
            onClick={() => setSelectedDifficulty('medium')}
            className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
              selectedDifficulty === 'medium' 
                ? 'bg-blue-500 text-white' 
                : 'bg-[#1A1D24] text-gray-400 hover:bg-gray-800'
            }`}
          >
            🔵 Средние
          </button>
          <button
            onClick={() => setSelectedDifficulty('hard')}
            className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
              selectedDifficulty === 'hard' 
                ? 'bg-orange-500 text-white' 
                : 'bg-[#1A1D24] text-gray-400 hover:bg-gray-800'
            }`}
          >
            🟠 Сложные
          </button>
          <button
            onClick={() => setSelectedDifficulty('expert')}
            className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
              selectedDifficulty === 'expert' 
                ? 'bg-purple-500 text-white' 
                : 'bg-[#1A1D24] text-gray-400 hover:bg-gray-800'
            }`}
          >
            🟣 Эксперт
          </button>
        </div>

        <div className="bg-[#1A1D24] rounded-xl p-4 border border-gray-800 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Общий прогресс</span>
            <span className="text-[#00D4FF]">{Math.round((completedCount / levels.length) * 100)}%</span>
          </div>
          <div className="w-full bg-[#0F1115] rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#00D4FF] to-[#00FF94] h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / levels.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLevels.map((level) => {
            const Icon = level.icon
            const isLocked = level.status === 'locked'
            const isCompleted = level.status === 'completed'
            
            return (
              <div
                key={level.id}
                onClick={() => handleLevelClick(level)}
                className={`
                  bg-[#1A1D24] rounded-xl border transition-all duration-300 overflow-hidden cursor-pointer
                  ${isLocked 
                    ? 'border-gray-800 opacity-60 cursor-not-allowed' 
                    : isCompleted
                    ? 'border-[#00FF94] hover:shadow-lg hover:shadow-[#00FF94]/20'
                    : 'border-[#00D4FF] hover:shadow-lg hover:shadow-[#00D4FF]/20 animate-pulse'
                  }
                `}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/5">
                        <Icon size={24} style={{ color: level.color }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{level.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(level.difficulty)}`}>
                          {getDifficultyName(level.difficulty)}
                        </span>
                      </div>
                    </div>
                    
                    {isCompleted && <CheckCircle size={24} className="text-[#00FF94]" />}
                    {isLocked && <Lock size={20} className="text-gray-500" />}
                    {!isLocked && !isCompleted && <Play size={20} className="text-[#00D4FF]" />}
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-4">{level.description}</p>
                  
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock size={14} />
                        <span>{level.timeEstimate}</span>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Award size={14} />
                        <span>{level.xpReward} XP</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full py-2 rounded-lg font-semibold transition-all bg-[#00D4FF] text-black hover:opacity-90">
                    {isCompleted ? 'Пройден ✓' : 'Начать уровень →'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

