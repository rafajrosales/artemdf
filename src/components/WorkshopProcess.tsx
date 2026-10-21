import React from 'react';
import { PenTool, Zap, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';
import { WORKSHOP_STEPS } from '../data/galleryData';

const ICONS: Record<string, React.ReactNode> = {
  PenTool: <PenTool className="w-5 h-5 text-[#E09F3E]" />,
  Zap: <Zap className="w-5 h-5 text-[#E09F3E]" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[#E09F3E]" />,
  CheckCircle: <CheckCircle className="w-5 h-5 text-[#E09F3E]" />
};

export const WorkshopProcess: React.FC = () => {
  return (
    <section id="taller" className="py-24 bg-[#17110C] border-b border-[#3D2C20]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E8AF50]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Taller Láser LED · Cama 40x40 cm</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F7EFE6] text-balance">
            De tu idea o boceto a una obra en madera real
          </h2>
          <p className="text-sm text-[#C7B5A6]">
            Combinamos la exactitud del rayo láser LED con el cuidado manual del descarbonizado, lijado y ensamble a presión de cada pieza de MDF.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WORKSHOP_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-[#211812] border border-[#3D2C20] rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-[#523B2B] transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#E09F3E]/15 border border-[#E09F3E]/30 flex items-center justify-center">
                    {ICONS[step.icon]}
                  </div>
                  <span className="font-mono text-2xl font-bold text-[#574233] tabular-nums">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-[#F7EFE6] tracking-tight">
                  {step.title}
                </h3>

                <p className="text-xs text-[#C7B5A6] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#33251B] text-[11px] text-[#D8B589] font-medium">
                Paso {step.step} del proceso artesanal
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
