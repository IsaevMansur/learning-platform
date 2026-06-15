import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Award, Lock, Star, Zap, Brain, Code, Shield, Trophy, Target, ArrowLeft, CheckCircle } from 'lucide-react'

export default function Achievements() {
  const navigate = useNavigate()
  
  const [achievements] = useState([
    {
      id: 1,
      title: 'Шифр Цезаря',
      description: 'Успешно пройден первый уровень',
      reward: '+100 XP',
      unlocked: true,
      icon: Star,
      color: '#00FF94',
      date: '15 июня 2026',
      requirement: 'Пройдите уровень "Шифр Цезаря"'
    },
    {
      id: 2,
      title: 'Первое решение',
      description: 'Решено 5 заданий',
      reward: '+50 XP',
      unlocked: true,
      icon: Zap,
      color: '#00D4FF',
      date: '15 июня 2026',
      requirement: 'Решите 5 задач'
    },
    {
      id: 3,
      title: 'Шифр Виженера',
      description: 'Пройден уровень 2',
      reward: '+150 XP',
      unlocked: false,
      icon: Brain,
      color: '#FFD700',
      date: null,
      requirement: 'Пройдите уровень "Шифр Виженера"'
    },
    {
      id: 4,
      title: 'Криптоаналитик',
      description: 'Взломано 10 шифров',
      reward: '+200 XP',
      unlocked: false,
      icon: Code,
      color: '#9C27B0',
      date: null,
      requirement: 'Решите 10 задач'
    },
    {
      id: 5,
      title: 'Мастер шифров',
      description: 'Пройдены все уровни',
      reward: '+500 XP',
      unlocked: false,
      icon: Trophy,
      color: '#FF6B35',
      date: null,
      requirement: 'Пройдите все уровни'
    },
    {
      id: 6,
      title: 'Защитник данных',
      description: 'Изучены методы шифрования',
      reward: '+300 XP',
      unlocked: false,
      icon: Shield,
      color: '#4CAF50',
      date: null,
      requirement: 'Изучите 3 разных шифра'
    },
    {
      id: 7,
      title: 'Скоростной режим',
      description: 'Пройден уровень за 5 минут',
      reward: '+100 XP',
      unlocked: false,
      icon: Target,
      color: '#E91E63',
      date: null,
      requirement: 'Пройдите любой уровень быстрее 5 минут'
    },
    {
      id: 8,
      title: 'Идеальное решение',
      description: 'Пройден уровень с первой попытки',
      reward: '+200 XP',
      unlocked: false,
      icon: CheckCircle,
      color: '#2196F3',
      date: null,
      requirement: 'Пройдите уровень без ошибок'
    },
    {
      id: 9,
      title: 'Эксперт',
      description: 'Накоплено 5000 XP',
      reward: '+1000 XP',
      unlocked: false,
      icon: Award,
      color: '#FFC107',
      date: null,
      requirement: 'Наберите 5000 опыта'
    }
  ])

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalXP = achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + parseInt(a.reward.match(/\d+/)?.[0] || 0), 0)
  
  const nextMilestone = achievements.find(a => !a.unlocked)
  const progressPercent = (unlockedCount / achievements.length) * 100

  return (
    <div className="min-h-screen bg-[#0F1115]">
      {/* Header с кнопкой назад */}
      <div className="bg-[#1A1D24] border-b border-gray-800 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} /> Назад
          </button>
          <h1 className="text-2xl font-bold text-[#00D4FF]">Достижения</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Статистика */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-[#1A1D24] to-[#0F1115] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Разблокировано</p>
                <p className="text-3xl font-bold text-[#00FF94]">{unlockedCount}/{achievements.length}</p>
              </div>
              <Trophy size={40} className="text-[#FFD700] opacity-50" />
            </div>
            <div className="mt-3">
              <div className="w-full bg-[#0F1115] rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#00D4FF] to-[#00FF94] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#1A1D24] to-[#0F1115] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Всего получено XP</p>
                <p className="text-3xl font-bold text-[#00D4FF]">+{totalXP}</p>
              </div>
              <Award size={40} className="text-[#00D4FF] opacity-50" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#1A1D24] to-[#0F1115] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Следующая цель</p>
                <p className="text-lg font-semibold text-white">{nextMilestone?.title || 'Все достижения получены!'}</p>
              </div>
              <Target size={40} className="text-[#FF6B35] opacity-50" />
            </div>
          </div>
        </div>

        {/* Мотивационная строка */}
        {progressPercent < 100 && (
          <div className="bg-gradient-to-r from-[#1A1D24] to-[#0F1115] rounded-xl p-4 border border-gray-800 mb-8 text-center">
            <p className="text-gray-400">
              ⭐ Осталось разблокировать {achievements.length - unlockedCount} достижений до статуса "Мастер шифров"
            </p>
          </div>
        )}

        {progressPercent === 100 && (
          <div className="bg-gradient-to-r from-[#00FF94]/20 to-[#00D4FF]/20 rounded-xl p-4 border border-[#00FF94] mb-8 text-center">
            <p className="text-[#00FF94] font-semibold">
              🎉 ПОЗДРАВЛЯЕМ! Ты собрал все достижения! Ты настоящий Мастер шифров! 🎉
            </p>
          </div>
        )}
        
        {/* Сетка достижений */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map(achievement => {
            const Icon = achievement.icon
            const isUnlocked = achievement.unlocked
            
            return (
              <div
                key={achievement.id}
                className={`group relative bg-[#1A1D24] rounded-xl p-6 border transition-all duration-300 ${
                  isUnlocked 
                    ? 'border-gray-700 hover:border-[#00FF94] hover:shadow-lg hover:shadow-[#00FF94]/20 hover:scale-105 cursor-pointer' 
                    : 'border-gray-800 opacity-60'
                }`}
              >
                {/* Glow эффект для unlocked */}
                {isUnlocked && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FF94]/5 to-transparent rounded-xl pointer-events-none" />
                )}
                
                <div className="text-center relative">
                  {/* Иконка */}
                  <div 
                    className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                      isUnlocked 
                        ? 'bg-gradient-to-br shadow-lg' 
                        : 'bg-gray-800'
                    }`}
                    style={isUnlocked ? { 
                      background: `linear-gradient(135deg, ${achievement.color}20, ${achievement.color}40)`,
                      boxShadow: `0 0 30px ${achievement.color}40`
                    } : {}}
                  >
                    <Icon 
                      size={48} 
                      style={isUnlocked ? { color: achievement.color } : { color: '#4B5563' }}
                    />
                  </div>
                  
                  {/* Название */}
                  <h3 className={`text-xl font-bold mb-2 transition-colors ${
                    isUnlocked ? 'text-white' : 'text-gray-500'
                  }`}>
                    {isUnlocked ? achievement.title : '???'}
                  </h3>
                  
                  {/* Описание */}
                  <p className="text-sm text-gray-400 mb-3">
                    {isUnlocked ? achievement.description : '❓❓❓'}
                  </p>
                  
                  {/* Награда */}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                    isUnlocked 
                      ? 'bg-[#00FF94]/20 text-[#00FF94]' 
                      : 'bg-gray-800 text-gray-500'
                  }`}>
                    {isUnlocked ? achievement.reward : '??? XP'}
                  </div>
                  
                  {/* Требование для получения */}
                  {!isUnlocked && (
                    <div className="mt-2 text-xs text-gray-600">
                      <Lock size={12} className="inline mr-1" />
                      {achievement.requirement}
                    </div>
                  )}
                  
                  {/* Дата получения */}
                  {isUnlocked && achievement.date && (
                    <div className="text-xs text-gray-500 mt-2">
                      🎯 Получено: {achievement.date}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Секретное сообщение для коллекционеров */}
        {unlockedCount === achievements.length && (
          <div className="mt-12 text-center animate-pulse">
            <div className="inline-block bg-gradient-to-r from-[#FFD700] to-[#FF6B35] rounded-xl p-8">
              <Trophy size={64} className="mx-auto mb-4 text-white" />
              <h2 className="text-2xl font-bold text-white mb-2">Легенда криптографии!</h2>
              <p className="text-white/90">Ты вошел в историю как мастер шифров! 🏆</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}