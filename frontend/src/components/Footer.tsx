const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-indigo-600 bg-clip-text text-transparent">
                GreenTech
              </span>
              <span className="text-green-500">●</span>
            </div>
            <p className="text-gray-400">Transformando ideias em soluções tecnológicas</p>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-400 hover:text-green-500 transition-colors">
                  Software à Medida
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-green-500 transition-colors">
                  Consultoria QA
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-green-500 transition-colors">
                  Desenvolvimento de Carreira
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-green-500 transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-green-500 transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 GreenTech Solutions. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

