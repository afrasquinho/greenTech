import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { adminAPI, articleAPI, paymentAPI, invoiceAPI } from '../services/api'
import InvoiceModal from '../components/InvoiceModal'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type TabType = 'overview' | 'clients' | 'projects' | 'contacts' | 'articles' | 'payments' | 'invoices'

interface NavItem {
  id: TabType
  label: string
  icon: string
  badge?: number
}

interface DashboardStats {
  users?: {
    total: number
  }
  projects?: {
    total: number
    active: number
    draft: number
    completed: number
    onHold: number
    cancelled: number
  }
  contacts?: {
    total: number
    unread: number
  }
}

interface Client {
  _id: string
  name: string
  email: string
  company?: string
  projectCount?: number
  createdAt: string
}

interface Project {
  _id: string
  name: string
  description: string
  type: string
  status: string
  priority: string
  owner?: {
    name: string
  }
  userId?: {
    name: string
  }
  createdAt: string
}

interface Contact {
  _id: string
  name: string
  email: string
  company?: string
  service: string
  message: string
  read: boolean
  createdAt: string
}

interface Article {
  _id: string
  title: string
  excerpt: string
  category: string
  views?: number
  readTime: number
  published: boolean
  featured: boolean
  slug: string
}

interface Payment {
  _id: string
  invoiceNumber: string
  amount: number
  status: 'succeeded' | 'pending' | 'failed' | 'refunded'
  paymentMethod: string
  user?: {
    name: string
  }
  createdAt: string
}

interface Invoice {
  _id: string
  invoiceNumber: string
  total: number
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  dueDate: string
  user?: {
    name: string
  }
  createdAt: string
}

interface PaymentStats {
  totalRevenue?: number
  totalTransactions?: number
}

type CSVRow = Record<string, string | number>

const AdminDashboard = () => {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [clients, setClients] = useState<Client[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [paymentStats, setPaymentStats] = useState<PaymentStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  
  // Filters and search states
  const [clientSearch, setClientSearch] = useState('')
  const [projectStatusFilter, setProjectStatusFilter] = useState('all')
  const [projectTypeFilter, setProjectTypeFilter] = useState('all')
  const [contactFilter, setContactFilter] = useState<'all' | 'read' | 'unread'>('all')
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all')
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState('all')
  
  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'admin')) {
      navigate('/')
      return
    }

    if (isAuthenticated && user?.role === 'admin') {
      loadData()
    }
  }, [isAuthenticated, authLoading, user, navigate])

  const loadData = async () => {
    try {
      const [statsRes, clientsRes, projectsRes, contactsRes, articlesRes, paymentsRes, invoicesRes] = await Promise.all([
        adminAPI.getDashboardStats(),
        adminAPI.getAllClients({ limit: 10 }),
        adminAPI.getAllProjects({ limit: 10 }),
        adminAPI.getAllContacts({ limit: 10 }),
        articleAPI.getAllArticles({ limit: 10 }),
        paymentAPI.getAllPayments({ limit: 20 }).catch(() => ({ payments: [], stats: null })),
        invoiceAPI.getAllInvoices({ limit: 20 }).catch(() => ({ invoices: [], stats: null }))
      ])
      setStats(statsRes.stats)
      setClients(clientsRes.clients)
      setProjects(projectsRes.projects)
      setContacts(contactsRes.contacts)
      setArticles(articlesRes.articles)
      setPayments(paymentsRes.payments || [])
      setInvoices(invoicesRes.invoices || [])
      setPaymentStats(paymentsRes.stats || null)
    } catch (error) {
      console.error('Error loading admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (projectId: string, newStatus: string) => {
    try {
      await adminAPI.updateProjectStatus(projectId, newStatus)
      await loadData()
    } catch (error) {
      console.error('Error updating project status:', error)
    }
  }

  const handleMarkAsRead = async (contactId: string) => {
    try {
      await adminAPI.markContactAsRead(contactId)
      await loadData()
    } catch (error) {
      console.error('Error marking contact as read:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'on_hold': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      draft: 'Rascunho',
      in_progress: 'Em Progresso',
      completed: 'Concluído',
      on_hold: 'Em Espera',
      cancelled: 'Cancelado'
    }
    return labels[status] || status
  }

  const navItems: NavItem[] = [
    { id: 'overview', label: 'Visão Geral', icon: '📊' },
    { id: 'clients', label: 'Clientes', icon: '👥' },
    { id: 'projects', label: 'Projetos', icon: '📁' },
    { id: 'contacts', label: 'Mensagens', icon: '💬', badge: stats?.contacts?.unread },
    { id: 'articles', label: 'Blog', icon: '📝' },
    { id: 'payments', label: 'Pagamentos', icon: '💳' },
    { id: 'invoices', label: 'Faturas', icon: '📄' }
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Export functions
  const exportToCSV = (data: CSVRow[], filename: string, headers: string[]) => {
    const csvContent = [
      headers.join(','),
      ...data.map((row: CSVRow) => headers.map((header: string) => {
        const value = row[header] || ''
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value
      }).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExportClients = () => {
    const headers = ['Nome', 'Email', 'Empresa', 'Projetos', 'Data Registo']
    const data = clients.map((client: Client) => ({
      'Nome': client.name || '',
      'Email': client.email || '',
      'Empresa': client.company || '',
      'Projetos': client.projectCount || 0,
      'Data Registo': new Date(client.createdAt).toLocaleDateString('pt-PT')
    }))
    exportToCSV(data, 'clientes', headers)
  }

  const handleExportProjects = () => {
    const headers = ['Nome', 'Descrição', 'Tipo', 'Estado', 'Prioridade', 'Cliente', 'Data Criação']
    const data = projects.map((project: Project) => ({
      'Nome': project.name || '',
      'Descrição': project.description || '',
      'Tipo': project.type || '',
      'Estado': getStatusLabel(project.status),
      'Prioridade': project.priority || '',
      'Cliente': project.owner?.name || project.userId?.name || 'N/A',
      'Data Criação': new Date(project.createdAt).toLocaleDateString('pt-PT')
    }))
    exportToCSV(data, 'projetos', headers)
  }

  const handleExportPayments = () => {
    const headers = ['Nº Fatura', 'Cliente', 'Valor', 'Estado', 'Método', 'Data']
    const data = payments.map((payment: Payment) => ({
      'Nº Fatura': payment.invoiceNumber || '',
      'Cliente': payment.user?.name || 'N/A',
      'Valor': `€${payment.amount.toFixed(2)}`,
      'Estado': payment.status === 'succeeded' ? 'Pago' : payment.status === 'pending' ? 'Pendente' : payment.status === 'failed' ? 'Falhou' : payment.status,
      'Método': payment.paymentMethod === 'stripe' ? 'Stripe' : payment.paymentMethod === 'paypal' ? 'PayPal' : payment.paymentMethod || '',
      'Data': new Date(payment.createdAt).toLocaleDateString('pt-PT')
    }))
    exportToCSV(data, 'pagamentos', headers)
  }

  const handleExportInvoices = () => {
    const headers = ['Nº Fatura', 'Cliente', 'Total', 'Estado', 'Vencimento', 'Data Criação']
    const data = invoices.map((invoice: Invoice) => ({
      'Nº Fatura': invoice.invoiceNumber || '',
      'Cliente': invoice.user?.name || 'N/A',
      'Total': `€${invoice.total.toFixed(2)}`,
      'Estado': invoice.status === 'paid' ? 'Paga' : invoice.status === 'sent' ? 'Enviada' : invoice.status === 'overdue' ? 'Vencida' : invoice.status === 'draft' ? 'Rascunho' : invoice.status,
      'Vencimento': new Date(invoice.dueDate).toLocaleDateString('pt-PT'),
      'Data Criação': new Date(invoice.createdAt).toLocaleDateString('pt-PT')
    }))
    exportToCSV(data, 'faturas', headers)
  }

  const handleExportContacts = () => {
    const headers = ['Nome', 'Email', 'Empresa', 'Serviço', 'Mensagem', 'Lida', 'Data']
    const data = contacts.map((contact: Contact) => ({
      'Nome': contact.name || '',
      'Email': contact.email || '',
      'Empresa': contact.company || '',
      'Serviço': contact.service || '',
      'Mensagem': contact.message || '',
      'Lida': contact.read ? 'Sim' : 'Não',
      'Data': new Date(contact.createdAt).toLocaleDateString('pt-PT')
    }))
    exportToCSV(data, 'mensagens', headers)
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">A carregar...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 fixed left-0 top-0 h-full z-40 transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-green-500 to-indigo-600 bg-clip-text text-transparent">
                  Admin Panel
                </h2>
                <p className="text-xs text-gray-500 mt-1">GreenTech Solutions</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-green-500 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeTab === item.id ? 'bg-white text-green-600' : 'bg-red-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* User Section & Logout */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          {sidebarOpen && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                Admin
              </span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors ${
              !sidebarOpen && 'justify-center'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {sidebarOpen && <span className="font-medium">Sair</span>}
          </button>
          {!sidebarOpen && (
            <div className="text-center">
              <Link
                to="/"
                className="inline-block p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Voltar ao site"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 min-h-screen`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {activeTab === 'overview' && 'Dashboard Administrativo 👨‍💼'}
              {activeTab === 'clients' && 'Gestão de Clientes 👥'}
              {activeTab === 'projects' && 'Gestão de Projetos 📁'}
              {activeTab === 'contacts' && 'Mensagens de Contacto 💬'}
              {activeTab === 'articles' && 'Gestão do Blog 📝'}
              {activeTab === 'payments' && 'Gestão de Pagamentos 💳'}
              {activeTab === 'invoices' && 'Gestão de Faturas 📄'}
            </h1>
            <p className="text-gray-600">
              {activeTab === 'overview' && 'Gerir clientes, projetos e mensagens'}
              {activeTab === 'clients' && 'Visualizar e gerir todos os clientes'}
              {activeTab === 'projects' && 'Gerir projetos e estados'}
              {activeTab === 'contacts' && 'Responder a mensagens de contacto'}
              {activeTab === 'articles' && 'Criar e editar artigos do blog'}
              {activeTab === 'payments' && 'Monitorizar pagamentos e receitas'}
              {activeTab === 'invoices' && 'Gerir faturas e estados'}
            </p>
          </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Clientes</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.users?.total || 0}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Projetos Ativos</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.projects?.active || 0}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Projetos</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.projects?.total || 0}</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📁</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Mensagens</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.contacts?.total || 0}</p>
                  {(stats.contacts?.unread ?? 0) > 0 && (
                    <span className="text-xs text-red-600 font-semibold">
                      {stats.contacts?.unread} não lidas
                    </span>
                  )}
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Stats Cards */}
        {paymentStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm mb-1">Receita Total</p>
                  <p className="text-3xl font-bold">€{paymentStats.totalRevenue?.toFixed(2) || '0.00'}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pagamentos Bem-Sucedidos</p>
                  <p className="text-3xl font-bold text-gray-900">{paymentStats.totalTransactions || 0}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Faturas Emitidas</p>
                  <p className="text-3xl font-bold text-gray-900">{invoices.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📄</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Charts Section */}
                {stats && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Projects by Status - Pie Chart */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Projetos por Estado</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Rascunho', value: stats.projects?.draft || 0, color: '#9CA3AF' },
                              { name: 'Em Progresso', value: stats.projects?.active || 0, color: '#3B82F6' },
                              { name: 'Concluído', value: stats.projects?.completed || 0, color: '#10B981' },
                              { name: 'Em Espera', value: stats.projects?.onHold || 0, color: '#F59E0B' },
                              { name: 'Cancelado', value: stats.projects?.cancelled || 0, color: '#EF4444' }
                            ].filter(item => item.value > 0)}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => (percent && percent > 0) ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {[
                              { name: 'Rascunho', value: stats.projects?.draft || 0, color: '#9CA3AF' },
                              { name: 'Em Progresso', value: stats.projects?.active || 0, color: '#3B82F6' },
                              { name: 'Concluído', value: stats.projects?.completed || 0, color: '#10B981' },
                              { name: 'Em Espera', value: stats.projects?.onHold || 0, color: '#F59E0B' },
                              { name: 'Cancelado', value: stats.projects?.cancelled || 0, color: '#EF4444' }
                            ].filter(item => item.value > 0).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Projects by Type - Bar Chart */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Projetos por Tipo</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={[
                          { name: 'Software', value: projects.filter((p: Project) => p.type === 'software').length },
                          { name: 'QA', value: projects.filter((p: Project) => p.type === 'qa').length },
                          { name: 'Carreira', value: projects.filter((p: Project) => p.type === 'career').length },
                          { name: 'Outro', value: projects.filter((p: Project) => p.type === 'other').length }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Payment Statistics */}
                {payments.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Estatísticas de Pagamentos</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[
                        { name: 'Pagos', value: payments.filter((p: Payment) => p.status === 'succeeded').length, amount: payments.filter((p: Payment) => p.status === 'succeeded').reduce((sum: number, p: Payment) => sum + p.amount, 0) },
                        { name: 'Pendentes', value: payments.filter((p: Payment) => p.status === 'pending').length, amount: payments.filter((p: Payment) => p.status === 'pending').reduce((sum: number, p: Payment) => sum + p.amount, 0) },
                        { name: 'Falhados', value: payments.filter((p: Payment) => p.status === 'failed').length, amount: 0 },
                        { name: 'Reembolsados', value: payments.filter((p: Payment) => p.status === 'refunded').length, amount: payments.filter((p: Payment) => p.status === 'refunded').reduce((sum: number, p: Payment) => sum + p.amount, 0) }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip 
                          formatter={(value: string | number, name: string) => {
                            if (name === 'Quantidade') return [value, 'Quantidade']
                            return [`€${Number(value).toFixed(2)}`, 'Valor']
                          }}
                        />
                        <Legend />
                        <Bar yAxisId="left" dataKey="value" fill="#3B82F6" name="Quantidade" />
                        <Bar yAxisId="right" dataKey="amount" fill="#10B981" name="Valor (€)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Recent Activity Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Últimos Clientes</h3>
                    <div className="space-y-2">
                      {clients.slice(0, 5).map((client: Client) => (
                        <div key={client._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div>
                            <p className="font-medium text-gray-900">{client.name}</p>
                            <p className="text-sm text-gray-600">{client.email}</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">{client.projectCount || 0} projetos</span>
                        </div>
                      ))}
                      {clients.length === 0 && (
                        <p className="text-gray-500 text-center py-4">Nenhum cliente ainda</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Projetos Recentes</h3>
                    <div className="space-y-2">
                      {projects.slice(0, 5).map((project: Project) => (
                        <div key={project._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{project.name}</p>
                            <p className="text-sm text-gray-600">{project.owner?.name || project.userId?.name || 'N/A'}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                            {getStatusLabel(project.status)}
                          </span>
                        </div>
                      ))}
                      {projects.length === 0 && (
                        <p className="text-gray-500 text-center py-4">Nenhum projeto ainda</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recent Payments */}
                {payments.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Pagamentos Recentes</h3>
                    <div className="space-y-2">
                      {payments.slice(0, 5).map((payment: Payment) => (
                        <div key={payment._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div>
                            <p className="font-medium text-gray-900">{payment.invoiceNumber}</p>
                            <p className="text-sm text-gray-600">{payment.user?.name || 'N/A'}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">€{payment.amount.toFixed(2)}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              payment.status === 'succeeded' ? 'bg-green-100 text-green-800' :
                              payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {payment.status === 'succeeded' ? 'Pago' :
                               payment.status === 'pending' ? 'Pendente' : 'Falhou'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
          )}

          {/* Clients Tab */}
          {activeTab === 'clients' && (
            <div>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                  <h3 className="text-xl font-bold text-gray-900">Todos os Clientes</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={handleExportClients}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                      disabled={clients.length === 0}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Exportar CSV
                    </button>
                  </div>
                  <div className="w-full max-w-md">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Pesquisar por nome, email ou empresa..."
                        value={clientSearch}
                        onChange={(e) => setClientSearch(e.target.value)}
                        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Empresa</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Projetos</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data Registo</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {clients
                        .filter((client: Client) => {
                          if (!clientSearch) return true
                          const search = clientSearch.toLowerCase()
                          return (
                            client.name?.toLowerCase().includes(search) ||
                            client.email?.toLowerCase().includes(search) ||
                            client.company?.toLowerCase().includes(search)
                          )
                        })
                        .map((client: Client) => (
                        <tr key={client._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {client.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {client.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {client.company || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {client.projectCount || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {new Date(client.createdAt).toLocaleDateString('pt-PT')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              <div className="mb-4 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <h3 className="text-xl font-bold text-gray-900">Todos os Projetos</h3>
                    <button
                      onClick={handleExportProjects}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                      disabled={projects.length === 0}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Exportar CSV
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <select
                        value={projectStatusFilter}
                        onChange={(e) => setProjectStatusFilter(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="all">Todos os Estados</option>
                        <option value="draft">Rascunho</option>
                        <option value="in_progress">Em Progresso</option>
                        <option value="on_hold">Em Espera</option>
                        <option value="completed">Concluído</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <select
                        value={projectTypeFilter}
                        onChange={(e) => setProjectTypeFilter(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="all">Todos os Tipos</option>
                        <option value="software">Software</option>
                        <option value="qa">QA</option>
                        <option value="career">Carreira</option>
                        <option value="other">Outro</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {projects
                    .filter((project: Project) => {
                      if (projectStatusFilter !== 'all' && project.status !== projectStatusFilter) return false
                      if (projectTypeFilter !== 'all' && project.type !== projectTypeFilter) return false
                      return true
                    })
                    .map((project: Project) => (
                    <div key={project._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-gray-900">{project.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                              {getStatusLabel(project.status)}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{project.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Cliente: {project.owner?.name || project.userId?.name || 'N/A'}</span>
                            <span>•</span>
                            <span>Tipo: {project.type}</span>
                            <span>•</span>
                            <span>Prioridade: {project.priority}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <select
                            value={project.status}
                            onChange={(e) => handleStatusChange(project._id, e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="draft">Rascunho</option>
                            <option value="in_progress">Em Progresso</option>
                            <option value="on_hold">Em Espera</option>
                            <option value="completed">Concluído</option>
                            <option value="cancelled">Cancelado</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div>
              <div className="mb-4">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                    <h3 className="text-xl font-bold text-gray-900">Mensagens de Contacto</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={handleExportContacts}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                        disabled={contacts.length === 0}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Exportar CSV
                      </button>
                      <div className="flex gap-2">
                      <button
                        onClick={() => setContactFilter('all')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          contactFilter === 'all'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Todas
                      </button>
                      <button
                        onClick={() => setContactFilter('unread')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          contactFilter === 'unread'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Não Lidas
                      </button>
                      <button
                        onClick={() => setContactFilter('read')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          contactFilter === 'read'
                            ? 'bg-gray-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Lidas
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {contacts
                    .filter((contact: Contact) => {
                      if (contactFilter === 'read') return contact.read
                      if (contactFilter === 'unread') return !contact.read
                      return true
                    })
                    .map((contact: Contact) => (
                    <div
                      key={contact._id}
                      className={`border rounded-lg p-4 ${!contact.read ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-white'}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-gray-900">{contact.name}</h4>
                            <span className="text-sm text-gray-600">{contact.email}</span>
                            {!contact.read && (
                              <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full font-medium">
                                Não lida
                              </span>
                            )}
                          </div>
                          {contact.company && (
                            <p className="text-sm text-gray-600 mb-2">Empresa: {contact.company}</p>
                          )}
                          <p className="text-sm text-gray-700 mb-2">Serviço: {contact.service}</p>
                          <p className="text-gray-600">{contact.message}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(contact.createdAt).toLocaleString('pt-PT')}
                          </p>
                        </div>
                        <div className="ml-4 flex gap-2">
                          {!contact.read && (
                            <button
                              onClick={() => handleMarkAsRead(contact._id)}
                              className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                            >
                              Marcar como lida
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          )}

          {/* Articles Tab */}
          {activeTab === 'articles' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Artigos do Blog</h3>
                  <button
                    onClick={() => navigate('/admin/articles/new')}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    + Novo Artigo
                  </button>
                </div>
                <div className="space-y-4">
                  {articles.map((article: Article) => (
                    <div key={article._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-gray-900">{article.title}</h4>
                            {article.published ? (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                                Publicado
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-medium">
                                Rascunho
                              </span>
                            )}
                            {article.featured && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                                Destaque
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{article.excerpt}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Categoria: {article.category}</span>
                            <span>•</span>
                            <span>{article.views || 0} visualizações</span>
                            <span>•</span>
                            <span>{article.readTime} min</span>
                          </div>
                        </div>
                        <div className="ml-4 flex gap-2">
                          <button
                            onClick={() => navigate(`/blog/${article.slug}`)}
                            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                          >
                            Ver
                          </button>
                          <button
                            onClick={() => navigate(`/admin/articles/${article._id}/edit`)}
                            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm('Tens a certeza que queres eliminar este artigo?')) {
                                try {
                                  await articleAPI.deleteArticle(article._id)
                                  await loadData()
                                } catch (error) {
                                  console.error('Error deleting article:', error)
                                }
                              }
                            }}
                            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {articles.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <p className="text-lg mb-2">Nenhum artigo encontrado</p>
                      <p className="text-sm">Cria o teu primeiro artigo clicando no botão acima</p>
                    </div>
                  )}
                </div>
              </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div>
              <div className="mb-6">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                    <h3 className="text-xl font-bold text-gray-900">Pagamentos</h3>
                    <div className="flex gap-3">
                      <button
                        onClick={handleExportPayments}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                        disabled={payments.length === 0}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Exportar CSV
                      </button>
                      <select
                        value={paymentStatusFilter}
                        onChange={(e) => setPaymentStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                      <option value="all">Todos os Estados</option>
                      <option value="succeeded">Pagos</option>
                      <option value="pending">Pendentes</option>
                      <option value="failed">Falhados</option>
                      <option value="refunded">Reembolsados</option>
                    </select>
                  </div>
                  {paymentStats && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Receita Total</p>
                        <p className="text-2xl font-bold text-green-700">€{paymentStats.totalRevenue?.toFixed(2) || '0.00'}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Total Transações</p>
                        <p className="text-2xl font-bold text-blue-700">{paymentStats.totalTransactions || 0}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nº Fatura</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Método</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {payments
                        .filter((payment: Payment) => {
                          if (paymentStatusFilter === 'all') return true
                          return payment.status === paymentStatusFilter
                        })
                        .map((payment: Payment) => (
                        <tr key={payment._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {payment.invoiceNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {payment.user?.name || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            €{payment.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              payment.status === 'succeeded' ? 'bg-green-100 text-green-800' :
                              payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              payment.status === 'failed' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {payment.status === 'succeeded' ? 'Pago' :
                               payment.status === 'pending' ? 'Pendente' :
                               payment.status === 'failed' ? 'Falhou' : payment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {payment.paymentMethod === 'stripe' ? '💳 Stripe' :
                             payment.paymentMethod === 'paypal' ? '📧 PayPal' :
                             payment.paymentMethod === 'bank_transfer' ? '🏦 Transferência' : payment.paymentMethod}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {new Date(payment.createdAt).toLocaleDateString('pt-PT')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {payments.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <p className="text-lg mb-2">Nenhum pagamento encontrado</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <div>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <h3 className="text-xl font-bold text-gray-900">Faturas</h3>
                  <div className="flex gap-4">
                    <button
                      onClick={handleExportInvoices}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                      disabled={invoices.length === 0}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Exportar CSV
                    </button>
                    <select
                      value={invoiceStatusFilter}
                      onChange={(e) => setInvoiceStatusFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="all">Todos os Estados</option>
                      <option value="draft">Rascunho</option>
                      <option value="sent">Enviadas</option>
                      <option value="paid">Pagas</option>
                      <option value="overdue">Vencidas</option>
                      <option value="cancelled">Canceladas</option>
                    </select>
                    <button
                      onClick={() => setShowInvoiceModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                      + Nova Fatura
                    </button>
                  </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nº Fatura</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vencimento</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invoices
                      .filter((invoice: Invoice) => {
                        if (invoiceStatusFilter === 'all') return true
                        return invoice.status === invoiceStatusFilter
                      })
                      .map((invoice: Invoice) => (
                      <tr key={invoice._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {invoice.invoiceNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {invoice.user?.name || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          €{invoice.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                            invoice.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                            invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                            invoice.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {invoice.status === 'paid' ? 'Paga' :
                             invoice.status === 'sent' ? 'Enviada' :
                             invoice.status === 'overdue' ? 'Vencida' :
                             invoice.status === 'draft' ? 'Rascunho' : invoice.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(invoice.dueDate).toLocaleDateString('pt-PT')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={async () => {
                              const newStatus = invoice.status === 'paid' ? 'sent' : 'paid'
                              try {
                                await invoiceAPI.updateInvoiceStatus(invoice._id, newStatus)
                                await loadData()
                              } catch (error) {
                                console.error('Error updating invoice:', error)
                              }
                            }}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            {invoice.status === 'paid' ? 'Desmarcar' : 'Marcar como paga'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {invoices.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg mb-2">Nenhuma fatura encontrada</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Invoice Creation Modal */}
      <InvoiceModal
        isOpen={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        onSuccess={() => {
          setShowInvoiceModal(false)
          loadData()
        }}
      />
    </div>
  )
}

export default AdminDashboard

