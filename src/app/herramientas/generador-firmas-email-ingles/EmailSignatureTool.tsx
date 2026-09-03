"use client";

import React, { useState } from 'react';
import { Navigation } from "@/components/sections/Navigation";
import { User, Share2, Sparkles, Send, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function EmailSignatureTool() {
  const [formData, setFormData] = useState({
    name: 'Tu Nombre',
    position: 'Tu Cargo (ej. Project Manager)',
    company: 'Tu Empresa',
    phone: '+34 600 000 000',
    website: 'www.focus-on-english.com',
    email: 'tu@email.com',
    signOff: 'Kind regards,'
  });

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const signatureElement = document.getElementById('signature-preview');
    if (signatureElement) {
      const range = document.createRange();
      range.selectNode(signatureElement);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand('copy');
      window.getSelection()?.removeAllRanges();
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareTool = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Generador de Firmas de Email en Inglés',
        text: 'Mira esta herramienta gratuita para crear firmas profesionales en inglés.',
        url: typeof window !== 'undefined' ? window.location.href : '',
      });
    } else {
      if (typeof window !== 'undefined') {
        navigator.clipboard.writeText(window.location.href);
      }
    }
  };

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-slate-50 pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-50 text-coral-600 font-bold text-sm mb-6 uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              Herramienta Gratuita
            </div>
            <h1 className="text-4xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight">
              Generador de Firmas de <span className="text-coral-500">Email en Inglés</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Crea una impresión impecable en tus correos internacionales. Diseño profesional y términos correctos en segundos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-coral-50 rounded-xl flex items-center justify-center">
                  <User className="text-coral-600 w-5 h-5" />
                </div>
                Tus Datos Profesionales
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-slate-700 font-bold text-sm">Nombre Completo</label>
                    <Input 
                      id="name" 
                      className="rounded-xl border-slate-200 focus:ring-coral-500"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="position" className="text-slate-700 font-bold text-sm">Cargo (en inglés)</label>
                    <Input 
                      id="position" 
                      className="rounded-xl border-slate-200 focus:ring-coral-500"
                      placeholder="ej. Project Manager"
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-slate-700 font-bold text-sm">Empresa</label>
                  <Input 
                    id="company" 
                    className="rounded-xl border-slate-200 focus:ring-coral-500"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-slate-700 font-bold text-sm">Email</label>
                    <Input 
                      id="email" 
                      type="email"
                      className="rounded-xl border-slate-200 focus:ring-coral-500"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-slate-700 font-bold text-sm">Teléfono</label>
                    <Input 
                      id="phone" 
                      className="rounded-xl border-slate-200 focus:ring-coral-500"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="website" className="text-slate-700 font-bold text-sm">Sitio Web</label>
                  <Input 
                    id="website" 
                    className="rounded-xl border-slate-200 focus:ring-coral-500"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="signOff" className="text-slate-700 font-bold text-sm">Despedida Profesional</label>
                  <select 
                    id="signOff"
                    className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-coral-500 outline-none transition-all"
                    value={formData.signOff}
                    onChange={(e) => setFormData({...formData, signOff: e.target.value})}
                  >
                    <option value="Kind regards,">Kind regards, (Recomendado UK/EU)</option>
                    <option value="Best regards,">Best regards, (Recomendado USA)</option>
                    <option value="Sincerely,">Sincerely, (Formal / Cartas)</option>
                    <option value="Best,">Best, (Informal / Conocidos)</option>
                    <option value="Many thanks,">Many thanks, (Agradecimiento)</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-2">
                    ¿No sabes cuál elegir? <Link href="/blog/trabajo/emails-profesionales-ingles" className="text-coral-600 hover:underline">Lee nuestra guía de emails.</Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Preview & Conversion */}
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border-4 border-dashed border-coral-100 relative group">
                <div className="absolute top-6 right-8 flex gap-2">
                   <button 
                    onClick={shareTool}
                    className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-coral-600 hover:bg-coral-50 transition-all"
                    title="Compartir herramienta"
                   >
                    <Share2 className="w-4 h-4" />
                   </button>
                </div>

                <div id="signature-preview" className="font-sans py-6" style={{ color: '#334155', lineHeight: '1.5' }}>
                  <p style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '500' }}>{formData.signOff}</p>
                  
                  <table cellPadding="0" cellSpacing="0" style={{ verticalAlign: 'middle' }}>
                    <tbody>
                      <tr>
                        <td style={{ paddingRight: '20px' }}>
                          <div style={{ width: '64px', height: '64px', backgroundColor: '#FF6B6B', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <span style={{ color: 'white', fontWeight: '900', width: '100%', fontSize: '28px' }}>
                              {formData.name.charAt(0)}
                            </span>
                          </div>
                        </td>
                        <td style={{ borderLeft: '3px solid #F1F5F9', paddingLeft: '20px' }}>
                          <p style={{ margin: '0', fontWeight: '900', fontSize: '20px', color: '#0F172A', letterSpacing: '-0.02em' }}>{formData.name}</p>
                          <p style={{ margin: '2px 0 0 0', fontSize: '15px', color: '#64748B', fontWeight: '500' }}>{formData.position} | <span style={{ color: '#FF6B6B', fontWeight: 'bold' }}>{formData.company}</span></p>
                          
                          <div style={{ marginTop: '12px', fontSize: '13px', color: '#475569', fontWeight: '500' }}>
                            <p style={{ margin: '3px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: '#94A3B8' }}>Email:</span> {formData.email}
                            </p>
                            <p style={{ margin: '3px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: '#94A3B8' }}>Phone:</span> {formData.phone}
                            </p>
                            <p style={{ margin: '3px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: '#94A3B8' }}>Web:</span> {formData.website}
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div style={{ marginTop: '24px', fontSize: '11px', color: '#94A3B8', borderTop: '1px solid #F1F5F9', paddingTop: '12px', fontStyle: 'italic' }}>
                    <p style={{ margin: '0' }}>
                      Certified Professional English by <a href="https://linguafly.app" style={{ color: '#FF6B6B', fontWeight: 'bold', textDecoration: 'none' }}>Focus English</a>
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <Button 
                    onClick={handleCopy}
                    className="w-full bg-coral-600 hover:bg-coral-700 text-white font-black py-8 rounded-2xl text-xl flex items-center justify-center gap-3 shadow-xl shadow-coral-200 transition-all active:scale-95"
                  >
                    {copied ? <Check className="w-6 h-6" /> : <Send className="w-6 h-6" />}
                    {copied ? '¡FIRMA COPIADA!' : 'COPIAR FIRMA PROFESIONAL'}
                  </Button>
                  <p className="text-center text-slate-400 text-xs mt-4 font-medium uppercase tracking-widest">
                    Compatible con Gmail, Outlook y Apple Mail
                  </p>
                </div>
              </div>

              {/* Conversion Card */}
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-coral-600/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4">¿Quieres sonar aún más profesional?</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    Tener una buena firma es solo el principio. Únete a Focus English y domina las reuniones, presentaciones y negociaciones en inglés con nuestro tutor de IA.
                  </p>
                  <Link 
                    href="/aprender-ingles" 
                    className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-5 rounded-2xl transition-all border border-white/10 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-coral-600 rounded-xl flex items-center justify-center font-black">AI</div>
                      <div>
                        <p className="font-black text-white">Prueba Focus English Gratis</p>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">7 Días de acceso total</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-coral-500 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* SEO Content */}
          <section className="mt-32">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-12 text-center">Claves para tu Firma en Inglés</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-4">La Despedida</h3>
                <p className="text-slate-600 leading-relaxed italic text-sm">
                  &quot;Sincerely&quot; es para cartas formales. En el día a día corporativo, usa &quot;Kind regards&quot; o &quot;Best regards&quot;.
                </p>
                <Link href="/blog/trabajo/negociacion-ingles-tecnicas-clave" className="text-coral-600 text-xs font-bold mt-4 inline-block hover:underline">
                  Ver técnicas de negociación →
                </Link>
              </div>
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-4">Cargos (Titles)</h3>
                <p className="text-slate-600 leading-relaxed italic text-sm">
                  Asegúrate de que tu cargo se entienda internacionalmente. Evita traducciones literales de cargos españoles.
                </p>
                <Link href="/blog/trabajo/vocabulario-negocios-ingles-esencial" className="text-coral-600 text-xs font-bold mt-4 inline-block hover:underline">
                  Ver vocabulario esencial →
                </Link>
              </div>
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-4">Disclaimers</h3>
                <p className="text-slate-600 leading-relaxed italic text-sm">
                  Incluir una pequeña nota sobre seguridad o profesionalidad añade un toque de seriedad a tu comunicación.
                </p>
                <Link href="/blog/trabajo/emails-profesionales-ingles" className="text-coral-600 text-xs font-bold mt-4 inline-block hover:underline">
                  Guía de emails →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}