import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { authAPI, projectAPI, paymentAPI, invoiceAPI } from '../services/api'
import ProjectModal from '../components/ProjectModal'
import PaymentCheckout from '../components/PaymentCheckout'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Project {
  _id: string
  name: string
  description: string
  type: 'software' | 'qa' | 'career' | 'other'
  status: 'draft' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
  budget?: number
  createdAt: string
}

interface UserProfile {
  _id: string
  name: string
  email: string
  company?: string
  role: 'admin' | 'client'
}

interface ProjectStats {
  total: number
  byStatus: {
    draft: number
    in_progress: number
    completed: number
    on_hold: number
    cancelled: number
  }
  byType: {
    software: number
    qa: number
    career: number
    other: number
  }
}

interface Payment {
  _id: string
  invoiceNumber: string
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded'
  description: string
  createdAt: string
}

interface Invoice {
  _id: string
  invoiceNumber: string
  total: number
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  dueDate: string
  paidAt?: string
  items: Array<{
    description: string
    quantity: number
    unitPrice: number
    total: number
  }>
}

const Dashboard = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [stats, setStats] = useState<ProjectStats | null>(null)
  const [payments, setPayments] = useState<Payment[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'payments' | 'invoices'>('overview')
  const [loading, setLoading] = useState(true)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentProject, setPaymentProject] = useState<Project | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/')
      return
    }

    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated, authLoading, navigate])

  const loadData = async () => {
    try {
      const [profileResponse, projectsResponse, statsResponse, paymentsResponse, invoicesResponse] = await Promise.all([
        authAPI.getProfile(),
        projectAPI.getProjects(),
        projectAPI.getProjectStats(),
        paymentAPI.getUserPayments({ limit: 10 }).catch(() => ({ payments: [] })),
        invoiceAPI.getUserInvoices({ limit: 10 }).catch(() => ({ invoices: [] }))
      ])
      setProfile(profileResponse.user)
      setProjects(projectsResponse.projects)
      setStats(statsResponse.stats)
      setPayments(paymentsResponse.payments || [])
      setInvoices(invoicesResponse.invoices || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Chart data
  const chartData = stats ? [
    { name: 'Rascunho', value: stats.byStatus?.draft || 0, color: '#9CA3AF' },
    { name: 'Em Progresso', value: stats.byStatus?.in_progress || 0, color: '#3B82F6' },
    { name: 'Concluído', value: stats.byStatus?.completed || 0, color: '#10B981' },
    { name: 'Em Espera', value: stats.byStatus?.on_hold || 0, color: '#F59E0B' },
    { name: 'Cancelado', value: stats.byStatus?.cancelled || 0, color: '#EF4444' }
  ].filter(item => item.value > 0) : []

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

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      software: 'Software',
      qa: 'QA',
      career: 'Carreira',
      other: 'Outro'
    }
    return labels[type] || type
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

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Bem-vindo, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Gerir os teus projetos e informações
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total de Projetos</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.total || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📁</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Em Progresso</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.byStatus?.in_progress || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Concluídos</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.byStatus?.completed || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Visão Geral
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'projects'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Projetos
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'payments'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pagamentos
              </button>
              <button
                onClick={() => setActiveTab('invoices')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'invoices'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Faturas
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Profile Card */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Informações do Perfil</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nome</label>
                      <p className="text-gray-900">{profile?.name || user?.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <p className="text-gray-900">{profile?.email || user?.email}</p>
                    </div>
                    {profile?.company && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Empresa</label>
                        <p className="text-gray-900">{profile.company}</p>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Conta</label>
                      <p className="text-gray-900">{profile?.role === 'admin' ? 'Administrador' : 'Cliente'}</p>
                    </div>
                  </div>
                </div>

                {/* Charts */}
                {chartData.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Projetos por Estado</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => percent ? `${name}: ${(percent * 100).toFixed(0)}%` : name}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Distribuição por Tipo</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats?.byType ? Object.entries(stats.byType).map(([key, value]: [string, number]) => ({ name: key, value })) : []}>
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

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Atividade Recente</h3>
                  <div className="space-y-2">
                    {projects.slice(0, 5).map((project) => (
                      <div key={project._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{project.name}</p>
                          <p className="text-sm text-gray-600">{getTypeLabel(project.type)}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {getStatusLabel(project.status)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Meus Projetos</h2>
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                    onClick={() => setShowProjectModal(true)}
                  >
                    + Novo Projeto
                  </button>
                </div>
                
                {projects.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg mb-2">Ainda não tens projetos</p>
                    <p className="text-sm">Cria o teu primeiro projeto clicando no botão acima</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div
                        key={project._id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                {getStatusLabel(project.status)}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                {getTypeLabel(project.type)}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-3">{project.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Prioridade: {project.priority}</span>
                              <span>•</span>
                              <span>
                                Criado em: {new Date(project.createdAt).toLocaleDateString('pt-PT')}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                              Editar
                            </button>
                            <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors">
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Meus Pagamentos</h2>
                {payments.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg mb-2">Nenhum pagamento encontrado</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {payments.map((payment) => (
                      <div key={payment._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-gray-900">{payment.invoiceNumber}</h3>
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
                            </div>
                            <p className="text-gray-600 mb-2">{payment.description}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(payment.createdAt).toLocaleDateString('pt-PT')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">€{payment.amount.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">{payment.currency}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Invoices Tab */}
            {activeTab === 'invoices' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Minhas Faturas</h2>
                {invoices.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg mb-2">Nenhuma fatura encontrada</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <div key={invoice._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-gray-900">{invoice.invoiceNumber}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                                invoice.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                                invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {invoice.status === 'paid' ? 'Paga' :
                                 invoice.status === 'sent' ? 'Enviada' :
                                 invoice.status === 'overdue' ? 'Vencida' :
                                 invoice.status === 'draft' ? 'Rascunho' : invoice.status}
                              </span>
                            </div>
                            {invoice.items && invoice.items.length > 0 && (
                              <p className="text-gray-600 mb-2">{invoice.items[0].description}</p>
                            )}
                            <p className="text-sm text-gray-500">
                              Vencimento: {new Date(invoice.dueDate).toLocaleDateString('pt-PT')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">€{invoice.total.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">
                              {invoice.status === 'paid' && invoice.paidAt && (
                                <>Paga em {new Date(invoice.paidAt).toLocaleDateString('pt-PT')}</>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-green-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Precisas de Ajuda?</h3>
            <p className="text-green-50 mb-4">
              Contacta-nos através do formulário ou do email de suporte
            </p>
            <button
              onClick={() => navigate('/#contact')}
              className="px-6 py-2 bg-white text-green-600 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Contactar Suporte
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Documentação</h3>
            <p className="text-gray-600 mb-4">
              Consulta a documentação dos nossos serviços e APIs
            </p>
            <button
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all"
              disabled
            >
              Em breve
            </button>
          </div>
        </div>
      </div>

      <ProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onSuccess={loadData}
      />

      {showPaymentModal && paymentProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowPaymentModal(false)
                setPaymentProject(null)
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <PaymentCheckout
              amount={paymentProject.budget || 1000}
              description={`Pagamento para projeto: ${paymentProject.name}`}
              projectId={paymentProject._id}
              onSuccess={() => {
                setShowPaymentModal(false)
                setPaymentProject(null)
                loadData()
              }}
              onCancel={() => {
                setShowPaymentModal(false)
                setPaymentProject(null)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard

