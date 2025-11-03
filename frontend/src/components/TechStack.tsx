const TechStack = () => {
  const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'Angular', icon: '🅰️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Python', icon: '🐍' },
    { name: 'Java', icon: '☕' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Kubernetes', icon: '☸️' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Azure', icon: '🔷' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'MongoDB', icon: '🍃' }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Stack Tecnológica
          </h2>
          <p className="text-xl text-gray-600">
            Tecnologias modernas para soluções de ponta
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded-xl hover:bg-green-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 text-center"
            >
              <div className="text-4xl mb-2">{tech.icon}</div>
              <div className="text-sm font-semibold text-gray-800">{tech.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack

