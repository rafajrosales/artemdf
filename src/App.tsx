import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VideoSection } from './components/VideoSection';
import { Gallery } from './components/Gallery';
import { QuoteCalculator } from './components/QuoteCalculator';
import { WorkshopProcess } from './components/WorkshopProcess';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { CatalogProvider } from './context/CatalogContext';
import { AuthProvider } from './context/AuthContext';
import { GalleryItem } from './data/galleryData';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [selectedQuoteItem, setSelectedQuoteItem] = useState<GalleryItem | null>(null);
  const [selectedGalleryHeroId, setSelectedGalleryHeroId] = useState<string | null>(null);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string | null>(null);

  const handleOpenQuote = () => {
    const el = document.getElementById('cotizador');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectForQuote = (item: GalleryItem) => {
    setSelectedQuoteItem(item);
    handleOpenQuote();
  };

  const handleHeroSelectItem = (itemId: string) => {
    setSelectedGalleryHeroId(itemId);
  };

  const handleSelectNavidadCategory = () => {
    setSelectedGalleryCategory('Navidad & Festivos');
    const el = document.getElementById('galeria');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AuthProvider>
      <CatalogProvider>
        <div className="min-h-screen bg-[#17110C] text-[#F7EFE6] flex flex-col selection:bg-[#E09F3E]/30 selection:text-[#E8C99B]">
        {/* Top Navbar */}
        <Navbar onOpenQuote={handleOpenQuote} />

        {/* Main Content */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero 
            onOpenQuote={handleOpenQuote} 
            onSelectHeroItem={handleHeroSelectItem} 
          />

          {/* Video Showreel & Christmas Season Showcase */}
          <VideoSection 
            onSelectNavidadCategory={handleSelectNavidadCategory}
            onOpenQuote={handleOpenQuote}
          />

          {/* Interactive Gallery & Lightbox */}
          <Gallery 
            onSelectForQuote={handleSelectForQuote}
            selectedItemId={selectedGalleryHeroId}
            selectedCategory={selectedGalleryCategory}
          />

          {/* Interactive Quote Calculator & Budget Builder (Max 40cm) */}
          <QuoteCalculator 
            selectedItem={selectedQuoteItem}
            onClearSelectedItem={() => setSelectedQuoteItem(null)}
          />

          {/* Workshop Methodology & Steps */}
          <WorkshopProcess />

          {/* FAQs */}
          <FaqSection />

          {/* Direct Contact Form & Info */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Admin Panel Modal / Dashboard for Photos and Prices */}
        <AdminPanel />

        {/* Floating WhatsApp Action Pill */}
        <a
          href="https://wa.me/?text=Hola%20ArteMDF%2C%20quisiera%20solicitar%20un%20presupuesto%20para%20un%20proyecto%20en%20MDF%20(formato%20hasta%2040cm)."
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-400 text-[#17110C] px-4 py-3 rounded-full font-semibold text-xs shadow-xl shadow-black/60 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 border border-emerald-400/40"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="w-4 h-4 fill-[#17110C]" />
          <span className="hidden sm:inline font-bold">¿Dudas? Escríbenos por WhatsApp</span>
          <span className="sm:hidden font-bold">WhatsApp</span>
        </a>
      </div>
    </CatalogProvider>
  </AuthProvider>
  );
}
