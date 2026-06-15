import { useState, useEffect } from 'react'
import { api } from '../utils/api'

export const useAchievements = () => {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const fetchAchievements = async () => {
    try {
      setLoading(true)
      const data = await api.getAchievements()
      setAchievements(data.achievements || [])
      setError(null)
    } catch (err) {
      setError(err.error || 'Ошибка загрузки достижений')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchAchievements()
  }, [])
  
  return { achievements, loading, error, fetchAchievements }
}