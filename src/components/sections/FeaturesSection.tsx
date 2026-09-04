export function FeaturesSection() {
  const features = [
    {
      icon: "🎯",
      title: "Dominio por Niveles",
      description: "Contenido estructurado desde A1 hasta C2 para un progreso real"
    },
    {
      icon: "⏱️",
      title: "Programa de 90 Días",
      description: "Plan estructurado mes a mes con resultados medibles"
    },
    {
      icon: "📊",
      title: "Evaluación Continua",
      description: "Seguimiento de progreso y ajustes personalizados"
    },
    {
      icon: "🗣️",
      title: "Escenarios Reales",
      description: "Ejercicios basados en situaciones de comunicación auténticas"
    },
    {
      icon: "🎓",
      title: "Certificación CEFR",
      description: "Alineado con estándares europeos reconocidos internacionalmente"
    },
    {
      icon: "📱",
      title: "Acceso 24/7",
      description: "Estudia a tu ritmo desde cualquier dispositivo"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">
            ¿Por Qué Linguafly?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Método 100% adaptado al mercado español con profesores nativos y horarios compatibles con tu zona horaria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl border-2 border-slate-200 hover:border-coral-300 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-black text-lg mb-2 text-slate-900">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
