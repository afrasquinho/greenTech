import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { articleAPI } from '../services/api'

interface Article {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  coverImage?: string
  readTime: number
  views: number
  likes: number
  publishedAt: string
  author: {
    name: string
    email: string
  }
}

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      loadArticle()
    }
  }, [slug])

  const loadArticle = async () => {
    try {
      const response = await articleAPI.getArticleBySlug(slug!)
      setArticle(response.article)
    } catch (error) {
      console.error('Error loading article:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      tech: 'Tech',
      tutorial: 'Tutorial',
      news: 'Notícias',
      'best-practices': 'Boas Práticas',
      'case-study': 'Caso de Estudo'
    }
    return labels[category] || category
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
          <p className="text-gray-600">A carregar artigo...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Artigo não encontrado</h1>
          <Link to="/blog" className="text-green-600 hover:text-green-700">
            Voltar ao blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar ao blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
              {getCategoryLabel(article.category)}
            </span>
            <span className="text-sm text-gray-500">{article.readTime} min de leitura</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{article.views} visualizações</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Por {article.author.name}</span>
            <span>•</span>
            <span>{new Date(article.publishedAt).toLocaleDateString('pt-PT', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </header>

        {/* Cover Image */}
        {article.coverImage && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 mb-8">
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-gray-900
              prose-p:text-gray-700
              prose-a:text-green-600
              prose-strong:text-gray-900
              prose-code:text-green-600
              prose-pre:bg-gray-900
              prose-img:rounded-lg
              prose-blockquote:border-green-500"
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }}
          />
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-500 to-indigo-600 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Precisas de Ajuda?</h2>
          <p className="mb-6 text-green-50">
            Contacta-nos para discutires o teu projeto ou obteres mais informações
          </p>
          <Link
            to="/#contact"
            className="inline-block px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Contactar-nos
          </Link>
        </div>
      </article>
    </div>
  )
}

export default ArticleDetail

