import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, MessageSquare, SlidersHorizontal, ShieldCheck, Lock } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const { setIsAdminOpen } = useCatalog();
  const { user, isAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#18120D]/95 backdrop-blur-md border-b border-[#3D2C20] shadow-lg shadow-black/40'
          : 'bg-transparent border-b border-[#33251B]/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single element, warm MDF wood aesthetic) */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-[#F7EFE6] hover:text-[#E8AF50] transition-colors whitespace-nowrap shrink-0 group"
        >
          <div className="w-9 h-9 rounded-lg bg-[#E09F3E]/15 border border-[#E09F3E]/30 flex items-center justify-center text-[#E8AF50] group-hover:bg-[#E09F3E]/25 transition-colors">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-[#F7EFE6]">
            Arte<span className="text-[#E8AF50]">MDF</span>
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#C4B4A5]">
          <a
            href="#galeria"
            className="hover:text-[#E8AF50] transition-colors whitespace-nowrap shrink-0"
          >
            Galería de Obras
          </a>
          <a
            href="#showreel"
            className="hover:text-[#E8AF50] transition-colors whitespace-nowrap shrink-0"
          >
            Showreel Video
          </a>
          <a
            href="#taller"
            className="hover:text-[#E8AF50] transition-colors whitespace-nowrap shrink-0"
          >
            Taller & Láser 40cm
          </a>
          <a
            href="#preguntas"
            className="hover:text-[#E8AF50] transition-colors whitespace-nowrap shrink-0"
          >
            Preguntas Frecuentes
          </a>
          <a
            href="#contacto"
            className="hover:text-[#E8AF50] transition-colors whitespace-nowrap shrink-0"
          >
            Contacto Directo
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsAdminOpen(true)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
              isAdmin
                ? 'text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40'
                : 'text-[#E8AF50] hover:text-[#17110C] bg-[#241A13] hover:bg-[#E09F3E] border border-[#E09F3E]/40'
            }`}
            title="Panel de actualización de fotos y precios (Protegido con Google)"
          >
            {isAdmin ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admin Activo</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-[#E09F3E]" />
                <span>Precios & Fotos</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenQuote}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#17110C] bg-[#E09F3E] hover:bg-[#ECAE52] rounded-lg shadow-sm shadow-[#E09F3E]/20 transition-all transform active:scale-95 whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Cotizar Proyecto (Hasta 40cm)</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#C4B4A5] hover:text-white rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E09F3E]"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1E1712] border-b border-[#3D2C20] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base text-[#D4C5B8]">
            <a
              href="#galeria"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#E8AF50] transition-colors"
            >
              Galería de Obras
            </a>
            <a
              href="#showreel"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#E8AF50] transition-colors"
            >
              Showreel Video
            </a>
            <a
              href="#taller"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#E8AF50] transition-colors"
            >
              Taller & Láser 40cm
            </a>
            <a
              href="#preguntas"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#E8AF50] transition-colors"
            >
              Preguntas Frecuentes
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#E8AF50] transition-colors"
            >
              Contacto Directo
            </a>
          </nav>
          <div className="pt-2 border-t border-[#3D2C20] space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminOpen(true);
              }}
              className={`w-full py-2.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
                isAdmin
                  ? 'text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40'
                  : 'text-[#E8AF50] hover:text-[#17110C] bg-[#281D15] hover:bg-[#E09F3E] border border-[#E09F3E]/40'
              }`}
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Admin Activo: {user?.email || 'rafajrosales@gmail.com'}</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#E09F3E]" />
                  <span>Panel de Precios & Fotos (Google Auth)</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#17110C] bg-[#E09F3E] hover:bg-[#ECAE52] rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Solicitar Presupuesto (Hasta 40cm)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
