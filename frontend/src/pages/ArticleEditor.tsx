import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { articleAPI } from '../services/api'

const ArticleEditor = () => {
  const { id } = useParams<{ id?: string }>()
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'tech',
    tags: '',
    featured: false,
    published: false,
    coverImage: ''
  })

  const categories = [
    { value: 'tech', label: 'Tech' },
    { value: 'tutorial', label: 'Tutorial' },
    { value: 'news', label: 'Notícias' },
    { value: 'best-practices', label: 'Boas Práticas' },
    { value: 'case-study', label: 'Caso de Estudo' }
  ]

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'admin')) {
      navigate('/')
      return
    }

    if (id && isAuthenticated) {
      loadArticle()
    }
  }, [id, isAuthenticated, authLoading, user, navigate])

  const loadArticle = async () => {
    try {
      setLoading(true)
      const response = await articleAPI.getArticleById(id!)
      const article = response.article

      setFormData({
        title: article.title || '',
        excerpt: article.excerpt || '',
        content: article.content || '',
        category: article.category || 'tech',
        tags: article.tags ? article.tags.join(', ') : '',
        featured: article.featured || false,
        published: article.published || false,
        coverImage: article.coverImage || ''
      })
    } catch (error: unknown) {
      const err = error as { message?: string }
      setError('Erro ao carregar artigo: ' + (err.message || 'Desconhecido'))
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag)

      const articleData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags,
        featured: formData.featured,
        published: formData.published,
        coverImage: formData.coverImage || undefined
      }

      if (id) {
        await articleAPI.updateArticle(id, articleData)
      } else {
        const response = await articleAPI.createArticle(articleData)
        navigate(`/admin/articles/${response.article._id}/edit`)
        return
      }

      navigate('/admin')
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } }
      setError(err.response?.data?.error || 'Erro ao guardar artigo')
    } finally {
      setSaving(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
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
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {id ? 'Editar Artigo' : 'Novo Artigo'}
            </h1>
            <p className="text-gray-600">
              {id ? 'Atualiza os detalhes do artigo' : 'Cria um novo artigo para o blog'}
            </p>
          </div>
          <button
            onClick={() => navigate('/admin')}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            ← Voltar
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Título * <span className="text-sm font-normal text-gray-500">(será usado para gerar o URL)</span>
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Ex: Como Criar uma API REST com Node.js"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Resumo * <span className="text-sm font-normal text-gray-500">(aparece na listagem)</span>
            </label>
            <textarea
              name="excerpt"
              required
              rows={3}
              value={formData.excerpt}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
              placeholder="Breve descrição do artigo..."
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Conteúdo * <span className="text-sm font-normal text-gray-500">(HTML permitido)</span>
            </label>
            <textarea
              name="content"
              required
              rows={20}
              value={formData.content}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none font-mono text-sm"
              placeholder="Escreve o conteúdo do artigo aqui. Podes usar HTML."
            />
            <p className="mt-2 text-sm text-gray-500">
              💡 Dica: Usa HTML simples para formatação (p, h2, h3, strong, em, ul, li, code, pre, a, img)
            </p>
          </div>

          {/* Category and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Categoria *</label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Tags <span className="text-sm font-normal text-gray-500">(separadas por vírgulas)</span>
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Ex: nodejs, api, rest, tutorial"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              URL da Imagem de Capa <span className="text-sm font-normal text-gray-500">(opcional)</span>
            </label>
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="https://exemplo.com/imagem.jpg"
            />
            {formData.coverImage && (
              <div className="mt-4">
                <img
                  src={formData.coverImage}
                  alt="Preview"
                  className="max-w-full h-48 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="ml-3 text-gray-700 font-medium">Artigo em Destaque</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="ml-3 text-gray-700 font-medium">Publicado (visível publicamente)</span>
            </label>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Cancelar
            </button>
            <div className="flex gap-3">
              {id && (
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await articleAPI.updateArticle(id, { published: !formData.published })
                      setFormData({ ...formData, published: !formData.published })
                    } catch (error) {
                      console.error('Error toggling publish:', error)
                    }
                  }}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    formData.published
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {formData.published ? 'Despublicar' : 'Publicar'}
                </button>
              )}
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-2 bg-gradient-to-r from-green-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {saving ? '⏳ A guardar...' : id ? 'Guardar Alterações' : 'Criar Artigo'}
              </button>
            </div>
          </div>
        </form>

        {/* Preview Section */}
        {formData.title && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pré-visualização</h2>
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{formData.title}</h3>
              <p className="text-gray-600 mb-4">{formData.excerpt}</p>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: formData.content.replace(/\n/g, '<br />') }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArticleEditor

