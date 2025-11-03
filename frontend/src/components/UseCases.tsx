const UseCases = () => {
  const useCases = [
    {
      icon: '🏢',
      title: 'ERP Personalizado',
      description: 'Sistemas de gestão empresarial integrados e customizados para fluxos únicos.',
      category: 'Enterprise'
    },
    {
      icon: '📱',
      title: 'Apps Mobile',
      description: 'Aplicações nativas e cross-platform com excelente UX e performance.',
      category: 'Mobile'
    },
    {
      icon: '🛒',
      title: 'E-Commerce',
      description: 'Plataformas de vendas online escaláveis com integrações de pagamento.',
      category: 'Retail'
    },
    {
      icon: '📊',
      title: 'Business Intelligence',
      description: 'Dashboards e analytics para tomada de decisões baseada em dados.',
      category: 'Analytics'
    },
    {
      icon: '🤖',
      title: 'Automação IA',
      description: 'Soluções com machine learning e processamento inteligente.',
      category: 'AI/ML'
    },
    {
      icon: '☁️',
      title: 'Cloud Migration',
      description: 'Migração e optimização para infraestrutura cloud moderna.',
      category: 'DevOps'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Casos de Uso
          </h2>
          <p className="text-xl text-gray-600">
            Soluções que resolvem problemas reais
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{useCase.icon}</span>
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                  {useCase.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{useCase.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCases

