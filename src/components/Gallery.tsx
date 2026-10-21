import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal, 
  Sparkles, 
  Eye, 
  Send, 
  ZoomIn, 
  ZoomOut,
  Layers,
  Clock,
  Coins,
  Grid,
  Columns,
  Edit3
} from 'lucide-react';
import { GalleryItem } from '../data/galleryData';
import { useCatalog } from '../context/CatalogContext';

interface GalleryProps {
  onSelectForQuote: (item: GalleryItem) => void;
  selectedItemId?: string | null;
}

const CATEGORIES = [
  'Todos',
  'Altares & Tradición',
  'Lámparas & Luz',
  'Cajas & Bisagras',
  'Comercial & QR',
  'Navidad & Festivos',
  'Organizadores & Hogar',
  'Eventos & Sacro',
  'Decoración & Arte'
] as const;

export const Gallery: React.FC<GalleryProps> = ({ onSelectForQuote, selectedItemId }) => {
  const { items, setIsAdminOpen } = useCatalog();
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [layoutMode, setLayoutMode] = useState<'bento' | 'compact'>('bento');

  // Handle selected item from props if user clicked from hero
  useEffect(() => {
    if (selectedItemId) {
      const found = items.find(i => i.id === selectedItemId);
      if (found) {
        setActiveItem(found);
        const element = document.getElementById('galeria');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [selectedItemId, items]);

  // Keep activeItem in sync if items update in the background
  useEffect(() => {
    if (activeItem) {
      const updated = items.find(i => i.id === activeItem.id);
      if (updated && (updated.estimatedPriceMxn !== activeItem.estimatedPriceMxn || updated.image !== activeItem.image || updated.title !== activeItem.title)) {
        setActiveItem(updated);
      }
    }
  }, [items, activeItem]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === 'Escape') {
        setActiveItem(null);
        setZoomLevel(1);
      } else if (e.key === 'ArrowRight') {
        handleNextItem();
      } else if (e.key === 'ArrowLeft') {
        handlePrevItem();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem]);

  // Filter & Sort
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
      if (sortBy === 'price-asc') return a.estimatedPriceMxn - b.estimatedPriceMxn;
      if (sortBy === 'price-desc') return b.estimatedPriceMxn - a.estimatedPriceMxn;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [items, activeCategory, searchQuery, sortBy]);

  const currentIndex = activeItem ? filteredItems.findIndex(i => i.id === activeItem.id) : -1;

  const handleNextItem = () => {
    if (currentIndex === -1 || filteredItems.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredItems.length;
    setActiveItem(filteredItems[nextIdx]);
    setZoomLevel(1);
  };

  const handlePrevItem = () => {
    if (currentIndex === -1 || filteredItems.length === 0) return;
    const prevIdx = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveItem(filteredItems[prevIdx]);
    setZoomLevel(1);
  };

  return (
    <section id="galeria" className="py-24 bg-[#17110C] text-[#F7EFE6] border-b border-[#3D2C20]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#33251B]">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E8AF50]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Obras en Madera MDF · Hasta 40 cm</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F7EFE6] text-balance">
              Galería interactiva de piezas y ensambles
            </h2>
            <p className="text-sm text-[#C7B5A6]">
              Explora nuestros trabajos en MDF natural y tintado. Cortes y grabados láser LED de alta fidelidad, listos para personalizar o pedir tal como los ves.
            </p>
          </div>

          {/* Search Bar & Admin Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
            <div className="w-full sm:w-72 relative">
              <Search className="w-4 h-4 text-[#9E8C7E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar altar, lámpara, caja..."
                className="w-full pl-10 pr-9 py-2.5 bg-[#231A13] border border-[#3D2C20] focus:border-[#E09F3E] rounded-lg text-xs text-[#F7EFE6] placeholder-[#8F7D70] focus:outline-none focus:ring-1 focus:ring-[#E09F3E] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E8C7E] hover:text-white"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-3.5 py-2.5 text-xs font-semibold text-[#E8AF50] hover:text-[#17110C] bg-[#2A1F17] hover:bg-[#E09F3E] border border-[#E09F3E]/40 rounded-lg transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
              title="Abrir panel para actualizar fotos y precios de todas las piezas"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar Fotos & Precios</span>
            </button>
          </div>
        </div>

        {/* Interactive Filter Controls & Sort Options */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Segmented Category Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeCategory === category
                    ? 'bg-[#E09F3E] text-[#17110C] font-semibold shadow-sm'
                    : 'bg-[#231A13] text-[#C7B5A6] hover:text-white hover:bg-[#2F231A] border border-[#3D2C20]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort & Layout Toggles */}
          <div className="flex items-center gap-3 shrink-0 self-end lg:self-auto">
            <div className="flex items-center gap-2 bg-[#231A13] border border-[#3D2C20] rounded-lg px-2.5 py-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#9E8C7E]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-[#D8B589] focus:outline-none cursor-pointer"
                aria-label="Ordenar obras"
              >
                <option value="featured" className="bg-[#231A13]">Destacados</option>
                <option value="price-asc" className="bg-[#231A13]">Precio: Menor a Mayor</option>
                <option value="price-desc" className="bg-[#231A13]">Precio: Mayor a Menor</option>
                <option value="name" className="bg-[#231A13]">Alfabético</option>
              </select>
            </div>

            <div className="flex items-center bg-[#231A13] border border-[#3D2C20] rounded-lg p-0.5">
              <button
                onClick={() => setLayoutMode('bento')}
                className={`p-1.5 rounded transition-colors ${
                  layoutMode === 'bento' ? 'bg-[#E09F3E] text-[#17110C]' : 'text-[#8F7D70] hover:text-white'
                }`}
                aria-label="Vista Bento"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLayoutMode('compact')}
                className={`p-1.5 rounded transition-colors ${
                  layoutMode === 'compact' ? 'bg-[#E09F3E] text-[#17110C]' : 'text-[#8F7D70] hover:text-white'
                }`}
                aria-label="Vista Columnas"
              >
                <Columns className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Empty Search State */}
        {filteredItems.length === 0 && (
          <div className="py-20 text-center space-y-3 bg-[#231A13]/50 border border-[#3D2C20] rounded-2xl p-8">
            <p className="text-sm font-semibold text-[#D8B589]">No se encontraron piezas con ese término</p>
            <p className="text-xs text-[#9E8C7E]">Prueba con otra palabra clave o solicita un diseño desde cero en el cotizador.</p>
            <button
              onClick={() => { setActiveCategory('Todos'); setSearchQuery(''); }}
              className="mt-2 px-4 py-2 text-xs font-medium text-[#E8AF50] hover:text-[#17110C] bg-[#2A1F17] hover:bg-[#E09F3E] border border-[#E09F3E]/40 rounded-lg transition-colors"
            >
              Restablecer Filtros
            </button>
          </div>
        )}

        {/* Gallery Grid with Warm Wood Cards */}
        <div className={`grid gap-6 ${
          layoutMode === 'bento'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        }`}>
          {filteredItems.map((item, idx) => {
            const isLarge = layoutMode === 'bento' && (idx % 7 === 0);
            return (
              <div
                key={item.id}
                className={`group bg-[#231A13] hover:bg-[#2C2118] border border-[#3D2C20] hover:border-[#523B2B] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col shadow-lg shadow-black/30 ${
                  isLarge ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
              >
                {/* Image Container with Safe Fallback */}
                <div 
                  onClick={() => setActiveItem(item)}
                  className="relative aspect-[4/3] bg-[#140E0A] overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Scrim in Warm Sepia */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140E0A]/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top-Right Quick Preview Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#1A120C]/80 backdrop-blur-md text-[#C7B5A6] group-hover:text-[#E8AF50] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4" />
                  </div>

                  {/* Clean unboxed category overlay */}
                  <div className="absolute top-3 left-3 bg-[#1A120C]/90 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-medium text-[#D8B589] border border-[#3D2C20]">
                    {item.category}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Unboxed Metadata (Anti-Pill Rule) */}
                    <div className="flex items-center gap-2 text-xs text-[#9E8C7E]">
                      <span>{item.dimensions}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.mdfThickness.split(' ')[0]} {item.mdfThickness.split(' ')[1]}</span>
                    </div>

                    <h3 
                      onClick={() => setActiveItem(item)}
                      className="font-display text-base font-bold text-[#F7EFE6] group-hover:text-[#E8AF50] transition-colors cursor-pointer leading-snug"
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#C7B5A6] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions & Price */}
                  <div className="pt-3 border-t border-[#33251B] flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-[#8F7D70] block uppercase tracking-wider">Estimado</span>
                      <span className="font-display font-bold text-[#E8AF50] tabular-nums text-sm">
                        ${item.estimatedPriceMxn} <span className="text-[11px] font-normal text-[#9E8C7E]">MXN</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveItem(item)}
                        className="px-2.5 py-1.5 text-xs text-[#C7B5A6] hover:text-white bg-[#2E2219] hover:bg-[#3D2C20] rounded-md transition-colors"
                        aria-label={`Ver detalles de ${item.title}`}
                      >
                        Detalles
                      </button>

                      <button
                        onClick={() => onSelectForQuote(item)}
                        className="px-3 py-1.5 text-xs font-semibold text-[#17110C] bg-[#E09F3E] hover:bg-[#ECAE52] rounded-md transition-colors flex items-center gap-1.5"
                      >
                        <Send className="w-3 h-3" />
                        <span>Cotizar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {activeItem && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
          >
            {/* Close button */}
            <button
              onClick={() => { setActiveItem(null); setZoomLevel(1); }}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-[#231A13] hover:bg-[#33251B] text-[#C7B5A6] hover:text-white border border-[#4A3729] flex items-center justify-center transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevItem}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#231A13]/90 hover:bg-[#33251B] text-[#F7EFE6] border border-[#4A3729] flex items-center justify-center transition-colors"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextItem}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#231A13]/90 hover:bg-[#33251B] text-[#F7EFE6] border border-[#4A3729] flex items-center justify-center transition-colors"
              aria-label="Siguiente foto"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <div className="max-w-5xl w-full max-h-[90vh] bg-[#1C140E] border border-[#4A3729] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl relative z-10">
              {/* Media Column: 7 cols */}
              <div className="lg:col-span-7 bg-[#100B07] flex flex-col items-center justify-center relative overflow-hidden min-h-[300px] lg:min-h-[500px]">
                <div 
                  className="w-full h-full flex items-center justify-center p-4 transition-transform duration-200"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-[75vh] object-contain rounded-lg"
                  />
                </div>

                {/* Zoom Controls Bar */}
                <div className="absolute bottom-4 left-4 bg-[#231A13]/90 backdrop-blur-md border border-[#4A3729] rounded-lg p-1 flex items-center gap-1">
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(0.75, prev - 0.25))}
                    className="p-1.5 text-[#C7B5A6] hover:text-white transition-colors"
                    aria-label="Alejar"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono text-[#D8B589] px-1">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.25))}
                    className="p-1.5 text-[#C7B5A6] hover:text-white transition-colors"
                    aria-label="Acercar"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Info Column: 5 cols */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#E8AF50] font-medium">
                    <span>{activeItem.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>Taller Láser LED (Máx. 40 cm)</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#F7EFE6] tracking-tight">
                    {activeItem.title}
                  </h3>

                  <p className="text-sm text-[#C7B5A6] leading-relaxed">
                    {activeItem.description}
                  </p>

                  {/* Technical Specifications */}
                  <div className="pt-4 border-t border-[#33251B] space-y-2.5 text-xs">
                    <div className="flex items-start justify-between text-[#C7B5A6]">
                      <span className="text-[#9E8C7E] flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#E09F3E]" />
                        <span>Material & Espesor:</span>
                      </span>
                      <span className="font-medium text-[#F7EFE6] text-right">{activeItem.mdfThickness}</span>
                    </div>

                    <div className="flex items-start justify-between text-[#C7B5A6]">
                      <span className="text-[#9E8C7E] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#E09F3E]" />
                        <span>Tiempo de Fabricación:</span>
                      </span>
                      <span className="font-medium text-[#F7EFE6]">{activeItem.productionTime}</span>
                    </div>

                    <div className="flex items-start justify-between text-[#C7B5A6]">
                      <span className="text-[#9E8C7E] flex items-center gap-1.5">
                        <Coins className="w-3.5 h-3.5 text-[#E09F3E]" />
                        <span>Medidas (Máx. 40 cm):</span>
                      </span>
                      <span className="font-medium text-[#F7EFE6]">{activeItem.dimensions}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] text-[#9E8C7E]">
                    {activeItem.tags.map((tag, i) => (
                      <span key={i} className="text-[#D8B589]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action in Lightbox */}
                <div className="pt-6 border-t border-[#33251B] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-[#9E8C7E]">Precio estimado de referencia:</span>
                    <span className="font-display text-xl font-bold text-[#E8AF50] tabular-nums">
                      ${activeItem.estimatedPriceMxn} <span className="text-xs font-normal text-[#9E8C7E]">MXN</span>
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectForQuote(activeItem);
                      setActiveItem(null);
                    }}
                    className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#17110C] bg-[#E09F3E] hover:bg-[#ECAE52] rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Cotizar Este Modelo (Hasta 40cm)</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsAdminOpen(true);
                      setActiveItem(null);
                    }}
                    className="w-full py-2 text-xs font-medium text-[#E8AF50] hover:text-[#17110C] bg-[#281D15] hover:bg-[#E09F3E] border border-[#E09F3E]/30 rounded-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Actualizar Foto o Precio de esta Pieza</span>
                  </button>

                  <p className="text-[11px] text-center text-[#8F7D70]">
                    Se adaptará a tus medidas deseadas dentro del área de corte de 40 cm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
