const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Quem Somos
            </h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              A <strong className="text-gray-900">GreenTech Solutions</strong> nasceu da vontade de unir 
              expertise técnica com crescimento profissional. Somos especialistas em desenvolver software 
              à medida para empresas e em preparar profissionais para o mercado de QA.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Com anos de experiência em desenvolvimento full-stack e Quality Assurance, 
              oferecemos soluções completas que vão desde a criação de software customizado 
              até a formação e mentoria de novos talentos.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">24/7</div>
                <div className="text-gray-600 font-medium">Disponível</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">100%</div>
                <div className="text-gray-600 font-medium">Personalizado</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">IA</div>
                <div className="text-gray-600 font-medium">Powered</div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="grid grid-cols-1 gap-4">
            {['Full-Stack Dev', 'QA Engineering', 'Career Coaching'].map((badge, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-x-2"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-2xl text-white">
                      {idx === 0 ? '💻' : idx === 1 ? '🔍' : '🚀'}
                    </span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">{badge}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

