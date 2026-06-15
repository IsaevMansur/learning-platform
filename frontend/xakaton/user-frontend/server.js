import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const app = express()
const PORT = 5000
const SECRET_KEY = 'your-secret-key-cipherlab-2026'

app.use(cors())
app.use(express.json())

// База данных пользователей (в памяти)
let users = [
  {
    id: 1,
    email: 'admin@cipherlab.com',
    password: '$2a$10$YourHashedPasswordHere', // admin123
    name: 'Admin User',
    role: 'admin',
    xp: 9999,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    email: 'user@cipherlab.com',
    password: '$2a$10$YourHashedPasswordHere', // user123
    name: 'John Doe',
    role: 'user',
    xp: 1250,
    createdAt: new Date().toISOString()
  }
]

// Хешируем пароли для тестовых пользователей
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10)
}

// Инициализация тестовых пользователей с хешами
const initUsers = async () => {
  if (users[0].password === 'admin123') {
    users[0].password = await hashPassword('admin123')
    users[1].password = await hashPassword('user123')
  }
}
initUsers()

// Middleware для проверки JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ error: 'Токен не предоставлен' })
  }
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Недействительный токен' })
    }
    req.user = user
    next()
  })
}

// ============= AUTH ENDPOINTS =============

// Регистрация
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body
    
    // Проверка существующего пользователя
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует' })
    }
    
    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Создание нового пользователя
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      name,
      role: 'user',
      xp: 0,
      createdAt: new Date().toISOString()
    }
    
    users.push(newUser)
    
    // Создание JWT токена
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      SECRET_KEY,
      { expiresIn: '7d' }
    )
    
    // Отправка данных без пароля
    const { password: _, ...userWithoutPassword } = newUser
    
    res.status(201).json({
      success: true,
      token,
      user: userWithoutPassword
    })
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при регистрации' })
  }
})

// Логин
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    // Поиск пользователя
    const user = users.find(u => u.email === email)
    if (!user) {
      return res.status(401).json({ error: 'Неверный email или пароль' })
    }
    
    // Проверка пароля
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Неверный email или пароль' })
    }
    
    // Создание JWT токена
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '7d' }
    )
    
    // Отправка данных без пароля
    const { password: _, ...userWithoutPassword } = user
    
    res.json({
      success: true,
      token,
      user: userWithoutPassword
    })
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при входе' })
  }
})

// Получение текущего пользователя
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id)
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' })
    }
    
    const { password: _, ...userWithoutPassword } = user
    res.json({ user: userWithoutPassword })
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении данных' })
  }
})

// Обновление профиля
app.put('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const { name, currentPassword, newPassword } = req.body
    const userIndex = users.findIndex(u => u.id === req.user.id)
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'Пользователь не найден' })
    }
    
    // Обновление имени
    if (name) {
      users[userIndex].name = name
    }
    
    // Обновление пароля
    if (currentPassword && newPassword) {
      const isValidPassword = await bcrypt.compare(currentPassword, users[userIndex].password)
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Неверный текущий пароль' })
      }
      
      if (newPassword.length < 6) {
        return res.status(400).json({ error: 'Новый пароль должен быть не менее 6 символов' })
      }
      
      users[userIndex].password = await bcrypt.hash(newPassword, 10)
    }
    
    const { password: _, ...userWithoutPassword } = users[userIndex]
    res.json({ user: userWithoutPassword })
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении профиля' })
  }
})

// ============= LEVELS ENDPOINTS =============

const levelsList = [
  { id: 1, name: 'Шифр Цезаря', description: 'Изучи основы шифрования сдвигом', difficulty: 'easy', status: 'available', xpReward: 100, timeEstimate: '5 мин' },
  { id: 2, name: 'Шифр Виженера', description: 'Более сложный шифр с ключевым словом', difficulty: 'medium', status: 'available', xpReward: 150, timeEstimate: '10 мин' },
  { id: 3, name: 'XOR шифрование', description: 'Побитовое шифрование с ключом', difficulty: 'medium', status: 'locked', xpReward: 200, timeEstimate: '12 мин' },
  { id: 4, name: 'AES шифрование', description: 'Современный стандарт шифрования', difficulty: 'hard', status: 'locked', xpReward: 300, timeEstimate: '20 мин' },
  { id: 5, name: 'RSA шифрование', description: 'Асимметричное шифрование', difficulty: 'expert', status: 'locked', xpReward: 500, timeEstimate: '30 мин' },
]

const levelsDetails = {
  1: {
    id: 1,
    name: 'Шифр Цезаря',
    task: 'Расшифруйте сообщение со сдвигом 3',
    encryptedText: 'WKH TXLFN EURZQ IRA MXPSV RYHU WKH ODCB GRJ',
    hint: 'Сдвинь каждую букву на 3 назад',
    answer: 'the quick brown fox jumps over the lazy dog'
  },
  2: {
    id: 2,
    name: 'Шифр Виженера',
    task: 'Расшифруйте сообщение с ключом "KEY"',
    encryptedText: 'MXN HWDK',
    hint: 'Используй ключ KEY',
    answer: 'the text'
  },
}

// Список заданий
app.get('/api/v1/levals', authenticateToken, async (req, res) => {
  res.json({ levels: levelsList })
})

// Одно задание по id
app.get('/api/v1/levals/:id', authenticateToken, async (req, res) => {
  const level = levelsDetails[req.params.id]
  if (!level) {
    return res.status(404).json({ error: 'Задание не найдено' })
  }
  res.json({ level })
})

// Проверка решения уровня
app.post('/api/v1/levals/:id/verify', authenticateToken, async (req, res) => {
  const { id } = req.params
  const { solution } = req.body
  
  // Простая проверка для демо
  const isCorrect = solution && solution.length > 0
  
  if (isCorrect) {
    const xpEarned = 100 + parseInt(id) * 50
    const userIndex = users.findIndex(u => u.id === req.user.id)
    
    if (userIndex !== -1) {
      users[userIndex].xp += xpEarned
    }
    
    res.json({
      success: true,
      message: 'Уровень пройден!',
      xpEarned
    })
  } else {
    res.status(400).json({
      success: false,
      error: 'Неверное решение'
    })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`)
})