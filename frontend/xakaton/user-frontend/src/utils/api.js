import axios from 'axios'
import { mockApi } from './mockApi'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const client = axios.create({
  baseURL: API_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

client.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response?.data || { error: 'Ошибка сети' })
)

export const api = {
  ...mockApi,

  getLevels: () => client.get('/v1/levals'),

  getLevel: (id) => client.get(`/v1/levals/${id}`),

  submitSolution: (levelId, solution) =>
    client.post(`/v1/levals/${levelId}/verify`, { solution }),
}

export default api
