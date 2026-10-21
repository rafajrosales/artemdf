import React, { useRef, useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  RotateCcw, 
  Video, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  TreePine, 
  Home, 
  Flame, 
  Gift 
} from 'lucide-react';

interface VideoSectionProps {
  onSelectNavidadCategory?: () => void;
  onOpenQuote?: () => void;
}

type VideoTab = 'navidad' | 'showreel';

export const VideoSection: React.FC<VideoSectionProps> = ({ 
  onSelectNavidadCategory,
  onOpenQuote 
}) => {
  const [activeTab, setActiveTab] = useState<VideoTab>('navidad');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const GOOGLE_PHOTOS_URL = 'https://photos.app.goo.gl/UikuqkJn3AH4yNzt7';

  // Current video source config
  const videoData = {
    navidad: {
      src: '/videos/navidad_artemdf.mp4',
      poster: '/gallery/navidad_thumb_01.jpg',
      badge: '🎄 Publicación Especial · Temporada Navideña',
      title: 'Villa Navideña Artesanal en MDF 3 mm',
      tagline: 'Casitas de madera natural, tejados calados y pino navideño (sin luz)',
      description: 'Disfruta el video oficial de nuestra villa navideña artesanal: un conjunto decorativo de casitas cortadas al milímetro con láser LED en MDF de 3 mm al natural, sin instalación eléctrica (modelo sin luz), con acabados limpios, techos calados, chimeneas y pino central para decorar nacimientos, repisas o mesas.',
      bulletPoints: [
        {
          title: 'Casitas en MDF 3 mm Natural (Sin Luz)',
          desc: 'Piezas decorativas de 8 a 12 cm de alto en MDF 3 mm sin componentes eléctricos ni luces, con ventanas y chimeneas caladas y ensamble limpio.'
        },
        {
          title: 'Pino Navideño Central Calado',
          desc: 'Árbol decorativo geométrico con base concéntrica firme y siluetas caladas para acompañar la aldea navideña.'
        },
        {
          title: 'Formato Óptimo & Madera Calibrada (40 cm)',
          desc: 'Diseñado dentro de nuestra área máxima de 40 x 40 cm. Acabado de madera tostada ámbar con cantos suaves sin hollín.'
        },
        {
          title: 'Grabado y Personalización Familiar',
          desc: 'Podemos grabar el apellido de la familia, dedicatorias o logotipos en las fachadas de las casitas o en la peana base.'
        }
      ]
    },
    showreel: {
      src: '/videos/artemdf_showreel.mp4',
      poster: '/gallery/artemdf_01_20241026_094119.jpg',
      badge: '⚙️ Taller en Acción · Precisión Láser LED',
      title: 'Corte láser LED y acabado artesanal en MDF',
      tagline: 'Ensamblados limpios, cajas curvas kerf bending y luminarias botánicas',
      description: 'Descubre en video el ensamblado y los acabados de altares, lámparas botánicas y cajas curvadas en nuestro formato exclusivo de 3 mm y hasta 40 cm.',
      bulletPoints: [
        {
          title: 'Cama útil de 40 x 40 cm',
          desc: 'Dimensiones ideales para mesas de centro, lámparas cúbicas y nichos conmemorativos sin desperdicio.'
        },
        {
          title: 'Bisagras Living Hinge Curvadas',
          desc: 'Patrones paramétricos de desahogo que permiten doblar la madera rígida de 3 mm formando cilindros y cofres.'
        },
        {
          title: 'Fibra de MDF de Alta Densidad',
          desc: 'Gran estabilidad estructural, aristas con quemado ámbar controlado y grabado pirográfico indeleble.'
        },
        {
          title: 'Entregas Personales Directas',
          desc: 'En mano en Zona Norte CDMX y Los Héroes Tecámac para garantizar el cuidado absoluto de cada pieza.'
        }
      ]
    }
  };

  const currentConfig = videoData[activeTab];

  // Pause and reset when tab changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
      videoRef.current.load();
    }
  }, [activeTab]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Playback error:', err);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newTime = (parseFloat(e.target.value) / 100) * (videoRef.current.duration || 1);
    videoRef.current.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(err => {
      console.warn('Playback error:', err);
    });
  };

  const handleGoToNavidadGallery = () => {
    if (onSelectNavidadCategory) {
      onSelectNavidadCategory();
    } else {
      const el = document.getElementById('galeria');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoToQuote = () => {
    if (onOpenQuote) {
      onOpenQuote();
    } else {
      const el = document.getElementById('cotizador');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="showreel" className="py-20 bg-[#1A130D]/90 border-b border-[#3D2C20] relative">
      {/* Subtle warm festive glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#E09F3E]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E8AF50] bg-[#271C14] px-3.5 py-1.5 rounded-full border border-[#E8AF50]/30 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#E8AF50]" />
            <span>Galería Audiovisual · Taller Láser LED 40 cm</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F7EFE6] text-balance">
            {activeTab === 'navidad' ? (
              <>
                Especial <span className="text-[#E8AF50]">Temporada Navideña</span> en MDF 3 mm
              </>
            ) : (
              <>
                Corte láser LED y <span className="text-[#E8AF50]">acabado artesanal</span> en MDF
              </>
            )}
          </h2>

          <p className="text-xs sm:text-base text-[#C7B5A6] leading-relaxed">
            {currentConfig.description}
          </p>

          {/* Interactive Mode Switcher Tabs */}
          <div className="flex flex-col sm:inline-flex sm:flex-row items-stretch sm:items-center p-1 sm:p-1.5 rounded-xl bg-[#120D08] border border-[#3D2C20] shadow-lg mt-2 w-full sm:w-auto gap-1.5 sm:gap-0">
            <button
              onClick={() => setActiveTab('navidad')}
              className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 min-h-[42px] ${
                activeTab === 'navidad'
                  ? 'bg-gradient-to-r from-[#8B261E] via-[#A83226] to-[#C93B2B] text-white shadow-md shadow-red-950/60 ring-1 ring-red-400/40'
                  : 'text-[#C7B5A6] hover:text-[#F7EFE6] hover:bg-[#1E1712]'
              }`}
            >
              <TreePine className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>🎄 Edición Navideña (Villa sin Luz)</span>
            </button>

            <button
              onClick={() => setActiveTab('showreel')}
              className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 min-h-[42px] ${
                activeTab === 'showreel'
                  ? 'bg-[#E09F3E] text-[#17110C] font-bold shadow-md shadow-[#E09F3E]/20'
                  : 'text-[#C7B5A6] hover:text-[#F7EFE6] hover:bg-[#1E1712]'
              }`}
            >
              <Video className="w-4 h-4 shrink-0" />
              <span>Showreel del Taller (Técnicas & Kerf)</span>
            </button>
          </div>
        </div>

        {/* Video Player + Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Container: 8 cols */}
          <div className="lg:col-span-8 bg-[#120D08] border border-[#3D2C20] rounded-2xl overflow-hidden shadow-2xl relative group">
            {/* Top pill badge inside player */}
            <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
              <span className={`text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-md shadow-md border ${
                activeTab === 'navidad'
                  ? 'bg-[#8B261E]/80 text-[#FCE8E6] border-red-400/40'
                  : 'bg-[#1E1712]/80 text-[#E8AF50] border-[#E8AF50]/40'
              }`}>
                {currentConfig.badge}
              </span>
              {activeTab === 'navidad' && (
                <a
                  href={GOOGLE_PHOTOS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#1E1712]/90 hover:bg-[#2A1F17] text-[#E8AF50] border border-[#E09F3E]/40 backdrop-blur-md transition-colors"
                  title="Abrir video en Google Photos"
                >
                  <span>Google Photos</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="relative aspect-video bg-[#0A0704] flex items-center justify-center">
              <video
                key={activeTab}
                ref={videoRef}
                src={currentConfig.src}
                poster={currentConfig.poster}
                loop
                muted={isMuted}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full h-full object-contain cursor-pointer"
              />

              {/* Big Center Play Overlay Button when paused */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className={`absolute inset-0 m-auto w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transform transition-transform hover:scale-110 active:scale-95 focus:outline-none ${
                    activeTab === 'navidad'
                      ? 'bg-gradient-to-tr from-[#A83226] to-[#E09F3E] text-white shadow-black/80 ring-2 ring-white/30'
                      : 'bg-[#E09F3E] text-[#17110C] hover:bg-[#ECAE52]'
                  }`}
                  aria-label="Reproducir video"
                >
                  <Play className="w-7 h-7 fill-current ml-1" />
                </button>
              )}
            </div>

            {/* Custom Control Bar */}
            <div className="p-3 sm:p-4 bg-[#1E1712] border-t border-[#3D2C20] space-y-2.5">
              {/* Progress Slider */}
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-2 bg-[#3B291D] rounded-lg appearance-none cursor-pointer accent-[#E09F3E]"
                aria-label="Progreso del video"
              />

              <div className="flex items-center justify-between text-xs text-[#C7B5A6]">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={togglePlay}
                    className="w-9 h-9 flex items-center justify-center hover:text-[#E8AF50] transition-colors rounded-lg hover:bg-[#2A1F17] active:scale-95"
                    aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 text-[#E8AF50]" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={handleRestart}
                    className="w-9 h-9 flex items-center justify-center hover:text-[#E8AF50] transition-colors rounded-lg hover:bg-[#2A1F17] active:scale-95"
                    aria-label="Reiniciar video"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="w-9 h-9 flex items-center justify-center hover:text-[#E8AF50] transition-colors rounded-lg hover:bg-[#2A1F17] active:scale-95"
                    aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-amber-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>

                  <span className="text-[#9E8B7E] font-mono text-[11px] hidden sm:inline ml-1">
                    ArteMDF · {activeTab === 'navidad' ? 'Villa Navideña 3 mm (35s)' : 'Taller Láser LED 40 cm'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {activeTab === 'navidad' && (
                    <a
                      href={GOOGLE_PHOTOS_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-[#E8AF50] hover:underline flex items-center gap-1 font-medium px-2 py-1 rounded bg-[#271C14] border border-[#E09F3E]/30"
                    >
                      <span>Google Photos</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  <button
                    onClick={handleFullscreen}
                    className="w-9 h-9 flex items-center justify-center hover:text-[#E8AF50] transition-colors rounded-lg hover:bg-[#2A1F17] active:scale-95"
                    aria-label="Pantalla completa"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Card: 4 cols */}
          <div className="lg:col-span-4 bg-[#211812] border border-[#3D2C20] rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#E8AF50] text-xs font-semibold uppercase tracking-wider">
                  {activeTab === 'navidad' ? (
                    <>
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span>Colección Navideña 2024</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Detalles del Taller</span>
                    </>
                  )}
                </div>
                {activeTab === 'navidad' && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-600/40">
                    Bajo Pedido
                  </span>
                )}
              </div>

              <h3 className="font-display text-xl font-bold text-[#F7EFE6] leading-snug">
                {currentConfig.tagline}
              </h3>
            </div>

            {/* Bullet points list */}
            <div className="space-y-3.5 pt-2 text-xs text-[#C7B5A6] border-t border-[#33251B]">
              {currentConfig.bulletPoints.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                    activeTab === 'navidad' ? 'text-amber-400' : 'text-[#E8AF50]'
                  }`} />
                  <div>
                    <strong className="text-[#F7EFE6] block mb-0.5">{item.title}</strong>
                    <span className="leading-relaxed text-[#BDB0A4]">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-3 space-y-2.5 border-t border-[#33251B]">
              {activeTab === 'navidad' ? (
                <>
                  <button
                    onClick={handleGoToNavidadGallery}
                    className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#99281F] to-[#B83526] hover:from-[#A83226] hover:to-[#C93B2B] rounded-lg shadow-md shadow-red-950/50 flex items-center justify-center gap-2 transition-transform active:scale-95 border border-red-400/30"
                  >
                    <TreePine className="w-4 h-4 text-emerald-200" />
                    <span>Ver Catálogo Navideño en la Galería</span>
                  </button>

                  <button
                    onClick={handleGoToQuote}
                    className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#E8AF50] hover:text-[#17110C] bg-[#2A1F17] hover:bg-[#E09F3E] border border-[#E09F3E]/40 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Gift className="w-4 h-4" />
                    <span>Cotizar Villa o Pinos de Navidad</span>
                  </button>

                  <a
                    href={GOOGLE_PHOTOS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full block text-center py-2 text-[11px] font-medium text-[#C7B5A6] hover:text-[#E8AF50] transition-colors"
                  >
                    🔗 Abrir video original en Google Photos (HD)
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="#galeria"
                    className="w-full block text-center py-2.5 text-xs font-semibold uppercase tracking-wider text-[#E8AF50] hover:text-[#17110C] bg-[#2A1F17] hover:bg-[#E09F3E] border border-[#E09F3E]/40 rounded-lg transition-colors"
                  >
                    Ver Todas las Fotos en la Galería
                  </a>

                  <button
                    onClick={handleGoToQuote}
                    className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#C7B5A6] hover:text-[#F7EFE6] bg-[#1E1712] hover:bg-[#2A1F17] border border-[#3D2C20] rounded-lg transition-colors"
                  >
                    Calcular Cotización (Hasta 40 cm)
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
