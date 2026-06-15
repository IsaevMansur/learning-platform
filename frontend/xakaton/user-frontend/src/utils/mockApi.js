// Минимальная рабочая версия mockApi
const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@cipherlab.com',
    name: 'Admin',
    role: 'admin',
    xp: 9999,
    level: 'Эксперт'
  },
  {
    id: 2,
    email: 'user@cipherlab.com',
    name: 'User',
    role: 'user',
    xp: 1250,
    level: 'Продвинутый'
  }
]

let currentUser = null

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
  }
  return btoa(JSON.stringify(payload))
}

export const mockApi = {
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const user = MOCK_USERS.find(u => u.email === email)
    if (!user) {
      throw { error: 'Неверный email или пароль' }
    }
    
    const token = generateToken(user)
    localStorage.setItem('accessToken', token)
    currentUser = user
    
    return {
      success: true,
      token,
      user: { ...user, password: undefined }
    }
  },
  
  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newUser = {
      id: MOCK_USERS.length + 1,
      email: userData.email,
      name: userData.name,
      role: 'user',
      xp: 0,
      level: 'Новичок'
    }
    
    MOCK_USERS.push(newUser)
    const token = generateToken(newUser)
    localStorage.setItem('accessToken', token)
    currentUser = newUser
    
    return {
      success: true,
      token,
      user: newUser
    }
  },
  
  logout: async () => {
    localStorage.removeItem('accessToken')
    currentUser = null
    return { success: true }
  },
  
  getCurrentUser: async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      throw { error: 'Не авторизован' }
    }
    
    if (currentUser) {
      return { user: currentUser }
    }
    
    throw { error: 'Пользователь не найден' }
  },
  
  getLevels: async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      levels: [
        { id: 1, name: 'Шифр Цезаря', description: 'Изучи основы', status: 'available', xpReward: 100 },
        { id: 2, name: 'Шифр Виженера', description: 'Сложнее', status: 'locked', xpReward: 150 },
        { id: 3, name: 'XOR шифрование', description: 'Побитовое', status: 'locked', xpReward: 200 }
      ]
    }
  },
  
  updateProfile: async (data) => {
    if (currentUser && data.name) {
      currentUser.name = data.name
      return { user: currentUser }
    }
    throw { error: 'Ошибка обновления' }
  },
  
  changePassword: async (oldPassword, newPassword) => {
    return { success: true }
  },
  
  getAchievements: async () => {
    return {
      achievements: [
        { id: 1, title: 'Первый уровень', description: 'Пройден уровень 1', unlocked: false, xp: 100 },
        { id: 2, title: 'Мастер', description: 'Пройдены все уровни', unlocked: false, xp: 500 }
      ]
    }
  },
  
  isTokenValid: () => {
    const token = localStorage.getItem('accessToken')
    if (!token) return false
    try {
      const payload = JSON.parse(atob(token))
      return payload.exp > Date.now() / 1000
    } catch {
      return false
    }
  }
}