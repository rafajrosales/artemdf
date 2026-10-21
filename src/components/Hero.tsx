import React, { useState } from 'react';
import { ArrowRight, Sparkles, Sliders, Check } from 'lucide-react';
import { WORKSHOP_STATS } from '../data/galleryData';

interface HeroProps {
  onOpenQuote: () => void;
  onSelectHeroItem: (itemId: string) => void;
}

const HERO_SLIDES = [
  {
    id: 'altar-monumental-3n',
    title: 'Altar Tradicional de 3 Niveles',
    subtitle: 'Formato Modular 40 cm',
    image: '/gallery/artemdf_01_20241026_094119.jpg',
    badge: 'Obra Emblemática',
    specs: ['Área de corte hasta 40 cm', 'Calaveras y papel picado', 'Marcos calados y candelabros', 'MDF 3mm y refuerzos']
  },
  {
    id: 'lampara-arbol-vida',
    title: 'Lámpara Cubo "Árbol de la Vida"',
    subtitle: 'Iluminación Cálida Ambiental',
    image: '/gallery/artemdf_07_20251031_200446.jpg',
    badge: 'Diseño Exclusivo',
    specs: ['Silueta botánica calada', 'Difusor de luz traslúcido', 'Acabado tono nogal tostado', 'Luz LED cálida incluida']
  },
  {
    id: 'caja-curva-kerf',
    title: 'Caja Curva con Bisagra Living Hinge',
    subtitle: 'Ingeniería Paramétrica Láser',
    image: '/gallery/artemdf_24_IMG_20261008_WA0003.jpeg',
    badge: 'Técnica Kerf Bending',
    specs: ['Madera curvada sin vapor', 'Microcortes de desahogo', 'Tapa y ensamble perfecto', 'Cero quiebres en MDF']
  }
];

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onSelectHeroItem }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const currentItem = HERO_SLIDES[activeSlide];

  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-[#3D2C20]">
      {/* Warm laser glow in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-[#E09F3E]/8 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Split Hero: Left Column Typography, Right Column Visual Anchor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: 7 cols */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#E8AF50]">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Taller Láser LED · MDF 3 mm · Hasta 40 cm</span>
              </div>
              <a
                href="#showreel"
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-amber-200 bg-red-950/70 border border-red-500/40 rounded-full hover:bg-red-900/80 transition-colors shadow-sm"
              >
                <span>🎄 Video Especial Navidad</span>
                <span className="text-[10px] text-amber-400">Ver Villa →</span>
              </a>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F7EFE6] text-balance leading-[1.15] sm:leading-[1.1]">
              El arte del <span className="text-[#E8AF50]">corte láser</span> en madera <span className="text-[#D8B589]">MDF 3 mm</span>.
            </h1>

            <p className="text-sm sm:text-lg text-[#C7B5A6] max-w-2xl font-normal leading-relaxed">
              Diseñamos y fabricamos piezas exclusivas cortadas con tecnología láser LED de alta definición sobre <strong>MDF de 3 mm únicamente</strong>.
              Especialistas en altares tradicionales, luminarias cálidas, alhajeros curvos living hinge y recuerdos conmemorativos en área útil de hasta <strong>40 x 40 cm</strong>.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#galeria"
                className="px-6 py-3.5 min-h-[48px] text-xs font-semibold uppercase tracking-wider text-[#17110C] bg-[#E09F3E] hover:bg-[#ECAE52] rounded-lg shadow-md shadow-[#E09F3E]/20 transition-all transform active:scale-95 whitespace-nowrap flex items-center justify-center gap-2"
              >
                <span>Explorar Galería</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenQuote}
                className="px-6 py-3.5 min-h-[48px] text-xs font-semibold uppercase tracking-wider text-[#F7EFE6] hover:text-white bg-[#261C14] hover:bg-[#33251B] border border-[#4D382A] rounded-lg transition-all whitespace-nowrap flex items-center justify-center gap-2 active:scale-95"
              >
                <Sliders className="w-4 h-4 text-[#E8AF50]" />
                <span>Cotizar en MDF 3mm (Máx. 40cm)</span>
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#9E8C7E] border-t border-[#3D2C20]">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#E8AF50]" />
                <span>Espesor único: MDF 3 mm de alta densidad</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#E8AF50]" />
                <span>Cama útil láser LED de 40 x 40 cm</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#E8AF50]" />
                <span>Entregas a convenir: Zona Norte CDMX & Tecámac (+10%)</span>
              </div>
            </div>
          </div>

          {/* Right Column: 5 cols Featured Interactive Showcase */}
          <div className="lg:col-span-5">
            <div className="bg-[#211812] border border-[#3D2C20] rounded-2xl p-4 sm:p-5 shadow-2xl relative">
              {/* Image Frame */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#140E0A] border border-[#3D2C20] group">
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140E0A]/95 via-[#140E0A]/30 to-transparent pointer-events-none" />

                {/* Badge */}
                <div className="absolute top-3 left-3 bg-[#1C140E]/90 backdrop-blur-md border border-[#4D382A] text-[#E8AF50] text-xs font-medium px-3 py-1 rounded-md">
                  {currentItem.badge}
                </div>

                {/* Bottom Title on Image */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <p className="text-xs font-medium text-[#E8AF50]">{currentItem.subtitle}</p>
                  <h3 className="text-lg font-bold text-[#F7EFE6] tracking-tight">{currentItem.title}</h3>
                </div>
              </div>

              {/* Specs & Slide Selector */}
              <div className="mt-4 pt-4 border-t border-[#33251B] space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs text-[#C7B5A6]">
                  {currentItem.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E09F3E] shrink-0" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1.5">
                    {HERO_SLIDES.map((slide, idx) => (
                      <button
                        key={slide.id}
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`Ver diapositiva ${slide.title}`}
                        className={`h-2 rounded-full transition-all ${
                          idx === activeSlide ? 'w-6 bg-[#E09F3E]' : 'w-2 bg-[#423124] hover:bg-[#5C4533]'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectHeroItem(currentItem.id)}
                    className="text-xs font-semibold text-[#E8AF50] hover:text-[#F3CA7E] transition-colors flex items-center gap-1"
                  >
                    <span>Ver en Galería</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Metric Strip Below Hero Split */}
        <div className="mt-16 pt-8 border-t border-[#3D2C20] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {WORKSHOP_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#F7EFE6] tabular-nums tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-[#D8B589]">
                {stat.label}
              </div>
              <div className="text-xs text-[#9E8C7E]">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
