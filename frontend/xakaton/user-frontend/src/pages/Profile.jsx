import { useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { User, Award, Target, Calendar, Edit2, Save, Lock, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  const { user, setUser } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(user?.name || '')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  const showMessage = (text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleSaveProfile = () => {
    if (editName.trim().length < 2) {
      showMessage('Имя должно содержать минимум 2 символа', 'error')
      return
    }
    setUser({ ...user, name: editName })
    setIsEditing(false)
    showMessage('Имя успешно обновлено!', 'success')
  }

  const handleChangePassword = () => {
    if (oldPassword.length < 1) {
      showMessage('Введите старый пароль', 'error')
      return
    }
    if (newPassword.length < 6) {
      showMessage('Новый пароль должен быть не менее 6 символов', 'error')
      return
    }
    showMessage('Пароль успешно изменен!', 'success')
    setOldPassword('')
    setNewPassword('')
    setShowPasswordForm(false)
  }

  // Статистика пользователя
  const stats = {
    totalLevels: 12,
    completedLevels: user?.completedLevels || 3,
    accuracy: user?.accuracy || 75,
    joinDate: user?.createdAt || '15 июня 2026'
  }

  return (
    <div className="min-h-screen bg-[#0F1115]">
      {/* Header с кнопкой назад */}
      <div className="bg-[#1A1D24] border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} /> Назад
          </button>
          <h1 className="text-2xl font-bold text-[#00D4FF]">Профиль</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Сообщение */}
        {message && (
          <div className={`mb-6 p-3 rounded-lg ${
            messageType === 'success' 
              ? 'bg-[#00FF94]/10 border border-[#00FF94] text-[#00FF94]' 
              : 'bg-red-500/10 border border-red-500 text-red-500'
          }`}>
            {message}
          </div>
        )}
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Левая колонка - аватар и информация */}
          <div className="md:col-span-1">
            <div className="bg-[#1A1D24] rounded-xl p-6 border border-gray-800">
              <div className="text-center">
                {/* Аватар */}
                <div className="w-28 h-28 mx-auto bg-gradient-to-br from-[#00D4FF] to-[#00FF94] rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-black">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                
                {/* Имя пользователя */}
                {isEditing ? (
                  <div className="mb-4">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-[#0F1115] border border-gray-700 rounded-lg px-3 py-2 text-center text-white"
                      autoFocus
                    />
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={handleSaveProfile}
                        className="flex-1 bg-[#00FF94] text-black px-3 py-2 rounded-lg flex items-center justify-center gap-2 font-semibold"
                      >
                        <Save size={16} /> Сохранить
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <h2 className="text-2xl font-bold">{user?.name}</h2>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-gray-400 hover:text-[#00D4FF] transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                  </div>
                )}
                
                <p className="text-gray-400 text-sm mb-2">{user?.email}</p>
                <p className="inline-block px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-300">
                  {user?.role === 'admin' ? '👑 Администратор' : '👤 Пользователь'}
                </p>
              </div>
              
              {/* Смена пароля */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                {!showPasswordForm ? (
                  <button
                    onClick={() => setShowPasswordForm(true)}
                    className="w-full bg-gray-800 text-gray-300 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
                  >
                    <Lock size={16} /> Сменить пароль
                  </button>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Старый пароль"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full bg-[#0F1115] border border-gray-700 rounded-lg px-3 py-2 text-white"
                    />
                    <input
                      type="password"
                      placeholder="Новый пароль"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-[#0F1115] border border-gray-700 rounded-lg px-3 py-2 text-white"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleChangePassword}
                        className="flex-1 bg-[#00D4FF] text-black px-3 py-2 rounded-lg font-semibold"
                      >
                        Сохранить
                      </button>
                      <button
                        onClick={() => setShowPasswordForm(false)}
                        className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Правая колонка - статистика */}
          <div className="md:col-span-2">
            {/* Карточка XP */}
            <div className="bg-[#1A1D24] rounded-xl p-6 border border-gray-800 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Твой прогресс</h3>
                <Target className="text-[#00D4FF]" size={24} />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#00FF94] mb-2">{user?.xp || 0} XP</div>
                <div className="w-full bg-[#0F1115] rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-[#00D4FF] to-[#00FF94] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${((user?.xp || 0) / 2000) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">До следующего уровня: {2000 - (user?.xp || 0)} XP</p>
              </div>
            </div>
            
            {/* Статистика */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#1A1D24] rounded-xl p-4 border border-gray-800 text-center">
                <Award className="mx-auto mb-2 text-[#00D4FF]" size={24} />
                <div className="text-2xl font-bold">{stats.completedLevels}/{stats.totalLevels}</div>
                <div className="text-sm text-gray-500">Пройдено уровней</div>
              </div>
              
              <div className="bg-[#1A1D24] rounded-xl p-4 border border-gray-800 text-center">
                <Target className="mx-auto mb-2 text-[#00FF94]" size={24} />
                <div className="text-2xl font-bold">{stats.accuracy}%</div>
                <div className="text-sm text-gray-500">Точность решений</div>
              </div>
              
              <div className="bg-[#1A1D24] rounded-xl p-4 border border-gray-800 text-center">
                <Calendar className="mx-auto mb-2 text-gray-400" size={24} />
                <div className="text-sm font-mono text-white">{stats.joinDate}</div>
                <div className="text-sm text-gray-500">Дата регистрации</div>
              </div>
            </div>
            
            {/* Последние достижения */}
            <div className="bg-[#1A1D24] rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold mb-4">🎖️ Последние достижения</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#0F1115] rounded-lg">
                  <div className="w-10 h-10 bg-[#00FF94]/20 rounded-full flex items-center justify-center">
                    <Award size={20} className="text-[#00FF94]" />
                  </div>
                  <div>
                    <div className="font-semibold">Шифр Цезаря</div>
                    <div className="text-sm text-gray-500">Пройден уровень 1</div>
                  </div>
                  <div className="ml-auto text-[#00FF94]">+100 XP</div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-[#0F1115] rounded-lg">
                  <div className="w-10 h-10 bg-[#00D4FF]/20 rounded-full flex items-center justify-center">
                    <Target size={20} className="text-[#00D4FF]" />
                  </div>
                  <div>
                    <div className="font-semibold">Первое решение</div>
                    <div className="text-sm text-gray-500">Решено 5 заданий</div>
                  </div>
                  <div className="ml-auto text-[#00FF94]">+50 XP</div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-[#0F1115] rounded-lg opacity-50">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                    <Lock size={20} className="text-gray-500" />
                  </div>
                  <div>
                    <div className="font-semibold">Мастер шифров</div>
                    <div className="text-sm text-gray-500">Пройди 10 уровней</div>
                  </div>
                  <div className="ml-auto text-gray-500">Закрыто</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}