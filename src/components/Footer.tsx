import React from 'react';
import { Sparkles, Mail, MessageCircle, ArrowUp, SlidersHorizontal, Lock, ShieldCheck } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import { useAuth } from '../context/AuthContext';

export const Footer: React.FC = () => {
  const { setIsAdminOpen } = useCatalog();
  const { isAdmin } = useAuth();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#140E0A] text-[#BCAAA0] text-xs py-14 border-t border-[#3D2C20]">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#33251B]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E09F3E]/15 border border-[#E09F3E]/30 flex items-center justify-center text-[#E8AF50]">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xl text-[#F7EFE6] tracking-tight">
                Arte<span className="text-[#E8AF50]">MDF</span>
              </span>
            </div>
            <p className="text-[#9E8C7E] max-w-md text-xs leading-relaxed">
              Taller de corte y grabado láser LED en madera MDF. Especialistas en piezas de hasta 40 cm: altares tradicionales, lámparas iluminadas, cajas con bisagra flexible y recuerdos personalizados.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="mailto:rafajrosales@gmail.com"
              className="hover:text-[#E8AF50] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>rafajrosales@gmail.com</span>
            </a>

            <a
              href="https://wa.me/?text=Hola%20ArteMDF%2C%20solicito%20informaci%C3%B3n"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E8AF50] transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#211812] hover:bg-[#2F2218] text-[#D8B589] hover:text-white transition-colors"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[#8F7D70] text-[11px]">
          <div>
            © {new Date().getFullYear()} ArteMDF. Corte y grabado láser LED (máx. 40 cm · MDF 3 mm). Entregas a convenir Zona Norte CDMX y Tecámac (+10%).
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a href="#galeria" className="hover:text-[#F7EFE6] transition-colors">Galería</a>
            <span aria-hidden="true">·</span>
            <a href="#showreel" className="hover:text-[#F7EFE6] transition-colors">Showreel Video</a>
            <span aria-hidden="true">·</span>
            <a href="#cotizador" className="hover:text-[#F7EFE6] transition-colors">Cotizador 40cm</a>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-[#E8AF50] hover:text-[#F7EFE6] hover:underline flex items-center gap-1 transition-colors"
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-300">Admin Activo</span>
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3" />
                  <span>Gestión de Precios & Fotos (Google)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
