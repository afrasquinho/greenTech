import { useState, useEffect } from 'react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-indigo-600 bg-clip-text text-transparent">
              GreenTech
            </span>
            <span className="text-green-500">●</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-green-500 font-medium transition-colors">
              Início
            </a>
            <a href="#services" className="text-gray-700 hover:text-green-500 font-medium transition-colors">
              Serviços
            </a>
            <a href="#about" className="text-gray-700 hover:text-green-500 font-medium transition-colors">
              Sobre
            </a>
            <a href="#contact" className="text-gray-700 hover:text-green-500 font-medium transition-colors">
              Contacto
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-green-500 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

          {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-green-500 hover:bg-gray-50 rounded-md">
              Início
            </a>
            <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-green-500 hover:bg-gray-50 rounded-md">
              Serviços
            </a>
            <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-green-500 hover:bg-gray-50 rounded-md">
              Sobre
            </a>
            <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-green-500 hover:bg-gray-50 rounded-md">
              Contacto
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

