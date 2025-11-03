import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const chatAPI = {
  sendMessage: async (message: string) => {
    const response = await api.post('/chat', { message })
    return response.data
  }
}

export const contactAPI = {
  sendContact: async (data: {
    name: string
    email: string
    company?: string
    service: string
    message: string
  }) => {
    const response = await api.post('/contact', data)
    return response.data
  }
}

export default api

