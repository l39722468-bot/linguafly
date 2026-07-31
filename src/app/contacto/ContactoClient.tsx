'use client';

import { Navigation } from "@/components/sections/Navigation";
import { CourseLaunchBanner } from "@/components/CourseLaunchBanner";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Hubo un error al enviar el mensaje.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Error de conexión. Por favor, intenta de nuevo.');
    }
  };

  return (
    <>
      <Navigation />
      <CourseLaunchBanner />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-coral-700 text-sm font-bold mb-6">
              <span>💬</span>
              <span>Contáctanos</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
              Estamos Aquí para Ayudarte
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              ¿Tienes dudas sobre nuestros cursos? ¿Necesitas orientación para elegir el programa adecuado? Escríbenos y te responderemos en menos de 24 horas.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Email */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center">
                <div className="w-16 h-16 rounded-full bg-coral-100 flex items-center justify-center text-coral-600 text-2xl mx-auto mb-4">
                  ✉️
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Email</h3>
                <p className="text-slate-600 mb-4">Respuesta en menos de 24h</p>
                <a
                  href="mailto:info@focus-on-english.com"
                  className="text-coral-600 font-bold hover:text-coral-700"
                >
                  info@focus-on-english.com
                </a>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-coral-600 text-2xl mx-auto mb-4">
                  📞
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Teléfono</h3>
                <p className="text-slate-600 mb-4">Lun-Vie 9:00 - 18:00</p>
                <a
                  href="tel:+34900123456"
                  className="text-coral-600 font-bold hover:text-coral-700"
                >
                  +34 900 123 456
                </a>
              </div>

              {/* WhatsApp */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-2xl mx-auto mb-4">
                  💬
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">WhatsApp</h3>
                <p className="text-slate-600 mb-4">Chat directo</p>
                <a
                  href="https://wa.me/34900123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 font-bold hover:text-amber-700"
                >
                  Abrir chat
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-slate-200">
              <h2 className="text-3xl font-black text-slate-900 mb-6 text-center">
                Envíanos un Mensaje
              </h2>
              
              {status === 'success' ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-green-800 text-lg">
                    Gracias por contactar con nosotros. Hemos recibido tu consulta y te responderemos en un máximo de 72 horas.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-green-700 font-bold underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-center text-slate-600 mb-8">
                    Completa el formulario y te responderemos lo antes posible
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-600 focus:border-transparent"
                          placeholder="Tu nombre"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Apellidos *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-600 focus:border-transparent"
                          placeholder="Tus apellidos"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-600 focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-600 focus:border-transparent"
                        placeholder="+34 600 000 000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Asunto *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-600 focus:border-transparent"
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="informacion">Información sobre cursos</option>
                        <option value="inscripcion">Proceso de inscripción</option>
                        <option value="nivel">Consulta sobre mi nivel</option>
                        <option value="precios">Precios y formas de pago</option>
                        <option value="tecnico">Soporte técnico</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Mensaje *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-600 focus:border-transparent"
                        placeholder="Cuéntanos cómo podemos ayudarte..."
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        required
                        className="mt-1"
                        id="privacy"
                      />
                      <label htmlFor="privacy" className="text-sm text-slate-600">
                        He leído y acepto la{" "}
                        <Link href="/privacidad" className="text-coral-600 font-bold hover:text-coral-700">
                          política de privacidad
                        </Link>
                        {" "}y el tratamiento de mis datos personales.
                      </label>
                    </div>

                    {status === 'error' && (
                      <p className="text-red-600 font-bold text-sm bg-red-50 p-4 rounded-lg border border-red-200">
                        ⚠️ {errorMessage}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-gradient-to-r from-coral-600 to-peach-600 text-white py-4 rounded-lg font-bold text-lg hover:from-coral-700 hover:to-peach-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">
              ¿Buscas algo específico?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                href="/test-nivel"
                className="bg-gradient-to-br from-coral-50 to-peach-50 rounded-xl p-6 border border-coral-200 hover:shadow-lg transition-shadow group"
              >
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-coral-600">
                  Test de Nivel
                </h3>
                <p className="text-sm text-slate-600">
                  Evalúa tu nivel de inglés actual
                </p>
              </Link>

              <Link
                href="/aprender-ingles"
                className="bg-gradient-to-br from-orange-50 to-peach-50 rounded-xl p-6 border border-orange-200 hover:shadow-lg transition-shadow group"
              >
                <div className="text-3xl mb-3">🎓</div>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-coral-600">
                  Cursos por nivel
                </h3>
                <p className="text-sm text-slate-600">
                  Programas A1–C2 y cursos por sector profesional
                </p>
              </Link>

              <Link
                href="/blog"
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200 hover:shadow-lg transition-shadow group"
              >
                <div className="text-3xl mb-3">📚</div>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-amber-600">
                  Blog
                </h3>
                <p className="text-sm text-slate-600">
                  Artículos y recursos gratuitos
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">
              Preguntas Frecuentes
            </h2>

            <div className="space-y-4">
              <details className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 group">
                <summary className="font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  <span>¿Cuánto tiempo tardan en responder?</span>
                  <span className="text-coral-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-slate-600 mt-4">
                  Nuestro equipo responde todos los mensajes en menos de 24 horas laborables. Para consultas urgentes, te recomendamos usar WhatsApp o teléfono.
                </p>
              </details>

              <details className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 group">
                <summary className="font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  <span>¿Puedo agendar una consulta personalizada?</span>
                  <span className="text-coral-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-slate-600 mt-4">
                  Sí, ofrecemos consultas gratuitas de 15 minutos para ayudarte a elegir el curso adecuado. Menciona en el formulario que deseas agendar una llamada y te enviaremos las opciones disponibles.
                </p>
              </details>

              <details className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 group">
                <summary className="font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  <span>¿Atienden consultas fuera de España?</span>
                  <span className="text-coral-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-slate-600 mt-4">
                  Sí, nuestros cursos son 100% online y aceptamos estudiantes de cualquier país. Los precios se adaptan según tu ubicación.
                </p>
              </details>

              <details className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 group">
                <summary className="font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  <span>¿Ofrecen cursos para empresas?</span>
                  <span className="text-coral-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-slate-600 mt-4">
                  Sí, tenemos programas corporativos personalizados. Contáctanos con el asunto &quot;Formación para empresas&quot; y te enviaremos información detallada.
                </p>
              </details>

              <details className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 group">
                <summary className="font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  <span>¿Cómo puedo saber qué curso es mejor para mí?</span>
                  <span className="text-coral-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-slate-600 mt-4">
                  Te recomendamos empezar con nuestro{" "}
                  <Link href="/test-nivel" className="text-coral-600 font-bold hover:text-coral-700">
                    test de nivel gratuito
                  </Link>
                  . Basándonos en tus resultados y objetivos, te sugeriremos el programa más adecuado.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
