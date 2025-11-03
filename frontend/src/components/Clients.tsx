const Clients = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-gray-500 font-semibold">
            Confiança de Empresas
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
          {['Enterprise', 'Fintech', 'Healthcare', 'Retail', 'SaaS', 'Startups'].map((client, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-2xl font-bold text-gray-800">{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Clients

