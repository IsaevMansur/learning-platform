import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Простой моковый API
const mockAPI = {
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const isAdmin = email.includes('admin')
    return {
      user: {
        id: 1,
        email: email,
        name: isAdmin ? 'Admin' : email.split('@')[0],
        role: isAdmin ? 'admin' : 'user',
        xp: isAdmin ? 9999 : 0
      }
    }
  },
  
  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      user: {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        role: 'user',
        xp: 0
      }
    }
  },
  
  logout: async () => {
    return { success: true }
  }
}

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        try {
          const data = await mockAPI.login(email, password)
          set({ user: data.user, isAuthenticated: true })
          return { success: true }
        } catch (error) {
          return { success: false, error: error.message }
        }
      },
      
      register: async (userData) => {
        try {
          const data = await mockAPI.register(userData)
          set({ user: data.user, isAuthenticated: true })
          return { success: true }
        } catch (error) {
          return { success: false, error: error.message }
        }
      },
      
      logout: async () => {
        await mockAPI.logout()
        set({ user: null, isAuthenticated: false })
      },
      
      setUser: (user) => set({ user, isAuthenticated: !!user })
    }),
    {
      name: 'auth-storage'
    }
  )
)