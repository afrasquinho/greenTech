const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-indigo-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Pronto para Transformar Seu Negócio?
        </h2>
        <p className="text-xl text-green-50 mb-8 leading-relaxed">
          Vamos conversar sobre como podemos ajudar. Clientes B2B e particulares são bem-vindos!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="px-8 py-4 bg-white text-green-600 font-bold rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Começar Agora
          </a>
          <a
            href="#services"
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-green-600 transition-all duration-300"
          >
            Ver Serviços
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTA

