import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { articleAPI } from '../services/api'

interface Article {
  _id: string
  title: string
  slug: string
  excerpt: string
  category: string
  tags: string[]
  coverImage?: string
  readTime: number
  views: number
  publishedAt: string
  author: {
    name: string
    email: string
  }
}

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const categories = [
    { value: '', label: 'Todos' },
    { value: 'tech', label: 'Tech' },
    { value: 'tutorial', label: 'Tutoriais' },
    { value: 'news', label: 'Notícias' },
    { value: 'best-practices', label: 'Boas Práticas' },
    { value: 'case-study', label: 'Casos de Estudo' }
  ]

  useEffect(() => {
    loadArticles()
  }, [selectedCategory])

  const loadArticles = async () => {
    try {
      setLoading(true)
      const params: { limit: number; category?: string } = { limit: 12 }
      if (selectedCategory) params.category = selectedCategory

      const [articlesRes, featuredRes] = await Promise.all([
        articleAPI.getPublishedArticles(params),
        articleAPI.getFeaturedArticles()
      ])
      
      console.log('Articles loaded:', articlesRes.articles?.length || 0)
      console.log('Featured loaded:', featuredRes.articles?.length || 0)
      
      setArticles(articlesRes.articles || [])
      setFeaturedArticles(featuredRes.articles || [])
    } catch (error) {
      console.error('Error loading articles:', error)
      setArticles([])
      setFeaturedArticles([])
    } finally {
      setLoading(false)
    }
  }

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.value === category)
    return cat?.label || category
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      tech: 'bg-blue-100 text-blue-800',
      tutorial: 'bg-green-100 text-green-800',
      news: 'bg-purple-100 text-purple-800',
      'best-practices': 'bg-yellow-100 text-yellow-800',
      'case-study': 'bg-indigo-100 text-indigo-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">A carregar artigos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Blog Tech 📚
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Artigos técnicos, tutoriais e insights sobre desenvolvimento de software
          </p>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Artigos em Destaque ⭐</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Link
                  key={article._id}
                  to={`/blog/${article.slug}`}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
                >
                  {article.coverImage && (
                    <div className="h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                        {getCategoryLabel(article.category)}
                      </span>
                      <span className="text-xs text-gray-500">{article.readTime} min</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{article.author.name}</span>
                      <span>{new Date(article.publishedAt).toLocaleDateString('pt-PT')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-gradient-to-r from-green-500 to-indigo-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhum artigo encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article._id}
                to={`/blog/${article.slug}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
              >
                {article.coverImage && (
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {getCategoryLabel(article.category)}
                    </span>
                    <span className="text-xs text-gray-500">{article.readTime} min</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{article.author.name}</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString('pt-PT')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog

