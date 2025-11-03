const WhyChooseUs = () => {
  const advantages = [
    {
      icon: '⚡',
      title: 'Performance Superior',
      description: 'Código otimizado e arquitetura escalável para garantir velocidade máxima.'
    },
    {
      icon: '🔒',
      title: 'Segurança',
      description: 'Proteção de dados, compliance GDPR e práticas de segurança de última geração.'
    },
    {
      icon: '🎯',
      title: 'Qualidade Garantida',
      description: 'QA rigoroso, testes automatizados e code reviews para excelência.'
    },
    {
      icon: '🤝',
      title: 'Parceria',
      description: 'Trabalhamos como extensão da sua equipa, não como fornecedor.'
    },
    {
      icon: '📊',
      title: 'Dados-Driven',
      description: 'Decisões baseadas em métricas, analytics e feedback contínuo.'
    },
    {
      icon: '💡',
      title: 'Inovação',
      description: 'Integração de IA, tecnologias emergentes e soluções criativas.'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Por Que Escolher-nos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Diferenciais que fazem a diferença no seu projeto
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">{advantage.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
              <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

