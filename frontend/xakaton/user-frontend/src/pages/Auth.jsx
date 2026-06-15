import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const { login, register } = useAuthStore()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    let result
    if (isLogin) {
      result = await login(email, password)
    } else {
      if (name.length < 2) {
        setError('Имя должно содержать минимум 2 символа')
        setLoading(false)
        return
      }
      result = await register({ email, password, name })
    }
    
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error || 'Ошибка')
    }
    setLoading(false)
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1115] p-4">
      <div className="w-full max-w-md bg-[#1A1D24] rounded-xl p-8 border border-gray-800">
        <h1 className="text-3xl font-bold text-center text-[#00D4FF] mb-2">CipherLab</h1>
        <p className="text-gray-400 text-center mb-8">Интерактивное обучение шифрам</p>
        
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg ${isLogin ? 'bg-[#00D4FF] text-black' : 'bg-gray-800 text-gray-400'}`}
          >
            Вход
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg ${!isLogin ? 'bg-[#00D4FF] text-black' : 'bg-gray-800 text-gray-400'}`}
          >
            Регистрация
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0F1115] border border-gray-700 rounded-lg px-4 py-2 text-white"
              required
            />
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0F1115] border border-gray-700 rounded-lg px-4 py-2 text-white"
            required
          />
          
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0F1115] border border-gray-700 rounded-lg px-4 py-2 text-white"
            required
          />
          
          {error && (
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-3 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00D4FF] text-black font-semibold py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-gray-800">
          <p className="text-xs text-gray-500 text-center">Тестовые данные:</p>
          <p className="text-xs text-gray-500 text-center">admin@cipherlab.com / любой пароль</p>
          <p className="text-xs text-gray-500 text-center">user@cipherlab.com / любой пароль</p>
        </div>
      </div>
    </div>
  )
}