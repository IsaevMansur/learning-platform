import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { api } from '../utils/api'

export default function LevelWorkspace() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [level, setLevel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userInput, setUserInput] = useState('')
  const [output, setOutput] = useState('')
  const [logs, setLogs] = useState([])

  const addLog = (message, type) => {
    setLogs(prev => [...prev, { message, type, time: new Date().toLocaleTimeString() }])
  }

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        setLoading(true)
        const data = await api.getLevel(id)
        const levelData = data.level || data
        setLevel(levelData)
        setUserInput(levelData.encryptedText || '')
        addLog(`Загружен уровень: ${levelData.name}`, 'info')
        setError(null)
      } catch (err) {
        setError(err.error || 'Ошибка загрузки задания')
      } finally {
        setLoading(false)
      }
    }

    fetchLevel()
  }, [id])

  const caesarCipher = (text, shift) => {
    return text.split('').map(char => {
      if (char.match(/[a-zA-Z]/)) {
        const code = char.charCodeAt(0)
        const isUpper = code >= 65 && code <= 90
        const base = isUpper ? 65 : 97
        let newCode = ((code - base - shift) % 26)
        if (newCode < 0) newCode += 26
        return String.fromCharCode(base + newCode)
      }
      return char
    }).join('')
  }

  useEffect(() => {
    if (level && level.id === 1) {
      setOutput(caesarCipher(userInput, 3))
    } else if (level && level.id === 2) {
      setOutput(userInput.toLowerCase())
    }
  }, [userInput, level])

  const checkSolution = () => {
    if (output.toLowerCase().trim() === level.answer) {
      addLog('✅ Правильно! Уровень пройден!', 'success')
      alert('Поздравляю! Уровень пройден!')
      navigate('/levels')
    } else {
      addLog('❌ Неправильно! Попробуй еще раз', 'error')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1115] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D4FF] mx-auto mb-4"></div>
          <p className="text-gray-400">Загрузка задания...</p>
        </div>
      </div>
    )
  }

  if (error || !level) {
    return (
      <div className="min-h-screen bg-[#0F1115] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Задание не найдено'}</p>
          <button
            onClick={() => navigate('/levels')}
            className="px-4 py-2 bg-[#00D4FF] text-black rounded-lg"
          >
            К списку уровней
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F1115] p-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('/levels')} className="text-gray-400 hover:text-white mb-6 flex items-center gap-2">
          <ArrowLeft size={20} /> Назад
        </button>

        <div className="bg-[#1A1D24] rounded-xl p-6 mb-6">
          <h1 className="text-2xl font-bold text-[#00D4FF] mb-4">Уровень {id}: {level.name}</h1>
          <p className="text-gray-300 mb-4">{level.task}</p>
          <div className="bg-[#0F1115] rounded-lg p-4">
            <p className="text-gray-400 mb-2">Зашифрованный текст:</p>
            <code className="text-[#00FF94]">{level.encryptedText}</code>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="bg-[#1A1D24] rounded-xl p-6">
            <label className="block text-gray-400 mb-2">Введите текст для расшифровки:</label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full bg-[#0F1115] border border-gray-700 rounded-lg p-4 text-white font-mono"
              rows={3}
            />
          </div>

          <div className="bg-[#1A1D24] rounded-xl p-6 border border-[#00FF94]">
            <label className="block text-[#00FF94] mb-2">Результат расшифровки:</label>
            <div className="bg-[#0F1115] rounded-lg p-4 text-white font-mono">
              {output || 'Результат появится здесь...'}
            </div>
          </div>

          <button
            onClick={checkSolution}
            className="w-full py-3 bg-gradient-to-r from-[#00FF94] to-[#00D4FF] text-black font-bold rounded-lg"
          >
            Проверить решение
          </button>

          <div className="bg-[#0F1115] rounded-xl p-4">
            <p className="text-gray-400 text-sm font-mono">
              {logs.map((log, i) => (
                <div key={i} className={log.type === 'success' ? 'text-[#00FF94]' : log.type === 'error' ? 'text-red-500' : 'text-gray-400'}>
                  &gt; {log.message} <span className="text-gray-600">[{log.time}]</span>
                </div>
              ))}
              <span className="animate-pulse">_</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
