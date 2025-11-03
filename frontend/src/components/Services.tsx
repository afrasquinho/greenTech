const Services = () => {
  const services = [
    {
      icon: '💻',
      title: 'Software à Medida',
      description: 'Desenvolvimento de software personalizado para as suas necessidades específicas. Soluções full-stack e QAE completas.',
      features: [
        'Desenvolvimento Full-Stack',
        'Arquitetura Escalável',
        'Integração de Sistemas',
        'Manutenção & Suporte'
      ]
    },
    {
      icon: '🔍',
      title: 'Consultoria QA',
      description: 'Especialização em Quality Assurance Engineering. Consultoria técnica para melhorar a qualidade dos seus produtos.',
      features: [
        'Testes Automatizados',
        'Estratégias de QA',
        'Implementação de Processos',
        'Auditoria de Qualidade'
      ]
    },
    {
      icon: '🚀',
      title: 'Desenvolvimento de Carreira',
      description: 'Preparação completa para entrar no mercado tech. Formação, mentoria e orientação profissional personalizada.',
      features: [
        'Formação QA & Full-Stack',
        'Construção de Currículo',
        'Otimização LinkedIn',
        'Mentoria Profissional'
      ]
    }
  ]

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Os Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600">
            Soluções completas para empresas e particulares
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-green-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-5xl mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

