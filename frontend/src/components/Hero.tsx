import AIChatBot from './AIChatBot'

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 pt-20 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-20 animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Desenvolvemos{' '}
              <span className="bg-gradient-to-r from-green-500 to-indigo-600 bg-clip-text text-transparent">
                soluções tecnológicas
              </span>
              {' '}que transformam negócios
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Especialistas em software à medida e desenvolvimento de carreira em QA.
              Soluções personalizadas para empresas e particulares.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Começar Projeto
              </a>
              <a
                href="#services"
                className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 border border-gray-200"
              >
                Ver Serviços
              </a>
            </div>
          </div>

          {/* Right Content - AI Chat Interface */}
          <div className="fade-in">
            <AIChatBot />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

