import { useState, useEffect } from 'react'
import { api } from '../utils/api'

export const useLevels = () => {
  const [levels, setLevels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const fetchLevels = async () => {
    try {
      setLoading(true)
      const data = await api.getLevels()
      setLevels(data.levels || [])
      setError(null)
    } catch (err) {
      setError(err.error || 'Ошибка загрузки уровней')
    } finally {
      setLoading(false)
    }
  }
  
  const fetchLevel = async (levelId) => {
    try {
      const data = await api.getLevel(levelId)
      return { success: true, data: data.level || data }
    } catch (err) {
      return { success: false, error: err.error || 'Ошибка загрузки уровня' }
    }
  }

  const submitSolution = async (levelId, solution) => {
    try {
      const result = await api.submitSolution(levelId, solution)
      return { success: true, data: result }
    } catch (err) {
      return { success: false, error: err.error }
    }
  }
  
  useEffect(() => {
    fetchLevels()
  }, [])
  
  return { levels, loading, error, fetchLevels, fetchLevel, submitSolution }
}