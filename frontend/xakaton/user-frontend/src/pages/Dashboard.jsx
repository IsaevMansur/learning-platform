import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { LogOut, User, Award, BookOpen } from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  
  const handleLogout = async () => {
    await logout()
    navigate('/auth')
  }
  
  return (
    <div className="min-h-screen bg-[#0F1115]">
      {/* Шапка с навигацией */}
      <div className="bg-[#1A1D24] border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#00D4FF]">CipherLab</h1>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/levels')}
              className="flex items-center gap-2 px-4 py-2 bg-[#00FF94]/10 text-[#00FF94] rounded-lg hover:bg-[#00FF94]/20 transition-colors"
            >
              <BookOpen size={18} /> Уровни
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <User size={18} /> Профиль
            </button>
            <button
              onClick={() => navigate('/achievements')}
              className="flex items-center gap-2 px-4 py-2 bg-[#00D4FF]/10 text-[#00D4FF] rounded-lg hover:bg-[#00D4FF]/20 transition-colors"
            >
              <Award size={18} /> Достижения
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <LogOut size={18} /> Выйти
            </button>
          </div>
        </div>
      </div>
      
      {/* Контент */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-gradient-to-r from-[#1A1D24] to-[#0F1115] rounded-xl p-6 border border-gray-800 mb-6">
          <h2 className="text-2xl font-bold mb-2">
            Добро пожаловать, {user?.name}! 👋
          </h2>
          <p className="text-gray-400">Твоя роль: {user?.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
          <p className="text-gray-400">Опыт: {user?.xp || 0} XP</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#1A1D24] rounded-xl p-6 border border-gray-800 hover:border-[#00FF94] transition-all cursor-pointer" onClick={() => navigate('/levels')}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#00FF94]/20 rounded-lg flex items-center justify-center">
                <BookOpen size={24} className="text-[#00FF94]" />
              </div>
              <h3 className="text-xl font-semibold">Уровни</h3>
            </div>
            <p className="text-gray-400 mb-4">Проходи уровни и повышай свои навыки</p>
            <button className="px-4 py-2 bg-[#00FF94] text-black rounded-lg font-semibold">
              Начать обучение →
            </button>
          </div>
          
          <div className="bg-[#1A1D24] rounded-xl p-6 border border-gray-800 hover:border-[#00D4FF] transition-all cursor-pointer" onClick={() => navigate('/profile')}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#00D4FF]/20 rounded-lg flex items-center justify-center">
                <User size={24} className="text-[#00D4FF]" />
              </div>
              <h3 className="text-xl font-semibold">Профиль</h3>
            </div>
            <p className="text-gray-400 mb-4">Управляй своими данными и статистикой</p>
            <button className="px-4 py-2 bg-[#00D4FF] text-black rounded-lg font-semibold">
              Перейти в профиль →
            </button>
          </div>
          
          <div className="bg-[#1A1D24] rounded-xl p-6 border border-gray-800 hover:border-[#FFD700] transition-all cursor-pointer" onClick={() => navigate('/achievements')}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#FFD700]/20 rounded-lg flex items-center justify-center">
                <Award size={24} className="text-[#FFD700]" />
              </div>
              <h3 className="text-xl font-semibold">Достижения</h3>
            </div>
            <p className="text-gray-400 mb-4">Смотри свои достижения и награды</p>
            <button className="px-4 py-2 bg-[#FFD700] text-black rounded-lg font-semibold">
              Посмотреть достижения →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}