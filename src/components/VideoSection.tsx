import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, Video, Sparkles, CheckCircle2 } from 'lucide-react';

export const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
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
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <section id="showreel" className="py-20 bg-[#1A130D]/80 border-b border-[#3D2C20]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E8AF50]">
            <Video className="w-3.5 h-3.5" />
            <span>Showreel del Taller</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F7EFE6] text-balance">
            Corte láser LED y acabado artesanal en MDF
          </h2>
          <p className="text-sm sm:text-base text-[#C7B5A6]">
            Descubre en video el ensamblado y los acabados de altares, lámparas botánicas y cajas curvadas en nuestro formato de hasta 40 cm.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Video Container: 8 cols */}
          <div className="lg:col-span-8 bg-[#120D08] border border-[#3D2C20] rounded-2xl overflow-hidden shadow-2xl relative group">
            <div className="relative aspect-video bg-[#0E0A06] flex items-center justify-center">
              <video
                ref={videoRef}
                src="/videos/artemdf_showreel.mp4"
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
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#E09F3E] text-[#17110C] hover:bg-[#ECAE52] flex items-center justify-center shadow-xl transform transition-transform hover:scale-110 active:scale-95 focus:outline-none"
                  aria-label="Reproducir video"
                >
                  <Play className="w-7 h-7 fill-[#17110C] ml-1" />
                </button>
              )}
            </div>

            {/* Custom Control Bar */}
            <div className="p-4 bg-[#1E1712] border-t border-[#3D2C20] space-y-2">
              {/* Progress Slider */}
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 bg-[#473426] rounded-lg appearance-none cursor-pointer accent-[#E09F3E]"
                aria-label="Progreso del video"
              />

              <div className="flex items-center justify-between text-xs text-[#C7B5A6]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 hover:text-[#E8AF50] transition-colors"
                    aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={handleRestart}
                    className="p-1.5 hover:text-[#E8AF50] transition-colors"
                    aria-label="Reiniciar video"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 hover:text-[#E8AF50] transition-colors"
                    aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="text-[#8F7D70] font-mono text-[11px]">
                    ArteMDF · Taller Láser LED 40 cm
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#8F7D70] hidden sm:inline">Alta Definición</span>
                  <button
                    onClick={handleFullscreen}
                    className="p-1.5 hover:text-[#E8AF50] transition-colors"
                    aria-label="Pantalla completa"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Card: 4 cols */}
          <div className="lg:col-span-4 bg-[#211812] border border-[#3D2C20] rounded-2xl p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#E8AF50] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>¿Qué observas en este reel?</span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#F7EFE6]">
                Corte limpio, madera tostada y luz
              </h3>
              <p className="text-xs text-[#C7B5A6] leading-relaxed">
                Control preciso de potencia del láser LED para un quemado perimetral ámbar elegante, sin hollín excesivo y con cantos suaves al tacto.
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs text-[#C7B5A6] border-t border-[#33251B]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E8AF50] shrink-0 mt-0.5" />
                <span><strong className="text-[#F7EFE6]">Cama útil de 40 x 40 cm:</strong> Dimensiones ideales para mesas de centro, lámparas cúbicas y nichos conmemorativos.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E8AF50] shrink-0 mt-0.5" />
                <span><strong className="text-[#F7EFE6]">Bisagras Living Hinge:</strong> Patrones paramétricos que permiten curvar el MDF rígido sin romperlo.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E8AF50] shrink-0 mt-0.5" />
                <span><strong className="text-[#F7EFE6]">Fibra de MDF de alta densidad:</strong> Gran resistencia estructural y grabado pirográfico indeleble.</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#galeria"
                className="w-full block text-center py-2.5 text-xs font-semibold uppercase tracking-wider text-[#E8AF50] hover:text-[#17110C] bg-[#2A1F17] hover:bg-[#E09F3E] border border-[#E09F3E]/40 rounded-lg transition-colors"
              >
                Ver Todas las Fotos en la Galería
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
