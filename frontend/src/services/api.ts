import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
})

// Add request interceptor for logging and auth token
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('📤 API Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error('❌ Request error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('❌ API Error:', {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    })
    return Promise.reject(error)
  }
)

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

export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },
  register: async (name: string, email: string, password: string, company?: string) => {
    const response = await api.post('/auth/register', { name, email, password, company })
    return response.data
  },
  getProfile: async () => {
    const token = localStorage.getItem('token')
    const response = await api.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  updateProfile: async (data: { name?: string; company?: string }) => {
    const token = localStorage.getItem('token')
    const response = await api.put('/auth/profile', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
}

export const projectAPI = {
  getProjects: async (params?: { status?: string; type?: string }) => {
    const token = localStorage.getItem('token')
    const queryParams = params ? new URLSearchParams(params).toString() : ''
    const response = await api.get(`/projects${queryParams ? '?' + queryParams : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  getProject: async (id: string) => {
    const token = localStorage.getItem('token')
    const response = await api.get(`/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  createProject: async (data: {
    name: string
    description: string
    type: 'software' | 'qa' | 'career' | 'other'
    status?: string
    priority?: string
    budget?: number
    startDate?: string
    endDate?: string
    tags?: string[]
    notes?: string
  }) => {
    const token = localStorage.getItem('token')
    const response = await api.post('/projects', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  updateProject: async (id: string, data: Partial<{
    name: string
    description: string
    type: string
    status: string
    priority: string
    budget: number
    startDate: string
    endDate: string
    tags: string[]
    notes: string
  }>) => {
    const token = localStorage.getItem('token')
    const response = await api.put(`/projects/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  deleteProject: async (id: string) => {
    const token = localStorage.getItem('token')
    const response = await api.delete(`/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  getProjectStats: async () => {
    const token = localStorage.getItem('token')
    const response = await api.get('/projects/stats', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
}

export const adminAPI = {
  getDashboardStats: async () => {
    const token = localStorage.getItem('token')
    const response = await api.get('/admin/dashboard/stats', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  getAllClients: async (params?: { page?: number; limit?: number; search?: string }) => {
    const token = localStorage.getItem('token')
    const queryParams = params ? new URLSearchParams(params as any).toString() : ''
    const response = await api.get(`/admin/clients${queryParams ? '?' + queryParams : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  getAllProjects: async (params?: { page?: number; limit?: number; status?: string; type?: string; userId?: string }) => {
    const token = localStorage.getItem('token')
    const queryParams = params ? new URLSearchParams(params as any).toString() : ''
    const response = await api.get(`/admin/projects${queryParams ? '?' + queryParams : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  updateProjectStatus: async (id: string, status: string) => {
    const token = localStorage.getItem('token')
    const response = await api.put(`/admin/projects/${id}/status`, { status }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  getAllContacts: async (params?: { page?: number; limit?: number; read?: boolean; search?: string }) => {
    const token = localStorage.getItem('token')
    const queryParams = params ? new URLSearchParams(params as any).toString() : ''
    const response = await api.get(`/admin/contacts${queryParams ? '?' + queryParams : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  markContactAsRead: async (id: string) => {
    const token = localStorage.getItem('token')
    const response = await api.put(`/admin/contacts/${id}/read`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  deleteContact: async (id: string) => {
    const token = localStorage.getItem('token')
    const response = await api.delete(`/admin/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
}

export const articleAPI = {
  getPublishedArticles: async (params?: { page?: number; limit?: number; category?: string; tag?: string; search?: string }) => {
    const queryParams = params ? new URLSearchParams(params as any).toString() : ''
    const response = await api.get(`/articles/published${queryParams ? '?' + queryParams : ''}`)
    return response.data
  },
  getArticleBySlug: async (slug: string) => {
    const response = await api.get(`/articles/slug/${slug}`)
    return response.data
  },
  getFeaturedArticles: async () => {
    const response = await api.get('/articles/featured')
    return response.data
  },
  // Admin routes
  getAllArticles: async (params?: { page?: number; limit?: number; published?: boolean; category?: string }) => {
    const token = localStorage.getItem('token')
    const queryParams = params ? new URLSearchParams(params as any).toString() : ''
    const response = await api.get(`/articles${queryParams ? '?' + queryParams : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  getArticleById: async (id: string) => {
    const token = localStorage.getItem('token')
    const response = await api.get(`/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  createArticle: async (data: {
    title: string
    excerpt: string
    content: string
    category: string
    tags?: string[]
    featured?: boolean
    published?: boolean
    coverImage?: string
  }) => {
    const token = localStorage.getItem('token')
    const response = await api.post('/articles', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  updateArticle: async (id: string, data: Partial<{
    title: string
    excerpt: string
    content: string
    category: string
    tags: string[]
    featured: boolean
    published: boolean
    coverImage: string
  }>) => {
    const token = localStorage.getItem('token')
    const response = await api.put(`/articles/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  deleteArticle: async (id: string) => {
    const token = localStorage.getItem('token')
    const response = await api.delete(`/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
}

export const notificationAPI = {
  getNotifications: async (params?: { limit?: number; unreadOnly?: boolean }) => {
    const token = localStorage.getItem('token')
    const queryParams = params ? new URLSearchParams(params as any).toString() : ''
    const response = await api.get(`/notifications${queryParams ? '?' + queryParams : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  markAsRead: async (id: string) => {
    const token = localStorage.getItem('token')
    const response = await api.put(`/notifications/${id}/read`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  markAllAsRead: async () => {
    const token = localStorage.getItem('token')
    const response = await api.put('/notifications/read-all', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  deleteNotification: async (id: string) => {
    const token = localStorage.getItem('token')
    const response = await api.delete(`/notifications/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
}

export const paymentAPI = {
  createPayment: async (data: {
    amount: number
    currency?: string
    projectId?: string
    description: string
    items?: Array<{
      description: string
      quantity: number
      unitPrice: number
    }>
  }) => {
    const token = localStorage.getItem('token')
    const response = await api.post('/payments/create', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  getUserPayments: async (params?: { status?: string; limit?: number }) => {
    const token = localStorage.getItem('token')
    const queryParams = params ? new URLSearchParams(params as any).toString() : ''
    const response = await api.get(`/payments${queryParams ? '?' + queryParams : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  getPayment: async (id: string) => {
    const token = localStorage.getItem('token')
    const response = await api.get(`/payments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  // Admin routes
  getAllPayments: async (params?: { page?: number; limit?: number; status?: string; userId?: string }) => {
    const token = localStorage.getItem('token')
    const queryParams = params ? new URLSearchParams(params as any).toString() : ''
    const response = await api.get(`/payments/admin/all${queryParams ? '?' + queryParams : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
}

export const invoiceAPI = {
  getUserInvoices: async (params?: { status?: string; limit?: number }) => {
    const token = localStorage.getItem('token')
    const queryParams = params ? new URLSearchParams(params as any).toString() : ''
    const response = await api.get(`/invoices${queryParams ? '?' + queryParams : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  getInvoice: async (id: string) => {
    const token = localStorage.getItem('token')
    const response = await api.get(`/invoices/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  // Admin routes
  createInvoice: async (data: {
    userId: string
    projectId?: string
    items: Array<{
      description: string
      quantity: number
      unitPrice: number
    }>
    taxRate?: number
    dueDays?: number
    notes?: string
  }) => {
    const token = localStorage.getItem('token')
    const response = await api.post('/invoices', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  updateInvoiceStatus: async (id: string, status: string) => {
    const token = localStorage.getItem('token')
    const response = await api.put(`/invoices/${id}/status`, { status }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  getAllInvoices: async (params?: { page?: number; limit?: number; status?: string; userId?: string }) => {
    const token = localStorage.getItem('token')
    const queryParams = params ? new URLSearchParams(params as any).toString() : ''
    const response = await api.get(`/invoices/admin/all${queryParams ? '?' + queryParams : ''}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  deleteInvoice: async (id: string) => {
    const token = localStorage.getItem('token')
    const response = await api.delete(`/invoices/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
}

export default api

