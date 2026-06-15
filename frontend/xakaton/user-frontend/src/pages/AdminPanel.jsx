import { useState } from 'react'
import { Users, Shield, Activity, Ban, CheckCircle, Eye, MoreVertical } from 'lucide-react'

export default function AdminPanel() {
  const [users] = useState([
    { id: 1, name: 'Admin User', email: 'admin@cipherlab.com', role: 'admin', xp: 9999, status: 'active', lastActive: '2026-06-15 14:30' },
    { id: 2, name: 'John Doe', email: 'user@cipherlab.com', role: 'user', xp: 1250, status: 'active', lastActive: '2026-06-15 13:45' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'user', xp: 3450, status: 'active', lastActive: '2026-06-14 20:15' },
    { id: 4, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', xp: 780, status: 'blocked', lastActive: '2026-06-10 10:00' },
  ])

  const [logs] = useState([
    { id: 1, user: 'John Doe', action: 'Пройден уровень "Шифр Цезаря"', result: 'success', time: '14:30:25' },
    { id: 2, user: 'Jane Smith', action: 'Пройден уровень "XOR шифрование"', result: 'success', time: '14:28:12' },
    { id: 3, user: 'Bob Johnson', action: 'Попытка решения уровня 3', result: 'error', time: '14:25:03' },
    { id: 4, user: 'Admin User', action: 'Заблокирован пользователь Bob Johnson', result: 'admin', time: '14:20:00' },
    { id: 5, user: 'John Doe', action: 'Начал уровень "Шифр Виженера"', result: 'info', time: '14:15:30' },
  ])

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalXP: users.reduce((sum, u) => sum + u.xp, 0),
    avgAccuracy: 78
  }

  return (
    <div className="min-h-screen bg-[#0F1115] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#00D4FF] flex items-center gap-2">
            <Shield size={32} /> Админ-панель
          </h1>
          <p className="text-gray-400 mt-2">Управление пользователями и мониторинг системы</p>
        </div>
        
        {/* Статистика */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1A1D24] rounded-xl p-4 border border-gray-800">
            <Users className="text-[#00D4FF] mb-2" size={24} />
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <div className="text-sm text-gray-500">Всего пользователей</div>
          </div>
          
          <div className="bg-[#1A1D24] rounded-xl p-4 border border-gray-800">
            <Activity className="text-[#00FF94] mb-2" size={24} />
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <div className="text-sm text-gray-500">Активных</div>
          </div>
          
          <div className="bg-[#1A1D24] rounded-xl p-4 border border-gray-800">
            <Award className="text-yellow-500 mb-2" size={24} />
            <div className="text-2xl font-bold">{stats.totalXP}</div>
            <div className="text-sm text-gray-500">Всего XP</div>
          </div>
          
          <div className="bg-[#1A1D24] rounded-xl p-4 border border-gray-800">
            <Target className="text-purple-500 mb-2" size={24} />
            <div className="text-2xl font-bold">{stats.avgAccuracy}%</div>
            <div className="text-sm text-gray-500">Средняя точность</div>
          </div>
        </div>
        
        {/* Таблица пользователей */}
        <div className="bg-[#1A1D24] rounded-xl border border-gray-800 mb-8">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Users size={20} /> Управление пользователями
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0F1115] border-b border-gray-800">
                <tr>
                  <th className="text-left p-4 text-gray-400">Пользователь</th>
                  <th className="text-left p-4 text-gray-400">Роль</th>
                  <th className="text-left p-4 text-gray-400">XP</th>
                  <th className="text-left p-4 text-gray-400">Статус</th>
                  <th className="text-left p-4 text-gray-400">Последняя активность</th>
                  <th className="text-left p-4 text-gray-400">Действия</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-gray-800 hover:bg-[#0F1115]/50">
                    <td className="p-4">
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'admin' 
                          ? 'bg-[#00D4FF]/20 text-[#00D4FF]' 
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {user.role === 'admin' ? '👑 Админ' : '👤 Пользователь'}
                      </span>
                    </td>
                    <td className="p-4 font-mono">{user.xp} XP</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        user.status === 'active' 
                          ? 'bg-[#00FF94]/20 text-[#00FF94]' 
                          : 'bg-red-500/20 text-red-500'
                      }`}>
                        {user.status === 'active' ? <CheckCircle size={12} /> : <Ban size={12} />}
                        {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-400">{user.lastActive}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="p-1 hover:bg-gray-700 rounded">
                          <Eye size={16} />
                        </button>
                        {user.status === 'active' ? (
                          <button className="p-1 hover:bg-red-500/20 rounded text-red-500">
                            <Ban size={16} />
                          </button>
                        ) : (
                          <button className="p-1 hover:bg-[#00FF94]/20 rounded text-[#00FF94]">
                            <CheckCircle size={16} />
                          </button>
                        )}
                        <button className="p-1 hover:bg-gray-700 rounded">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Логи действий */}
        <div className="bg-[#1A1D24] rounded-xl border border-gray-800">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Activity size={20} /> Лог действий
            </h2>
          </div>
          
          <div className="divide-y divide-gray-800">
            {logs.map(log => (
              <div key={log.id} className="p-4 flex items-center justify-between hover:bg-[#0F1115]/50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    log.result === 'success' ? 'bg-[#00FF94]' : 
                    log.result === 'error' ? 'bg-red-500' : 'bg-[#00D4FF]'
                  }`} />
                  <div>
                    <div className="font-semibold text-sm">{log.user}</div>
                    <div className="text-sm text-gray-400">{log.action}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 font-mono">{log.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}