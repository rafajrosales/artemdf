import React, { useState } from 'react';
import { Mail, MessageCircle, Clock, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`Nuevo Mensaje de Contacto ArteMDF - ${name}`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone || 'No especificado'}\n\nMensaje:\n${message}`
    );
    
    window.location.href = `mailto:rafajrosales@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-24 bg-[#17110C] border-b border-[#3D2C20]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Column: 5 cols */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E8AF50]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Contacto Directo</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F7EFE6] text-balance">
                Comunícate con el taller ArteMDF
              </h2>
              <p className="text-sm text-[#C7B5A6] leading-relaxed">
                ¿Tienes una idea especial en mente dentro de nuestro formato de 40 cm, necesitas recuerdos para un evento social o buscas una pieza para tu negocio? Escríbenos y te responderemos hoy mismo.
              </p>
            </div>

            {/* Direct contact cards */}
            <div className="space-y-4">
              {/* Email */}
              <a
                href="mailto:rafajrosales@gmail.com"
                className="p-4 bg-[#211812] hover:bg-[#2A1F17] border border-[#3D2C20] hover:border-[#523B2B] rounded-xl flex items-center gap-4 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#E09F3E]/15 border border-[#E09F3E]/30 flex items-center justify-center text-[#E8AF50] shrink-0 group-hover:bg-[#E09F3E]/25 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <span className="text-[11px] text-[#9E8C7E] block uppercase tracking-wider">Correo Directo</span>
                  <span className="text-sm font-semibold text-[#F7EFE6] group-hover:text-[#E8AF50] transition-colors truncate block">
                    rafajrosales@gmail.com
                  </span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/?text=Hola%20ArteMDF%2C%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20sus%20dise%C3%B1os%20en%20madera%20MDF%20(formato%20hasta%2040cm)."
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-[#211812] hover:bg-[#2A1F17] border border-[#3D2C20] hover:border-[#523B2B] rounded-xl flex items-center gap-4 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-500/25 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#9E8C7E] block uppercase tracking-wider">WhatsApp Rápido</span>
                  <span className="text-sm font-semibold text-[#F7EFE6] group-hover:text-emerald-400 transition-colors">
                    Iniciar chat inmediato
                  </span>
                </div>
              </a>

              {/* Hours & Location */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-[#1B140E] border border-[#36271C] rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-[#9E8C7E] text-xs">
                    <Clock className="w-3.5 h-3.5 text-[#E09F3E]" />
                    <span>Horario</span>
                  </div>
                  <p className="text-xs font-semibold text-[#D8B589]">
                    Lun a Sáb: 9am - 7pm
                  </p>
                </div>

                <div className="p-3 bg-[#1B140E] border border-[#36271C] rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-[#9E8C7E] text-xs">
                    <MapPin className="w-3.5 h-3.5 text-[#E09F3E]" />
                    <span>Zonas de Entrega</span>
                  </div>
                  <p className="text-xs font-semibold text-[#D8B589] leading-snug">
                    Zona Norte CDMX · Tecámac (+10%)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Form: 7 cols */}
          <div className="lg:col-span-7 bg-[#211812] border border-[#3D2C20] rounded-2xl p-6 sm:p-8 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#F7EFE6]">
                  ¡Mensaje preparado con éxito!
                </h3>
                <p className="text-xs sm:text-sm text-[#C7B5A6] max-w-md mx-auto">
                  Se ha generado tu correo hacia <strong>rafajrosales@gmail.com</strong>. Te responderemos hoy mismo con la información solicitada.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#E8AF50] hover:text-[#17110C] bg-[#2A1F17] hover:bg-[#E09F3E] border border-[#E09F3E]/40 rounded-lg transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display text-xl font-bold text-[#F7EFE6]">
                    Envíanos un Mensaje
                  </h3>
                  <p className="text-xs text-[#9E8C7E]">
                    Escribe tus dudas sobre corte láser en MDF, medidas o cotizaciones especiales.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#D8B589] font-medium">Nombre completo *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Roberto Sánchez"
                      className="w-full px-3.5 py-2.5 bg-[#17110C] border border-[#3D2C20] focus:border-[#E09F3E] rounded-lg text-xs text-[#F7EFE6] placeholder-[#8F7D70] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#D8B589] font-medium">Correo electrónico *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="roberto@ejemplo.com"
                      className="w-full px-3.5 py-2.5 bg-[#17110C] border border-[#3D2C20] focus:border-[#E09F3E] rounded-lg text-xs text-[#F7EFE6] placeholder-[#8F7D70] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#D8B589] font-medium">Teléfono / WhatsApp (Opcional)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej. +52 55 1234 5678"
                    className="w-full px-3.5 py-2.5 bg-[#17110C] border border-[#3D2C20] focus:border-[#E09F3E] rounded-lg text-xs text-[#F7EFE6] placeholder-[#8F7D70] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#D8B589] font-medium">¿Qué proyecto deseas realizar? (Máx. 40cm) *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe la pieza, medidas aproximadas (hasta 40 cm), grabado requerido o fecha deseada..."
                    className="w-full px-3.5 py-2.5 bg-[#17110C] border border-[#3D2C20] focus:border-[#E09F3E] rounded-lg text-xs text-[#F7EFE6] placeholder-[#8F7D70] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-[#17110C] bg-[#E09F3E] hover:bg-[#ECAE52] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensaje al Taller</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
