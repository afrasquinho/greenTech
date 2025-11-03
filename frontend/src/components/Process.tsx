const Process = () => {
  const steps = [
    {
      number: '01',
      title: 'Descoberta & Análise',
      description: 'Compreendemos suas necessidades, objetivos e desafios em profundidade.',
      icon: '🔍'
    },
    {
      number: '02',
      title: 'Design & Planeamento',
      description: 'Criamos uma solução técnica detalhada e roadmap de implementação.',
      icon: '📐'
    },
    {
      number: '03',
      title: 'Desenvolvimento',
      description: 'Construímos com metodologias ágeis e entregas incrementais.',
      icon: '💻'
    },
    {
      number: '04',
      title: 'Qualidade & Testes',
      description: 'Garantimos excelência através de QA rigoroso e validação contínua.',
      icon: '✅'
    },
    {
      number: '05',
      title: 'Deploy & Lançamento',
      description: 'Implementamos em produção com monitorização e suporte.',
      icon: '🚀'
    },
    {
      number: '06',
      title: 'Optimização Contínua',
      description: 'Melhoramos constantemente baseado em métricas e feedback.',
      icon: '📈'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Como Trabalhamos
          </h2>
          <p className="text-xl text-gray-600">
            Metodologia comprovada para garantir sucesso
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative group"
            >
              {/* Connection Line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-green-500 to-transparent z-0"></div>
              )}
              
              <div className="relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-green-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="text-6xl font-bold text-green-500/20 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process

